import React, { useState, useEffect } from 'react';
import { CareerDashboard } from '../components/CareerDashboard';
import { useNavigate } from 'react-router-dom';

export function DashboardPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>({
    profile: null,
    assessmentResults: null,
    careerRecommendations: [],
    skillGaps: []
  });

  useEffect(() => {
    // Load data from localStorage
    const profile = localStorage.getItem('careerAI_profile');
    const assessment = localStorage.getItem('careerAI_assessment');
    const recommendations = localStorage.getItem('careerAI_recommendations');
    const skillGaps = localStorage.getItem('careerAI_skillGaps');

    setUserData({
      profile: profile ? JSON.parse(profile) : null,
      assessmentResults: assessment ? JSON.parse(assessment) : null,
      careerRecommendations: recommendations ? JSON.parse(recommendations) : [],
      skillGaps: skillGaps ? JSON.parse(skillGaps) : []
    });
  }, []);

  const handleExploreCareer = (career: any) => {
    navigate('/career-path');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <CareerDashboard 
        userData={userData}
        onExploreCareer={handleExploreCareer}
      />
    </div>
  );
}