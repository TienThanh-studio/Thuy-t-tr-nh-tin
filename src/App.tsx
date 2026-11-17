/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  ZoomIn,
  Send,
  Edit3,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Mail,
  Calendar,
  Users,
  Sparkles,
  Trash2,
  Feather,
} from 'lucide-react';
import {
  INITIAL_WALLPAPER_CONFIG,
  HERO_IMAGE_PATH,
  EDITORIAL_INTRO,
  ARTICLES_DATA,
  PHOTO_GALLERY_DATA,
  INITIAL_COMMENTS,
  ArticleItem,
  PhotoItem,
  CommentItem,
  WallPaperConfig,
} from './data/wallPaperData';
import { MediaSection } from './components/MediaSection';

const COMMENTS_STORAGE_KEY = 'baotuong_chuyentb_12anh2_comments_v3';
const CONFIG_STORAGE_KEY = 'baotuong_chuyentb_12anh2_config_v3';

export default function App() {
  // 1. State cấu hình tùy chỉnh (Nhóm 1 - Lớp 12 Anh 2 - THPT Chuyên Thái Bình)
  const [config, setConfig] = useState<WallPaperConfig>(() => {
    try {
      const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_WALLPAPER_CONFIG;
    } catch {
      return INITIAL_WALLPAPER_CONFIG;
    }
  });

  // 2. State lọc bài viết & Modal đọc toàn văn
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [activeArticle, setActiveArticle] = useState<ArticleItem | null>(null);

  // 3. State Lightbox phóng to ảnh kỷ niệm
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // 4. State Góc bình luận (Lưu bằng localStorage)
  const [comments, setComments] = useState<CommentItem[]>(() => {
    try {
      const saved = localStorage.getItem(COMMENTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_COMMENTS;
    } catch {
      return INITIAL_COMMENTS;
    }
  });
  const [fullName, setFullName] = useState('');
  const [roleOrClass, setRoleOrClass] = useState('');
  const [dedicatedTo, setDedicatedTo] = useState('');
  const [message, setMessage] = useState('');
  const [commentNotice, setCommentNotice] = useState<string | null>(null);

  // 5. State Modal Tùy chỉnh thông tin nhóm
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [draftConfig, setDraftConfig] = useState<WallPaperConfig>(config);

  useEffect(() => {
    try {
      localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(comments));
    } catch {
      // Bỏ qua nếu trình duyệt chặn localStorage
    }
  }, [comments]);

  // Đóng Modal khi nhấn phím Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveArticle(null);
        setActivePhotoIndex(null);
        setIsCustomModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categories = ['Tất cả', 'Tản văn', 'Thơ', 'Cảm nghĩ', 'Hồi ức'];
  const filteredArticles =
    selectedCategory === 'Tất cả'
      ? ARTICLES_DATA
      : ARTICLES_DATA.filter((art) => art.category === selectedCategory);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !roleOrClass.trim() || !message.trim()) return;

    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(
      now.getMonth() + 1
    ).padStart(2, '0')}/${now.getFullYear()} · ${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    const newComment: CommentItem = {
      id: `cmt-${Date.now()}`,
      fullName: fullName.trim(),
      roleOrClass: roleOrClass.trim(),
      dedicatedTo: dedicatedTo.trim() || 'Quý Thầy Cô Trường THPT Chuyên Thái Bình',
      message: message.trim(),
      createdAt: formattedDate,
    };

    setComments((prev) => [newComment, ...prev]);
    setFullName('');
    setRoleOrClass('');
    setDedicatedTo('');
    setMessage('');
    setCommentNotice('Đã gửi lời chúc lên Sổ lưu bút tri ân.');
    window.setTimeout(() => setCommentNotice(null), 4000);
  };

  const handleDeleteComment = (id: string) => {
    setComments((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSaveCustomConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setConfig(draftConfig);
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(draftConfig));
    } catch {
      // Ignore storage error
    }
    setIsCustomModalOpen(false);
  };

  const handleResetDefaultConfig = () => {
    setDraftConfig(INITIAL_WALLPAPER_CONFIG);
    setConfig(INITIAL_WALLPAPER_CONFIG);
    try {
      localStorage.removeItem(CONFIG_STORAGE_KEY);
    } catch {
      // Ignore
    }
    setIsCustomModalOpen(false);
  };

  const activePhoto: PhotoItem | null =
    activePhotoIndex !== null ? PHOTO_GALLERY_DATA[activePhotoIndex] : null;

  return (
    <div className="min-h-screen bg-paper-grain text-[#1C1917] flex flex-col">
      {/* =====================================================================
          PHẦN 1: TIÊU ĐỀ TRANG WEB (<header>)
          Tuân thủ Top Bar Contract 3 vùng: Brand wordmark - 5 Nav links - 1 CTA
          ===================================================================== */}
      <header className="sticky top-0 z-30 bg-[#FAF6EE]/95 backdrop-blur-md border-b border-[#D5CBB8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            className="text-2xl font-calligraphy font-bold tracking-wide text-[#8B1E24] whitespace-nowrap shrink-0"
          >
            {config.newspaperTitle}
          </a>

          {/* Zone 2: 5 Concise Single-Line Navigation Links */}
          <nav
            aria-label="Điều hướng chuyên mục báo tường"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700"
          >
            <a
              href="#loi-ngo"
              className="hover:text-[#8B1E24] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Lời Ngỏ
            </a>
            <a
              href="#cac-bai-viet"
              className="hover:text-[#8B1E24] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Các Bài Viết
            </a>
            <a
              href="#goc-anh"
              className="hover:text-[#8B1E24] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Góc Ảnh
            </a>
            <a
              href="#goc-am-nhac"
              className="hover:text-[#8B1E24] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Âm Nhạc &amp; Phim
            </a>
            <a
              href="#goc-binh-luan"
              className="hover:text-[#8B1E24] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Góc Bình Luận
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <a
              href="#goc-binh-luan"
              className="px-4 py-2 text-xs font-semibold text-white bg-[#8B1E24] hover:bg-[#6e151a] rounded-sm transition-colors whitespace-nowrap shrink-0"
            >
              Gửi Lưu Bút 20/11
            </a>
          </div>
        </div>
      </header>

      {/* =====================================================================
          BANNER BÁO TƯỜNG NGHỆ THUẬT THỦ CÔNG & ĐƠN VỊ THỰC HIỆN
          ===================================================================== */}
      <div className="border-b border-[#D5CBB8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-14 md:pb-20">
          {/* Dải thông tin đầu báo tường */}
          <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-6 pb-4 mb-8 border-b border-[#D5CBB8] text-xs text-stone-600">
            <div className="font-medium text-[#8B1E24]">{config.issueNumber}</div>
            <div className="flex items-center gap-2 font-medium text-stone-800">
              <span>{config.schoolName}</span>
              <span aria-hidden="true">·</span>
              <span>{config.className}</span>
            </div>
            <div className="font-mono tabular-nums">
              Ngày cập nhật: <strong className="text-stone-900">{config.lastUpdated}</strong>
            </div>
          </div>

          {/* Khung viền kép báo tường truyền thống */}
          <div className="wall-newspaper-frame bg-[#F5EFE2]/70 p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              {/* Cột trái (7/12): Nghệ thuật chữ Thư Pháp "Chuyến Đò Tri Thức" & Họa tiết Con đò */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#8B1E24] font-semibold">
                    <Feather className="w-3.5 h-3.5 text-[#B45309]" />
                    <span>Báo Tường Điện Tử Tri Ân Thầy Cô · Nhóm 1 Lớp 12 Anh 2</span>
                  </div>

                  {/* Tiêu đề chính Thư Pháp kết hợp sắc đỏ son trầm (#8B1E24) chuyển vàng đồng (#B45309) */}
                  <div className="mt-3 relative">
                    <h1 className="font-calligraphy text-5xl sm:text-6xl lg:text-[4.4rem] font-bold leading-[1.15] tracking-wide bg-gradient-to-r from-[#8B1E24] via-[#9E2A2B] to-[#B45309] bg-clip-text text-transparent drop-shadow-xs">
                      {config.newspaperTitle}
                    </h1>

                    {/* Họa tiết SVG thủ công: Nét cọ thư pháp, Con đò tri thức trên sóng nước & Cánh chim */}
                    <svg
                      viewBox="0 0 520 54"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full max-w-md h-12 mt-1 text-[#8B1E24]"
                      aria-hidden="true"
                    >
                      {/* Nét cọ lượn sóng nước màu vàng đồng & đỏ son */}
                      <path
                        d="M6 38C95 22 195 48 310 32C385 21 450 35 512 24"
                        stroke="url(#brushGrad)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M42 45C140 35 235 51 355 40C415 34 468 42 504 37"
                        stroke="#B45309"
                        strokeOpacity="0.45"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                      {/* Hình ảnh con đò nhỏ và mái chèo bên bến sông */}
                      <path
                        d="M118 27L136 13L146 27H118Z"
                        fill="#B45309"
                        fillOpacity="0.22"
                        stroke="#8B1E24"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M104 28C116 34 148 34 162 27L152 34H114L104 28Z"
                        fill="#8B1E24"
                      />
                      {/* Cánh chim bay về phía mặt trời tri thức */}
                      <path
                        d="M370 15C375 10 381 11 384 16C387 11 393 10 398 15"
                        stroke="#8B1E24"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                      <path
                        d="M408 9C412 5 417 6 419 10C422 6 427 5 431 9"
                        stroke="#B45309"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                      {/* Nhành lá & hoa điểm xuyết */}
                      <circle cx="248" cy="35" r="3" fill="#8B1E24" />
                      <circle cx="260" cy="33" r="2" fill="#B45309" />
                      <defs>
                        <linearGradient id="brushGrad" x1="6" y1="38" x2="512" y2="24" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#8B1E24" />
                          <stop offset="0.55" stopColor="#B45309" />
                          <stop offset="1" stopColor="#8B1E24" stopOpacity="0.2" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <p className="mt-2 text-lg sm:text-xl font-prose text-stone-800 leading-relaxed">
                    {config.newspaperSubTheme}
                  </p>

                  {/* Bảng tóm tắt Đơn vị & 9 Thành viên Nhóm 1 - Lớp 12 Anh 2 */}
                  <div className="mt-5 pt-5 border-t border-[#D5CBB8] space-y-2 text-sm text-stone-700">
                    <div>
                      <span className="font-semibold text-stone-900">Đơn vị thực hiện: </span>
                      <span className="font-semibold text-[#8B1E24]">
                        {config.teamName} ({config.className}) — {config.schoolName}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-stone-900">9 Thành viên thực hiện: </span>
                      <span>
                        {config.members.map((m) => m.name).join(', ')}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                      <span>
                        <strong className="text-stone-900">Trưởng nhóm:</strong> Đặng Thảo Ngọc (
                        <a
                          href="mailto:dangthaongoc1809@gmail.com"
                          className="text-[#8B1E24] hover:underline font-mono"
                        >
                          dangthaongoc1809@gmail.com
                        </a>
                        )
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>
                        <strong className="text-stone-900">Phó nhóm:</strong> Tô Nguyễn Thanh Mai (
                        <a
                          href="mailto:maibeo170909@gmail.com"
                          className="text-[#8B1E24] hover:underline font-mono"
                        >
                          maibeo170909@gmail.com
                        </a>
                        )
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cụm nút điều hướng và tùy chỉnh thông tin nhóm */}
                <div className="mt-7 pt-5 border-t border-[#D5CBB8] flex flex-wrap items-center gap-3">
                  <a
                    href="#loi-ngo"
                    className="px-5 py-2.5 bg-[#8B1E24] hover:bg-[#6e151a] text-white text-sm font-medium rounded-sm transition-colors whitespace-nowrap shrink-0"
                  >
                    Đọc Lời Ngỏ &amp; Tác Phẩm
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setDraftConfig(config);
                      setIsCustomModalOpen(true);
                    }}
                    className="px-4 py-2.5 bg-[#FAF6EE] hover:bg-[#EAE1D0] text-stone-900 border border-[#C8B9A6] text-sm font-medium rounded-sm flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Edit3 className="w-4 h-4 text-[#8B1E24]" />
                    <span>Tùy chỉnh thông tin nhóm</span>
                  </button>
                </div>
              </div>

              {/* Cột phải (5/12): Khung ảnh Cổng trường THPT Chuyên Thái Bình */}
              <div className="lg:col-span-5 flex flex-col">
                <figure className="h-full bg-[#FAF6EE] border border-[#C8B9A6] p-3 flex flex-col justify-between shadow-xs">
                  <div className="relative overflow-hidden bg-stone-800 aspect-16/10 lg:aspect-auto lg:h-full min-h-[270px]">
                    <img
                      src="/assets/aistudio/image_19248c47.png"
                      alt="Khung cảnh sân trường THPT Chuyên Thái Bình dưới bóng cây xanh mát"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                    <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                      <p className="text-[11px] uppercase tracking-widest text-amber-200 font-medium">
                        Trường THPT Chuyên Thái Bình · Niên khóa 2024 – 2027
                      </p>
                      <p className="text-sm font-serif italic text-stone-100 mt-0.5">
                        “Dưới mái trường thân yêu, mỗi nét phấn trắng là một hạt mầm ước mơ.”
                      </p>
                    </div>
                  </div>
                  <figcaption className="mt-2.5 text-xs font-prose italic text-stone-600 flex items-center justify-between">
                    <span>Cổng trường THPT Chuyên Thái Bình trong nắng thu tháng Mười Một.</span>
                    <span className="font-mono not-italic text-[11px] text-[#8B1E24] font-semibold tabular-nums">
                      12 Anh 2
                    </span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          PHẦN 2: NỘI DUNG CHÍNH (<main> - ĐỦ 5 CHUYÊN MỤC CỦA BÁO TƯỜNG)
          ===================================================================== */}
      <main className="flex-1">
        {/* -------------------------------------------------------------------
            CHUYÊN MỤC 01: BÀI GIỚI THIỆU (LỜI NGỎ)
            ------------------------------------------------------------------- */}
        <section id="loi-ngo" className="py-16 md:py-24 border-b border-[#D5CBB8]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="pb-8 border-b border-[#D5CBB8]">
              <p className="text-xs uppercase tracking-widest text-[#8B1E24] font-semibold">
                {EDITORIAL_INTRO.kicker}
              </p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-semibold text-stone-900 tracking-tight">
                {EDITORIAL_INTRO.title}
              </h2>
            </div>

            {/* Bố cục đọc bất đối xứng (70% Bài lời ngỏ - 30% Hồ sơ 9 thành viên Nhóm 1) */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Cột chính (8/12): Nội dung Lời ngỏ */}
              <div className="lg:col-span-8 bg-[#F5EFE2]/60 border border-[#D5CBB8] p-6 sm:p-10">
                <blockquote className="py-5 mb-8 border-y border-[#C8B9A6] text-xl sm:text-2xl font-calligraphy text-[#8B1E24] leading-relaxed text-center">
                  {EDITORIAL_INTRO.epigraph}
                </blockquote>

                <div className="space-y-6 text-base sm:text-[17px] font-prose text-stone-800 leading-[1.85]">
                  {EDITORIAL_INTRO.paragraphs.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className={
                        idx === 0
                          ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#8B1E24] first-letter:float-left first-letter:mr-3.5 first-letter:mt-1 first-letter:leading-none'
                          : ''
                      }
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Chữ ký Ban biên tập */}
                <div className="mt-10 pt-6 border-t border-[#D5CBB8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-stone-500">
                      {EDITORIAL_INTRO.signatureTitle}
                    </p>
                    <p className="mt-1 text-xl font-calligraphy font-bold text-[#8B1E24]">
                      {EDITORIAL_INTRO.signatureName}
                    </p>
                  </div>
                  <div className="text-xs text-stone-600 font-mono tabular-nums">
                    Cập nhật: {config.lastUpdated}
                  </div>
                </div>
              </div>

              {/* Cột lề phải (4/12): Danh sách đầy đủ 9 thành viên Nhóm 1 - Lớp 12 Anh 2 */}
              <aside className="lg:col-span-4 bg-[#F3ECE0] border border-[#D5CBB8] p-6 space-y-6">
                <div>
                  <h3 className="text-base font-serif font-bold text-stone-900">
                    Giới Thiệu {config.teamName}
                  </h3>
                  <p className="mt-2 text-xs font-prose text-stone-700 leading-relaxed">
                    {config.teamDescription}
                  </p>
                </div>

                <div className="pt-5 border-t border-[#D5CBB8]">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-serif font-bold text-stone-900">
                      Danh Sách 9 Thành Viên
                    </h3>
                    <span className="text-xs font-mono text-[#8B1E24] font-semibold">12 Anh 2</span>
                  </div>
                  <ul className="mt-3 space-y-2.5 text-xs text-stone-700">
                    {config.members.map((member, index) => (
                      <li
                        key={index}
                        className="pb-2 border-b border-[#D5CBB8]/60 last:border-none last:pb-0"
                      >
                        <div className="font-semibold text-stone-900">
                          {index + 1}. {member.name}
                        </div>
                        <div className="text-stone-600 text-[11px]">{member.role}</div>
                        <a
                          href={`mailto:${member.email}`}
                          className="text-[#8B1E24] hover:underline font-mono text-[11px] inline-block"
                        >
                          {member.email}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------------
            CHUYÊN MỤC 02: CÁC BÀI VIẾT (CARDS + MODAL ĐỌC TOÀN VĂN)
            ------------------------------------------------------------------- */}
        <section id="cac-bai-viet" className="py-16 md:py-24 border-b border-[#D5CBB8]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#D5CBB8]">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#8B1E24] font-semibold">
                  Chuyên mục 02 · Sáng Tác Thơ Văn &amp; Cảm Nghĩ Học Trò 12 Anh 2
                </p>
                <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-semibold text-stone-900 tracking-tight">
                  Trang Viết Tri Ân Dưới Mái Trường Chuyên Thái Bình
                </h2>
              </div>

              {/* Bộ lọc thể loại */}
              <div
                role="tablist"
                aria-label="Lọc bài viết theo thể loại"
                className="flex flex-wrap items-center gap-1 p-1 bg-[#EAE1D0] border border-[#C8B9A6] rounded-sm"
              >
                {categories.map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        active
                          ? 'bg-[#8B1E24] text-white shadow-xs'
                          : 'text-stone-700 hover:text-stone-950'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Lưới Thẻ Bài Viết (Cards) */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-[#F3ECE0] border border-[#D5CBB8] flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Ảnh minh họa bài viết kèm fallback an toàn */}
                    <div
                      onClick={() => setActiveArticle(article)}
                      className="relative aspect-16/9 bg-stone-800 overflow-hidden border-b border-[#D5CBB8] cursor-pointer"
                    >
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== window.location.origin + article.fallbackImage) {
                            target.src = article.fallbackImage;
                          }
                        }}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                      />
                    </div>

                    <div className="p-6 sm:p-7">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600">
                        <span className="font-semibold text-[#8B1E24]">{article.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>Tác giả: {article.author}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">{article.date}</span>
                        <span aria-hidden="true">·</span>
                        <span>{article.readTime}</span>
                      </div>

                      <h3
                        onClick={() => setActiveArticle(article)}
                        className="mt-2.5 text-2xl font-serif font-semibold text-stone-900 group-hover:text-[#8B1E24] transition-colors cursor-pointer leading-snug"
                      >
                        {article.orderNumber}. {article.title}
                      </h3>

                      <p className="mt-1.5 text-xs text-stone-600 italic font-prose">
                        {article.subtitle}
                      </p>

                      <p className="mt-4 text-sm sm:text-[15px] font-prose text-stone-700 leading-relaxed whitespace-pre-line">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Chân thẻ bài viết + Nút bấm "Đọc thêm" mở Modal */}
                  <div className="px-6 sm:px-7 py-4 bg-[#EAE1D0]/80 border-t border-[#D5CBB8] flex items-center justify-between gap-4">
                    <span className="text-xs text-stone-600">{article.authorRole}</span>
                    <button
                      type="button"
                      onClick={() => setActiveArticle(article)}
                      className="px-4 py-2 bg-stone-900 hover:bg-[#8B1E24] text-white text-xs font-semibold rounded-sm flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Đọc thêm toàn văn</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------------
            CHUYÊN MỤC 03: GÓC ẢNH (PHOTO GALLERY + LIGHTBOX PHÓNG TO)
            ------------------------------------------------------------------- */}
        <section id="goc-anh" className="py-16 md:py-24 border-b border-[#D5CBB8]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#D5CBB8]">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#8B1E24] font-semibold">
                  Chuyên mục 03 · Góc Ảnh Kỷ Niệm Trường Lớp
                </p>
                <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-semibold text-stone-900 tracking-tight">
                  Khoảnh Khắc Thanh Xuân Lớp 12 Anh 2
                </h2>
              </div>
              <p className="text-xs text-stone-600">
                Bấm vào từng bức ảnh để phóng to (Lightbox) và đọc câu chuyện kỷ niệm đằng sau khung hình.
              </p>
            </div>

            {/* Lưới ảnh bất đối xứng nghệ thuật (12 cột) */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-6">
              {PHOTO_GALLERY_DATA.map((photo, index) => (
                <figure
                  key={photo.id}
                  onClick={() => setActivePhotoIndex(index)}
                  className={`${photo.aspectClass} bg-[#F3ECE0] border border-[#D5CBB8] p-3.5 flex flex-col justify-between group cursor-pointer`}
                >
                  <div className="relative aspect-4/3 bg-stone-900 overflow-hidden">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== window.location.origin + photo.fallbackSrc) {
                          target.src = photo.fallbackSrc;
                        }
                      }}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity px-3.5 py-2 bg-[#FAF6EE] text-stone-900 text-xs font-semibold rounded-sm flex items-center gap-1.5 shadow-md">
                        <ZoomIn className="w-3.5 h-3.5 text-[#8B1E24]" />
                        <span>Phóng to ảnh</span>
                      </span>
                    </div>
                  </div>

                  <figcaption className="pt-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600">
                      <span>
                        {photo.figureCode} · Chụp bởi: {photo.photographer}
                      </span>
                      <span className="font-mono tabular-nums">{photo.dateTaken}</span>
                    </div>
                    <h3 className="mt-1 text-lg font-serif font-semibold text-stone-900 group-hover:text-[#8B1E24] transition-colors">
                      {photo.title}
                    </h3>
                    <p className="mt-1 text-sm font-prose text-stone-700 leading-relaxed">
                      {photo.caption}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------------
            CHUYÊN MỤC 04: GÓC ÂM NHẠC & PHIM TƯ LIỆU
            ------------------------------------------------------------------- */}
        <MediaSection />

        {/* -------------------------------------------------------------------
            CHUYÊN MỤC 05: GÓC BÌNH LUẬN (FORM + LOCALSTORAGE)
            ------------------------------------------------------------------- */}
        <section id="goc-binh-luan" className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#D5CBB8]">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#8B1E24] font-semibold">
                  Chuyên mục 05 · Góc Bình Luận &amp; Sổ Lưu Bút Tri Ân
                </p>
                <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-semibold text-stone-900 tracking-tight">
                  Gửi Ngàn Lời Chúc Tới Thầy Cô
                </h2>
              </div>
              <p className="text-xs text-stone-600 font-prose italic">
                Sổ lưu bút trực tuyến của Nhóm 1 – Lớp 12 Anh 2 ({comments.length} lời tri ân)
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Cột trái (5/12): Biểu mẫu (<form>) nhập bình luận */}
              <div className="lg:col-span-5 bg-[#F3ECE0] border border-[#D5CBB8] p-6 sm:p-7">
                <h3 className="text-xl font-serif font-semibold text-stone-900">
                  Viết Lưu Bút &amp; Bình Luận Mới
                </h3>
                <p className="mt-1 text-xs text-stone-600">
                  Mọi lời chúc sẽ được hiển thị ngay lập tức và tự động lưu giữ trên trang báo tường.
                </p>

                <form onSubmit={handleCommentSubmit} className="mt-6 space-y-4">
                  <div>
                    <label
                      htmlFor="comment-fullname"
                      className="block text-xs font-semibold text-stone-800 mb-1.5"
                    >
                      Họ và tên người gửi <span className="text-[#8B1E24]">*</span>
                    </label>
                    <input
                      id="comment-fullname"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ví dụ: Đặng Thảo Ngọc"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF6EE] border border-[#C8B9A6] rounded-sm focus:outline-none focus:border-[#8B1E24]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="comment-role"
                      className="block text-xs font-semibold text-stone-800 mb-1.5"
                    >
                      Lớp / Vai trò <span className="text-[#8B1E24]">*</span>
                    </label>
                    <input
                      id="comment-role"
                      type="text"
                      required
                      value={roleOrClass}
                      onChange={(e) => setRoleOrClass(e.target.value)}
                      placeholder="Ví dụ: Học sinh Lớp 12 Anh 2 / Cựu học sinh / Phụ huynh"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF6EE] border border-[#C8B9A6] rounded-sm focus:outline-none focus:border-[#8B1E24]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="comment-dedicated"
                      className="block text-xs font-semibold text-stone-800 mb-1.5"
                    >
                      Kính gửi Thầy / Cô (Tùy chọn)
                    </label>
                    <input
                      id="comment-dedicated"
                      type="text"
                      value={dedicatedTo}
                      onChange={(e) => setDedicatedTo(e.target.value)}
                      placeholder="Ví dụ: Cô Chủ nhiệm & Quý Thầy Cô trường THPT Chuyên Thái Bình"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF6EE] border border-[#C8B9A6] rounded-sm focus:outline-none focus:border-[#8B1E24]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="comment-message"
                      className="block text-xs font-semibold text-stone-800 mb-1.5"
                    >
                      Nội dung bình luận &amp; lời chúc <span className="text-[#8B1E24]">*</span>
                    </label>
                    <textarea
                      id="comment-message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Chia sẻ cảm nghĩ của bạn về tờ báo tường hoặc gửi lời tri ân nhân ngày 20/11..."
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF6EE] border border-[#C8B9A6] rounded-sm focus:outline-none focus:border-[#8B1E24] font-prose"
                    />
                  </div>

                  {commentNotice && (
                    <div className="p-3 bg-emerald-950/5 border border-emerald-800/30 text-emerald-900 text-xs rounded-sm flex items-center gap-2">
                      <Check className="w-4 h-4 shrink-0" />
                      <span>{commentNotice}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-[#8B1E24] hover:bg-[#6e151a] text-white text-sm font-semibold rounded-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Gửi Bình Luận Lên Báo Tường</span>
                  </button>
                </form>
              </div>

              {/* Cột phải (7/12): Danh sách bình luận hiển thị tức thì */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#D5CBB8]">
                  <h3 className="text-lg font-serif font-semibold text-stone-900">
                    Danh Sách Lưu Bút Mới Nhất ({comments.length})
                  </h3>
                  {comments.length !== INITIAL_COMMENTS.length && (
                    <button
                      type="button"
                      onClick={() => setComments(INITIAL_COMMENTS)}
                      className="text-xs text-stone-600 hover:text-[#8B1E24] underline cursor-pointer"
                    >
                      Khôi phục lưu bút mặc định
                    </button>
                  )}
                </div>

                {comments.length === 0 ? (
                  <div className="p-8 bg-[#F3ECE0] border border-[#D5CBB8] text-center text-sm text-stone-600">
                    Chưa có bình luận nào. Hãy là người đầu tiên gửi lời tri ân tới Thầy Cô!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {comments.map((item) => (
                      <article
                        key={item.id}
                        className="p-5 sm:p-6 bg-[#F3ECE0] border border-[#D5CBB8] rounded-sm transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                              <strong className="text-sm font-serif text-stone-900">
                                {item.fullName}
                              </strong>
                              <span aria-hidden="true">·</span>
                              <span>{item.roleOrClass}</span>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono tabular-nums">{item.createdAt}</span>
                            </div>
                            {item.dedicatedTo && (
                              <p className="mt-1 text-xs text-[#8B1E24] font-medium">
                                Kính gửi: {item.dedicatedTo}
                              </p>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDeleteComment(item.id)}
                            className="text-stone-400 hover:text-stone-700 p-1 transition-colors cursor-pointer"
                            title="Xóa bình luận này"
                            aria-label="Xóa bình luận"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="mt-3 text-sm sm:text-[15px] font-prose text-stone-800 leading-relaxed whitespace-pre-line">
                          {item.message}
                        </p>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          PHẦN 3: CHÂN TRANG WEB (<footer> - ĐẦY ĐỦ 4 THÔNG TIN BẮT BUỘC)
          1. Giới thiệu nhóm thực hiện (Nhóm 1 - Lớp 12 Anh 2 - THPT Chuyên Thái Bình)
          2. Danh sách đầy đủ 9 thành viên & Email liên hệ (gắn thẻ mailto:)
          3. Ngày cập nhật nội dung gần nhất (17/11/2026)
          4. Trích dẫn nguồn tài liệu, hình ảnh, âm nhạc tham khảo
          ===================================================================== */}
      <footer className="bg-[#EAE1D0] border-t border-[#C8B9A6] text-stone-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#C8B9A6]">
            {/* Mục 1 (3/12): Giới thiệu về nhóm thực hiện */}
            <div className="lg:col-span-3 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8B1E24] font-semibold">
                <Users className="w-3.5 h-3.5" />
                <span>01. Nhóm Thực Hiện</span>
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                {config.teamName}
              </h3>
              <p className="text-xs font-prose text-stone-700 leading-relaxed">
                {config.teamDescription}
              </p>
              <p className="text-xs text-stone-800 pt-1">
                <strong>Đơn vị:</strong> {config.schoolName} — {config.className}
              </p>
            </div>

            {/* Mục 2 (5/12): Danh sách đầy đủ 9 thành viên & Địa chỉ Email (mailto:) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8B1E24] font-semibold">
                <Mail className="w-3.5 h-3.5" />
                <span>02. Danh Sách 9 Thành Viên &amp; Email Liên Hệ</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
                {config.members.map((member, idx) => (
                  <li key={idx} className="leading-snug">
                    <div className="font-semibold text-stone-900">
                      {idx + 1}. {member.name}
                    </div>
                    <div className="text-[11px] text-stone-600">{member.role}</div>
                    <a
                      href={`mailto:${member.email}`}
                      className="text-[#8B1E24] hover:underline font-mono text-[11px]"
                    >
                      {member.email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mục 3 (2/12): Ngày cập nhật nội dung gần nhất */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8B1E24] font-semibold">
                <Calendar className="w-3.5 h-3.5" />
                <span>03. Cập Nhật</span>
              </div>
              <div className="p-3.5 bg-[#FAF6EE] border border-[#C8B9A6] rounded-sm">
                <p className="text-[11px] text-stone-500 uppercase tracking-wider">
                  Ngày cập nhật gần nhất
                </p>
                <p className="mt-1 text-base font-mono font-bold text-[#8B1E24] tabular-nums">
                  {config.lastUpdated}
                </p>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Ấn phẩm báo tường điện tử chào mừng Ngày Nhà giáo Việt Nam 20/11 của tập thể Lớp 12 Anh 2.
              </p>
            </div>

            {/* Mục 4 (2/12): Trích dẫn nguồn tài liệu, hình ảnh, âm nhạc tham khảo */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8B1E24] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>04. Nguồn Tư Liệu</span>
              </div>
              <ul className="space-y-2 text-xs text-stone-700 leading-relaxed">
                {config.references.map((ref, idx) => (
                  <li key={idx}>
                    <strong className="text-stone-900">{ref.category}:</strong> {ref.detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Dòng bản quyền chân trang */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
            <div>
              © 2026 <strong>{config.teamName} ({config.className})</strong> · <strong>{config.schoolName}</strong>.
            </div>
            <div className="text-stone-700">
              Thành viên: Đặng Thảo Ngọc, Tô Nguyễn Thanh Mai, Phan Tiến Thành, Vũ Đức Dương, Nguyễn Hải Lâm, Nguyễn Vũ Diệu Linh, Trần Hoàng Bách, Nguyễn Minh Đức, Đặng Châu Anh.
            </div>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          MODAL 1: XEM TOÀN VĂN BÀI VIẾT (ĐỌC THÊM)
          ===================================================================== */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveArticle(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-article-title"
        >
          <div
            className="bg-[#FAF6EE] border border-[#C8B9A6] max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#D5CBB8]">
              <div className="text-xs text-stone-500">
                <span className="font-semibold text-[#8B1E24]">{activeArticle.category}</span>
                <span className="mx-1.5" aria-hidden="true">·</span>
                <span>Tác phẩm số {activeArticle.orderNumber}</span>
                <span className="mx-1.5" aria-hidden="true">·</span>
                <span>{activeArticle.readTime}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="px-3 py-1.5 bg-[#F3ECE0] hover:bg-stone-200 border border-[#C8B9A6] text-xs font-semibold text-stone-800 rounded-sm flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Đóng (ESC)</span>
              </button>
            </div>

            <div className="mt-6">
              <h2
                id="modal-article-title"
                className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-snug"
              >
                {activeArticle.title}
              </h2>
              <p className="mt-2 text-sm font-prose italic text-stone-600">
                {activeArticle.subtitle}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-stone-600 pb-6 border-b border-[#D5CBB8]">
                <span>
                  Tác giả: <strong className="text-stone-900">{activeArticle.author}</strong> ({activeArticle.authorRole})
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">Ngày đăng: {activeArticle.date}</span>
              </div>

              <figure className="my-6 bg-[#F3ECE0] border border-[#D5CBB8] p-2.5">
                <img
                  src={activeArticle.coverImage}
                  alt={activeArticle.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== window.location.origin + activeArticle.fallbackImage) {
                      target.src = activeArticle.fallbackImage;
                    }
                  }}
                  className="w-full max-h-72 object-cover"
                />
                <figcaption className="mt-2 text-xs font-prose italic text-stone-600 text-center">
                  {activeArticle.coverCaption}
                </figcaption>
              </figure>

              {/* Trích dẫn điểm nhấn */}
              <blockquote className="py-4 my-6 border-y border-[#D5CBB8] text-xl font-calligraphy text-[#8B1E24] text-center">
                “{activeArticle.pullQuote}”
              </blockquote>

              {/* Toàn văn tác phẩm */}
              <div
                className={`space-y-5 text-base font-prose text-stone-800 leading-[1.85] ${
                  activeArticle.isPoetry ? 'max-w-md mx-auto text-center italic' : ''
                }`}
              >
                {activeArticle.content.map((para, idx) => (
                  <p key={idx} className="whitespace-pre-line">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: LIGHTBOX PHÓNG TO ẢNH KỶ NIỆM
          ===================================================================== */}
      {activePhoto && activePhotoIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActivePhotoIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
        >
          <div
            className="bg-[#FAF6EE] border border-[#C8B9A6] max-w-4xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 bg-[#F3ECE0] border-b border-[#D5CBB8] flex items-center justify-between gap-4">
              <div className="text-xs text-stone-600">
                <strong className="text-stone-900">{activePhoto.figureCode}</strong>
                <span className="mx-1.5" aria-hidden="true">·</span>
                <span>Nhiếp ảnh: {activePhoto.photographer}</span>
                <span className="mx-1.5" aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{activePhoto.dateTaken}</span>
              </div>
              <button
                type="button"
                onClick={() => setActivePhotoIndex(null)}
                className="px-3 py-1 bg-[#FAF6EE] hover:bg-stone-200 border border-[#C8B9A6] text-xs font-semibold text-stone-800 rounded-sm flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Đóng</span>
              </button>
            </div>

            <div className="bg-stone-950 flex items-center justify-center relative max-h-[62vh]">
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== window.location.origin + activePhoto.fallbackSrc) {
                    target.src = activePhoto.fallbackSrc;
                  }
                }}
                className="max-h-[62vh] w-auto object-contain"
              />

              {/* Nút chuyển ảnh Trước / Sau */}
              <button
                type="button"
                onClick={() =>
                  setActivePhotoIndex(
                    (activePhotoIndex - 1 + PHOTO_GALLERY_DATA.length) % PHOTO_GALLERY_DATA.length
                  )
                }
                className="absolute left-3 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
                aria-label="Ảnh trước"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setActivePhotoIndex((activePhotoIndex + 1) % PHOTO_GALLERY_DATA.length)
                }
                className="absolute right-3 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
                aria-label="Ảnh tiếp theo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 bg-[#FAF6EE]">
              <h3 className="text-xl font-serif font-bold text-stone-900">{activePhoto.title}</h3>
              <p className="mt-1.5 text-sm font-prose font-medium text-stone-800">
                {activePhoto.caption}
              </p>
              <p className="mt-2 text-sm font-prose text-stone-600 leading-relaxed">
                <strong>Câu chuyện kỷ niệm: </strong>
                {activePhoto.memoryStory}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 3: TÙY CHỈNH NHANH THÔNG TIN NHÓM (9 THÀNH VIÊN - 12 ANH 2)
          ===================================================================== */}
      {isCustomModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsCustomModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="custom-modal-title"
        >
          <div
            className="bg-[#FAF6EE] border border-[#C8B9A6] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#D5CBB8]">
              <h2 id="custom-modal-title" className="text-xl font-serif font-bold text-stone-900">
                Tùy Chỉnh Thông Tin Báo Tường Của Nhóm
              </h2>
              <button
                type="button"
                onClick={() => setIsCustomModalOpen(false)}
                className="px-3 py-1 bg-[#F3ECE0] border border-[#C8B9A6] text-xs font-semibold rounded-sm cursor-pointer"
              >
                Đóng
              </button>
            </div>

            <form onSubmit={handleSaveCustomConfig} className="mt-5 space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Tên Báo Tường (Chủ đề chính)
                </label>
                <input
                  type="text"
                  required
                  value={draftConfig.newspaperTitle}
                  onChange={(e) =>
                    setDraftConfig({ ...draftConfig, newspaperTitle: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#C8B9A6] rounded-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Thông điệp / Chủ đề phụ
                </label>
                <input
                  type="text"
                  required
                  value={draftConfig.newspaperSubTheme}
                  onChange={(e) =>
                    setDraftConfig({ ...draftConfig, newspaperSubTheme: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#C8B9A6] rounded-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Tên Nhóm Thực Hiện
                  </label>
                  <input
                    type="text"
                    required
                    value={draftConfig.teamName}
                    onChange={(e) => setDraftConfig({ ...draftConfig, teamName: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#C8B9A6] rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Ngày cập nhật gần nhất
                  </label>
                  <input
                    type="text"
                    required
                    value={draftConfig.lastUpdated}
                    onChange={(e) =>
                      setDraftConfig({ ...draftConfig, lastUpdated: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#C8B9A6] rounded-sm font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Trường
                  </label>
                  <input
                    type="text"
                    required
                    value={draftConfig.schoolName}
                    onChange={(e) =>
                      setDraftConfig({ ...draftConfig, schoolName: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#C8B9A6] rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Lớp / Niên khóa
                  </label>
                  <input
                    type="text"
                    required
                    value={draftConfig.className}
                    onChange={(e) => setDraftConfig({ ...draftConfig, className: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#C8B9A6] rounded-sm"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-semibold text-stone-800 mb-2">
                  Danh sách 9 thành viên &amp; Email liên hệ
                </label>
                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {draftConfig.members.map((m, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-2.5 bg-[#F3ECE0] border border-[#C8B9A6] rounded-sm"
                    >
                      <input
                        type="text"
                        value={m.name}
                        onChange={(e) => {
                          const next = [...draftConfig.members];
                          next[idx] = { ...next[idx], name: e.target.value };
                          setDraftConfig({ ...draftConfig, members: next });
                        }}
                        placeholder="Họ tên"
                        className="px-2.5 py-1.5 bg-white border border-[#C8B9A6] text-xs"
                      />
                      <input
                        type="text"
                        value={m.role}
                        onChange={(e) => {
                          const next = [...draftConfig.members];
                          next[idx] = { ...next[idx], role: e.target.value };
                          setDraftConfig({ ...draftConfig, members: next });
                        }}
                        placeholder="Vai trò"
                        className="px-2.5 py-1.5 bg-white border border-[#C8B9A6] text-xs"
                      />
                      <input
                        type="email"
                        value={m.email}
                        onChange={(e) => {
                          const next = [...draftConfig.members];
                          next[idx] = { ...next[idx], email: e.target.value };
                          setDraftConfig({ ...draftConfig, members: next });
                        }}
                        placeholder="Email"
                        className="px-2.5 py-1.5 bg-white border border-[#C8B9A6] text-xs font-mono"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#D5CBB8] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleResetDefaultConfig}
                  className="px-3.5 py-2 text-xs text-stone-600 hover:text-stone-900 underline cursor-pointer"
                >
                  Khôi phục thông tin mặc định
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#8B1E24] hover:bg-[#6e151a] text-white text-xs font-semibold rounded-sm cursor-pointer"
                >
                  Lưu Thay Đổi &amp; Áp Dụng Ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
