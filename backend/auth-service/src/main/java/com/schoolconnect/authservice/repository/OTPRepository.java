package com.schoolconnect.authservice.repository;

import com.schoolconnect.authservice.model.OTP;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface OTPRepository extends JpaRepository<OTP, Long> {
    Optional<OTP> findByIdentifierAndOtpCodeAndVerifiedFalse(String identifier, String otpCode);

    Optional<OTP> findTopByIdentifierAndVerifiedFalseOrderByCreatedAtDesc(String identifier);

    void deleteByExpiresAtBefore(LocalDateTime dateTime);
}
