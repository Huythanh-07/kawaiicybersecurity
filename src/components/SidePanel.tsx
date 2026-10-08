import { Heart, Rabbit, ShieldCheck, Trophy } from 'lucide-react';

interface SidePanelProps {
  className?: string;
  onOpenLeaderboard: () => void;
}

const PALETTE = ['#FFB7B2', '#FFEAA7', '#E2D4F0', '#B5EAD7', '#FFFDF9'];

/** 🧋 SidePanel — bảng giới thiệu pastel bên cạnh chiếc điện thoại (desktop). */
export default function SidePanel({ className = '', onOpenLeaderboard }: SidePanelProps) {
  return (
    <aside className={`w-[300px] shrink-0 ${className}`}>
      <div className="rounded-super border-4 border-white bg-white/70 p-5 shadow-puffy backdrop-blur">
        <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-peach/60 bg-peach/20 px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest text-peach-deep">
          <Rabbit size={11} strokeWidth={3} /> Kawaii Edition v2.0
        </span>

        <h1 className="font-cute mt-3 text-[20px] font-extrabold leading-tight text-ink">
          CyberScam
          <span className="block text-[12px] font-bold text-taro-deep">Sinh Tồn Không Gian Mạng 🌸</span>
        </h1>

        <p className="mt-2 text-[11px] font-semibold leading-relaxed text-ink-soft">
          Bảo vệ Heo Tiết Kiệm 🐷 khỏi 5 cạm bẫy lừa đảo có thật: mạo danh công an, việc nhẹ lương cao,
          shipper gửi file APK, voucher Shopee giả và deepfake bạn thân.
        </p>

        <ul className="mt-3 space-y-1.5 text-[10.5px] font-bold text-ink">
          <li className="flex items-center gap-1.5">
            <Heart size={12} strokeWidth={3} className="text-peach-deep" /> Tâm Lý Thảnh Thơi 💖 — mất máu khi sập bẫy
          </li>
          <li className="flex items-center gap-1.5">
            <ShieldCheck size={12} strokeWidth={3} className="text-emerald-500" /> Thỏ Thám Tử 🐰🔍 giải mã từng loại bẫy
          </li>
          <li className="flex items-center gap-1.5">
            <Trophy size={12} strokeWidth={3} className="text-amber-500" /> Bảng xếp hạng 2 cúp + live feed người chơi
          </li>
        </ul>

        <div className="mt-3 flex items-center gap-1.5">
          {PALETTE.map((color) => (
            <span
              key={color}
              title={color}
              className="h-5 w-5 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={onOpenLeaderboard}
          className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-full border-2 border-dashed border-taro-deep/60 bg-taro/25 py-2.5 text-[10.5px] font-extrabold text-taro-deep transition-colors hover:bg-butter/40"
        >
          <Trophy size={13} strokeWidth={3} /> Mở bảng xếp hạng
        </button>
      </div>
    </aside>
  );
}
