import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

type TabKey = 'your' | 'all' | 'points';

const RewardsPage: React.FC = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [active, setActive] = React.useState<TabKey>('your');

  const primary = '#e68019';
  const textPrimary = isDark ? '#F5F7FA' : '#181411';
  const textSecondary = isDark ? '#C5CCD6' : '#887563';
  const surface = isDark ? '#0f131a' : '#fafafa';
  const card = isDark ? '#141925' : '#ffffff';
  const border = isDark ? '#1f2937' : '#f0f0f0';

  // Live points from localStorage (updated when finishing a test)
  const [points, setPoints] = React.useState<number>(() => {
    const saved = localStorage.getItem('rewards.totalPoints');
    return saved ? parseInt(saved, 10) : 0;
  });
  React.useEffect(() => {
    const onStorage = () => {
      const saved = localStorage.getItem('rewards.totalPoints');
      setPoints(saved ? parseInt(saved, 10) : 0);
    };
    window.addEventListener('storage', onStorage);
    const i = setInterval(onStorage, 500); // fallback for same-tab updates
    return () => { window.removeEventListener('storage', onStorage); clearInterval(i); };
  }, []);

  const TabButton: React.FC<{ k: TabKey; label: string }> = ({ k, label }) => (
    <button onClick={() => setActive(k)}
      className={`px-6 py-3 text-lg font-semibold rounded-full transition-colors ${active === k ? 'text-white' : ''}`}
      style={{ background: active === k ? primary : '#ffffff', color: active === k ? '#ffffff' : textSecondary }}>
      {label}
    </button>
  );

  const BadgeCard: React.FC<{ title: string; desc: string; borderColor: string; icon: string; img: string; dim?: boolean }>
    = ({ title, desc, borderColor, icon, img, dim }) => (
      <div className={`group flex flex-col items-center text-center gap-4 rounded-2xl p-6 shadow-lg transition-all duration-300 ${dim ? 'opacity-50' : ''}`}
        style={{ background: card }}>
        <div className="relative">
          <div className="w-32 h-32 bg-center bg-no-repeat aspect-square bg-cover rounded-full border-4" style={{ borderColor, backgroundImage: `url(${img})` }} />
          <div className="absolute -bottom-2 -right-2 flex items-center justify-center w-10 h-10 rounded-full text-white text-lg font-bold shadow-md" style={{ background: borderColor }}>
            <span className="material-icons">{icon}</span>
          </div>
        </div>
        <div>
          <p className="text-lg font-semibold" style={{ color: textPrimary }}>{title}</p>
          <p className="text-sm" style={{ color: textSecondary }}>{desc}</p>
        </div>
      </div>
    );

  return (
    <main className="min-h-screen" style={{ background: surface, fontFamily: 'Lexend, Noto Sans, sans-serif' }}>
      <div className="px-4 sm:px-10 lg:px-20 xl:px-40 py-10">
        <div className="mx-auto flex max-w-[1200px] flex-col">
          <div className="flex flex-wrap items-center justify-between gap-4 p-4">
            <div>
              <p className="text-lg" style={{ color: textSecondary }}>Welcome{user?.firstName ? `, ${user.firstName}` : ''}</p>
              <h1 className="text-4xl font-bold" style={{ color: textPrimary }}>My Rewards</h1>
            </div>
            <div className="flex items-center gap-4 rounded-full px-6 py-3 shadow-md" style={{ background: '#ffffff' }}>
              <div className="flex items-center gap-2" style={{ color: primary }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" fill={primary} /></svg>
                <p className="text-2xl font-bold">{points}</p>
              </div>
              <div className="h-8 w-px" style={{ background: border }} />
              <div style={{ color: textSecondary }}>
                <p className="text-sm font-medium">Points to unlock</p>
                <p className="text-lg font-bold" style={{ color: textPrimary }}>Next Badge!</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 border-b mb-8" style={{ borderColor: border }}>
            <TabButton k="your" label="Your Badges" />
            <TabButton k="all" label="All Badges" />
            <TabButton k="points" label="Points Tracker" />
          </div>

          {active === 'your' && (
            <section>
              <h2 className="text-3xl font-bold px-4 pb-4 pt-5" style={{ color: textPrimary }}>Your Badges (3)</h2>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8 p-4">
                <BadgeCard title="Math Whiz" desc="Completed 10 math lessons" borderColor="#FDE047" icon="school" img="https://lh3.googleusercontent.com/aida-public/AB6AXuD2r3eP8YOBJ-cgX-HtQGYLHEHLFNa0_6nQzI6UDPyxpctUt_X8dY4LALLdhTBf-ObvHmI9qaOLNNyp47ydgNk8IdaavencP-Kbdjlm05gl4dC58-YaqVTQ1SNGCirCGlYctHtmCXitOqR9sRYmEH7fi59t2EeiId4U7L1KSdrvSmRcz7lSk_GnxpNUZoqGXehZgLbFdcd1KCx2H-R93sf2LSgs7Vrt2VH5nMIOXfzsxSPjkKnP_EXEe8kGZAdXPgMYDuGdYi2WnrY" />
                <BadgeCard title="Reading Star" desc="Read 5 books" borderColor="#93C5FD" icon="auto_stories" img="https://lh3.googleusercontent.com/aida-public/AB6AXuAz9DKG1EGsK7NEUU72ayLCEjNwpAmxSoUK27vqTi1BuV8MT92ZjyOfMECrrWr39UNaRWQZ5R4p0a0OSnPtBvs31_8MuGDSrcU6QpYcDdytGjbTpV2sW9virOmgqdbjDWFVdnqrLZvgvRjDvbxNET_GqVNp4suOqEYSiZ0WgiR3WkY303uPXK8cLJltch2bA2Qfm7gKBU0SvGddIpSK1khzKXwXXzbOb2ejZiBPfiI3TEnV0iMpl2vNirC-AL0443AC7jRp6L688O8" />
                <BadgeCard title="Science Explorer" desc="Finished 3 science projects" borderColor="#86EFAC" icon="science" img="https://lh3.googleusercontent.com/aida-public/AB6AXuBblNND9plIMrX8Wz47K_-7RhRG0oTNz9dxc8C4F8VgWRvZth-5NRGoDrNkBMexH0r1-GrOACoPTbIUDm_ocxW86_IoP-GRqE0j2ghy4WV_YnH68bzUCMhcCM_80POEgHviozA4O27jMMhrGpnkGmk-1E3BJmHna-fDoptT8zWWsOvxkSUXdDD3C2jO2O6vzfzWWzvk4Xf9AUwj6LDKytgRHx0tRLseArakBrvMMMfRFrcb49f_NEpT8V3PBJrwLMPPacDD-hfEIuo" />
              </div>
            </section>
          )}

          {active === 'all' && (
            <section>
              <h2 className="text-3xl font-bold px-4 pb-4 pt-5" style={{ color: textPrimary }}>All Badges (6)</h2>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8 p-4">
                <BadgeCard title="Math Whiz" desc="Completed 10 math lessons" borderColor="#FDE047" icon="school" img="https://lh3.googleusercontent.com/aida-public/AB6AXuD2r3eP8YOBJ-cgX-HtQGYLHEHLFNa0_6nQzI6UDPyxpctUt_X8dY4LALLdhTBf-ObvHmI9qaOLNNyp47ydgNk8IdaavencP-Kbdjlm05gl4dC58-YaqVTQ1SNGCirCGlYctHtmCXitOqR9sRYmEH7fi59t2EeiId4U7L1KSdrvSmRcz7lSk_GnxpNUZoqGXehZgLbFdcd1KCx2H-R93sf2LSgs7Vrt2VH5nMIOXfzsxSPjkKnP_EXEe8kGZAdXPgMYDuGdYi2WnrY" />
                <BadgeCard title="Reading Star" desc="Read 5 books" borderColor="#93C5FD" icon="auto_stories" img="https://lh3.googleusercontent.com/aida-public/AB6AXuAz9DKG1EGsK7NEUU72ayLCEjNwpAmxSoUK27vqTi1BuV8MT92ZjyOfMECrrWr39UNaRWQZ5R4p0a0OSnPtBvs31_8MuGDSrcU6QpYcDdytGjbTpV2sW9virOmgqdbjDWFVdnqrLZvgvRjDvbxNET_GqVNp4suOqEYSiZ0WgiR3WkY303uPXK8cLJltch2bA2Qfm7gKBU0SvGddIpSK1khzKXwXXzbOb2ejZiBPfiI3TEnV0iMpl2vNirC-AL0443AC7jRp6L688O8" />
                <BadgeCard title="Science Explorer" desc="Finished 3 science projects" borderColor="#86EFAC" icon="science" img="https://lh3.googleusercontent.com/aida-public/AB6AXuBblNND9plIMrX8Wz47K_-7RhRG0oTNz9dxc8C4F8VgWRvZth-5NRGoDrNkBMexH0r1-GrOACoPTbIUDm_ocxW86_IoP-GRqE0j2ghy4WV_YnH68bzUCMhcCM_80POEgHviozA4O27jMMhrGpnkGmk-1E3BJmHna-fDoptT8zWWsOvxkSUXdDD3C2jO2O6vzfzWWzvk4Xf9AUwj6LDKytgRHx0tRLseArakBrvMMMfRFrcb49f_NEpT8V3PBJrwLMPPacDD-hfEIuo" />
                <BadgeCard title="Creative Thinker" desc="Created an art project" borderColor="#9CA3AF" icon="palette" img="https://lh3.googleusercontent.com/aida-public/AB6AXuCSehZAyrL-WbN-K7NWcgbaAMlddyPsJfu7JKCFufGNNa9ExmbMSWibp9qh7oJOyXi0DeMSuUFaChdUTVQ8FxaCNksMwkHIL1MJgsFS_Bc2R0FErE0jGKrl7IFTrzPAm-s4h7HlVQ-cTNiqRo0MMOXIPX_na6a_qJgLKmyi8gsyGA3W8zfDtwQGMEbVh41wKtBqHIMDW-LBVB4cTLXiHNjKATbCHGDHLn2mYnzE37YldsXmaMkbQEUB3MCZ06kXeT8hVW2BRgfLd_E" dim />
                <BadgeCard title="Problem Solver" desc="Solved 5 puzzles" borderColor="#9CA3AF" icon="extension" img="https://lh3.googleusercontent.com/aida-public/AB6AXuC1asFpswE15WHt8Fy2ZrYliQvR7jspsuLMZWVFq4xvy-pJ90eKzHG1hcw3MCMdB-Jn6uRR4Qy_sMDwXnjP09qXneKLFyxW03-nDgmU5bjw2OgkuCZzS6sfLdBBOlVo5_yyk32HOGBkHS2wiUrcpZfvmL4lpXYJRfRdcZQ444MZM3-jO2RGDix4OK1ZKHvNUuYiK1NNQkIpnX6UYH_g5ZtswvDZaig91FKEEWaLihG00-W1gcJb5tQFiVS5BA2l9ayzjd8x2PJiNfg" dim />
                <BadgeCard title="Team Player" desc="Participated in a group activity" borderColor="#9CA3AF" icon="groups" img="https://lh3.googleusercontent.com/aida-public/AB6AXuAYOhfsFPApkk5VfMotyFvfcVyh5kXSgBjYEBLfuEBKv1hOJ2KlOh7VuBRc3ddICriU3q8jNMpjDMOHoIDH_Lx-t1h_YYQ-Vi6-67BPmU_FZ10YKOJkoJz-r9ErEfOTi0jMq30g0eEUN-lII0Odq3T8v1H2oaXVaEjFrU8M5agvu9T2KBT52Hhswt9cagV8VZ8J89CwUZy5oe2GjhgvUSkAVdFbj0dmYOCqaf2ezedUvZnjK7P4gQMA3igqZ0RZxcyu3vZZoDSOkp4" dim />
              </div>
            </section>
          )}

          {active === 'points' && (
            <section className="py-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 rounded-2xl shadow-lg p-8" style={{ background: card }}>
                  <h2 className="text-3xl font-bold mb-2" style={{ color: textPrimary }}>Points Tracker</h2>
                  <p className="mb-8" style={{ color: textSecondary }}>Keep up the great work! Every point gets you closer to a new reward.</p>
                  <div className="mb-10">
                    <h3 className="text-xl font-semibold mb-4" style={{ color: textPrimary }}>Your Progress to the Next Reward</h3>
                    <div className="w-full rounded-full h-6 relative overflow-hidden" style={{ background: '#fceadc' }}>
                      <div className="h-full rounded-full flex items-center justify-end pr-2 transition-all duration-700" style={{ width: `${Math.min(100, (points / 5000) * 100)}%`, background: primary }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" fill="#ffffff" /></svg>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm mt-2" style={{ color: textSecondary }}>
                      <span className="font-semibold" style={{ color: textPrimary }}>{points} Points</span>
                      <span className="font-semibold" style={{ color: primary }}>Next Reward: 5000 Points</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4" style={{ color: textPrimary }}>Recent Points Earned</h3>
                    <ul className="space-y-4">
                      <li className="flex items-center justify-between p-4 rounded-lg" style={{ background: '#E8F5E9' }}>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full text-white" style={{ background: '#4CAF50' }}><span className="material-icons">add</span></div>
                          <div>
                            <p className="font-semibold" style={{ color: textPrimary }}>Completed Test</p>
                            <p className="text-sm" style={{ color: textSecondary }}>Today</p>
                          </div>
                        </div>
                        <p className="font-bold" style={{ color: '#4CAF50' }}>+{(() => { try { const last = JSON.parse(localStorage.getItem('rewards.activities') || '[]')[0]; return last?.points || 0; } catch (e) { return 0; } })()} Points</p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="rounded-2xl shadow-lg p-8 text-center" style={{ background: card }}>
                  <p className="text-lg" style={{ color: textSecondary }}>Total Points</p>
                  <p className="my-4 text-4xl font-extrabold" style={{ color: primary }}>{points}</p>
                  <p className="text-sm max-w-xs mx-auto" style={{ color: textSecondary }}>You're doing an amazing job collecting points!</p>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
};

export default RewardsPage;


