package com.schoolconnect.academicservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "assignments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String subject; // e.g., "Mathematics"
    private String description;
    private LocalDate dueDate;
    private String status; // "pending", "in-progress", "completed"
    private String priority; // "high", "medium", "low"
    private String studentId; // Assigned to specific student (or class in future)
    private String teacherId; // Created by
}
