package com.schoolconnect.academicservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentStatsDto {
    private Long studentId;
    private Double attendancePercentage;
    private Double averageGrade;
    private Integer totalClasses;
    private Integer classesAttended;
}
