import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const AssessmentIntro: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { user } = useAuth();
  const textPrimary = isDark ? '#F5F7FA' : '#181411';
  const textSecondary = isDark ? '#C5CCD6' : '#6b7280';
  const cardBg = isDark ? '#141925' : '#FFFFFF';
  const containerBg = isDark ? '#0E1116' : '#F7F7F6';

  return (
    <main className="min-h-screen px-6 md:px-10 lg:px-40 py-10" style={{ background: containerBg, fontFamily: 'Lexend, Noto Sans, sans-serif' }}>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold" style={{ color: textPrimary }}>Cognitive Skill Assessment</h1>
          <p className="mt-2 text-lg" style={{ color: textSecondary }}>Quick activities to measure attention, reaction speed, and focus. This is separate from lesson quizzes.</p>
        </div>
        <div className="rounded-2xl p-6 shadow-sm" style={{ background: cardBg }}>
          <h2 className="text-2xl font-bold" style={{ color: textPrimary }}>Welcome{user?.firstName ? `, ${user.firstName}` : ''}! Today’s Activity</h2>
          <p className="mt-2" style={{ color: textSecondary }}>Watch the screen. When the circle turns orange, tap it as fast as you can. 5 rounds. Points depend on your speed.</p>
          <ul className="mt-4 text-sm list-disc pl-6" style={{ color: textSecondary }}>
            <li>Fastest taps score more points</li>
            <li>No penalty for slow taps — try your best</li>
            <li>Your points add to Rewards instantly</li>
          </ul>
          <div className="mt-6">
            <button onClick={() => navigate('/assessment/test')} className="rounded-full px-6 py-3 text-white font-semibold" style={{ background: 'var(--brand-primary)' }}>Start Test</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AssessmentIntro;


