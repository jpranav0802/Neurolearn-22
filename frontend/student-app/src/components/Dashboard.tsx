import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import LiquidGlassCard from './LiquidGlassCard';
import LiquidGlassButton from './LiquidGlassButton';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <LiquidGlassButton
      variant="secondary"
      size="medium"
      onClick={handleLogout}
      className="flex items-center justify-center gap-2 w-full md:w-auto"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      <span>Logout</span>
    </LiquidGlassButton>
  );
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const getDashboardContent = () => {
    switch (user.role) {
      case 'student':
        return <StudentDashboard user={user} />;
      case 'parent':
        return <ParentDashboard user={user} />;
      case 'teacher':
        return <TeacherDashboard user={user} />;
      case 'therapist':
        return <TherapistDashboard user={user} />;
      default:
        return <StudentDashboard user={user} />;
    }
  };

  return getDashboardContent();
};

// Student Dashboard (new design)
const StudentDashboard: React.FC<{ user: any }> = ({ user }) => {
  const navigate = useNavigate();
  const { isDark, setIsDark } = useTheme();
  const [soundOn, setSoundOn] = React.useState(false);
  const [visualsComplex, setVisualsComplex] = React.useState(false);
  const [sensoryOpen, setSensoryOpen] = React.useState(false);
  const [aacOpen, setAacOpen] = React.useState(false);
  const sensoryTimerRef = React.useRef<number | undefined>(undefined);
  const aacTimerRef = React.useRef<number | undefined>(undefined);
  const [feedback, setFeedback] = React.useState<string>('');
  const [feedbackVisible, setFeedbackVisible] = React.useState(false);
  const feedbackTimerRef = React.useRef<number | undefined>(undefined);

  const [darkMode, setDarkMode] = React.useState<boolean>(isDark);
  React.useEffect(() => setDarkMode(isDark), [isDark]);
  // Initialize sound setting from saved app settings
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('neurolearn.settings');
      if (raw) {
        const s = JSON.parse(raw);
        if (typeof s.tts === 'boolean') setSoundOn(s.tts);
      }
    } catch { }
  }, []);
  // Keep TTS in sync with global settings when changed here
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('neurolearn.settings');
      const s = raw ? JSON.parse(raw) : {};
      if (s.tts !== soundOn) {
        localStorage.setItem('neurolearn.settings', JSON.stringify({ ...s, tts: soundOn }));
      }
    } catch { }
  }, [soundOn]);
  const primaryText = darkMode ? '#F5F7FA' : '#181511';
  const secondaryText = darkMode ? '#C5CCD6' : '#887B63';

  const clearTimer = (ref: React.MutableRefObject<number | undefined>) => {
    if (ref.current !== undefined) {
      window.clearTimeout(ref.current);
      ref.current = undefined;
    }
  };

  const showFeedback = (text: string) => {
    if (feedbackTimerRef.current !== undefined) {
      window.clearTimeout(feedbackTimerRef.current);
      feedbackTimerRef.current = undefined;
    }
    setFeedback(text);
    setFeedbackVisible(true);
    feedbackTimerRef.current = window.setTimeout(() => setFeedbackVisible(false), 1500);
  };

  const speak = (text: string) => {
    try {
      if ('speechSynthesis' in window && soundOn) {
        const u = new SpeechSynthesisUtterance(text);
        u.rate = 1;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
      }
    } catch (e) {
      // ignore
    } finally {
      showFeedback(text);
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const startLesson = (title: string) => {
    speak(`Starting ${title}`);
    // In future: navigate(`/lessons?title=${encodeURIComponent(title)}`)
  };
  return (
    <div
      className={`min-h-screen ${darkMode ? 'bg-[#0E1116]' : ''}`}
      style={{
        fontFamily: 'Lexend, Noto Sans, sans-serif',
        background: darkMode
          ? '#0E1116'
          : visualsComplex
            ? 'linear-gradient(180deg, #FCFAF7 0%, #FFF6E5 100%)'
            : '#FCFAF7'
      }}
    >
      <div className="flex h-full">
        {/* Sidebar */}
        <aside
          className="fixed left-0 top-0 z-40 flex h-screen w-20 flex-col items-center gap-8 py-6 shadow-md"
          style={{ background: darkMode ? '#121620' : '#FFFFFF' }}
        >
          <div className="mb-4">
            <svg className="text-[var(--brand-primary)]" width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" />
              <path d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263Z" fill="currentColor" />
              <path d="M25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" />
            </svg>
          </div>
          <nav className="flex flex-col gap-6" style={{ color: secondaryText }}>
            <button onClick={() => scrollTo('home')} className="flex flex-col items-center p-2 rounded-lg transition-colors hover:text-[var(--brand-primary)]" style={{ color: primaryText }}><span className="w-8 h-8">🏠</span><span className="text-xs mt-1">Home</span></button>
            <button onClick={() => navigate('/lessons')} className="flex flex-col items-center p-2 rounded-lg transition-colors hover:text-[var(--brand-primary)]" style={{ color: primaryText }}><span className="w-8 h-8">📘</span><span className="text-xs mt-1">Lessons</span></button>
            <button onClick={() => navigate('/rewards')} className="flex flex-col items-center p-2 rounded-lg transition-colors hover:text-[var(--brand-primary)]" style={{ color: primaryText }}><span className="w-8 h-8">🏆</span><span className="text-xs mt-1">Rewards</span></button>
            <button onClick={() => navigate('/settings')} className="flex flex-col items-center p-2 rounded-lg transition-colors hover:text-[var(--brand-primary)]" style={{ color: primaryText }}><span className="w-8 h-8">⚙️</span><span className="text-xs mt-1">Settings</span></button>
          </nav>
        </aside>

        {/* Main */}
        <main className="ml-20 flex-1 p-8">
          {/* Header */}
          <header id="home" className="relative z-40 flex items-center justify-between pb-8">
            <h1 className="text-3xl font-bold" style={{ color: primaryText }}>Hello, {user.firstName || 'Alex'}!</h1>
            <div className="flex items-center gap-4">
              {/* Sensory settings with delayed hover */}
              <div
                className="relative"
                onMouseEnter={() => {
                  clearTimer(sensoryTimerRef);
                  setSensoryOpen(true);
                }}
                onMouseLeave={() => {
                  clearTimer(sensoryTimerRef);
                  sensoryTimerRef.current = window.setTimeout(() => setSensoryOpen(false), 700);
                }}
              >
                <button
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50"
                  style={{ background: darkMode ? '#141925' : '#FFFFFF', color: primaryText }}
                  aria-haspopup="dialog"
                  aria-expanded={sensoryOpen}
                  onClick={() => setSensoryOpen((o) => !o)}
                >
                  <span className="text-[var(--brand-primary)]">👂</span> Sensory Settings
                </button>
                <div
                  className={`absolute right-0 mt-2 w-64 rounded-lg shadow-lg p-4 transition-opacity z-50 ${sensoryOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                  style={{ background: darkMode ? '#141925' : '#FFFFFF', color: primaryText }}
                >
                  <h4 className="font-semibold mb-2" style={{ color: primaryText }}>Sound</h4>
                  <div className="flex items-center justify-between text-sm">
                    <span style={{ color: secondaryText }}>Off</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={soundOn} onChange={(e) => setSoundOn(e.target.checked)} />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[var(--brand-primary)] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>
                    <span style={{ color: secondaryText }}>On</span>
                  </div>
                  <h4 className="font-semibold mt-4 mb-2" style={{ color: primaryText }}>Visuals</h4>
                  <div className="flex items-center justify-between text-sm">
                    <span style={{ color: secondaryText }}>Simple</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={visualsComplex}
                        onChange={(e) => {
                          setVisualsComplex(e.target.checked);
                          showFeedback(e.target.checked ? 'Complex visuals enabled' : 'Simple visuals enabled');
                        }}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[var(--brand-primary)] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>
                    <span style={{ color: secondaryText }}>Complex</span>
                  </div>
                  <h4 className="font-semibold mt-4 mb-2" style={{ color: primaryText }}>Theme</h4>
                  <div className="flex items-center justify-between text-sm">
                    <span style={{ color: secondaryText }}>Light</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={darkMode}
                        onChange={(e) => {
                          setDarkMode(e.target.checked);
                          setIsDark(e.target.checked);
                          showFeedback(e.target.checked ? 'Dark mode on' : 'Dark mode off');
                        }}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[var(--brand-primary)] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>
                    <span style={{ color: secondaryText }}>Dark</span>
                  </div>
                </div>
              </div>
              {/* AAC quick phrases with delayed hover */}
              <div
                className="relative"
                onMouseEnter={() => {
                  clearTimer(aacTimerRef);
                  setAacOpen(true);
                }}
                onMouseLeave={() => {
                  clearTimer(aacTimerRef);
                  aacTimerRef.current = window.setTimeout(() => setAacOpen(false), 700);
                }}
              >
                <button
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50"
                  style={{ background: darkMode ? '#141925' : '#FFFFFF', color: primaryText }}
                  aria-haspopup="dialog"
                  aria-expanded={aacOpen}
                  onClick={() => setAacOpen((o) => !o)}
                >
                  <span className="text-[#eaaf42]">💬</span> I want to say...
                </button>
                <div
                  className={`absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4 transition-opacity z-50 ${aacOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                >
                  <div className="grid grid-cols-3 gap-2">
                    {['😄 Happy', '😢 Sad', '😠 Angry', '😕 Confused', '🥤 I\'m thirsty', '🚽 Restroom'].map((t) => (
                      <button
                        key={t}
                        onClick={() => speak(t.replace(/^.\s?/, ''))}
                        className={`flex flex-col items-center p-2 rounded-lg text-center ${darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
                        style={{ color: primaryText }}
                      >
                        <span className="text-3xl">{t.split(' ')[0]}</span>
                        <span className="text-xs font-medium mt-1" style={{ color: secondaryText }}>{t.split(' ').slice(1).join(' ')}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {/* Logout */}
              <div className="hidden md:block">
                <LogoutButton />
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* transient feedback toast for AAC and actions */}
            {feedbackVisible && (
              <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60]">
                <div className="rounded-full bg-[#181511] text-white px-5 py-2 shadow-lg/50 shadow-black/20">
                  {feedback}
                </div>
              </div>
            )}

            {/* Today's Plan */}
            <section className="lg:col-span-1">
              <h2 className="mb-4 text-2xl font-semibold" style={{ color: primaryText }}>Today's Plan</h2>
              <div className="space-y-3">
                {[
                  { title: '1. Math Lesson', time: '9:00 AM - 9:30 AM', accent: true, icon: '🧮' },
                  { title: '2. Take a Break', time: '9:30 AM - 10:00 AM', accent: false, icon: '☕' },
                  { title: '3. Reading', time: '10:00 AM - 10:30 AM', accent: false, icon: '📖' },
                ].map((item) => (
                  <button
                    onClick={() => startLesson(item.title)}
                    key={item.title}
                    className={`group relative w-full text-left flex items-center gap-4 overflow-hidden rounded-xl p-4 shadow-[0_2px_8px_-1px_rgba(24,21,17,0.06),_0_6px_20px_-1px_rgba(24,21,17,0.1)] ${item.accent ? 'border-l-4 border-[var(--brand-primary)]' : ''}`}
                    style={{
                      background: darkMode
                        ? '#141925'
                        : (visualsComplex ? 'linear-gradient(90deg, #FFF4DA 0%, #FFFFFF 100%)' : '#FFFFFF'),
                      border: darkMode ? '1px solid rgba(255,255,255,0.06)' : undefined
                    }}
                  >
                    <div className={`flex size-12 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110 ${item.accent ? (darkMode ? 'bg-[#2A2010] text-[var(--brand-primary)]' : 'bg-[#FFF9F0] text-[var(--brand-primary)]') : (darkMode ? 'bg-[#1B202A] text-[#C5CCD6]' : 'bg-[#F4F3F0] text-[#5C554C]')
                      }`}>
                      <span className="text-xl">{item.icon}</span>
                    </div>
                    <div>
                      <p className="text-base font-semibold" style={{ color: primaryText }}>{item.title}</p>
                      <p className="text-sm" style={{ color: secondaryText }}>{item.time}</p>
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-[var(--brand-primary)]">➜</div>
                  </button>
                ))}
              </div>

              {/* Cognitive Skill Assessment Card */}
              <div
                className="mt-6 rounded-xl p-5 shadow-[0_2px_8px_-1px_rgba(24,21,17,0.06),_0_6px_20px_-1px_rgba(24,21,17,0.1)]"
                style={{
                  background: darkMode ? '#141925' : '#FFFFFF',
                  border: darkMode ? '1px solid rgba(255,255,255,0.06)' : undefined
                }}
              >
                <h3 className="text-xl font-bold" style={{ color: primaryText }}>Cognitive Skill Assessment</h3>
                <p className="mt-1 text-sm" style={{ color: secondaryText }}>Let’s check your skills with a fun game!</p>
                <div className="mt-4 flex items-center justify-between gap-4">
                  <div className="hidden sm:block text-sm" style={{ color: secondaryText }}>
                    Practice attention, memory and problem‑solving.
                  </div>
                  <button
                    onClick={() => navigate('/assessment')}
                    className="rounded-full px-5 py-2.5 text-white font-semibold"
                    style={{ background: 'var(--brand-primary)' }}
                  >
                    Start Test
                  </button>
                </div>
              </div>
            </section>

            {/* Explore Lessons */}
            <section id="lessons" className="lg:col-span-2">
              <div
                className="rounded-xl p-6 shadow-[0_2px_8px_-1px_rgba(24,21,17,0.06),_0_6px_20px_-1px_rgba(24,21,17,0.1)]"
                style={{
                  background: darkMode
                    ? '#121620'
                    : visualsComplex
                      ? 'linear-gradient(135deg, #FFFFFF 0%, #FFF6E5 100%)'
                      : '#FFFFFF'
                }}
              >
                <h2 className="text-2xl font-bold" style={{ color: primaryText }}>Explore Lessons</h2>
                <p className="mt-1 text-base" style={{ color: secondaryText }}>Find a new adventure in learning!</p>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: 'Fun with Math',
                      desc: 'Count, add, and subtract with fun games.',
                      cta: 'Start Learning',
                      kind: 'math'
                    },
                    {
                      title: 'Reading Adventures',
                      desc: 'Explore exciting stories and new words.',
                      cta: 'Start Reading',
                      kind: 'reading'
                    },
                    {
                      title: 'Social Stories',
                      desc: 'Learn about making friends and sharing.',
                      cta: 'Explore Stories',
                      kind: 'social'
                    },
                  ].map((card, idx) => (
                    <button
                      onClick={() => startLesson(card.title)}
                      key={idx}
                      className={`group relative text-left cursor-pointer overflow-hidden rounded-xl shadow-[0_2px_8px_-1px_rgba(24,21,17,0.06),_0_6px_20px_-1px_rgba(24,21,17,0.1)] transition-shadow ${visualsComplex ? 'hover:shadow-xl hover:scale-[1.01] transform transition-transform' : 'hover:shadow-lg'
                        }`}
                    >
                      {/* Reliable, embedded header illustration */}
                      <div
                        className="h-40 w-full flex items-center justify-center"
                        style={{
                          background: darkMode
                            ? 'linear-gradient(135deg, #0E1116 0%, #141925 100%)'
                            : 'linear-gradient(to top right, #FFF6E5, #FFFFFF, #FFF6E5)'
                        }}
                      >
                        {card.kind === 'math' && (
                          <svg width="120" height="80" viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="10" y="20" width="60" height="40" rx="8" fill="#FDE68A" />
                            <text x="40" y="48" textAnchor="middle" fontSize="24" fill="#B45309">1+2</text>
                            <rect x="90" y="20" width="60" height="40" rx="8" fill="#BFDBFE" />
                            <text x="120" y="48" textAnchor="middle" fontSize="24" fill="#1D4ED8">3×4</text>
                            <rect x="170" y="20" width="60" height="40" rx="8" fill="#FCA5A5" />
                            <text x="200" y="48" textAnchor="middle" fontSize="24" fill="#B91C1C">9-5</text>
                          </svg>
                        )}
                        {card.kind === 'reading' && (
                          <svg width="140" height="90" viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="30" y="40" width="100" height="80" rx="10" fill="#BFDBFE" />
                            <rect x="150" y="40" width="100" height="80" rx="10" fill="#C7D2FE" />
                            <line x1="40" y1="70" x2="120" y2="70" stroke="#1E3A8A" strokeWidth="4" />
                            <line x1="160" y1="70" x2="240" y2="70" stroke="#4338CA" strokeWidth="4" />
                          </svg>
                        )}
                        {card.kind === 'social' && (
                          <svg width="140" height="90" viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="70" cy="70" r="20" fill="#FCD34D" />
                            <circle cx="140" cy="70" r="20" fill="#A7F3D0" />
                            <circle cx="210" cy="70" r="20" fill="#93C5FD" />
                            <rect x="50" y="100" width="160" height="12" rx="6" fill="#E5E7EB" />
                          </svg>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold" style={{ color: primaryText }}>{card.title}</h3>
                        <p className="mt-1 text-sm" style={{ color: secondaryText }}>{card.desc}</p>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                        <span className="text-lg font-bold text-white">{card.cta}</span>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <button onClick={() => navigate('/lessons/all')} className="rounded-full px-8 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90" style={{ background: 'var(--brand-primary)' }}>See All Lessons</button>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

// Parent Dashboard
const ParentDashboard: React.FC<{ user: any }> = ({ user }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <LiquidGlassCard>
        <h2 className="text-xl font-bold text-text-primary mb-4">👨‍👩‍👧‍👦 Children's Progress</h2>
        <p className="text-text-secondary mb-4">Monitor your children's learning journey and achievements.</p>
        <div className="space-y-4">
          <div className="p-4 bg-brand-primary/5 rounded-lg">
            <h3 className="font-semibold text-text-primary">Alex's Progress</h3>
            <p className="text-sm text-text-secondary">Completed 3 lessons this week</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-brand-primary h-2 rounded-full" style={{ width: '65%' }} />
            </div>
          </div>
        </div>
        <LiquidGlassButton variant="primary" size="medium" className="w-full mt-4">
          View Detailed Reports
        </LiquidGlassButton>
      </LiquidGlassCard>

      <LiquidGlassCard>
        <h2 className="text-xl font-bold text-text-primary mb-4">📊 Weekly Insights</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-text-secondary">Learning Time</span>
            <span className="font-semibold text-brand-primary">2h 45m</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Lessons Completed</span>
            <span className="font-semibold text-brand-primary">8</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Goals Achieved</span>
            <span className="font-semibold text-brand-primary">12/15</span>
          </div>
        </div>
      </LiquidGlassCard>
    </div>
  );
};

// Teacher Dashboard
const TeacherDashboard: React.FC<{ user: any }> = ({ user }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <LiquidGlassCard>
        <h2 className="text-xl font-bold text-text-primary mb-4">👩‍🏫 My Students</h2>
        <p className="text-text-secondary mb-4">Track progress and create personalized learning plans.</p>
        <LiquidGlassButton variant="primary" size="medium" className="w-full">
          Manage Students
        </LiquidGlassButton>
      </LiquidGlassCard>

      <LiquidGlassCard>
        <h2 className="text-xl font-bold text-text-primary mb-4">📚 Lesson Planning</h2>
        <p className="text-text-secondary mb-4">Create and customize learning materials.</p>
        <LiquidGlassButton variant="primary" size="medium" className="w-full">
          Create Lesson Plan
        </LiquidGlassButton>
      </LiquidGlassCard>
    </div>
  );
};

// Therapist Dashboard
const TherapistDashboard: React.FC<{ user: any }> = ({ user }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <LiquidGlassCard>
        <h2 className="text-xl font-bold text-text-primary mb-4">🧠 Client Progress</h2>
        <p className="text-text-secondary mb-4">Monitor behavioral patterns and learning outcomes.</p>
        <LiquidGlassButton variant="primary" size="medium" className="w-full">
          View Client Reports
        </LiquidGlassButton>
      </LiquidGlassCard>

      <LiquidGlassCard>
        <h2 className="text-xl font-bold text-text-primary mb-4">🎯 Intervention Plans</h2>
        <p className="text-text-secondary mb-4">Design therapeutic learning strategies.</p>
        <LiquidGlassButton variant="primary" size="medium" className="w-full">
          Create Intervention
        </LiquidGlassButton>
      </LiquidGlassCard>
    </div>
  );
};

export default Dashboard;
