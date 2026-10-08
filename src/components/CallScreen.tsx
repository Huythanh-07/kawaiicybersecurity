import { motion } from 'framer-motion';
import { Mic, PhoneCall } from 'lucide-react';
import type { CallScenario, Choice } from '../types';
import ChoiceButton, { ChoiceHint } from './ChoiceButton';

interface CallScreenProps {
  scenario: CallScenario;
  onSelect: (choice: Choice) => void;
}

/** ☎️ CallScreen — đã nghe máy: nghe lời thoại đe dọa rồi chọn phản hồi tỉnh táo. */
export default function CallScreen({ scenario, onSelect }: CallScreenProps) {
  return (
    <div className="cs-paper cs-bunnies flex min-h-0 flex-1 flex-col">
      {/* Người đang gọi */}
      <div className="flex shrink-0 flex-col items-center px-5 pt-4 text-center">
        <div className="relative grid h-16 w-16 place-items-center rounded-full border-4 border-white bg-gradient-to-br from-peach to-taro text-3xl shadow-soft">
          {scenario.callerAvatar}
          <span className="cs-ring absolute inset-0 rounded-full bg-peach/40" />
        </div>
        <div className="mt-2 text-[12px] font-extrabold text-ink">{scenario.callerName}</div>
        <div className="font-mono text-[10px] font-bold text-ink-soft">{scenario.callerNumber}</div>
        <div className="mt-1 flex items-center gap-1 rounded-full border-2 border-mint-deep/50 bg-mint/30 px-2.5 py-0.5 text-[8.5px] font-extrabold uppercase text-emerald-700">
          <PhoneCall size={10} strokeWidth={3} /> Đang kết nối • ghi âm
          <Mic size={10} strokeWidth={3} />
        </div>
      </div>

      {/* Lời thoại */}
      <div className="cs-scroll mt-3 flex-1 overflow-y-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          className="relative rounded-blob rounded-tl-md border-2 border-white bg-white/95 p-3.5 shadow-soft"
        >
          <p className="text-[11.5px] font-semibold leading-relaxed text-ink">{scenario.speech}</p>
          <span className="absolute -bottom-2 left-6 h-4 w-4 rotate-45 rounded-sm border-b-2 border-r-2 border-white bg-white/95" />
        </motion.div>

        <div className="mt-3 rounded-2xl border-2 border-dashed border-peach/60 bg-peach/15 px-3 py-2 text-[10px] font-bold leading-relaxed text-peach-deep">
          😰 Kẻ gọi đang dồn dập gây áp lực thời gian. Hít thở sâu, chậm lại 3 giây rồi chọn nha!
        </div>
      </div>

      {/* Lựa chọn */}
      <div className="shrink-0 border-t-2 border-dashed border-taro/70 bg-white/85 px-3 pb-3 pt-2">
        <ChoiceHint />
        <div className="space-y-2">
          {scenario.choices.map((choice, index) => (
            <ChoiceButton key={choice.id} choice={choice} index={index} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </div>
  );
}
