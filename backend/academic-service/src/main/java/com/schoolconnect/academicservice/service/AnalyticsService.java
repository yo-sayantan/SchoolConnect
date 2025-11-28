package com.schoolconnect.academicservice.service;

import com.schoolconnect.academicservice.model.Marks;
import com.schoolconnect.academicservice.model.StudentRanking;
import com.schoolconnect.academicservice.model.Subject;
import com.schoolconnect.academicservice.repository.MarksRepository;
import com.schoolconnect.academicservice.repository.StudentRankingRepository;
import com.schoolconnect.academicservice.repository.SubjectRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AnalyticsService {

    private final MarksRepository marksRepository;
    private final StudentRankingRepository studentRankingRepository;
    private final SubjectRepository subjectRepository;
    private final com.schoolconnect.academicservice.repository.AttendanceRepository attendanceRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Get marks progression for a student in a specific subject
     */
    public Map<String, Object> getMarksProgression(Long studentId, Long subjectId) {
        List<Marks> marks = marksRepository.findByStudentIdAndSubjectId(studentId, subjectId);

        // Group by exam type
        Map<Marks.ExamType, List<Marks>> groupedByType = marks.stream()
                .collect(Collectors.groupingBy(Marks::getExamType));

        Map<String, Object> progression = new HashMap<>();
        progression.put("studentId", studentId);
        progression.put("subjectId", subjectId);
        progression.put("totalExams", marks.size());

        // Calculate averages by exam type
        Map<String, Double> averagesByType = new HashMap<>();
        groupedByType.forEach((type, marksList) -> {
            double avg = marksList.stream()
                    .mapToDouble(Marks::getPercentage)
                    .average()
                    .orElse(0.0);
            averagesByType.put(type.name(), avg);
        });
        progression.put("averagesByExamType", averagesByType);

        // Get trend (improvement/decline)
        if (marks.size() >= 2) {
            marks.sort(Comparator.comparing(Marks::getExamDate));
            double firstPercentage = marks.get(0).getPercentage();
            double lastPercentage = marks.get(marks.size() - 1).getPercentage();
            double trend = lastPercentage - firstPercentage;
            progression.put("trend", trend);
            progression.put("trendDirection", trend > 0 ? "IMPROVING" : trend < 0 ? "DECLINING" : "STABLE");
        }

        progression.put("marksHistory", marks);

        return progression;
    }

    /**
     * Get student performance across all subjects
     */
    public Map<String, Object> getStudentPerformanceSummary(Long studentId) {
        List<Marks> allMarks = marksRepository.findByStudentId(studentId);

        Map<String, Object> summary = new HashMap<>();
        summary.put("studentId", studentId);
        summary.put("totalExams", allMarks.size());

        // Overall average
        double overallAverage = allMarks.stream()
                .mapToDouble(Marks::getPercentage)
                .average()
                .orElse(0.0);
        summary.put("overallAverage", overallAverage);

        // Subject-wise performance
        Map<Long, List<Marks>> bySubject = allMarks.stream()
                .collect(Collectors.groupingBy(Marks::getSubjectId));

        Map<Long, Double> subjectAverages = new HashMap<>();
        bySubject.forEach((subjectId, marks) -> {
            double avg = marks.stream()
                    .mapToDouble(Marks::getPercentage)
                    .average()
                    .orElse(0.0);
            subjectAverages.put(subjectId, avg);
        });
        summary.put("subjectAverages", subjectAverages);

        // Best and worst subjects
        if (!subjectAverages.isEmpty()) {
            Long bestSubject = Collections.max(subjectAverages.entrySet(), Map.Entry.comparingByValue()).getKey();
            Long worstSubject = Collections.min(subjectAverages.entrySet(), Map.Entry.comparingByValue()).getKey();
            summary.put("bestSubject", bestSubject);
            summary.put("worstSubject", worstSubject);
        }

        // Recent rankings
        List<StudentRanking> rankings = studentRankingRepository.findByStudentIdOrderByGeneratedAtDesc(studentId);
        summary.put("recentRankings", rankings.stream().limit(5).collect(Collectors.toList()));

        return summary;
    }

    /**
     * Generate class rankings for a specific exam
     */
    public List<StudentRanking> generateClassRankings(Long classId, Marks.ExamType examType, Marks.Term term) {
        // Get all marks for this class, exam type, and term
        List<Marks> classMarks = marksRepository.findByClassId(classId).stream()
                .filter(m -> m.getExamType() == examType && m.getTerm() == term)
                .collect(Collectors.toList());

        // Group by student
        Map<Long, List<Marks>> marksByStudent = classMarks.stream()
                .collect(Collectors.groupingBy(Marks::getStudentId));

        // Calculate totals for each student
        List<StudentRanking> rankings = new ArrayList<>();

        marksByStudent.forEach((studentId, marks) -> {
            double totalObtained = marks.stream().mapToDouble(Marks::getMarksObtained).sum();
            double totalPossible = marks.stream().mapToDouble(Marks::getTotalMarks).sum();
            double percentage = (totalObtained / totalPossible) * 100;

            // Create subject breakdown
            Map<String, Map<String, Double>> breakdown = new HashMap<>();
            marks.forEach(mark -> {
                Map<String, Double> subjectData = new HashMap<>();
                subjectData.put("obtained", mark.getMarksObtained());
                subjectData.put("total", mark.getTotalMarks());
                subjectData.put("percentage", mark.getPercentage());
                breakdown.put(mark.getSubjectId().toString(), subjectData);
            });

            StudentRanking ranking = new StudentRanking();
            ranking.setStudentId(studentId);
            ranking.setClassId(classId);
            ranking.setExamType(examType);
            ranking.setTerm(term);
            ranking.setTotalMarksObtained(totalObtained);
            ranking.setTotalPossibleMarks(totalPossible);
            ranking.setPercentage(percentage);

            try {
                ranking.setSubjectBreakdown(objectMapper.writeValueAsString(breakdown));
            } catch (JsonProcessingException e) {
                log.error("Failed to serialize subject breakdown", e);
                ranking.setSubjectBreakdown("{}");
            }

            rankings.add(ranking);
        });

        // Sort by percentage and assign ranks
        rankings.sort(Comparator.comparing(StudentRanking::getPercentage).reversed());
        for (int i = 0; i < rankings.size(); i++) {
            rankings.get(i).setRank(i + 1);
        }

        // Save rankings
        studentRankingRepository.saveAll(rankings);

        log.info("Generated {} rankings for class {} - {} {}", rankings.size(), classId, examType, term);
        return rankings;
    }

    /**
     * Get top N students for a class
     */
    public List<StudentRanking> getClassRankings(Long classId, Marks.ExamType examType, Marks.Term term, int limit) {
        List<StudentRanking> rankings = studentRankingRepository
                .findByClassIdAndExamTypeAndTermOrderByRankAsc(classId, examType, term);

        return rankings.stream().limit(limit).collect(Collectors.toList());
    }

    /**
     * Get student's rank in class
     */
    public Optional<StudentRanking> getStudentRank(Long studentId, Long classId, Marks.ExamType examType,
            Marks.Term term) {
        return studentRankingRepository.findByStudentIdAndClassIdAndExamTypeAndTerm(studentId, classId, examType, term);
    }

    /**
     * Get class average for comparison
     */
    public Map<String, Object> getClassStatistics(Long classId, Marks.ExamType examType, Marks.Term term) {
        List<StudentRanking> rankings = studentRankingRepository
                .findByClassIdAndExamTypeAndTermOrderByRankAsc(classId, examType, term);

        Map<String, Object> stats = new HashMap<>();
        stats.put("classId", classId);
        stats.put("examType", examType);
        stats.put("term", term);
        stats.put("totalStudents", rankings.size());

        if (!rankings.isEmpty()) {
            double classAverage = rankings.stream()
                    .mapToDouble(StudentRanking::getPercentage)
                    .average()
                    .orElse(0.0);

            double highest = rankings.stream()
                    .mapToDouble(StudentRanking::getPercentage)
                    .max()
                    .orElse(0.0);

            double lowest = rankings.stream()
                    .mapToDouble(StudentRanking::getPercentage)
                    .min()
                    .orElse(0.0);

            stats.put("classAverage", classAverage);
            stats.put("highestPercentage", highest);
            stats.put("lowestPercentage", lowest);
        }

        return stats;
    }

    public com.schoolconnect.academicservice.dto.StudentStatsDto getDashboardStats(Long studentId) {
        // Calculate Attendance Percentage
        long totalAttendance = attendanceRepository.countByStudentId(studentId);
        long presentCount = attendanceRepository.countByStudentIdAndStatus(studentId,
                com.schoolconnect.academicservice.model.Attendance.AttendanceStatus.PRESENT);
        double attendancePercentage = totalAttendance > 0 ? ((double) presentCount / totalAttendance) * 100 : 0.0;

        // Calculate Average Grade
        Double avgPercentage = marksRepository.findAveragePercentageByStudentId(studentId);
        double averageGrade = avgPercentage != null ? avgPercentage : 0.0;

        // Total Classes (Approximated by attendance records for now, or fetch from
        // schedule)
        int totalClasses = (int) totalAttendance;
        int classesAttended = (int) presentCount;

        return new com.schoolconnect.academicservice.dto.StudentStatsDto(
                studentId,
                attendancePercentage,
                averageGrade,
                totalClasses,
                classesAttended);
    }

    /**
     * Get yearly performance for a student
     */
    public Map<Integer, Double> getYearlyPerformance(Long studentId) {
        List<Marks> allMarks = marksRepository.findByStudentId(studentId);

        // Group by year (from exam date) and calculate average
        return allMarks.stream()
                .collect(Collectors.groupingBy(
                        m -> m.getExamDate().getYear(),
                        Collectors.averagingDouble(Marks::getPercentage)));
    }

    /**
     * Get aggregated performance for a teacher's classes
     */
    public Map<String, Object> getTeacherPerformance(String teacherId) {
        // Mock implementation for MVP - in real app, fetch classes by teacherId first
        // For now, we'll return mock data structure that matches the frontend
        // expectations
        Map<String, Object> performance = new HashMap<>();

        List<Map<String, Object>> classPerformance = new ArrayList<>();
        classPerformance.add(Map.of("name", "Grade 10A", "math", 85, "science", 78, "english", 82));
        classPerformance.add(Map.of("name", "Grade 10B", "math", 75, "science", 85, "english", 80));
        classPerformance.add(Map.of("name", "Grade 11A", "math", 90, "science", 88, "english", 92));

        performance.put("classPerformance", classPerformance);

        List<Map<String, Object>> overallTrend = new ArrayList<>();
        overallTrend.add(Map.of("month", "Jan", "rating", 4.2));
        overallTrend.add(Map.of("month", "Feb", "rating", 4.5));
        overallTrend.add(Map.of("month", "Mar", "rating", 4.3));

        performance.put("overallTrend", overallTrend);

        return performance;
    }

    /**
     * Get school-wide statistics for Principal
     */
    public Map<String, Object> getSchoolStats() {
        Map<String, Object> stats = new HashMap<>();

        // Mock data for MVP
        stats.put("totalStudents", 1250);
        stats.put("totalTeachers", 45);
        stats.put("attendanceRate", 92.5);
        stats.put("avgPerformance", 78.4);

        List<Map<String, Object>> performanceTrend = new ArrayList<>();
        performanceTrend.add(Map.of("month", "Jan", "academic", 82, "satisfaction", 75, "engagement", 80));
        performanceTrend.add(Map.of("month", "Feb", "academic", 85, "satisfaction", 78, "engagement", 82));

        stats.put("performanceTrend", performanceTrend);

        return stats;
    }
}
