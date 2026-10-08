import type { CSSProperties } from 'react';

export type MascotMood = 'happy' | 'wink' | 'cry' | 'cool' | 'detective' | 'sleepy';

interface MascotProps {
  mood?: MascotMood;
  /** kích thước cạnh (px) */
  size?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * 🐰 Mascot — "Thỏ Thám Tử" dùng ẢNH GỐC của bạn (`public/mascot.png`).
 *
 * - Ảnh đã được cắt sát nhân vật + xoá nền trắng từ viền ngoài (flood-fill) nên lông
 *   thỏ vẫn trắng đục, phần ngoài trong suốt → nằm trên nền pastel nào cũng liền mạch.
 * - Kích thước gốc 396×640 (tỉ lệ 0.61875) → vẽ vừa khung vuông `size`, canh giữa.
 * - Giữ NGUYÊN API biểu cảm: happy | wink | cry | cool | detective | sleepy. Vì ảnh chỉ
 *   có một tư thế, các biểu cảm được vẽ ĐÈ lên ảnh bằng SVG với toạ độ đo trực tiếp
 *   trên ảnh: nước mắt, kính râm, mũ thám tử, chữ Z… và nháy mắt bằng một hình trắng
 *   phủ lên chấm mắt (xem `@keyframes cs-blink` trong index.css).
 * - Mốc đo trên ảnh (hệ 396×640): mắt trái (129.6, 331.5), mắt phải (275.9, 339.5),
 *   bán kính mắt ≈ 9.5; miệng chữ X ở (209, 379); gốc tai ≈ y 192; nét vẽ ≈ 12.
 */
export default function Mascot({ mood = 'happy', size = 120, className = '', style }: MascotProps) {
  /** 🖊️ Mực đen — "nét bút" của lớp phụ kiện vẽ đè lên ảnh */
  const ink = '#111111';
  /** Trắng lông thỏ — dùng để phủ lên chấm mắt khi nháy mắt */
  const fur = '#FFFFFF';
  /** Xanh nước mắt (khớp token --color-babysky-deep) */
  const tear = '#8FC7F5';

  /** Nét phụ kiện ≈ độ dày nét có sẵn trong ảnh */
  const stroke = 12;
  const strokeThin = 9;
  /** Hai mắt trong ảnh + bán kính "mi trắng" phủ lên mắt */
  const eyeL = { x: 129.6, y: 331.5 };
  const eyeR = { x: 275.9, y: 339.5 };
  const lid = 15;

  return (
    <span
      className={className}
      style={{
        position: 'relative',
        display: 'inline-block',
        width: size,
        height: size,
        lineHeight: 0,
        ...style,
      }}
      role="img"
      aria-label={`Thỏ Thám Tử (${mood})`}
    >
      {/* 🐰 Ảnh gốc — nền trong suốt, không bị ô trắng khi đặt trên nền pastel */}
      <img
        src="/mascot.png"
        alt=""
        draggable={false}
        decoding="async"
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
      />

      {/* 🎭 Lớp phụ kiện biểu cảm — dùng đúng hệ toạ độ của ảnh (396×640) nên khớp tuyệt đối */}
      <svg
        viewBox="0 0 396 640"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '61.875%',
          height: '100%',
        }}
      >
        {/* 👀 Nháy mắt: mi trắng phủ lên chấm mắt trong ảnh (happy + mắt trái khi wink) */}
        {(mood === 'happy' || mood === 'wink') && (
          <>
            <circle className="cs-blink" cx={eyeL.x} cy={eyeL.y} r={lid} fill={fur} />
            {mood === 'happy' && (
              <circle className="cs-blink" cx={eyeR.x} cy={eyeR.y} r={lid} fill={fur} />
            )}
          </>
        )}

        {/* 😉 Nháy một mắt: mắt phải nhắm lại thành vòng cung */}
        {mood === 'wink' && (
          <>
            <circle cx={eyeR.x} cy={eyeR.y} r={lid} fill={fur} />
            <path
              d={`M261 341 Q${eyeR.x} 327 291 341`}
              fill="none"
              stroke={ink}
              strokeWidth={strokeThin}
              strokeLinecap="round"
            />
          </>
        )}

        {/* 💧 Nước mắt long lanh khi sập bẫy */}
        {mood === 'cry' && (
          <g fill={tear} stroke={ink} strokeWidth={8} strokeLinejoin="round">
            <path d="M129.6 344 C118 362 115 380 129.6 386 C144.2 380 141.2 362 129.6 344 Z" />
            <path d="M275.9 344 C264.3 362 261.3 380 275.9 386 C290.5 380 287.5 362 275.9 344 Z" />
          </g>
        )}

        {/* 😎 Kính râm — hai tròng đen bóng phủ lên hai mắt */}
        {mood === 'cool' && (
          <>
            <rect x="85.6" y="316" width="88" height="40" rx="20" fill={ink} />
            <rect x="231.9" y="316" width="88" height="40" rx="20" fill={ink} />
            <path d="M173.6 332 h58.3" stroke={ink} strokeWidth={14} strokeLinecap="round" />
            <circle cx="108.6" cy="329" r="7" fill={fur} />
            <circle cx="254.9" cy="329" r="7" fill={fur} />
          </>
        )}

        {/* 🕵️ Mũ thám tử — chóp mũ + vành rộng, đội ngay trên gốc tai */}
        {mood === 'detective' && (
          <g>
            <path
              d="M150 206 C150 150 264 150 264 206 Z"
              fill={fur}
              stroke={ink}
              strokeWidth={stroke}
              strokeLinejoin="round"
            />
            <rect
              x="92"
              y="200"
              width="232"
              height="44"
              rx="22"
              fill={fur}
              stroke={ink}
              strokeWidth={stroke}
            />
            <circle cx="207" cy="172" r="9" fill={ink} />
          </g>
        )}

        {/* 😴 Buồn ngủ — mắt nhắm thành gạch ngang + chữ Z bay lơ lửng */}
        {mood === 'sleepy' && (
          <>
            <circle cx={eyeL.x} cy={eyeL.y} r={lid} fill={fur} />
            <circle cx={eyeR.x} cy={eyeR.y} r={lid} fill={fur} />
            <path
              d={`M${eyeL.x - 15} ${eyeL.y} h30`}
              stroke={ink}
              strokeWidth={strokeThin}
              strokeLinecap="round"
            />
            <path
              d={`M${eyeR.x - 15} ${eyeR.y} h30`}
              stroke={ink}
              strokeWidth={strokeThin}
              strokeLinecap="round"
            />
            <g fill="none" stroke={ink} strokeLinecap="round" strokeLinejoin="round">
              <path d="M364 62 h18 l-18 22 h18" strokeWidth={9} />
              <path d="M374 34 h13 l-13 16 h13" strokeWidth={7} />
            </g>
          </>
        )}
      </svg>
    </span>
  );
}
