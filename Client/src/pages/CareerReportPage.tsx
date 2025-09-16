import React, { useState, useEffect } from 'react';
import { CareerReportGenerator } from '../components/CareerReportGenerator';

export function CareerReportPage() {
  const [assessmentResults, setAssessmentResults] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    // Load data from localStorage
    const assessment = localStorage.getItem('careerAI_assessment');
    const profile = localStorage.getItem('careerAI_profile');
    
    if (assessment) {
      setAssessmentResults(JSON.parse(assessment));
    }
    
    if (profile) {
      setUserProfile(JSON.parse(profile));
    }
  }, []);

  if (!assessmentResults) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Complete Your Assessment First</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          You need to complete the 5-D psychometric assessment to generate your comprehensive career report.
        </p>
        <a 
          href="/assessment" 
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Take Assessment
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <CareerReportGenerator 
        assessmentResults={assessmentResults}
        userProfile={userProfile}
      />
    </div>
  );
}