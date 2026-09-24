import React from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import {
  ShieldAlert,
  Zap,
  FlaskConical,
  MapPin,
  SlidersHorizontal,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { NavPage } from '../layout/AppShell';

interface CommandHeroBannerProps {
  onNavigate?: (page: NavPage) => void;
}

export const CommandHeroBanner: React.FC<CommandHeroBannerProps> = ({ onNavigate }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 25 });
  const spotlightBg = useMotionTemplate`radial-gradient(450px circle at ${springX}px ${springY}px, rgba(255, 61, 61, 0.08), transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative bg-white border border-black/[0.06] p-5 md:p-6 rounded-3xl shadow-saas-card overflow-hidden"
    >
      {/* Motion Spotlight Beam */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: spotlightBg }}
      />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        {/* Left: Industrial Intelligence Status */}
        <div className="space-y-2 max-w-2xl font-sans">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 bg-signal-red/10 border border-signal-red/20 text-signal-red text-[11px] font-medium rounded-full">
              DEFCON-2 · Real-time surveillance
            </span>
            <span className="px-2.5 py-1 bg-signal-emerald/10 border border-signal-emerald/20 text-signal-emerald text-[11px] font-medium rounded-full">
              GraphSAGE GNN v2.4 operational
            </span>
            <span className="px-2.5 py-1 bg-signal-emerald/10 border border-signal-emerald/20 text-signal-emerald text-[11px] font-medium rounded-full">
              Terminal MRR 1.0000
            </span>
          </div>

          <h1 className="text-xl md:text-[26px] font-medium font-sans text-[#1E1E1E] tracking-tight leading-tight">
            Cybercrime predictive analytics — <span className="text-[#FF3D3D]">AML and mule-chain</span> detection
          </h1>

          <p className="text-xs text-slate-500 leading-relaxed max-w-xl font-sans">
            An end-to-end graph-native framework for financial cybercrime complaint resolution, multi-hop mule graph extraction, inductive GraphSAGE detection, and terminal cash-out prediction.
          </p>
        </div>

        {/* Right: Quick Launchpad Action Buttons */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-auto flex-shrink-0 font-sans">
          <motion.button
            onClick={() => onNavigate?.('simulation')}
            className="px-5 h-10 bg-[#FF3D3D] hover:bg-[#078A22] text-white font-medium text-[12px] flex items-center justify-center gap-2 rounded-full shadow-sm transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FlaskConical className="w-4 h-4 fill-current" />
            <span>LAUNCH 3D SIMULATION LAB</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>

          <div className="flex flex-wrap items-center gap-2">
            <motion.button
              onClick={() => onNavigate?.('cashout-map')}
              className="shrink-0 whitespace-nowrap px-3 h-9 bg-white hover:bg-[#F4F5F7] border border-black/[0.06] text-[#FF3D3D] text-[11px] font-medium flex items-center justify-center gap-1.5 rounded-full transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>CASH-OUT MAP</span>
            </motion.button>

            <motion.button
              onClick={() => onNavigate?.('policy')}
              className="shrink-0 whitespace-nowrap px-3 h-9 bg-white hover:bg-[#F4F5F7] border border-black/[0.06] text-[#3D4450] hover:text-[#1E1E1E] text-[11px] font-medium flex items-center justify-center gap-1.5 rounded-full transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" />
              <span>POLICY (τ)</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};
