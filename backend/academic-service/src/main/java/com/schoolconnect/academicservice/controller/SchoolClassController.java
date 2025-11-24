package com.schoolconnect.academicservice.controller;

import com.schoolconnect.academicservice.model.SchoolClass;
import com.schoolconnect.academicservice.repository.SchoolClassRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/classes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SchoolClassController {

    private final SchoolClassRepository schoolClassRepository;

    @GetMapping
    public ResponseEntity<List<SchoolClass>> getAllClasses() {
        return ResponseEntity.ok(schoolClassRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getClassById(@PathVariable Long id) {
        return schoolClassRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/grade/{grade}")
    public ResponseEntity<List<SchoolClass>> getClassesByGrade(@PathVariable String grade) {
        return ResponseEntity.ok(schoolClassRepository.findByGrade(grade));
    }

    @GetMapping("/teacher/{teacherId}")
    public ResponseEntity<List<SchoolClass>> getClassesByTeacher(@PathVariable Long teacherId) {
        return ResponseEntity.ok(schoolClassRepository.findByTeacherId(teacherId));
    }

    @PostMapping
    public ResponseEntity<SchoolClass> createClass(@RequestBody SchoolClass schoolClass) {
        return ResponseEntity.ok(schoolClassRepository.save(schoolClass));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateClass(@PathVariable Long id, @RequestBody SchoolClass schoolClass) {
        return schoolClassRepository.findById(id)
                .map(existing -> {
                    schoolClass.setId(id);
                    return ResponseEntity.ok(schoolClassRepository.save(schoolClass));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteClass(@PathVariable Long id) {
        schoolClassRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
