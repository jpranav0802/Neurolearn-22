import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

type TestOption = { id: string; label: string };
type TestQuestion = {
  id: string;
  prompt: string;
  options: TestOption[];
  correctId: string;
  explanation: string;
};

const mathTest: TestQuestion[] = [
  {
    id: 't1',
    prompt: 'Which pair makes 10?',
    options: [
      { id: 'a', label: '7 and 3' },
      { id: 'b', label: '6 and 1' },
      { id: 'c', label: '9 and 0' },
      { id: 'd', label: '8 and 1' },
    ],
    correctId: 'a',
    explanation: '7 + 3 = 10. Make‑10 pairs are helpful for fast addition.',
  },
  {
    id: 't2',
    prompt: '8 + 2 = ?',
    options: [
      { id: 'a', label: '9' },
      { id: 'b', label: '10' },
      { id: 'c', label: '11' },
      { id: 'd', label: '12' },
    ],
    correctId: 'b',
    explanation: 'Make 10: 8 needs 2 → 10.',
  },
  {
    id: 't3',
    prompt: 'You see 6 dots in a ten‑frame. How many empty spaces?',
    options: [
      { id: 'a', label: '2' },
      { id: 'b', label: '3' },
      { id: 'c', label: '4' },
      { id: 'd', label: '6' },
    ],
    correctId: 'c',
    explanation: 'A ten‑frame holds 10. 10 − 6 = 4 empty spaces.',
  },
  {
    id: 't4',
    prompt: '9 + 5 = ? (use near‑ten strategy)',
    options: [
      { id: 'a', label: '13' },
      { id: 'b', label: '14' },
      { id: 'c', label: '15' },
      { id: 'd', label: '16' },
    ],
    correctId: 'b',
    explanation: 'Move 1 from 5 to 9: 10 + 4 = 14.',
  },
  {
    id: 't5',
    prompt: 'Which shows the same as 10?',
    options: [
      { id: 'a', label: '4 + 5' },
      { id: 'b', label: '3 + 8' },
      { id: 'c', label: '7 + 2' },
      { id: 'd', label: '5 + 5' },
    ],
    correctId: 'd',
    explanation: '5 + 5 = 10 (double 5).',
  },
];

