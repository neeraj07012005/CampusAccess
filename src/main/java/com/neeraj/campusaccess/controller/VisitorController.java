package com.neeraj.campusaccess.controller;
import com.neeraj.campusaccess.service.VisitorService;
import com.neeraj.campusaccess.entity.Visitor;
import com.neeraj.campusaccess.enums.VisitorStatus;
import com.neeraj.campusaccess.repository.VisitorRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
public class VisitorController {

    private final VisitorService  visitorService;
    private final VisitorRepository visitorRepository;
    public VisitorController(VisitorRepository visitorRepository , VisitorService visitorService ) {
        this.visitorRepository = visitorRepository;
        this.visitorService=visitorService;
    }

    // ================= STUDENT =================

    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping("/visitor")
    public Visitor addVisitor(@RequestBody Visitor visitor) {

    Authentication authentication =
            SecurityContextHolder.getContext().getAuthentication();

    String username = authentication.getName();

    visitor.setCreatedBy(username);
    visitor.setCreatedAt(LocalDateTime.now());   // NEW
    visitor.setStatus(VisitorStatus.PENDING);

    return visitorRepository.save(visitor);
}

    @PreAuthorize("hasRole('STUDENT')")
    @GetMapping("/visitor/my")
    public List<Visitor> myVisitors() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String username = authentication.getName();

        return visitorRepository.findByCreatedBy(username);
    }

    // ================= ADMIN =================

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/visitor")
    public List<Visitor> getAllVisitors() {
        return visitorRepository.findAll();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/visitor/{id}")
    public Visitor getVisitor(@PathVariable Long id) {
        return visitorRepository.findById(id).orElse(null);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/visitor/{id}")
    public Visitor updateVisitor(@PathVariable Long id,
                                 @RequestBody Visitor updateVisitor) {

        Visitor visitor = visitorRepository.findById(id).orElse(null);

        if (visitor != null) {
            visitor.setName(updateVisitor.getName());
            visitor.setPurpose(updateVisitor.getPurpose());

            return visitorRepository.save(visitor);
        }

        return null;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/visitor/{id}")
    public String deleteVisitor(@PathVariable Long id) {

        visitorRepository.deleteById(id);

        return "Visitor Deleted Successfully";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/visitor/{id}/approve")
    public Visitor approveVisitor(@PathVariable Long id) {

        return visitorService.approveVisitor(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/visitor/{id}/reject")
    public Visitor rejectVisitor(@PathVariable Long id) {

        Visitor visitor = visitorRepository.findById(id).orElse(null);

        if (visitor != null) {
            visitor.setStatus(VisitorStatus.REJECTED);
            return visitorRepository.save(visitor);
        }

        return null;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/visitor/pending")
    public List<Visitor> getPendingVisitors() {

        return visitorRepository.findByStatus(VisitorStatus.PENDING);
    }

    // ================= SECURITY =================

    @PreAuthorize("hasRole('GURD')")
    @GetMapping("/visitor/approved")
    public List<Visitor> getApprovedVisitors() {

        return visitorRepository.findByStatus(VisitorStatus.APPROVED);
    }

    @PreAuthorize("hasRole('GURD')")
    @PutMapping("/visitor/{registerationNumber}/enter")
    public Visitor enterVisitor(@PathVariable String registerationNumber){
    Visitor v = visitorRepository.findByRegistrationNumber(registerationNumber);

    if(v==null){
        return null;
    }

    if(v.getStatus()==VisitorStatus.APPROVED){
        v.setCheckedInAt(LocalDateTime.now());
        v.setStatus(VisitorStatus.ENTERED);
        return visitorRepository.save(v);
    }

    return null;
}
    
    
    @PreAuthorize("hasRole('GURD')")
    @PutMapping("/visitor/{id}/exit")
    public Visitor exitVisitor(@PathVariable Long id) {

        Visitor visitor = visitorRepository.findById(id).orElse(null);

        if (visitor != null) {

            visitor.setCheckedOutAt(LocalDateTime.now());
            visitor.setStatus(VisitorStatus.EXITED);

            return visitorRepository.save(visitor);
        }

        return null;
    }
    
    @PreAuthorize("hasRole('GURD')")
    @GetMapping("/visitor/entered")
    public List<Visitor> getEnteredVisitors() {

        return visitorRepository.findByStatus(VisitorStatus.ENTERED);
    }
    
    @PreAuthorize("hasRole('GURD')")
    @GetMapping("/visitor/exited")
    public List<Visitor> getExitedVisitors() {

    return visitorRepository.findByStatus(VisitorStatus.EXITED);
    }
}