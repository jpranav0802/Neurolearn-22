import React from 'react';
import LiquidGlassButton from './LiquidGlassButton';

const HeroSection: React.FC = () => {
  return (
    <section className="px-6 py-16 md:px-10 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold leading-tight tracking-tighter text-text-primary md:text-5xl lg:text-6xl">
            Empowering Every Child's Unique Potential
          </h1>
          <p className="text-lg text-text-secondary md:text-xl">
            Neurolearn is a personalized learning platform designed for children on the
            autism spectrum in grades 1-5. Our engaging, adaptive curriculum fosters
            growth, confidence, and a love for learning.
          </p>
          <div className="mt-4 flex gap-4">
            <LiquidGlassButton
              variant="primary"
              size="medium"
              onClick={() => console.log('Get Started clicked')}
              className="min-w-[120px]"
            >
              Get Started
            </LiquidGlassButton>
            <LiquidGlassButton
              variant="secondary"
              size="medium"
              onClick={() => console.log('Learn More clicked')}
              className="min-w-[120px]"
            >
              Learn More
            </LiquidGlassButton>
          </div>
        </div>
        <div className="relative h-80 w-full lg:h-full">
          <div
            className="absolute inset-0 rounded-2xl bg-cover bg-center shadow-2xl"
            style={{
              backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDvi_rPEas1d41CkrCoujwF7CY14bHH2sTSYbZc2Fhp_gKETUd8coYYYnn7eDWLtpZHhLRX_vrXPmaGKlWDGuYjrAsrqrkYlKIwe_ToXWDnZi3gq4psAk5UuaV30uyLQuQllFNIAKtz7PASU7qoXxFO4PSQ5Alg9eMxpZkzuhFq8d548I5McPbDME4BZ51jW_EnHCRsb85tIuouf-PpfraG2_jUchG7ZkYWJkbDvNw2mhfFrl_ZWaxYCPqbp46HNqfIqAS1N4wZGOg")`
            }}
            role="img"
            aria-label="Children learning together with NeuroLearn platform"
          />
          <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-brand-secondary/20" aria-hidden="true" />
          <div className="absolute -top-8 -right-8 h-40 w-40 rounded-full bg-brand-primary/20" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;