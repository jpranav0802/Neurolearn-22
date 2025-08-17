import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  // Optional: hide on root path
  const hideOnRoot = location.pathname === '/';
  if (hideOnRoot) return null;

  return (
    <button
      aria-label="Go back"
      onClick={handleBack}
      className="fixed top-4 left-4 z-50 rounded-full bg-white/70 backdrop-blur-md shadow-lg border border-white/40 hover:bg-white transition-colors p-2 md:p-3 text-gray-700 hover:text-gray-900"
      style={{
        boxShadow:
          '0 8px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)'
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5 md:h-6 md:w-6"
      >
        <path
          fillRule="evenodd"
          d="M10.53 4.47a.75.75 0 010 1.06L5.81 10.25H20a.75.75 0 010 1.5H5.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default BackButton;


