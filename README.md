# 🌸 CyberScam: Sinh Tồn Không Gian Mạng — Kawaii Edition

Bản nâng cấp pastel/kawaii của game chống lừa đảo **CyberScam**, viết bằng **React + TypeScript + Vite + Tailwind CSS v4 + Framer Motion**.
Bạn vào vai chủ nhân chiếc "cute phone" 🐰, bảo vệ **Heo Tiết Kiệm 🐷** và **Tâm Lý Thảnh Thơi 💖** qua 5 vụ án lừa đảo có thật.

---

## 🚀 Cách chạy

```bash
npm install       # cài phụ thuộc
npm run dev       # chạy dev server (mặc định http://localhost:5173)
npm run typecheck # kiểm tra kiểu TypeScript (tsc --noEmit)
npm run build     # typecheck + build production vào thư mục dist/
npm run preview   # xem thử bản build production
```

Yêu cầu: Node.js 18+.

---

## 🎮 Luật chơi

| Thành phần | Ý nghĩa |
| --- | --- |
| 🐷 **Heo Tiết Kiệm** | Số dư khởi điểm **20.000.000₫**. Dính bẫy → tiền bay; chọn khéo có thể "ăn tiền mồi" của scammer. |
| 💖 **Tâm Lý Thảnh Thơi** | Thanh máu 100 điểm. Mỗi bẫy làm bạn mất 20–45 điểm tâm lý. |
| 🐰🔍 **Thỏ Thám Tử** | Sau mỗi lựa chọn, thẻ *"Thỏ Thám Tử Nhắc Nhở"* giải thích chiêu trò + bí kíp phòng thủ. |
| ⚡ **Phản xạ** | Hệ thống đo thời gian phản hồi mỗi vụ án → dùng để xếp hạng ở bảng "Thần Giữ Của". |
| 🏁 **Kết thúc** | Thắng khi qua hết 5 vụ án (hoặc hết tiền/hết tâm lý → thua), kèm danh hiệu meme và bảng tổng kết. |

**Vòng lặp màn hình:** `home → ringing (cuộc gọi đến) → live (call/chat) → debrief (giảng bài) → … → end`.

---

## 🕵️ 5 vụ án trong game

1. ☎️ **Mạo danh công an / viện kiểm sát** — cuộc gọi đe dọa "rửa tiền", yêu cầu chuyển tiền vào "tài khoản giám định".
2. 💸 **Việc nhẹ lương cao** — chat tuyển CTV thả tim video, "ứng trước hoa hồng" rồi dụ nạp tiền làm nhiệm vụ.
3. 📦 **Shipper giả gửi file .APK** — SMS brandname giả, đòi cài app qua link lạ để "xác minh đơn hàng".
4. 🎁 **Voucher Shopee giả** — trúng thưởng ảo, đòi nhập OTP/thông tin thẻ để "nhận quà".
5. 🤖 **Deepfake bạn thân mượn tiền** — video call giả bằng AI, gấp gáp đòi chuyển khoản.

Mỗi vụ án có **1–2 lựa chọn sập bẫy** và **1 lựa chọn an toàn**, kèm dữ liệu `debriefTitle / debriefExplanation / tip` để giáo dục người chơi.

---

## 🏆 Bảng xếp hạng & Live feed

- **Cúp Thần Giữ Của 🏆** — xếp theo *ít sập bẫy nhất → phản xạ nhanh nhất → giữ được nhiều tiền nhất*.
- **Cúp Cừu Non Đáng Thương 🐑** — xếp theo *số tiền mất nhiều nhất → số lần dính bẫy*.
- Người chơi hiện tại (`id: 'you'`) được **ghim trực tiếp** vào bảng với highlight "BẠN" và tự động đổi hạng theo kết quả từng ván.
- **Live feed "người chơi xung quanh"** gồm 2 dạng: marquee chạy ngang trong tab xếp hạng và toast trôi ở góc màn hình khi đang chơi (đã đặt `pointer-events-none` để **không che nút lựa chọn**).

---

## 🗂️ Cấu trúc thư mục

