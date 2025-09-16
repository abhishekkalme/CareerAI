import React, { useState, useEffect } from 'react';
import { LearningResources } from '../components/LearningResources';

export function LearningPage() {
  const [skillGaps, setSkillGaps] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    // Load data from localStorage
    const storedSkillGaps = localStorage.getItem('careerAI_skillGaps');
    const storedRecommendations = localStorage.getItem('careerAI_recommendations');
    
    if (storedSkillGaps) {
      setSkillGaps(JSON.parse(storedSkillGaps));
    }
    
    if (storedRecommendations) {
      setRecommendations(JSON.parse(storedRecommendations));
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <LearningResources 
        skillGaps={skillGaps}
        recommendations={recommendations}
      />
    </div>
  );
}