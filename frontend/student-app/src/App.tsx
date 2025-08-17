import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AboutPage, CurriculumPage, TeamPage, PricingPage, ContactPage, LoginPage, SignupPage, LessonsPage, AllLessonsPage, LessonOverview, LessonPlayer, LessonTest, LessonTestResults, LessonComplete, RewardsPage, SettingsPage, AssessmentIntro, AssessmentTest, AssessmentResults } from './pages';
import './index.css';
import BackButton from './components/BackButton';

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background-light to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading NeuroLearn...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <BackButton />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background-light to-white">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading NeuroLearn...</p>
          </div>
        </div>
      }>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/curriculum" element={<CurriculumPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <LandingPage />} />
          <Route path="/lessons" element={isAuthenticated ? <LessonsPage /> : <LandingPage />} />
          <Route path="/lessons/all" element={isAuthenticated ? <AllLessonsPage /> : <LandingPage />} />
          <Route path="/lesson/:lessonId" element={isAuthenticated ? <LessonOverview /> : <LandingPage />} />
          <Route path="/lesson/:lessonId/start" element={isAuthenticated ? <LessonPlayer /> : <LandingPage />} />
          <Route path="/lesson/:lessonId/test" element={isAuthenticated ? <LessonTest /> : <LandingPage />} />
          <Route path="/lesson/:lessonId/results" element={isAuthenticated ? <LessonTestResults /> : <LandingPage />} />
          <Route path="/lesson/:lessonId/complete" element={isAuthenticated ? <LessonComplete /> : <LandingPage />} />
          <Route path="/rewards" element={isAuthenticated ? <RewardsPage /> : <LandingPage />} />
          <Route path="/settings" element={isAuthenticated ? <SettingsPage /> : <LandingPage />} />
          <Route path="/assessment" element={isAuthenticated ? <AssessmentIntro /> : <LandingPage />} />
          <Route path="/assessment/test" element={isAuthenticated ? <AssessmentTest /> : <LandingPage />} />
          <Route path="/assessment/results" element={isAuthenticated ? <AssessmentResults /> : <LandingPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ThemeProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;