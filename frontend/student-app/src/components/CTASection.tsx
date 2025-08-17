import React from 'react';
import LiquidGlassButton from './LiquidGlassButton';

const CTASection: React.FC = () => {
  return (
    <section className="bg-background-light px-6 py-16 md:px-10 lg:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
          Ready to Unlock Your Child's Potential?
        </h2>
        <p className="mt-4 text-lg text-text-secondary">
          Join Neurolearn today and embark on a journey of personalized learning and
          growth.
        </p>
        <div className="mt-8">
          <LiquidGlassButton 
            variant="primary" 
            size="large"
            onClick={() => console.log('Start Free Trial clicked')}
            className="mx-auto min-w-[160px]"
          >
            Start Your Free Trial
          </LiquidGlassButton>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
