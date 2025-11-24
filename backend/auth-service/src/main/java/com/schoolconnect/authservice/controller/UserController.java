package com.schoolconnect.authservice.controller;

import com.schoolconnect.authservice.model.Role;
import com.schoolconnect.authservice.model.User;
import com.schoolconnect.authservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<?> getAllUsers(@RequestHeader(value = "X-User-Role", required = false) String role) {
        // Only admin roles can view all users
        if (role == null || !canManageUsers(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Access denied"));
        }
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        return userService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/role/{role}")
    public ResponseEntity<?> getUsersByRole(
            @PathVariable Role role,
            @RequestHeader(value = "X-User-Role", required = false) String userRole) {

        if (userRole == null || !canManageUsers(userRole)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Access denied"));
        }
        return ResponseEntity.ok(userService.findByRole(role));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.findById(id)
                .map(existingUser -> {
                    user.setId(id);
                    return ResponseEntity.ok(userService.updateUser(user));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/disable")
    public ResponseEntity<?> disableUser(
            @PathVariable Long id,
            @RequestHeader("X-User-Role") String role) {

        // Only PRINCIPAL, ADMIN_ASSISTANT can disable accounts
        if (!canManageAccounts(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Access denied. Only Principal and Admin Assistant can disable accounts"));
        }

        Optional<User> userOpt = userService.findById(id);
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = userOpt.get();

        // Can only disable STUDENT and PARENT accounts
        if (user.getRole() != Role.STUDENT && user.getRole() != Role.PARENT) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Can only disable student and parent accounts"));
        }

        user.setActive(false);
        userService.updateUser(user);

        return ResponseEntity.ok(Map.of(
                "message", "User account disabled successfully",
                "userId", id));
    }

    @PutMapping("/{id}/enable")
    public ResponseEntity<?> enableUser(
            @PathVariable Long id,
            @RequestHeader("X-User-Role") String role) {

        // Only PRINCIPAL, ADMIN_ASSISTANT can enable accounts
        if (!canManageAccounts(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Access denied. Only Principal and Admin Assistant can enable accounts"));
        }

        Optional<User> userOpt = userService.findById(id);
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = userOpt.get();
        user.setActive(true);
        userService.updateUser(user);

        return ResponseEntity.ok(Map.of(
                "message", "User account enabled successfully",
                "userId", id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(
            @PathVariable Long id,
            @RequestHeader("X-User-Role") String role) {

        // Only PRINCIPAL can delete users
        if (!role.equals("PRINCIPAL")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Only Principal can delete users"));
        }

        userService.deleteUser(id);
        return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
    }

    private boolean canManageUsers(String role) {
        return role.equals("PRINCIPAL") || role.equals("ADMIN_ASSISTANT");
    }

    private boolean canManageAccounts(String role) {
        return role.equals("PRINCIPAL") || role.equals("ADMIN_ASSISTANT");
    }
}
