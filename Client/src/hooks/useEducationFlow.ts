import { useState, useEffect } from 'react';
import { EducationLevel, StudentProfile, AssessmentConfig } from '../types/education';

export function useEducationFlow() {
  const [currentLevel, setCurrentLevel] = useState<EducationLevel | null>(null);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [assessmentConfig, setAssessmentConfig] = useState<AssessmentConfig | null>(null);

  useEffect(() => {
    // Check if user is returning
    const savedProfile = localStorage.getItem('student_profile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setStudentProfile(profile);
      setCurrentLevel(profile.educationLevel);
      loadAssessmentConfig(profile.educationLevel);
    }
  }, []);

  const loadAssessmentConfig = async (level: EducationLevel) => {
    try {
      const response = await fetch(`/src/config/assessments/assessment-${level}.json`);
      const config = await response.json();
      setAssessmentConfig(config);
    } catch (error) {
      console.error('Failed to load assessment config:', error);
      // Fallback to default config
      setAssessmentConfig(getDefaultConfig(level));
    }
  };

  const updateStudentProfile = (updates: Partial<StudentProfile>) => {
    const updatedProfile = { ...studentProfile, ...updates } as StudentProfile;
    setStudentProfile(updatedProfile);
    localStorage.setItem('student_profile', JSON.stringify(updatedProfile));
    
    if (updates.educationLevel && updates.educationLevel !== currentLevel) {
      setCurrentLevel(updates.educationLevel);
      loadAssessmentConfig(updates.educationLevel);
    }
  };

  const getDashboardRoute = (level: EducationLevel): string => {
    const routes = {
      '10th': '/dashboard-early-career',
      '12th': '/dashboard-stream-options', 
      'graduation': '/dashboard-career-insights',
      'post-graduation': '/dashboard-career-growth'
    };
    return routes[level];
  };

  const getAssessmentRoute = (level: EducationLevel): string => {
    return `/assessment-${level}`;
  };

  const getOnboardingSteps = (level: EducationLevel) => {
    const baseSteps = [
      { id: 'basic', title: 'Basic Information', icon: 'User' },
      { id: 'education', title: 'Education Details', icon: 'GraduationCap' }
    ];

    const levelSpecificSteps = {
      '10th': [
        { id: 'subjects', title: 'Subjects & Interests', icon: 'BookOpen' },
        { id: 'goals', title: 'Future Goals', icon: 'Target' }
      ],
      '12th': [
        { id: 'stream', title: 'Stream & Exams', icon: 'Award' },
        { id: 'goals', title: 'Career Goals', icon: 'Target' }
      ],
      'graduation': [
        { id: 'skills', title: 'Skills & Experience', icon: 'Briefcase' },
        { id: 'goals', title: 'Career Direction', icon: 'TrendingUp' }
      ],
      'post-graduation': [
        { id: 'experience', title: 'Professional Experience', icon: 'Briefcase' },
        { id: 'advancement', title: 'Career Advancement', icon: 'TrendingUp' }
      ]
    };

    return [...baseSteps, ...levelSpecificSteps[level]];
  };

  return {
    currentLevel,
    studentProfile,
    assessmentConfig,
    updateStudentProfile,
    getDashboardRoute,
    getAssessmentRoute,
    getOnboardingSteps,
    loadAssessmentConfig
  };
}

function getDefaultConfig(level: EducationLevel): AssessmentConfig {
  // Fallback configuration if JSON loading fails
  return {
    level,
    sections: [
      {
        id: 'general',
        title: 'General Assessment',
        description: 'Basic assessment questions',
        questions: [
          {
            id: 'gen_1',
            type: 'rating',
            question: 'Rate your overall academic performance',
            options: ['1', '2', '3', '4', '5'],
            category: 'academic',
            weight: 1
          }
        ]
      }
    ],
    duration: 30,
    passingScore: 60
  };
}