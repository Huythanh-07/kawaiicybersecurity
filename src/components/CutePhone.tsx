import type { ReactNode } from 'react';

interface CutePhoneProps {
  children: ReactNode;
  className?: string;
}

/**
 * 📱 CutePhone — khung điện thoại "tai thỏ" pastel + đuôi bông tròn + đèn camera.
 * Bên trong là màn hình bo tròn chứa toàn bộ nội dung game.
 */
export default function CutePhone({ children, className = '' }: CutePhoneProps) {
  return (
    <div className={`relative ${className}`}>
      {/* 🐰 Tai thỏ trái — vươn dài phía sau máy */}
      <svg
        viewBox="0 0 60 130"
        className="absolute -top-10 left-7 z-0 h-[104px] w-11 -rotate-6 drop-shadow-sm"
        aria-hidden="true"
      >
        <path
          d="M30 3 C44 3 53 28 53 66 C53 106 44 127 30 127 C16 127 7 106 7 66 C7 28 16 3 30 3 Z"
          fill="#FFFDF9"
          stroke="#E2D4F0"
          strokeWidth="4"
        />
        <path
          d="M30 19 C38 19 43 41 43 69 C43 102 38 118 30 118 C22 118 17 102 17 69 C17 41 22 19 30 19 Z"
          fill="#FFB7B2"
          opacity="0.8"
        />
      </svg>

      {/* 🐰 Tai thỏ phải */}
      <svg
        viewBox="0 0 60 130"
        className="absolute -top-10 right-7 z-0 h-[104px] w-11 rotate-6 drop-shadow-sm"
        aria-hidden="true"
      >
        <path
          d="M30 3 C44 3 53 28 53 66 C53 106 44 127 30 127 C16 127 7 106 7 66 C7 28 16 3 30 3 Z"
          fill="#FFFDF9"
          stroke="#E2D4F0"
          strokeWidth="4"
        />
        <path
          d="M30 19 C38 19 43 41 43 69 C43 102 38 118 30 118 C22 118 17 102 17 69 C17 41 22 19 30 19 Z"
          fill="#FFB7B2"
          opacity="0.8"
        />
      </svg>

      {/* 🐰 Đuôi bông xù (trang trí, nằm sau máy) */}
      <svg
        viewBox="0 0 80 80"
        className="absolute -right-11 bottom-24 z-0 hidden h-20 w-20 md:block"
        aria-hidden="true"
      >
        <g fill="#FFFDF9" stroke="#E2D4F0" strokeWidth="4">
          <circle cx="62" cy="40" r="8" />
          <circle cx="55.6" cy="55.6" r="8" />
          <circle cx="40" cy="62" r="8" />
          <circle cx="24.4" cy="55.6" r="8" />
          <circle cx="18" cy="40" r="8" />
          <circle cx="24.4" cy="24.4" r="8" />
          <circle cx="40" cy="18" r="8" />
          <circle cx="55.6" cy="24.4" r="8" />
          <circle cx="40" cy="40" r="21" />
        </g>
        <circle
          cx="40"
          cy="40"
          r="13"
          fill="none"
          stroke="#E2D4F0"
          strokeWidth="3"
          strokeDasharray="2 7"
        />
      </svg>

      {/* 🍞 Thân máy */}
      <div className="relative z-10 h-full w-full rounded-[3.25rem] border-[10px] border-white bg-gradient-to-b from-taro via-cream to-peach-soft p-[3px] shadow-[0_30px_60px_-25px_rgba(179,157,219,0.85)] ring-1 ring-white/70">
        {/* Đèn camera selfie + loa thoại (nằm trên viền máy) */}
        <div className="absolute left-[72%] -top-[6px] h-2 w-2 rounded-full bg-babysky-deep/70 ring-2 ring-white/70" />
        <div className="absolute left-1/2 -translate-x-1/2 -top-[6px] h-1.5 w-16 rounded-full bg-taro-deep/40" />

        {/* 🖥️ Màn hình */}
        <div className="relative h-full w-full overflow-hidden rounded-[2.7rem] bg-cream flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}
