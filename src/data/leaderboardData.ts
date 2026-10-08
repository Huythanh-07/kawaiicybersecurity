import type { LeaderboardCategory, LiveFeedEvent, Player } from '../types';

/**
 * 🏆 LEADERBOARD MOCK DATA
 * 14 người chơi "xung quanh" + 12 dòng Live Feed hài hước.
 * Ví khởi điểm của mọi người: 20.000.000đ (giống người chơi hiện tại).
 */
export const START_MONEY = 20_000_000;

export const MOCK_PLAYERS: Player[] = [
  /* ---------------- 🏆 HỘI THẦN GIỮ CỦA (0 lần sập bẫy) ---------------- */
  {
    id: 'p1',
    name: 'MèoBéo Ú',
    avatar: '🐱',
    avatarBg: 'bg-peach/60',
    moneyLeft: 20_100_000,
    trapsHit: 0,
    badge: 'Thần Giữ Của Cấp Vũ Trụ',
    motto: 'Ăn tiền mồi của scammer rồi block 😼',
    reactionMs: 480,
  },
  {
    id: 'p2',
    name: 'ThỏNgọc',
    avatar: '🐰',
    avatarBg: 'bg-butter/80',
    moneyLeft: 20_000_000,
    trapsHit: 0,
    badge: 'Vua Soi Link Lạ',
    motto: 'Thấy .xyz là auto xóa 🥕',
    reactionMs: 620,
  },
  {
    id: 'p3',
    name: 'GấuMậpChill',
    avatar: '🐻',
    avatarBg: 'bg-taro/70',
    moneyLeft: 20_000_000,
    trapsHit: 0,
    badge: 'Cảnh Sát OTP',
    motto: 'OTP như mật khẩu tim, không cho ai 💛',
    reactionMs: 705,
  },
  {
    id: 'p4',
    name: 'VịtConTỉnhTáo',
    avatar: '🦆',
    avatarBg: 'bg-babysky/80',
    moneyLeft: 19_900_000,
    trapsHit: 0,
    badge: 'Người Cúp Máy Nhanh Nhất',
    motto: 'Cúp máy xong mới thèm nói chuyện 🦆',
    reactionMs: 880,
  },
  {
    id: 'p5',
    name: 'CáoNhỏNhanhTrí',
    avatar: '🦊',
    avatarBg: 'bg-butter/70',
    moneyLeft: 20_000_000,
    trapsHit: 0,
    badge: 'Chiến Thần Xác Minh 2 Lớp',
    motto: 'Video call trước, chuyển tiền sau 🦊',
    reactionMs: 950,
  },
  {
    id: 'p6',
    name: 'HeoBôngLười',
    avatar: '🐷',
    avatarBg: 'bg-peach/50',
    moneyLeft: 20_000_000,
    trapsHit: 0,
    badge: 'Sư Phụ Ngồi Im',
    motto: 'Không bấm gì cả = không mất gì 😴',
    reactionMs: 1_120,
  },
  {
    id: 'p7',
    name: 'ChimCánhCụt',
    avatar: '🐧',
    avatarBg: 'bg-babysky/70',
    moneyLeft: 19_800_000,
    trapsHit: 0,
    badge: 'Hiệp Sĩ Báo Cáo Spam',
    motto: 'Báo cáo là bản năng 🐧',
    reactionMs: 1_240,
  },

  /* ---------------- 🐑 HỘI CỪU NON ĐÁNG THƯƠNG ---------------- */
  {
    id: 'p8',
    name: 'OngMậtHamVui',
    avatar: '🐝',
    avatarBg: 'bg-butter/80',
    moneyLeft: 9_000_000,
    trapsHit: 2,
    badge: 'Chiến Thần Nạp Thẻ',
    motto: 'Nghe "hoàn vốn" là mắt sáng rực 🐝',
    reactionMs: 2_400,
  },
  {
    id: 'p9',
    name: 'ẾchConTòMò',
    avatar: '🐸',
    avatarBg: 'bg-mint/80',
    moneyLeft: 7_500_000,
    trapsHit: 3,
    badge: 'Thánh Bấm Link Trong Tin Rác',
    motto: 'Link nào cũng tò mò mở thử 🐸',
    reactionMs: 2_150,
  },
  {
    id: 'p10',
    name: 'GàConLạcLối',
    avatar: '🐤',
    avatarBg: 'bg-butter/70',
    moneyLeft: 5_000_000,
    trapsHit: 3,
    badge: 'Gà Con Lạc Lối',
    motto: 'Tin ai cũng tin, trừ mẹ mình 🐤',
    reactionMs: 2_600,
  },
  {
    id: 'p11',
    name: 'CừuNonNgâyThơ',
    avatar: '🐑',
    avatarBg: 'bg-taro/80',
    moneyLeft: 3_000_000,
    trapsHit: 4,
    badge: 'Chủ Tịch Hội Cúng Tiền',
    motto: '"Cháu chuyển khoản rồi ạ..." 🐑',
    reactionMs: 2_900,
  },
  {
    id: 'p12',
    name: 'NaiVàngNgơNgác',
    avatar: '🦌',
    avatarBg: 'bg-peach/60',
    moneyLeft: 2_400_000,
    trapsHit: 4,
    badge: 'Tổng Giám Đốc Cúng Tiền',
    motto: 'Cúng xong mới gọi hỏi lại bạn 🦌',
    reactionMs: 3_050,
  },
  {
    id: 'p13',
    name: 'MèoMunNgáo',
    avatar: '🐈',
    avatarBg: 'bg-babysky/70',
    moneyLeft: 1_200_000,
    trapsHit: 5,
    badge: 'Quán Quân OTP Quốc Dân',
    motto: 'Đọc OTP cho cả thế giới nghe 📢',
    reactionMs: 3_400,
  },
  {
    id: 'p14',
    name: 'KhỉConCàRốt',
    avatar: '🐒',
    avatarBg: 'bg-taro/60',
    moneyLeft: 500_000,
    trapsHit: 5,
    badge: 'Bé Ngoan Bị Lừa Full Set',
    motto: 'Tin cả thế giới ảo 🐒',
    reactionMs: 4_200,
  },
];