const LessonTest: React.FC = () => {
  const { isDark } = useTheme();
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();

  const questions = mathTest; // can branch by lessonId later
  const [idx, setIdx] = React.useState(0);
  const [selected, setSelected] = React.useState<Record<string, string>>({});
  const [locked, setLocked] = React.useState<Record<string, boolean>>({});
  const [points, setPoints] = React.useState(0);

  const q = questions[idx];
  const primary = '#e68019';
  const textPrimary = isDark ? '#F5F7FA' : '#1f2937';
  const textMuted = isDark ? '#C5CCD6' : '#6b7280';

  const total = questions.length;
  const progressPct = Math.round(((idx) / total) * 100);

  const onChoose = (optionId: string) => {
    if (locked[q.id]) return;
    setSelected((s) => ({ ...s, [q.id]: optionId }));
  };

  const onNext = () => {
    if (!locked[q.id]) {
      // lock and score
      const chosen = selected[q.id];
      const isCorrect = chosen === q.correctId;
      setLocked((l) => ({ ...l, [q.id]: true }));
      if (isCorrect) setPoints((p) => p + 2);
      // stay on the question to show feedback; press Next again to move
      return;
    }
    // already locked → move forward
    if (idx < total - 1) setIdx((i) => i + 1);
    else {
      // save result for results page
      const payload = { lessonId, points, totalPoints: total * 2, timestamp: Date.now() };
      sessionStorage.setItem('lessonTestResult', JSON.stringify(payload));
      // update rewards cumulative points and activity log (live update)
      try {
        const currentTotal = parseInt(localStorage.getItem('rewards.totalPoints') || '0', 10);
        const newTotal = currentTotal + points;
        localStorage.setItem('rewards.totalPoints', String(newTotal));
        const activitiesRaw = localStorage.getItem('rewards.activities');
        const activities = activitiesRaw ? JSON.parse(activitiesRaw) : [];
        activities.unshift({ title: 'Completed Test', date: payload.timestamp, points: points });
        localStorage.setItem('rewards.activities', JSON.stringify(activities.slice(0, 10)));
      } catch (e) {
        // ignore storage errors
      }
      navigate(`/lesson/${lessonId}/results`);
    }
  };

  const isLocked = !!locked[q.id];
  const chosen = selected[q.id];
  const correct = chosen === q.correctId;

  return (
    <main className="py-10 px-4 md:px-12 lg:px-20 min-h-screen" style={{ background: isDark ? '#0E1116' : '#F5F5F4', fontFamily: 'Lexend, Noto Sans, sans-serif' }}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <p className="text-lg font-bold" style={{ color: textPrimary }}>Question {idx + 1} of {total}</p>
          <div className="flex items-center gap-2">
            <span className="text-sm" style={{ color: textMuted }}>Progress</span>
            <div className="w-32 h-2 rounded-full" style={{ background: isDark ? '#1f2937' : '#e5e7eb' }}>
              <div className="h-2 rounded-full" style={{ width: `${progressPct}%`, background: primary }} />
            </div>
            <span className="text-sm font-semibold" style={{ color: textPrimary }}>{points} pts</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl shadow-sm" style={{ background: '#ffffff' }}>
          <h1 className="text-3xl font-bold leading-tight pt-2" style={{ color: textPrimary }}>{q.prompt}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
            {q.options.map((op) => {
              const isSelected = chosen === op.id;
              const borderC = isSelected ? primary : (isDark ? '#e5e7eb' : '#d6d3d1');
              const bg = isSelected ? `${primary}15` : 'transparent';
              return (
                <label key={op.id} className="flex items-center gap-4 rounded-xl border-2 p-4 transition-all cursor-pointer" style={{ borderColor: borderC, background: bg }}>
                  <input type="radio" className="h-5 w-5" name={`q-${q.id}`} checked={isSelected} onChange={() => onChoose(op.id)} />
                  <span className="text-lg font-medium" style={{ color: textPrimary }}>{op.label}</span>
                </label>
              );
            })}
          </div>

          <div className="flex justify-end pt-2">
            <button onClick={onNext} className="flex min-w-[120px] items-center justify-center rounded-full h-12 px-6 text-white text-lg font-bold tracking-wide shadow-md transition-colors" style={{ background: primary }}>
              <span>{isLocked ? (idx === total - 1 ? 'Finish' : 'Next') : 'Check'}</span>
            </button>
          </div>
        </div>

        {isLocked && (
          correct ? (
            <div className="mt-6 p-6 rounded-2xl flex items-start gap-4" style={{ background: '#DCFCE7', border: '1px solid #A7F3D0' }}>
              <span className="material-symbols-outlined" style={{ color: '#16A34A', marginTop: 4 }}>check_circle</span>
              <div>
                <h3 className="text-lg font-bold" style={{ color: '#166534' }}>Correct!</h3>
                <p className="text-base mt-1" style={{ color: '#15803D' }}>{q.explanation} +2 points!</p>
              </div>
            </div>
          ) : (
            <div className="mt-6 p-6 rounded-2xl flex items-start gap-4" style={{ background: '#FEE2E2', border: '1px solid #FECACA' }}>
              <span className="material-symbols-outlined" style={{ color: '#DC2626', marginTop: 4 }}>cancel</span>
              <div>
                <h3 className="text-lg font-bold" style={{ color: '#991B1B' }}>Not quite…</h3>
                <p className="text-base mt-1" style={{ color: '#B91C1C' }}>{q.explanation}</p>
              </div>
            </div>
          )
        )}
      </div>
    </main>
  );
};

export default LessonTest;


