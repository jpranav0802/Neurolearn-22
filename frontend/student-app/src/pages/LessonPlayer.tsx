import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

type QuizOption = { id: string; label: string };
type QuizItem = {
  id: string;
  prompt: string;
  options: QuizOption[];
  correctId: string;
  explanation: string;
};

type Slide =
  | { type: 'content'; id: string; title: string; body: React.ReactNode }
  | { type: 'quiz'; id: string; title: string; items: QuizItem[] };

const useMathAdventuresSlides = (): Slide[] => {
  const svgNumberLine = (
    <svg viewBox="0 0 300 60" className="w-full h-16">
      <line x1="10" y1="30" x2="290" y2="30" stroke="#374151" strokeWidth="2" />
      {Array.from({ length: 11 }).map((_, i) => (
        <g key={i}>
          <line x1={10 + i * 28} y1="25" x2={10 + i * 28} y2="35" stroke="#374151" strokeWidth="2" />
          <text x={10 + i * 28} y="50" textAnchor="middle" fontSize="12" fill="#374151">{i}</text>
        </g>
      ))}
      <circle cx={10 + 5 * 28} cy="30" r="6" fill="#F59E0B" />
    </svg>
  );

  return [
    {
      type: 'content',
      id: 'intro',
      title: 'Making 10 with Counters',
      body: (
        <div className="space-y-3">
          <p>
            Today we will practice making 10. Making 10 helps us add numbers quickly. We can
            use counters or a ten-frame.
          </p>
          <p>Tip: 7 and 3 make 10, 6 and 4 make 10, 5 and 5 make 10!</p>
        </div>
      ),
    },
    {
      type: 'content',
      id: 'ten-frame',
      title: 'Ten‑Frame Practice',
      body: (
        <div className="space-y-3">
          <p>Fill the ten‑frame to make 10. If you see 6 dots, how many spaces are empty?</p>
          <p>Answer: 4 empty spaces → 6 + 4 = 10.</p>
        </div>
      ),
    },
    {
      type: 'content',
      id: 'number-line',
      title: 'Number Line Warm‑up',
      body: (
        <div className="space-y-3">
          <p>Find the number 5 on the number line. Then jump 3 to the right. Where do you land?</p>
          {svgNumberLine}
          <p>5 + 3 = 8. Great job!</p>
        </div>
      ),
    },
    {
      type: 'content',
      id: 'decompose',
      title: 'Decompose to Make 10',
      body: (
        <div className="space-y-3">
          <p>Break a number into parts. 9 + 3 → think 9 + 1 + 2 = 10 + 2 = 12.</p>
          <p>This trick helps add faster without counting one by one.</p>
        </div>
      ),
    },
    {
      type: 'quiz',
      id: 'quiz-1',
      title: 'Quick Check',
      items: [
        {
          id: 'q1',
          prompt: 'Which pair makes 10?',
          options: [
            { id: 'a', label: '7 and 2' },
            { id: 'b', label: '6 and 4' },
            { id: 'c', label: '9 and 2' },
          ],
          correctId: 'b',
          explanation: '6 + 4 = 10. (7 + 2 = 9, 9 + 2 = 11)',
        },
        {
          id: 'q2',
          prompt: '5 + 5 = ?',
          options: [
            { id: 'a', label: '9' },
            { id: 'b', label: '10' },
            { id: 'c', label: '11' },
          ],
          correctId: 'b',
          explanation: 'Two equal groups of 5 make 10.',
        },
        {
          id: 'q3',
          prompt: 'You have 7 counters. How many more to make 10?',
          options: [
            { id: 'a', label: '2' },
            { id: 'b', label: '3' },
            { id: 'c', label: '4' },
          ],
          correctId: 'b',
          explanation: '7 + 3 = 10.',
        },
      ],
    },
    {
      type: 'content',
      id: 'apply',
      title: 'Apply the Strategy',
      body: (
        <div className="space-y-3">
          <p>Try adding 8 + 2 by making 10. Think: 8 needs 2 more to be 10. So 8 + 2 = 10.</p>
          <p>What about 8 + 3? Make 10 (8 + 2), then add 1 more → 11.</p>
        </div>
      ),
    },
    {
      type: 'content',
      id: 'word-problem',
      title: 'Word Problem',
      body: (
        <div className="space-y-3">
          <p>Sam has 8 stickers. A friend gives Sam 2 more. How many stickers now?</p>
          <p>Make 10: 8 + 2 = 10. Sam has 10 stickers.</p>
        </div>
      ),
    },
    {
      type: 'content',
      id: 'near-ten',
      title: 'Near‑Ten Addition',
      body: (
        <div className="space-y-3">
          <p>For 9 + 5, move 1 from 5 to 9 to make 10 → 10 + 4 = 14.</p>
          <p>Try this with 7 + 9: move 1 from 7 to 9 → 10 + 6 = 16.</p>
        </div>
      ),
    },
    {
      type: 'quiz',
      id: 'quiz-2',
      title: 'Show What You Know',
      items: [
        {
          id: 'q4',
          prompt: '8 + 2 = ?',
          options: [
            { id: 'a', label: '9' },
            { id: 'b', label: '10' },
            { id: 'c', label: '11' },
          ],
          correctId: 'b',
          explanation: 'Make 10: 8 needs 2 → 10.',
        },
        {
          id: 'q5',
          prompt: '6 + 4 = ?',
          options: [
            { id: 'a', label: '10' },
            { id: 'b', label: '9' },
            { id: 'c', label: '8' },
          ],
          correctId: 'a',
          explanation: 'Another Make‑10 pair: 6 + 4.',
        },
      ],
    },
    {
      type: 'content',
      id: 'wrap',
      title: 'Great Work!',
      body: (
        <div className="space-y-3">
          <p>You used Make‑10 to add quickly. Keep practicing with counters, ten‑frames, and number lines.</p>
          <p>Next time, we will use this trick with bigger numbers.</p>
        </div>
      ),
    },
  ];
};

