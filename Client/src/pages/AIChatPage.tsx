import React, { useState, useEffect } from 'react';
import { EnhancedAIChatBot } from '../components/EnhancedAIChatBot';

export function AIChatPage() {
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <EnhancedAIChatBot userData={userData} />
    </div>
  );
}