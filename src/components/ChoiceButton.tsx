import { motion } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';
import type { Choice } from '../types';

interface ChoiceButtonProps {
  choice: Choice;
  index: number;
  onSelect: (choice: Choice) => void;
  disabled?: boolean;
}

const LETTERS = ['A', 'B', 'C', 'D'];

/** 🎈 ChoiceButton — nút lựa chọn phản hồi dạng "thẻ kẹo" pastel. */
export default function ChoiceButton({ choice, index, onSelect, disabled = false }: ChoiceButtonProps) {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={() => onSelect(choice)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * index, type: 'spring', stiffness: 260, damping: 24 }}
      whileHover={{ scale: disabled ? 1 : 1.015 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className="group flex w-full items-start gap-2.5 rounded-blob border-2 border-taro/70 bg-white/95 p-3 text-left shadow-[0_8px_18px_-14px_rgba(179,157,219,0.95)] transition-colors hover:border-peach hover:bg-butter/25 disabled:opacity-60"
    >
      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-butter to-peach text-[10px] font-extrabold text-white shadow-sm">
        {LETTERS[index] ?? '?'}
      </span>
      <span className="flex-1 text-[11.5px] font-bold leading-relaxed text-ink">{choice.text}</span>
      <ChevronRight
        size={16}
        strokeWidth={3}
        className="mt-0.5 shrink-0 text-taro-deep transition-transform group-hover:translate-x-0.5 group-hover:text-peach-deep"
      />
    </motion.button>
  );
}

/** Nhắc nhở nhỏ phía trên danh sách lựa chọn */
export function ChoiceHint() {
  return (
    <div className="flex items-center justify-between px-1 pb-1.5 text-[9px] font-extrabold uppercase tracking-wide text-ink-soft">
      <span>Lựa chọn phản hồi của bạn</span>
      <span className="flex items-center gap-1 text-peach-deep">
        <Sparkles size={10} strokeWidth={3} /> Cân nhắc kỹ nha!
      </span>
    </div>
  );
}
