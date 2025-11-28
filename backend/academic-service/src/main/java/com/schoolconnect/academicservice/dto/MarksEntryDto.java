package com.schoolconnect.academicservice.dto;

import com.schoolconnect.academicservice.model.Marks;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class MarksEntryDto {
    private Long classId;
    private Long subjectId;
    private Marks.ExamType examType;
    private Marks.Term term;
    private String examName;
    private LocalDate examDate;
    private Double totalMarks;
    private List<StudentMarkDto> studentMarks;

    @Data
    public static class StudentMarkDto {
        private Long studentId;
        private Double marksObtained;
        private String remarks;
    }
}
