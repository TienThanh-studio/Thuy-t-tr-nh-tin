/**
 * ============================================================================
 * [PHẦN 1: THÔNG TIN TÙY CHỈNH CỦA NHÓM - DỄ DÀNG CHỈNH SỬA TẠI ĐÂY]
 * Bạn có thể sửa trực tiếp các thông tin bên dưới (Chủ đề, Tên nhóm, Thành viên,
 * Email đại diện, Ngày cập nhật) hoặc bấm nút "Tùy chỉnh thông tin nhóm" ngay
 * trên giao diện trang web để cập nhật và tải tệp index.html về nộp bài.
 * ============================================================================
 */

export interface TeamMember {
  name: string;
  role: string;
  email: string;
  isRepresentative?: boolean;
}

export interface ArticleItem {
  id: string;
  orderNumber: string;
  category: 'Tản văn' | 'Thơ' | 'Cảm nghĩ' | 'Hồi ức';
  title: string;
  subtitle: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  excerpt: string;
  pullQuote: string;
  content: string[];
  isPoetry?: boolean;
  coverImage: string;
  coverCaption: string;
}

export interface PhotoItem {
  id: string;
  figureCode: string;
  title: string;
  category: string;
  dateTaken: string;
  photographer: string;
  src: string;
  aspectClass: string;
  caption: string;
  memoryStory: string;
}

export interface AudioTrack {
  id: string;
  number: string;
  title: string;
  composer: string;
  performer: string;
  durationLabel: string;
  description: string;
  melodyPreset: 'bui_phan' | 'ky_uc_mai_truong';
}

export interface CommentItem {
  id: string;
  fullName: string;
  roleOrClass: string;
  message: string;
  createdAt: string;
  dedicatedTo?: string;
}

export interface WallPaperConfig {
  // 1. Chủ đề trang báo
  issueNumber: string;
  newspaperTitle: string;
  newspaperSubTheme: string;
  schoolName: string;
  className: string;
  lastUpdated: string; // Ngày cập nhật gần nhất: 17/11/2026

  // 2. Tên nhóm thực hiện
  teamName: string;
  teamSlogan: string;
  teamDescription: string;

  // 3. Danh sách thành viên & Email đại diện
  members: TeamMember[];

  // 4. Nguồn tài liệu, hình ảnh, âm nhạc tham khảo
  references: {
    category: string;
    detail: string;
  }[];
}

