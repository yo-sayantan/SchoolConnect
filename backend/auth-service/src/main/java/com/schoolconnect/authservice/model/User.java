package com.schoolconnect.authservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(unique = true)
    private String phoneNumber;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false)
    private String password; // Hashed password

    @Column(nullable = false)
    private Boolean active = true;

    @Column(nullable = false)
    private Boolean verified = false;

    // ID Card information
    private String idCardFrontUrl;
    private String idCardBackUrl;

    // For parent accounts - comma-separated student IDs
    @Column(columnDefinition = "TEXT")
    private String linkedStudentIds;

    // Additional profile fields
    private String address;
    private String dateOfBirth;
    private String guardianName;
    private String emergencyContact;

    // Account management
    private Long approvedBy; // User ID who approved the registration
    private LocalDateTime approvedAt;

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
