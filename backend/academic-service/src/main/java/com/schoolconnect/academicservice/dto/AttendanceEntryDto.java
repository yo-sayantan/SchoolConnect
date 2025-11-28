package com.schoolconnect.academicservice.dto;

import com.schoolconnect.academicservice.model.Attendance;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class AttendanceEntryDto {
    private Long classId;
    private LocalDate date;
    private List<StudentAttendanceDto> studentAttendance;

    @Data
    public static class StudentAttendanceDto {
        private Long studentId;
        private Attendance.AttendanceStatus status;
        private String remarks;
    }
}
