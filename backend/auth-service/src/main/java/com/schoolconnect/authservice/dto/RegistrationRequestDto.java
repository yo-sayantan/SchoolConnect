package com.schoolconnect.authservice.dto;

import com.schoolconnect.authservice.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationRequestDto {
    private String email;
    private String phoneNumber;
    private String name;
    private Role role; // STUDENT or PARENT
    private String password;
    private String idCardFrontUrl;
    private String idCardBackUrl;
    private String linkedStudentIds; // For parents - comma-separated student IDs
    private String address;
    private String dateOfBirth;
    private String guardianName;
    private String emergencyContact;
}
