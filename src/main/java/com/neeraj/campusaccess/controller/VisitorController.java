package com.neeraj.campusaccess.controller;

import com.neeraj.campusaccess.entity.Visitor;
import com.neeraj.campusaccess.enums.VisitorStatus;
import com.neeraj.campusaccess.repository.VisitorRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;


import java.util.List;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class VisitorController {

    private final VisitorRepository visitorRepository;

    public VisitorController(VisitorRepository visitorRepository) {
        this.visitorRepository = visitorRepository;
    }

    @PostMapping("/visitor")
    public Visitor addVisitor(@RequestBody Visitor visitor) {
        visitor.setStatus(VisitorStatus.PENDING);
        return visitorRepository.save(visitor);
    }
    @GetMapping("/visitor")
    public List<Visitor> getAllVisitors() {
        return visitorRepository.findAll();
    }

    @GetMapping("/visitor/{id}")
    public Visitor getVisitor(@PathVariable Long id) {
        return visitorRepository.findById(id).orElse(null);
    }
    @DeleteMapping("/visitor/{id}")
    public String deleteVisitor(@PathVariable Long id) {
        visitorRepository.deleteById(id);
        return "deleted";
    }
    
    @PutMapping("/visitor/{id}")
    public Visitor updateVisitor(@PathVariable Long id, @RequestBody Visitor updateVisitor) {
        Visitor visitor = visitorRepository.findById(id).orElse(null);
        if (visitor != null) {
            visitor.setName(updateVisitor.getName());
            visitor.setPurpose(updateVisitor.getPurpose());

            return visitorRepository.save(visitor);
        }

        return null;
    }

    //----------------Logic---------------------//
    @PutMapping("/visitor/{id}/approve")
    public Visitor approveVisitor(@PathVariable Long id) {
        Visitor visisor = visitorRepository.findById(id).orElse(null);
        if (visisor != null) {
            visisor.setStatus(
                    VisitorStatus.APPROVED);
            return visitorRepository.save(visisor);
        }

        return null;
    }
    
    @PutMapping("/visitor/{id}/reject")
    public Visitor rejecVisitor(@PathVariable long id) {
        Visitor v = visitorRepository.findById(id).orElse(null);
        if (v != null) {
            v.setStatus(
                VisitorStatus.REJECTED
            );
            return visitorRepository.save(v);
        }
        
        return null;
    }
    
}