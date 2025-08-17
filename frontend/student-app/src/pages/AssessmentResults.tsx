import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const AssessmentResults: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const textPrimary = isDark ? '#F5F7FA' : '#111827';
  const textSecondary = isDark ? '#C5CCD6' : '#6b7280';
  const bg = isDark ? '#0E1116' : '#F5F5F4';
  const card = isDark ? '#141925' : '#FFFFFF';
  const primary = getComputedStyle(document.documentElement).getPropertyValue('--brand-primary') || '#e68019';

  // Pull saved profile
  let profile: any = null;
  try { profile = JSON.parse(localStorage.getItem('assessment.profile') || 'null'); } catch {}

  return (
    <main className="min-h-screen px-6 md:px-10 lg:px-40 py-10" style={{ background: bg, fontFamily: 'Lexend, Noto Sans, sans-serif' }}>
      <div className="max-w-3xl mx-auto">
        <div className="rounded-2xl p-6 shadow-sm" style={{ background: card }}>
          <h1 className="text-3xl font-bold" style={{ color: textPrimary }}>Assessment Complete</h1>
          <p className="mt-2" style={{ color: textSecondary }}>We built a learning plan based on preferences and caregiver inputs. Points were added to Rewards.</p>

          {profile && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl" style={{ background: '#F3F4F6' }}>
                <div className="text-sm" style={{ color: textSecondary }}>Sensory Preference</div>
                <div className="text-xl font-bold" style={{ color: textPrimary }}>{profile.sensoryPreference?.join(', ')}</div>
              </div>
              <div className="p-4 rounded-xl" style={{ background: '#F3F4F6' }}>
                <div className="text-sm" style={{ color: textSecondary }}>Processing</div>
                <div className="text-xl font-bold" style={{ color: textPrimary }}>{profile.processingStyle}</div>
              </div>
              <div className="p-4 rounded-xl" style={{ background: '#F3F4F6' }}>
                <div className="text-sm" style={{ color: textSecondary }}>Attention</div>
                <div className="text-xl font-bold" style={{ color: textPrimary }}>{profile.attentionStyle}</div>
              </div>
              <div className="p-4 rounded-xl" style={{ background: '#F3F4F6' }}>
                <div className="text-sm" style={{ color: textSecondary }}>Motivation</div>
                <div className="text-xl font-bold" style={{ color: textPrimary }}>{profile.motivation}</div>
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button onClick={() => navigate('/assessment/test')} className="rounded-full h-12 px-8 font-bold text-white" style={{ background: primary }}>Try Again</button>
            <button onClick={() => navigate('/rewards')} className="rounded-full h-12 px-8 font-bold text-white" style={{ background: '#4b5563' }}>View Rewards</button>
            <button onClick={() => navigate('/dashboard')} className="rounded-full h-12 px-8 font-bold border" style={{ borderColor: '#d1d5db', color: textSecondary }}>Back to Dashboard</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AssessmentResults;


