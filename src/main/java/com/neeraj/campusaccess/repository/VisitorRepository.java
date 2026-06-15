package com.neeraj.campusaccess.repository;

import com.neeraj.campusaccess.entity.Visitor;
import com.neeraj.campusaccess.enums.VisitorStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VisitorRepository
        extends JpaRepository<Visitor, Long> {

    List<Visitor> findByStatus(VisitorStatus status);

}