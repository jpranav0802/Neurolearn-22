import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

type Lesson = {
  id: string;
  title: string;
  grade: string;
  category: string;
  image: string;
  progress?: number; // undefined means not started (available). 0-100 means active. 100 means completed
};

const availableLessons: Lesson[] = [
  { id: 'math1', title: 'Math Adventures', grade: 'Grade 1', category: 'Math', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwd4zILM0Nmw_rvt64feWx49meGhi6nvBf4KSYJvPVYuSx4wd9mH2b55wLzBNGFbTBq_uEkG2hNhEqrnPSVmLdli4iGW2xlv4btfbppzOr3F1G9qvpFLZav6IuzZrp-YQCvy9FaYLE1wlVs10TpT806yxqzH5eGtQVsMTy-pVeafSMtlRzJMswTrPeRRHk-aNszEk2pMC3PU_tEXbGQGrqx9iz8wra0ONTdboWo7FAjUq_K3wZjyIHQi4ODtc2LMCw9oWiHGcHqJ4' },
  { id: 'reading2', title: 'Reading Explorers', grade: 'Grade 2', category: 'Reading', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6yFBkCvwBeU_EjBEqZ2pkq1dKkmhaUYudegJikUV6JwsWhiloQgADz7L32IskV-JcntZ8fNui9955WkOvkBge46Z04vP03stNphZkGWdaWOIJWfJWKHLTrZDNzMIIp96dzMRJUoMxxEvpZlRD-QEfKRr4VSfuZBCgbB395qQBSItKWm20SjtbVJIvAFqINgToSk5RVIovXtaKUDTwyHDR10Lle0PUTRgemGKffif5AxARhCj6XZu575TrRSVpcIJCWSJAlW7AXvM' },
  { id: 'science3', title: 'Science Discoveries', grade: 'Grade 3', category: 'Science', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB06CRWSd3CJ5i-no_g8CFRslVLhTGm9A36l7KUP5fMEfXSq-zH7sNPpOiHLkUU5p0MaG1Z3loLroCjfCWtsfIutExTNDH2pZT7Axlu-LTMvA2Y5j2KjoPh9OZGccryVryx8D7heFX02favpFk7bzbrK_JhmNvNmN2Lz2P_QA7bE4ne0i5zaFLHfMXqp1niiPPe6uonPMYjs7J57EGu3RByunQiwbI8lconWQ_zr8ex9Om4rc4d_uoW0YG5qKE_i_EBLJBzrP0bzc4' },
  { id: 'writing4', title: 'Creative Writing', grade: 'Grade 4', category: 'Writing', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApkIYgKzRg-683pzPgONjfiIqGCJpVKx7x5gJGfP6ZbMM3Ftg_MUha_rqTjlAkc5zZlkfy5DXHkVvFUnp9B8nmWeXEhgiqhmVxW0_LLQQrUDaCPD3Jf_3v1XdpLogK6fFqtMlJo6q9WICAZaGy-g3U6M5s3o0Zw82K-42VZH3lFXB2c2ouR3LCo0E4CJOp84K5lUqrOXy8RB7bcLaAZmkpCBKkRxySA29OgwrwGDVRAdiPMrQO41tgJiYmcmMHFfTuRGOmBXh2mGM' },
];

const activeLessons: Lesson[] = [
  { id: 'math1-active', title: 'Math Adventures', grade: 'Grade 1', category: 'Math', image: availableLessons[0].image, progress: 45 },
  { id: 'reading2-active', title: 'Reading Explorers', grade: 'Grade 2', category: 'Reading', image: availableLessons[1].image, progress: 70 },
  { id: 'science3-active', title: 'Science Discoveries', grade: 'Grade 3', category: 'Science', image: availableLessons[2].image, progress: 20 },
];

const completedLessons: Lesson[] = [
  { id: 'art1', title: 'Artistic Expressions', grade: 'Grade 1', category: 'Art', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDodapUXGqMJtG94Dj21RvIxtoGjhp4-UUR6cOy62Ze7Tm1dgHdvzOvPYtFbwfoX4jTi4B0qb0puoIVG8QDp0vM-fS-UWnG0lAvtmye4sZE7_BkKc0WfAxd8wT7T59T5LjtQkl3TYLH5smLLcSSPS0OI2pz7cWuQKDrP79l1AbZ-nUznWThKwkQGzua9E4U9hKa5blPu_2HHnXHJ6kM6zfuc_ezqtEacewsrq8YWPLJl1d8pdMK9PXJlfb2CMLuPd57P-6DDAFERJc', progress: 100 },
  { id: 'music2', title: 'Music Makers', grade: 'Grade 2', category: 'Music', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYjoZg5uqJ5GE-rYXe2FCDaRlFp5Lk2-4lS4qIjjTb88eZ6p3OtNl6i_qDP9IFfWB8zek3D8NVj1uctY-8z1sIhWzC8LPZl0LrMdN3Oa_Rxhl2X-7c1O36YofrDbQ4nn6vErYtep2nCBwAudMTxMrwO6_3jekQfxtfBfgkXYV8WibE0y7RvZPaxBcLSe-5FEUNhtxGq_Boqw-ABUiHbvhCjVeYZ4eOeoljL0XwkHbiFDB5sXEOSNHUSPyHKfkjni2CiUzZNnSV7UQ', progress: 100 },
];

const SectionTitle: React.FC<{ children: React.ReactNode; color: string }> = ({ children, color }) => (
  <h2 className="text-2xl font-bold tracking-tight mb-6" style={{ color }}>{children}</h2>
);

const LessonsPage: React.FC = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const textPrimary = isDark ? '#F5F7FA' : '#181411';
  const textSecondary = isDark ? '#C5CCD6' : '#6b7280';
  const cardBg = isDark ? '#141925' : '#FAFAFA';
  const pageBg = isDark ? '#0E1116' : '#F3F4F6';
  const primary = '#e68019';

  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-8 xl:px-20 2xl:px-40 py-8" style={{ background: pageBg, fontFamily: 'Lexend, Noto Sans, sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight" style={{ color: textPrimary }}>My Lessons</h1>
          <p className="mt-2" style={{ color: textSecondary }}>Let's continue your learning adventure!</p>
        </div>

        {/* All Available Lessons */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-2">
            <SectionTitle color={textPrimary}>All Available Lessons</SectionTitle>
            <button onClick={() => navigate('/lessons/all')} className="rounded-full px-4 py-2 text-sm font-semibold" style={{ background: '#e68019', color: 'white' }}>
              Explore All Lessons
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {availableLessons.map((l) => (
              <div key={l.id} className="flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300" style={{ background: cardBg }}>
                <div className="relative">
                  <div className="w-full bg-center bg-no-repeat aspect-video bg-cover" style={{ backgroundImage: `url(${l.image})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-4 text-white">
                    <h3 className="text-lg font-bold">{l.title}</h3>
                    <p className="text-sm">{l.grade} {l.category}</p>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <p className="text-xs mb-4" style={{ color: textSecondary }}>{
                    l.id.includes('math') ? 'A fun journey into the world of numbers!' : l.id.includes('reading') ? 'Discover new stories and characters.' : l.id.includes('science') ? 'Explore the wonders of the world around you.' : 'Unleash your imagination and write your own stories.'
                  }</p>
                  <button onClick={() => { const slug = l.title.toLowerCase().replace(/[^a-z0-9]+/g,'-'); window.location.href = `/lesson/${slug}`; }} className="w-full mt-auto font-bold py-2 px-4 rounded-full hover:opacity-90 transition-colors" style={{ background: primary, color: 'white' }}>Start Lesson</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Active Lessons */}
        <section className="mb-12">
          <SectionTitle color={textPrimary}>Active Lessons</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activeLessons.map((l) => (
              <div key={l.id} className="flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300" style={{ background: cardBg }}>
                <div className="relative">
                  <div className="w-full bg-center bg-no-repeat aspect-video bg-cover" style={{ backgroundImage: `url(${l.image})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-4 text-white">
                    <h3 className="text-lg font-bold">{l.title}</h3>
                    <p className="text-sm">{l.grade} {l.category}</p>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <div className="w-full rounded-full h-2.5 mb-3" style={{ background: '#e5e7eb' }}>
                    <div className="h-2.5 rounded-full" style={{ background: '#34d399', width: `${l.progress ?? 0}%` }} />
                  </div>
                  <p className="text-xs mb-4" style={{ color: textSecondary }}>{l.progress}% complete</p>
                  <button onClick={() => { const slug = l.title.toLowerCase().replace(/[^a-z0-9]+/g,'-'); window.location.href = `/lesson/${slug}`; }} className="w-full mt-auto font-bold py-2 px-4 rounded-full hover:opacity-90 transition-colors" style={{ background: primary, color: 'white' }}>Continue Lesson</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Completed Lessons */}
        <section>
          <SectionTitle color={textPrimary}>Completed Lessons</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {completedLessons.map((l) => (
              <div key={l.id} className="flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 opacity-70" style={{ background: cardBg }}>
                <div className="relative">
                  <div className="w-full bg-center bg-no-repeat aspect-video bg-cover" style={{ backgroundImage: `url(${l.image})` }} />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="material-icons text-white text-5xl">check_circle</span>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold" style={{ color: textPrimary }}>{l.title}</h3>
                  <p className="text-sm mb-4" style={{ color: textSecondary }}>{l.grade} {l.category}</p>
                  <button className="w-full mt-auto font-bold py-2 px-4 rounded-full cursor-not-allowed" style={{ background: '#E5E7EB', color: '#374151' }}>Completed</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default LessonsPage;


