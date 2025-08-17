import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import WhyChooseSection from './WhyChooseSection';
import InActionSection from './InActionSection';
import CTASection from './CTASection';
import Footer from './Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <WhyChooseSection />
        <InActionSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
