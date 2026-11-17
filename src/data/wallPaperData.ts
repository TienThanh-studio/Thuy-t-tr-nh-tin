/**
 * ============================================================================
 * [PHẦN 1: THÔNG TIN TÙY CHỈNH CỦA NHÓM - DỄ DÀNG CHỈNH SỬA TẠI ĐÂY]
 * Đơn vị thực hiện: Nhóm 1 - Lớp 12 Anh 2 (Niên khóa 2024 - 2027)
 * Trường THPT Chuyên Thái Bình
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
  fallbackImage: string;
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
  fallbackSrc: string;
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
  lastUpdated: string;

  // 2. Tên nhóm thực hiện
  teamName: string;
  teamSlogan: string;
  teamDescription: string;

  // 3. Danh sách 9 thành viên & Email liên hệ
  members: TeamMember[];

  // 4. Nguồn tài liệu, hình ảnh, âm nhạc tham khảo
  references: {
    category: string;
    detail: string;
  }[];
}

export const INITIAL_WALLPAPER_CONFIG: WallPaperConfig = {
  // === SỬA CHỦ ĐỀ TRANG BÁO TẠI ĐÂY ===
  issueNumber: 'Ấn Phẩm Đặc Biệt · Chào Mừng Ngày Nhà Giáo Việt Nam 20/11',
  newspaperTitle: 'Chuyến Đò Tri Thức',
  newspaperSubTheme:
    'Tri ân Thầy Cô — Chào mừng Ngày Nhà giáo Việt Nam 20/11 & Ký ức thanh xuân dưới mái trường Chuyên Thái Bình',
  schoolName: 'Trường THPT Chuyên Thái Bình',
  className: 'Tập thể Lớp 12 Anh 2 — Niên khóa 2024 – 2027',
  lastUpdated: '17/11/2026',

  // === SỬA TÊN NHÓM THỰC HIỆN TẠI ĐÂY ===
  teamName: 'Nhóm 1 - Lớp 12 Anh 2',
  teamSlogan: 'Dẫu mai này sải cánh khắp năm châu, lòng vẫn nhớ con đò xưa bên bến chữ',
  teamDescription:
    'Nhóm 1 thuộc tập thể Lớp 12 Anh 2 (Niên khóa 2024 – 2027), Trường THPT Chuyên Thái Bình. Gồm 9 thành viên gắn kết bởi tình yêu văn chương, ngoại ngữ, nhiếp ảnh và thiết kế, chúng em thực hiện tờ báo tường điện tử này như một lời tri ân chân thành nhất kính dâng lên quý Thầy Cô nhân mùa Hiến chương 20/11.',

  // === DANH SÁCH ĐẦY ĐỦ 9 THÀNH VIÊN NHÓM 1 - LỚP 12 ANH 2 ===
  members: [
    {
      name: 'Đặng Thảo Ngọc',
      role: 'Trưởng nhóm · Tổng biên tập & Định hướng nghệ thuật',
      email: 'dangthaongoc1809@gmail.com',
      isRepresentative: true,
    },
    {
      name: 'Tô Nguyễn Thanh Mai',
      role: 'Phó nhóm · Biên tập nội dung & Chấp bút Lời ngỏ',
      email: 'maibeo170909@gmail.com',
      isRepresentative: true,
    },
    {
      name: 'Phan Tiến Thành',
      role: 'Trưởng ban Kỹ thuật & Thiết kế Web',
      email: 'meoconhuhong@gmail.com',
      isRepresentative: true,
    },
    {
      name: 'Vũ Đức Dương',
      role: 'Biên tập Âm nhạc & Tư liệu',
      email: 'duongvu171009@gmail.com',
      isRepresentative: false,
    },
    {
      name: 'Nguyễn Hải Lâm',
      role: 'Trưởng ban Nội dung & Tản văn',
      email: 'nguyenhailamtb@gmail.com',
      isRepresentative: false,
    },
    {
      name: 'Nguyễn Vũ Diệu Linh',
      role: 'Phụ trách Nhiếp ảnh & Mỹ thuật',
      email: 'linhlih2502@gmail.com',
      isRepresentative: false,
    },
    {
      name: 'Trần Hoàng Bách',
      role: 'Phụ trách Video & Truyền thông',
      email: 'bach51326@gmail.com',
      isRepresentative: false,
    },
    {
      name: 'Nguyễn Minh Đức',
      role: 'Sưu tầm Tư liệu & Kiểm duyệt',
      email: 'ducminh111009@gmail.com',
      isRepresentative: false,
    },
    {
      name: 'Đặng Châu Anh',
      role: 'Thư ký & Quản lý Lưu bút',
      email: 'dangchauanh2900@gmail.com',
      isRepresentative: false,
    },
  ],

  // === SỬA TRÍCH DẪN NGUỒN THAM KHẢO TẠI ĐÂY ===
  references: [
    {
      category: 'Sáng tác Văn học & Thơ ca',
      detail:
        'Các bài tản văn, thơ và hồi ức do tập thể 9 thành viên Nhóm 1 - Lớp 12 Anh 2 (Trường THPT Chuyên Thái Bình) trực tiếp chấp bút và biên tập nhân dịp 20/11.',
    },
    {
      category: 'Hình ảnh & Phim tư liệu',
      detail:
        'Ảnh chụp cổng trường, sân khấu Lễ kỷ niệm của Trường THPT Chuyên Thái Bình kết hợp bộ ảnh học đường chọn lọc từ Unsplash và kho lưu trữ Lớp 12 Anh 2 (Niên khóa 2024 – 2027).',
    },
    {
      category: 'Âm nhạc & Giai điệu',
      detail:
        'Các bản hòa tấu dương cầm và guitar mộc lấy cảm hứng từ nhạc phẩm "Bụi Phấn" (Vũ Hoàng & Lê Văn Lộc) do Ban Âm nhạc Nhóm 1 tuyển chọn.',
    },
    {
      category: 'Nghệ thuật Chữ & Trình bày',
      detail:
        'Kết hợp nghệ thuật chữ thư pháp Charm, Dancing Script cùng bộ phông chữ báo chí Playfair Display và Lora trên nền giấy mỹ thuật cổ điển.',
    },
  ],
};

// Ảnh chụp thực tế cổng trường THPT Chuyên Thái Bình do người dùng đính kèm
export const HERO_IMAGE_PATH = '/assets/aistudio/image_19248c47.png';

// Video thực tế Lễ kỷ niệm tại trường THPT Chuyên Thái Bình do người dùng đính kèm
export const SCHOOL_VIDEO_PATH = '/assets/aistudio/1K7L3H8UN_BL0SGT_f962cfc8.mp4';

export const EDITORIAL_INTRO = {
  kicker: 'Chuyên mục 01 · Bài Giới Thiệu & Lời Ngỏ',
  title: 'Những Chuyến Đò Thầm Lặng Giữa Mùa Thu Chuyên Thái Bình',
  epigraph:
    '“Có một nghề bụi phấn bám đầy tay — Người ta bảo đó là nghề trong sạch nhất. Có một nghề không trồng cây vào đất — Mà mang lại cho đời đầy trái ngọt hoa tươi.”',
  paragraphs: [
    'Tháng Mười Một lại gõ cửa từng ô cửa sổ xanh nơi dãy nhà học quen thuộc của Trường THPT Chuyên Thái Bình, mang theo cái se lạnh dịu dàng của gió đầu đông và sắc nắng hanh vàng trải dài trên sân trường buổi sớm. Với những cô cậu học trò lớp 12 Anh 2 niên khóa 2024 – 2027 chúng em, mùa Hiến chương năm nay mang một dư vị thật khác: vừa rộn ràng niềm vui tri ân, vừa lắng đọng chút bâng khuâng khi nhận ra đây đã là mùa 20/11 cuối cùng của thời áo trắng.',
    'Là học sinh chuyên ngữ, chúng em được học hàng ngàn từ vựng để miêu tả thế giới rộng lớn ngoài kia, được tiếp cận những chân trời văn hóa qua từng trang giáo trình dày. Thế nhưng, mỗi khi muốn viết về Thầy Cô — những người vẫn ngày ngày kiên nhẫn sửa cho chúng em từng âm cuối, từng cấu trúc câu, từng lập luận trong bài luận văn hay từng phương trình hóc búa — mọi ngôn từ hoa mỹ dường như đều trở nên nhỏ bé trước tấm lòng bao dung của người đứng lớp.',
    'Ấn phẩm báo tường điện tử “Chuyến Đò Tri Thức” do 9 thành viên Nhóm 1 – Lớp 12 Anh 2 cùng nhau thực hiện là nơi chúng em gói ghém những ký ức trong trẻo nhất dưới mái trường Chuyên Thái Bình. Mỗi bài viết, mỗi vần thơ, mỗi bức ảnh và từng dòng lưu bút nơi đây là một đóa hoa tinh thần kính dâng lên quý Thầy Cô — những người lái đò thầm lặng đã dành trọn thanh xuân để đưa bao thế hệ học trò cập bến ước mơ.',
  ],
  signatureTitle: 'Thay mặt Ban Biên Tập Báo Tường Nhóm 1',
  signatureName: 'Đặng Thảo Ngọc & Tô Nguyễn Thanh Mai — Lớp 12 Anh 2, THPT Chuyên Thái Bình',
};

export const ARTICLES_DATA: ArticleItem[] = [
  {
    id: 'art-bui-phan',
    orderNumber: '01',
    category: 'Tản văn',
    title: 'Màu Phấn Trắng, Trang Giáo Án Cũ Và Những Mùa Thu Đi Qua Mái Tóc Cô',
    subtitle: 'Tản văn viết từ bàn đầu lớp 12 Anh 2 trong một chiều thu tháng Mười Một',
    author: 'Tô Nguyễn Thanh Mai & Nguyễn Hải Lâm',
    authorRole: 'Ban Nội dung & Biên tập · Nhóm 1 - Lớp 12 Anh 2',
    date: '15/11/2026',
    readTime: '5 phút đọc',
    coverImage:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80',
    fallbackImage: '/src/assets/images/gallery_teacher_blackboard_1794923384996.jpg',
    coverCaption: 'Nét phấn trắng trên bảng đen và ánh nắng chiều thu bên bục giảng.',
    excerpt:
      'Chiều thu năm cuối cấp ở Chuyên Thái Bình, ngồi ở dãy bàn đầu lắng nghe giọng cô giảng bài, tôi chợt nhận ra những hạt bụi phấn không hề rơi xuống rồi tan biến; chúng đậu lại trên mái tóc cô và hóa thành ánh sáng mở đường cho chúng tôi...',
    pullQuote:
      'Chúng em học ngoại ngữ để bước ra thế giới, nhưng chính giọng nói ấm áp và sự tận tụy của Thầy Cô đã dạy chúng em biết luôn hướng về cội nguồn bằng một trái tim biết ơn.',
    content: [
      'Chiều thu năm cuối cấp ở Trường THPT Chuyên Thái Bình, tôi ngồi ở dãy bàn đầu tiên gần bục giảng, lặng nhìn những hạt bụi phấn li ti xoay tròn trong vệt nắng vàng óng xiên qua khung cửa kính. Cô giáo của chúng tôi vẫn đang say sưa phân tích từng mạch lập luận trên tấm bảng xanh sẫm, bàn tay cô đưa từng nét chữ thanh thoát, dứt khoát và đầy tâm huyết.',
      'Đã bước sang năm học thứ ba của niên khóa 2024 – 2027 dưới mái trường này, thế nhưng phải đến khoảnh khắc bình yên ấy, khi những tờ lịch tháng Mười Một dần vơi đi, tôi mới chợt nhận ra nơi thái dương cô đã điểm thêm nhiều sợi tóc bạc. Những sợi bạc lẫn vào màu bụi phấn trắng khiến lòng đứa học trò lớp 12 Anh 2 bất giác chùng xuống.',
      'Tôi nhớ như in những ngày đầu tiên bước chân vào lớp Mười chuyên Anh với biết bao áp lực và tự ti. Giữa một tập thể toàn những bạn học xuất sắc, tôi từng sợ hãi mỗi khi phải đứng lên thuyết trình hay viết những bài luận dài. Chính cô là người đã nán lại sau giờ học chiều hôm ấy, đặt tay lên vai tôi và chỉ vào dòng ghi chú viết bằng mực đỏ nắn nót bên lề trang giấy: “Đừng sợ sai khi bắt đầu, bởi mỗi lần sửa lại là một lần em trưởng thành hơn.”',
      'Thầy cô chẳng bao giờ kể về những đêm thức trắng bên ngọn đèn bàn để chấm từng xấp bài luận dày cộp, sửa từng lỗi ngữ pháp nhỏ nhặt cho bốn mươi đứa học trò. Thầy cô cũng chẳng bao giờ than phiền về những buổi chiều dạy thêm khản đặc cả giọng, hay những nỗi lo thầm lặng khi thấy chúng tôi mệt mỏi trước kỳ thi cuối cấp đang tới gần.',
      'Hóa ra, những hạt bụi phấn không hề rơi xuống đất rồi tan biến; chúng đậu lại trên mái tóc thầy cô, và hóa thành ánh sáng dẫn đường trong tâm hồn chúng tôi. Mùa 20/11 năm nay là mùa tri ân cuối cùng của tập thể 12 Anh 2 trong màu áo trắng học trò. Xin gửi lại nơi bục giảng thân thương này lòng biết ơn sâu sắc nhất dành cho những người đã viết nên thanh xuân tươi đẹp của chúng em.',
    ],
  },
  {
    id: 'art-nguoi-lai-do',
    orderNumber: '02',
    category: 'Thơ',
    title: 'Khúc Ca Người Đưa Đò Bên Bến Sông Tri Thức',
    subtitle: 'Thơ sáng tác kính tặng quý Thầy Cô trường THPT Chuyên Thái Bình nhân ngày 20/11',
    author: 'Vũ Đức Dương & Nguyễn Minh Đức',
    authorRole: 'Ban Sáng tác & Tư liệu · Nhóm 1 - Lớp 12 Anh 2',
    date: '16/11/2026',
    readTime: '3 phút đọc',
    isPoetry: true,
    coverImage:
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1000&q=80',
    fallbackImage: '/src/assets/images/gallery_school_library_1794923380931.jpg',
    coverCaption: 'Trang sách mở trên bàn gỗ cùng nét bút lưu giữ những vần thơ tri ân.',
    excerpt:
      'Gió tháng Mười Một về ngang hiên lớp học / Nắng dịu dàng hong ấm những trang thư / Bục giảng quen bóng Thầy đứng trầm tư / Gieo hạt chữ nở thành mùa ước vọng...',
    pullQuote:
      'Dẫu mai này sải cánh khắp năm châu / Giữa biển lớn vẫn nhớ về bến cũ / Nơi mái trường Chuyên Thái Bình ấp ủ / Ngọn đèn Thầy soi sáng suốt đời em.',
    content: [
      'Gió tháng Mười Một về ngang hiên lớp học\nNắng dịu dàng hong ấm những trang thư\nBục giảng quen bóng Thầy đứng trầm tư\nGieo hạt chữ nở thành mùa ước vọng.',
      'Ba mùa thu dưới bầu trời cao rộng\nLớp Mười Hai Anh Hai lớn lên từng ngày\nTừng bài giảng Cô truyền lửa đắm say\nMở cánh cửa đưa chúng em nhìn ra thế giới.',
      'Em nhớ mãi những buổi chiều nắng đợi\nTrang đề cương chi chít nét mực hồng\nThầy kiên nhẫn dìu qua những mênh mông\nDạy em biết vững vàng sau vấp ngã.',
      'Thời gian trôi như dòng sông hối hả\nBụi phấn rơi điểm trắng mái đầu xanh\nCho chúng em trọn vẹn những ước lành\nMang tri thức bước vào đời kiêu hãnh.',
      'Dẫu mai này sải cánh khắp năm châu\nGiữa biển lớn vẫn nhớ về bến cũ\nNơi mái trường Chuyên Thái Bình ấp ủ\nNgọn đèn Thầy soi sáng suốt đời em.',
    ],
  },
  {
    id: 'art-trang-vo-cu',
    orderNumber: '03',
    category: 'Cảm nghĩ',
    title: 'Dòng Nhận Xét Cuối Trang Vở Nháp Và Bài Học Lớn Hơn Mọi Điểm Số',
    subtitle: 'Câu chuyện thật về sự bao dung của người thầy đã thay đổi cách chúng em trưởng thành',
    author: 'Đặng Thảo Ngọc & Phan Tiến Thành',
    authorRole: 'Trưởng nhóm & Trưởng ban Kỹ thuật · Lớp 12 Anh 2',
    date: '16/11/2026',
    readTime: '4 phút đọc',
    coverImage:
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1000&q=80',
    fallbackImage: '/src/assets/images/gallery_student_memories_1794923379511.jpg',
    coverCaption: 'Sắc hoa hướng dương rực rỡ tượng trưng cho lòng biết ơn hướng về Thầy Cô.',
    excerpt:
      'Trong ngăn cặp của tôi đến tận năm lớp Mười Hai vẫn giữ một bài kiểm tra từ năm ngoái. Điểm số trên đó không phải là điểm mười tròn trĩnh, nhưng hai dòng chữ viết tay của Thầy ở góc trang giấy đã trở thành kim chỉ nam của tôi...',
    pullQuote:
      'Một bài kiểm tra có thể đo được kiến thức của một tuần học, nhưng sự trung thực và lòng kiên trì mới là thước đo của cả một con người.',
    content: [
      'Trong ngăn cặp đi học của tôi đến tận học kỳ một năm lớp Mười Hai vẫn kẹp cẩn thận một tờ bài kiểm tra từ năm lớp Mười Một. Điểm số trên tờ giấy ấy không phải là điểm mười tròn trĩnh mà đứa học sinh trường chuyên nào cũng hằng ao ước, nhưng hai dòng chữ viết tay của Thầy ở góc dưới trang giấy đã trở thành bài học quý giá nhất tôi từng nhận được.',
      'Đó là một tuần lễ mà cả lớp 12 Anh 2 chúng tôi quay cuồng trong lịch kiểm tra định kỳ. Vì quá áp lực trước thành tích chung, khi gặp một câu hỏi phân loại ở cuối bài, tôi đã chọn cách viết lướt qua loa theo đáp án truyền tai mà chưa thực sự hiểu bản chất vấn đề. Tôi cứ nghĩ giữa hàng trăm bài chấm mỗi tuần, Thầy sẽ chỉ nhìn vào kết quả cuối cùng.',
      'Thế nhưng buổi trả bài hôm sau, Thầy không hề phê bình tôi trước tập thể lớp. Cuối giờ học, Thầy bước xuống bàn tôi, nhẹ nhàng đặt tờ giấy kiểm tra đã được giải thích chi tiết từng bước suy luận bằng mực đỏ ở mặt sau. Ngay bên dưới là dòng chữ nắn nót: “Thầy tin em hoàn toàn đủ năng lực để tự mình đi đến tận cùng bài toán này. Điểm số chỉ lưu lại trên học bạ, còn bản lĩnh tự học sẽ đi theo em suốt cuộc đời.”',
      'Khoảnh khắc ấy, tôi vừa đỏ mặt xấu hổ vừa trào dâng một niềm xúc động khó tả. Sự tinh tế và bao dung của Thầy đã giữ lại lòng tự trọng cho một đứa học trò mới lớn, đồng thời đánh thức trong tôi tinh thần học tập nghiêm túc. Nhân ngày 20/11, chúng em muốn nói lời cảm ơn chân thành nhất tới các Thầy Cô — những người không chỉ dạy chữ, mà còn kiên nhẫn uốn nắn nhân cách cho chúng em bằng tất cả tình yêu thương.',
    ],
  },
  {
    id: 'art-khoanh-khac-san-truong',
    orderNumber: '04',
    category: 'Hồi ức',
    title: 'Khoảng Trời Xanh Trên Cổng Trường Chuyên Thái Bình Và Thanh Xuân 12 Anh 2',
    subtitle: 'Ghi chép của nhóm phóng viên ảnh về những ngày tháng Mười Một rực rỡ nắng thu',
    author: 'Nguyễn Vũ Diệu Linh, Trần Hoàng Bách & Đặng Châu Anh',
    authorRole: 'Ban Nhiếp ảnh, Truyền thông & Lưu bút · Lớp 12 Anh 2',
    date: '17/11/2026',
    readTime: '4 phút đọc',
    coverImage: '/assets/aistudio/image_3a39e996.png',
    fallbackImage: '/src/assets/images/gallery_graduation_yard_1794923382659.jpg',
    coverCaption: 'Cổng trường THPT Chuyên Thái Bình rợp cờ đỏ sao vàng dưới bầu trời thu xanh biếc.',
    excerpt:
      'Mỗi buổi sớm mai đạp xe qua cánh cổng trường màu xanh dịu mát với hàng cờ đỏ tung bay trong nắng, chúng tôi lại tự hỏi: Còn bao nhiêu lần nữa mình được ngước nhìn bầu trời tuổi mười tám trong trẻo đến nhường này?...',
    pullQuote:
      'Mái trường THPT Chuyên Thái Bình không chỉ là nơi chúng em rèn giũa tri thức, mà là ngôi nhà thứ hai giữ trọn thanh xuân rực rỡ nhất của tập thể 12 Anh 2.',
    content: [
      'Mỗi buổi sớm mai khi bước qua cánh cổng trường màu xanh quen thuộc của Trường THPT Chuyên Thái Bình, ngước nhìn lá cờ Tổ quốc tung bay rực rỡ trên nền trời thu trong vắt và những tán cây xanh rợp bóng trước dãy nhà học cao tầng, lòng chúng tôi lại dâng lên một niềm tự hào xen lẫn lưu luyến khôn nguôi.',
      'Ba năm niên khóa 2024 – 2027 trôi qua nhanh như một cái chớp mắt. Mới ngày nào bốn mươi thành viên lớp 12 Anh 2 còn rụt rè làm quen nhau trong buổi tập trung đầu cấp, vậy mà giờ đây chúng tôi đã cùng nhau đi qua biết bao mùa thi, bao buổi chiều ở lại sân trường tập văn nghệ chào mừng 20/11, tiếng cười nói vang vọng khắp hành lang.',
      'Ở ngôi trường này, mỗi góc cầu thang, mỗi bậu cửa sổ, mỗi hàng ghế đá dưới tán cây đều in đậm bóng dáng tận tụy của các thầy cô giáo và cán bộ nhà trường. Từ bác bảo vệ hiền hậu nơi cổng trường mỗi sáng, cô thủ thư ân cần nơi phòng đọc sách, cho tới các thầy cô bộ môn luôn hết lòng vì học sinh thân yêu.',
      'Chẳng bao lâu nữa, chuyến tàu niên khóa 2024 – 2027 sẽ cập bến cuối. Nhưng chúng tôi tin chắc rằng, dù sau này mỗi thành viên của 12 Anh 2 có đặt chân tới những giảng đường đại học hay những chân trời xa xôi nào, ký ức về bầu trời xanh trên mái trường Chuyên Thái Bình và công ơn dưỡng dục của Thầy Cô sẽ mãi là hành trang ấm áp nhất.',
    ],
  },
];

export const PHOTO_GALLERY_DATA: PhotoItem[] = [
  {
    id: 'photo-1',
    figureCode: 'Hình 01 · Mái Trường',
    title: 'Cổng Trường THPT Chuyên Thái Bình Rực Rỡ Cờ Hoa Tháng Mười Một',
    category: 'Không gian trường lớp',
    dateTaken: 'Tháng 11/2026',
    photographer: 'Nguyễn Vũ Diệu Linh & Trần Hoàng Bách (12 Anh 2)',
    src: '/assets/aistudio/image_3a39e996.png',
    fallbackSrc: '/assets/aistudio/image_3a39e996.png',
    aspectClass: 'md:col-span-7',
    caption:
      'Cổng trường THPT Chuyên Thái Bình dưới bầu trời thu xanh thẳm cùng hàng cờ đỏ sao vàng chào mừng ngày hội lớn.',
    memoryStory:
      'Bức ảnh được nhóm thực hiện ghi lại vào một buổi sáng tháng 11 nắng đẹp. Cánh cổng trường màu xanh cùng dãy nhà học khang trang là hình ảnh thân thương đón bước chân tập thể 12 Anh 2 suốt ba năm niên khóa 2024 – 2027.',
  },
  {
    id: 'photo-2',
    figureCode: 'Hình 02 · Bục Giảng',
    title: 'Nét Phấn Trắng & Những Giờ Học Đầy Cảm Hứng',
    category: 'Kỷ niệm giờ học',
    dateTaken: '12/11/2026',
    photographer: 'Đặng Thảo Ngọc & Nguyễn Hải Lâm (12 Anh 2)',
    src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80',
    fallbackSrc: '/src/assets/images/gallery_teacher_blackboard_1794923384996.jpg',
    aspectClass: 'md:col-span-5',
    caption:
      'Không gian lớp học ngập tràn ánh sáng tự nhiên — nơi những bài giảng của Thầy Cô mở ra chân trời tri thức mới.',
    memoryStory:
      'Mỗi tiết học tại lớp 12 Anh 2 luôn sôi nổi bởi những cuộc thảo luận, những bài thuyết trình tiếng Anh và sự chỉ dẫn tận tình, kiên nhẫn của các thầy cô bộ môn.',
  },
  {
    id: 'photo-3',
    figureCode: 'Hình 03 · Tri Thức',
    title: 'Góc Thư Viện, Trang Sách Mở & Bản Thảo Báo Tường',
    category: 'Góc học tập',
    dateTaken: '14/11/2026',
    photographer: 'Tô Nguyễn Thanh Mai & Vũ Đức Dương (12 Anh 2)',
    src: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1000&q=80',
    fallbackSrc: '/src/assets/images/gallery_school_library_1794923380931.jpg',
    aspectClass: 'md:col-span-5',
    caption:
      'Những kệ sách tri thức và trang sổ tay nơi 9 thành viên Nhóm 1 cùng nhau biên tập từng câu chữ cho ấn phẩm "Chuyến Đò Tri Thức".',
    memoryStory:
      'Tại không gian yên tĩnh của thư viện, các thành viên Ban Nội dung đã dành nhiều buổi chiều sau giờ học để trau chuốt từng bài thơ, bài tản văn gửi tặng Thầy Cô.',
  },
  {
    id: 'photo-4',
    figureCode: 'Hình 04 · Tri Ân',
    title: 'Đóa Hoa Hướng Dương & Sổ Lưu Bút Mùa Hiến Chương 20/11',
    category: 'Hoạt động tri ân',
    dateTaken: '16/11/2026',
    photographer: 'Phan Tiến Thành, Nguyễn Minh Đức & Đặng Châu Anh (12 Anh 2)',
    src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
    fallbackSrc: '/src/assets/images/gallery_student_memories_1794923379511.jpg',
    aspectClass: 'md:col-span-7',
    caption:
      'Khoảnh khắc gắn kết rạng rỡ của tuổi học trò khi cùng nhau chuẩn bị những món quà tinh thần tri ân Thầy Cô giáo.',
    memoryStory:
      'Cả 9 thành viên Nhóm 1 – Lớp 12 Anh 2 đã cùng nhau hoàn thiện giao diện báo tường điện tử, thu thập lưu bút và ghi lại những kỷ niệm đẹp nhất của tập thể lớp nhân dịp 20/11.',
  },
];

export const AUDIO_TRACKS_DATA: AudioTrack[] = [
  {
    id: 'track-bui-phan',
    number: '01',
    title: 'Giai Điệu Bụi Phấn — Bản Hòa Tấu Dương Cầm Mùa Thu',
    composer: 'Cảm hứng từ nhạc phẩm của Vũ Hoàng & Lê Văn Lộc',
    performer: 'Vũ Đức Dương & Trần Hoàng Bách (Nhóm 1 - 12 Anh 2) tuyển chọn',
    durationLabel: '02:15',
    description:
      'Giai điệu quen thuộc đã đi cùng biết bao thế hệ học trò Việt Nam mỗi khi nhớ về hình bóng thầy cô bên bảng đen và nét phấn trắng. Bản hòa tấu dương cầm mộc mạc, sâu lắng như lời thủ thỉ tri ân.',
    melodyPreset: 'bui_phan',
  },
  {
    id: 'track-ky-uc',
    number: '02',
    title: 'Ký Ức Dưới Mái Trường — Bản Acoustic Chiều Tháng Mười Một',
    composer: 'Biên tập âm nhạc: Vũ Đức Dương & Nguyễn Minh Đức (12 Anh 2)',
    performer: 'Ban Âm nhạc & Tư liệu Nhóm 1',
    durationLabel: '01:54',
    description:
      'Khúc nhạc không lời dịu êm gợi nhớ những buổi chiều thu nắng vàng trải nhẹ trên sân trường THPT Chuyên Thái Bình, tiếng lá xào xạc và những lời dặn dò ân cần của thầy cô trước ngưỡng cửa tuổi mười tám.',
    melodyPreset: 'ky_uc_mai_truong',
  },
];

export const INITIAL_COMMENTS: CommentItem[] = [
  {
    id: 'cmt-1',
    fullName: 'Đặng Thảo Ngọc & Tô Nguyễn Thanh Mai',
    roleOrClass: 'Trưởng nhóm & Phó nhóm · Nhóm 1 - Lớp 12 Anh 2',
    dedicatedTo: 'Cô Chủ nhiệm & Quý Thầy Cô trường THPT Chuyên Thái Bình',
    message:
      'Thay mặt 9 thành viên Nhóm 1 – Lớp 12 Anh 2 (Niên khóa 2024 – 2027), chúng em xin kính chúc quý Thầy Cô luôn dồi dào sức khỏe, hạnh phúc và giữ mãi ngọn lửa nhiệt huyết trên hành trình gieo chữ trồng người!',
    createdAt: '16/11/2026 · 20:15',
  },
  {
    id: 'cmt-2',
    fullName: 'Phan Tiến Thành, Nguyễn Hải Lâm & Vũ Đức Dương',
    roleOrClass: 'Ban Kỹ thuật, Nội dung & Âm nhạc · Nhóm 1 - 12 Anh 2',
    dedicatedTo: 'Các Thầy Cô bộ môn Lớp 12 Anh 2',
    message:
      'Cảm ơn Thầy Cô đã luôn kiên nhẫn lắng nghe, truyền cảm hứng và mở ra cho chúng em những chân trời tri thức rộng lớn. Chúc Thầy Cô một mùa Hiến chương 20/11 thật ấm áp và ngập tràn niềm vui!',
    createdAt: '17/11/2026 · 07:30',
  },
  {
    id: 'cmt-3',
    fullName: 'Nguyễn Vũ Diệu Linh, Trần Hoàng Bách, Nguyễn Minh Đức & Đặng Châu Anh',
    roleOrClass: 'Ban Nhiếp ảnh, Truyền thông, Tư liệu & Lưu bút · 12 Anh 2',
    dedicatedTo: 'Hội đồng Sư phạm Trường THPT Chuyên Thái Bình',
    message:
      'Từng bức ảnh và thước phim kỷ niệm trên sân khấu trường hôm nay sẽ mãi là ký ức thanh xuân tươi đẹp nhất của tập thể 12 Anh 2. Chúng em tự hào và biết ơn vì được trưởng thành dưới mái trường Chuyên Thái Bình thân yêu!',
    createdAt: '17/11/2026 · 09:45',
  },
];
