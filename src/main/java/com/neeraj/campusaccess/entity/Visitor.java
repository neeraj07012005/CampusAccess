package com.neeraj.campusaccess.entity;
import com.neeraj.campusaccess.enums.VisitorStatus;
import jakarta.persistence.*;

@Entity
public class Visitor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String purpose;
    @Enumerated(EnumType.STRING)
    private VisitorStatus status;

    public Visitor() {
    }

    public Visitor(String name, String purpose, VisitorStatus status) {
        this.name = name;
        this.purpose = purpose;
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

    public VisitorStatus getStatus() {
        return status;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public void setStatus(VisitorStatus status) {
        this.status = status;
    }
}