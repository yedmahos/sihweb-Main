import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';
import type { ConfidenceTier } from '../../types';

interface ConfidenceBadgeProps {
  tier: ConfidenceTier;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

const tierConfig = {
  HIGH_CONFIDENCE: {
    label: 'Critical threat · High confidence',
    shortLabel: 'High confidence',
    icon: ShieldAlert,
    className: 'rounded-full border bg-[#FFF1F1] text-[#FF3D3D] border-[#FF3D3D]/20 font-medium',
    dot: 'bg-[#FF3D3D]',
  },
  MEDIUM_CONFIDENCE: {
    label: 'Suspicious ring · Medium confidence',
    shortLabel: 'Medium confidence',
    icon: AlertTriangle,
    className: 'rounded-full border bg-[#FFF6F6] text-[#C42020] border-[#FF3D3D]/15 font-medium',
    dot: 'bg-[#FF6B6B]',
  },
  NORMAL: {
    label: 'Cleared · Normal activity',
    shortLabel: 'Normal',
    icon: CheckCircle,
    className: 'rounded-full border bg-[#E8F7EC] text-[#078A22] border-[#FF3D3D]/20 font-medium',
    dot: 'bg-[#FF3D3D]',
  },
  UNCLASSIFIED: {
    label: 'Unclassified entity',
    shortLabel: 'Unclassified',
    icon: HelpCircle,
    className: 'rounded-full border bg-[#F4F5F7] text-[#6B7078] border-black/[0.06] font-medium',
    dot: 'bg-[#8A9099]',
  },
};

const sizeMap = {
  sm: { text: 'text-[10px]', icon: 'w-2.5 h-2.5', px: 'px-2 py-0.5' },
  md: { text: 'text-[11px]', icon: 'w-3 h-3', px: 'px-2.5 py-1' },
  lg: { text: 'text-xs', icon: 'w-3.5 h-3.5', px: 'px-3 py-1.5' },
};

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({
  tier,
  size = 'md',
  showIcon = true,
}) => {
  const config = tierConfig[tier] || tierConfig.UNCLASSIFIED;
  const s = sizeMap[size];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 font-sans ${config.className} ${s.text} ${s.px}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {showIcon && <Icon className={s.icon} />}
      <span>{size === 'sm' ? config.shortLabel : config.label}</span>
    </span>
  );
};
