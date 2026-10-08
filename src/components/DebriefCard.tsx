import { motion } from 'framer-motion';
import { ArrowRight, Footprints, Lightbulb, PartyPopper, Sparkles, Trophy } from 'lucide-react';
import Mascot from './Mascot';
import { formatDeltaVND } from '../utils/format';
import type { Choice } from '../types';

interface DebriefCardProps {
  choice: Choice;
  scenarioTitle: string;
  isLastScenario: boolean;
  onNext: () => void;
}

/**
 * 🐰🔍 DebriefCard — popup "Thỏ Thám Tử Nhắc Nhở" giải mã vì sao bẫy nguy hiểm + tip phòng tránh.
 */
export default function DebriefCard({ choice, scenarioTitle, isLastScenario, onNext }: DebriefCardProps) {
  const trapped = choice.isTrap;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="cs-scroll absolute inset-0 z-40 flex flex-col overflow-y-auto bg-cream/95 px-4 py-3 backdrop-blur-sm"
    >
      {/* Kết quả */}
      <motion.div
        initial={{ scale: 0.85, y: 12 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className={`flex items-center gap-3 rounded-blob border-2 p-3 shadow-soft ${
          trapped ? 'border-peach-deep/50 bg-peach/25' : 'border-mint-deep/50 bg-mint/30'
        }`}
      >
        <div
          className={`grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-white bg-white/80 ${
            trapped ? 'cs-shake' : 'cs-bob'
          }`}
        >
          <Mascot mood={trapped ? 'cry' : 'wink'} size={48} />
        </div>
        <div className="min-w-0">
          <div className={`text-[12px] font-extrabold ${trapped ? 'text-peach-deep' : 'text-emerald-700'}`}>
            {trapped ? 'Ôi không, sập bẫy rồi! 🥺' : 'Quá đỉnh, né bẫy thần sầu! 🎉'}
          </div>
          <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
            <span
              className={`rounded-full border-2 px-2 py-0.5 text-[10px] font-extrabold ${
                choice.moneyDelta < 0
                  ? 'border-peach-deep/60 bg-white text-peach-deep'
                  : choice.moneyDelta > 0
                    ? 'border-mint-deep/60 bg-white text-emerald-700'
                    : 'border-taro-deep/50 bg-white text-taro-deep'
              }`}
            >
              {choice.moneyDelta === 0 ? '💖 Ví nguyên vẹn' : formatDeltaVND(choice.moneyDelta)}
            </span>
            {choice.hpDelta < 0 && (
              <span className="rounded-full border-2 border-peach/50 bg-white px-2 py-0.5 text-[10px] font-extrabold text-peach-deep">
                💔 Tâm lý {choice.hpDelta}
              </span>
            )}
            {!trapped && choice.moneyDelta > 0 && (
              <span className="flex items-center gap-1 rounded-full border-2 border-butter-deep/60 bg-butter/50 px-2 py-0.5 text-[10px] font-extrabold text-amber-700">
                <PartyPopper size={10} strokeWidth={3} /> Ăn tiền mồi của scammer!
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Lời thoại phản hồi */}
      <p className="mt-2.5 rounded-2xl border-2 border-dashed border-taro/70 bg-white/80 px-3 py-2 text-[11px] font-semibold leading-relaxed text-ink">
        {choice.feedback}
      </p>

      {/* Thẻ Thỏ Thám Tử */}
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.12, type: 'spring', stiffness: 220, damping: 24 }}
        className="mt-3 overflow-hidden rounded-blob border-2 border-taro-deep/40 bg-white/95 shadow-puffy"
      >
        <div className="flex items-center gap-2 bg-gradient-to-r from-taro/70 via-butter/60 to-peach/50 px-3 py-2">
          <Mascot mood="detective" size={34} />
          <div className="min-w-0">
            <div className="text-[10.5px] font-extrabold text-ink">Thỏ Thám Tử Nhắc Nhở 🐰🔍</div>
            <div className="truncate text-[8.5px] font-bold uppercase tracking-wide text-ink-soft">
              Vụ án: {scenarioTitle}
            </div>
          </div>
        </div>

        <div className="space-y-2.5 p-3">
          <div className="rounded-2xl border-2 border-dashed border-peach/60 bg-peach/10 p-2.5">
            <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-wide text-peach-deep">
              <Footprints size={11} strokeWidth={3} /> Bóc phốt chiêu trò
            </div>
            <div className="mt-1 text-[11px] font-extrabold text-ink">{choice.debriefTitle}</div>
            <p className="mt-1 text-[10.5px] font-semibold leading-relaxed text-ink-soft">
              {choice.debriefExplanation}
            </p>
          </div>

          <div className="rounded-2xl border-2 border-dashed border-mint-deep/50 bg-mint/15 p-2.5">
            <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-wide text-emerald-700">
              <Lightbulb size={11} strokeWidth={3} /> Bí kíp phòng thủ kawaii
            </div>
            <p className="mt-1 text-[10.5px] font-semibold leading-relaxed text-ink">{choice.tip}</p>
          </div>

          <div className="flex items-center gap-1.5 rounded-2xl bg-butter/40 px-2.5 py-2 text-[9.5px] font-bold text-amber-700">
            <Sparkles size={12} strokeWidth={3} />
            Nguyên tắc vàng: Có tiền + Có gấp + Có link lạ = Có bẫy!
          </div>
        </div>
      </motion.div>

      <motion.button
        type="button"
        onClick={onNext}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="mt-auto flex w-full shrink-0 items-center justify-center gap-2 rounded-full border-2 border-white/70 bg-gradient-to-r from-taro-deep to-babysky-deep py-3 text-[11.5px] font-extrabold uppercase tracking-wide text-white shadow-soft"
      >
        {isLastScenario ? <Trophy size={15} strokeWidth={3} /> : <ArrowRight size={15} strokeWidth={3} />}
        {isLastScenario ? 'Xem kết quả cuối cùng' : 'Tiếp tục hành trình'}
      </motion.button>
    </motion.div>
  );
}
