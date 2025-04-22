import React from 'react';
import { Check } from 'lucide-react';
import clsx from 'clsx';

interface BadgeProps {
  variant?: 'default' | 'verified' | 'primary' | 'secondary' | 'outline';
  children?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  children,
  className,
}) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    verified: 'bg-primary-500 text-white',
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-secondary-100 text-secondary-800',
    outline: 'border border-gray-300 text-gray-700',
  };
  
  return (
    <span className={clsx(baseClasses, variantClasses[variant], className)}>
      {variant === 'verified' && (
        <Check className="w-3 h-3 mr-1" />
      )}
      {children}
    </span>
  );
};