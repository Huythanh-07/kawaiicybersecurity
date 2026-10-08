import { useEffect, useState } from 'react';
import { BatteryFull, Signal, Wifi } from 'lucide-react';
import { formatClock } from '../utils/format';

interface StatusBarProps {
  /** Nội dung viên thuốc Dynamic Island */
  islandLabel: string;
  islandEmoji?: string;
  /** Xanh mint = an toàn, hồng đào = đang gặp nguy hiểm */
  tone?: 'safe' | 'danger' | 'neutral';
}

export default function StatusBar({ islandLabel, islandEmoji = '🐰', tone = 'neutral' }: StatusBarProps) {
  const [clock, setClock] = useState(() => formatClock(new Date()));

  useEffect(() => {
    const timer = window.setInterval(() => setClock(formatClock(new Date())), 15_000);
    return () => window.clearInterval(timer);
  }, []);

  const toneClass =
    tone === 'danger'
      ? 'bg-peach/40 border-peach text-peach-deep'
      : tone === 'safe'
        ? 'bg-mint/50 border-mint-deep text-emerald-700'
        : 'bg-cream border-taro text-ink';

  return (
    <header className="relative z-30 flex h-11 shrink-0 items-center justify-between px-5 pt-1 text-[11px] font-bold text-ink">
      <span className="font-mono tracking-tight">{clock}</span>

      {/* 🍬 Dynamic Island */}
      <div
        className={`absolute left-1/2 top-2 flex max-w-[62%] -translate-x-1/2 items-center gap-1.5 rounded-full border-2 px-2.5 py-1 shadow-sm transition-colors ${toneClass}`}
      >
        <span className="text-[11px] leading-none">{islandEmoji}</span>
        <span className="truncate text-[10px] leading-none">{islandLabel}</span>
      </div>

      <div className="flex items-center gap-1.5 text-ink-soft">
        <Signal size={12} strokeWidth={3} />
        <Wifi size={12} strokeWidth={3} />
        <span className="text-[9px] font-extrabold">5G</span>
        <BatteryFull size={14} strokeWidth={2.5} className="text-emerald-500" />
      </div>
    </header>
  );
}
