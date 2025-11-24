package com.schoolconnect.communicationservice.service;

import com.schoolconnect.communicationservice.model.Answer;
import com.schoolconnect.communicationservice.model.Question;
import com.schoolconnect.communicationservice.repository.AnswerRepository;
import com.schoolconnect.communicationservice.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class QnAService {

    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;

    public Question submitQuestion(Question question) {
        question.setStatus(Question.QuestionStatus.PENDING);
        Question saved = questionRepository.save(question);
        log.info("Question submitted by {} to {}", question.getAskerName(), question.getRecipientRole());
        return saved;
    }

    @Transactional
    public Answer answerQuestion(Long questionId, Answer answer) {
        Optional<Question> questionOpt = questionRepository.findById(questionId);
        if (questionOpt.isEmpty()) {
            throw new IllegalArgumentException("Question not found");
        }

        Question question = questionOpt.get();
        answer.setQuestionId(questionId);
        Answer saved = answerRepository.save(answer);

        // Update question status
        question.setStatus(Question.QuestionStatus.ANSWERED);
        questionRepository.save(question);

        log.info("Question {} answered by {}", questionId, answer.getAnswererName());
        return saved;
    }

    public List<Map<String, Object>> getQuestionsByAsker(Long askerId) {
        List<Question> questions = questionRepository.findByAskerIdOrderByCreatedAtDesc(askerId);
        return questions.stream()
                .map(this::enrichQuestionWithAnswers)
                .collect(Collectors.toList());
    }

    public List<Map<String, Object>> getQuestionsByRecipientRole(String role, Question.QuestionStatus status) {
        List<Question> questions;
        if (status != null) {
            questions = questionRepository.findByRecipientRoleAndStatusOrderByCreatedAtDesc(role, status);
        } else {
            questions = questionRepository.findByRecipientRoleOrderByCreatedAtDesc(role);
        }

        return questions.stream()
                .map(this::enrichQuestionWithAnswers)
                .collect(Collectors.toList());
    }

    public List<Map<String, Object>> getQuestionsByRecipientId(Long recipientId) {
        List<Question> questions = questionRepository.findByRecipientIdOrderByCreatedAtDesc(recipientId);
        return questions.stream()
                .map(this::enrichQuestionWithAnswers)
                .collect(Collectors.toList());
    }

    public Optional<Map<String, Object>> getQuestionById(Long questionId) {
        return questionRepository.findById(questionId)
                .map(this::enrichQuestionWithAnswers);
    }

    public Question updateQuestionStatus(Long questionId, Question.QuestionStatus status) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("Question not found"));

        question.setStatus(status);
        return questionRepository.save(question);
    }

    public List<Answer> getAnswersForQuestion(Long questionId) {
        return answerRepository.findByQuestionIdOrderByCreatedAtAsc(questionId);
    }

    private Map<String, Object> enrichQuestionWithAnswers(Question question) {
        Map<String, Object> enriched = new HashMap<>();
        enriched.put("question", question);

        List<Answer> answers = answerRepository.findByQuestionIdOrderByCreatedAtAsc(question.getId());
        enriched.put("answers", answers);
        enriched.put("answerCount", answers.size());

        return enriched;
    }

    public Map<String, Object> getStatistics(String role) {
        List<Question> allQuestions = questionRepository.findByRecipientRoleOrderByCreatedAtDesc(role);

        long pending = allQuestions.stream()
                .filter(q -> q.getStatus() == Question.QuestionStatus.PENDING)
                .count();

        long answered = allQuestions.stream()
                .filter(q -> q.getStatus() == Question.QuestionStatus.ANSWERED)
                .count();

        long closed = allQuestions.stream()
                .filter(q -> q.getStatus() == Question.QuestionStatus.CLOSED)
                .count();

        Map<String, Object> stats = new HashMap<>();
        stats.put("total", allQuestions.size());
        stats.put("pending", pending);
        stats.put("answered", answered);
        stats.put("closed", closed);

        return stats;
    }
}
