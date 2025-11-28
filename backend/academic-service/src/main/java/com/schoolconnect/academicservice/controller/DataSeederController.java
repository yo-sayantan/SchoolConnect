package com.schoolconnect.academicservice.controller;

import com.schoolconnect.academicservice.model.Attendance;
import com.schoolconnect.academicservice.model.Marks;
import com.schoolconnect.academicservice.repository.AttendanceRepository;
import com.schoolconnect.academicservice.repository.MarksRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/seed")
@RequiredArgsConstructor
public class DataSeederController {

    private final MarksRepository marksRepository;
    private final AttendanceRepository attendanceRepository;
    private final Random random = new Random();

    @PostMapping
    public ResponseEntity<String> seedData() {
        seedMarks();
        seedAttendance();
        return ResponseEntity.ok("Data seeding completed successfully!");
    }

    private void seedMarks() {
        List<Marks> marksList = new ArrayList<>();
        long[] subjectIds = { 1L, 2L, 3L, 4L, 5L }; // Math, Science, English, History, Art
        String[] examNames = { "Mid-Term", "Final" };

        // 50 Students (Assuming IDs 1-100 range)
        for (long studentId = 1; studentId <= 100; studentId++) {
            // 3 Years
            for (int year = 0; year < 3; year++) {
                int currentYear = LocalDate.now().getYear() - year;

                // 2 Terms per year
                for (int term = 1; term <= 2; term++) {
                    Marks.Term termEnum = term == 1 ? Marks.Term.TERM_1 : Marks.Term.TERM_2;

                    for (long subjectId : subjectIds) {
                        for (String examName : examNames) {
                            Marks marks = new Marks();
                            marks.setStudentId(studentId);
                            marks.setSubjectId(subjectId);
                            marks.setClassId((long) (random.nextInt(12) + 1)); // Classes 1-12
                            marks.setExamType(
                                    examName.equals("Mid-Term") ? Marks.ExamType.HALF_TERM : Marks.ExamType.FULL_TERM);
                            marks.setTerm(termEnum);
                            marks.setExamName(examName + " " + currentYear);
                            marks.setExamDate(LocalDate.of(currentYear, term == 1 ? 6 : 12, 15));
                            marks.setTotalMarks(100.0);
                            marks.setMarksObtained(40.0 + random.nextDouble() * 60.0); // Random marks between 40 and
                                                                                       // 100
                            marks.setRemarks(marks.getMarksObtained() > 90 ? "Excellent" : "Good");

                            marksList.add(marks);
                        }
                    }
                }
            }
        }
        marksRepository.saveAll(marksList);
    }

    private void seedAttendance() {
        List<Attendance> attendanceList = new ArrayList<>();
        LocalDate startDate = LocalDate.now().minusYears(3);
        LocalDate endDate = LocalDate.now();

        // 50 Students
        for (long studentId = 1; studentId <= 100; studentId++) {
            long classId = (long) (random.nextInt(12) + 1);

            // Generate ~80% attendance records
            for (LocalDate date = startDate; date.isBefore(endDate); date = date.plusDays(1)) {
                if (date.getDayOfWeek().getValue() >= 6)
                    continue; // Skip weekends
                if (random.nextDouble() > 0.1) { // 10% chance of no record (holiday etc)
                    Attendance attendance = new Attendance();
                    attendance.setStudentId(studentId);
                    attendance.setClassId(classId);
                    attendance.setDate(date);

                    double statusRoll = random.nextDouble();
                    if (statusRoll > 0.1) {
                        attendance.setStatus(Attendance.AttendanceStatus.PRESENT);
                    } else if (statusRoll > 0.05) {
                        attendance.setStatus(Attendance.AttendanceStatus.ABSENT);
                    } else {
                        attendance.setStatus(Attendance.AttendanceStatus.LATE);
                    }

                    attendanceList.add(attendance);
                }
            }
        }
        // Save in chunks to avoid memory issues
        int batchSize = 1000;
        for (int i = 0; i < attendanceList.size(); i += batchSize) {
            int end = Math.min(i + batchSize, attendanceList.size());
            attendanceRepository.saveAll(attendanceList.subList(i, end));
        }
    }
}
