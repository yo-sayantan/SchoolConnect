package com.schoolconnect.academicservice.controller;

import com.schoolconnect.academicservice.model.Attendance;
import com.schoolconnect.academicservice.repository.AttendanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/attendance")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AttendanceController {

    private final AttendanceRepository attendanceRepository;

    @GetMapping
    public ResponseEntity<List<Attendance>> getAllAttendance() {
        return ResponseEntity.ok(attendanceRepository.findAll());
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Attendance>> getAttendanceByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(attendanceRepository.findByStudentId(studentId));
    }

    @GetMapping("/class/{classId}")
    public ResponseEntity<List<Attendance>> getAttendanceByClass(@PathVariable Long classId) {
        return ResponseEntity.ok(attendanceRepository.findByClassId(classId));
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<Attendance>> getAttendanceByDate(@PathVariable String date) {
        LocalDate localDate = LocalDate.parse(date);
        return ResponseEntity.ok(attendanceRepository.findByDate(localDate));
    }

    @PostMapping
    public ResponseEntity<Attendance> createAttendance(@RequestBody Attendance attendance) {
        return ResponseEntity.ok(attendanceRepository.save(attendance));
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<Attendance>> createBulkAttendance(@RequestBody List<Attendance> attendanceList) {
        return ResponseEntity.ok(attendanceRepository.saveAll(attendanceList));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAttendance(@PathVariable Long id, @RequestBody Attendance attendance) {
        return attendanceRepository.findById(id)
                .map(existing -> {
                    attendance.setId(id);
                    return ResponseEntity.ok(attendanceRepository.save(attendance));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAttendance(@PathVariable Long id) {
        attendanceRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
