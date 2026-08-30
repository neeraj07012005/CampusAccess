package com.neeraj.campusaccess.repository;

import com.neeraj.campusaccess.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppUserRepository
        extends JpaRepository<AppUser, Long> {

    boolean existsByUsername(String username);

    AppUser findByUsername(String username);

    AppUser findByEmail(String email);
}