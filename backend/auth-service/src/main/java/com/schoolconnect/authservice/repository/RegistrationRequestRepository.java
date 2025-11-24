package com.schoolconnect.authservice.repository;

import com.schoolconnect.authservice.model.RegistrationRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RegistrationRequestRepository extends JpaRepository<RegistrationRequest, Long> {

    List<RegistrationRequest> findByStatus(RegistrationRequest.RegistrationStatus status);

    Optional<RegistrationRequest> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByPhoneNumber(String phoneNumber);

    List<RegistrationRequest> findByStatusOrderByCreatedAtDesc(RegistrationRequest.RegistrationStatus status);
}
