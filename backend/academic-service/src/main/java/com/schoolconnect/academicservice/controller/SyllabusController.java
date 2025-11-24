package com.schoolconnect.academicservice.controller;

import com.schoolconnect.academicservice.model.Syllabus;
import com.schoolconnect.academicservice.repository.SyllabusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/syllabus")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SyllabusController {

    private final SyllabusRepository syllabusRepository;

    @GetMapping
    public ResponseEntity<List<Syllabus>> getAllSyllabus() {
        return ResponseEntity.ok(syllabusRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSyllabusById(@PathVariable Long id) {
        return syllabusRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/subject/{subjectId}")
    public ResponseEntity<List<Syllabus>> getSyllabusBySubject(@PathVariable Long subjectId) {
        return ResponseEntity.ok(syllabusRepository.findBySubjectId(subjectId));
    }

    @GetMapping("/class/{classId}")
    public ResponseEntity<List<Syllabus>> getSyllabusByClass(@PathVariable Long classId) {
        return ResponseEntity.ok(syllabusRepository.findByClassId(classId));
    }

    @PostMapping
    public ResponseEntity<Syllabus> createSyllabus(@RequestBody Syllabus syllabus) {
        return ResponseEntity.ok(syllabusRepository.save(syllabus));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSyllabus(@PathVariable Long id, @RequestBody Syllabus syllabus) {
        return syllabusRepository.findById(id)
                .map(existing -> {
                    syllabus.setId(id);
                    return ResponseEntity.ok(syllabusRepository.save(syllabus));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSyllabus(@PathVariable Long id) {
        syllabusRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
