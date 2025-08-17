import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

type Settings = {
  theme: 'light' | 'dark';
  color: string; // hex
  learningMode: 'Visual' | 'Auditory' | 'Kinesthetic';
  feedback: boolean;
  language: string;
  notifications: boolean;
  tts: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  fontScale: number; // 1.0 - 1.3
};

const DEFAULT_SETTINGS: Settings = {
  theme: 'light',
  color: '#e68019',
  learningMode: 'Visual',
  feedback: true,
  language: 'English (US)',
  notifications: true,
  tts: true,
  highContrast: false,
  reducedMotion: false,
  fontScale: 1.0,
};

const COLOR_OPTIONS = ['#e68019', '#4a90e2', '#50e3c2', '#bd10e0'];

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDark, setIsDark } = useTheme();
  const [settings, setSettings] = React.useState<Settings>(() => {
    try {
      const raw = localStorage.getItem('neurolearn.settings');
      const s = raw ? (JSON.parse(raw) as Settings) : DEFAULT_SETTINGS;
      return { ...DEFAULT_SETTINGS, ...s };
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Apply side effects when settings change
  React.useEffect(() => {
    localStorage.setItem('neurolearn.settings', JSON.stringify(settings));
    // Theme
    const dark = settings.theme === 'dark';
    if (dark !== isDark) setIsDark(dark);
    // Palette
    document.documentElement.style.setProperty('--brand-primary', settings.color);
    // High contrast
    document.documentElement.classList.toggle('high-contrast', settings.highContrast);
    // Reduced motion
    document.documentElement.classList.toggle('reduced-motion', settings.reducedMotion);
    // Font scale
    document.documentElement.style.setProperty('--app-font-scale', String(settings.fontScale));
  }, [settings, isDark, setIsDark]);

  const textPrimary = isDark ? '#F5F7FA' : '#181411';
  const textSecondary = isDark ? '#C5CCD6' : '#887563';
  const cardBg = isDark ? '#141925' : '#FFFFFF';
  const containerBg = isDark ? '#0E1116' : '#fafafa';
  const border = isDark ? 'rgba(255,255,255,0.08)' : 'var(--border-color)';

  const toggle = (key: keyof Settings) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((s) => ({ ...s, [key]: e.target.checked }));
  };

  return (
    <main className="min-h-screen p-8" style={{ background: containerBg }}>
      <div className="max-w-4xl mx-auto" style={{ fontSize: `calc(1rem * var(--app-font-scale, 1))` }}>
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold" style={{ color: textPrimary }}>Settings</h1>
          <button
            onClick={() => navigate('/dashboard')}
            className="rounded-full px-4 py-2 text-sm font-medium text-white"
            style={{ background: 'var(--brand-primary)' }}
          >
            Back to Dashboard
          </button>
        </div>

        <div className="space-y-12">
          {/* Display */}
          <section>
            <h2 className="text-2xl font-bold mb-6" style={{ color: textPrimary }}>Display</h2>
            <div className="p-6 rounded-2xl space-y-6" style={{ background: cardBg, border: `1px solid ${border}` }}>
              {/* Theme */}
              <div>
                <p className="text-lg font-medium mb-4" style={{ color: textPrimary }}>Theme</p>
                <div className="flex gap-4">
                  {(['light', 'dark'] as const).map((t) => (
                    <label key={t} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition w-40 justify-center ${settings.theme === t ? 'bg-orange-50' : ''}`}
                      style={{ borderColor: settings.theme === t ? settings.color : border }}>
                      <input className="sr-only" type="radio" name="theme" checked={settings.theme === t} onChange={() => setSettings((s) => ({ ...s, theme: t }))} />
                      <span className="text-base font-medium" style={{ color: textPrimary }}>{t === 'light' ? 'Light' : 'Dark'}</span>
                    </label>
                  ))}
                </div>
              </div>
              <hr style={{ borderColor: border }} />
              {/* Palette */}
              <div>
                <p className="text-lg font-medium mb-4" style={{ color: textPrimary }}>Color Palette</p>
                <div className="flex gap-4">
                  {COLOR_OPTIONS.map((c) => (
                    <label key={c} className="cursor-pointer">
                      <input className="sr-only" type="radio" name="color" checked={settings.color === c} onChange={() => setSettings((s) => ({ ...s, color: c }))} />
                      <div className="w-10 h-10 rounded-full ring-2 ring-offset-2" style={{ background: c, boxShadow: settings.color === c ? `0 0 0 2px ${c}` : 'none', outlineColor: c }}></div>
                    </label>
                  ))}
                </div>
              </div>
              <hr style={{ borderColor: border }} />
              {/* Font size */}
              <div>
                <p className="text-lg font-medium mb-2" style={{ color: textPrimary }}>Font Size</p>
                <input
                  type="range"
                  min={1}
                  max={1.3}
                  step={0.05}
                  value={settings.fontScale}
                  onChange={(e) => setSettings((s) => ({ ...s, fontScale: parseFloat(e.target.value) }))}
                  className="w-full"
                />
                <p className="text-sm mt-1" style={{ color: textSecondary }}>Current: {Math.round(settings.fontScale * 100)}%</p>
              </div>
            </div>
          </section>

          {/* Learning Preferences */}
          <section>
            <h2 className="text-2xl font-bold mb-6" style={{ color: textPrimary }}>Learning Preferences</h2>
            <div className="p-6 rounded-2xl space-y-6" style={{ background: cardBg, border: `1px solid ${border}` }}>
              <div>
                <label htmlFor="learning-mode" className="text-lg font-medium mb-4 block" style={{ color: textPrimary }}>Preferred Learning Mode</label>
                <select
                  id="learning-mode"
                  className="w-full p-3 rounded-lg text-lg bg-transparent"
                  style={{ border: `1px solid ${border}`, color: textPrimary }}
                  value={settings.learningMode}
                  onChange={(e) => setSettings((s) => ({ ...s, learningMode: e.target.value as Settings['learningMode'] }))}
                >
                  <option>Visual</option>
                  <option>Auditory</option>
                  <option>Kinesthetic</option>
                </select>
              </div>
              <hr style={{ borderColor: border }} />
              <div className="flex items-center justify-between">
                <label htmlFor="feedback" className="text-lg font-medium cursor-pointer" style={{ color: textPrimary }}>Enable Feedback & Encouragement</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input id="feedback" type="checkbox" className="sr-only peer" checked={settings.feedback} onChange={toggle('feedback')} />
                  <div className="w-12 h-7 bg-gray-200 rounded-full peer peer-checked:bg-orange-500 after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:h-5 after:w-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-5" />
                </label>
              </div>
            </div>
          </section>

          {/* General */}
          <section>
            <h2 className="text-2xl font-bold mb-6" style={{ color: textPrimary }}>General</h2>
            <div className="p-6 rounded-2xl space-y-6" style={{ background: cardBg, border: `1px solid ${border}` }}>
              <div>
                <label htmlFor="language" className="text-lg font-medium mb-4 block" style={{ color: textPrimary }}>Interface Language</label>
                <select
                  id="language"
                  className="w-full p-3 rounded-lg text-lg bg-transparent"
                  style={{ border: `1px solid ${border}`, color: textPrimary }}
                  value={settings.language}
                  onChange={(e) => setSettings((s) => ({ ...s, language: e.target.value }))}
                >
                  <option>English (US)</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
              <hr style={{ borderColor: border }} />
              <div className="flex items-center justify-between">
                <label htmlFor="notifications" className="text-lg font-medium cursor-pointer" style={{ color: textPrimary }}>Enable Notifications</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input id="notifications" type="checkbox" className="sr-only peer" checked={settings.notifications} onChange={toggle('notifications')} />
                  <div className="w-12 h-7 bg-gray-200 rounded-full peer peer-checked:bg-orange-500 after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:h-5 after:w-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-5" />
                </label>
              </div>
            </div>
          </section>

          {/* Accessibility */}
          <section>
            <h2 className="text-2xl font-bold mb-6" style={{ color: textPrimary }}>Accessibility</h2>
            <div className="p-6 rounded-2xl space-y-6" style={{ background: cardBg, border: `1px solid ${border}` }}>
              <div className="flex items-center justify-between">
                <label htmlFor="tts" className="text-lg font-medium cursor-pointer" style={{ color: textPrimary }}>Enable text-to-speech</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input id="tts" type="checkbox" className="sr-only peer" checked={settings.tts} onChange={toggle('tts')} />
                  <div className="w-12 h-7 bg-gray-200 rounded-full peer peer-checked:bg-orange-500 after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:h-5 after:w-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-5" />
                </label>
              </div>
              <hr style={{ borderColor: border }} />
              <div className="flex items-center justify-between">
                <label htmlFor="contrast" className="text-lg font-medium cursor-pointer" style={{ color: textPrimary }}>High contrast mode</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input id="contrast" type="checkbox" className="sr-only peer" checked={settings.highContrast} onChange={toggle('highContrast')} />
                  <div className="w-12 h-7 bg-gray-200 rounded-full peer peer-checked:bg-orange-500 after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:h-5 after:w-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-5" />
                </label>
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="motion" className="text-lg font-medium cursor-pointer" style={{ color: textPrimary }}>Reduce motion</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input id="motion" type="checkbox" className="sr-only peer" checked={settings.reducedMotion} onChange={toggle('reducedMotion')} />
                  <div className="w-12 h-7 bg-gray-200 rounded-full peer peer-checked:bg-orange-500 after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:h-5 after:w-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-5" />
                </label>
              </div>
            </div>
          </section>

          {/* Save/Reset */}
          <section className="flex items-center gap-4">
            <button
              onClick={() => alert('Settings saved!')}
              className="rounded-full px-6 py-3 text-white font-semibold"
              style={{ background: 'var(--brand-primary)' }}
            >
              Save Changes
            </button>
            <button
              onClick={() => setSettings(DEFAULT_SETTINGS)}
              className="rounded-full px-6 py-3 font-semibold"
              style={{ color: textPrimary, border: `1px solid ${border}` }}
            >
              Reset to Defaults
            </button>
          </section>
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;


