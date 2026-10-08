import { motion } from 'framer-motion';
import { Gamepad2, Trophy } from 'lucide-react';
import type { AppTab } from '../types';

interface PhoneTabBarProps {
  tab: AppTab;
  onChange: (tab: AppTab) => void;
  /** Có vụ án đang chạy hay không (để hiện chấm đỏ thông báo) */
  hasActiveRun?: boolean;
}

const TABS: { id: AppTab; label: string; icon: typeof Gamepad2 }[] = [
  { id: 'game', label: 'Chơi Game', icon: Gamepad2 },
  { id: 'leaderboard', label: 'Bảng Xếp Hạng', icon: Trophy },
];

/**
 * 🎀 PhoneTabBar — nút chuyển đổi nhanh giữa "Chơi Game" và "Bảng Xếp Hạng / Bạn Bè".
 */
export default function PhoneTabBar({ tab, onChange, hasActiveRun = false }: PhoneTabBarProps) {
  return (
    <nav className="relative z-30 shrink-0 border-t-2 border-dashed border-taro/70 bg-cream/95 px-3 pb-2 pt-2 backdrop-blur">
      <div className="relative flex items-center gap-1 rounded-full border-2 border-taro/60 bg-white/70 p-1 shadow-inner">
        {TABS.map(({ id, label, icon: Icon }) => {
          const active = tab === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={`relative flex flex-1 items-center justify-center gap-1.5 rounded-full px-2 py-2 text-[11px] font-extrabold transition-colors ${
                active ? 'text-white' : 'text-ink-soft hover:text-ink'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="tab-pill"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-peach-deep to-taro-deep shadow-soft"
                />
              )}
              <Icon size={14} strokeWidth={3} className="relative z-10" />
              <span className="relative z-10">{label}</span>
              {id === 'leaderboard' && hasActiveRun && !active && (
                <span className="relative z-10 h-1.5 w-1.5 rounded-full bg-peach-deep" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
