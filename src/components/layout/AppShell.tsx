import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  FlaskConical,
  ListFilter,
  Network,
  MapPin,
  SlidersHorizontal,
  FileText,
  Activity,
  ChevronLeft,
  ChevronRight,
  Clock,
  Zap,
  Menu,
  X,
} from 'lucide-react';

import { TrinetraLogo } from '../ui/TrinetraLogo';

export type NavPage =
  | 'command'
  | 'simulation'
  | 'incidents'
  | 'network'
  | 'cashout-map'
  | 'policy'
  | 'dossier'
  | 'health'
  | 'splash' | 'live-demo';

interface AppShellProps {
  activePage: NavPage;
  onNavigate: (page: NavPage) => void;
  backendOnline: boolean;
  activeDataset: 'SYNTHETIC_A' | 'IBM_B' | 'ELLIPTIC_C';
  onToggleDataset: (dataset: 'SYNTHETIC_A' | 'IBM_B' | 'ELLIPTIC_C') => void;
  children: React.ReactNode;
}

const NAV_ITEMS: { id: NavPage; label: string; code: string; icon: any; is3D?: boolean }[] = [
  { id: 'command', label: 'Command Center', code: 'CMD-01', icon: LayoutDashboard },
  { id: 'simulation', label: '3D Simulation Lab', code: 'SIM-3D', icon: FlaskConical, is3D: true },
  { id: 'incidents', label: 'Incident Queue', code: 'INC-QUEUE', icon: ListFilter },
  { id: 'network', label: '3D Network Explorer', code: 'NET-EXP', icon: Network },
  { id: 'cashout-map', label: 'Cash-Out Map', code: 'GEO-MAP', icon: MapPin },
  { id: 'policy', label: 'Threshold Policy', code: 'POL-TUNE', icon: SlidersHorizontal },
  { id: 'dossier', label: 'Case Dossiers', code: 'CASE-DOS', icon: FileText },
  { id: 'health', label: 'System Telemetry', code: 'SYS-MON', icon: Activity },
  { id: 'live-demo', label: 'Live Backend Demo', code: 'API-DEMO', icon: Zap },
];

const DATASET_LABEL: Record<'SYNTHETIC_A' | 'IBM_B' | 'ELLIPTIC_C', string> = {
  SYNTHETIC_A: 'A · Synthetic mule',
  IBM_B: 'B · IBM multi-bank',
  ELLIPTIC_C: 'C · Elliptic bitcoin',
};

