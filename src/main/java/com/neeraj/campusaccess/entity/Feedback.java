package com.neeraj.campusaccess.entity;

import jakarta.persistence.*;

@Entity
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String desc;

    @ManyToOne
    @JoinColumn(name = "visitor_id")
    private Visitor visitor;

    public Feedback() {
    }

    public Feedback(String desc) {
        this.desc = desc;
    }

    public Long getId() {
        return id;
    }

    public String getDesc() {
        return this.desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public Visitor getVisitor() {
        return visitor;
    }

    public void setVisitor(Visitor visitor) {
        this.visitor = visitor;
    }
} 