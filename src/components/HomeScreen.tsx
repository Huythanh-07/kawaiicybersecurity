import { motion } from 'framer-motion';
import { Heart, PiggyBank, Play, Sparkles, Trophy } from 'lucide-react';
import Mascot from './Mascot';
import { formatVND } from '../utils/format';
import { START_MONEY } from '../data/leaderboardData';

interface HomeScreenProps {
  onStart: () => void;
  onOpenLeaderboard: () => void;
}

const TRAP_CHIPS = [
  { emoji: '🚨', label: 'Mạo danh công an', bg: 'bg-peach/40' },
  { emoji: '💸', label: 'Việc nhẹ lương cao', bg: 'bg-butter/60' },
  { emoji: '📦', label: 'Shipper gửi file APK', bg: 'bg-taro/50' },
  { emoji: '🤖', label: 'Deepfake mượn tiền', bg: 'bg-mint/50' },
];

/** 🏠 HomeScreen — màn hình chào "cute phone" trước khi vào 5 cạm bẫy. */
export default function HomeScreen({ onStart, onOpenLeaderboard }: HomeScreenProps) {
  return (
    <div className="cs-paper cs-bunnies cs-scroll flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-4 pt-3">
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 240, damping: 18 }}
          className="cs-bob"
        >
          <Mascot mood="happy" size={128} />
        </motion.div>

        <span className="mt-1 rounded-full border-2 border-peach/60 bg-white/80 px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest text-peach-deep shadow-sm">
          🍡 Kawaii Cyber Survivor
        </span>

        <h1 className="font-cute mt-2 text-[22px] font-extrabold leading-tight text-ink">
          CyberScam
          <span className="block text-[13px] font-bold text-taro-deep">Sinh Tồn Không Gian Mạng 🌸</span>
        </h1>

        <p className="mt-2 text-[11px] font-semibold leading-relaxed text-ink-soft">
          Bạn là sinh viên vừa nhận trợ cấp gia đình{' '}
          <b className="text-emerald-600">{formatVND(START_MONEY)}</b> 💰 5 cạm bẫy công nghệ cao sắp gọi
          vào chiếc điện thoại này. Liệu Heo Tiết Kiệm của bạn có giữ được tiền?
        </p>
      </div>

      {/* Các kiểu bẫy sẽ gặp */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        {TRAP_CHIPS.map((chip, index) => (
          <motion.div
            key={chip.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 * index }}
            className={`flex items-center gap-1.5 rounded-2xl border-2 border-white/90 px-2.5 py-2 text-[10px] font-extrabold text-ink shadow-sm ${chip.bg}`}
          >
            <span className="text-sm">{chip.emoji}</span>
            <span className="leading-tight">{chip.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Chỉ số khởi đầu */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2 rounded-2xl border-2 border-mint-deep/40 bg-mint/25 p-2.5">
          <PiggyBank size={18} strokeWidth={2.6} className="text-emerald-600" />
          <div>
            <div className="text-[8px] font-extrabold uppercase text-ink-soft">Heo Tiết Kiệm</div>
            <div className="font-mono text-[11px] font-extrabold text-emerald-600">
              {formatVND(START_MONEY)}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-2xl border-2 border-peach/50 bg-peach/20 p-2.5">
          <Heart size={18} strokeWidth={2.6} className="text-peach-deep" />
          <div>
            <div className="text-[8px] font-extrabold uppercase text-ink-soft">Tâm Lý Thảnh Thơi</div>
            <div className="font-mono text-[11px] font-extrabold text-peach-deep">100/100</div>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-4">
        <motion.button
          type="button"
          onClick={onStart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-white/70 bg-gradient-to-r from-peach-deep via-peach to-butter-deep py-3.5 text-[12px] font-extrabold uppercase tracking-wide text-white shadow-soft"
        >
          <span className="cs-shine absolute inset-0" />
          <Play size={16} strokeWidth={3} className="relative z-10" />
          <span className="relative z-10">Bật điện thoại &amp; Bắt đầu</span>
        </motion.button>

        <button
          type="button"
          onClick={onOpenLeaderboard}
          className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-full border-2 border-dashed border-taro-deep/60 bg-white/70 py-2.5 text-[11px] font-extrabold text-taro-deep transition-colors hover:bg-butter/30"
        >
          <Trophy size={14} strokeWidth={3} />
          Xem bảng xếp hạng &amp; bạn bè
          <Sparkles size={12} strokeWidth={3} className="text-peach-deep" />
        </button>
      </div>
    </div>
  );
}
