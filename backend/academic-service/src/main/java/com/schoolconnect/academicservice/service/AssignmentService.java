package com.schoolconnect.academicservice.service;

import com.schoolconnect.academicservice.model.Assignment;
import com.schoolconnect.academicservice.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    public Assignment createAssignment(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    public List<Assignment> getAssignmentsByStudent(String studentId) {
        return assignmentRepository.findByStudentId(studentId);
    }

    public List<Assignment> getAssignmentsByTeacher(String teacherId) {
        return assignmentRepository.findByTeacherId(teacherId);
    }

    public Assignment updateStatus(Long id, String status) {
        Assignment assignment = assignmentRepository.findById(id).orElse(null);
        if (assignment != null) {
            assignment.setStatus(status);
            return assignmentRepository.save(assignment);
        }
        return null;
    }
}
