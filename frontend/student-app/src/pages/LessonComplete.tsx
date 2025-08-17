import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const LessonComplete: React.FC = () => {
  const navigate = useNavigate();
  const { lessonId } = useParams<{ lessonId: string }>();
  const { isDark } = useTheme();

  const primary = '#e68019';
  const cardBg = isDark ? '#141925' : '#ffffff';
  const border = isDark ? '#1f2937' : '#e5e7eb';
  const textPrimary = isDark ? '#F5F7FA' : '#111827';
  const textSecondary = isDark ? '#C5CCD6' : '#6b7280';

  return (
    <main className="bg-gray-50 min-h-screen px-6 md:px-10 lg:px-40 py-10" style={{ fontFamily: 'Lexend, Noto Sans, sans-serif' }}>
      <div className="max-w-[960px] mx-auto">
        <div className="rounded-2xl shadow-sm p-8 space-y-8" style={{ background: cardBg, border: `1px solid ${border}` }}>
          {/* Title */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold" style={{ color: textPrimary }}>Amazing! Lesson Complete!</h1>
            <p className="text-lg" style={{ color: textSecondary }}>
              You did a fantastic job on "{lessonId?.replace(/-/g, ' ')}". Keep up the great work!
            </p>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex gap-6 justify-between items-center">
              <p className="text-base font-medium" style={{ color: textPrimary }}>Lesson Progress</p>
              <p className="text-sm font-bold" style={{ color: primary }}>100%</p>
            </div>
            <div className="rounded-full h-3" style={{ background: '#e5e7eb' }}>
              <div className="h-3 rounded-full" style={{ width: '100%', background: primary }} />
            </div>
          </div>

          {/* Review cards */}
          <div className="border-t" style={{ borderColor: border }} />
          <h2 className="text-2xl font-bold" style={{ color: textPrimary }}>Let's Review What You've Learned</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Identifying Emotions',
                desc: 'We looked at happy, sad, angry, scared, and surprised faces.',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7675m2bw9bqsUnpfJFawApqpNmuF5iYUY3FkfWAsvGYQDQxmhy-M_-29XbmkjMLb-r753Uwb4VZ02ZJJIRkp4oRbYQFznC-Yk2X5mPBroC0vcm8j-Ketk3tptgeu53gWxTVAaDLcE0mDzhzmwzD6qn_wihwH0ErywFe04N3KUlPEfN_Z3BLLIsTE7bgpC6tbG4KMelT2Q4OKz6GI1WKQ6fQsD9QKauvfEnE13hvfpASNRr0O2SXJD-1fhTgPmtOehLuuPGen1Ckw',
              },
              {
                title: 'Understanding Causes',
                desc: 'Remember why we feel certain ways? Like feeling happy when we play.',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWZEl-A8LI3qu8KToV1TrR88KJF7Uk5CgrGk4CxCtK4BG31QHO-D3feFmk_J04WJNLtAvRF8a-o1YOGiGup6eZDdanJLUs3C605KVJccyhkhoEv2gkPq6xKhbFImxI8EVhN76zBgPnAOknWEL1HuUP2WhlIfDjDf_n9lY5VwcJCkM5sSUwuCTAbtO8D0iRu7lKTy_lNq0ZLRJvYNM_5qzU5_aGeFVONSkjuB-Lft4WdahrzNHC1dXn6l0PUO66ZphMjyzh2cNvMWI',
              },
              {
                title: 'Responding Right',
                desc: 'We learned healthy ways to show our feelings, like talking about them.',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWhiShQ3YDDH26jVa3-e-7IBqs1gijW7UGHoV9DK1VuVCviMz1zo98YpNqmpkkvw0X20ZwWjW485gfJFTIlY-zHtfrFV6LYfgI4SxLkmYnh5STaVyMK1gY0wdQt9Sj-DlsrGm6X2hgT5GCtonJH1sltYmXjs3ptIBjg-yaQqEr-_hmN4QoCuPDQlcz2IfDFSAU2vJBeNuPx4yxlyhEovEjfhs6bX7dXZ6fQttFk71vbbI822LX4yOiqx3Z8-p58R83uQOWEX8w9O8',
              },
            ].map((c) => (
              <div key={c.title} className="flex flex-col gap-4 rounded-xl border p-6 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all duration-300" style={{ borderColor: border }}>
                <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg" style={{ backgroundImage: `url(${c.img})` }} />
                <div className="flex flex-col gap-1">
                  <p className="text-base font-bold" style={{ color: textPrimary }}>{c.title}</p>
                  <p className="text-sm" style={{ color: textSecondary }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA to test */}
          <div className="border-t mt-4" style={{ borderColor: border }} />
          <div className="text-center pt-6">
            <h2 className="text-2xl font-bold mb-1" style={{ color: textPrimary }}>Ready for a Quick Quiz?</h2>
            <p className="text-base mb-6" style={{ color: textSecondary }}>Let's see what you remember!</p>
            <button onClick={() => navigate(`/lesson/${lessonId}/test`)} className="rounded-full h-12 px-8 text-white font-bold mx-auto block" style={{ background: primary }}>Start Quiz</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LessonComplete;


