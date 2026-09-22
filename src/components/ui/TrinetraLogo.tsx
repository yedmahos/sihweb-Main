import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';

export interface RegionalLanguageOption {
  script: string;
  prefix: string;
  lang: string;
  code: string;
  nativeName: string;
}

export const REGIONAL_TRI_LANGUAGES: RegionalLanguageOption[] = [
  { script: 'devanagari', prefix: 'त्रि', lang: 'Hindi / Sanskrit', code: 'HI', nativeName: 'हिन्दी / संस्कृत' },
  { script: 'bengali', prefix: 'ত্রি', lang: 'Bengali / Bangla', code: 'BN', nativeName: 'বাংলা' },
  { script: 'tamil', prefix: 'த்ரி', lang: 'Tamil', code: 'TA', nativeName: 'தமிழ்' },
  { script: 'telugu', prefix: 'త్రి', lang: 'Telugu', code: 'TE', nativeName: 'తెలుగు' },
  { script: 'kannada', prefix: 'ತ್ರಿ', lang: 'Kannada', code: 'KN', nativeName: 'ಕನ್ನಡ' },
  { script: 'malayalam', prefix: 'ത്രി', lang: 'Malayalam', code: 'ML', nativeName: 'മലയാളം' },
  { script: 'gujarati', prefix: 'ત્રિ', lang: 'Gujarati', code: 'GU', nativeName: 'ગુજરાતી' },
  { script: 'odia', prefix: 'ତ୍ରି', lang: 'Odia', code: 'OR', nativeName: 'ଓଡ଼ିଆ' },
  { script: 'gurmukhi', prefix: 'ਤ੍ਰਿ', lang: 'Punjabi', code: 'PA', nativeName: 'ਪੰਜਾਬੀ' },
  { script: 'latin', prefix: 'TRI', lang: 'English', code: 'EN', nativeName: 'English' },
];

interface TrinetraLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero' | 'landing' | 'footer';
  layout?: 'inline' | 'stacked';
  showIcon?: boolean;
  showSuffix?: boolean;
  showLangBadge?: boolean;
  className?: string;
  intervalMs?: number;
  interactive?: boolean;
  theme?: 'light' | 'dark';
}

