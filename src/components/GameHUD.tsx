import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HeartPulse, ShieldAlert, Wallet } from 'lucide-react';
import { formatVND } from '../utils/format';

interface GameHUDProps {
  balance: number;
  hp: number;
  scenarioIndex: number;
  totalScenarios: number;
  trapsHit: number;
  /** Tăng lên mỗi lần sập bẫy → kích hoạt heo khóc mếu 🥺 */
  shakeKey: number;
}

export default function GameHUD({
  balance,
  hp,
  scenarioIndex,
  totalScenarios,
  trapsHit,
  shakeKey,
}: GameHUDProps) {
  const [crying, setCrying] = useState(false);

  useEffect(() => {
    if (shakeKey === 0) return;
    setCrying(true);
    const timer = window.setTimeout(() => setCrying(false), 1500);
    return () => window.clearTimeout(timer);
  }, [shakeKey]);

  const hpTone =
    hp <= 30
      ? { bar: 'from-peach-deep to-peach', text: 'text-peach-deep', label: 'Tâm lý đang run 🥺' }
      : hp <= 60
        ? { bar: 'from-butter-deep to-butter', text: 'text-amber-600', label: 'Hơi hoang mang 😵‍💫' }
        : { bar: 'from-mint-deep to-babysky-deep', text: 'text-emerald-600', label: 'Thảnh thơi 💖' };

  return (
    <section className="relative z-20 shrink-0 border-b-2 border-dashed border-taro/70 bg-cream/85 px-4 py-2.5 backdrop-blur">
      <div className="flex items-stretch gap-2">
        {/* 🐷 Heo Tiết Kiệm */}
        <div className="flex flex-1 items-center gap-2 rounded-blob border-2 border-mint-deep/40 bg-mint/25 px-2.5 py-1.5 shadow-[0_6px_16px_-10px_rgba(111,214,180,0.9)]">
          <div
            key={`pig-${shakeKey}`}
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-white bg-butter/70 text-lg shadow-sm ${
              crying ? 'cs-shake' : 'cs-bob'
            }`}
          >
            {crying ? '😭' : '🐷'}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-wide text-ink-soft">
              <Wallet size={10} strokeWidth={3} /> Heo Tiết Kiệm
            </div>
            <div className="relative h-4 overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={balance}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                  className={`font-mono text-[13px] font-extrabold leading-4 ${
                    balance <= 5_000_000 ? 'text-peach-deep' : 'text-emerald-600'
                  }`}
                >
                  {formatVND(balance)}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* 💖 Tâm Lý Thảnh Thơi */}
        <div className="flex flex-1 items-center gap-2 rounded-blob border-2 border-peach/50 bg-peach/20 px-2.5 py-1.5 shadow-[0_6px_16px_-10px_rgba(255,143,163,0.9)]">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-white bg-cream text-lg shadow-sm">
            {hp <= 30 ? '💔' : hp <= 60 ? '💗' : '💖'}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1">
              <span className="flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-wide text-ink-soft">
                <HeartPulse size={10} strokeWidth={3} /> Tâm Lý
              </span>
              <span className={`font-mono text-[10px] font-extrabold ${hpTone.text}`}>
                {Math.round(hp)}/100
              </span>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full border border-white bg-white/70">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${hpTone.bar}`}
                animate={{ width: `${hp}%` }}
                transition={{ type: 'spring', stiffness: 160, damping: 22 }}
              />
            </div>
            <div className={`truncate text-[8px] font-bold ${hpTone.text}`}>{hpTone.label}</div>
          </div>
        </div>
      </div>

      {/* Tiến độ hành trình */}
      <div className="mt-2 flex items-center justify-between gap-2 text-[9px] font-extrabold text-ink-soft">
        <span className="flex items-center gap-1">
          <ShieldAlert size={10} strokeWidth={3} className="text-peach-deep" />
          VỤ ÁN {Math.min(scenarioIndex + 1, totalScenarios)}/{totalScenarios} • SẬP BẪY: {trapsHit} 🤡
        </span>
        <div className="flex items-center gap-1">
          {Array.from({ length: totalScenarios }).map((_, index) => (
            <span
              key={index}
              className={`h-1.5 w-3 rounded-full ${
                index < scenarioIndex ? 'bg-mint-deep' : index === scenarioIndex ? 'bg-peach' : 'bg-taro/70'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
