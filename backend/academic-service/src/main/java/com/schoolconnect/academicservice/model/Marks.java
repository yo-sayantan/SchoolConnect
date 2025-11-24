package com.schoolconnect.academicservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "marks")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Marks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long studentId;

    @Column(nullable = false)
    private Long subjectId;

    @Column(nullable = false)
    private Long classId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ExamType examType = ExamType.TEST;

    @Enumerated(EnumType.STRING)
    private Term term;

    private String examName; // e.g., "Mid-Term Exam", "Unit Test 1"

    @Column(nullable = false)
    private Double marksObtained;

    @Column(nullable = false)
    private Double totalMarks;

    private Double percentage; // Calculated field

    private String grade;

    private String remarks;

    private LocalDate examDate;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        calculatePercentage();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
        calculatePercentage();
    }

    private void calculatePercentage() {
        if (totalMarks != null && totalMarks > 0 && marksObtained != null) {
            this.percentage = (marksObtained / totalMarks) * 100;
        }
    }

    public enum ExamType {
        TEST,
        HALF_TERM,
        FULL_TERM,
        VIVA,
        ASSIGNMENT,
        PRACTICAL
    }

    public enum Term {
        TERM_1,
        TERM_2,
        TERM_3
    }
}
