package com.schoolconnect.academicservice.controller;

import com.schoolconnect.academicservice.model.Marks;
import com.schoolconnect.academicservice.model.StudentRanking;
import com.schoolconnect.academicservice.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/analytics")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/progression/{studentId}")
    public ResponseEntity<?> getMarksProgression(
            @PathVariable Long studentId,
            @RequestParam Long subjectId) {

        Map<String, Object> progression = analyticsService.getMarksProgression(studentId, subjectId);
        return ResponseEntity.ok(progression);
    }

    @GetMapping("/summary/{studentId}")
    public ResponseEntity<?> getPerformanceSummary(@PathVariable Long studentId) {
        Map<String, Object> summary = analyticsService.getStudentPerformanceSummary(studentId);
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/stats/{studentId}")
    public ResponseEntity<?> getDashboardStats(@PathVariable Long studentId) {
        return ResponseEntity.ok(analyticsService.getDashboardStats(studentId));
    }

    @GetMapping("/yearly/{studentId}")
    public ResponseEntity<java.util.Map<Integer, Double>> getYearlyPerformance(@PathVariable Long studentId) {
        return ResponseEntity.ok(analyticsService.getYearlyPerformance(studentId));
    }

    @PostMapping("/rankings/generate")
    public ResponseEntity<?> generateRankings(
            @RequestParam Long classId,
            @RequestParam Marks.ExamType examType,
            @RequestParam Marks.Term term) {

        List<StudentRanking> rankings = analyticsService.generateClassRankings(classId, examType, term);
        return ResponseEntity.ok(Map.of(
                "message", "Rankings generated successfully",
                "count", rankings.size()));
    }

    @GetMapping("/rankings/{classId}")
    public ResponseEntity<?> getClassRankings(
            @PathVariable Long classId,
            @RequestParam Marks.ExamType examType,
            @RequestParam Marks.Term term,
            @RequestParam(defaultValue = "10") int limit) {

        List<StudentRanking> rankings = analyticsService.getClassRankings(classId, examType, term, limit);
        return ResponseEntity.ok(rankings);
    }

    @GetMapping("/rank/{studentId}")
    public ResponseEntity<?> getStudentRank(
            @PathVariable Long studentId,
            @RequestParam Long classId,
            @RequestParam Marks.ExamType examType,
            @RequestParam Marks.Term term) {

        return analyticsService.getStudentRank(studentId, classId, examType, term)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/class-stats/{classId}")
    public ResponseEntity<?> getClassStatistics(
            @PathVariable Long classId,
            @RequestParam Marks.ExamType examType,
            @RequestParam Marks.Term term) {

        Map<String, Object> stats = analyticsService.getClassStatistics(classId, examType, term);
        return ResponseEntity.ok(stats);
    }
}
