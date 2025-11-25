package com.schoolconnect.authservice.config;

import com.schoolconnect.authservice.model.Role;
import com.schoolconnect.authservice.model.User;
import com.schoolconnect.authservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            log.info("Initializing demo data...");

            // Principal
            createUser("principal@school.com", "+1234567890", "Dr. Sarah Johnson", Role.PRINCIPAL, "password123");

            // Admin Assistant
            createUser("admin@school.com", "+1234567891", "Michael Chen", Role.ADMIN_ASSISTANT, "password123");

            // Teachers
            createUser("teacher1@school.com", "+1234567892", "Mr. Robert Smith", Role.TEACHER, "password123");
            createUser("teacher2@school.com", "+1234567893", "Ms. Emily Davis", Role.TEACHER, "password123");
            createUser("teacher3@school.com", "+1234567894", "Mrs. Jennifer Wilson", Role.TEACHER, "password123");

            // Parents
            createUser("parent1@school.com", "+1234567895", "John Anderson", Role.PARENT, "password123");
            createUser("parent2@school.com", "+1234567896", "Mary Thompson", Role.PARENT, "password123");
            createUser("parent3@school.com", "+1234567897", "David Martinez", Role.PARENT, "password123");

            // Students
            createUser("student1@school.com", "+1234567898", "Emma Anderson", Role.STUDENT, "password123");
            createUser("student2@school.com", "+1234567899", "Liam Thompson", Role.STUDENT, "password123");
            createUser("student3@school.com", "+1234567800", "Olivia Martinez", Role.STUDENT, "password123");
            createUser("student4@school.com", "+1234567801", "Noah Garcia", Role.STUDENT, "password123");
            createUser("student5@school.com", "+1234567802", "Ava Rodriguez", Role.STUDENT, "password123");

            log.info("Demo data initialized successfully!");
            log.info("Login credentials - Email: [role]@school.com, Password: password123");
        }
    }

    private void createUser(String email, String phone, String name, Role role, String password) {
        User user = new User();
        user.setEmail(email);
        user.setPhoneNumber(phone);
        user.setName(name);
        user.setRole(role);
        // user.setPassword(passwordEncoder.encode(password)); // Disable encryption
        user.setPassword(password);
        user.setActive(true);
        user.setVerified(true);
        userRepository.save(user);
        log.info("Created user: {} ({})", name, role);
    }
}
