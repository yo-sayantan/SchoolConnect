package com.schoolconnect.communicationservice.controller;

import com.schoolconnect.communicationservice.model.Answer;
import com.schoolconnect.communicationservice.model.Question;
import com.schoolconnect.communicationservice.service.QnAService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/qna")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class QnAController {

    private final QnAService qnAService;

    @PostMapping("/questions")
    public ResponseEntity<?> submitQuestion(
            @RequestBody Question question,
            @RequestHeader("X-User-Email") String userEmail,
            @RequestHeader("X-User-Role") String userRole) {

        // Only students and parents can ask questions
        if (!userRole.equals("STUDENT") && !userRole.equals("PARENT")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Only students and parents can submit questions"));
        }

        Question saved = qnAService.submitQuestion(question);
        return ResponseEntity.ok(Map.of(
                "message", "Question submitted successfully",
                "questionId", saved.getId()));
    }

    @PostMapping("/questions/{id}/answer")
    public ResponseEntity<?> answerQuestion(
            @PathVariable Long id,
            @RequestBody Answer answer,
            @RequestHeader("X-User-Role") String userRole) {

        // Only teachers, admin, and principal can answer
        if (!userRole.equals("TEACHER") && !userRole.equals("ADMIN_ASSISTANT") && !userRole.equals("PRINCIPAL")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Only teachers and administrators can answer questions"));
        }

        try {
            Answer saved = qnAService.answerQuestion(id, answer);
            return ResponseEntity.ok(Map.of(
                    "message", "Answer submitted successfully",
                    "answerId", saved.getId()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/questions/my-questions")
    public ResponseEntity<?> getMyQuestions(
            @RequestHeader("X-User-Email") String userEmail,
            @RequestHeader("X-User-Role") String userRole,
            @RequestParam Long userId) {

        // Students and parents can only see their own questions
        if (userRole.equals("STUDENT") || userRole.equals("PARENT")) {
            List<Map<String, Object>> questions = qnAService.getQuestionsByAsker(userId);
            return ResponseEntity.ok(questions);
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(Map.of("error", "Access denied"));
    }

    @GetMapping("/questions/inbox")
    public ResponseEntity<?> getInbox(
            @RequestHeader("X-User-Role") String userRole,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Long recipientId) {

        // Only teachers, admin, and principal can access inbox
        if (!userRole.equals("TEACHER") && !userRole.equals("ADMIN_ASSISTANT") && !userRole.equals("PRINCIPAL")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Access denied"));
        }

        List<Map<String, Object>> questions;

        if (recipientId != null) {
            questions = qnAService.getQuestionsByRecipientId(recipientId);
        } else {
            Question.QuestionStatus statusEnum = status != null ? Question.QuestionStatus.valueOf(status.toUpperCase())
                    : null;
            questions = qnAService.getQuestionsByRecipientRole(userRole, statusEnum);
        }

        return ResponseEntity.ok(questions);
    }

    @GetMapping("/questions/{id}")
    public ResponseEntity<?> getQuestion(@PathVariable Long id) {
        return qnAService.getQuestionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/questions/{id}/status")
    public ResponseEntity<?> updateQuestionStatus(
            @PathVariable Long id,
            @RequestParam String status,
            @RequestHeader("X-User-Role") String userRole) {

        try {
            Question.QuestionStatus statusEnum = Question.QuestionStatus.valueOf(status.toUpperCase());
            Question updated = qnAService.updateQuestionStatus(id, statusEnum);
            return ResponseEntity.ok(Map.of(
                    "message", "Question status updated",
                    "status", updated.getStatus()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/statistics")
    public ResponseEntity<?> getStatistics(@RequestHeader("X-User-Role") String userRole) {
        // Only teachers, admin, and principal can view statistics
        if (!userRole.equals("TEACHER") && !userRole.equals("ADMIN_ASSISTANT") && !userRole.equals("PRINCIPAL")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Access denied"));
        }

        Map<String, Object> stats = qnAService.getStatistics(userRole);
        return ResponseEntity.ok(stats);
    }
}
