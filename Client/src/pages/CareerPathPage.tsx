import React, { useState, useEffect } from 'react';
import { ProgressionLadder } from '../components/ProgressionLadder';

const mockCareerPath = {
  title: "Data Scientist",
  stages: [
    {
      level: "Junior Data Analyst",
      duration: "0-2 years",
      skills: ["Excel", "SQL", "Basic Statistics"],
      responsibilities: ["Data cleaning", "Basic reporting", "Dashboard creation"]
    },
    {
      level: "Data Analyst",
      duration: "2-4 years", 
      skills: ["Python/R", "Advanced SQL", "Data Visualization"],
      responsibilities: ["Complex analysis", "Predictive modeling", "Business insights"]
    },
    {
      level: "Senior Data Scientist",
      duration: "4-7 years",
      skills: ["Machine Learning", "Deep Learning", "MLOps"],
      responsibilities: ["Model development", "ML pipeline design", "Team mentoring"]
    },
    {
      level: "Principal Data Scientist",
      duration: "7+ years",
      skills: ["Leadership", "Strategy", "Architecture"],
      responsibilities: ["Technical leadership", "Strategic planning", "Cross-team collaboration"]
    }
  ]
};

export function CareerPathPage() {
  const [careerPath, setCareerPath] = useState<any>(mockCareerPath);

  useEffect(() => {
    // Load career recommendations from localStorage
    const storedRecommendations = localStorage.getItem('careerAI_recommendations');
    if (storedRecommendations) {
      const recommendations = JSON.parse(storedRecommendations);
      if (recommendations.length > 0) {
        // Use the first recommendation to build a career path
        const topRecommendation = recommendations[0];
        setCareerPath({
          ...mockCareerPath,
          title: topRecommendation.title
        });
      }
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProgressionLadder careerPath={careerPath} />
    </div>
  );
}