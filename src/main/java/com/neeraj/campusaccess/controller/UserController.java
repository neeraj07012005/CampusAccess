package com.neeraj.campusaccess.controller;

import com.neeraj.campusaccess.dto.ForgotPasswordRequest;
import com.neeraj.campusaccess.dto.LoginRequest;
import com.neeraj.campusaccess.dto.ResetPasswordRequest;
import com.neeraj.campusaccess.entity.AppUser;
import com.neeraj.campusaccess.repository.AppUserRepository;
import com.neeraj.campusaccess.security.JwtService;
import com.neeraj.campusaccess.service.PasswordResetService;
import com.neeraj.campusaccess.service.RegistrationOtpService;

import jakarta.validation.Valid;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final PasswordResetService passwordResetService;
    private final RegistrationOtpService registrationOtpService;


    // =========================
    // CONSTRUCTOR
    // =========================

    public UserController(
            AppUserRepository appUserRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            PasswordResetService passwordResetService,
            RegistrationOtpService registrationOtpService) {

        this.appUserRepository = appUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.passwordResetService = passwordResetService;
        this.registrationOtpService = registrationOtpService;
    }


    // =========================
    // REGISTER - SEND OTP
    // =========================

    @PostMapping("/register/send-otp")
    public String sendRegistrationOtp(
            @Valid @RequestBody AppUser appUser) {

        registrationOtpService.sendOtp(
                appUser.getUsername(),
                appUser.getEmail(),
                appUser.getPassword(),
                appUser.getRole().name()
        );

        return "OTP sent successfully";
    }


    // =========================
    // REGISTER - VERIFY OTP
    // =========================

    @PostMapping("/register/verify-otp")
    public AppUser verifyRegistrationOtp(
            @RequestParam String email,
            @RequestParam String otp) {

        return registrationOtpService.verifyOtp(
                email,
                otp
        );
    }


    // =========================
    // REGISTER
    // =========================

    @PostMapping("/register")
    public AppUser registerUser(
            @Valid @RequestBody AppUser appUser) {

        if (appUserRepository.existsByUsername(
                appUser.getUsername())) {

            throw new RuntimeException(
                    "Username already exists"
            );
        }

        appUser.setPassword(
                passwordEncoder.encode(
                        appUser.getPassword()
                )
        );

        return appUserRepository.save(appUser);
    }


    // =========================
    // LOGIN
    // =========================

    @PostMapping("/login")
    public String login(
            @Valid @RequestBody LoginRequest request) {

        AppUser user =
                appUserRepository.findByUsername(
                        request.getUsername()
                );

        if (user == null) {

            throw new RuntimeException(
                    "User not found"
            );
        }

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException(
                    "Invalid password"
            );
        }

        return jwtService.generateToken(
                user.getUsername()
        );
    }


    // =========================
    // FORGOT PASSWORD
    // =========================

    @PostMapping("/forgot-password")
    public String forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request) {

        passwordResetService.sendResetEmail(
                request.getEmail()
        );

        return "If the email exists, a password reset link has been sent.";
    }


    // =========================
    // RESET PASSWORD
    // =========================

    @PostMapping("/reset-password")
    public String resetPassword(
            @Valid @RequestBody ResetPasswordRequest request) {

        boolean success =
                passwordResetService.resetPassword(
                        request.getToken(),
                        request.getNewPassword()
                );

        if (!success) {

            throw new RuntimeException(
                    "Invalid or expired reset token"
            );
        }

        return "Password reset successfully";
    }


    // =========================
    // GET ALL USERS
    // =========================

    @GetMapping
    public List<AppUser> getAllUsers() {

        return appUserRepository.findAll();
    }


    // =========================
    // GET USER BY ID
    // =========================

    @GetMapping("/{id}")
    public AppUser getUserById(
            @PathVariable Long id) {

        return appUserRepository
                .findById(id)
                .orElse(null);
    }


    // =========================
    // CURRENT USER ROLE
    // =========================

    @GetMapping("/me")
    public String getCurrentUserRole() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String username =
                authentication.getName();

        AppUser user =
                appUserRepository
                        .findByUsername(username);

        return user.getRole().name();
    }
}