import React from 'react';
import { useNavigate } from 'react-router-dom';
import NeuroLearnLogo from './NeuroLearnLogo';
import LiquidGlassButton from './LiquidGlassButton';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  
  const handleLoginClick = () => navigate('/login');
  const handleSignUpClick = () => navigate('/signup');

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-border-color bg-white/80 px-6 py-4 backdrop-blur-sm md:px-10">
        <NeuroLearnLogo />

        <nav className="hidden items-center gap-8 md:flex" role="navigation" aria-label="Main navigation">
                  <a 
          className="text-sm font-medium text-text-secondary transition-colors hover:text-brand-primary focus:text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 cursor-pointer" 
          onClick={() => {
            console.log('📖 About page clicked');
            navigate('/about');
          }}
        >
          About
        </a>
                  <a 
          className="text-sm font-medium text-text-secondary transition-colors hover:text-brand-primary focus:text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 cursor-pointer" 
          onClick={() => {
            console.log('📚 Curriculum page clicked');
            navigate('/curriculum');
          }}
        >
          Curriculum
        </a>
                  <a 
          className="text-sm font-medium text-text-secondary transition-colors hover:text-brand-primary focus:text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 cursor-pointer" 
          onClick={() => {
            console.log('👥 Team page clicked');
            navigate('/team');
          }}
        >
          Team
        </a>
                  <a 
          className="text-sm font-medium text-text-secondary transition-colors hover:text-brand-primary focus:text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 cursor-pointer" 
          onClick={() => {
            console.log('💰 Pricing page clicked');
            navigate('/pricing');
          }}
        >
          Pricing
        </a>
                  <a 
          className="text-sm font-medium text-text-secondary transition-colors hover:text-brand-primary focus:text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 cursor-pointer" 
          onClick={() => {
            console.log('📞 Contact page clicked');
            navigate('/contact');
          }}
        >
          Contact
        </a>
        </nav>

        <div className="flex items-center gap-3">
          {isLoading ? (
            <div className="text-text-secondary">Loading...</div>
          ) : isAuthenticated && user ? (
            // Authenticated user UI
            <>
              <div className="hidden md:flex items-center gap-2 text-sm">
                <span className="text-text-secondary">Welcome,</span>
                <span className="font-semibold text-text-primary">{user.firstName}</span>
                <span className="px-2 py-1 text-xs bg-brand-primary/10 text-brand-primary rounded-full">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </div>
              <LiquidGlassButton
                variant="secondary"
                size="small"
                onClick={handleLogout}
              >
                Logout
              </LiquidGlassButton>
            </>
          ) : (
            // Non-authenticated user UI
            <>
              <LiquidGlassButton
                variant="secondary"
                size="small"
                onClick={handleLoginClick}
              >
                Login
              </LiquidGlassButton>
              <LiquidGlassButton
                variant="primary"
                size="small"
                onClick={handleSignUpClick}
              >
                Sign Up
              </LiquidGlassButton>
            </>
          )}
        </div>
      </header>

      {/* Auth modal removed; using dedicated pages now */}
    </>
  );
};

export default Header;
