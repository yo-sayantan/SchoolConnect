package com.schoolconnect.calendarservice.repository;

import com.schoolconnect.calendarservice.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByType(Event.EventType type);

    List<Event> findByTargetAudience(Event.TargetAudience targetAudience);

    List<Event> findByClassId(Long classId);

    List<Event> findByStartTimeBetween(LocalDateTime start, LocalDateTime end);

    List<Event> findByActive(Boolean active);

    List<Event> findByActiveTrue();

    List<Event> findByStartTimeAfterAndActiveTrue(LocalDateTime startTime);
}
