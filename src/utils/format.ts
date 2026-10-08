/** 💰 Định dạng tiền Việt Nam: 20000000 → "20.000.000đ" */
export const formatVND = (amount: number): string =>
  `${new Intl.NumberFormat('vi-VN').format(Math.round(amount))}đ`;

/** 💸 Định dạng có dấu +/- để hiện hiệu ứng bay tiền: -5000000 → "-5.000.000đ" */
export const formatDeltaVND = (amount: number): string => {
  const sign = amount > 0 ? '+' : amount < 0 ? '-' : '';
  return `${sign}${formatVND(Math.abs(amount))}`;
};

/** 📝 Rút gọn số tiền cho bảng xếp hạng: 500000 → "500K", 1500000 → "1,5M" */
export const compactVND = (amount: number): string => {
  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    return `${Number.isInteger(millions) ? millions : millions.toFixed(1).replace('.', ',')}M`;
  }
  if (amount >= 1_000) return `${Math.round(amount / 1_000)}K`;
  return `${amount}`;
};

/** ⏱️ 1250ms → "1,25s" */
export const formatSeconds = (ms: number): string =>
  `${(ms / 1000).toFixed(2).replace('.', ',')}s`;

/** 🕐 Giờ hiển thị trên status bar: "19:45" */
export const formatClock = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};
