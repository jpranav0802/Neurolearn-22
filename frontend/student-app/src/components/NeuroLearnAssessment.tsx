import React, { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type SensoryModality = 'visual' | 'auditory' | 'kinesthetic';
export type ProcessingStyle = 'sequential' | 'holistic' | 'balanced';
export type AttentionStyle = 'short-focused' | 'moderate' | 'sustained';
export type MotivationStyle = 'rewards' | 'curiosity' | 'mixed';

export type EaseRating = 1 | 2 | 3;
export type EnjoymentRating = 1 | 2 | 3;

export interface CaregiverAnswers {
  enjoyedMost?: SensoryModality[];
  prefersSteps?: boolean | null;
  typicalFocusMins?: number | null;
  rewardsResponse?: 'strong' | 'some' | 'none' | null;
  sensitivities?: { sound?: boolean; bright?: boolean; touch?: boolean };
}

export interface LearnerProfile {
  sensoryPreference: SensoryModality[];
  processingStyle: ProcessingStyle;
  attentionStyle: AttentionStyle;
  motivation: MotivationStyle;
  adaptations: string[];
}

export interface AssessmentResult { profile: LearnerProfile; raw: RawAssessmentData }

export interface RawAssessmentData {
  visualMissingItem: { correct: boolean; ease?: EaseRating; enjoy?: EnjoymentRating } | null;
  auditoryMatch: { correct: boolean; ease?: EaseRating; enjoy?: EnjoymentRating } | null;
  kinestheticSort: { matches: number; total: number; ease?: EaseRating; enjoy?: EnjoymentRating } | null;
  sequentialOrder: { misplaced: number; total: number; ease?: EaseRating; enjoy?: EnjoymentRating } | null;
  holisticRecall: { correct: boolean; ease?: EaseRating; enjoy?: EnjoymentRating } | null;
  memoryGrid: { correctCount: number; total: number; ease?: EaseRating; enjoy?: EnjoymentRating } | null;
  simonPattern: { maxLen: number; mistakes: number; ease?: EaseRating; enjoy?: EnjoymentRating } | null;
  caregiver: CaregiverAnswers;
}

interface Props { onComplete: (profile: LearnerProfile, raw: RawAssessmentData) => void; onExit?: () => void; childName?: string }

const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <div className={`rounded-2xl shadow-md bg-white/90 backdrop-blur p-5 md:p-6 ${className || ''}`}>{children}</div>
);

const StepHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-4">
    <h2 className="text-xl md:text-2xl font-semibold text-gray-800">{title}</h2>
    {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
  </div>
);

const NextButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button {...props} className={`w-full md:w-auto px-5 py-3 rounded-xl shadow-sm border border-gray-200 hover:shadow transition active:scale-[0.99] bg-gray-900 text-white disabled:opacity-50`}>
    {children || 'Continue'}
  </button>
);

const GhostButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button {...props} className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700">{children}</button>
);

const EmojiScale: React.FC<{ label: string; onSelect: (val: EnjoymentRating) => void; value?: EnjoymentRating }> = ({ label, onSelect, value }) => (
  <div className="flex items-center gap-2">
    <span className="text-sm text-gray-600 mr-2">{label}</span>
    {[1, 2, 3].map((v) => (
      <button key={v} onClick={() => onSelect(v as EnjoymentRating)} className={`text-2xl md:text-3xl ${value === v ? '' : 'opacity-60'}`} aria-label={`${label} ${v}`}>
        {v === 1 ? '😕' : v === 2 ? '🙂' : '😄'}
      </button>
    ))}
  </div>
);

const EaseScale: React.FC<{ onSelect: (val: EaseRating) => void; value?: EaseRating }> = ({ onSelect, value }) => (
  <div className="flex items-center gap-2">
    <span className="text-sm text-gray-600 mr-2">How was it?</span>
    {[{ v: 1 as EaseRating, label: 'Hard' }, { v: 2 as EaseRating, label: 'Okay' }, { v: 3 as EaseRating, label: 'Easy' }].map(({ v, label }) => (
      <button key={v} onClick={() => onSelect(v)} className={`px-3 py-1 rounded-full border ${value === v ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 text-gray-700'}`}>
        {label}
      </button>
    ))}
  </div>
);

interface DragItem { id: string; label: string; color?: string }

