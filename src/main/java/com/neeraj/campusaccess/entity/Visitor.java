package com.neeraj.campusaccess.entity;

import java.time.LocalDateTime;

import com.neeraj.campusaccess.enums.VisitorStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
public class Visitor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Visitor name cannot be empty")
    @Size(min = 2, max = 50, message = "Visitor name must be between 2 and 50 characters")
    private String name;

    @NotBlank(message = "Purpose cannot be empty")
    @Size(min = 3, max = 100, message = "Purpose must be between 3 and 100 characters")
    private String purpose;

    @Column(unique = true)
    private String registrationNumber;

    // Student who created the request
    private String createdBy;

    // Time when request was created
    private LocalDateTime createdAt;

    // Time when visitor entered campus
    private LocalDateTime checkedInAt;

    // Time when visitor exited campus
    private LocalDateTime checkedOutAt;

    @Enumerated(EnumType.STRING)
    private VisitorStatus status;

    public Visitor() {
    }

    public Visitor(String name,
                   String purpose,
                   String createdBy,
                   LocalDateTime createdAt,
                   LocalDateTime checkedInAt,
                   LocalDateTime checkedOutAt,
                   VisitorStatus status) {

        this.name = name;
        this.purpose = purpose;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
        this.checkedInAt = checkedInAt;
        this.checkedOutAt = checkedOutAt;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPurpose() {
        return purpose;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getCheckedInAt() {
        return checkedInAt;
    }

    public LocalDateTime getCheckedOutAt() {
        return checkedOutAt;
    }

    public VisitorStatus getStatus() {
        return status;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setCheckedInAt(LocalDateTime checkedInAt) {
        this.checkedInAt = checkedInAt;
    }

    public void setCheckedOutAt(LocalDateTime checkedOutAt) {
        this.checkedOutAt = checkedOutAt;
    }

    public void setStatus(VisitorStatus status) {
        this.status = status;
    }

    public String getRegistrationNumber(){
        return registrationNumber;
    }
    public void setRegistrationNumber(String registrationNumber){
        this.registrationNumber=registrationNumber;
    }
}