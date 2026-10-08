import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Crown, Gamepad2, Rabbit } from 'lucide-react';
import { LIVE_FEED_EVENTS, MOCK_PLAYERS, sortByCategory } from '../data/leaderboardData';
import type { LeaderboardCategory, Player } from '../types';
import PlayerRow from './PlayerRow';
import { LiveFeedMarquee } from './LiveFeedTicker';

interface LeaderboardScreenProps {
  /** Người chơi hiện tại (tính theo kết quả run) — sẽ được ghim vào bảng */
  me: Player;
  onSwitchToGame: () => void;
}

const CATEGORIES: { id: LeaderboardCategory; label: string; emoji: string }[] = [
  { id: 'guardians', label: 'Thần Giữ Của', emoji: '🏆' },
  { id: 'victims', label: 'Cừu Non Đáng Thương', emoji: '🐑' },
];

/**
 * 🏆 LeaderboardScreen — toàn cảnh đồng đội: 2 bảng vui nhộn
 * "Thánh Cảnh Giác" vs "Cừu Non" + live feed người chơi xung quanh.
 */
export default function LeaderboardScreen({ me, onSwitchToGame }: LeaderboardScreenProps) {
  const [category, setCategory] = useState<LeaderboardCategory>('guardians');

  const rankedPlayers = useMemo(() => {
    const merged: Player[] = [...MOCK_PLAYERS];
    const existing = merged.findIndex((player) => player.id === me.id);
    if (existing >= 0) {
      merged[existing] = me;
    } else {
      merged.push(me);
    }
    return sortByCategory(merged, category);
  }, [category, me]);

  const categoryMeta = CATEGORIES.find((item) => item.id === category)!;

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-cream/60">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-dashed border-taro/70 bg-white/80 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-gradient-to-br from-butter to-peach text-lg shadow-sm">
            🏆
          </span>
          <div>
            <div className="text-[12px] font-extrabold text-ink">Bảng Xếp Hạng</div>
            <div className="text-[8.5px] font-bold text-ink-soft">So tài cùng 15 người chơi khác</div>
          </div>
        </div>
        <button
          type="button"
          onClick={onSwitchToGame}
          className="flex items-center gap-1 rounded-full border-2 border-taro/70 bg-taro/30 px-2.5 py-1 text-[9.5px] font-extrabold text-ink transition-colors hover:bg-butter/40"
        >
          <Gamepad2 size={12} strokeWidth={3} /> Chơi ngay
        </button>
      </div>

      {/* Người chơi xung quanh */}
      <LiveFeedMarquee events={LIVE_FEED_EVENTS} />

      {/* 2 cúp vui nhộn */}
      <div className="relative flex shrink-0 items-center gap-1 px-3 pt-2.5">
        {CATEGORIES.map((item) => {
          const active = category === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setCategory(item.id)}
              className={`relative flex flex-1 items-center justify-center gap-1.5 rounded-full px-2 py-2 text-[10px] font-extrabold transition-colors ${
                active ? 'text-white' : 'text-ink-soft hover:text-ink'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="lb-pill"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  className={`absolute inset-0 rounded-full shadow-soft ${
                    item.id === 'guardians'
                      ? 'bg-gradient-to-r from-butter-deep to-babysky-deep'
                      : 'bg-gradient-to-r from-peach to-peach-deep'
                  }`}
                />
              )}
              <span className="relative z-10">{item.emoji}</span>
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Mô tả hạng mục */}
      <motion.div
        key={categoryMeta.label}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-3 mt-2 flex items-start gap-1.5 rounded-2xl border-2 border-dashed border-taro/60 bg-taro/20 px-2.5 py-1.5"
      >
        {category === 'guardians' ? (
          <Crown size={13} strokeWidth={3} className="mt-0.5 shrink-0 text-amber-500" />
        ) : (
          <Rabbit size={13} strokeWidth={3} className="mt-0.5 shrink-0 text-peach-deep" />
        )}
        <p className="text-[9px] font-bold leading-snug text-ink-soft">
          {category === 'guardians'
            ? 'Cúp "Thánh Cảnh Giác" — xếp theo số lần sập bẫy ít nhất, phản xạ né scam nhanh nhất, rồi đến số tiền giữ được.'
            : 'Cúp "Cừu Non Đáng Thương" — xếp theo số tiền mất nhiều nhất và số lần dính bẫy đáng yêu nhất. Danh hiệu meme cực chất!'}
        </p>
      </motion.div>

      {/* Danh sách */}
      <div className="cs-scroll mt-2 flex-1 space-y-1.5 overflow-y-auto px-3 pb-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {rankedPlayers.map((player, index) => (
            <PlayerRow key={player.id} player={player} rank={index + 1} category={category} />
          ))}
        </AnimatePresence>

        <div className="flex items-center justify-center gap-1 py-1 text-[8.5px] font-bold text-ink-soft">
          <Rabbit size={12} strokeWidth={3} className="text-peach-deep" />
          Hàng dưới còn đông lắm nha — thoát ra lướt app khác rồi 🐰
        </div>
      </div>
    </div>
  );
}