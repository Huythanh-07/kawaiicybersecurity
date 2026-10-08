import { motion } from 'framer-motion';
import { Phone, PhoneOff, TriangleAlert } from 'lucide-react';
import type { CallScenario } from '../types';

interface IncomingCallScreenProps {
  scenario: CallScenario;
  onAccept: () => void;
  onDecline: () => void;
}

/** 📞 IncomingCallScreen — màn hình có cuộc gọi tới, nhấp nháy "chuông" dễ thương. */
export default function IncomingCallScreen({ scenario, onAccept, onDecline }: IncomingCallScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="cs-paper cs-bunnies flex min-h-0 flex-1 flex-col items-center justify-between px-6 pb-8 pt-6"
    >
      <div className="flex flex-col items-center text-center">
        <span className="flex items-center gap-1 rounded-full border-2 border-peach/60 bg-white/80 px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest text-peach-deep">
          <TriangleAlert size={11} strokeWidth={3} /> Cuộc gọi đến • {scenario.sticker}
        </span>

        {/* Avatar + vòng sóng */}
        <div className="relative mt-6 h-32 w-32">
          <span className="cs-ring absolute inset-0 rounded-full bg-peach/40" />
          <span
            className="cs-ring absolute inset-0 rounded-full bg-taro/40"
            style={{ animationDelay: '0.6s' }}
          />
          <div className="cs-wiggle relative grid h-32 w-32 place-items-center rounded-full border-4 border-white bg-gradient-to-br from-butter to-peach text-5xl shadow-soft">
            {scenario.callerAvatar}
          </div>
        </div>

        <h2 className="font-cute mt-4 text-[15px] font-extrabold text-ink">{scenario.callerName}</h2>
        <p className="font-mono text-[11px] font-bold text-ink-soft">{scenario.callerNumber}</p>
        <p className="mt-3 rounded-2xl border-2 border-dashed border-taro/70 bg-white/70 px-3 py-2 text-[10px] font-bold leading-relaxed text-ink-soft">
          🐰 Thỏ Thám Tử thì thầm: “Người lạ gọi tới đòi tiền thì 99% là bẫy đó nha!”
        </p>
      </div>

      <div className="flex w-full items-center justify-around gap-6">
        <div className="flex flex-col items-center gap-1.5">
          <motion.button
            type="button"
            onClick={onDecline}
            whileTap={{ scale: 0.9 }}
            className="grid h-16 w-16 place-items-center rounded-full border-4 border-white bg-gradient-to-br from-peach-deep to-rose-400 text-white shadow-soft"
          >
            <PhoneOff size={24} strokeWidth={2.8} />
          </motion.button>
          <span className="text-[9px] font-extrabold text-ink-soft">Từ chối</span>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <motion.button
            type="button"
            onClick={onAccept}
            animate={{ scale: [1, 1.07, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="grid h-16 w-16 place-items-center rounded-full border-4 border-white bg-gradient-to-br from-mint-deep to-emerald-400 text-white shadow-soft"
          >
            <Phone size={24} strokeWidth={2.8} />
          </motion.button>
          <span className="text-[9px] font-extrabold text-ink-soft">Nghe máy</span>
        </div>
      </div>
    </motion.div>
  );
}
