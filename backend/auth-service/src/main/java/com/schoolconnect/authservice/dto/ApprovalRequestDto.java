package com.schoolconnect.authservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApprovalRequestDto {
    private Long requestId;
    private boolean approved;
    private String reviewNotes;

    // Editable fields during approval
    private String name;
    private String email;
    private String phoneNumber;
    private String address;
    private String dateOfBirth;
    private String guardianName;
    private String emergencyContact;
    private String linkedStudentIds; // For parents
}
