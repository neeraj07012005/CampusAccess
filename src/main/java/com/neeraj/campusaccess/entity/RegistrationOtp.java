package com.neeraj.campusaccess.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class RegistrationOtp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // =========================
    // REGISTRATION DETAILS
    // =========================

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String email;

    // Password is already encoded before being stored here
    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role;

    // =========================
    // OTP
    // =========================

    @Column(nullable = false)
    private String otp;

    @Column(nullable = false)
    private LocalDateTime expiryDate;


    // =========================
    // CONSTRUCTORS
    // =========================

    public RegistrationOtp() {
    }

    public RegistrationOtp(
            String username,
            String email,
            String password,
            String role,
            String otp,
            LocalDateTime expiryDate) {

        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.otp = otp;
        this.expiryDate = expiryDate;
    }


    // =========================
    // GETTERS
    // =========================

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getRole() {
        return role;
    }

    public String getOtp() {
        return otp;
    }

    public LocalDateTime getExpiryDate() {
        return expiryDate;
    }


    // =========================
    // SETTERS
    // =========================

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public void setExpiryDate(LocalDateTime expiryDate) {
        this.expiryDate = expiryDate;
    }
}