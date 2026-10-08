import { motion } from 'framer-motion';
import { Clock3, ShieldCheck, Skull } from 'lucide-react';
import { compactVND, formatSeconds, formatVND } from '../utils/format';
import { moneyLost } from '../data/leaderboardData';
import type { LeaderboardCategory, Player } from '../types';

interface PlayerRowProps {
  player: Player;
  rank: number;
  category: LeaderboardCategory;
}

const medal = (rank: number) => (rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : null);

/** 🏅 PlayerRow — 1 dòng trong bảng xếp hạng, có highlight "BẠN". */
export default function PlayerRow({ player, rank, category }: PlayerRowProps) {
  const isGuardian = category === 'guardians';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ type: 'spring', stiffness: 320, damping: 30 }}
      className={`flex items-center gap-2.5 rounded-blob border-2 px-2.5 py-2 shadow-sm ${
        player.isYou
          ? 'border-peach-deep/70 bg-gradient-to-r from-butter/50 to-peach/25'
          : 'border-white bg-white/85'
      }`}
    >
      {/* Thứ hạng */}
      <div className="w-6 shrink-0 text-center">
        {medal(rank) ? (
          <span className="text-lg leading-none">{medal(rank)}</span>
        ) : (
          <span className="font-mono text-[11px] font-extrabold text-ink-soft">{rank}</span>
        )}
      </div>

      {/* Avatar chibi */}
      <div
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-white text-lg shadow-sm ${player.avatarBg}`}
      >
        {player.avatar}
      </div>

      {/* Tên + danh hiệu */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-[11px] font-extrabold text-ink">{player.name}</span>
          {player.isYou && (
            <span className="shrink-0 rounded-full bg-peach-deep px-1.5 py-[1px] text-[7.5px] font-extrabold uppercase text-white">
              Bạn
            </span>
          )}
        </div>
        <div className="truncate text-[8.5px] font-bold text-ink-soft">{player.badge}</div>
        <div className="mt-0.5 flex items-center gap-1">
          <span className="flex shrink-0 items-center gap-0.5 rounded-full bg-taro/50 px-1.5 py-[1px] text-[8px] font-extrabold text-taro-deep">
            <Clock3 size={8} strokeWidth={3} /> {formatSeconds(player.reactionMs)}
          </span>
          <span
            className={`flex shrink-0 items-center gap-0.5 rounded-full px-1.5 py-[1px] text-[8px] font-extrabold ${
              player.trapsHit === 0 ? 'bg-mint/50 text-emerald-700' : 'bg-peach/40 text-peach-deep'
            }`}
          >
            {player.trapsHit === 0 ? <ShieldCheck size={8} strokeWidth={3} /> : <Skull size={8} strokeWidth={3} />}
            {player.trapsHit} bẫy
          </span>
        </div>
      </div>

      {/* Điểm số */}
      <div className="shrink-0 text-right">
        <div
          className={`font-mono text-[11.5px] font-extrabold ${
            isGuardian ? 'text-emerald-600' : 'text-peach-deep'
          }`}
        >
          {isGuardian ? formatVND(player.moneyLeft) : `-${formatVND(moneyLost(player))}`}
        </div>
        <div className="text-[8px] font-bold uppercase tracking-wide text-ink-soft">
          {isGuardian ? 'ví còn lại' : `rớt ${compactVND(moneyLost(player))}đ`}
        </div>
      </div>
    </motion.div>
  );
}
