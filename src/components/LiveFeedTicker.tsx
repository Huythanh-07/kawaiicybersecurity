import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Radio } from 'lucide-react';
import type { LiveFeedEvent } from '../types';

interface LiveFeedMarqueeProps {
  events: LiveFeedEvent[];
  className?: string;
}

/** 📢 LiveFeedMarquee — thanh thông báo chạy ngang kiểu ticker "Người chơi xung quanh". */
export function LiveFeedMarquee({ events, className = '' }: LiveFeedMarqueeProps) {
  const doubled = [...events, ...events];

  return (
    <div className={`overflow-hidden border-y-2 border-dashed border-taro/60 bg-white/70 py-1.5 ${className}`}>
      <div className="mb-1 flex items-center justify-center gap-1 text-[8px] font-extrabold uppercase tracking-widest text-peach-deep">
        <Radio size={9} strokeWidth={3} className="cs-sparkle" /> Người chơi xung quanh • trực tiếp
      </div>
      <div className="flex w-max cs-marquee gap-2 pl-2">
        {doubled.map((event, index) => (
          <span
            key={`${event.id}-${index}`}
            className={`flex shrink-0 items-center gap-1 rounded-full border-2 px-2 py-0.5 text-[9px] font-bold ${
              event.tone === 'good'
                ? 'border-mint-deep/40 bg-mint/30 text-emerald-700'
                : 'border-peach/50 bg-peach/20 text-peach-deep'
            }`}
          >
            <span className="text-[11px]">{event.avatar}</span>
            <b>{event.player}</b>
            <span className="text-ink-soft">{event.text}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

interface LiveFeedBubbleProps {
  events: LiveFeedEvent[];
  className?: string;
}

/** 💬 LiveFeedBubble — toast "người chơi xung quanh" trôi ở đỉnh màn hình, tự đổi tin mỗi 4.5s. */
export function LiveFeedBubble({ events, className = '' }: LiveFeedBubbleProps) {
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCursor((prev) => (prev + 1) % events.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [events.length]);

  const event = events[cursor];

  return (
    <div className={`pointer-events-none absolute right-2 top-2 z-30 max-w-[70%] ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: -14, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          className={`flex w-full items-start gap-2 rounded-blob border-2 bg-white/95 px-2.5 py-1.5 shadow-puffy backdrop-blur ${
            event.tone === 'good' ? 'border-mint-deep/50' : 'border-peach/60'
          }`}
        >
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 border-white bg-taro/60 text-xs">
            {event.avatar}
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-1 text-[8px] font-extrabold uppercase tracking-widest text-ink-soft">
              <Radio
                size={8}
                strokeWidth={3}
                className={event.tone === 'good' ? 'text-emerald-500' : 'text-peach-deep'}
              />
              Live • người chơi xung quanh
            </span>
            <span className="mt-0.5 block text-[9.5px] font-bold leading-snug text-ink">
              <b className={event.tone === 'good' ? 'text-emerald-600' : 'text-peach-deep'}>{event.player}</b>{' '}
              {event.text}
            </span>
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
