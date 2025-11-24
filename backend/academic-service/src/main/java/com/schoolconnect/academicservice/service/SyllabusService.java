package com.schoolconnect.academicservice.service;

import com.schoolconnect.academicservice.model.Syllabus;
import com.schoolconnect.academicservice.repository.SyllabusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SyllabusService {

    private final SyllabusRepository syllabusRepository;

    public List<Syllabus> getAllSyllabus() {
        return syllabusRepository.findAll();
    }

    public Optional<Syllabus> getSyllabusById(Long id) {
        return syllabusRepository.findById(id);
    }

    public List<Syllabus> getSyllabusBySubject(Long subjectId) {
        return syllabusRepository.findBySubjectId(subjectId);
    }

    public List<Syllabus> getSyllabusByClass(Long classId) {
        return syllabusRepository.findByClassId(classId);
    }

    public Syllabus createSyllabus(Syllabus syllabus) {
        return syllabusRepository.save(syllabus);
    }

    public Syllabus updateSyllabus(Long id, Syllabus syllabus) {
        syllabus.setId(id);
        return syllabusRepository.save(syllabus);
    }

    public void deleteSyllabus(Long id) {
        syllabusRepository.deleteById(id);
    }
}
