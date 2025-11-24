package com.schoolconnect.authservice.dto;

import com.schoolconnect.authservice.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String email;
    private String phoneNumber;
    private String name;
    private Role role;
    private String password;
}
