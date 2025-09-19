package com.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Entity.Career;

@Repository
public interface CareerRepository extends JpaRepository<Career, Long> {

    // Find career by name
   // Career findByName(String name);
	    List<Career> findAllByName(String name);

	 // Career name ignore case search
	    Optional<Career> findByNameIgnoreCase(String name);
}

