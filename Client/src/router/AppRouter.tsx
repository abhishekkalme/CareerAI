import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from '../components/LanguageProvider';
import { Layout } from '../components/Layout';
import { HomePage } from '../pages/HomePage';
import { AssessmentPage } from '../pages/AssessmentPage';
import { DashboardPage } from '../components/DashboardPage';
import { LearningPage } from '../pages/LearningPage';
import { LecturersPage } from '../pages/LecturersPage';
import { AIChatPage } from '../pages/AIChatPage';
import { ProfilePage } from '../pages/ProfilePage';
import { ExpertMentoringPage } from '../pages/ExpertMentoringPage';
import { DynamicOnboarding } from '../components/DynamicOnboarding';
import { DynamicAssessment } from '../components/DynamicAssessment';


interface AppRouterProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export function AppRouter({ isDarkMode, toggleTheme }: AppRouterProps) {
  return (
    <LanguageProvider>
      <Router>
        <Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/onboarding" element={<DynamicOnboarding onComplete={(profile) => console.log('Profile completed:', profile)} />} />
            <Route path="/assessment-:level" element={<DynamicAssessment />} />
            
            {/* Legacy routes for backward compatibility */}
            <Route path="/assessment" element={<AssessmentPage />} />
            
            {/* Main Application Routes */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/learning" element={<LearningPage />} />
            <Route path="/lecturers" element={<LecturersPage />} />
            <Route path="/ai-chat" element={<AIChatPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/mentoring" element={<ExpertMentoringPage />} />            
            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </LanguageProvider>
  );
}