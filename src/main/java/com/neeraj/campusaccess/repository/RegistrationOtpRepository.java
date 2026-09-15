package com.neeraj.campusaccess.repository;

import com.neeraj.campusaccess.entity.RegistrationOtp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RegistrationOtpRepository
        extends JpaRepository<RegistrationOtp, Long> {

    Optional<RegistrationOtp> findByEmail(String email);

    void deleteByEmail(String email);
}