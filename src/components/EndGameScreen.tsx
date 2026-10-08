import { motion } from 'framer-motion';
import { Clock, HeartCrack, RotateCcw, Trophy } from 'lucide-react';
import Mascot from './Mascot';
import { formatSeconds, formatVND } from '../utils/format';
import type { Outcome } from '../hooks/useGameEngine';

interface EndGameScreenProps {
  outcome: Outcome;
  balance: number;
  hp: number;
  trapsHit: number;
  dodges: number;
  bestStreak: number;
  averageReactionMs: number;
  netLost: number;
  /** Danh hiệu meme của người chơi */
  title: string;
  onRestart: () => void;
  onOpenLeaderboard: () => void;
}

/** 🏁 EndGameScreen — tổng kết hành trình + danh hiệu meme + lối vào bảng xếp hạng. */
export default function EndGameScreen({
  outcome,
  balance,
  hp,
  trapsHit,
  dodges,
  bestStreak,
  averageReactionMs,
  netLost,
  title,
  onRestart,
  onOpenLeaderboard,
}: EndGameScreenProps) {
  const win = outcome === 'win';

  const stats = [
    { label: 'Ví còn lại', value: formatVND(balance), emoji: '🐷' },
    { label: 'Tâm lý', value: `${Math.round(hp)}/100`, emoji: '💖' },
    { label: 'Sập bẫy', value: `${trapsHit} lần`, emoji: '🤡' },
    { label: 'Né bẫy', value: `${dodges} lần`, emoji: '🛡️' },
    { label: 'Chuỗi né dài nhất', value: `${bestStreak}`, emoji: '🔥' },
    {
      label: 'Phản xạ trung bình',
      value: averageReactionMs ? formatSeconds(averageReactionMs) : '—',
      emoji: '⚡',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="cs-paper cs-bunnies cs-scroll flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-5 pt-4"
    >
      <div className="flex flex-col items-center text-center">
        <div
          className={`grid h-24 w-24 place-items-center rounded-full border-4 border-white shadow-soft ${
            win ? 'bg-gradient-to-br from-butter to-butter-deep' : 'bg-gradient-to-br from-peach to-taro'
          } ${win ? 'cs-bob' : 'cs-shake'}`}
        >
          <Mascot mood={win ? 'cool' : 'cry'} size={78} />
        </div>

        <span className="mt-2 flex items-center gap-1 rounded-full border-2 border-white bg-white/80 px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest text-ink-soft">
          {win ? <Trophy size={11} strokeWidth={3} className="text-butter-deep" /> : <HeartCrack size={11} strokeWidth={3} className="text-peach-deep" />}
          Kết quả hành trình
        </span>

        <h2 className="font-cute mt-1.5 text-[17px] font-extrabold leading-tight text-ink">
          {win ? 'CHIẾN THẦN AN NINH MẠNG! 🏆' : 'CHÁY TÚI TRÊN KHÔNG GIAN MẠNG! 🥺'}
        </h2>
        <p className="mt-1 text-[10.5px] font-semibold leading-relaxed text-ink-soft">
          {win
            ? 'Không một cuộc gọi mạo danh, file APK hay clip deepfake nào qua mắt được bạn. Heo Tiết Kiệm xin cảm ơn!'
            : 'Ví đã bốc hơi hoặc tâm lý đã cạn kiệt. Nhưng không sao, học phí này sẽ giúp bạn khôn hơn ở đời thật!'}
        </p>

        <div className="mt-2.5 w-full rounded-blob border-2 border-dashed border-taro-deep/50 bg-white/85 px-3 py-2">
          <div className="text-[8.5px] font-extrabold uppercase tracking-widest text-ink-soft">
            Danh hiệu của bạn
          </div>
          <div className="text-[12px] font-extrabold text-peach-deep">{title}</div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index }}
            className="rounded-2xl border-2 border-white bg-white/80 px-2.5 py-2 shadow-sm"
          >
            <div className="text-[8.5px] font-extrabold uppercase tracking-wide text-ink-soft">
              {stat.emoji} {stat.label}
            </div>
            <div className="font-mono text-[11.5px] font-extrabold text-ink">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {netLost > 0 && (
        <div className="mt-2 flex items-center gap-1.5 rounded-2xl border-2 border-peach/50 bg-peach/15 px-3 py-2 text-[10px] font-bold text-peach-deep">
          <Clock size={12} strokeWidth={3} />
          Tổng "học phí" đã trả cho scammer: {formatVND(netLost)} 💸
        </div>
      )}

      <div className="mt-auto space-y-2 pt-4">
        <button
          type="button"
          onClick={onRestart}
          className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/70 bg-gradient-to-r from-peach-deep to-taro-deep py-3 text-[11.5px] font-extrabold uppercase tracking-wide text-white shadow-soft"
        >
          <RotateCcw size={15} strokeWidth={3} /> Chơi lại từ đầu
        </button>
        <button
          type="button"
          onClick={onOpenLeaderboard}
          className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-dashed border-taro-deep/60 bg-white/80 py-2.5 text-[11px] font-extrabold text-taro-deep transition-colors hover:bg-butter/30"
        >
          <Trophy size={14} strokeWidth={3} /> So tài với bảng xếp hạng
        </button>
      </div>
    </motion.div>
  );
}
