package com.schoolconnect.academicservice.service;

import com.schoolconnect.academicservice.model.Marks;
import com.schoolconnect.academicservice.repository.MarksRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MarksService {

    private final MarksRepository marksRepository;
    private final ScoreboardService scoreboardService;

    public List<Marks> getAllMarks() {
        return marksRepository.findAll();
    }

    public Optional<Marks> getMarksById(Long id) {
        return marksRepository.findById(id);
    }

    public List<Marks> getMarksByStudent(Long studentId) {
        return marksRepository.findByStudentId(studentId);
    }

    public List<Marks> getMarksByClass(Long classId) {
        return marksRepository.findByClassId(classId);
    }

    public List<Marks> getMarksBySubject(Long subjectId) {
        return marksRepository.findBySubjectId(subjectId);
    }

    public List<Marks> getMarksByStudentAndSubject(Long studentId, Long subjectId) {
        return marksRepository.findByStudentIdAndSubjectId(studentId, subjectId);
    }

    public Marks createMarks(Marks marks) {
        Marks saved = marksRepository.save(marks);
        // Automatically update subject high score if this is a new record
        scoreboardService.updateSubjectHighScore(saved);
        return saved;
    }

    public Marks updateMarks(Long id, Marks marks) {
        marks.setId(id);
        Marks updated = marksRepository.save(marks);
        // Check if updated marks beat the high score
        scoreboardService.updateSubjectHighScore(updated);
        return updated;
    }

    public void deleteMarks(Long id) {
        marksRepository.deleteById(id);
    }
}
