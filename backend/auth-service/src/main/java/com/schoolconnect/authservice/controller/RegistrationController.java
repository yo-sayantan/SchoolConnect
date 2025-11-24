package com.schoolconnect.authservice.controller;

import com.schoolconnect.authservice.dto.ApprovalRequestDto;
import com.schoolconnect.authservice.dto.RegistrationRequestDto;
import com.schoolconnect.authservice.model.RegistrationRequest;
import com.schoolconnect.authservice.model.Role;
import com.schoolconnect.authservice.model.User;
import com.schoolconnect.authservice.service.RegistrationService;
import com.schoolconnect.authservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/registration")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class RegistrationController {

    private final RegistrationService registrationService;
    private final UserService userService;

    @PostMapping("/submit")
    public ResponseEntity<?> submitRegistration(@RequestBody RegistrationRequestDto dto) {
        try {
            RegistrationRequest request = registrationService.submitRegistration(dto);
            return ResponseEntity.ok(Map.of(
                    "message", "Registration request submitted successfully",
                    "requestId", request.getId(),
                    "status", request.getStatus()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to submit registration request"));
        }
    }

    @GetMapping("/pending")
    public ResponseEntity<?> getPendingRequests(@RequestHeader("X-User-Role") String role) {
        // Only PRINCIPAL, ADMIN_ASSISTANT can view pending requests
        if (!canManageRegistrations(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Access denied"));
        }

        List<RegistrationRequest> requests = registrationService.getPendingRequests();
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllRequests(
            @RequestHeader("X-User-Role") String role,
            @RequestParam(required = false) String status) {

        if (!canManageRegistrations(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Access denied"));
        }

        if (status != null) {
            RegistrationRequest.RegistrationStatus requestStatus = RegistrationRequest.RegistrationStatus
                    .valueOf(status.toUpperCase());
            List<RegistrationRequest> requests = registrationService.getRequestsByStatus(requestStatus);
            return ResponseEntity.ok(requests);
        }

        return ResponseEntity
                .ok(registrationService.getRequestsByStatus(RegistrationRequest.RegistrationStatus.PENDING));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRequestById(
            @PathVariable Long id,
            @RequestHeader("X-User-Role") String role) {

        if (!canManageRegistrations(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Access denied"));
        }

        Optional<RegistrationRequest> request = registrationService.getRequestById(id);
        return request.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/approve")
    public ResponseEntity<?> approveRegistration(
            @RequestBody ApprovalRequestDto dto,
            @RequestHeader("X-User-Email") String reviewerEmail,
            @RequestHeader("X-User-Role") String role) {

        if (!canManageRegistrations(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Access denied"));
        }

        try {
            // Get reviewer user ID
            Optional<User> reviewer = userService.findByEmail(reviewerEmail);
            if (reviewer.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Reviewer not found"));
            }

            User result = registrationService.approveRegistration(dto, reviewer.get().getId());

            if (result == null) {
                return ResponseEntity.ok(Map.of(
                        "message", "Registration request rejected",
                        "requestId", dto.getRequestId()));
            }

            return ResponseEntity.ok(Map.of(
                    "message", "Registration approved successfully",
                    "userId", result.getId(),
                    "email", result.getEmail()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to process registration request"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRequest(
            @PathVariable Long id,
            @RequestHeader("X-User-Role") String role) {

        // Only PRINCIPAL can delete requests
        if (!role.equals("PRINCIPAL")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Only principal can delete registration requests"));
        }

        registrationService.deleteRequest(id);
        return ResponseEntity.ok(Map.of("message", "Registration request deleted"));
    }

    private boolean canManageRegistrations(String role) {
        return role.equals("PRINCIPAL") || role.equals("ADMIN_ASSISTANT");
    }
}
