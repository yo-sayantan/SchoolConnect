package com.schoolconnect.academicservice.controller;

import com.schoolconnect.academicservice.model.Assignment;
import com.schoolconnect.academicservice.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/academic/assignments")
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    @PostMapping
    public ResponseEntity<Assignment> createAssignment(@RequestBody Assignment assignment) {
        return ResponseEntity.ok(assignmentService.createAssignment(assignment));
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Assignment>> getStudentAssignments(@PathVariable String studentId) {
        return ResponseEntity.ok(assignmentService.getAssignmentsByStudent(studentId));
    }

    @GetMapping("/teacher/{teacherId}")
    public ResponseEntity<List<Assignment>> getTeacherAssignments(@PathVariable String teacherId) {
        return ResponseEntity.ok(assignmentService.getAssignmentsByTeacher(teacherId));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Assignment> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        return ResponseEntity.ok(assignmentService.updateStatus(id, payload.get("status")));
    }
}
