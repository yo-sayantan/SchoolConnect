package com.schoolconnect.authservice.service;

import com.schoolconnect.authservice.dto.ApprovalRequestDto;
import com.schoolconnect.authservice.dto.RegistrationRequestDto;
import com.schoolconnect.authservice.model.RegistrationRequest;
import com.schoolconnect.authservice.model.Role;
import com.schoolconnect.authservice.model.User;
import com.schoolconnect.authservice.repository.RegistrationRequestRepository;
import com.schoolconnect.authservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class RegistrationService {

    private final RegistrationRequestRepository registrationRequestRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;

    public RegistrationRequest submitRegistration(RegistrationRequestDto dto) {
        // Validate role - only STUDENT and PARENT can register
        if (dto.getRole() != Role.STUDENT && dto.getRole() != Role.PARENT) {
            throw new IllegalArgumentException("Only students and parents can register through this process");
        }

        // Check if email already exists in users or pending requests
        if (userService.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }
        if (registrationRequestRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Registration request already submitted for this email");
        }

        // Check phone number
        if (dto.getPhoneNumber() != null) {
            if (userService.existsByPhoneNumber(dto.getPhoneNumber())) {
                throw new IllegalArgumentException("Phone number already registered");
            }
            if (registrationRequestRepository.existsByPhoneNumber(dto.getPhoneNumber())) {
                throw new IllegalArgumentException("Registration request already submitted for this phone number");
            }
        }

        // For parent registration, validate student IDs
        if (dto.getRole() == Role.PARENT
                && (dto.getLinkedStudentIds() == null || dto.getLinkedStudentIds().trim().isEmpty())) {
            throw new IllegalArgumentException("Parent registration must include at least one student ID");
        }

        // Validate ID card uploads
        if (dto.getIdCardFrontUrl() == null || dto.getIdCardBackUrl() == null) {
            throw new IllegalArgumentException("Both ID card front and back images are required");
        }

        RegistrationRequest request = new RegistrationRequest();
        request.setEmail(dto.getEmail());
        request.setPhoneNumber(dto.getPhoneNumber());
        request.setName(dto.getName());
        request.setRole(dto.getRole());
        request.setPassword(passwordEncoder.encode(dto.getPassword()));
        request.setIdCardFrontUrl(dto.getIdCardFrontUrl());
        request.setIdCardBackUrl(dto.getIdCardBackUrl());
        request.setLinkedStudentIds(dto.getLinkedStudentIds());
        request.setAddress(dto.getAddress());
        request.setDateOfBirth(dto.getDateOfBirth());
        request.setGuardianName(dto.getGuardianName());
        request.setEmergencyContact(dto.getEmergencyContact());
        request.setStatus(RegistrationRequest.RegistrationStatus.PENDING);

        RegistrationRequest saved = registrationRequestRepository.save(request);
        log.info("Registration request submitted for {} ({})", dto.getName(), dto.getEmail());
        return saved;
    }

    public List<RegistrationRequest> getPendingRequests() {
        return registrationRequestRepository
                .findByStatusOrderByCreatedAtDesc(RegistrationRequest.RegistrationStatus.PENDING);
    }

    public List<RegistrationRequest> getRequestsByStatus(RegistrationRequest.RegistrationStatus status) {
        return registrationRequestRepository.findByStatus(status);
    }

    public Optional<RegistrationRequest> getRequestById(Long id) {
        return registrationRequestRepository.findById(id);
    }

    @Transactional
    public User approveRegistration(ApprovalRequestDto dto, Long reviewerId) {
        RegistrationRequest request = registrationRequestRepository.findById(dto.getRequestId())
                .orElseThrow(() -> new IllegalArgumentException("Registration request not found"));

        if (request.getStatus() != RegistrationRequest.RegistrationStatus.PENDING) {
            throw new IllegalArgumentException("Registration request has already been processed");
        }

        if (!dto.isApproved()) {
            // Reject the request
            request.setStatus(RegistrationRequest.RegistrationStatus.REJECTED);
            request.setReviewedBy(reviewerId);
            request.setReviewedAt(LocalDateTime.now());
            request.setReviewNotes(dto.getReviewNotes());
            registrationRequestRepository.save(request);
            log.info("Registration request rejected for {}", request.getEmail());
            return null;
        }

        // Approve and create user account
        User user = new User();
        user.setEmail(dto.getEmail() != null ? dto.getEmail() : request.getEmail());
        user.setPhoneNumber(dto.getPhoneNumber() != null ? dto.getPhoneNumber() : request.getPhoneNumber());
        user.setName(dto.getName() != null ? dto.getName() : request.getName());
        user.setRole(request.getRole());
        user.setPassword(request.getPassword()); // Already hashed
        user.setIdCardFrontUrl(request.getIdCardFrontUrl());
        user.setIdCardBackUrl(request.getIdCardBackUrl());
        user.setLinkedStudentIds(
                dto.getLinkedStudentIds() != null ? dto.getLinkedStudentIds() : request.getLinkedStudentIds());
        user.setAddress(dto.getAddress() != null ? dto.getAddress() : request.getAddress());
        user.setDateOfBirth(dto.getDateOfBirth() != null ? dto.getDateOfBirth() : request.getDateOfBirth());
        user.setGuardianName(dto.getGuardianName() != null ? dto.getGuardianName() : request.getGuardianName());
        user.setEmergencyContact(
                dto.getEmergencyContact() != null ? dto.getEmergencyContact() : request.getEmergencyContact());
        user.setActive(true);
        user.setVerified(true);
        user.setApprovedBy(reviewerId);
        user.setApprovedAt(LocalDateTime.now());

        User savedUser = userRepository.save(user);

        // Update request status
        request.setStatus(RegistrationRequest.RegistrationStatus.APPROVED);
        request.setReviewedBy(reviewerId);
        request.setReviewedAt(LocalDateTime.now());
        request.setReviewNotes(dto.getReviewNotes());
        registrationRequestRepository.save(request);

        log.info("Registration approved for {} by user {}", user.getEmail(), reviewerId);
        return savedUser;
    }

    public void deleteRequest(Long requestId) {
        registrationRequestRepository.deleteById(requestId);
    }
}
