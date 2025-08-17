import React from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

type LessonDetail = {
  id: string; // slug
  title: string;
  subtitle?: string;
  description: string;
  estimatedTime: string;
  objectives: string[];
};

const makeSlug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const lessonsCatalog: LessonDetail[] = [
  // Dashboard Explore Lessons + My Lessons common titles
  {
    id: 'fun-with-math',
    title: 'Fun with Math',
    subtitle: 'Count, add and subtract with games',
    description:
      'Learners explore numbers through playful, low-stress activities. We practice counting, comparing, and simple addition/subtraction with visual blocks and number lines.',
    estimatedTime: '25–35 minutes',
    objectives: [
      'Count and compare groups up to 20',
      'Add and subtract within 10 using visuals',
      'Explain thinking with pictures and words',
    ],
  },
  {
    id: 'reading-adventures',
    title: 'Reading Adventures',
    subtitle: 'Explore exciting stories and new words',
    description:
      'We dive into short, engaging passages to build fluency and vocabulary. Visual supports and audio help learners decode and understand what they read.',
    estimatedTime: '30–40 minutes',
    objectives: [
      'Blend sounds to read new words',
      'Identify characters and setting',
      'Answer “who/what/where” questions',
    ],
  },
  {
    id: 'social-stories',
    title: 'Social Stories',
    subtitle: 'Learn about making friends and sharing',
    description:
      'Through social stories and role-play, students practice greetings, turn-taking, and asking for help. Visual cues and scripts support success in real-life situations.',
    estimatedTime: '20–30 minutes',
    objectives: [
      'Practice a friendly greeting and introduction',
      'Use turn‑taking language during play',
      'Ask for help with a clear sentence starter',
    ],
  },
  {
    id: 'science-discoveries',
    title: 'Science Discoveries',
    subtitle: 'Explore the world with simple investigations',
    description:
      'Students investigate how things work using safe, hands‑on explorations. We observe, make predictions, and record results with icons and short phrases.',
    estimatedTime: '30–45 minutes',
    objectives: [
      'Make a prediction before testing',
      'Record observations using pictures/words',
      'Share one conclusion from the activity',
    ],
  },
  {
    id: 'creative-writing',
    title: 'Creative Writing',
    subtitle: 'Unlock imagination with guided prompts',
    description:
      'A calm, supported writing time where learners plan and write a short piece. Graphic organizers and sentence starters reduce pressure and boost expression.',
    estimatedTime: '30–40 minutes',
    objectives: [
      'Brainstorm ideas with a picture organizer',
      'Write 3–5 connected sentences',
      'Use capitals and end punctuation',
    ],
  },
  {
    id: 'math-adventures',
    title: 'Math Adventures',
    subtitle: 'A fun journey into the world of numbers',
    description:
      'This lesson builds number fluency through games and manipulatives. Students count, compose and decompose numbers, and solve simple word problems.',
    estimatedTime: '30–40 minutes',
    objectives: [
      'Count forward/backward within 50',
      'Make 10 in different ways with counters',
      'Solve and explain a one‑step word problem',
    ],
  },
  {
    id: 'math-basics-grade-1',
    title: 'Lesson 1: Math Basics',
    subtitle: 'Introduction to numbers and operations',
    description:
      'In this lesson, students build number sense with counting, comparing, and simple addition/subtraction using concrete examples and visual models. Activities are hands-on and paced to reduce cognitive load.',
    estimatedTime: '25–35 minutes',
    objectives: [
      'Count objects up to 20 with one-to-one correspondence',
      'Recognize more/less and equal quantities',
      'Solve and explain simple +/− within 10 using visuals',
      'Build confidence with low-stress practice games',
    ],
  },
  {
    id: 'reading-fundamentals-grade-1',
    title: 'Lesson 1: Reading Fundamentals',
    subtitle: 'Sight words and sentence building',
    description:
      'Learners practice reading common sight words and blending letter sounds to form short words. Multi-sensory activities support decoding and sentence building with pictures and audio prompts.',
    estimatedTime: '30–40 minutes',
    objectives: [
      'Recognize 10 new sight words in context',
      'Blend CVC words with supportive visuals',
      'Build 2–3 word sentences that match a picture',
      'Read aloud with supportive audio as needed',
    ],
  },
  {
    id: 'reading-explorers-grade-2',
    title: 'Lesson 1: Reading Explorers',
    subtitle: 'Explore stories and new words',
    description:
      'Children journey through short stories, exploring characters and settings while learning new vocabulary. Guided prompts encourage predicting, sequencing and retelling with visuals.',
    estimatedTime: '30–40 minutes',
    objectives: [
      'Learn and use 8–10 new vocabulary words',
      'Sequence three key events from a story',
      'Answer who/what/where questions with supports',
      'Retell the story using pictures and sentence frames',
    ],
  },
  // All Lessons catalog — Grade 1
  {
    id: 'reading-fundamentals',
    title: 'Reading Fundamentals',
    subtitle: 'Learn to read simple words and sentences',
    description:
      'We build early reading foundations: letter‑sound connections, sight words, and short sentences with picture supports and audio.',
    estimatedTime: '25–35 minutes',
    objectives: [
      'Recognize common sight words',
      'Blend CVC words with support',
      'Read and match a sentence to a picture',
    ],
  },
  {
    id: 'math-basics',
    title: 'Math Basics',
    subtitle: 'Introduction to numbers and basic operations',
    description:
      'Hands‑on practice with counting, comparing, and simple addition/subtraction using cubes and number lines for clear visuals.',
    estimatedTime: '25–35 minutes',
    objectives: [
      'Count objects up to 20 accurately',
      'Compare quantities: greater/less/equal',
      'Add/subtract within 10 using models',
    ],
  },
  {
    id: 'science-explorers',
    title: 'Science Explorers',
    subtitle: 'Discover the world through fun experiments',
    description:
      'Explore simple cause‑and‑effect experiments. Learners observe, talk about changes, and record findings with friendly icons.',
    estimatedTime: '30–40 minutes',
    objectives: [
      'Follow a step‑by‑step investigation',
      'Describe observations with words or pictures',
      'State one thing learned from the experiment',
    ],
  },
  {
    id: 'social-skills',
    title: 'Social Skills',
    subtitle: 'Develop essential social interaction skills',
    description:
      'Practice polite words, sharing, and recognizing others’ feelings using visuals and short role‑plays for predictable, safe rehearsal.',
    estimatedTime: '20–30 minutes',
    objectives: [
      'Use “please/thank you” in a scenario',
      'Take turns during a partner game',
      'Identify how someone might feel in a picture',
    ],
  },
  // Grade 2
  {
    id: 'advanced-reading',
    title: 'Advanced Reading',
    subtitle: 'Improve comprehension and fluency',
    description:
      'Learners read short passages, discuss main idea and details, and build fluency with echo and choral reading supports.',
    estimatedTime: '30–40 minutes',
    objectives: [
      'Identify main idea and two details',
      'Read a paragraph with appropriate pace',
      'Use context to figure out word meaning',
    ],
  },
  {
    id: 'math-challenges',
    title: 'Math Challenges',
    subtitle: 'Solve more complex math problems',
    description:
      'Students extend addition/subtraction to 100 with place‑value tools and word problems that encourage strategy talk.',
    estimatedTime: '30–40 minutes',
    objectives: [
      'Use tens/ones blocks to model 2‑digit numbers',
      'Add/subtract within 100 using place value',
      'Explain solution steps for a word problem',
    ],
  },
  {
    id: 'earth-science',
    title: 'Earth Science',
    subtitle: "Explore the Earth's ecosystems and environments",
    description:
      'Observe land, water, and weather patterns. Learners create a simple model to show how environments can change.',
    estimatedTime: '30–45 minutes',
    objectives: [
      'Name three features of Earth we can observe',
      'Record local weather for today',
      'Build a simple environment model',
    ],
  },
  {
    id: 'emotional-intelligence',
    title: 'Emotional Intelligence',
    subtitle: 'Understand and manage emotions effectively',
    description:
      'Students learn to recognize triggers, use calming choices, and practice I‑messages to communicate needs respectfully.',
    estimatedTime: '25–35 minutes',
    objectives: [
      'Identify a personal calm‑down strategy',
      'Use “I feel… when… I need…” sentence',
      'Role‑play solving a small conflict',
    ],
  },
  // Grade 3
  {
    id: 'reading-comprehension',
    title: 'Reading Comprehension',
    subtitle: 'Analyze and interpret different texts',
    description:
      'Work with nonfiction and stories to find key ideas, make inferences, and cite evidence using sentence frames.',
    estimatedTime: '35–45 minutes',
    objectives: [
      'Cite a sentence that supports an answer',
      'Infer a character feeling from clues',
      'Summarize a text in 2–3 sentences',
    ],
  },
  {
    id: 'geometry',
    title: 'Geometry',
    subtitle: 'Shapes, angles, and spatial reasoning',
    description:
      'Classify shapes, measure angles, and use coordinate grids. Visual manipulatives make abstract ideas concrete.',
    estimatedTime: '30–40 minutes',
    objectives: [
      'Classify triangles and quadrilaterals',
      'Measure angles with a protractor',
      'Plot points on a grid to make a shape',
    ],
  },
  {
    id: 'life-science',
    title: 'Life Science',
    subtitle: 'Living things and life cycles',
    description:
      'Investigate plant and animal needs and compare life cycles. Learners create a simple diagram to show stages.',
    estimatedTime: '30–40 minutes',
    objectives: [
      'Name basic needs of plants and animals',
      'Order life‑cycle stages for one organism',
      'Describe how young and adult differ',
    ],
  },
  {
    id: 'communication-skills',
    title: 'Communication Skills',
    subtitle: 'Enhance verbal and non‑verbal abilities',
    description:
      'Practice speaking clearly, listening, and using supportive body language in paired activities and small groups.',
    estimatedTime: '20–30 minutes',
    objectives: [
      'Use active listening (eyes, body, voice)',
      'Ask/answer questions in a short dialogue',
      'Give a one‑minute talk with notes',
    ],
  },
  // Grade 4
  {
    id: 'critical-reading',
    title: 'Critical Reading',
    subtitle: 'Evaluate arguments and identify bias',
    description:
      'Analyze claims and supporting evidence in age‑appropriate texts. Learners practice explaining whether evidence is strong or weak.',
    estimatedTime: '35–45 minutes',
    objectives: [
      'Identify a claim and three supporting facts',
      'Detect opinion vs. fact sentences',
      'Explain why evidence supports a claim',
    ],
  },
  {
    id: 'algebra-basics',
    title: 'Algebra Basics',
    subtitle: 'Expressions and equations for beginners',
    description:
      'Translate patterns and word statements into expressions and one‑step equations. Use balance models to solve.',
    estimatedTime: '30–40 minutes',
    objectives: [
      'Write an expression from a word rule',
      'Solve a one‑step equation with a model',
      'Explain the meaning of a variable',
    ],
  },
  {
    id: 'physical-science',
    title: 'Physical Science',
    subtitle: 'Motion, energy, and simple machines',
    description:
      'Experiment with pushes, pulls, and ramps to observe motion and energy transfer. Graph simple results together.',
    estimatedTime: '35–45 minutes',
    objectives: [
      'Describe how a ramp changes motion',
      'Identify a lever, pulley, or wheel/axle',
      'Explain energy transfer in a simple system',
    ],
  },
  {
    id: 'problem-solving',
    title: 'Problem Solving',
    subtitle: 'Strategies for multi‑step problems',
    description:
      'Apply bar models, tables, and diagrams to plan and solve multi‑step problems while explaining reasoning.',
    estimatedTime: '30–40 minutes',
    objectives: [
      'Choose a representation (bar/diagram/table)',
      'Solve and check a two‑step word problem',
      'Communicate strategy in clear steps',
    ],
  },
  // Grade 5
  {
    id: 'advanced-reading-analysis',
    title: 'Advanced Reading Analysis',
    subtitle: 'Analyze complex texts and devices',
    description:
      'Explore figurative language, tone, and theme. Learners collect evidence and craft brief analytical responses.',
    estimatedTime: '40–50 minutes',
    objectives: [
      'Identify metaphor/simile and explain effect',
      'Determine theme with two evidence pieces',
      'Write a short paragraph citing evidence',
    ],
  },
  {
    id: 'advanced-algebra',
    title: 'Advanced Algebra',
    subtitle: 'Multi‑step operations and patterns',
    description:
      'Work with multi‑digit operations, exponents as repeated multiplication, and pattern rules to generate sequences.',
    estimatedTime: '40–50 minutes',
    objectives: [
      'Evaluate simple expressions with order of operations',
      'Generate terms from a pattern rule',
      'Solve problems with exponents as repeated multiplication',
    ],
  },
  {
    id: 'advanced-science',
    title: 'Advanced Science',
    subtitle: 'Inquiry, data, and conclusions',
    description:
      'Design a fair test, collect and chart data, and draw conclusions aligned to the evidence. Emphasis on clear communication.',
    estimatedTime: '45–55 minutes',
    objectives: [
      'Plan a fair investigation (change one variable)',
      'Collect and chart simple data',
      'State a conclusion supported by the data',
    ],
  },
  {
    id: 'leadership-skills',
    title: 'Leadership Skills',
    subtitle: 'Qualities and teamwork practice',
    description:
      'Learn about empathy, responsibility, and collaboration. Students practice roles, feedback, and goal‑setting in small groups.',
    estimatedTime: '30–40 minutes',
    objectives: [
      'Describe two qualities of a positive leader',
      'Set a team goal and assign roles',
      'Give kind, specific feedback to a peer',
    ],
  },
  {
    id: 'science-explorers-grade-3',
    title: 'Lesson 1: Science Explorers',
    subtitle: 'Observing the world with our senses',
    description:
      'Students explore observation as a core science skill. We use simple experiments to notice patterns, record findings, and discuss what we see, hear, and feel in safe, structured ways.',
    estimatedTime: '35–45 minutes',
    objectives: [
      'Use at least two senses to make observations',
      'Record findings using icons and short phrases',
      'Share one new thing learned from an investigation',
      'Practice safe lab behaviors and turn-taking',
    ],
  },
  {
    id: 'social-skills-grade-1',
    title: 'Lesson 1: Understanding Emotions',
    subtitle: 'Recognize and name feelings',
    description:
      'This lesson introduces common emotions and helps students identify and understand different feelings in themselves and others using visual supports and role-play.',
    estimatedTime: '30–45 minutes',
    objectives: [
      'Identify four core emotions in pictures and stories',
      'Match facial expressions to feelings words',
      'Practice an “I feel… because…” sentence starter',
      'Use a calm-down choice when feeling upset',
    ],
  },
  // Add more as needed for other grades/subjects
];

