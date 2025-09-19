package com.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.Entity.UserProfile;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
}

