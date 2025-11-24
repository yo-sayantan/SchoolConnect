package com.schoolconnect.academicservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "subject_high_scores")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubjectHighScore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long subjectId;

    @Column(nullable = false)
    private Long studentId;

    private String studentName;

    @Column(nullable = false)
    private Double highestMarks;

    @Column(nullable = false)
    private Double totalMarks;

    @Column(nullable = false)
    private Double percentage;

    @Enumerated(EnumType.STRING)
    private Marks.ExamType examType;

    @Enumerated(EnumType.STRING)
    private Marks.Term term;

    private String examName;

    private LocalDate achievedDate;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
