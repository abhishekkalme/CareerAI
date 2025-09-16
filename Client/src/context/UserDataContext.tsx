import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserData {
  profile: any;
  assessmentResults: any;
  careerRecommendations: any[];
  skillGaps: any[];
}

interface UserDataContextType {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  updateProfile: (profile: any) => void;
  updateAssessment: (assessment: any) => void;
  updateRecommendations: (recommendations: any[]) => void;
  updateSkillGaps: (skillGaps: any[]) => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export function UserDataProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<UserData>({
    profile: null,
    assessmentResults: null,
    careerRecommendations: [],
    skillGaps: []
  });

  // Load data from localStorage on mount
  useEffect(() => {
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

  const updateProfile = (profile: any) => {
    localStorage.setItem('careerAI_profile', JSON.stringify(profile));
    setUserData(prev => ({ ...prev, profile }));
  };

  const updateAssessment = (assessment: any) => {
    localStorage.setItem('careerAI_assessment', JSON.stringify(assessment));
    setUserData(prev => ({ ...prev, assessmentResults: assessment }));
  };

  const updateRecommendations = (recommendations: any[]) => {
    localStorage.setItem('careerAI_recommendations', JSON.stringify(recommendations));
    setUserData(prev => ({ ...prev, careerRecommendations: recommendations }));
  };

  const updateSkillGaps = (skillGaps: any[]) => {
    localStorage.setItem('careerAI_skillGaps', JSON.stringify(skillGaps));
    setUserData(prev => ({ ...prev, skillGaps }));
  };

  return (
    <UserDataContext.Provider value={{
      userData,
      setUserData,
      updateProfile,
      updateAssessment,
      updateRecommendations,
      updateSkillGaps
    }}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
}