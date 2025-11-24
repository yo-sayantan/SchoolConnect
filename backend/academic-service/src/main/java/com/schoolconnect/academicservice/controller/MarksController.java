package com.schoolconnect.academicservice.controller;

import com.schoolconnect.academicservice.model.Marks;
import com.schoolconnect.academicservice.repository.MarksRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/marks")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MarksController {

    private final MarksRepository marksRepository;

    @GetMapping
    public ResponseEntity<List<Marks>> getAllMarks() {
        return ResponseEntity.ok(marksRepository.findAll());
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Marks>> getMarksByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(marksRepository.findByStudentId(studentId));
    }

    @GetMapping("/class/{classId}")
    public ResponseEntity<List<Marks>> getMarksByClass(@PathVariable Long classId) {
        return ResponseEntity.ok(marksRepository.findByClassId(classId));
    }

    @GetMapping("/subject/{subjectId}")
    public ResponseEntity<List<Marks>> getMarksBySubject(@PathVariable Long subjectId) {
        return ResponseEntity.ok(marksRepository.findBySubjectId(subjectId));
    }

    @PostMapping
    public ResponseEntity<Marks> createMarks(@RequestBody Marks marks) {
        return ResponseEntity.ok(marksRepository.save(marks));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateMarks(@PathVariable Long id, @RequestBody Marks marks) {
        return marksRepository.findById(id)
                .map(existing -> {
                    marks.setId(id);
                    return ResponseEntity.ok(marksRepository.save(marks));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMarks(@PathVariable Long id) {
        marksRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