export const TrinetraLogo: React.FC<TrinetraLogoProps> = ({
  size = 'md',
  layout = 'inline',
  showIcon = true,
  showSuffix = true,
  showLangBadge = false,
  className = '',
  intervalMs = 2600,
  interactive = true,
  theme = 'light',
}) => {
  const [langIdx, setLangIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLangIdx((prev) => (prev + 1) % REGIONAL_TRI_LANGUAGES.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs]);

  const current = REGIONAL_TRI_LANGUAGES[langIdx];

  // Optical shift so non-Latin "tri" sits with the NETRAA caps. English stays put.
  const footerPrefixNudge: Record<string, string> = {
    devanagari: 'translate-y-[0.12em]',
    bengali: 'translate-y-[0.11em]',
    tamil: '-translate-y-[0.08em]',
    telugu: '-translate-y-[0.14em]',
    kannada: '-translate-y-[0.16em]',
    malayalam: '-translate-y-[0.05em]',
    gujarati: 'translate-y-[0.08em]',
    odia: 'translate-y-[0.02em]',
    gurmukhi: '-translate-y-[0.02em]',
    latin: '',
  };

  // Footer Expanded Layout
  if (size === 'footer') {
    return (
      <div
        className={`flex flex-col sm:flex-row items-start sm:items-center gap-5 select-none cursor-pointer group ${className}`}
        onClick={interactive ? () => setLangIdx((prev) => (prev + 1) % REGIONAL_TRI_LANGUAGES.length) : undefined}
        title="Team Trinetra — Click to switch regional script"
      >
        {showIcon && (
          <div className="relative rounded-2xl p-2 bg-white border border-slate-200 shadow-md group-hover:border-[#FF3D3D]/40 transition-all flex-shrink-0">
            <img
              src="/trinetra_logo.png"
              alt="Team Trinetra Emblem"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-sm"
            />
          </div>
        )}

        <div className="space-y-1.5 text-left">
          <div className="flex items-baseline font-sans font-bold tracking-tight text-slate-900 text-2xl sm:text-3xl">
            <div className={`relative inline-block overflow-visible leading-none ${footerPrefixNudge[current.script] || ''}`}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={current.script}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block text-[#FF3D3D] leading-none"
                >
                  {current.prefix}
                </motion.span>
              </AnimatePresence>
            </div>
            {showSuffix && (
              <span className="tracking-[0.1em] text-slate-900 ml-1 font-bold">
                NETRAA
              </span>
            )}
          </div>

          <p className="text-xs text-slate-600 font-sans leading-relaxed max-w-sm">
            National Cybercrime AML & Mule-Chain Predictive Intelligence Platform · Frontline Defense System.
          </p>
        </div>
      </div>
    );
  }

  // Inline layouts. `landing` is used only by the landing-page hero brand.
  const sizeConfig = {
    sm: {
      imgSize: 'w-7 h-7',
      textSize: 'text-sm sm:text-base',
      prefixSize: 'text-sm sm:text-base font-bold',
      badgeSize: 'text-[9px] px-1.5 py-0.2',
      gap: 'gap-2',
      frame: 'rounded-xl p-1.5',
      prefixSlot: 'overflow-hidden min-w-[1.2em]',
      suffixGap: 'ml-0.5',
    },
    md: {
      imgSize: 'w-9 h-9',
      textSize: 'text-lg sm:text-xl',
      prefixSize: 'text-lg sm:text-xl font-bold',
      badgeSize: 'text-[10px] px-2 py-0.5',
      gap: 'gap-2.5',
      frame: 'rounded-xl p-1.5',
      prefixSlot: 'overflow-hidden min-w-[1.2em]',
      suffixGap: 'ml-0.5',
    },
    lg: {
      imgSize: 'w-13 h-13',
      textSize: 'text-2xl sm:text-3xl',
      prefixSize: 'text-2xl sm:text-3xl font-bold',
      badgeSize: 'text-xs px-2.5 py-1',
      gap: 'gap-3',
      frame: 'rounded-xl p-1.5',
      prefixSlot: 'overflow-hidden min-w-[1.2em]',
      suffixGap: 'ml-0.5',
    },
    landing: {
      imgSize: 'w-14 h-14 sm:w-16 sm:h-16',
      textSize: 'text-[1.75rem] leading-none sm:text-[2.125rem]',
      prefixSize: 'text-[1.75rem] font-bold leading-[1.5] sm:text-[2.125rem]',
      badgeSize: 'text-[11px] px-2 py-0.5 whitespace-nowrap',
      gap: 'gap-3 sm:gap-3.5',
      frame: 'rounded-2xl p-2',
      prefixSlot: 'overflow-visible leading-[1.5]',
      suffixGap: 'ml-2',
    },
  }[size as 'sm' | 'md' | 'lg' | 'landing'] || {
    imgSize: 'w-9 h-9',
    textSize: 'text-lg sm:text-xl',
    prefixSize: 'text-lg sm:text-xl font-bold',
    badgeSize: 'text-[10px] px-2 py-0.5',
    gap: 'gap-2.5',
    frame: 'rounded-xl p-1.5',
    prefixSlot: 'overflow-hidden min-w-[1.2em]',
    suffixGap: 'ml-0.5',
  };

  const isLanding = size === 'landing';

  return (
    <div
      className={`inline-flex items-center ${sizeConfig.gap} select-none ${className}`}
      onClick={interactive ? () => setLangIdx((prev) => (prev + 1) % REGIONAL_TRI_LANGUAGES.length) : undefined}
      title={interactive ? 'Team Trinetra — Click to switch script' : undefined}
      style={{ cursor: interactive ? 'pointer' : 'default' }}
    >
      {/* Emblem */}
      {showIcon && (
        <div className="relative flex-shrink-0 flex items-center justify-center">
          <div className={`relative overflow-hidden bg-white border border-slate-200 hover:border-[#FF3D3D]/40 transition-colors shadow-sm ${sizeConfig.frame}`}>
            <img
              src="/trinetra_logo.png"
              alt="Team Trinetra Logo"
              className={`${sizeConfig.imgSize} object-contain drop-shadow-sm`}
            />
          </div>
        </div>
      )}

      {/* Dynamic Wordmark */}
      <div className={`flex flex-col text-left leading-none ${isLanding ? 'relative' : ''}`}>
        <div className={`flex items-baseline font-sans font-bold tracking-tight text-slate-900 ${sizeConfig.textSize}`}>
          <div className={`relative inline-block shrink-0 text-right ${sizeConfig.prefixSlot}`}>
            <AnimatePresence mode="wait">
              <motion.span
                key={current.script}
                initial={isLanding ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.9 }}
                animate={isLanding ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                exit={isLanding ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.9 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={`inline-block text-[#FF3D3D] ${sizeConfig.prefixSize}`}
              >
                {current.prefix}
              </motion.span>
            </AnimatePresence>
          </div>

          {showSuffix && (
            <span className={`tracking-[0.1em] text-slate-900 font-bold ${sizeConfig.suffixGap}`}>
              NETRAA
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
