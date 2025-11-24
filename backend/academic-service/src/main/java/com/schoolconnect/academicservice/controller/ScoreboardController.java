package com.schoolconnect.academicservice.controller;

import com.schoolconnect.academicservice.model.Marks;
import com.schoolconnect.academicservice.model.SubjectHighScore;
import com.schoolconnect.academicservice.service.ScoreboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/scoreboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ScoreboardController {

    private final ScoreboardService scoreboardService;

    @GetMapping("/all")
    public ResponseEntity<?> getScoreboardData() {
        Map<String, Object> data = scoreboardService.getScoreboardData();
        return ResponseEntity.ok(data);
    }

    @GetMapping("/high-scores")
    public ResponseEntity<?> getAllHighScores() {
        List<SubjectHighScore> highScores = scoreboardService.getAllSubjectHighScores();
        return ResponseEntity.ok(highScores);
    }

    @GetMapping("/high-scores/{subjectId}")
    public ResponseEntity<?> getSubjectHighScore(@PathVariable Long subjectId) {
        return scoreboardService.getSubjectHighScore(subjectId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/perfect-scores")
    public ResponseEntity<?> getPerfectScores() {
        Map<Long, List<Map<String, Object>>> perfectScores = scoreboardService.getPerfectScoresBySubject();
        return ResponseEntity.ok(perfectScores);
    }

    @GetMapping("/exam-top-scorers")
    public ResponseEntity<?> getExamTopScorers(
            @RequestParam Marks.ExamType examType,
            @RequestParam Marks.Term term) {

        Map<Long, Map<String, Object>> topScorers = scoreboardService.getExamTopScorers(examType, term);
        return ResponseEntity.ok(topScorers);
    }
}