const getLessonById = (id?: string): LessonDetail | undefined => {
  if (!id) return undefined;
  const byExact = lessonsCatalog.find((l) => l.id === id);
  if (byExact) return byExact;
  // Fallback: match by slug of title only
  return lessonsCatalog.find((l) => makeSlug(l.title) === id);
};

const LessonOverview: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { isDark } = useTheme();

  const primary = '#e68019';
  const textPrimary = isDark ? '#F5F7FA' : '#181411';
  const textSecondary = isDark ? '#C5CCD6' : '#5e5c5a';
  const cardBg = isDark ? '#141925' : '#fafafa';
  const border = isDark ? '#1f2633' : '#f4f2f0';

  const lesson = getLessonById(lessonId);

  const title = lesson?.title ?? (lessonId ? lessonId.split('-').map((w) => w[0]?.toUpperCase() + w.slice(1)).join(' ') : 'Lesson Overview');
  const subtitle = lesson?.subtitle ?? 'Let’s begin a new learning adventure!';
  const description = lesson?.description ?? 'This lesson will introduce core concepts through multi-sensory activities designed to be calm, structured, and engaging.';
  const objectives = lesson?.objectives ?? [
    'Engage with the topic using visuals and audio',
    'Practice step-by-step skills with support',
    'Reflect on what was learned using sentence starters',
  ];
  const time = lesson?.estimatedTime ?? '30 minutes';

  return (
    <main className="px-6 md:px-12 lg:px-28 xl:px-40 py-8 min-h-screen" style={{ background: isDark ? '#0E1116' : '#ffffff', fontFamily: 'Lexend, Noto Sans, sans-serif' }}>
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap gap-2 text-sm mb-4">
          <span style={{ color: textSecondary }}>Lessons</span>
          <span style={{ color: textSecondary }}>/</span>
          <span style={{ color: textPrimary }}>Lesson Overview</span>
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-3 mb-4">
          <h1 className="text-4xl md:text-5xl font-bold" style={{ color: textPrimary }}>{title}</h1>
          <p className="text-lg" style={{ color: textSecondary }}>{subtitle}</p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 rounded-2xl p-6" style={{ background: cardBg, border: `1px solid ${border}` }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-full w-10 h-10 flex items-center justify-center" style={{ background: '#FFE9D6', color: primary }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              </div>
              <h3 className="text-xl font-bold" style={{ color: textPrimary }}>Lesson Description</h3>
            </div>
            <p style={{ color: textSecondary }} className="leading-relaxed">{description}</p>
          </div>

          <div className="rounded-2xl p-6" style={{ background: cardBg, border: `1px solid ${border}` }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-full w-10 h-10 flex items-center justify-center" style={{ background: '#FFE9D6', color: primary }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <h3 className="text-xl font-bold" style={{ color: textPrimary }}>Estimated Time</h3>
            </div>
            <p style={{ color: textSecondary }}>{time}</p>
          </div>
        </div>

        <div className="rounded-2xl p-6 mb-8" style={{ background: cardBg, border: `1px solid ${border}` }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="rounded-full w-10 h-10 flex items-center justify-center" style={{ background: '#FFE9D6', color: primary }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
            </div>
            <h3 className="text-xl font-bold" style={{ color: textPrimary }}>Learning Objectives</h3>
          </div>
          <ul className="space-y-3 pl-1">
            {objectives.map((o) => (
              <li key={o} className="flex items-start gap-3">
                <div className="mt-1" style={{ color: '#10B981' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <p className="text-base flex-1" style={{ color: textSecondary }}>{o}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center pt-2">
          <button onClick={() => window.location.href = `/lesson/${lessonId}/start`} className="rounded-full h-14 px-6 text-lg font-bold flex items-center gap-2 hover:opacity-90 transition-opacity" style={{ background: primary, color: '#fff' }}>
            <span>Start Lesson</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>
      </div>
    </main>
  );
};

export default LessonOverview;


