import type { Scenario } from '../types';

/**
 * 🎭 SCENARIOS — 5 cạm bẫy "có thật ngoài đời" nhưng thoại viết hóm hỉnh.
 * Cấu trúc mỗi vụ: 1 cú sập bẫy (isTrap: true) + 1 nước đi tỉnh táo (isTrap: false).
 */
export const SCENARIOS: Scenario[] = [
  {
    id: 1,
    kind: 'call',
    title: 'Cuộc gọi từ Bộ Công An',
    sticker: 'Mạo danh công an 🚨',
    callerName: 'CÁN BỘ ĐIỀU TRA CA.HN',
    callerNumber: '+84 24 3822 9999',
    callerAvatar: '👮',
    speech:
      '"A lô, cháu là sinh viên phải không? Số CCCD của cháu dính vụ rửa tiền xuyên quốc gia 50 tỷ đó. Lệnh bắt tạm giam đã duyệt rồi nha! Giờ chuyển ngay 15.000.000₫ vào tài khoản giám định của Viện Kiểm Sát để phong tỏa tạm thời, trong sạch sẽ hoàn trả sau 2 giờ. Nhanh lên, chậm là chú không cứu được đâu!"',
    choices: [
      {
        id: 'c1-trap',
        text: '😱 Hoảng quá! Chuyển ngay 15.000.000₫ để chứng minh mình trong sạch',
        isTrap: true,
        moneyDelta: -15_000_000,
        hpDelta: -40,
        feedback:
          'Chuyển xong, "cán bộ" tắt máy cái *bụp*. Số dư còn đúng 5 triệu và Heo Tiết Kiệm đang khóc như mưa 🥺',
        debriefTitle: 'BẪY TÂM LÝ: ĐE DỌA + TẠO SỰ KHẨN CẤP',
        debriefExplanation:
          'Công an, Viện Kiểm Sát KHÔNG BAO GIỜ làm việc qua điện thoại và không bao giờ có "tài khoản an toàn" hay "tài khoản giám định" để dân nộp tiền. Chúng dùng nỗi sợ để bộ não bạn... đơ luôn.',
        tip: 'Câu thần chú: "Mời các chú gửi giấy mời về Công an phường, em lên làm việc trực tiếp!" rồi dập máy. Báo ngay đường dây nóng 113.',
      },
      {
        id: 'c1-safe',
        text: '🧊 Bình tĩnh: "Mời anh gửi giấy triệu tập về Công an phường, em lên làm việc trực tiếp!" rồi dập máy',
        isTrap: false,
        moneyDelta: 0,
        hpDelta: 0,
        feedback:
          'Kẻ mạo danh cứng họng, cúp máy trong 3 giây. Ví tiền nguyên vẹn, tâm lý thảnh thơi! 💖',
        debriefTitle: 'NƯỚC ĐI ĐỈNH CAO: BÌNH TĨNH + NGUYÊN TẮC',
        debriefExplanation:
          'Mọi thủ tục tố tụng hình sự đều phải thực hiện bằng văn bản, trực tiếp tại trụ sở cơ quan có thẩm quyền. Cứ đòi giấy tờ là bên kia tự "bốc hơi".',
        tip: 'Nghe dọa bắt bớ qua điện thoại = 100% lừa đảo. Càng giục gấp càng phải chậm lại.',
      },
    ],
  },
  {
    id: 2,
    kind: 'chat',
    title: 'Việc nhẹ lương cao',
    sticker: 'Thả tim kiếm tiền 💸',
    appHeader: 'Tuyển Dụng TikTok Mall',
    appEmoji: '💼',
    subText: 'Telegram • Đang hoạt động',
    messages: [
      { from: 'them', text: 'Chào em nha, chị là HR bên đối tác truyền thông TikTok. Bên chị tuyển CTV ngồi nhà thả tim video thui 🥰' },
      { from: 'them', text: 'Mỗi lượt thả tim 20.000₫ - 50.000₫, ngày kiếm 800k - 1,5 triệu. Nhẹ như lông thỏ luôn á!' },
      { from: 'them', text: 'Chị ứng trước cho em 100.000₫ hoa hồng nè 💰 Giờ em nạp 500.000₫ làm nhiệm vụ đơn hoàn vốn, nhận về 800.000₫ liền tay nhé!' },
    ],
    choices: [
      {
        id: 'c2-trap',
        text: '🤑 Dễ ăn quá! Chuyển luôn 500.000₫ để nhận nhiệm vụ VIP hơn',
        isTrap: true,
        moneyDelta: -500_000,
        hpDelta: -25,
        feedback:
          'Nạp xong chúng báo "sai cú pháp", ép nạp tiếp 2 triệu rồi 5 triệu. Heo Tiết Kiệm kêu "oắt" một tiếng đầy bi thương 🐷😭',
        debriefTitle: 'BẪY "THẢ CON TÉP BẮT CON TÔM"',
        debriefExplanation:
          'Kẻ lừa đảo sẵn sàng cho bạn ăn 100k tiền thật để mua niềm tin, sau đó dắt bạn nạp số tiền lớn dần theo cấp số nhân rồi khóa tài khoản.',
        tip: 'Không có công việc nào đòi NẠP TIỀN để làm nhiệm vụ. Đòi nạp tiền trước = 100% lừa đảo.',
      },
      {
        id: 'c2-safe',
        text: '😎 Nhận 100k tiền mồi rồi Chặn + Báo cáo (Block & Report) vĩnh viễn',
        isTrap: false,
        moneyDelta: 100_000,
        hpDelta: 0,
        feedback:
          'Quá ngầu! Bạn ăn trọn 100k tiền mồi của kẻ lừa đảo rồi block thẳng tay. Heo Tiết Kiệm nhảy múa 🐷✨',
        debriefTitle: 'TỈNH TÁO VỚI CHIÊU "MIẾNG PHÔ MAI MIỄN PHÍ"',
        debriefExplanation:
          'Nhận diện sớm mẫu tin nhắn hoa hồng nhiệm vụ giúp bạn không bao giờ rơi vào vòng xoáy nạp bù để "cứu vốn" — vòng xoáy không có lối ra.',
        tip: 'Cảnh giác mọi tin tuyển dụng không có pháp nhân công ty rõ ràng trên Telegram/Zalo.',
      },
    ],
  },
  {
    id: 3,
    kind: 'chat',
    title: 'Shipper giả gửi file APK',
    sticker: 'Shipper giả 📦',
    appHeader: 'Giao Hàng Tiết Kiệm',
    appEmoji: '🚚',
    subText: 'SMS Brandname giả mạo',
    messages: [
      { from: 'them', text: '[GHTK-TB]: Đơn hàng #VN892104 của bạn giao KHÔNG thành công do sai địa chỉ nhận ạ.' },
      { from: 'me', text: 'Ơ, mình đâu có đặt đơn nào mã này nhỉ? 🤔' },
      {
        from: 'them',
        text: 'Dạ đơn đặt bằng đúng số này ạ. Để nhận lại hàng và không bị phạt 200.000₫ tiền lưu kho, bạn vui lòng tải app tại: http://ghtk-xacminh-donhang.apk.cc rồi nhập OTP ngân hàng để xác thực nha!',
      },
      {
        from: 'them',
        text: 'Bạn cài trong 5 phút giúp em nha, quá thời gian hệ thống tự hủy đơn và trừ phí lưu kho đó ạ! ⏰',
      },
    ],
    choices: [
      {
        id: 'c3-trap',
        text: '📥 Tải ngay file .APK từ link về cài đặt cho kịp nhận kiện hàng',
        isTrap: true,
        moneyDelta: -10_000_000,
        hpDelta: -35,
        feedback:
          'Mã độc xin quyền "Trợ năng", đọc trộm OTP rồi tự rút sạch 10.000.000₫ trong 40 giây. Trợn tròn mắt! 😵',
        debriefTitle: 'BẪY MÃ ĐỘC ẨN TRONG FILE .APK',
        debriefExplanation:
          'File .APK ngoài Google Play/App Store có thể chứa spyware: đọc tin nhắn SMS, tự bấm nút chuyển tiền, xóa dấu vết — bạn không hề hay biết.',
        tip: 'KHÔNG BAO GIỜ tải .APK từ link tin nhắn. App chính thống chỉ có trên Google Play hoặc App Store.',
      },
      {
        id: 'c3-safe',
        text: '🔍 Mở app vận chuyển chính thức tra mã vận đơn, xóa tin nhắn rác',
        isTrap: false,
        moneyDelta: 0,
        hpDelta: 0,
        feedback: 'Tra xong: chẳng có đơn nào như vậy. Bạn né mã độc ngoạn mục, Heo Tiết Kiệm thở phào 🐷💨',
        debriefTitle: 'NGUYÊN TẮC: XÁC THỰC KÊNH CHÍNH THỐNG',
        debriefExplanation:
          'Đơn vị vận chuyển lớn không bao giờ bắt khách tải file ngoài hay nhập OTP ngân hàng. Mọi thông báo đều tra được trên app chính thức.',
        tip: 'Nghi ngờ 1 tin nhắn → mở app/web chính thức tự tra. Đừng bao giờ bấm link trong tin nhắn.',
      },
    ],
  },
  {
    id: 4,
    kind: 'chat',
    title: 'Voucher Shopee 500k',
    sticker: 'Quà tặng ảo 🎁',
    appHeader: 'Shopee Voucher VIP',
    appEmoji: '🎁',
    subText: 'Tài khoản lạ • Vừa xong',
    messages: [
      { from: 'them', text: '🎉 CHÚC MỪNG! Tài khoản của bạn trúng Voucher 500.000₫ mừng đại lễ của Shopee Mall!' },
      {
        from: 'them',
        text: 'Bạn chỉ cần đăng nhập link này: shopee-voucher-vip.xyz/nhanqua và nhập OTP để xác minh chính chủ. Voucher chỉ giữ 5 phút thui nha ⏰',
      },
      { from: 'them', text: 'Hiện còn 3 suất cuối nè, nhanh tay kẻo hết! 🔥' },
    ],
    choices: [
      {
        id: 'c4-trap',
        text: '🎉 Nhập ngay số thẻ, ngày hết hạn và mã OTP để nhận 500.000₫',
        isTrap: true,
        moneyDelta: -5_000_000,
        hpDelta: -30,
        feedback: 'Voucher không thấy đâu, chỉ thấy biến động số dư -5.000.000₫. Heo Tiết Kiệm ngất tại chỗ 💸😵',
        debriefTitle: 'BẪY TRANG PHISHING GẮN TÊN SHOPEE',
        debriefExplanation:
          'Trang web tên miền lạ (shopee-...xyz) sao chép y hệt giao diện Shopee để cướp tài khoản và OTP. Nhập OTP = đưa chìa khóa két cho kẻ trộm.',
        tip: 'Không sàn TMĐT nào xin OTP qua link lạ. Voucher thật luôn nằm trong mục "Voucher của tôi" trên app.',
      },
      {
        id: 'c4-safe',
        text: '🗑️ Bỏ qua, xóa tin rác & tố cáo tin nhắn lừa đảo',
        isTrap: false,
        moneyDelta: 0,
        hpDelta: 0,
        feedback: 'Bạn báo cáo tin nhắn, Shopee khóa luôn tài khoản giả. Heo Tiết Kiệm vỗ tay bôm bốp 🐷👏',
        debriefTitle: 'PHẢN XẠ CHUẨN: KHÔNG BẤM LINK — TỐ CÁO NGAY',
        debriefExplanation:
          'Mọi chương trình khuyến mãi thật đều hiện trong app chính thức sau khi bạn đăng nhập. Có link lạ = có mùi cá mập.',
        tip: 'Soi tên miền thật kỹ: chỉ tin shopee.vn, tiki.vn, lazada.vn... Tuyệt đối không tin .xyz, .apk.cc.',
      },
    ],
  },
  {
    id: 5,
    kind: 'call',
    title: 'Bạn thân Deepfake mượn tiền',
    sticker: 'Deepfake AI 🤖',
    callerName: 'TUẤN — BẠN THÂN 10 NĂM',
    callerNumber: '+84 90 123 4567',
    callerAvatar: '🧑‍🤝‍🧑',
    speech:
      '"Ê mạy ơi chết tao rồi! Tao vừa tông vào xe người ta, công an đang giữ xe, phải đền gấp 8 triệu mới cho đi. Chuyển khoản liền cho tao đi, tao... tao lạy mạy luôn đó!" [Giọng hơi đều đều, khung hình thì mờ mờ...]',
    choices: [
      {
        id: 'c5-trap',
        text: '😰 Lo cho bạn quá! Chuyển ngay 8.000.000₫ vào số tài khoản lạ kia',
        isTrap: true,
        moneyDelta: -8_000_000,
        hpDelta: -35,
        feedback: 'Gọi lại cho Tuấn thật thì... Tuấn đang ngủ trưa ở nhà. 8 triệu bay theo "gương mặt" làm bằng AI 🤖💸',
        debriefTitle: 'BẪY DEEPFAKE: GƯƠNG MẶT & GIỌNG NÓI CÓ THỂ LÀ GIẢ',
        debriefExplanation:
          'Kẻ gian lấy 3-5 giây video/giọng nói từ Facebook, TikTok của người thân rồi dựng clip AI, nhắm thẳng vào cảm xúc gấp gáp của bạn.',
        tip: 'Luôn GỌI VIDEO trực tiếp, hoặc hỏi 1 câu riêng tư mà AI không biết. Chuyển tiền phải xác minh qua "kênh 2".',
      },
      {
        id: 'c5-safe',
        text: '📞 Cúp máy, gọi video call lại & hỏi câu hỏi riêng tư để xác minh',
        isTrap: false,
        moneyDelta: 0,
        hpDelta: 0,
        feedback: 'Video call thật: Tuấn đang ngủ trưa 🛌 Bạn vừa né nguyên một clip deepfake. Quá đỉnh! 🛡️',
        debriefTitle: 'XÁC MINH 2 LỚP: KÊNH KHÁC + CÂU HỎI RIÊNG',
        debriefExplanation:
          'Deepfake rất dễ "lộ" khi bị hỏi bất ngờ hoặc khi bạn chuyển sang kênh liên lạc khác (video call, gọi người thân chung).',
        tip: 'Tin nhắn xin tiền + gấp gáp + số tài khoản lạ = kích hoạt ngay "quy trình video call xác minh".',
      },
    ],
  },
];
