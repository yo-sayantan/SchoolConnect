package com.schoolconnect.calendarservice.service;

import com.schoolconnect.calendarservice.model.Event;
import com.schoolconnect.calendarservice.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public List<Event> getActiveEvents() {
        return eventRepository.findByActiveTrue();
    }

    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    public List<Event> getEventsByType(Event.EventType type) {
        return eventRepository.findByType(type);
    }

    public List<Event> getEventsByTargetAudience(Event.TargetAudience audience) {
        return eventRepository.findByTargetAudience(audience);
    }

    public List<Event> getEventsByClass(Long classId) {
        return eventRepository.findByClassId(classId);
    }

    public List<Event> getEventsByDateRange(LocalDateTime startTime, LocalDateTime endTime) {
        return eventRepository.findByStartTimeBetween(startTime, endTime);
    }

    public List<Event> getUpcomingEvents() {
        LocalDateTime now = LocalDateTime.now();
        return eventRepository.findByStartTimeAfterAndActiveTrue(now);
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, Event event) {
        event.setId(id);
        return eventRepository.save(event);
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }

    public void deactivateEvent(Long id) {
        Optional<Event> event = eventRepository.findById(id);
        event.ifPresent(e -> {
            e.setActive(false);
            eventRepository.save(e);
        });
    }
}
