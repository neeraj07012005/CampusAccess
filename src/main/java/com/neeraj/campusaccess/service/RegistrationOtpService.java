package com.neeraj.campusaccess.service;

import com.neeraj.campusaccess.entity.AppUser;
import com.neeraj.campusaccess.entity.RegistrationOtp;
import com.neeraj.campusaccess.repository.AppUserRepository;
import com.neeraj.campusaccess.repository.RegistrationOtpRepository;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class RegistrationOtpService {

    private final AppUserRepository appUserRepository;
    private final RegistrationOtpRepository registrationOtpRepository;
    private final JavaMailSender mailSender;
    private final PasswordEncoder passwordEncoder;

    public RegistrationOtpService(
            AppUserRepository appUserRepository,
            RegistrationOtpRepository registrationOtpRepository,
            JavaMailSender mailSender,
            PasswordEncoder passwordEncoder) {

        this.appUserRepository = appUserRepository;
        this.registrationOtpRepository = registrationOtpRepository;
        this.mailSender = mailSender;
        this.passwordEncoder = passwordEncoder;
    }


    // =====================================================
    // SEND OTP
    // =====================================================

    @Transactional
    public void sendOtp(
            String username,
            String email,
            String password,
            String role) {

        // Check username
        if (appUserRepository.existsByUsername(username)) {
            throw new RuntimeException(
                    "Username already exists"
            );
        }

        // Check email
        if (appUserRepository.findByEmail(email) != null) {
            throw new RuntimeException(
                    "Email already registered"
            );
        }

        // Delete any previous pending registration
        registrationOtpRepository.deleteByEmail(email);


        // Generate 6-digit OTP
        String otp = String.format(
                "%06d",
                new Random().nextInt(1_000_000)
        );


        // OTP expires after 10 minutes
        LocalDateTime expiryDate =
                LocalDateTime.now().plusMinutes(10);


        // Encode password before storing it temporarily
        String encodedPassword =
                passwordEncoder.encode(password);


        // Save pending registration
        RegistrationOtp registrationOtp =
                new RegistrationOtp(
                        username,
                        email,
                        encodedPassword,
                        role,
                        otp,
                        expiryDate
                );

        registrationOtpRepository.save(
                registrationOtp
        );


        // =================================================
        // SEND EMAIL
        // =================================================

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(email);

        message.setSubject(
                "CampusAccess Email Verification"
        );

        message.setText(
                "Hello " + username + ",\n\n"
                + "Your CampusAccess verification code is:\n\n"
                + otp
                + "\n\n"
                + "This OTP will expire in 10 minutes.\n\n"
                + "If you did not try to create a CampusAccess account, "
                + "you can ignore this email.\n\n"
                + "CampusAccess"
        );

        mailSender.send(message);
    }


    // =====================================================
    // VERIFY OTP
    // =====================================================

    @Transactional
    public AppUser verifyOtp(
            String email,
            String otp) {

        RegistrationOtp registrationOtp =
                registrationOtpRepository
                        .findByEmail(email)
                        .orElse(null);


        // No pending registration
        if (registrationOtp == null) {
            throw new RuntimeException(
                    "No pending registration found"
            );
        }


        // Check expiry
        if (registrationOtp
                .getExpiryDate()
                .isBefore(LocalDateTime.now())) {

            registrationOtpRepository.deleteByEmail(email);

            throw new RuntimeException(
                    "OTP has expired"
            );
        }


        // Check OTP
        if (!registrationOtp
                .getOtp()
                .equals(otp)) {

            throw new RuntimeException(
                    "Invalid OTP"
            );
        }


        // =================================================
        // OTP VERIFIED
        // NOW CREATE REAL USER
        // =================================================

        AppUser user =
                new AppUser();

        user.setUsername(
                registrationOtp.getUsername()
        );

        user.setEmail(
                registrationOtp.getEmail()
        );

        user.setPassword(
                registrationOtp.getPassword()
        );

        user.setRole(
                com.neeraj.campusaccess.enums.Role
                        .valueOf(
                                registrationOtp.getRole()
                        )
        );


        AppUser savedUser =
                appUserRepository.save(user);


        // Delete temporary registration
        registrationOtpRepository.deleteByEmail(email);


        return savedUser;
    }
}