export const INITIAL_WALLPAPER_CONFIG: WallPaperConfig = {
  // === SỬA CHỦ ĐỀ TRANG BÁO TẠI ĐÂY ===
  issueNumber: 'Số Đặc Biệt · Kỷ Niệm 44 Năm Ngày Nhà Giáo Việt Nam (20/11/1982 – 20/11/2026)',
  newspaperTitle: 'Chuyến Đò Tri Thức',
  newspaperSubTheme: 'Tri ân Thầy Cô — Chào mừng Ngày Nhà giáo Việt Nam 20/11 & Tuổi học trò dưới mái trường',
  schoolName: 'Trường THPT Phan Đình Phùng',
  className: 'Tập thể Lớp 12A1 — Niên khóa 2024 – 2027',
  lastUpdated: '17/11/2026',

  // === SỬA TÊN NHÓM THỰC HIỆN TẠI ĐÂY ===
  teamName: 'Nhóm Bút Trẻ Mùa Thu (Tổ 1 & Tổ 2 - Lớp 12A1)',
  teamSlogan: 'Gìn giữ từng nét phấn trắng, gửi trọn vạn lời tri ân',
  teamDescription:
    'Nhóm Bút Trẻ Mùa Thu gồm 5 thành viên yêu văn chương, nhiếp ảnh và thiết kế web của tập thể lớp 12A1. Tờ báo tường điện tử này là món quà tinh thần chúng em kính dâng lên quý Thầy Cô nhân dịp 20/11.',

  // === SỬA DANH SÁCH THÀNH VIÊN & EMAIL ĐẠI DIỆN TẠI ĐÂY ===
  members: [
    {
      name: 'Nguyễn An Minh',
      role: 'Trưởng nhóm · Tổng biên tập & Lập trình giao diện',
      email: 'nguyenan20062000@gmail.com',
      isRepresentative: true,
    },
    {
      name: 'Trần Ngọc Bảo Châu',
      role: 'Phó nhóm · Biên tập nội dung & Chấp bút Lời ngỏ',
      email: 'baochau.12a1.editorial@edu.vn',
      isRepresentative: true,
    },
    {
      name: 'Lê Hoàng Minh Khôi',
      role: 'Sáng tác Thơ & Tản văn',
      email: 'minhkhoi.literature@edu.vn',
      isRepresentative: false,
    },
    {
      name: 'Phạm Hà Phương Linh',
      role: 'Nhiếp ảnh & Tuyển chọn Góc ảnh kỷ niệm',
      email: 'phuonglinh.visuals@edu.vn',
      isRepresentative: false,
    },
    {
      name: 'Vũ Đức Trọng Nhân',
      role: 'Biên tập Âm nhạc, Dựng Video clip & Kỹ thuật số',
      email: 'trongnhan.media@edu.vn',
      isRepresentative: false,
    },
  ],

  // === SỬA TRÍCH DẪN NGUỒN THAM KHẢO TẠI ĐÂY ===
  references: [
    {
      category: 'Tư liệu Văn học & Thơ ca',
      detail:
        'Các tác phẩm sáng tác tự chọn của tập thể học sinh lớp 12A1; lấy cảm hứng từ ca khúc "Bụi Phấn" (Nhạc sĩ Vũ Hoàng & Lê Văn Lộc) và thơ tri ân nhà giáo Việt Nam.',
    },
    {
      category: 'Hình ảnh & Nhiếp ảnh',
      detail:
        'Bộ ảnh tư liệu nghệ thuật "Mùa Thu Dưới Mái Trường" do Ban Nhiếp ảnh Nhóm Bút Trẻ Mùa Thu thực hiện kết hợp kho lưu trữ Kỷ yếu THPT (2024–2026).',
    },
    {
      category: 'Âm nhạc & Phim tư liệu',
      detail:
        'Bản phối khí độc quyền Piano & Music Box "Bụi Phấn" và "Ký Ức Dưới Mái Trường" được tổng hợp bằng chuẩn âm thanh Web Audio API chất lượng cao, phát trực tiếp không cần kết nối mạng.',
    },
    {
      category: 'Phông chữ & Thiết kế (Typography)',
      detail:
        'Sử dụng hệ thống phông chữ học thuật Google Fonts: Playfair Display, Lora, Plus Jakarta Sans và JetBrains Mono theo phong cách ấn phẩm báo chí cổ điển.',
    },
  ],
};

export const HERO_IMAGE_PATH = '/src/assets/images/hero_school_courtyard_1794923380167.jpg';

export const EDITORIAL_INTRO = {
  kicker: 'Chuyên mục 01 · Bài Giới Thiệu & Lời Ngỏ',
  title: 'Những Người Gieo Hạt Thầm Lặng Bên Thềm Tháng Mười Một',
  epigraph:
    '“Có một nghề bụi phấn bám đầy tay — Người ta bảo đó là nghề trong sạch nhất. Có một nghề không trồng cây vào đất — Mà mang lại choĐời đầy trái ngọt hoa tươi.”',
  paragraphs: [
    'Tháng Mười Một lại về trong làn gió heo may se lạnh và sắc nắng vàng như mật trải dài trên từng bậc thềm lớp học. Giữa nhịp sống hối hả của thời đại số, khi những trang vở giấy dần song hành cùng màn hình máy tính, có những giá trị vẫn vẹn nguyên không bao giờ đổi thay: đó là ánh mắt bao dung của Thầy, là giọng giảng ấm áp của Cô, và là tiếng viên phấn trắng chạm nhẹ lên mặt bảng đen mỗi sớm mai.',
    'Chúng em thường ví Thầy Cô như những người lái đò cần mẫn trên dòng sông tri thức. Năm tháng qua đi, bao thế hệ học trò đã cập bến bờ ước mơ, mang theo hành trang là những bài học làm người, lòng nhân ái và khát vọng vươn xa. Còn người lái đò ấy vẫn lặng lẽ ở lại bến sông xưa, mái tóc điểm thêm nhiều sợi bạc theo từng mùa hoa phượng nở rồi lại tàn.',
    'Thực hiện tờ báo tường điện tử mang tên “Chuyến Đò Tri Thức”, tập thể Nhóm Bút Trẻ Mùa Thu mong muốn kiến tạo một không gian lưu giữ ký ức thật trang trọng và lắng đọng. Từng bài tản văn, từng vần thơ mộc mạc, từng khung hình kỷ niệm và những dòng lưu bút nơi đây đều được viết nên từ lòng biết ơn chân thành nhất của tuổi học trò dưới mái trường thân yêu.',
  ],
  signatureTitle: 'Thay mặt Ban Biên Tập Báo Tường',
  signatureName: 'Tập thể Nhóm Bút Trẻ Mùa Thu — Lớp 12A1',
};

