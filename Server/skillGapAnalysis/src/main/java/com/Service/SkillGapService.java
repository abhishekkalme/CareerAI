package com.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Entity.Career;
import com.Repository.CareerRepository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class SkillGapService {

    @Autowired
    private CareerRepository careerRepository;

    public List<String> analyzeSkillGap(String careerGoals, List<String> userSkills) {
        List<String> gapSkills = new ArrayList<>();
        if (careerGoals == null || careerGoals.isEmpty()) return gapSkills;

        // Split multiple career goals
        List<String> goals = Arrays.asList(careerGoals.split(","));
        for (String goal : goals) {
            goal = goal.trim();
            // Fetch all careers with this name (handles duplicates)
            List<Career> careers = careerRepository.findAllByName(goal);

            for (Career career : careers) {
                if (career.getRequiredSkills() != null) {
                    List<String> targetSkills = Arrays.asList(career.getRequiredSkills().split(","));
                    for (String skill : targetSkills) {
                        skill = skill.trim();
                        if (!userSkills.contains(skill) && !gapSkills.contains(skill)) {
                            gapSkills.add(skill);
                        }
                    }
                }
            }
        }
        return gapSkills;
    }

    // Recommend best-fit career based on matched skills
    public String recommendCareer(List<String> userSkills) {
        if (userSkills == null || userSkills.isEmpty()) return "No recommendation";

        // ✅ Normalize user skills
        List<String> userSkillsNormalized = userSkills.stream()
                                                      .map(String::trim)
                                                      .map(String::toLowerCase)
                                                      .toList();

        List<Career> careers = careerRepository.findAll();
        Career bestCareer = null;
        int maxMatched = 0;

        for (Career c : careers) {
            if (c.getRequiredSkills() == null) continue;

            // ✅ Normalize career skills
            List<String> skills = Arrays.stream(c.getRequiredSkills().split(","))
                                        .map(String::trim)
                                        .map(String::toLowerCase)
                                        .toList();

            int matched = 0;
            for (String skill : skills) {
                if (userSkillsNormalized.contains(skill)) matched++;
            }

            if (matched > maxMatched) {
                maxMatched = matched;
                bestCareer = c;
            }
        }

        return bestCareer != null && maxMatched > 0 ? bestCareer.getName() : "No recommendation";
    }

    
 // SkillGapService.java

 // ✅ Career ke jobs laane ka method
 public String getJobsForCareer(String careerName) {
     if (careerName == null || careerName.isEmpty()) return "No jobs available";

     // Career ko DB se fetch karo
     List<Career> careers = careerRepository.findAllByName(careerName);

     if (careers.isEmpty()) return "No jobs available";

     // Pehle career ka jobs field return karo
     Career career = careers.get(0);
     return career.getJobs() != null ? career.getJobs() : "No jobs available";
 }

}
