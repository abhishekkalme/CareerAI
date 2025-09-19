package com.Service;

import com.Entity.Career;
import com.Repository.CareerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CareerRoadmapService {

    @Autowired
    private CareerRepository careerRepository;

    public String getRoadmap(String education, String field) {
        if (education == null) return "No roadmap available";

        education = education.toLowerCase();
        field = field != null ? field.toLowerCase() : "";

        String roadmap;

        if (education.contains("10")) {
            roadmap = "After 10th: Choose Science, Commerce, or Arts stream. "
                    + "Explore vocational courses, polytechnic diplomas, or focus on subjects of interest.";
        }
        else if (education.contains("12")) {
            if (field.contains("science")) {
                roadmap = "After 12th Science: You can go for Engineering (B.Tech), Medical (MBBS), B.Sc., BCA, Defence exams, etc.";
            }
            else if (field.contains("commerce")) {
                roadmap = "After 12th Commerce: Options include B.Com, BBA, CA, CS, Banking, Economics.";
            }
            else if (field.contains("arts")) {
                roadmap = "After 12th Arts: Pursue BA, LLB, Journalism, Fashion Designing, UPSC Foundation.";
            }
            else {
                roadmap = "After 12th: Explore UG courses in your area of interest.";
            }
        }
        else {
            roadmap = "No specific roadmap found. Explore higher education and career opportunities.";
        }

        // ✅ Career table se jobs bhi fetch karo
        Optional<Career> careerOpt = careerRepository.findByNameIgnoreCase(field);
        if (careerOpt.isPresent()) {
            Career career = careerOpt.get();
            if (career.getJobs() != null && !career.getJobs().isEmpty()) {
                roadmap += "\n\n💼 Possible Job Roles: " + career.getJobs();
            }
        }

        return roadmap;
    }
}
