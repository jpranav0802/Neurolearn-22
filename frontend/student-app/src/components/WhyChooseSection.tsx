import React from 'react';
import LiquidGlassCard from './LiquidGlassCard';

const WhyChooseSection: React.FC = () => {
  const features = [
    {
      title: "Personalized Learning Paths",
      description: "Our curriculum adapts to each child's unique learning style and pace, ensuring they are both challenged and supported.",
      icon: (
        <svg fill="none" height="28" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="28">
          <path d="M12 20v-6M6 20v-10M18 20V4" />
        </svg>
      ),
      color: "bg-brand-primary/10 text-brand-primary"
    },
    {
      title: "Engaging & Adaptive Curriculum",
      description: "Interactive lessons and activities keep children motivated and focused, making learning fun and effective.",
      icon: (
        <svg fill="none" height="28" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="28">
          <path d="m10.132 4.09 1.25-2.094a1.18 1.18 0 0 1 2.055 0l1.25 2.094A1.18 1.18 0 0 0 15.82 5c.73-.042 1.343.535 1.343 1.25v2.5a1.25 1.25 0 0 1-1.25 1.25h-7.826a1.25 1.25 0 0 1-1.25-1.25v-2.5c0-.715.613-1.292 1.343-1.25a1.18 1.18 0 0 0 1.133-.91Z" />
          <path d="M10.132 20.09l1.25-2.094a1.18 1.18 0 0 1 2.055 0l1.25 2.094A1.18 1.18 0 0 0 15.82 21c.73-.042 1.343.535 1.343 1.25v2.5a1.25 1.25 0 0 1-1.25 1.25h-7.826a1.25 1.25 0 0 1-1.25-1.25v-2.5c0-.715.613-1.292 1.343-1.25a1.18 1.18 0 0 0 1.133-.91Z" transform="rotate(180 12 24)" />
        </svg>
      ),
      color: "bg-brand-secondary/10 text-brand-secondary"
    },
    {
      title: "Positive Reinforcement",
      description: "We create a positive and encouraging environment, celebrating every achievement to foster a genuine love for learning.",
      icon: (
        <svg fill="none" height="28" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="28">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="m9 15 2 2 4-4" />
        </svg>
      ),
      color: "bg-green-500/10 text-green-500"
    }
  ];

  return (
    <section className="bg-background-light px-6 py-16 md:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            Why Choose Neurolearn?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
            Our platform is built on a foundation of research-backed methods and a
            deep understanding of the needs of children on the autism spectrum.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <LiquidGlassCard
              key={index}
              className="glass-float"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex flex-col gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 id={`feature-${index}-title`} className="text-lg font-semibold text-text-primary">
                  {feature.title}
                </h3>
                <p className="text-text-secondary">
                  {feature.description}
                </p>
              </div>
            </LiquidGlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;