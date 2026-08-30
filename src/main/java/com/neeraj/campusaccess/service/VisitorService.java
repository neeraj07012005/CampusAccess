package com.neeraj.campusaccess.service;

import com.neeraj.campusaccess.entity.Visitor;
import com.neeraj.campusaccess.enums.VisitorStatus;
import com.neeraj.campusaccess.repository.VisitorRepository;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
public class VisitorService {

    private final VisitorRepository visitorRepository;

    private static final String CHARACTERS =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    private static final SecureRandom RANDOM = new SecureRandom();

    public VisitorService(VisitorRepository visitorRepository) {
        this.visitorRepository = visitorRepository;
    }

    // ================= ADMIN =================

    public Visitor approveVisitor(Long id) {

        Visitor visitor =
                visitorRepository.findById(id).orElse(null);

        if (visitor != null &&
                visitor.getStatus() == VisitorStatus.PENDING) {

            String registrationNumber =
                    generateRegistrationNumber();

            visitor.setRegistrationNumber(registrationNumber);
            visitor.setStatus(VisitorStatus.APPROVED);

            return visitorRepository.save(visitor);
        }

        return null;
    }

    // ================= SECURITY =================

    public Visitor enterVisitor(String registrationNumber) {

        Visitor visitor =
                visitorRepository.findByRegistrationNumber(registrationNumber);

        if (visitor != null &&
                visitor.getStatus() == VisitorStatus.APPROVED) {

            visitor.setCheckedInAt(LocalDateTime.now());
            visitor.setStatus(VisitorStatus.ENTERED);

            return visitorRepository.save(visitor);
        }

        return null;
    }

    // ================= REGISTRATION NUMBER =================

    private String generateRegistrationNumber() {

        StringBuilder code = new StringBuilder("VIS-");

        for (int i = 0; i < 6; i++) {

            int index = RANDOM.nextInt(CHARACTERS.length());

            code.append(CHARACTERS.charAt(index));
        }

        return code.toString();
    }
}