const LessonPlayer: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const slides = useMathAdventuresSlides();
  const [index, setIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = React.useState<Record<string, boolean>>({});

  const current = slides[index];
  const primary = '#e68019';
  const textPrimary = isDark ? '#F5F7FA' : '#181411';
  const textSecondary = isDark ? '#C5CCD6' : '#5e5c5a';
  const cardBg = isDark ? '#141925' : '#fafafa';
  const border = isDark ? '#1f2633' : '#f4f2f0';

  const goPrev = () => setIndex((i) => Math.max(0, i - 1));
  const goNext = () => setIndex((i) => Math.min(slides.length - 1, i + 1));

  const score = React.useMemo(() => {
    let s = 0; let t = 0;
    slides.forEach((sl) => {
      if (sl.type === 'quiz') {
        sl.items.forEach((q) => {
          t += 1; if (answers[q.id] === q.correctId) s += 1;
        });
      }
    });
    return { s, t };
  }, [answers, slides]);

  if (!lessonId) {
    return null;
  }

  const onSelect = (q: QuizItem, id: string) => {
    setAnswers((a) => ({ ...a, [q.id]: id }));
    setShowFeedback((f) => ({ ...f, [q.id]: true }));
  };

  return (
    <main className="px-6 md:px-12 lg:px-28 xl:px-40 py-8 min-h-screen" style={{ background: isDark ? '#0E1116' : '#ffffff', fontFamily: 'Lexend, Noto Sans, sans-serif' }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm" style={{ color: textSecondary }}>Lesson / {lessonId}</div>
          <div className="text-sm" style={{ color: textSecondary }}>{index + 1} / {slides.length}</div>
        </div>

        <div className="rounded-2xl p-6 mb-6" style={{ background: cardBg, border: `1px solid ${border}` }}>
          <h2 className="text-2xl font-bold mb-3" style={{ color: textPrimary }}>{current.title}</h2>
          {current.type === 'content' && (
            <div style={{ color: textSecondary }} className="leading-relaxed">{current.body}</div>
          )}
          {current.type === 'quiz' && (
            <div className="space-y-6">
              {current.items.map((q) => (
                <div key={q.id} className="space-y-2">
                  <p className="font-medium" style={{ color: textPrimary }}>{q.prompt}</p>
                  <div className="grid sm:grid-cols-3 gap-2">
                    {q.options.map((op) => {
                      const selected = answers[q.id] === op.id;
                      const correct = op.id === q.correctId;
                      const show = showFeedback[q.id];
                      const bg = show ? (correct ? '#DCFCE7' : selected ? '#FEE2E2' : cardBg) : cardBg;
                      const borderC = show ? (correct ? '#22C55E' : selected ? '#EF4444' : border) : border;
                      return (
                        <button
                          key={op.id}
                          onClick={() => onSelect(q, op.id)}
                          className="rounded-xl px-4 py-3 text-left"
                          style={{ background: bg, border: `1px solid ${borderC}`, color: textPrimary }}
                        >{op.label}</button>
                      );
                    })}
                  </div>
                  {showFeedback[q.id] && (
                    <p className="text-sm" style={{ color: textSecondary }}>{q.explanation}</p>
                  )}
                </div>
              ))}
              <div className="text-sm" style={{ color: textSecondary }}>Score so far: {score.s} / {score.t}</div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button onClick={goPrev} disabled={index === 0} className={`rounded-full h-11 px-5 font-semibold ${index === 0 ? 'opacity-50 cursor-not-allowed' : ''}`} style={{ background: isDark ? '#1f2937' : '#e5e7eb', color: textPrimary }}>Back</button>
          {index < slides.length - 1 ? (
            <button onClick={goNext} className="rounded-full h-11 px-6 font-semibold" style={{ background: primary, color: '#fff' }}>Next</button>
          ) : (
            <div className="flex gap-3">
              <button onClick={() => navigate(`/lesson/${lessonId}/complete`)} className="rounded-full h-11 px-6 font-semibold" style={{ background: primary, color: '#fff' }}>Finish Lesson</button>
              <button onClick={() => navigate(`/lesson/${lessonId}/test`)} className="rounded-full h-11 px-6 font-semibold" style={{ background: '#1f2937', color: '#fff' }}>Go to Test</button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default LessonPlayer;


