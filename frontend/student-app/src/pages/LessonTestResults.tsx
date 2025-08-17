import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

type StoredResult = { lessonId: string; points: number; totalPoints: number; timestamp: number };

const LessonTestResults: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const raw = sessionStorage.getItem('lessonTestResult');
  const parsed: StoredResult | null = raw ? JSON.parse(raw) : null;
  const points = parsed?.points ?? 0;
  const totalPoints = parsed?.totalPoints ?? 10;
  const pct = Math.round((points / totalPoints) * 100);

  const primary = '#e68019';
  const textPrimary = isDark ? '#F5F7FA' : '#111827';
  const textSecondary = isDark ? '#C5CCD6' : '#6b7280';

  const circumference = 2 * Math.PI * 45; // r=45 matches SVG below
  const dashOffset = circumference * (1 - pct / 100);

  return (
    <main className="bg-gray-50 min-h-screen px-6 md:px-10 lg:px-40 py-10" style={{ fontFamily: 'Lexend, Noto Sans, sans-serif' }}>
      <div className="max-w-[960px] mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold" style={{ color: textPrimary }}>{pct >= 90 ? 'Amazing!' : pct >= 70 ? 'Great Effort!' : pct >= 40 ? 'Nice Work!' : 'You Did It!' } Test Complete!</h1>
            <p className="text-lg" style={{ color: textSecondary }}>You&apos;ve finished the "{lessonId?.replace(/-/g, ' ')}" quiz. Let&apos;s see how you did!</p>
          </div>

          {/* Circular score */}
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="#e5e7eb" strokeWidth="10" fill="none" />
                <circle cx="50" cy="50" r="45" stroke={primary} strokeWidth="10" fill="none"
                        strokeDasharray={circumference} strokeDashoffset={dashOffset} strokeLinecap="round"
                        transform="rotate(-90 50 50)" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold" style={{ color: textPrimary }}>{pct}%</span>
                <span className="text-sm font-medium" style={{ color: textSecondary }}>Score</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold" style={{ color: textPrimary }}>Areas of Strength</h2>
              <div className="flex items-start gap-4">
                <div className="text-green-500 mt-1">
                  <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold" style={{ color: textPrimary }}>Make‑10 Strategy</h3>
                  <p className="text-base" style={{ color: textSecondary }}>You used combinations to reach 10 quickly.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-green-500 mt-1">
                  <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold" style={{ color: textPrimary }}>Number Line</h3>
                  <p className="text-base" style={{ color: textSecondary }}>Adding by jumping on a number line looked solid.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold" style={{ color: textPrimary }}>Areas for Improvement</h2>
              <div className="flex items-start gap-4">
                <div className="text-yellow-500 mt-1">
                  <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.257 3.099c.636-1.028 2.25-1.028 2.886 0l6.252 10.12c.636 1.027-.182 2.281-1.443 2.281H3.448c-1.261 0-2.079-1.254-1.443-2.28L8.257 3.099zM10 12a1 1 0 100-2 1 1 0 000 2zm-1-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold" style={{ color: textPrimary }}>Near‑Ten Problems</h3>
                  <p className="text-base" style={{ color: textSecondary }}>Let’s practice moving 1 to make 10 (e.g., 9 + 5).</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-yellow-500 mt-1">
                  <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.257 3.099c.636-1.028 2.25-1.028 2.886 0l6.252 10.12c.636 1.027-.182 2.281-1.443 2.281H3.448c-1.261 0-2.079-1.254-1.443-2.28L8.257 3.099zM10 12a1 1 0 100-2 1 1 0 000 2zm-1-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold" style={{ color: textPrimary }}>Ten‑Frame Fluency</h3>
                  <p className="text-base" style={{ color: textSecondary }}>More practice filling to 10 will make you even faster.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t border-gray-200 pt-8 flex flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-2xl font-bold" style={{ color: textPrimary }}>What&apos;s Next?</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => navigate(`/lesson/${lessonId}/start`)} className="rounded-full h-12 px-8 font-bold border bg-white" style={{ color: '#d97716', borderColor: '#d1d5db' }}>Review Answers</button>
              <button onClick={() => navigate(`/lesson/${lessonId}/test`)} className="rounded-full h-12 px-8 font-bold text-white" style={{ background: primary }}>Try Again</button>
              <button onClick={() => navigate('/lessons')} className="rounded-full h-12 px-8 font-bold text-white" style={{ background: '#4b5563' }}>Next Lesson</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LessonTestResults;


