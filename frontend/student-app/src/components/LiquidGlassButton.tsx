import React from 'react';

interface LiquidGlassButtonProps {
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const LiquidGlassButton: React.FC<LiquidGlassButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'medium',
  type = 'button',
  disabled = false
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const baseClasses = "relative overflow-hidden transition-all duration-400 ease-out transform hover:scale-110 hover:-translate-y-1 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 group";

  const variantClasses = {
    primary: "bg-brand-primary text-white shadow-lg shadow-brand-primary/30 hover:shadow-2xl hover:shadow-brand-primary/40 focus:ring-brand-primary",
    secondary: "bg-transparent border-2 border-border-color text-text-primary hover:bg-gray-100 hover:border-brand-primary focus:bg-gray-100 focus:ring-brand-primary"
  };

  const sizeClasses = {
    small: "h-10 px-4 text-sm font-semibold rounded-full",
    medium: "h-12 px-6 text-base font-semibold rounded-full",
    large: "h-14 px-8 text-lg font-semibold rounded-full"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${sizeClasses[size]}
        ${className}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        glass-morphism
      `}
      onClick={onClick}
      onMouseMove={disabled ? undefined : handleMouseMove}
      onMouseEnter={disabled ? undefined : () => setIsHovered(true)}
      onMouseLeave={disabled ? undefined : () => setIsHovered(false)}
      style={{
        backdropFilter: 'blur(10px) saturate(180%)',
        WebkitBackdropFilter: 'blur(10px) saturate(180%)',
        background: variant === 'primary'
          ? 'linear-gradient(135deg, rgba(255, 123, 84, 0.9) 0%, rgba(255, 178, 107, 0.8) 100%)'
          : 'rgba(255, 255, 255, 0.1)',
        border: variant === 'secondary' ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
        boxShadow: `
          0 8px 32px rgba(31, 38, 135, 0.37),
          0 4px 16px rgba(255, 123, 84, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.2)
        `,
        transform: isHovered ? 'perspective(1000px) rotateX(-2deg) rotateY(1deg) translateY(-4px) scale(1.05)' : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)',
      }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 transition-transform duration-300 group-hover:translate-y-[-1px]">
        {children}
      </span>

      {/* Dynamic Mouse Follow Spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle 80px at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.2) 0%, transparent 70%)`,
        }}
      />

      {/* Liquid Glass Effect Overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.1) 100%)',
          transform: 'translateX(-100%)',
          animation: isHovered ? 'shimmer 2s ease-in-out infinite' : 'none'
        }}
      />

      {/* Ripple Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)`,
          transform: 'scale(0)',
          animation: isHovered ? 'ripple 1.5s ease-out infinite' : 'none'
        }}
      />
    </button>
  );
};

export default LiquidGlassButton;
