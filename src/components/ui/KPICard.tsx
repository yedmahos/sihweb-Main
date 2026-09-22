import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  code?: string;
  color?: 'cyan' | 'red' | 'amber' | 'green' | 'white';
  trend?: { direction: 'up' | 'down' | 'stable'; text: string };
  onClick?: () => void;
}

const colorMap = {
  cyan: {
    dot: 'bg-[#FF3D3D]',
    icon: 'bg-[#E8F7EC] text-[#078A22]',
    val: 'text-[#1E1E1E]',
  },
  red: {
    dot: 'bg-[#FF3D3D]',
    icon: 'bg-[#FFF1F1] text-[#FF3D3D]',
    val: 'text-[#FF3D3D]',
  },
  amber: {
    dot: 'bg-[#FF3D3D]',
    icon: 'bg-[#FFF1F1] text-[#FF3D3D]',
    val: 'text-[#FF3D3D]',
  },
  green: {
    dot: 'bg-[#FF3D3D]',
    icon: 'bg-[#E8F7EC] text-[#078A22]',
    val: 'text-[#FF3D3D]',
  },
  white: {
    dot: 'bg-[#1E1E1E]',
    icon: 'bg-[#F4F5F7] text-[#3D4450]',
    val: 'text-[#1E1E1E]',
  },
};

export const KPICard: React.FC<KPICardProps> = ({
  icon: Icon,
  value,
  label,
  code = 'TEL-METRIC',
  color = 'cyan',
  trend,
  onClick,
}) => {
  const c = colorMap[color];

  return (
    <motion.div
      className={`bg-white border border-black/[0.06] rounded-3xl shadow-saas-card px-5 py-4 ${onClick ? 'cursor-pointer' : ''}`}
      whileHover={onClick ? { y: -2, boxShadow: '0 16px 40px rgba(30, 30, 30, 0.07)' } : { y: -1 }}
      transition={{ duration: 0.15 }}
      onClick={onClick}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center ${c.icon}`}>
            <Icon className="w-3.5 h-3.5" />
          </div>
          <span className="text-[11px] text-[#6B7078] truncate">{code}</span>
        </div>
        {trend && (
          <span className={`text-[11px] font-medium ${
            trend.direction === 'up' ? 'text-[#FF3D3D]' :
            trend.direction === 'down' ? 'text-[#FF3D3D]' : 'text-[#6B7078]'
          }`}>
            {trend.direction === 'up' ? '▲' : trend.direction === 'down' ? '▼' : '■'} {trend.text}
          </span>
        )}
      </div>

      <div className={`mt-3 text-[28px] leading-none font-medium tracking-tight tabular-nums ${c.val}`}>
        {value}
      </div>

      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="text-[12px] text-[#6B7078]">{label}</div>
        <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      </div>
    </motion.div>
  );
};
