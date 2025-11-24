package com.schoolconnect.academicservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "student_rankings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentRanking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long studentId;

    @Column(nullable = false)
    private Long classId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Marks.ExamType examType;

    @Enumerated(EnumType.STRING)
    private Marks.Term term;

    private String examName;

    @Column(nullable = false)
    private Double totalMarksObtained;

    @Column(nullable = false)
    private Double totalPossibleMarks;

    @Column(nullable = false)
    private Double percentage;

    @Column(nullable = false)
    private Integer rank;

    @Column(columnDefinition = "TEXT")
    private String subjectBreakdown; // JSON string with subject-wise marks

    private LocalDateTime generatedAt;

    @PrePersist
    protected void onCreate() {
        generatedAt = LocalDateTime.now();
    }
}
