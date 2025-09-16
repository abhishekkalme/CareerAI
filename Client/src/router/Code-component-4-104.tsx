import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { HomePage } from '../pages/HomePage';
import { OnboardingPage } from '../pages/OnboardingPage';
import { AssessmentPage } from '../pages/AssessmentPage';
import { DashboardPage } from '../pages/DashboardPage';
import { SkillsPage } from '../pages/SkillsPage';
import { CareerPathPage } from '../pages/CareerPathPage';
import { LearningPage } from '../pages/LearningPage';
import { LecturersPage } from '../pages/LecturersPage';
import { AIChatPage } from '../pages/AIChatPage';
import { ProfilePage } from '../pages/ProfilePage';

interface AppRouterProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export function AppRouter({ isDarkMode, toggleTheme }: AppRouterProps) {
  return (
    <Router>
      <Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          
          {/* Main Application Routes */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/career-path" element={<CareerPathPage />} />
          <Route path="/learning" element={<LearningPage />} />
          <Route path="/lecturers" element={<LecturersPage />} />
          <Route path="/ai-chat" element={<AIChatPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          
          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}