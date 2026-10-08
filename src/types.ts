/**
 * 🐰 CyberScam Kawaii — Kiểu dữ liệu dùng chung
 */

export type ScenarioKind = 'call' | 'chat';

export interface Choice {
  id: string;
  /** Nội dung lựa chọn người chơi bấm */
  text: string;
  /** true = dính bẫy, false = né bẫy */
  isTrap: boolean;
  /** Tiền thay đổi: âm = mất tiền, dương = lời tiền (ăn được tiền mồi) */
  moneyDelta: number;
  /** HP "Tâm Lý Thảnh Thơi" thay đổi: chỉ có thể là 0 hoặc số âm */
  hpDelta: number;
  /** Lời thoại phản hồi ngay sau khi chọn */
  feedback: string;
  /** Tiêu đề thẻ giải mã bẫy của Thỏ Thám Tử */
  debriefTitle: string;
  /** Vì sao bẫy này nguy hiểm */
  debriefExplanation: string;
  /** Tip phòng tránh ngắn gọn */
  tip: string;
}

export interface ChatMessage {
  from: 'them' | 'me';
  text: string;
}

interface ScenarioBase {
  id: number;
  kind: ScenarioKind;
  /** Tên vụ án hiển thị trên Dynamic Island */
  title: string;
  /** Nhãn dán hóm hỉnh */
  sticker: string;
  choices: Choice[];
}

export interface CallScenario extends ScenarioBase {
  kind: 'call';
  callerName: string;
  callerNumber: string;
  callerAvatar: string;
  speech: string;
}

export interface ChatScenario extends ScenarioBase {
  kind: 'chat';
  appHeader: string;
  appEmoji: string;
  subText: string;
  messages: ChatMessage[];
}

export type Scenario = CallScenario | ChatScenario;

/* ------------------------------------------------------------------ */
/* Bảng xếp hạng                                                       */
/* ------------------------------------------------------------------ */

export interface Player {
  id: string;
  name: string;
  /** Emoji chibi làm avatar */
  avatar: string;
  /** Tailwind bg class cho vòng avatar */
  avatarBg: string;
  /** 20.000.000đ = ví nguyên vẹn */
  moneyLeft: number;
  /** Số lần sập bẫy */
  trapsHit: number;
  /** Danh hiệu meme hài hước */
  badge: string;
  /** Câu cửa miệng / trạng thái */
  motto: string;
  /** Phản xạ né scam trung bình (ms) — càng nhỏ càng ngầu */
  reactionMs: number;
  /** Đây là người chơi hiện tại */
  isYou?: boolean;
}

export interface LiveFeedEvent {
  id: string;
  avatar: string;
  player: string;
  text: string;
  tone: 'good' | 'bad';
  amount?: number;
}

export type LeaderboardCategory = 'guardians' | 'victims';
export type AppTab = 'game' | 'leaderboard';