function useDnD<T>(items: T[]) {
  const [list, setList] = useState<T[]>(items);
  const dragIndex = useRef<number | null>(null);
  function onDragStart(index: number) { dragIndex.current = index }
  function onDragOver(e: React.DragEvent<HTMLDivElement>) { e.preventDefault() }
  function onDrop(index: number) {
    if (dragIndex.current === null || dragIndex.current === index) return;
    setList((prev) => {
      const copy = [...(prev as any[])];
      const [moved] = copy.splice(dragIndex.current!, 1);
      copy.splice(index, 0, moved);
      return copy as T[];
    });
    dragIndex.current = null;
  }
  return { list, setList, onDragStart, onDragOver, onDrop };
}

const NeuroLearnAssessment: React.FC<Props> = ({ onComplete, onExit, childName }) => {
  const [step, setStep] = useState<number>(0);
  const [raw, setRaw] = useState<RawAssessmentData>({ visualMissingItem: null, auditoryMatch: null, kinestheticSort: null, sequentialOrder: null, holisticRecall: null, memoryGrid: null, simonPattern: null, caregiver: {} });
  function updateRaw<K extends keyof RawAssessmentData>(key: K, val: RawAssessmentData[K]) { setRaw((prev) => ({ ...prev, [key]: val })) }

  const screens = [
    <IntroScreen key="intro" onNext={() => setStep(step + 1)} childName={childName} onExit={onExit} />,
    <SensoryVisual key="sv" initial={raw.visualMissingItem ?? undefined} onDone={(r) => { updateRaw('visualMissingItem', r); setStep(step + 1) }} />,
    <SensoryAuditory key="sa" initial={raw.auditoryMatch ?? undefined} onDone={(r) => { updateRaw('auditoryMatch', r); setStep(step + 1) }} />,
    <SensoryKinesthetic key="sk" initial={raw.kinestheticSort ?? undefined} onDone={(r) => { updateRaw('kinestheticSort', r); setStep(step + 1) }} />,
    <ProcessingSequential key="ps" initial={raw.sequentialOrder ?? undefined} onDone={(r) => { updateRaw('sequentialOrder', r); setStep(step + 1) }} />,
    <ProcessingHolistic key="ph" initial={raw.holisticRecall ?? undefined} onDone={(r) => { updateRaw('holisticRecall', r); setStep(step + 1) }} />,
    <MemoryGrid key="mg" initial={raw.memoryGrid ?? undefined} onDone={(r) => { updateRaw('memoryGrid', r); setStep(step + 1) }} />,
    <SimonPattern key="sp" initial={raw.simonPattern ?? undefined} onDone={(r) => { updateRaw('simonPattern', r); setStep(step + 1) }} />,
    <CaregiverForm key="cg" initial={raw.caregiver} onDone={(ans) => { updateRaw('caregiver', ans); setStep(step + 1) }} />,
    <SummaryScreen key="sum" raw={raw} onRestart={() => setStep(1)} onFinish={(profile) => onComplete(profile, raw)} />,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-emerald-50 px-4 py-6 md:py-10">
      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="popLayout">
          <motion.div key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
            {screens[step]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const IntroScreen: React.FC<{ onNext: () => void; onExit?: () => void; childName?: string }> = ({ onNext, onExit, childName }) => (
  <Card>
    <StepHeader title={`Hi${childName ? `, ${childName}` : ' there'}! 👋`} subtitle="We’ll play a few short activities to learn how you like to learn. You can go at your own speed." />
    <ul className="text-gray-700 list-disc pl-5 space-y-1 mb-6">
      <li>No timers, no scores.</li>
      <li>You can tap, drag, or point to answer.</li>
      <li>If something feels hard, you can skip it.</li>
    </ul>
    <div className="flex items-center gap-3">
      <NextButton onClick={onNext}>Start</NextButton>
      {onExit && <GhostButton onClick={onExit}>Exit</GhostButton>}
    </div>
  </Card>
);

const SensoryVisual: React.FC<{ initial?: RawAssessmentData['visualMissingItem'] | undefined; onDone: (r: NonNullable<RawAssessmentData['visualMissingItem']>) => void }> = ({ initial, onDone }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [ease, setEase] = useState<EaseRating | undefined>(initial?.ease);
  const [enjoy, setEnjoy] = useState<EnjoymentRating | undefined>(initial?.enjoy);
  const correctId = 'kite';
  function finish() { onDone({ correct: selected === correctId, ease, enjoy }) }
  return (
    <Card>
      <StepHeader title="Find what’s missing" subtitle="Look at the park. What’s missing? Tap the picture that fits." />
      <div className="grid md:grid-cols-2 gap-6 mb-4">
        <div className="rounded-xl border border-gray-200 p-4 bg-white">
          <svg viewBox="0 0 220 140" className="w-full h-auto">
            <rect x="0" y="0" width="220" height="140" fill="#E8F3FF" />
            <circle cx="40" cy="40" r="20" fill="#A7E08C" />
            <rect x="20" y="90" width="80" height="10" fill="#8B5E3C" />
            <rect x="25" y="80" width="70" height="10" fill="#C19A6B" />
            <circle cx="160" cy="35" r="15" fill="#FFD166" />
            <line x1="130" y1="75" x2="160" y2="55" stroke="#999" strokeDasharray="3 2" />
            <text x="110" y="120" fontSize="10" fill="#6B7280">A kite is missing…</text>
          </svg>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[{ id: 'kite', label: 'Kite', svg: KiteSVG }, { id: 'ball', label: 'Ball', svg: BallSVG }, { id: 'flower', label: 'Flower', svg: FlowerSVG }].map((opt) => (
            <button key={opt.id} onClick={() => setSelected(opt.id)} className={`p-3 rounded-xl border ${selected === opt.id ? 'border-gray-900' : 'border-gray-200'}`}>
              <opt.svg />
              <span className="text-sm text-gray-700">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <EaseScale value={ease} onSelect={setEase} />
        <EmojiScale label="Enjoyment" value={enjoy} onSelect={setEnjoy} />
      </div>
      <div className="flex items-center gap-3">
        <NextButton onClick={finish} disabled={!selected}>Continue</NextButton>
        <GhostButton onClick={() => onDone({ correct: false, ease, enjoy })}>Skip</GhostButton>
      </div>
    </Card>
  );
};

const SensoryAuditory: React.FC<{ initial?: RawAssessmentData['auditoryMatch'] | undefined; onDone: (r: NonNullable<RawAssessmentData['auditoryMatch']>) => void }> = ({ initial, onDone }) => {
  const [choice, setChoice] = useState<string | null>(null);
  const [ease, setEase] = useState<EaseRating | undefined>(initial?.ease);
  const [enjoy, setEnjoy] = useState<EnjoymentRating | undefined>(initial?.enjoy);
  const [played, setPlayed] = useState(false);
  const soundRef = useRef<string>('cow');
  function playSound() { const utter = new SpeechSynthesisUtterance(soundRef.current); window.speechSynthesis.speak(utter); setPlayed(true) }
  function finish() { onDone({ correct: choice === soundRef.current, ease, enjoy }) }
  return (
    <Card>
      <StepHeader title="Match the sound" subtitle="Listen, then tap the animal you heard." />
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <NextButton onClick={playSound}>Play sound</NextButton>
          <span className="text-sm text-gray-600">(You can play again.)</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[{ id: 'cow', label: 'Cow', svg: CowSVG }, { id: 'dog', label: 'Dog', svg: DogSVG }, { id: 'cat', label: 'Cat', svg: CatSVG }].map((opt) => (
            <button key={opt.id} onClick={() => setChoice(opt.id)} disabled={!played} className={`p-3 rounded-xl border ${choice === opt.id ? 'border-gray-900' : 'border-gray-200'} ${!played ? 'opacity-60' : ''}`}>
              <opt.svg />
              <span className="text-sm text-gray-700">{opt.label}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <EaseScale value={ease} onSelect={setEase} />
          <EmojiScale label="Enjoyment" value={enjoy} onSelect={setEnjoy} />
        </div>
        <div className="flex items-center gap-3">
          <NextButton onClick={finish} disabled={!played || !choice}>Continue</NextButton>
          <GhostButton onClick={() => onDone({ correct: false, ease, enjoy })}>Skip</GhostButton>
        </div>
      </div>
    </Card>
  );
};

const SensoryKinesthetic: React.FC<{ initial?: RawAssessmentData['kinestheticSort'] | undefined; onDone: (r: NonNullable<RawAssessmentData['kinestheticSort']>) => void }> = ({ initial, onDone }) => {
  const [ease, setEase] = useState<EaseRating | undefined>(initial?.ease);
  const [enjoy, setEnjoy] = useState<EnjoymentRating | undefined>(initial?.enjoy);
  const balloons: DragItem[] = [{ id: 'b-red', label: '', color: '#ef4444' }, { id: 'b-blue', label: '', color: '#3b82f6' }, { id: 'b-green', label: '', color: '#10b981' }];
  const baskets: DragItem[] = [{ id: 'k-red', label: 'Red' }, { id: 'k-blue', label: 'Blue' }, { id: 'k-green', label: 'Green' }];
  const [placed, setPlaced] = useState<Record<string, string | null>>({ 'k-red': null, 'k-blue': null, 'k-green': null });
  const unplaced = useMemo(() => balloons.filter((b) => !Object.values(placed).includes(b.id)), [placed]);
  function onDrop(basketId: string, balloonId: string) { setPlaced((prev) => ({ ...prev, [basketId]: balloonId })) }
  function finish() { const matches = Number(placed['k-red'] === 'b-red') + Number(placed['k-blue'] === 'b-blue') + Number(placed['k-green'] === 'b-green'); onDone({ matches, total: 3, ease, enjoy }) }
  return (
    <Card>
      <StepHeader title="Match the colors" subtitle="Drag each balloon to the basket with the same color." />
      <div className="grid md:grid-cols-2 gap-6 mb-4">
        <div className="flex flex-wrap gap-3 min-h-[100px] p-3 rounded-xl border border-gray-200">
          {unplaced.map((b) => (
            <div key={b.id} draggable onDragStart={(e) => e.dataTransfer.setData('text/plain', b.id)} className="w-14 h-14 rounded-full shadow-inner" style={{ background: b.color }} aria-label={`Balloon ${b.color}`} />
          ))}
          {unplaced.length === 0 && <span className="text-sm text-gray-500">All balloons placed.</span>}
        </div>
        <div className="grid grid-cols-1 gap-3">
          {baskets.map((k) => (
            <div key={k.id} onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDrop(k.id, e.dataTransfer.getData('text/plain'))} className="h-16 rounded-xl border border-dashed border-gray-300 flex items-center justify-between px-3 bg-white">
              <span className="text-gray-700">{k.label} basket</span>
              <div className="w-10 h-10 rounded-full shadow-inner" style={{ background: k.id.endsWith('red') ? '#ef4444' : k.id.endsWith('blue') ? '#3b82f6' : '#10b981' }} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <EaseScale value={ease} onSelect={setEase} />
        <EmojiScale label="Enjoyment" value={enjoy} onSelect={setEnjoy} />
      </div>
      <div className="flex items-center gap-3">
        <NextButton onClick={finish} disabled={unplaced.length !== 0}>Continue</NextButton>
        <GhostButton onClick={() => onDone({ matches: 0, total: 3, ease, enjoy })}>Skip</GhostButton>
      </div>
    </Card>
  );
};

const ProcessingSequential: React.FC<{ initial?: RawAssessmentData['sequentialOrder'] | undefined; onDone: (r: NonNullable<RawAssessmentData['sequentialOrder']>) => void }> = ({ initial, onDone }) => {
  const images: DragItem[] = [{ id: '1', label: 'Get bread' }, { id: '2', label: 'Add spread' }, { id: '3', label: 'Put veggies' }, { id: '4', label: 'Eat' }];
  const { list, onDragStart, onDragOver, onDrop } = useDnD(images);
  const [ease, setEase] = useState<EaseRating | undefined>(initial?.ease);
  const [enjoy, setEnjoy] = useState<EnjoymentRating | undefined>(initial?.enjoy);
  function finish() { const misplaced = list.reduce((acc, it, idx) => acc + (it.id !== String(idx + 1) ? 1 : 0), 0); onDone({ misplaced, total: 4, ease, enjoy }) }
  return (
    <Card>
      <StepHeader title="Put the story in order" subtitle="Drag the cards into the order that makes sense." />
      <div className="grid gap-3 mb-4">
        {list.map((it, idx) => (
          <div key={`${it.id}-${idx}`} draggable onDragStart={() => onDragStart(idx)} onDragOver={onDragOver} onDrop={() => onDrop(idx)} className="border rounded-xl p-3 bg-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold">{idx + 1}</div>
            <span className="text-gray-700">{it.label}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <EaseScale value={ease} onSelect={setEase} />
        <EmojiScale label="Enjoyment" value={enjoy} onSelect={setEnjoy} />
      </div>
      <div className="flex items-center gap-3">
        <NextButton onClick={finish}>Continue</NextButton>
        <GhostButton onClick={() => onDone({ misplaced: 4, total: 4, ease, enjoy })}>Skip</GhostButton>
      </div>
    </Card>
  );
};

const ProcessingHolistic: React.FC<{ initial?: RawAssessmentData['holisticRecall'] | undefined; onDone: (r: NonNullable<RawAssessmentData['holisticRecall']>) => void }> = ({ initial, onDone }) => {
  const [seen, setSeen] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [ease, setEase] = useState<EaseRating | undefined>(initial?.ease);
  const [enjoy, setEnjoy] = useState<EnjoymentRating | undefined>(initial?.enjoy);
  function finish() { onDone({ correct: answer === 'yellow', ease, enjoy }) }
  return (
    <Card>
      <StepHeader title="Look, then answer" subtitle="First look at the picture. When you're ready, answer a question about it." />
      {!seen ? (
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-200 p-3 bg-white"><StreetSceneSVG /></div>
          <NextButton onClick={() => setSeen(true)}>I'm ready to answer</NextButton>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-700">What color was the bus?</p>
          <div className="flex flex-wrap gap-3">
            {['yellow', 'blue', 'red'].map((c) => (
              <button key={c} onClick={() => setAnswer(c)} className={`px-4 py-2 rounded-lg border ${answer === c ? 'border-gray-900' : 'border-gray-300'}`}>{c}</button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <EaseScale value={ease} onSelect={setEase} />
            <EmojiScale label="Enjoyment" value={enjoy} onSelect={setEnjoy} />
          </div>
          <div className="flex items-center gap-3">
            <NextButton onClick={finish} disabled={!answer}>Continue</NextButton>
            <GhostButton onClick={() => onDone({ correct: false, ease, enjoy })}>Skip</GhostButton>
          </div>
        </div>
      )}
    </Card>
  );
};

const MemoryGrid: React.FC<{ initial?: RawAssessmentData['memoryGrid'] | undefined; onDone: (r: NonNullable<RawAssessmentData['memoryGrid']>) => void }> = ({ initial, onDone }) => {
  const [pattern] = useState<number[]>([0, 4, 8]);
  const [showing, setShowing] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [ease, setEase] = useState<EaseRating | undefined>(initial?.ease);
  const [enjoy, setEnjoy] = useState<EnjoymentRating | undefined>(initial?.enjoy);
  function toggleCell(i: number) { setSelected((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i])) }
  function finish() { const correctCount = selected.filter((i) => pattern.includes(i)).length; onDone({ correctCount, total: pattern.length, ease, enjoy }) }
  return (
    <Card>
      <StepHeader title="Remember the squares" subtitle="First show the pattern. When you're ready, make the same pattern." />
      <div className="flex items-center gap-3 mb-3">
        <NextButton onClick={() => setShowing(true)}>Show pattern</NextButton>
        {showing && <GhostButton onClick={() => setShowing(false)}>Hide pattern</GhostButton>}
      </div>
      <div className="grid grid-cols-3 gap-2 w-56 mb-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <button key={i} onClick={() => toggleCell(i)} className={`w-16 h-16 rounded-xl border flex items-center justify-center text-gray-500 ${selected.includes(i) ? 'bg-indigo-100 border-indigo-300' : 'bg-white border-gray-200'}`}>
            <span className="sr-only">Cell {i + 1}</span>
            {showing && pattern.includes(i) && <div className="w-6 h-6 rounded bg-indigo-400" />}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <EaseScale value={ease} onSelect={setEase} />
        <EmojiScale label="Enjoyment" value={enjoy} onSelect={setEnjoy} />
      </div>
      <div className="flex items-center gap-3">
        <NextButton onClick={finish}>Continue</NextButton>
        <GhostButton onClick={() => onDone({ correctCount: 0, total: pattern.length, ease, enjoy })}>Skip</GhostButton>
      </div>
    </Card>
  );
};

const SimonPattern: React.FC<{ initial?: RawAssessmentData['simonPattern'] | undefined; onDone: (r: NonNullable<RawAssessmentData['simonPattern']>) => void }> = ({ initial, onDone }) => {
  const [sequence, setSequence] = useState<number[]>([0, 1]);
  const [input, setInput] = useState<number[]>([]);
  const [playMode, setPlayMode] = useState<'idle' | 'show' | 'input'>('idle');
  const [ease, setEase] = useState<EaseRating | undefined>(initial?.ease);
  const [enjoy, setEnjoy] = useState<EnjoymentRating | undefined>(initial?.enjoy);
  const [mistakes, setMistakes] = useState(0);
  function showSequence() { setPlayMode('show') }
  function appendStep() { setSequence((prev) => [...prev, Math.floor(Math.random() * 4)]) }
  function startInput() { setInput([]); setPlayMode('input') }
  function press(i: number) { if (playMode !== 'input') return; const idx = input.length; const correct = sequence[idx] === i; setInput((p) => [...p, i]); if (!correct) setMistakes((m) => m + 1) }
  function finishRound() { onDone({ maxLen: sequence.length, mistakes, ease, enjoy }) }
  return (
    <Card>
      <StepHeader title="Copy the pattern" subtitle="First show the pattern. Then tap the buttons in the same order." />
      <div className="flex flex-col gap-3 mb-3">
        <div className="grid grid-cols-2 gap-3 w-56">
          {[0, 1, 2, 3].map((i) => (
            <button key={i} onClick={() => press(i)} className={`h-20 rounded-xl border ${['bg-red-100 border-red-300','bg-blue-100 border-blue-300','bg-yellow-100 border-yellow-300','bg-green-100 border-green-300'][i]} ${playMode !== 'input' ? 'opacity-60' : ''}`} aria-label={`Button ${i + 1}`} />
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {playMode === 'idle' && <NextButton onClick={showSequence}>Show pattern</NextButton>}
          {playMode === 'show' && (
            <div className="flex items-center gap-2">
              <GhostButton onClick={appendStep}>Add next step</GhostButton>
              <NextButton onClick={startInput}>I'm ready to try</NextButton>
            </div>
          )}
          {playMode === 'input' && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Taps: {input.length} / {sequence.length}</span>
              <GhostButton onClick={() => { setInput([]); setMistakes(0) }}>Reset</GhostButton>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <EaseScale value={ease} onSelect={setEase} />
        <EmojiScale label="Enjoyment" value={enjoy} onSelect={setEnjoy} />
      </div>
      <div className="flex items-center gap-3">
        <NextButton onClick={finishRound}>Continue</NextButton>
        <GhostButton onClick={() => onDone({ maxLen: 0, mistakes: 0, ease, enjoy })}>Skip</GhostButton>
      </div>
    </Card>
  );
};

const CaregiverForm: React.FC<{ initial: CaregiverAnswers; onDone: (ans: CaregiverAnswers) => void }> = ({ initial, onDone }) => {
  const [answers, setAnswers] = useState<CaregiverAnswers>({ enjoyedMost: initial.enjoyedMost ?? [], prefersSteps: initial.prefersSteps ?? null, typicalFocusMins: initial.typicalFocusMins ?? null, rewardsResponse: initial.rewardsResponse ?? null, sensitivities: initial.sensitivities ?? {} });
  function toggleEnjoyed(m: SensoryModality) { setAnswers((a) => ({ ...a, enjoyedMost: a.enjoyedMost?.includes(m) ? a.enjoyedMost?.filter((x) => x !== m) : [...(a.enjoyedMost || []), m] })) }
  return (
    <Card>
      <StepHeader title="Caregiver quick questions" subtitle="This helps us personalize learning even more." />
      <div className="space-y-5">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Which activities seemed to engage your child most?</label>
          <div className="flex flex-wrap gap-2">
            {(['visual','auditory','kinesthetic'] as SensoryModality[]).map((m) => (
              <button key={m} onClick={() => toggleEnjoyed(m)} className={`px-3 py-1 rounded-full border ${answers.enjoyedMost?.includes(m) ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 text-gray-700'}`}>{m}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Does your child prefer step-by-step instructions?</label>
          <div className="flex gap-2">
            <button onClick={() => setAnswers((a) => ({ ...a, prefersSteps: true }))} className={`px-3 py-1 rounded-full border ${answers.prefersSteps === true ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 text-gray-700'}`}>Yes</button>
            <button onClick={() => setAnswers((a) => ({ ...a, prefersSteps: false }))} className={`px-3 py-1 rounded-full border ${answers.prefersSteps === false ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 text-gray-700'}`}>No</button>
            <button onClick={() => setAnswers((a) => ({ ...a, prefersSteps: null }))} className={`px-3 py-1 rounded-full border ${answers.prefersSteps === null ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 text-gray-700'}`}>Not sure</button>
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Typical focus time before a break (minutes)</label>
          <input type="number" min={1} inputMode="numeric" value={answers.typicalFocusMins ?? ''} onChange={(e) => setAnswers((a) => ({ ...a, typicalFocusMins: e.target.value ? Number(e.target.value) : null }))} className="w-32 px-3 py-2 border border-gray-300 rounded-lg" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Response to rewards (points, badges)</label>
          <div className="flex gap-2">
            {['strong','some','none'].map((r) => (
              <button key={r} onClick={() => setAnswers((a) => ({ ...a, rewardsResponse: r as any }))} className={`px-3 py-1 rounded-full border ${answers.rewardsResponse === r ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 text-gray-700'}`}>{r}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Sensitivities to avoid</label>
          <div className="flex flex-wrap gap-2">
            {([
              { key: 'sound', label: 'Loud sounds' },
              { key: 'bright', label: 'Bright visuals' },
              { key: 'touch', label: 'Haptics/vibration' }
            ] as const).map(({ key, label }) => (
              <button key={key} onClick={() => setAnswers((a) => ({ ...a, sensitivities: { ...a.sensitivities, [key]: !a.sensitivities?.[key] } }))} className={`px-3 py-1 rounded-full border ${answers.sensitivities?.[key] ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 text-gray-700'}`}>{label}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6">
        <NextButton onClick={() => onDone(answers)}>See my learning plan</NextButton>
      </div>
    </Card>
  );
};

const SummaryScreen: React.FC<{ raw: RawAssessmentData; onRestart: () => void; onFinish: (p: LearnerProfile) => void }> = ({ raw, onRestart, onFinish }) => {
  const profile = useMemo<LearnerProfile>(() => mapToProfile(raw), [raw]);
  return (
    <Card>
      <StepHeader title="Your learning plan" subtitle="Here’s how we’ll set up NeuroLearn based on your preferences." />
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-3">
          <InfoPill label="Sensory Preference" value={profile.sensoryPreference.map(cap).join(', ')} />
          <InfoPill label="Processing Style" value={cap(profile.processingStyle)} />
          <InfoPill label="Attention Style" value={prettyAttention(profile.attentionStyle)} />
          <InfoPill label="Motivation" value={cap(profile.motivation)} />
        </div>
        <div className="rounded-xl border border-gray-200 p-4 bg-white">
          <p className="text-gray-700 font-medium mb-2">Adaptations we'll apply:</p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            {profile.adaptations.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </div>
        <div className="flex items-center gap-3">
          <NextButton onClick={() => onFinish(profile)}>Finish</NextButton>
          <GhostButton onClick={onRestart}>Try activities again</GhostButton>
        </div>
      </div>
    </Card>
  );
};

const InfoPill: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="rounded-xl border border-gray-200 p-3 bg-white">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="font-medium text-gray-800">{value}</div>
  </div>
);

function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1) }
function prettyAttention(a: AttentionStyle) { return a === 'short-focused' ? 'Short, focused tasks' : a === 'moderate' ? 'Moderate sessions' : 'Sustained sessions' }

function mapToProfile(raw: RawAssessmentData): LearnerProfile {
  const sensoryScores: Record<SensoryModality, number> = { visual: 0, auditory: 0, kinesthetic: 0 };
  if (raw.visualMissingItem) sensoryScores.visual += (raw.visualMissingItem.correct ? 2 : 0) + (raw.visualMissingItem.enjoy || 0) + (raw.visualMissingItem.ease || 0) - 1;
  if (raw.auditoryMatch) sensoryScores.auditory += (raw.auditoryMatch.correct ? 2 : 0) + (raw.auditoryMatch.enjoy || 0) + (raw.auditoryMatch.ease || 0) - 1;
  if (raw.kinestheticSort) sensoryScores.kinesthetic += raw.kinestheticSort.matches + (raw.kinestheticSort.enjoy || 0) + (raw.kinestheticSort.ease || 0) - 1;
  raw.caregiver.enjoyedMost?.forEach((m) => (sensoryScores[m] += 2));
  const sortedModalities = (Object.keys(sensoryScores) as SensoryModality[]).sort((a, b) => sensoryScores[b] - sensoryScores[a]);
  const top = sortedModalities[0];
  const second = sortedModalities[1];
  const sensoryPreference = sensoryScores[top] - sensoryScores[second] <= 1 ? [top, second] : [top];
  const seqScore = (raw.sequentialOrder ? (4 - raw.sequentialOrder.misplaced) : 0) + (raw.caregiver.prefersSteps === true ? 2 : 0);
  const holScore = (raw.holisticRecall?.correct ? 3 : 0) + (raw.caregiver.prefersSteps === false ? 2 : 0);
  let processingStyle: ProcessingStyle = 'balanced';
  if (seqScore - holScore >= 2) processingStyle = 'sequential';
  else if (holScore - seqScore >= 2) processingStyle = 'holistic';
  const completedTasks = [raw.visualMissingItem, raw.auditoryMatch, raw.kinestheticSort, raw.sequentialOrder, raw.holisticRecall, raw.memoryGrid, raw.simonPattern].filter(Boolean).length;
  let attentionStyle: AttentionStyle = 'moderate';
  if ((raw.caregiver.typicalFocusMins ?? 0) <= 5 || completedTasks <= 3) attentionStyle = 'short-focused';
  else if ((raw.caregiver.typicalFocusMins ?? 0) >= 15 && completedTasks >= 6) attentionStyle = 'sustained';
  let motivation: MotivationStyle = 'mixed';
  if (raw.caregiver.rewardsResponse === 'strong') motivation = 'rewards';
  else if (raw.caregiver.rewardsResponse === 'none') motivation = 'curiosity';
  const adaptations: string[] = [];
  if (sensoryPreference.includes('visual')) adaptations.push('Use visual-first lessons with icons and diagrams');
  if (sensoryPreference.includes('auditory')) adaptations.push('Enable clear narration; minimize background sounds');
  if (sensoryPreference.includes('kinesthetic')) adaptations.push('Prefer drag-and-drop and tap-to-manipulate interactions');
  if (processingStyle === 'sequential') adaptations.push('Break content into short, numbered steps with progress breadcrumbs');
  if (processingStyle === 'holistic') adaptations.push('Start each topic with an overview scene or summary before details');
  if (attentionStyle === 'short-focused') adaptations.push('Micro-lessons (2–4 mins) with optional breaks');
  if (attentionStyle === 'sustained') adaptations.push('Longer flows (8–12 mins) with fewer transitions');
  if (motivation === 'rewards') adaptations.push('Gamified badges after each micro-task and a visible progress bar');
  if (motivation === 'curiosity') adaptations.push('Open exploration mode with optional challenges, minimal scoring UI');
  if (raw.caregiver.sensitivities?.sound) adaptations.push('Default to low-sound mode and captions');
  if (raw.caregiver.sensitivities?.bright) adaptations.push('Use low-contrast, soft color palette and reduce motion');
  if (raw.caregiver.sensitivities?.touch) adaptations.push('Avoid haptics/vibrations; emphasize tap over long-press');
  return { sensoryPreference, processingStyle, attentionStyle, motivation, adaptations };
}

function KiteSVG() { return (<div className="flex flex-col items-center gap-1"><svg viewBox="0 0 80 80" className="w-16 h-16"><polygon points="40,5 75,40 40,75 5,40" fill="#f59e0b" stroke="#92400e" strokeWidth="2" /><line x1="40" y1="75" x2="40" y2="95" stroke="#6b7280" strokeDasharray="4 2" /></svg></div>) }
function BallSVG() { return (<div className="flex flex-col items-center gap-1"><svg viewBox="0 0 80 80" className="w-16 h-16"><circle cx="40" cy="40" r="30" fill="#60a5fa" stroke="#1d4ed8" strokeWidth="2" /></svg></div>) }
function FlowerSVG() { return (<div className="flex flex-col items-center gap-1"><svg viewBox="0 0 80 80" className="w-16 h-16"><circle cx="40" cy="40" r="8" fill="#fbbf24" />{[0,60,120,180,240,300].map((a) => (<ellipse key={a} cx="40" cy="40" rx="8" ry="16" transform={`rotate(${a} 40 40)`} fill="#f472b6" />))}</svg></div>) }
function CowSVG() { return (<div className="flex flex-col items-center gap-1"><svg viewBox="0 0 80 80" className="w-16 h-16"><rect x="15" y="30" width="50" height="30" rx="8" fill="#fff" stroke="#000" /><circle cx="30" cy="35" r="5" fill="#000" /><circle cx="55" cy="45" r="4" fill="#000" /></svg></div>) }
function DogSVG() { return (<div className="flex flex-col items-center gap-1"><svg viewBox="0 0 80 80" className="w-16 h-16"><rect x="20" y="30" width="40" height="25" rx="8" fill="#fde68a" stroke="#92400e" /><circle cx="30" cy="35" r="5" fill="#92400e" /></svg></div>) }
function CatSVG() { return (<div className="flex flex-col items-center gap-1"><svg viewBox="0 0 80 80" className="w-16 h-16"><rect x="20" y="30" width="40" height="25" rx="8" fill="#fbcfe8" stroke="#831843" /><circle cx="30" cy="35" r="5" fill="#831843" /></svg></div>) }
function StreetSceneSVG() { return (<svg viewBox="0 0 280 160" className="w-full h-auto"><rect x="0" y="0" width="280" height="160" fill="#e5e7eb" /><rect x="0" y="110" width="280" height="50" fill="#9ca3af" /><rect x="10" y="80" width="70" height="25" fill="#f3f4f6" stroke="#6b7280" /><rect x="100" y="70" width="120" height="40" fill="#facc15" stroke="#92400e" /><circle cx="120" cy="110" r="8" fill="#111827" /><circle cx="200" cy="110" r="8" fill="#111827" /><rect x="230" y="85" width="30" height="20" fill="#60a5fa" /></svg>) }

export default NeuroLearnAssessment;


