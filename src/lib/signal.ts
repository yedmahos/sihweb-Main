/** Semantic data colors. Hex values match the signal tokens in tailwind.config.js. */
export const SIGNAL = {
  orange: '#FF5500',
  amber: '#F59E0B',
  red: '#EF4444',
  emerald: '#10B981',
  cobalt: '#38BDF8',
  cyan: '#22D3EE',
  exit: '#F97316',
  ink: '#1E1E1E',
} as const;

export const tierTextClass = (isHigh: boolean, isMedium: boolean) =>
  isHigh ? 'text-signal-red' : isMedium ? 'text-signal-amber' : 'text-signal-emerald';

export const tierBarClass = (isHigh: boolean, isMedium: boolean) =>
  isHigh ? 'bg-signal-red' : isMedium ? 'bg-signal-amber' : 'bg-signal-emerald';

export const tierBadgeClass = (isHigh: boolean, isMedium: boolean) =>
  isHigh
    ? 'bg-signal-red/15 text-signal-red border-signal-red/30'
    : isMedium
      ? 'bg-signal-amber/15 text-signal-amber border-signal-amber/30'
      : 'bg-signal-emerald/15 text-signal-emerald border-signal-emerald/30';

export const riskHex = (isHigh: boolean, isMedium: boolean) =>
  isHigh ? SIGNAL.red : isMedium ? SIGNAL.amber : SIGNAL.emerald;

export const probabilityBarClass = (value: number) =>
  value >= 0.7 ? 'bg-signal-red' : value >= 0.35 ? 'bg-signal-amber' : 'bg-signal-emerald';

export const probabilityTextClass = (value: number) =>
  value >= 0.7 ? 'text-signal-red' : value >= 0.35 ? 'text-signal-amber' : 'text-signal-emerald';
