import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Advanced5DAssessment } from '../components/Advanced5DAssessment';
import { Brain, Users, Target } from 'lucide-react';

export function AssessmentPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 'profile', title: 'User Profile', icon: Users },
    { id: 'assessment', title: 'Assessment', icon: Brain },
    { id: 'results', title: 'Career Insights', icon: Target }
  ];

  const handleAssessmentComplete = (assessmentData: any) => {
    // Store assessment data in localStorage or context
    localStorage.setItem('careerAI_assessment', JSON.stringify(assessmentData));
    
    // Generate and store mock recommendations and skill gaps
    const mockRecommendations = generateMockRecommendations(assessmentData);
    const mockSkillGaps = generateEnhancedSkillGaps(assessmentData);
    
    localStorage.setItem('careerAI_recommendations', JSON.stringify(mockRecommendations));
    localStorage.setItem('careerAI_skillGaps', JSON.stringify(mockSkillGaps));
    
    navigate('/dashboard');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Steps */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center justify-center space-x-2 md:space-x-8 overflow-x-auto pb-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div key={step.id} className="flex items-center flex-shrink-0">
                <div className={`flex items-center space-x-2 md:space-x-3 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : isCompleted ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`}>
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 
                    ${isActive ? 'border-indigo-600 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-900/20' : 
                      isCompleted ? 'border-green-600 bg-green-50 dark:border-green-400 dark:bg-green-900/20' : 'border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800'}`}>
                    <Icon className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <span className="font-medium text-sm md:text-base hidden sm:block">{step.title}</span>
                  <span className="font-medium text-xs sm:hidden">{step.title.split(' ')[0]}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-6 md:w-12 h-0.5 mx-2 md:mx-4 ${isCompleted ? 'bg-green-600 dark:bg-green-400' : 'bg-gray-300 dark:bg-gray-600'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <Advanced5DAssessment onComplete={handleAssessmentComplete} />
    </div>
  );
}

// Mock data generators (moved from App.tsx)
function generateMockRecommendations(assessmentData: any) {
  return [
    {
      title: "Data Scientist",
      match: 92,
      description: "Analyze complex data to help organizations make informed decisions",
      requiredSkills: ["Python", "Machine Learning", "Statistics", "SQL", "Data Visualization"],
      salaryRange: "$80,000 - $150,000",
      growth: "22% (Much faster than average)",
      companies: ["Google", "Microsoft", "Netflix", "Uber"]
    },
    {
      title: "Software Engineer",
      match: 88,
      description: "Design and develop software applications and systems",
      requiredSkills: ["JavaScript", "React", "Node.js", "Git", "Problem Solving"],
      salaryRange: "$75,000 - $140,000",
      growth: "13% (Faster than average)",
      companies: ["Meta", "Apple", "Amazon", "Spotify"]
    },
    {
      title: "UX Designer",
      match: 85,
      description: "Create intuitive and engaging user experiences for digital products",
      requiredSkills: ["Figma", "User Research", "Prototyping", "Design Thinking", "Usability Testing"],
      salaryRange: "$65,000 - $120,000",
      growth: "8% (As fast as average)",
      companies: ["Adobe", "Airbnb", "Salesforce", "Dropbox"]
    }
  ];
}

function generateMockSkillGaps(assessmentData: any) {
  return [
    { skill: "Python", current: 60, required: 90, category: "Programming" },
    { skill: "Machine Learning", current: 40, required: 85, category: "Technical" },
    { skill: "Statistics", current: 70, required: 80, category: "Analytics" },
    { skill: "SQL", current: 50, required: 75, category: "Database" },
    { skill: "Data Visualization", current: 65, required: 80, category: "Analytics" },
    { skill: "Communication", current: 80, required: 85, category: "Soft Skills" },
    { skill: "Problem Solving", current: 85, required: 90, category: "Soft Skills" }
  ];
}

function generateEnhancedSkillGaps(assessmentData: any) {
  // Enhanced skill gap generation based on AI assessment results
  const baseGaps = generateMockSkillGaps(assessmentData);
  
  if (assessmentData.scores?.technical) {
    // Adjust based on technical assessment scores
    return baseGaps.map(gap => ({
      ...gap,
      current: gap.category === 'Technical' ? 
        Math.min(gap.current + 10, 90) : gap.current,
      priority: gap.required - gap.current >= 20 ? 'High' : 
               gap.required - gap.current >= 10 ? 'Medium' : 'Low',
      learningTime: Math.ceil((gap.required - gap.current) / 10) + ' months',
      marketDemand: ['Python', 'Machine Learning', 'SQL'].includes(gap.skill) ? 'Very High' : 'High'
    }));
  }
  
  return baseGaps;
}