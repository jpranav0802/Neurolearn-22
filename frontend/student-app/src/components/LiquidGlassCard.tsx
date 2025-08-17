import React from 'react';

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  hover?: boolean;
  style?: React.CSSProperties;
  role?: string;
  'aria-labelledby'?: string;
}

const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
  children,
  className = '',
  onClick,
  onMouseEnter,
  onMouseLeave,
  hover = true,
  style,
  role,
  'aria-labelledby': ariaLabelledBy
}) => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!hover) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl border border-white/20 
        ${hover ? 'transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-brand-primary/20 hover:-translate-y-2' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
        glass-card group
      `}
      onClick={onClick}
      role={role}
      aria-labelledby={ariaLabelledBy}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        onMouseEnter?.();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onMouseLeave?.();
      }}
      style={{
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        boxShadow: `
          0 8px 32px rgba(31, 38, 135, 0.37),
          inset 0 1px 0 rgba(255, 255, 255, 0.2),
          0 4px 16px rgba(0, 0, 0, 0.1)
        `,
        transform: isHovered ? 'perspective(1000px) rotateX(2deg) rotateY(2deg)' : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        ...style
      }}
    >
      {/* Content */}
      <div className="relative z-10 p-6 transition-transform duration-300 group-hover:translate-y-[-2px]">
        {children}
      </div>

      {/* Liquid Glass Reflection */}
      <div
        className="absolute inset-0 opacity-30 transition-opacity duration-300 group-hover:opacity-50"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.05) 100%)',
        }}
      />

      {/* Dynamic Mouse Follow Spotlight (neutral, no orange tint) */}
      {hover && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle 150px at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.10) 40%, transparent 70%)`,
          }}
        />
      )}

      {/* Animated Border Glow removed to avoid orange sweep over icons */}

      {/* Shimmer Effect */}
      {hover && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: 'linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%)',
            transform: 'translateX(-100%)',
            animation: isHovered ? 'shimmer 2s ease-in-out infinite' : 'none',
          }}
        />
      )}
    </div>
  );
};

export default LiquidGlassCard;
