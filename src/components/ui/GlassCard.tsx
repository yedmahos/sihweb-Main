import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  hover?: boolean;
  glow?: 'cyan' | 'red' | 'amber' | 'green' | 'none';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  brackets?: boolean;
  alert?: boolean;
}

const paddingMap = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-6',
};

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  hover = true,
  glow = 'cyan',
  padding = 'md',
  brackets = false,
  alert = false,
  className = '',
  ...motionProps
}) => {
  return (
    <motion.div
      className={`bg-white border border-black/[0.06] rounded-3xl shadow-saas-card ${alert ? 'border-[#FF3D3D]/30' : ''} ${paddingMap[padding]} ${className}`}
      whileHover={hover ? { y: -2, transition: { duration: 0.15 }, boxShadow: '0 16px 40px rgba(30, 30, 30, 0.07)' } : undefined}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};
