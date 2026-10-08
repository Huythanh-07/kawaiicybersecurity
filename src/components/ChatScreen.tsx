import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircleHeart, Send } from 'lucide-react';
import type { ChatScenario, Choice } from '../types';
import ChoiceButton, { ChoiceHint } from './ChoiceButton';

interface ChatScreenProps {
  scenario: ChatScenario;
  onSelect: (choice: Choice) => void;
}

const TYPING_DELAY = 800;
const MESSAGE_DELAY = 500;

/** 💬 ChatScreen — hội thoại tin nhắn với "bot" lừa đảo, tin nhắn hiện dần như thật. */
export default function ChatScreen({ scenario, onSelect }: ChatScreenProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisibleCount(0);
    setTyping(false);
    const timers: number[] = [];
    let delay = 450;

    scenario.messages.forEach((message, index) => {
      if (message.from === 'them') {
        timers.push(window.setTimeout(() => setTyping(true), delay));
        delay += TYPING_DELAY;
        timers.push(
          window.setTimeout(() => {
            setTyping(false);
            setVisibleCount(index + 1);
          }, delay),
        );
        delay += MESSAGE_DELAY;
      } else {
        timers.push(window.setTimeout(() => setVisibleCount(index + 1), delay));
        delay += 250;
      }
    });

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [scenario.id, scenario.messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [visibleCount, typing]);

  const allVisible = visibleCount >= scenario.messages.length;

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-cream/60">
      {/* Header hội thoại */}
      <div className="flex shrink-0 items-center gap-2.5 border-b-2 border-dashed border-taro/70 bg-white/80 px-4 py-2.5">
        <div className="grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-gradient-to-br from-taro to-babysky text-lg shadow-sm">
          {scenario.appEmoji}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[11.5px] font-extrabold text-ink">{scenario.appHeader}</div>
          <div className="truncate text-[9px] font-bold text-ink-soft">{scenario.subText}</div>
        </div>
        <span className="rounded-full border-2 border-peach/50 bg-peach/20 px-2 py-0.5 text-[8px] font-extrabold uppercase text-peach-deep">
          {scenario.sticker}
        </span>
      </div>

      {/* Luồng tin nhắn */}
      <div className="cs-scroll flex-1 space-y-2.5 overflow-y-auto px-3.5 py-3">
        <div className="mx-auto w-fit rounded-full border-2 border-dashed border-taro/60 bg-white/70 px-3 py-1 text-[8.5px] font-extrabold uppercase tracking-wide text-ink-soft">
          Thỏ Thám Tử: “Đọc kỹ từng câu nha, sơ hở là mất tiền đó!” 🐰🔍
        </div>

        <AnimatePresence initial={false}>
          {scenario.messages.slice(0, visibleCount).map((message, index) => (
            <motion.div
              key={`${scenario.id}-${index}`}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className={`flex ${message.from === 'them' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[85%] px-3.5 py-2.5 text-[11px] font-semibold leading-relaxed shadow-sm ${
                  message.from === 'them'
                    ? 'rounded-blob rounded-bl-md border-2 border-white bg-white text-ink'
                    : 'rounded-blob rounded-br-md border-2 border-white/60 bg-gradient-to-br from-peach to-peach-deep text-white'
                }`}
              >
                {message.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {typing && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1 rounded-blob rounded-bl-md border-2 border-white bg-white px-3 py-2.5 shadow-sm">
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  className="cs-dot h-1.5 w-1.5 rounded-full bg-taro-deep"
                  style={{ animationDelay: `${dot * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Khu vực lựa chọn */}
      <div className="shrink-0 border-t-2 border-dashed border-taro/70 bg-white/85 px-3 pb-3 pt-2">
        {allVisible ? (
          <>
            <ChoiceHint />
            <div className="space-y-2">
              {scenario.choices.map((choice, index) => (
                <ChoiceButton key={choice.id} choice={choice} index={index} onSelect={onSelect} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center gap-2 py-3 text-[10px] font-extrabold text-ink-soft">
            <MessageCircleHeart size={14} strokeWidth={2.8} className="text-peach-deep" />
            Đang đọc tin nhắn...
            <Send size={12} strokeWidth={3} className="text-taro-deep" />
          </div>
        )}
      </div>
    </div>
  );
}