export const ARTICLES_DATA: ArticleItem[] = [
  {
    id: 'art-bui-phan',
    orderNumber: '01',
    category: 'Tản văn',
    title: 'Màu Phấn Trắng Và Những Mùa Thu Đi Qua Mái Tóc Thầy',
    subtitle: 'Tản văn đạt giải Nhất cuộc thi viết Tri ân Thầy Cô cấp Trường năm học 2026',
    author: 'Trần Ngọc Bảo Châu',
    authorRole: 'Học sinh Lớp 12A1',
    date: '15/11/2026',
    readTime: '5 phút đọc',
    coverImage: '/src/assets/images/gallery_teacher_blackboard_1794923384996.jpg',
    coverCaption: 'Giờ giảng Văn học cuối thu bên khung cửa sổ ngập nắng.',
    excerpt:
      'Chiều thu năm cuối cấp, tôi ngồi ở bàn đầu, lặng nhìn những hạt bụi phấn li ti bay trong vệt nắng xiên qua khung cửa gỗ. Chưa bao giờ tôi nhận ra mái tóc cô chủ nhiệm lại pha nhiều sương trắng đến thế...',
    pullQuote:
      'Hóa ra những hạt bụi phấn không hề rơi xuống đất rồi tan biến; chúng đậu lại trên mái tóc thầy cô, và hóa thành ánh sáng mở đường trong tâm hồn chúng tôi.',
    content: [
      'Chiều thu năm cuối cấp, tôi ngồi ở dãy bàn đầu tiên gần bục giảng, lặng nhìn những hạt bụi phấn li ti xoay tròn trong vệt nắng vàng óng xiên qua khung cửa sổ gỗ. Cô giáo dạy Văn của chúng tôi đang say sưa giảng về vẻ đẹp của những trang thơ cổ điển, bàn tay cô đưa từng nét chữ thanh thoát, mềm mại trên tấm bảng xanh sẫm màu thời gian.',
      'Đã gần ba năm gắn bó dưới mái trường THPT, thế nhưng phải đến khoảnh khắc bình yên ấy, khi chỉ còn vài tháng nữa là tiếng trống trường cuối cùng của tuổi học trò điểm nhịp, tôi mới chợt nhận ra mái tóc cô đã pha nhiều sợi bạc đến nhường nào. Những sợi tóc trắng lẫn vào bụi phấn khiến lòng tôi bất giác chùng xuống.',
      'Tôi nhớ những ngày đầu bước vào lớp Mười với biết bao bỡ ngỡ. Tôi vốn là một đứa học trò nhút nhát, luôn sợ phải đứng trước đám đông trình bày ý kiến. Chính cô là người đã nán lại sau giờ học, kiên nhẫn đọc từng đoạn văn vụng về trong cuốn sổ tay của tôi, gạch chân dưới những câu viết chân thật nhất và mỉm cười khích lệ: “Em có một tâm hồn rất biết lắng nghe, hãy cứ viết bằng chính trái tim mình.”',
      'Thầy cô chẳng bao giờ kể về những đêm thức khuya chấm từng xấp bài kiểm tra dày cộp khi phố phường đã chìm vào giấc ngủ. Thầy cô cũng chẳng bao giờ than phiền về những lần khản giọng vì giảng bài suốt năm tiết học liên tiếp, hay những nỗi lo lắng thầm lặng khi thấy một học trò trong lớp sa sút tinh thần.',
      'Hóa ra, những hạt bụi phấn không hề rơi xuống đất rồi tan biến; chúng đậu lại trên mái tóc thầy cô, và hóa thành ánh sáng mở đường trong tâm hồn chúng tôi. Ngày 20 tháng 11 năm nay là mùa tri ân cuối cùng của chúng tôi trong màu áo trắng học trò. Xin gửi lại nơi bục giảng này lòng biết ơn sâu sắc nhất dành cho những người đã dành cả thanh xuân để viết nên tương lai cho bao thế hệ.',
    ],
  },
  {
    id: 'art-nguoi-lai-do',
    orderNumber: '02',
    category: 'Thơ',
    title: 'Khúc Ca Người Gieo Ánh Sáng Bên Bến Sông Xưa',
    subtitle: 'Sáng tác thơ tự do kính tặng các Thầy Cô nhân dịp 20/11',
    author: 'Lê Hoàng Minh Khôi',
    authorRole: 'Thành viên Câu lạc bộ Văn học 12A1',
    date: '16/11/2026',
    readTime: '3 phút đọc',
    isPoetry: true,
    coverImage: '/src/assets/images/gallery_school_library_1794923380931.jpg',
    coverCaption: 'Góc bàn đọc sách và trang sổ tay chép thơ mùa thu.',
    excerpt:
      'Tháng mười một gió về ngang cửa lớp / Nắng dịu dàng hong ấm những trang thơ / Thầy vẫn đứng bên bục gỗ đơn sơ / Gieo con chữ nở thành hoa tri thức...',
    pullQuote:
      'Dẫu mai này tung cánh khắp muôn phương / Giữa biển lớn vẫn nhớ về bến cũ / Nơi có Thầy cùng ngọn đèn không ngủ / Soi bước em đi suốt vạn dặm đường đời.',
    content: [
      'Tháng mười một gió về ngang cửa lớp\nNắng dịu dàng hong ấm những trang thơ\nThầy vẫn đứng bên bục gỗ đơn sơ\nGieo con chữ nở thành hoa tri thức.',
      'Bao mùa phượng cháy hồng rồi lại tắt\nBao chuyến đò lặng lẽ vượt dòng sông\nTiếng giảng bài sưởi ấm những ngày đông\nTừng nét phấn vẽ chân trời rộng mở.',
      'Em nhớ mãi những buổi chiều bỡ ngỡ\nBài toán khó làm nhòe cả hàng mi\nCô dịu hiền chỉ dẫn từng bước đi\nDạy em biết đứng lên từ vấp ngã.',
      'Thời gian trôi như dòng sông hối hả\nBụi phấn rơi điểm trắng mái đầu xanh\nCho chúng em trọn vẹn những ước lành\nMang hành trang bước vào đời vững chãi.',
      'Dẫu mai này tung cánh khắp muôn phương\nGiữa biển lớn vẫn nhớ về bến cũ\nNơi có Thầy cùng ngọn đèn không ngủ\nSoi bước em đi suốt vạn dặm đường đời.',
    ],
  },
  {
    id: 'art-trang-vo-cu',
    orderNumber: '03',
    category: 'Cảm nghĩ',
    title: 'Lời Dặn Dò Cuối Trang Vở Nháp Và Bài Học Làm Người',
    subtitle: 'Hồi ức nhỏ về người thầy dạy Toán nghiêm khắc nhưng giàu tình thương',
    author: 'Nguyễn An Minh',
    authorRole: 'Trưởng nhóm Bút Trẻ Mùa Thu',
    date: '16/11/2026',
    readTime: '4 phút đọc',
    coverImage: '/src/assets/images/gallery_student_memories_1794923379511.jpg',
    coverCaption: 'Khoảnh khắc rạng rỡ của tuổi học trò cùng những bó hoa tươi thắm.',
    excerpt:
      'Trong ngăn kéo bàn học của tôi đến tận bây giờ vẫn giữ một tờ giấy kiểm tra Hình học từ năm lớp Mười Một. Điểm số không phải là mười tròn trĩnh, nhưng dòng chữ mực đỏ của Thầy ở góc trang giấy đã thay đổi tôi mãi mãi...',
    pullQuote:
      'Một bài toán có thể giải bằng nhiều cách, nhưng sự trung thực và lòng kiên trì thì chỉ có một con đường duy nhất.',
    content: [
      'Trong ngăn kéo bàn học của tôi đến tận bây giờ vẫn giữ phẳng phiu một tờ giấy kiểm tra môn Hình học từ học kỳ một năm lớp Mười Một. Điểm số trên tờ giấy ấy không phải là điểm mười tròn trĩnh, nhưng dòng nhận xét viết bằng mực đỏ nắn nót ở cuối trang của thầy Hùng — giáo viên dạy Toán — đã thay đổi thái độ sống của tôi mãi mãi.',
      'Hôm ấy là một bài kiểm tra một tiết khá hóc búa. Vì quá lo lắng về điểm số, ở câu cuối cùng khi chưa tìm ra hướng chứng minh chặt chẽ, tôi đã chép vội kết quả từ nháp của người bạn ngồi cạnh mà không hiểu bản chất. Tôi cứ ngỡ giữa hàng chục bài kiểm tra, thầy sẽ chỉ lướt qua đáp số cuối cùng.',
      'Thế nhưng hôm trả bài, thầy không hề trách mắng tôi trước lớp. Cuối buổi học, thầy gọi riêng tôi lại hành lang, trao tận tay bài kiểm tra. Bên dưới phần lời giải bỏ dở của tôi, thầy đã tự tay vẽ lại hình phụ và giải thích chi tiết từng bước suy luận, kèm theo một dòng chữ nhỏ: “Thầy tin Minh hoàn toàn đủ khả năng tự mình chinh phục bài toán này vào lần tới. Một bài toán có thể giải bằng nhiều cách, nhưng sự trung thực và lòng kiên trì thì chỉ có một con đường duy nhất.”',
      'Sự bao dung và tinh tế của thầy khiến tôi vừa xấu hổ vừa biết ơn vô hạn. Từ ngày hôm đó, tôi học cách đối diện với những điều mình chưa biết bằng sự nỗ lực tự thân. Cảm ơn Thầy không chỉ dạy chúng em những định lý toán học khô khan, mà còn dạy chúng em định lý quan trọng nhất của cuộc đời: sống tử tế và không ngừng cố gắng.',
    ],
  },
  {
    id: 'art-khoanh-khac-san-truong',
    orderNumber: '04',
    category: 'Hồi ức',
    title: 'Tiếng Trống Trường, Hàng Cây Xà Cừ Và Bầu Trời Tuổi Mười Tám',
    subtitle: 'Ghi chép về những buổi chiều thu rực nắng trên sân trường thân thương',
    author: 'Phạm Hà Phương Linh',
    authorRole: 'Biên tập viên Góc Ảnh 12A1',
    date: '17/11/2026',
    readTime: '4 phút đọc',
    coverImage: '/src/assets/images/gallery_graduation_yard_1794923382659.jpg',
    coverCaption: 'Những hàng xe đạp thẳng tắp dưới tán cây cổ thụ mỗi chiều tan học.',
    excerpt:
      'Sẽ có một ngày chúng ta bước qua cánh cổng trường lần cuối, ngoái đầu nhìn lại dãy hành lang màu vàng cổ kính và chợt ước giá như thời gian có thể trôi chậm lại dù chỉ một khắc...',
    pullQuote:
      'Mái trường không chỉ là một địa danh trên bản đồ thành phố, mà là quê hương thứ hai của tuổi trẻ.',
    content: [
      'Mỗi buổi sớm mai khi đạp xe qua con phố ngập lá vàng rơi để tiến vào cổng trường, tôi luôn thích ngước nhìn những tán cây cổ thụ vươn cao che rợp cả một góc sân. Dưới bóng mát ấy là biết bao thế hệ học sinh đã từng ngồi ôn bài, từng chia nhau ổ bánh mì nóng hổi hay cùng nhau tập văn nghệ mỗi độ tháng Mười Một về.',
      'Tuổi mười tám của chúng tôi gắn liền với những dãy tường vàng nhuốm màu thời gian, những khung cửa chớp màu xanh thẫm và tiếng trống trường vang vọng. Ở nơi đó, mỗi thầy cô giáo là một mảnh ghép ấm áp tạo nên bức tranh thanh xuân rực rỡ nhất. Có thầy giám thị nhìn bề ngoài nghiêm nghị nhưng luôn chuẩn bị sẵn ô cho học sinh những chiều mưa bất chợt; có cô thủ thư hiền hậu nhớ rõ sở thích đọc sách của từng đứa học trò.',
      'Sẽ có một ngày không xa, chúng tôi bước qua cánh cổng trường lần cuối với tư cách là học sinh phổ thông. Nhưng tôi tin rằng, dù đi đến bất cứ nơi đâu, mỗi khi nghe giai điệu quen thuộc của bài hát về thầy cô ngân lên, trái tim chúng tôi vẫn sẽ hướng về khoảng sân đầy nắng này với vẹn nguyên niềm tự hào và lòng biết ơn.',
    ],
  },
];

