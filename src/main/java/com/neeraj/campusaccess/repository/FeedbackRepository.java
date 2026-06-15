package com.neeraj.campusaccess.repository;

import com.neeraj.campusaccess.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository
        extends JpaRepository<Feedback, Long> {

}