export const AppShell: React.FC<AppShellProps> = ({
  activePage,
  onNavigate,
  backendOnline,
  activeDataset,
  onToggleDataset,
  children,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [time, setTime] = useState<{ ist: string; utc: string }>({ ist: '', utc: '' });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istStr = now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata' });
      const utcStr = now.toLocaleTimeString('en-GB', { timeZone: 'UTC' });
      setTime({ ist: istStr, utc: utcStr });
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const current = NAV_ITEMS.find((item) => item.id === activePage);

  const go = (page: NavPage) => {
    onNavigate(page);
    setMobileNav(false);
  };

  return (
    <div className="flex h-screen w-screen bg-[#F4F5F7] text-[#1E1E1E] font-sans antialiased overflow-hidden">
      {mobileNav && (
        <button
          type="button"
          aria-label="Close navigation"
          className="lg:hidden fixed inset-0 z-30 bg-[#1E1E1E]/25"
          onClick={() => setMobileNav(false)}
        />
      )}

      <aside
        className={`${collapsed ? 'lg:w-[84px]' : 'lg:w-[248px]'} w-[260px] fixed lg:static inset-y-0 left-0 z-40 flex-shrink-0 p-3 transition-transform duration-200 ${
          mobileNav ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-full bg-white border border-black/[0.06] rounded-3xl shadow-[0_10px_40px_rgba(30,30,30,0.05)] flex flex-col p-3">
          <div className="px-2 pt-1 pb-3 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => go('splash')}
              className="min-w-0 text-left rounded-2xl focus-visible:outline-none"
              title="Return to overview"
            >
              {collapsed && !mobileNav ? (
                <img src="/trinetra_logo.png" alt="Trinetraa" className="w-9 h-9 object-contain" />
              ) : (
                <TrinetraLogo size="sm" showLangBadge={false} intervalMs={2800} theme="light" />
              )}
            </button>
            <button
              type="button"
              className="lg:hidden p-2 rounded-xl text-[#6B7078] hover:bg-[#F4F5F7]"
              onClick={() => setMobileNav(false)}
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto pr-0.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              const showLabel = !collapsed || mobileNav;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => go(item.id)}
                  className={`w-full flex items-center gap-3 px-3 h-10 rounded-2xl text-[13px] transition-colors ${
                    isActive
                      ? 'bg-[#E8F7EC] text-[#06701C] font-medium'
                      : 'text-[#5C6370] hover:text-[#1E1E1E] hover:bg-[#F4F5F7]'
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#FF3D3D]' : 'text-[#8A9099]'}`} />
                  {showLabel && (
                    <span className="flex-1 text-left flex items-center justify-between truncate">
                      <span className="truncate">{item.label}</span>
                      {item.is3D && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${isActive ? 'bg-white text-[#06701C]' : 'bg-[#F4F5F7] text-[#6B7078]'}`}>
                          3D
                        </span>
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="space-y-2 pt-3 mt-2 border-t border-black/[0.06]">
            {(!collapsed || mobileNav) && (
              <div className="space-y-1">
                <span className="text-[#8A9099] font-medium tracking-wide block text-[10px] px-2">
                  Evaluation dataset
                </span>
                {(['SYNTHETIC_A', 'IBM_B', 'ELLIPTIC_C'] as const).map((ds) => (
                  <button
                    key={ds}
                    type="button"
                    onClick={() => onToggleDataset(ds)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xl text-[11px] font-medium truncate transition-colors ${
                      activeDataset === ds
                        ? 'bg-[#E8F7EC] text-[#06701C]'
                        : 'text-[#6B7078] hover:text-[#1E1E1E] hover:bg-[#F4F5F7]'
                    }`}
                  >
                    {DATASET_LABEL[ds]}
                  </button>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex w-full items-center justify-center gap-1.5 h-9 text-[#6B7078] hover:text-[#1E1E1E] border border-black/[0.06] hover:border-black/10 rounded-2xl transition-colors text-[11px]"
            >
              {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : (
                <>
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Collapse</span>
                </>
              )}
            </button>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 min-w-0 flex-col">
        <header className="h-16 px-4 md:px-6 flex items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              className="lg:hidden p-2 rounded-2xl bg-white border border-black/[0.06] text-[#1E1E1E] shadow-sm"
              onClick={() => setMobileNav(true)}
              aria-label="Open navigation"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="min-w-0">
              <h1 className="text-[17px] md:text-lg font-medium tracking-tight text-[#1E1E1E] truncate">
                {current?.label || 'Trinetraa'}
              </h1>
              <p className="text-[11px] text-[#8A9099] truncate">
                {current?.code} · AML predictive intelligence
              </p>
            </div>
          </div>

          <div className="hidden xl:flex items-center gap-2">
            <div className="flex items-center gap-1.5 h-8 px-3 rounded-full bg-white border border-signal-red/30 text-signal-red text-[11px] font-medium shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-signal-red" />
              Threat level DEFCON-2
            </div>
            <div className="flex items-center gap-1.5 h-8 px-3 rounded-full bg-white border border-black/[0.06] text-[11px] text-[#6B7078] shadow-sm">
              Dataset
              <span className="text-[#1E1E1E] font-medium">{activeDataset}</span>
            </div>
            <div className={`flex items-center gap-1.5 h-8 px-3 rounded-full bg-white border text-[11px] font-medium shadow-sm ${
              backendOnline ? 'border-signal-emerald/40 text-signal-emerald' : 'border-signal-amber/40 text-signal-amber'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${backendOnline ? 'bg-signal-emerald' : 'bg-signal-amber'}`} />
              {backendOnline ? 'API 200 OK' : 'Mock fallback'}
            </div>
          </div>

          <div className="flex items-center gap-2 text-[12px] text-[#6B7078]">
            <div className="hidden sm:flex items-center gap-1.5 h-8 px-3 rounded-full bg-white border border-black/[0.06] shadow-sm">
              <Clock className="w-3.5 h-3.5 text-[#8A9099]" />
              <span className="text-[#1E1E1E] font-medium tabular-nums">{time.ist || '00:00:00'}</span>
              <span className="text-[10px]">IST</span>
            </div>
            <div className="hidden md:flex items-center h-8 px-3 rounded-full bg-white border border-black/[0.06] shadow-sm tabular-nums">
              <span>{time.utc || '00:00:00'}</span>
              <span className="text-[10px] ml-1">UTC</span>
            </div>
          </div>
        </header>

        <main className="flex-1 px-3 md:px-6 pb-3 overflow-y-auto min-w-0">
          {children}
        </main>

        <footer className="h-9 mx-3 md:mx-6 mb-3 px-4 rounded-full bg-white border border-black/[0.06] shadow-sm flex items-center justify-between text-[11px] text-[#6B7078] flex-shrink-0 overflow-hidden">
          <div className="flex items-center gap-3 min-w-0">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-signal-cyan" />
              Stream <strong className="text-signal-cyan font-medium">1,448.90 tx/sec</strong>
            </span>
            <span className="hidden sm:inline text-black/15">/</span>
            <span className="hidden sm:inline">Chains <strong className="text-signal-amber font-medium">48 rings</strong></span>
            <span className="hidden md:inline text-black/15">/</span>
            <span className="hidden md:inline">Exposure <strong className="text-signal-exit font-medium">₹4.82 Cr</strong></span>
          </div>
          <div className="hidden lg:flex items-center gap-3">
            <span>Graph <strong className="text-signal-cyan font-medium">750 nodes / 5,000 edges</strong></span>
            <span className="text-black/15">/</span>
            <span>Policy <strong className="text-signal-cyan font-medium">τ = 0.50</strong></span>
            <span className="text-black/15">/</span>
            <span className="text-signal-emerald font-medium">P50 71.67ms · SLA ok</span>
          </div>
        </footer>
      </div>
    </div>
  );
};
