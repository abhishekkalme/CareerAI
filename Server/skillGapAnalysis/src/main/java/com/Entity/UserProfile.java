package com.Entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Integer age;
    private String location;
    private String phone;

    private String educationLevel;   // Enum mapping possible
    private String currentClass;
    private String school;
    private String stream;           // Enum mapping possible

    @ElementCollection
    @CollectionTable(name = "user_subjects", joinColumns = @JoinColumn(name = "user_id"))
    private List<String> subjects = new ArrayList<>();  // ✅ null kabhi nahi hoga

    private String percentage;

    @ElementCollection
    @CollectionTable(name = "user_interests", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "user_interests")
    @OrderColumn(name = "interests")
    private List<String> interests;

    @ElementCollection
    @CollectionTable(name = "user_strengths", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "user_strengths")
    @OrderColumn(name = "strengths")
    private List<String> strengths;

    // If CompetitiveExam is an Enum → store as String
    @ElementCollection
    @CollectionTable(name = "user_competitiveExams", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "user_competitiveExams")
    
    private List<String> competitiveExams;

    private String degree;
    private String specialization;
    private String workExperience;
    private String currentRole;
    
    private String careerGoals;
    @ElementCollection
    @CollectionTable(name = "user_skills", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "user_skills")
    @OrderColumn(name = "skills")
    private List<String> skills;

    @ElementCollection
    @CollectionTable(name = "user_certification", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "user_certification")
    @OrderColumn(name = "certification")
    private List<String> certifications;

   
   

    @ElementCollection
    @CollectionTable(name = "user_projects", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "user_projects")
    @OrderColumn(name = "projects")
    private List<String> projects;

    private String combinedSkills;
    private String createdAt;
 // ✅ new field

    // ✅ Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEducationLevel() { return educationLevel; }
    public void setEducationLevel(String educationLevel) { this.educationLevel = educationLevel; }

    public String getCurrentClass() { return currentClass; }
    public void setCurrentClass(String currentClass) { this.currentClass = currentClass; }

    public String getSchool() { return school; }
    public void setSchool(String school) { this.school = school; }

    public String getStream() { return stream; }
    public void setStream(String stream) { this.stream = stream; }

    public List<String> getSubjects() { return subjects; }
    public void setSubjects(List<String> subjects) { this.subjects = subjects; }

    public String getPercentage() { return percentage; }
    public void setPercentage(String percentage) { this.percentage = percentage; }

    public List<String> getInterests() { return interests; }
    public void setInterests(List<String> interests) { this.interests = interests; }

    public List<String> getStrengths() { return strengths; }
    public void setStrengths(List<String> strengths) { this.strengths = strengths; }

    public List<String> getCompetitiveExams() { return competitiveExams; }
    public void setCompetitiveExams(List<String> competitiveExams) { this.competitiveExams = competitiveExams; }

    public String getDegree() { return degree; }
    public void setDegree(String degree) { this.degree = degree; }

    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }

    public String getWorkExperience() { return workExperience; }
    public void setWorkExperience(String workExperience) { this.workExperience = workExperience; }

    public String getCurrentRole() { return currentRole; }
    public void setCurrentRole(String currentRole) { this.currentRole = currentRole; }

    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }

    public List<String> getCertifications() { return certifications; }
    public void setCertifications(List<String> certifications) { this.certifications = certifications; }

    public String getCareerGoals() { return careerGoals; }
    public void setCareerGoals(String careerGoals) { this.careerGoals = careerGoals; }

    public List<String> getProjects() { return projects; }
    public void setProjects(List<String> projects) { this.projects = projects; }

    public String getCombinedSkills() { return combinedSkills; }
    public void setCombinedSkills(String combinedSkills) { this.combinedSkills = combinedSkills;}
	public String getField() {
		// TODO Auto-generated method stub
		return null;
	}
   
    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
}
