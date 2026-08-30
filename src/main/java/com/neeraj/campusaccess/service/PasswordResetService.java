package com.neeraj.campusaccess.service;

import com.neeraj.campusaccess.entity.AppUser;
import com.neeraj.campusaccess.entity.PasswordResetToken;
import com.neeraj.campusaccess.repository.AppUserRepository;
import com.neeraj.campusaccess.repository.PasswordResetTokenRepository;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PasswordResetService {

    private final AppUserRepository appUserRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final JavaMailSender mailSender;
    private final PasswordEncoder passwordEncoder;

    public PasswordResetService(
            AppUserRepository appUserRepository,
            PasswordResetTokenRepository tokenRepository,
            JavaMailSender mailSender,
            PasswordEncoder passwordEncoder) {

        this.appUserRepository = appUserRepository;
        this.tokenRepository = tokenRepository;
        this.mailSender = mailSender;
        this.passwordEncoder = passwordEncoder;
    }


    // =====================================================
    // FORGOT PASSWORD
    // =====================================================

    @Transactional
    public void sendResetEmail(String email) {

        AppUser user =
                appUserRepository.findByEmail(email);

        // Do not reveal whether email exists
        if (user == null) {
            return;
        }


        // Delete any old reset token
        tokenRepository.deleteByEmail(email);


        // Generate new token
        String token =
                UUID.randomUUID().toString();


        // Token expires after 15 minutes
        LocalDateTime expiry =
                LocalDateTime.now().plusMinutes(15);


        PasswordResetToken resetToken =
                new PasswordResetToken(
                        token,
                        email,
                        expiry
                );


        // Save token
        tokenRepository.save(resetToken);


        // IMPORTANT:
        // For local testing this is localhost.
        // Before Vercel deployment, change this
        // to your deployed frontend URL.
        String resetLink =
                "http://localhost:5173/reset-password?token="
                        + token;


        // Create email
        SimpleMailMessage message =
                new SimpleMailMessage();


        message.setTo(email);


        message.setSubject(
                "CampusAccess Password Reset"
        );


        message.setText(
                "Hello " + user.getUsername() + ",\n\n"
                + "You requested a password reset for your CampusAccess account.\n\n"
                + "Click the link below to reset your password:\n\n"
                + resetLink
                + "\n\n"
                + "This link will expire in 15 minutes.\n\n"
                + "If you did not request this, ignore this email.\n\n"
                + "CampusAccess"
        );


        // Send email
        mailSender.send(message);
    }


    // =====================================================
    // RESET PASSWORD
    // =====================================================

    @Transactional
    public boolean resetPassword(
            String token,
            String newPassword) {


        PasswordResetToken resetToken =
                tokenRepository
                        .findByToken(token)
                        .orElse(null);


        // Token doesn't exist
        if (resetToken == null) {
            return false;
        }


        // Token expired
        if (resetToken
                .getExpiryDate()
                .isBefore(LocalDateTime.now())) {

            tokenRepository.deleteByToken(token);

            return false;
        }


        // Find user
        AppUser user =
                appUserRepository
                        .findByEmail(
                                resetToken.getEmail()
                        );


        if (user == null) {
            return false;
        }


        // Encode new password
        user.setPassword(
                passwordEncoder.encode(newPassword)
        );


        // Save new password
        appUserRepository.save(user);


        // Delete token so it cannot be reused
        tokenRepository.deleteByToken(token);


        return true;
    }
}