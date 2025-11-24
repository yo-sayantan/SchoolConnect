package com.schoolconnect.calendarservice.config;

import com.schoolconnect.calendarservice.model.Event;
import com.schoolconnect.calendarservice.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final EventRepository eventRepository;

    @Override
    public void run(String... args) {
        if (eventRepository.count() == 0) {
            log.info("Initializing calendar demo data...");

            LocalDateTime now = LocalDateTime.now();

            // Upcoming Events
            createEvent(
                    "Mid-Term Mathematics Exam",
                    "Mid-term examination for Mathematics - Class 10",
                    Event.EventType.EXAM,
                    now.plusDays(15).withHour(9).withMinute(0),
                    now.plusDays(15).withHour(12).withMinute(0),
                    "Examination Hall A",
                    null,
                    Event.TargetAudience.SPECIFIC_CLASS,
                    1L // Class 10-A
            );

            createEvent(
                    "Mid-Term Science Exam",
                    "Mid-term examination for Science - Class 10",
                    Event.EventType.EXAM,
                    now.plusDays(17).withHour(9).withMinute(0),
                    now.plusDays(17).withHour(12).withMinute(0),
                    "Examination Hall A",
                    null,
                    Event.TargetAudience.SPECIFIC_CLASS,
                    1L // Class 10-A
            );

            createEvent(
                    "Parent-Teacher Meeting",
                    "Quarterly Parent-Teacher meeting to discuss student progress",
                    Event.EventType.PARENT_TEACHER_MEETING,
                    now.plusDays(10).withHour(10).withMinute(0),
                    now.plusDays(10).withHour(14).withMinute(0),
                    "School Auditorium",
                    null,
                    Event.TargetAudience.PARENTS,
                    null);

            createEvent(
                    "Online Mathematics Class",
                    "Regular online mathematics class for Class 10-A",
                    Event.EventType.ONLINE_CLASS,
                    now.plusDays(2).withHour(10).withMinute(0),
                    now.plusDays(2).withHour(11).withMinute(0),
                    "Online",
                    "https://meet.google.com/abc-defg-hij",
                    Event.TargetAudience.SPECIFIC_CLASS,
                    1L // Class 10-A
            );

            createEvent(
                    "Online Science Class",
                    "Regular online science class for Class 10-A",
                    Event.EventType.ONLINE_CLASS,
                    now.plusDays(3).withHour(11).withMinute(0),
                    now.plusDays(3).withHour(12).withMinute(0),
                    "Online",
                    "https://zoom.us/j/123456789",
                    Event.TargetAudience.SPECIFIC_CLASS,
                    1L // Class 10-A
            );

            createEvent(
                    "Annual Sports Day",
                    "Annual sports day with various athletic events and competitions",
                    Event.EventType.SPORTS,
                    now.plusDays(35).withHour(8).withMinute(0),
                    now.plusDays(35).withHour(16).withMinute(0),
                    "School Sports Ground",
                    null,
                    Event.TargetAudience.ALL,
                    null);

            createEvent(
                    "Cultural Festival",
                    "Annual cultural festival showcasing student talents in music, dance, and drama",
                    Event.EventType.CULTURAL,
                    now.plusDays(45).withHour(9).withMinute(0),
                    now.plusDays(45).withHour(17).withMinute(0),
                    "School Auditorium",
                    null,
                    Event.TargetAudience.ALL,
                    null);

            createEvent(
                    "Winter Break",
                    "Winter vacation for all students",
                    Event.EventType.HOLIDAY,
                    now.plusDays(60).withHour(0).withMinute(0),
                    now.plusDays(74).withHour(23).withMinute(59),
                    "N/A",
                    null,
                    Event.TargetAudience.ALL,
                    null);

            createEvent(
                    "Staff Meeting - Academic Review",
                    "Monthly staff meeting to review academic progress and discuss improvements",
                    Event.EventType.MEETING,
                    now.plusDays(7).withHour(15).withMinute(0),
                    now.plusDays(7).withHour(17).withMinute(0),
                    "Staff Room",
                    null,
                    Event.TargetAudience.TEACHERS,
                    null);

            createEvent(
                    "Science Fair",
                    "Annual science fair where students present their science projects",
                    Event.EventType.OTHER,
                    now.plusDays(30).withHour(9).withMinute(0),
                    now.plusDays(30).withHour(15).withMinute(0),
                    "Science Laboratory",
                    null,
                    Event.TargetAudience.STUDENTS,
                    null);

            log.info("Calendar demo data initialized successfully!");
        }
    }

    private void createEvent(String title, String description, Event.EventType type,
            LocalDateTime startTime, LocalDateTime endTime, String location,
            String meetingLink, Event.TargetAudience audience, Long classId) {
        Event event = new Event();
        event.setTitle(title);
        event.setDescription(description);
        event.setType(type);
        event.setStartTime(startTime);
        event.setEndTime(endTime);
        event.setLocation(location);
        event.setMeetingLink(meetingLink);
        event.setTargetAudience(audience);
        event.setClassId(classId);
        event.setActive(true);
        eventRepository.save(event);
        log.info("Created event: {}", title);
    }
}
