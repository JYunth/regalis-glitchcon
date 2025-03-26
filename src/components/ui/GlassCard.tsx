
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
  hoverEffect?: boolean;
  onClick?: () => void;
  animationDelay?: string;
}

const GlassCard = ({ 
  children, 
  className, 
  padding = 'medium', 
  hoverEffect = false,
  onClick,
  animationDelay
}: GlassCardProps) => {
  const paddingClasses = {
    none: '',
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8',
  };

  return (
    <div 
      className={cn(
        'glass rounded-xl', 
        paddingClasses[padding],
        hoverEffect && 'glass-hover transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-gold-subtle',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      style={{ animationDelay }}
    >
      {children}
    </div>
  );
};

export default GlassCard;
