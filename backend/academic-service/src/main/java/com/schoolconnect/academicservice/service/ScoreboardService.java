package com.schoolconnect.academicservice.service;

import com.schoolconnect.academicservice.model.Marks;
import com.schoolconnect.academicservice.model.SubjectHighScore;
import com.schoolconnect.academicservice.repository.MarksRepository;
import com.schoolconnect.academicservice.repository.SubjectHighScoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ScoreboardService {

    private final MarksRepository marksRepository;
    private final SubjectHighScoreRepository subjectHighScoreRepository;

    /**
     * Update subject high score if a new record is achieved
     */
    @Transactional
    public void updateSubjectHighScore(Marks marks) {
        Optional<SubjectHighScore> existingRecord = subjectHighScoreRepository.findBySubjectId(marks.getSubjectId());

        boolean isNewRecord = false;

        if (existingRecord.isEmpty()) {
            // First record for this subject
            isNewRecord = true;
        } else {
            SubjectHighScore current = existingRecord.get();
            // Check if new marks are higher
            if (marks.getPercentage() > current.getPercentage()) {
                isNewRecord = true;
            }
        }

        if (isNewRecord) {
            SubjectHighScore highScore = existingRecord.orElse(new SubjectHighScore());
            highScore.setSubjectId(marks.getSubjectId());
            highScore.setStudentId(marks.getStudentId());
            highScore.setHighestMarks(marks.getMarksObtained());
            highScore.setTotalMarks(marks.getTotalMarks());
            highScore.setPercentage(marks.getPercentage());
            highScore.setExamType(marks.getExamType());
            highScore.setTerm(marks.getTerm());
            highScore.setExamName(marks.getExamName());
            highScore.setAchievedDate(marks.getExamDate());

            subjectHighScoreRepository.save(highScore);
            log.info("New high score for subject {}: {}% by student {}",
                    marks.getSubjectId(), marks.getPercentage(), marks.getStudentId());
        }
    }

    /**
     * Get all subject high scores
     */
    public List<SubjectHighScore> getAllSubjectHighScores() {
        return subjectHighScoreRepository.findAllByOrderByPercentageDesc();
    }

    /**
     * Get high score for a specific subject
     */
    public Optional<SubjectHighScore> getSubjectHighScore(Long subjectId) {
        return subjectHighScoreRepository.findBySubjectId(subjectId);
    }

    /**
     * Get students who scored 100% in a subject
     */
    public Map<Long, List<Map<String, Object>>> getPerfectScoresBySubject() {
        List<Marks> allMarks = marksRepository.findAll();

        // Filter marks with 100% and group by subject
        Map<Long, List<Marks>> perfectScores = allMarks.stream()
                .filter(m -> m.getPercentage() != null && m.getPercentage() >= 100.0)
                .collect(Collectors.groupingBy(Marks::getSubjectId));

        Map<Long, List<Map<String, Object>>> result = new HashMap<>();

        perfectScores.forEach((subjectId, marks) -> {
            List<Map<String, Object>> students = marks.stream()
                    .map(m -> {
                        Map<String, Object> studentData = new HashMap<>();
                        studentData.put("studentId", m.getStudentId());
                        studentData.put("examType", m.getExamType());
                        studentData.put("term", m.getTerm());
                        studentData.put("examName", m.getExamName());
                        studentData.put("examDate", m.getExamDate());
                        studentData.put("marksObtained", m.getMarksObtained());
                        studentData.put("totalMarks", m.getTotalMarks());
                        return studentData;
                    })
                    .collect(Collectors.toList());

            result.put(subjectId, students);
        });

        return result;
    }

    /**
     * Get highest scorers for a specific exam
     */
    public Map<Long, Map<String, Object>> getExamTopScorers(Marks.ExamType examType, Marks.Term term) {
        List<Marks> examMarks = marksRepository.findAll().stream()
                .filter(m -> m.getExamType() == examType && m.getTerm() == term)
                .collect(Collectors.toList());

        // Group by subject and find highest scorer
        Map<Long, List<Marks>> bySubject = examMarks.stream()
                .collect(Collectors.groupingBy(Marks::getSubjectId));

        Map<Long, Map<String, Object>> topScorers = new HashMap<>();

        bySubject.forEach((subjectId, marks) -> {
            Optional<Marks> topMark = marks.stream()
                    .max(Comparator.comparing(Marks::getPercentage));

            topMark.ifPresent(m -> {
                Map<String, Object> scorerData = new HashMap<>();
                scorerData.put("studentId", m.getStudentId());
                scorerData.put("marksObtained", m.getMarksObtained());
                scorerData.put("totalMarks", m.getTotalMarks());
                scorerData.put("percentage", m.getPercentage());
                scorerData.put("examDate", m.getExamDate());
                topScorers.put(subjectId, scorerData);
            });
        });

        return topScorers;
    }

    /**
     * Get comprehensive scoreboard data
     */
    public Map<String, Object> getScoreboardData() {
        Map<String, Object> scoreboard = new HashMap<>();

        // All-time high scores
        scoreboard.put("allTimeHighScores", getAllSubjectHighScores());

        // Perfect scores by subject
        scoreboard.put("perfectScores", getPerfectScoresBySubject());

        // Recent exam top scorers (can be filtered by frontend)
        scoreboard.put("recentExamTopScorers", new HashMap<>());

        return scoreboard;
    }
}
