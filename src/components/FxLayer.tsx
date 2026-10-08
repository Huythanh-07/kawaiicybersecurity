import type { CSSProperties } from 'react';
import type { FxEvent } from '../hooks/useGameEngine';

interface FxLayerProps {
  fx: FxEvent[];
}

const TEAR_OFFSETS = ['-18px', '-6px', '8px', '20px'];

/**
 * 💸 FxLayer — lớp hiệu ứng bay nổi: tiền bay khi sập bẫy, nước mắt, tim, sparkle.
 */
export default function FxLayer({ fx }: FxLayerProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden">
      {fx.map((event, index) => {
        const position: CSSProperties = { left: `${event.x}%`, top: `${event.y}%` };

        if (event.kind === 'tear') {
          return (
            <span
              key={event.id}
              className="cs-tear absolute text-base"
              style={{ ...position, '--tx': TEAR_OFFSETS[index % TEAR_OFFSETS.length] } as CSSProperties}
            >
              💧
            </span>
          );
        }

        if (event.kind === 'heart') {
          return (
            <span key={event.id} className="cs-float-up absolute text-base" style={position}>
              💖
            </span>
          );
        }

        const toneClass =
          event.kind === 'money-loss'
            ? 'bg-peach/95 border-peach-deep text-white'
            : event.kind === 'money-gain'
              ? 'bg-mint/95 border-mint-deep text-emerald-800'
              : 'bg-taro/95 border-taro-deep text-ink';

        return (
          <span
            key={event.id}
            className={`cs-float-up absolute whitespace-nowrap rounded-full border-2 px-2.5 py-1 text-[10px] font-extrabold shadow-soft ${toneClass}`}
            style={position}
          >
            {event.label}
          </span>
        );
      })}
    </div>
  );
}
