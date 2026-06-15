package com.neeraj.campusaccess.controller;

import com.neeraj.campusaccess.entity.Feedback;
import com.neeraj.campusaccess.entity.Visitor;
import com.neeraj.campusaccess.repository.FeedbackRepository;
import com.neeraj.campusaccess.repository.VisitorRepository;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
public class FeedbackController {

    private final FeedbackRepository feedbackRepository;
    private final VisitorRepository visitorRepository;

    public FeedbackController(
            FeedbackRepository feedbackRepository,
            VisitorRepository visitorRepository) {

        this.feedbackRepository = feedbackRepository;
        this.visitorRepository = visitorRepository;
    }

    @PostMapping("/feedback/{visitorId}")
    public Feedback addFeedback(@PathVariable Long visitorId,@RequestBody Feedback feedback) {
        Visitor v = visitorRepository.findById(visitorId).orElse(null);
        if (v != null) {
            feedback.setVisitor(v);
            return feedbackRepository.save(feedback)
        }
        return null;
    }
    
    
    
}