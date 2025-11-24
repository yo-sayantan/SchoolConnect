package com.schoolconnect.authservice.service;

import com.schoolconnect.authservice.model.OTP;
import com.schoolconnect.authservice.repository.OTPRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class OTPService {

    private final OTPRepository otpRepository;

    @Value("${otp.expiration}")
    private Long otpExpiration;

    @Value("${otp.length}")
    private Integer otpLength;

    public String generateOTP(String identifier) {
        // Generate random OTP
        String otpCode = generateRandomOTP();

        // Create OTP entity
        OTP otp = new OTP();
        otp.setIdentifier(identifier);
        otp.setOtpCode(otpCode);
        otp.setExpiresAt(LocalDateTime.now().plusSeconds(otpExpiration / 1000));
        otp.setVerified(false);

        otpRepository.save(otp);

        log.info("Generated OTP for identifier: {} - OTP: {}", identifier, otpCode);

        // In production, send via SMS/Email
        // For now, just log it

        return otpCode;
    }

    public boolean verifyOTP(String identifier, String otpCode) {
        Optional<OTP> otpOptional = otpRepository
                .findByIdentifierAndOtpCodeAndVerifiedFalse(identifier, otpCode);

        if (otpOptional.isEmpty()) {
            log.warn("OTP not found for identifier: {}", identifier);
            return false;
        }

        OTP otp = otpOptional.get();

        if (otp.isExpired()) {
            log.warn("OTP expired for identifier: {}", identifier);
            return false;
        }

        otp.setVerified(true);
        otpRepository.save(otp);

        log.info("OTP verified successfully for identifier: {}", identifier);
        return true;
    }

    @Transactional
    public void cleanupExpiredOTPs() {
        otpRepository.deleteByExpiresAtBefore(LocalDateTime.now());
    }

    private String generateRandomOTP() {
        Random random = new Random();
        StringBuilder otp = new StringBuilder();
        for (int i = 0; i < otpLength; i++) {
            otp.append(random.nextInt(10));
        }
        return otp.toString();
    }
}