export const PHOTO_GALLERY_DATA: PhotoItem[] = [
  {
    id: 'photo-1',
    figureCode: 'Hình 01 · Bục Giảng',
    title: 'Nét Phấn Trắng Trong Nắng Chiều Thu',
    category: 'Kỷ niệm giờ học',
    dateTaken: 'Tháng 11/2026',
    photographer: 'Phạm Hà Phương Linh (12A1)',
    src: '/src/assets/images/gallery_teacher_blackboard_1794923384996.jpg',
    aspectClass: 'md:col-span-7',
    caption: 'Cô giáo tận tụy bên bảng đen với những dòng giảng văn Truyện Kiều dưới ánh nắng chiều thu.',
    memoryStory:
      'Bức ảnh được chụp vào tiết Ngữ văn chiều thứ Sáu tuần đầu tháng 11. Khi ánh nắng chiếu xiên qua khung cửa sổ cổ kính, những hạt bụi phấn bay lơ lửng tạo nên một khung cảnh vừa thiêng liêng vừa xúc động.',
  },
  {
    id: 'photo-2',
    figureCode: 'Hình 02 · Tri Ân',
    title: 'Nụ Cười Tuổi Học Trò & Những Trang Lưu Bút 20/11',
    category: 'Hoạt động chào mừng',
    dateTaken: '14/11/2026',
    photographer: 'Nguyễn An Minh (12A1)',
    src: '/src/assets/images/gallery_student_memories_1794923379511.jpg',
    aspectClass: 'md:col-span-5',
    caption: 'Các bạn nữ sinh lớp 12A1 cùng nhau chuẩn bị hoa tươi và viết sổ lưu bút tri ân thầy cô.',
    memoryStory:
      'Cả tổ 1 và tổ 2 đã ở lại sau giờ học để tự tay bó những đóa hoa tươi thắm nhất và nắn nót viết từng dòng chúc mừng lên cuốn sổ kỷ niệm gửi tặng các thầy cô bộ môn.',
  },
  {
    id: 'photo-3',
    figureCode: 'Hình 03 · Tri Thức',
    title: 'Góc Thư Viện Mùa Thu & Trang Bản Thảo Đầu Tiên',
    category: 'Không gian học tập',
    dateTaken: '10/11/2026',
    photographer: 'Lê Hoàng Minh Khôi (12A1)',
    src: '/src/assets/images/gallery_school_library_1794923380931.jpg',
    aspectClass: 'md:col-span-5',
    caption: 'Chiếc bàn gỗ sồi trong thư viện trường — nơi ra đời những bài thơ và lời ngỏ của tờ báo tường.',
    memoryStory:
      'Tại góc bàn yên tĩnh ngập nắng của thư viện trường, nhóm Bút Trẻ Mùa Thu đã cùng nhau phác thảo bố cục và biên tập những bài viết đầu tiên cho ấn phẩm "Chuyến Đò Tri Thức".',
  },
  {
    id: 'photo-4',
    figureCode: 'Hình 04 · Mái Trường',
    title: 'Hàng Xe Đạp Dưới Tán Cây Cổ Thụ Giờ Tan Tầm',
    category: 'Ký ức sân trường',
    dateTaken: '12/11/2026',
    photographer: 'Vũ Đức Trọng Nhân (12A1)',
    src: '/src/assets/images/gallery_graduation_yard_1794923382659.jpg',
    aspectClass: 'md:col-span-7',
    caption: 'Sân trường rợp bóng cây cổ thụ cùng những hàng xe đạp quen thuộc gắn liền với ba năm thanh xuân.',
    memoryStory:
      'Hình ảnh bình dị mà thân thương nhất của tuổi học trò: tiếng cười nói râm ran sau giờ tan học, những chiếc xe đạp nối đuôi nhau qua cổng trường dưới ánh hoàng hôn ấm áp.',
  },
];