```
src/
├── App.tsx                    # Bố cục tổng: nền pastel, panel giới thiệu, cute phone, chuyển tab
├── main.tsx                   # Điểm khởi động React
├── index.css                  # Design tokens Tailwind v4 + toàn bộ animation "cs-*"
├── types.ts                   # Kiểu dữ liệu dùng chung (Scenario, Choice, Player, LiveFeedEvent…)
├── data/
│   ├── scenarios.ts           # 5 vụ án (call + chat) và đáp án
│   └── leaderboardData.ts     # 14 người chơi mock, live feed, hàm sắp xếp & danh hiệu meme
├── hooks/
│   └── useGameEngine.ts       # Toàn bộ state machine của game (ví, HP, bẫy, phản xạ, FX)
├── utils/
│   └── format.ts              # formatVND / formatDeltaVND / compactVND / formatSeconds / formatClock
└── components/
    ├── CutePhone.tsx          # Khung điện thoại tai thỏ
    ├── StatusBar.tsx          # Giờ, Dynamic Island, sóng/pin
    ├── GameHUD.tsx            # Ví, thanh máu, tiến độ vụ án
    ├── HomeScreen.tsx         # Màn hình chào & nút bắt đầu
    ├── IncomingCallScreen.tsx # Cuộc gọi đến (nghe / từ chối)
    ├── CallScreen.tsx         # Đã nghe máy, chọn phản hồi
    ├── ChatScreen.tsx         # Hội thoại tin nhắn hiện dần
    ├── ChoiceButton.tsx       # Nút lựa chọn + gợi ý
    ├── DebriefCard.tsx        # Thẻ "Thỏ Thám Tử Nhắc Nhở"
    ├── EndGameScreen.tsx      # Tổng kết + danh hiệu meme
    ├── LeaderboardScreen.tsx  # 2 bảng xếp hạng + live feed marquee
    ├── PlayerRow.tsx          # Một dòng người chơi (có highlight "BẠN")
    ├── LiveFeedTicker.tsx     # LiveFeedMarquee + LiveFeedBubble
    ├── FxLayer.tsx            # Hiệu ứng bay: tiền, nước mắt, tim, sparkle
    ├── Mascot.tsx             # "Thỏ Thám Tử": ảnh gốc + lớp biểu cảm SVG (6 biểu cảm)
    ├── PhoneTabBar.tsx        # Tab "Chơi Game" / "Bảng Xếp Hạng"
    └── SidePanel.tsx          # Panel giới thiệu trên màn hình lớn
```

---

## 🎨 Ghi chú thiết kế

- **Design tokens** khai báo trong `@theme` của `src/index.css` (Tailwind v4): `peach`, `butter`, `taro`, `mint`, `babysky`, `cream`, `ink` — dùng trực tiếp như `bg-peach/25`, `text-taro-deep`, `border-mint-deep/50`.
- **Bo góc & bóng mềm**: `rounded-blob`, `rounded-super`, `shadow-soft`, `shadow-puffy`.
- **Animation thuần CSS** (prefix `cs-`): `cs-bob`, `cs-shake`, `cs-float-up`, `cs-marquee`, `cs-ring`, `cs-tear`, `cs-sparkle`, `cs-dot`, `cs-blink`, `cs-shine`, `cs-bunnies`, `cs-paper`, `cs-scroll` — có tôn trọng `prefers-reduced-motion`.
- **Framer Motion** lo chuyển màn hình (`AnimatePresence`), pill tab (`layoutId`) và hiệu ứng nhấn nút.
- **Mascot "Thỏ Thám Tử"** (`Mascot.tsx`): dùng **ảnh gốc** `public/mascot.png` (396×640) — đã cắt sát nhân vật và xoá nền trắng tính từ viền ngoài nên lông thỏ vẫn trắng đục, phần ngoài trong suốt. Vì ảnh chỉ có một tư thế, 6 biểu cảm `happy` (mặc định), `wink`, `cry`, `cool`, `detective`, `sleepy` được vẽ **đè lên ảnh** bằng một lớp SVG dùng đúng hệ toạ độ 396×640 (nước mắt, kính râm, mũ thám tử, chữ Z, vòng cung mắt), nét `#111111` ≈ `12/640` cho khớp nét có sẵn trong ảnh; nháy mắt = hình trắng (màu lông) phủ lên chấm mắt qua `@keyframes cs-blink`.
- **Favicon** `public/rabbit.svg`: bản vẽ vector cùng thiết kế với ảnh — giữ nét đậm nên vẫn rõ ở 16–32px (favicon dựng trực tiếp từ ảnh chỉ đọc được từ 48px trở lên).
- Toàn bộ UI dùng tiếng Việt, đơn vị tiền Việt và font tròn trịa (Quicksand / Nunito / Baloo 2).

---

## ✅ Kiểm thử đã chạy

- `npx tsc --noEmit` → **0 lỗi** (strict, `noUnusedLocals`, `noUnusedParameters`).
- `npm run build` → build production thành công (`dist/` ~340 kB JS / ~50 kB CSS).
- **SSR smoke test**: render toàn bộ 10 màn hình (App, Home, IncomingCall, Call, Chat, Debrief ×2, EndGame ×2, Leaderboard) → không màn hình nào crash.
- **Assertion logic**: 5 vụ án có đủ lựa chọn an toàn/bẫy + nội dung debrief, 14 người chơi không trùng id, sắp xếp 2 bảng xếp hạng đúng thứ tự, live feed hợp lệ, các hàm format tiền/thời gian trả đúng định dạng tiếng Việt.
- **Kiểm tra bundle `dist/`**: nội dung tiếng Việt, class Tailwind (kể cả class nằm trong file dữ liệu như `bg-babysky/70`) và các animation `cs-*` đều được sinh ra đầy đủ.
