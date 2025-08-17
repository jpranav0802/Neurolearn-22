import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

type Subject = 'Math' | 'Reading' | 'Science' | 'Writing' | 'Art' | 'Music' | 'Social';
type Card = { title: string; desc: string; image: string; subject: Subject };
type GradeSection = { grade: number; cards: Card[] };

const g1: GradeSection = {
  grade: 1,
  cards: [
    { title: 'Reading Fundamentals', desc: 'Learn to read simple words and sentences.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7H0fUJSTiGI5BzxXTmZwAZDx_BVKB1zfsQrotkfAugdCe4tMOLYpzPPXbVsFogCcPUOB5G2Y1xO5fc3xGdrIh-_7_qj42fOsMUaHcbmP8GScrna7dVF_75OU4GQSEkbSQsYveTD6-OTUfLJnCIu9JIcUsWnyER073mwD3yKmYObftkUhq6d6gk8U1OCu4sB8QPk4IJBxjBQyIGFjwk8DAig9N7A6ij7ujJlVgY30Fs-B0nKZS4vVwdFDlllITDPpAojrGDyqKfN8', subject: 'Reading' },
    { title: 'Math Basics', desc: 'Introduction to numbers and basic operations.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvyGWdTNLs0sRla12kD-MIMmZ2s_304Tuk5WGrVVpbKiJcoB_KZRcLb-B7dtdXmhWdE0-G9IlZ6VN26ZDeH8X_t0g-Vw4QMfevo9zWB5VJ4KynZPyB0CrPmOnjI8V_ormSHY8G5AxNfKS1yakjREh7BJhG_8kQY_2Hlw11hTBfZzdEbo1gnmBmbjfrIyHpv_VpItzdECBXTKiCmmx9L8D2joUuGUJsR2nQSWQ9DpnjbOvXtuJGH9ydVJEXiM_Zcbi_7bMx3fk2xcs', subject: 'Math' },
    { title: 'Science Explorers', desc: 'Discover the world around us through fun experiments.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQWsyfyb3T6iYrK5PqXlrDpQA3xzC3yo7Y854_6OObw0gOFHJY5Ob6Tsf1P566luHWch5hU3GbsGZWXbv6na40XMS2rcLIcsuTh1FUDhnbdmpWvDCwtxvY0kOm7J4yqdn4iwvfMBRZqzG_zNARyH0WO43zmE_lzuV3AqEnbZUxLU95bxP81ARc3LvhUQzNTj87rmEjaneGwB4ufZyVhBBtH2LLxpN3SM4HTEh3ifcHrY8sn31gY5JaXodYRPuWQIRrs8HEy6DxG9M', subject: 'Science' },
    { title: 'Social Skills', desc: 'Develop essential social interaction skills.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3PMcWTr0FW2pnGdJ6mUy_MxDwO2v36A4xLsAQawu9Um9KfhasYdmBdxhClzV9Y694ZOIqNWLQBCMsbwsTi-XEzz2azoQQwcgZQXC8yJvMlrgKIqgWCt4r50grRmYOsP9389uI9sndyvbut8aLPreWzw0Mp5FYcIC_hm9z988ZrItf_BOTiBAgM7lcma5HHAMhYDfoUPqE1-q-REPkF2faon5x2rrVngXwYl2TbVJnxYLr2pN6EMNoE2qRF_7c05xvJuDwgS0rbX4', subject: 'Social' }
  ]
};