export const AUDIO_TRACKS_DATA: AudioTrack[] = [
  {
    id: 'track-bui-phan',
    number: '01',
    title: 'Giai Điệu Bụi Phấn (Bản Hòa Tấu Piano & Music Box Mùa Thu)',
    composer: 'Cảm hứng từ nhạc phẩm của Vũ Hoàng & Lê Văn Lộc',
    performer: 'Ban Âm Nhạc Lớp 12A1 phối khí kỹ thuật số',
    durationLabel: '00:36',
    description:
      'Giai điệu quen thuộc đã đi cùng biết bao thế hệ học trò Việt Nam mỗi khi nhớ về hình bóng thầy cô bên bảng đen và nét phấn trắng. Bản phối nhẹ nhàng mang âm hưởng hộp nhạc gỗ và dương cầm ấm áp.',
    melodyPreset: 'bui_phan',
  },
  {
    id: 'track-ky-uc',
    number: '02',
    title: 'Ký Ức Dưới Mái Trường Xưa (Bản Acoustic Chiều Tháng Mười Một)',
    composer: 'Sáng tác giai điệu: Vũ Đức Trọng Nhân (12A1)',
    performer: 'Độc tấu Harp & Dương cầm cổ điển',
    durationLabel: '00:32',
    description:
      'Khúc nhạc không lời dịu êm gợi nhớ những buổi chiều thu nắng vàng trải nhẹ trên sân trường, tiếng lá xào xạc và những lời dặn dò ân cần của thầy cô trước ngưỡng cửa trưởng thành.',
    melodyPreset: 'ky_uc_mai_truong',
  },
];