/* ------------------------------------------------------------------ */
/* 🔴 LIVE FEED — bảng tin "người chơi xung quanh"                     */
/* ------------------------------------------------------------------ */
export const LIVE_FEED_EVENTS: LiveFeedEvent[] = [
  { id: 'f1', avatar: '🐱', player: 'MèoBéo Ú', text: 'vừa ăn 100k tiền mồi rồi block scammer!', tone: 'good', amount: 100_000 },
  { id: 'f2', avatar: '🐑', player: 'CừuNonNgâyThơ', text: 'vừa mất 5.000.000đ vì đọc OTP cho "nhân viên ngân hàng"', tone: 'bad', amount: 5_000_000 },
  { id: 'f3', avatar: '🐰', player: 'ThỏNgọc', text: 'vừa vạch mặt shipper giả gửi file .APK!', tone: 'good' },
  { id: 'f4', avatar: '🐤', player: 'GàConLạcLối', text: 'vừa nạp 2.000.000đ để "hoàn vốn" nhiệm vụ thả tim', tone: 'bad', amount: 2_000_000 },
  { id: 'f5', avatar: '🐻', player: 'GấuMậpChill', text: 'vừa cúp máy "công an" trong đúng 3 giây 😎', tone: 'good' },
  { id: 'f6', avatar: '🐸', player: 'ẾchConTòMò', text: 'vừa nhập OTP vào link voucher lạ và mất 3.000.000đ', tone: 'bad', amount: 3_000_000 },
  { id: 'f7', avatar: '🐧', player: 'ChimCánhCụt', text: 'vừa tố cáo 12 tài khoản lừa đảo, được Shopee cảm ơn 🥰', tone: 'good' },
  { id: 'f8', avatar: '🦌', player: 'NaiVàngNgơNgác', text: 'vừa chuyển 8.000.000đ cho "bạn thân deepfake"', tone: 'bad', amount: 8_000_000 },
  { id: 'f9', avatar: '🦊', player: 'CáoNhỏNhanhTrí', text: 'vừa video call xác minh và né được clip AI!', tone: 'good' },
  { id: 'f10', avatar: '🐈', player: 'MèoMunNgáo', text: 'vừa "cúng" tiếp 4.500.000đ cho tài khoản giám định', tone: 'bad', amount: 4_500_000 },
  { id: 'f11', avatar: '🐝', player: 'OngMậtHamVui', text: 'vừa dừng lại kịp lúc trước khi nạp 10 triệu 🐝', tone: 'good' },
  { id: 'f12', avatar: '🐒', player: 'KhỉConCàRốt', text: 'vừa mất sạch ví vì tin "việc nhẹ lương cao"', tone: 'bad', amount: 19_500_000 },
];

/* ------------------------------------------------------------------ */
/* 🧮 Helpers                                                          */
/* ------------------------------------------------------------------ */
export const moneyLost = (player: Player): number => Math.max(0, START_MONEY - player.moneyLeft);

/** 🏆 Xếp hạng Thần Giữ Của: ít sập bẫy → phản xạ nhanh → nhiều tiền */
export const sortGuardians = (players: Player[]): Player[] =>
  [...players].sort(
    (a, b) => a.trapsHit - b.trapsHit || a.reactionMs - b.reactionMs || b.moneyLeft - a.moneyLeft,
  );

/** 🐑 Xếp hạng Cừu Non: mất nhiều tiền nhất → sập bẫy nhiều nhất */
export const sortVictims = (players: Player[]): Player[] =>
  [...players].sort((a, b) => moneyLost(b) - moneyLost(a) || b.trapsHit - a.trapsHit);

export const sortByCategory = (players: Player[], category: LeaderboardCategory): Player[] =>
  category === 'guardians' ? sortGuardians(players) : sortVictims(players);

/** Danh hiệu meme cho người chơi hiện tại ở bảng "Thần Giữ Của" */
export const getGuardianTitle = (trapsHit: number, moneyLeft: number): string => {
  if (trapsHit === 0 && moneyLeft > START_MONEY) return 'Thần Giữ Của Cấp Vũ Trụ 🏆';
  if (trapsHit === 0) return 'Hiệp Sĩ Chống Lừa Đảo 🛡️';
  if (trapsHit === 1) return 'Cảnh Giác Cấp Tập Sự 🌱';
  return 'Chiến Binh Đang Luyện Công 💪';
};

/** Danh hiệu meme cho người chơi hiện tại ở bảng "Cừu Non" */
export const getVictimTitle = (trapsHit: number, moneyLeft: number): string => {
  const lost = Math.max(0, START_MONEY - moneyLeft);
  if (trapsHit === 0 && lost === 0) return 'Người Ngoài Hành Tinh (Không Dính Bẫy Nào) 👽';
  if (lost >= 15_000_000) return 'Chủ Tịch Hội Cúng Tiền 🎖️';
  if (lost >= 10_000_000) return 'Tổng Giám Đốc Cúng Tiền 💸';
  if (lost >= 5_000_000) return 'Gà Con Lạc Lối 🐤';
  if (lost > 0) return 'Cừu Non Đáng Thương 🐑';
  return 'Tấm Chiếu Mới Chưa Trải 💫';
};
