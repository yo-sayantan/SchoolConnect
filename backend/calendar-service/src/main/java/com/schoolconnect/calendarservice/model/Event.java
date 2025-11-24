package com.schoolconnect.calendarservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "events")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EventType type;

    @Column(nullable = false)
    private LocalDateTime startTime;

    @Column(nullable = false)
    private LocalDateTime endTime;

    private String location;

    private String meetingLink; // For online classes/meetings

    @Enumerated(EnumType.STRING)
    private TargetAudience targetAudience;

    private Long classId; // If event is for specific class

    @Column(nullable = false)
    private Boolean active = true;

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

    public enum EventType {
        EXAM,
        HOLIDAY,
        MEETING,
        ONLINE_CLASS,
        SPORTS,
        CULTURAL,
        PARENT_TEACHER_MEETING,
        OTHER
    }

    public enum TargetAudience {
        ALL,
        STUDENTS,
        PARENTS,
        TEACHERS,
        SPECIFIC_CLASS
    }
}
