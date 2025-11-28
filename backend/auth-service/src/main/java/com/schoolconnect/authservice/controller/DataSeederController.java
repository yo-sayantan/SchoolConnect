package com.schoolconnect.authservice.controller;

import com.schoolconnect.authservice.model.Role;
import com.schoolconnect.authservice.model.User;
import com.schoolconnect.authservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/seed")
@RequiredArgsConstructor
public class DataSeederController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping
    public ResponseEntity<String> seedUsers() {
        if (userRepository.count() > 0) {
            return ResponseEntity.ok("Users already exist. Skipping seeding.");
        }

        List<User> users = new ArrayList<>();

        // Seed Admin (Principal)
        User admin = new User();
        admin.setName("Principal User");
        admin.setEmail("admin@school.com");
        admin.setPhoneNumber("1234567890");
        admin.setPassword(passwordEncoder.encode("password"));
        admin.setRole(Role.PRINCIPAL);
        admin.setActive(true);
        admin.setVerified(true);
        users.add(admin);

        // Seed Headmaster (Admin Assistant)
        User headmaster = new User();
        headmaster.setName("Headmaster");
        headmaster.setEmail("headmaster@school.com");
        headmaster.setPhoneNumber("1234567891");
        headmaster.setPassword(passwordEncoder.encode("password"));
        headmaster.setRole(Role.ADMIN_ASSISTANT);
        headmaster.setActive(true);
        headmaster.setVerified(true);
        users.add(headmaster);

        // Seed Teachers
        for (int i = 1; i <= 5; i++) {
            User teacher = new User();
            teacher.setName("Teacher " + i);
            teacher.setEmail("teacher" + i + "@school.com");
            teacher.setPhoneNumber("123456780" + i);
            teacher.setPassword(passwordEncoder.encode("password"));
            teacher.setRole(Role.TEACHER);
            teacher.setActive(true);
            teacher.setVerified(true);
            users.add(teacher);
        }

        // Seed Students (IDs will be auto-generated, likely 8 to 57)
        // To ensure we match Academic Service, we might need to rely on the fact that
        // IDs are sequential.
        // Or we can just seed a lot and hope for overlap, or update Academic Service to
        // seed based on fetched users (too complex).
        // Let's just seed 50 students.
        for (int i = 1; i <= 50; i++) {
            User student = new User();
            student.setName("Student " + i);
            student.setEmail("student" + i + "@school.com");
            student.setPhoneNumber("98765432" + (i < 10 ? "0" + i : i));
            student.setPassword(passwordEncoder.encode("password"));
            student.setRole(Role.STUDENT);
            student.setActive(true);
            student.setVerified(true);
            users.add(student);
        }

        // Seed Parents
        for (int i = 1; i <= 50; i++) {
            User parent = new User();
            parent.setName("Parent " + i);
            parent.setEmail("parent" + i + "@school.com");
            parent.setPhoneNumber("87654321" + (i < 10 ? "0" + i : i));
            parent.setPassword(passwordEncoder.encode("password"));
            parent.setRole(Role.PARENT);
            parent.setActive(true);
            parent.setVerified(true);
            users.add(parent);
        }

        userRepository.saveAll(users);

        return ResponseEntity.ok("User seeding completed successfully!");
    }
}
