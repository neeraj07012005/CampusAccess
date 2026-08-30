package com.neeraj.campusaccess.entity;

import com.neeraj.campusaccess.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // =========================
    // USERNAME
    // =========================

    @NotBlank(message = "Username cannot be empty")
    @Size(
        min = 3,
        max = 20,
        message = "Username must be between 3 and 20 characters"
    )
    @Column(unique = true, nullable = false)
    private String username;


    // =========================
    // EMAIL
    // =========================

    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Enter a valid email address")
    @Column(unique = true, nullable = false)
    private String email;


    // =========================
    // PASSWORD
    // =========================

    @NotBlank(message = "Password cannot be empty")
    @Size(
        min = 6,
        message = "Password must be at least 6 characters"
    )
    private String password;


    // =========================
    // ROLE
    // =========================

    @Enumerated(EnumType.STRING)
    private Role role;


    // =========================
    // CONSTRUCTOR
    // =========================

    public AppUser() {
    }


    public AppUser(
            String username,
            String email,
            String password,
            Role role) {

        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
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


    public Role getRole() {
        return role;
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


    public void setRole(Role role) {
        this.role = role;
    }
}