export const INITIAL_COMMENTS: CommentItem[] = [
  {
    id: 'cmt-1',
    fullName: 'Cô Nguyễn Thị Thanh Hương',
    roleOrClass: 'Giáo viên Chủ nhiệm Lớp 12A1',
    dedicatedTo: 'Tập thể học sinh Lớp 12A1',
    message:
      'Cô thật sự xúc động khi đọc từng bài viết và ngắm nhìn những bức ảnh kỷ niệm mà nhóm Bút Trẻ Mùa Thu đã dày công thực hiện. Chúc các em luôn giữ vững ngọn lửa đam mê và đạt kết quả rực rỡ nhất trong kỳ thi sắp tới!',
    createdAt: '16/11/2026 · 20:15',
  },
  {
    id: 'cmt-2',
    fullName: 'Đặng Quốc Huy',
    roleOrClass: 'Bí thư Chi đoàn 12A1',
    dedicatedTo: 'Thầy Hùng & Cô Thanh Hương',
    message:
      'Nhân ngày Nhà giáo Việt Nam 20/11, em xin kính chúc quý Thầy Cô luôn dồi dào sức khỏe, hạnh phúc và mãi là ngọn hải đăng soi sáng cho chúng em trên hành trình chinh phục tri thức.',
    createdAt: '17/11/2026 · 07:30',
  },
  {
    id: 'cmt-3',
    fullName: 'Lê Mai Chi',
    roleOrClass: 'Cựu học sinh Niên khóa 2021 – 2024',
    dedicatedTo: 'Hội đồng Sư phạm Nhà trường',
    message:
      'Tờ báo tường điện tử thiết kế đẹp và giàu cảm xúc quá! Xem lại góc ảnh sân trường và hàng cây cổ thụ mà bồi hồi nhớ những năm tháng cấp 3 dưới mái trường thân yêu.',
    createdAt: '17/11/2026 · 09:45',
  },
];
