package com.schoolconnect.communicationservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "answers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long questionId;

    @Column(nullable = false)
    private Long answererId; // Teacher/Admin ID

    @Column(nullable = false)
    private String answererName; // For display purposes

    @Column(nullable = false)
    private String answererRole; // TEACHER, ADMIN_ASSISTANT, PRINCIPAL

    @Column(nullable = false, columnDefinition = "TEXT")
    private String answerText;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
