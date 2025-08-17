import React from 'react';
import { useNavigate } from 'react-router-dom';

const NeuroLearnLogo: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
      onClick={() => navigate('/')}
    >
      {/* Use your actual logo image */}
      <img
        src="/neurolearn-logo.png"
        alt="NeuroLearn - Learning tailored to every mind"
        className="h-12 w-auto"
      />
    </div>
  );
};

export default NeuroLearnLogo;