const g2: GradeSection = {
  grade: 2,
  cards: [
    { title: 'Advanced Reading', desc: 'Improve reading comprehension and fluency.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaml2nlgdj5QRFyJ2JPpqp2lWo3KCG9ut7YD_oz5B0xNIpKB_xiF2AYupnNIqowBKOofHbZsWUrJGHE2adU6vz8xftxZju_pY1ygvGfTdTP_9jP1JxZ2U6t5d8pBHSuBzc6mQp3aAI1v-cfCouXKmzyRt8hPj-DO089z7Mr4uKgu1rjYJn3g1x3IAoa_ZguTQSoMsu9l7Xtktr3mT5b0a4afJEABKot0imKFVClROvpub0NHOczOG3BNQixwCJU9Io4Bu4nYBifnQ', subject: 'Reading' },
    { title: 'Math Challenges', desc: 'Solve more complex math problems.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzXDtYRqEq0V1tPIszNp2YcLSLaBeXjt2sFzyQjjzlxz__9ydS0EWH8EIFOqc2xBhTV-P4QdJNil3xSDezOUhv_3N7_iX9eTYW0N1gRFaY_ikaRmpypxGUc6TLnMKqZrnEew9h2doeEPW5RPCG-JRfYwWzrprQRMGe0hlVfLj4LFE-sWyB3acAJMr78E7uFNC4hfHSJuS3G0vFvxzyedbJlmUFbp_p5BxAA68nfSG88tTk5OCf9xuX8HmyRFf-lZPDlRAFuf7_arw', subject: 'Math' },
    { title: 'Earth Science', desc: "Explore the Earth's ecosystems and environments.", image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9Vg4m3BUDb4wonXoRsWBPyDPZKkGU54JlMC0MwChrDWeHeV7S5J29Lmu-IAZg-kQ46S0J0P6gy3ed1ahxEGqzsl-pwg7MNm8ZY_MmyFIEhd8cKccTU9wAsLadgNmXvZYNG8rPJkyw6OnAEVn9g6E6y1PQoHfvQicsdae6Fwe7qkTmNpsrLdK9TW8Io5CEhEJsiRxjWwN7ZExCbTqjR-qtVjuIJp9MgIbFM7g2AA34ro5iFsYbA1a4BWZQLsfC7XgHF-APk4EUw1Y', subject: 'Science' },
    { title: 'Emotional Intelligence', desc: 'Understand and manage emotions effectively.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmOBAnRBHZINQ34JobTwFlYCEAh12eJUM5JpQEbMKA3TC2TGdn2zM2nxhYvFb4wBxwx7DmfFoq9uhdg2g4t5jKnHZSylK-89IXcFlk0DsmgFPNzi4PCZml7XvPNwiTayip7SeGdfGYazQ2PLFJb1X1nJEAITWj4ii2fMg_ENi2K0ybnJuuMrOsl0YBWOAfbp9Q7q1fYPqVnQ34CZUqm-BJGwzAnoQGk7GDTnGujksCvMdGgahbSBeHmT3fzV-d6VvcWcosVNheULI', subject: 'Social' }
  ]
};

const g3: GradeSection = {
  grade: 3,
  cards: [
    { title: 'Reading Comprehension', desc: 'Analyze and interpret different types of texts.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCenps_8hfGF6SNQ-0bgT_aJKGuoMMlrPAJbzq6ns1MorLw95RAQu_QhQA2s0espvWglPsEEpn5C_-lzasmRdnI_PfvenyxUrNbnMJxNgHMs9_HBELCcxA3u10k5SceLAvJTcBh1rnuk8i-iELISwFysGqGt9uQ81pbtan4LjLu7RCmo1EjHJGNzaF0KMITKzi9u2KCt0Gnp-hAQNniouUcXcgJSQiybGEiBUtYK5qqCUZfEv4cwdi1wH4tcJb_KYrenIM4jFKVnk4', subject: 'Reading' },
    { title: 'Geometry', desc: 'Learn about shapes, angles, and spatial reasoning.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQxt8hO1igSDeTE4q4wJQaFmZVzRpmeIJSDeZGcoYwhaje6LqUTcT97TNRT_7v4p9sEaOxISXFrxWSnP4SHs6RHjeCXEkXAS2DEP1sPoIkxxAR_f1pW3KlNBS0D2gXaYqZvzBScwxDBbga-8HBHduO99AL1aw4C_Z75WLO_qTXVJWp5MKlwLnpyDfW_ts7GxNdaU_SwwCdookz0O-OCZabI9Rs022UW_zwPSpEWLtCqZu0jPxXkbDI7_jFuKAfQOXkQv1G49a7QUY', subject: 'Math' },
    { title: 'Life Science', desc: 'Study living organisms and their life cycles.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmLUCYgDOqPXe5C0sLGHI-bab6_isqwdSAsBZ4rspeSY8HeJZ6comZ4iTTP1GnxUUuzMG61OHXtpXIKrl-3GL3R1wska4C8HaS7F67wqLDGL3aATE5O9BZWsUBYDHHHzd3V0K8braNtn0P40Pr92A7nFCaXGS5gcfS65_KkGsloeDpbyt33Ai9Gx6GjW2sHGR5noMYBYF8pObWAiCLKuRmSmEMi-F-g5ajz69Wp9P7TmKFEGQzPOKcbiIqU7JxSUi7c5Nk80IWoA0', subject: 'Science' },
    { title: 'Communication Skills', desc: 'Enhance verbal and non-verbal communication abilities.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRlk-HuGf0zuaGy_cvvKp3Bg8jBdUuTg2K1y921gC7PamxVcaoZrkmw_ukFKw3W_8Q71mYoJFCGCcpjT2h6-YuwA8KRV4F-MKf2FdAZxSVE1vo5aAF25D7YuU7uNbutK5C2yE1L88NhzyHIbTiD3ywEMMD-4h1XccP01cnFzvBtTvJ3qAvk7gcPVzsPfnC2sTRD5cu0T-QQ-r0aR42We3fELkfvF5mSWH9yCeb1FLLH5Wu_RDGdY6sXVVXeG4SYKapdlWEofShi9I', subject: 'Social' }
  ]
};

const g4: GradeSection = {
  grade: 4,
  cards: [
    { title: 'Critical Reading', desc: 'Evaluate arguments and identify biases in texts.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB044jgsogSRhh0jOXk2QcQGJyk5LA8aNwIg7BXlKwtkNz7WPaViz4uKTpym9VNOCT4sFo7SWdl3nJQZnSDjtEeCZCarryPbK1giagdKNps8En982x4GNDG3sBc8wk3FwIhmYOVWF52cktQY6i91Wg8V8aFXqPuFNbQ2M5VhqStQpQeSx7oU-TbKBcKwc_Xp-x6dkPypWcTzkV38Cum21bYJRibkjergIVRuE1RxIkOsqA1PpGEbgDdVp_WaNNjliUfdVskzNbDiw4', subject: 'Reading' },
    { title: 'Algebra Basics', desc: 'Introduction to algebraic expressions and equations.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlIneGD6KLDpfGpxjhxkoD1VQG2ALWEmK-Uq2Bk4DblookEP6cZiACK2cwmGgGhazZT6pKn00hKWPiWWggOgldFHZSZHwfvM4zQW_UlLcDAoSKa8_Zz_bD8qgh2KvMyf45gq4ibaQR7G89gFrtaWISXygVu1S7AoXOjXwbWrT5weR5_5WR7JjQRg8LeTvPMDZTzTEe8u6Pz8UmDnjCZ97DFpF41mExg2KIYOl3lgqbCZlUsRdLhcxao1WfySA-fieARgZcg9OvvAs', subject: 'Math' },
    { title: 'Physical Science', desc: 'Explore the principles of motion and energy.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9EK1hPMigLw2bS_19hiwrVRcUdH2PJAHteAGvNjbs0H9VtswQr0P2OLy5L4OBLJY3izdlR8OE2A-Jt-R--XWLgv_fV75SWN1owCYHKdHiIfbnYMbwYPjkKPKGfpT_NZvCnCuL19gPqyKZRkrtYfmAXt0ButsXvmUZHGCslIYFijCEblKOJpJI0zI-caIYoi80Bcn0MBUw2Y4unCITu1A7-0XwKgY86yYkiNP_LoR03BK3NSqmpmgpEJ9iSN0nsWfPFG5JcGWXxmg', subject: 'Science' },
    { title: 'Problem Solving', desc: 'Develop strategies for solving complex problems.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWUnpz6Ch0Uis6WJDdKkSqBSUxFFp0Ce1aL2SZujG2ZLsbBevttNSf5c1DzH_vdPOr5MulSVVxmVc04N8wyGDXJgF9of-Wih4keUVWiPbLH9CNh67TywMfNtY5GK0-EpN8zDHNYE9jTMy49n3cNvv7_wnBpaP62JvkMPKVocsPYmUsxY6faxVXJJs56pNH43pIBfZwkzqONeU_cyo8M9dKkIKzZ_8CKTOqt0X7VZ-7TY_k73BE5Z1M9ZYZvdtHdIJLxO1DY0pSf0U', subject: 'Writing' }
  ]
};

const g5: GradeSection = {
  grade: 5,
  cards: [
    { title: 'Advanced Reading Analysis', desc: 'Analyze complex texts and literary devices.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAxab59PeWmuspXTPrsAcYn8gOuIs9lhhz1ecZEOVDrJ0f2ya6eoqUYmk9HOOrFndTFBzd1EpSM8_EbolP4W8PttliAgBHKngczzwvuGvTt5AGN4TBxFJahfY4zMCEly7fuXscbI6vkbR1KBq4zHfrhoZREIOE3KeyBof6aRcxn1l2AkrMSsOvx8Cmhwr1xZeWh32iM1uBOHAL8tb8e64H2CHCAmPPhfk7tdpBqe_-7kdIkgFJ9EYkW89nZSY6rxznWC7FAW-TipQ', subject: 'Reading' },
    { title: 'Advanced Algebra', desc: 'Master algebraic concepts and problem-solving.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATdw7U0-iHOD3XIwlcKlmkuvaHNEH-C2k_4qSn0yxWXv8Jg3LhtQdtnf45I2o29sCL9z3fstdIlgwxuhdlo9-RzNJluBjg3Uizlq0dp3ONdNn4kkKpdvYnJxMxrQ7zU5nMybQ7wwkKEOnvrAx1STo0npRT_YGTAn28j7INmQ3yiwUVrcg29920m_hky0WhPg-s6nyH9IOH_zE29v4MOvhyIHzw91MxHaDEJUTr9tlLrhAop7cVOAQCX0djnlalSQXZkAbqrKMsXGg', subject: 'Math' },
    { title: 'Advanced Science', desc: 'Explore advanced scientific topics and research methods.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0bZMz9xL9GN5urq47f4soLM1lI5dLQawj-z2oQ9HiCg-R5jSMU1GQQVGQLIZcmGHNwnQXmEheGVpokvbFi9KQ299dtcXjQXpKdxdPzHdP7qtahd-cXyWUJQq3y9ootBZ9stubsF46WVKIHzGlBUuJBCA-d9l82gOaVd1cvzBWPikMj1JphS6z3QO2VeIEVbYIVD_7RwLyZm5XUeu2knKU6oOh4oEjBr9z2FS1E0xzRJmiDPWZCAbsDm01h3lyx3eiAQ9J8UHWhAA', subject: 'Science' },
    { title: 'Leadership Skills', desc: 'Develop leadership qualities and teamwork skills.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgGpJTFxYYlFyFccKEn8sai6tuzWRbVZsI02EAuUpNhwnUH0BF9hG3fNsTH3qvv-sJjGDusT1EJIOii32va7t0JuxsJmtGmOPheAy_JQlSEyTzL4b7IO_ZSqUjn2TMTcpXNCFWioXWJWImM14wJwdty4KhnPrzrHW7BYmYvpEOa9M95LHheKcmlX96bhP-xg93-FS2Rzni6oEqdqBsHSHaGHUwmnCveFRMFQe4ph3WV7Om1nriM1zdBVZRn4rriGdCswrloTW_ESg', subject: 'Social' }
  ]
};

const AllLessonsPage: React.FC = () => {
  const { isDark } = useTheme();
  const pageBg = isDark ? '#0E1116' : '#FFFFFF';
  const textPrimary = isDark ? '#F5F7FA' : '#1f2937';
  const textSecondary = isDark ? '#C5CCD6' : '#6b7280';
  const chipBg = isDark ? '#1f2937' : '#f5f5f4';
  const primary = '#e68019';

  const sections = [g1, g2, g3, g4, g5];

  const [gradeFilter, setGradeFilter] = React.useState<number | 'All'>('All');
  const [subjectFilter, setSubjectFilter] = React.useState<Subject | 'All'>('All');
  const [sortOpen, setSortOpen] = React.useState(false);
  const [gradeOpen, setGradeOpen] = React.useState(false);
  const [subjectOpen, setSubjectOpen] = React.useState(false);
  const [sortBy, setSortBy] = React.useState<'A-Z' | 'Z-A'>('A-Z');

  const applySort = (cards: Card[]) => {
    const sorted = [...cards].sort((a, b) => a.title.localeCompare(b.title));
    return sortBy === 'A-Z' ? sorted : sorted.reverse();
  };

  return (
    <main className="flex-1 py-8 px-6 lg:px-24" style={{ background: pageBg, fontFamily: 'Lexend, Noto Sans, sans-serif' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="tracking-tight text-5xl font-bold" style={{ color: textPrimary }}>All Lessons</h1>
          <p className="text-lg" style={{ color: textSecondary }}>
            Explore our comprehensive curriculum designed for Grades 1-5, covering a wide range of subjects to support your child's learning journey.
          </p>
        </div>

        <div className="flex gap-4 p-3 flex-wrap pr-4 mb-6">
          <div className="relative">
            <button onClick={() => setGradeOpen((v) => !v)} className="flex h-10 items-center gap-x-2 rounded-full pl-4 pr-3" style={{ background: chipBg }}>
              <p className="text-base font-medium" style={{ color: textPrimary }}>Grade{gradeFilter !== 'All' ? `: ${gradeFilter}` : ''}</p>
              <span className="text-stone-500">▼</span>
            </button>
            {gradeOpen && (
              <div className="absolute z-50 mt-2 w-40 rounded-lg shadow-lg p-2" style={{ background: chipBg }}>
                <button className="block w-full text-left px-3 py-1 rounded hover:opacity-80" onClick={() => { setGradeFilter('All'); setGradeOpen(false); }} style={{ color: textPrimary }}>All</button>
                {[1, 2, 3, 4, 5].map((g) => (
                  <button key={g} className="block w-full text-left px-3 py-1 rounded hover:opacity-80" onClick={() => { setGradeFilter(g); setGradeOpen(false); }} style={{ color: textPrimary }}>Grade {g}</button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button onClick={() => setSubjectOpen((v) => !v)} className="flex h-10 items-center gap-x-2 rounded-full pl-4 pr-3" style={{ background: chipBg }}>
              <p className="text-base font-medium" style={{ color: textPrimary }}>Subject{subjectFilter !== 'All' ? `: ${subjectFilter}` : ''}</p>
              <span className="text-stone-500">▼</span>
            </button>
            {subjectOpen && (
              <div className="absolute z-50 mt-2 w-40 rounded-lg shadow-lg p-2" style={{ background: chipBg }}>
                <button className="block w-full text-left px-3 py-1 rounded hover:opacity-80" onClick={() => { setSubjectFilter('All'); setSubjectOpen(false); }} style={{ color: textPrimary }}>All</button>
                {(['Reading', 'Math', 'Science', 'Writing', 'Art', 'Music', 'Social'] as Subject[]).map((s) => (
                  <button key={s} className="block w-full text-left px-3 py-1 rounded hover:opacity-80" onClick={() => { setSubjectFilter(s); setSubjectOpen(false); }} style={{ color: textPrimary }}>{s}</button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button onClick={() => setSortOpen((v) => !v)} className="flex h-10 items-center gap-x-2 rounded-full pl-4 pr-3" style={{ background: chipBg }}>
              <p className="text-base font-medium" style={{ color: textPrimary }}>Sort: {sortBy}</p>
              <span className="text-stone-500">▼</span>
            </button>
            {sortOpen && (
              <div className="absolute z-50 mt-2 w-32 rounded-lg shadow-lg p-2" style={{ background: chipBg }}>
                {(['A-Z', 'Z-A'] as const).map((opt) => (
                  <button key={opt} className="block w-full text-left px-3 py-1 rounded hover:opacity-80" onClick={() => { setSortBy(opt); setSortOpen(false); }} style={{ color: textPrimary }}>{opt}</button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {sections.filter((sec) => gradeFilter === 'All' || sec.grade === gradeFilter).map((sec) => (
            <div key={sec.grade} className="flex flex-col gap-6">
              <h2 className="text-3xl font-bold leading-tight px-4" style={{ color: textPrimary }}>Grade {sec.grade}</h2>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 p-4">
                {applySort(sec.cards.filter((c) => subjectFilter === 'All' || c.subject === subjectFilter)).map((c) => (
                  <div key={c.title} className="flex flex-col gap-4 group">
                    <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-2xl overflow-hidden" style={{ backgroundImage: `url(${c.image})` }} />
                    <div className="flex flex-col flex-grow">
                      <p className="text-lg font-bold leading-normal" style={{ color: textPrimary }}>{c.title}</p>
                      <p className="text-base leading-normal" style={{ color: textSecondary }}>{c.desc}</p>
                      <button onClick={() => window.location.href = `/lesson/${c.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="mt-3 rounded-full px-4 py-2 text-sm font-semibold self-start" style={{ background: primary, color: 'white' }}>Start Lesson</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default AllLessonsPage;


