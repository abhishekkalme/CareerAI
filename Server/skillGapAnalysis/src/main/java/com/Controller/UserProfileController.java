package com.Controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.Entity.UserProfile;
import com.Repository.UserProfileRepository;
import com.Service.CareerRoadmapService;
import com.Service.SkillGapService;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequestMapping("api/user-profile")
@CrossOrigin(origins = "http://localhost:3000")  // ✅ fixed
public class UserProfileController {

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private SkillGapService skillGapService;

    @Autowired
    private CareerRoadmapService careerRoadmapService;

    @PostMapping("/profile")
    public ResponseEntity<?> saveProfile(@RequestBody UserProfile userProfile) {
        userProfileRepository.save(userProfile);

        // ✅ null/empty check
        List<String> userSkills = (userProfile.getCombinedSkills() != null && !userProfile.getCombinedSkills().isEmpty())
            ? Arrays.stream(userProfile.getCombinedSkills().split(","))
                    .map(String::trim)
                    .collect(Collectors.toList())
            : List.of();

        List<String> gapSkills = skillGapService.analyzeSkillGap(userProfile.getCareerGoals(), userSkills);
        String recommendedCareer = skillGapService.recommendCareer(userSkills);

        String jobs = skillGapService.getJobsForCareer(recommendedCareer);

        // ✅ replace getField() with something valid
        String roadmap = careerRoadmapService.getRoadmap(userProfile.getEducationLevel(), userProfile.getStream());

        Map<String, Object> response = new HashMap<>();
        response.put("gapSkills", gapSkills);
        response.put("userSkills", userSkills);
        response.put("careerGoals", userProfile.getCareerGoals());
        response.put("recommendedCareer", recommendedCareer);
        response.put("jobs", jobs);
        response.put("roadmap", roadmap);

        return ResponseEntity.ok(response);
    }
}
