/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  ZoomIn,
  Send,
  Download,
  Terminal,
  Edit3,
  Check,
  Copy,
  X,
  ChevronLeft,
  ChevronRight,
  Mail,
  Calendar,
  Users,
  FileCode,
  Sparkles,
  Trash2,
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
import { buildStandaloneHtmlFile, GIT_DEPLOYMENT_COMMANDS } from './utils/standaloneHtmlBuilder';

const COMMENTS_STORAGE_KEY = 'baotuong_20_11_comments_v1';
const CONFIG_STORAGE_KEY = 'baotuong_20_11_custom_config_v1';

export default function App() {
  // 1. State cấu hình tùy chỉnh (Cho phép sửa trực tiếp hoặc lấy từ code mẫu)
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

  // 5. State Modal Hướng dẫn GitHub & Tải tệp HTML + Modal Tùy chỉnh thông tin nhóm
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [copiedGit, setCopiedGit] = useState(false);

  // Form chỉnh sửa nhanh thông tin nhóm
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
        setIsExportModalOpen(false);
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
      dedicatedTo: dedicatedTo.trim() || 'Quý Thầy Cô trường THPT Phan Đình Phùng',
      message: message.trim(),
      createdAt: formattedDate,
    };

    setComments((prev) => [newComment, ...prev]);
    setFullName('');
    setRoleOrClass('');
    setDedicatedTo('');
    setMessage('');
    setCommentNotice('Đã gửi lời chúc lên Sổ lưu bút (Đã lưu tự động vào localStorage).');
    window.setTimeout(() => setCommentNotice(null), 4000);
  };

  const handleDeleteComment = (id: string) => {
    setComments((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDownloadStandaloneHtml = () => {
    const htmlContent = buildStandaloneHtmlFile(config, comments, window.location.origin);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyGitCommands = () => {
    navigator.clipboard.writeText(GIT_DEPLOYMENT_COMMANDS).catch(() => {});
    setCopiedGit(true);
    window.setTimeout(() => setCopiedGit(false), 2500);
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
    <div className="min-h-screen bg-[#FBF9F5] text-[#1C1917] flex flex-col">
      {/* =====================================================================
          PHẦN 1: TIÊU ĐỀ TRANG WEB (<header>)
          Tuân thủ Top Bar Contract 3 vùng: Brand wordmark - 5 Nav links - 1 CTA
          ===================================================================== */}
      <header className="sticky top-0 z-30 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-stone-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            className="text-xl font-serif font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0"
          >
            {config.newspaperTitle}
          </a>

          {/* Zone 2: 5 Concise Single-Line Navigation Links */}
          <nav
            aria-label="Điều hướng chuyên mục báo tường"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600"
          >
            <a
              href="#loi-ngo"
              className="hover:text-[#881337] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Lời Ngỏ
            </a>
            <a
              href="#cac-bai-viet"
              className="hover:text-[#881337] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Các Bài Viết
            </a>
            <a
              href="#goc-anh"
              className="hover:text-[#881337] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Góc Ảnh
            </a>
            <a
              href="#goc-am-nhac"
              className="hover:text-[#881337] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Âm Nhạc &amp; Video
            </a>
            <a
              href="#goc-binh-luan"
              className="hover:text-[#881337] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Góc Bình Luận
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <a
              href="#goc-binh-luan"
              className="px-4 py-2 text-xs font-semibold text-white bg-[#881337] hover:bg-[#6e0f2c] rounded-sm transition-colors whitespace-nowrap shrink-0"
            >
              Gửi Lưu Bút 20/11
            </a>
          </div>
        </div>
      </header>

      {/* =====================================================================
          BANNER BÁO TƯỜNG NGHỆ THUẬT & THANH THÔNG TIN ẤN PHẨM
          ===================================================================== */}
      <div className="border-b border-stone-300 bg-[#FBF9F5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-14 md:pb-20">
          {/* Dải thông tin báo chí (Broadsheet Masthead Ribbon) */}
          <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-6 pb-4 mb-8 border-b border-stone-300 text-xs text-stone-600">
            <div>{config.issueNumber}</div>
            <div className="flex items-center gap-2">
              <span>{config.schoolName}</span>
              <span aria-hidden="true">·</span>
              <span>{config.className}</span>
            </div>
            <div className="font-mono tabular-nums">
              Ngày cập nhật gần nhất: <strong className="text-stone-900">{config.lastUpdated}</strong>
            </div>
          </div>

          {/* Bố cục Hero 2 cột cân đối */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Cột trái (7/12): Tiêu đề & Chủ đề Báo tường */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#881337] font-semibold">
                  Ấn Phẩm Báo Tường Điện Tử Chào Mừng Ngày Nhà Giáo Việt Nam
                </p>

                <h1 className="mt-3 text-4xl sm:text-5xl lg:text-[3.5rem] font-serif font-bold text-stone-900 leading-[1.1] tracking-tight">
                  {config.newspaperTitle}
                </h1>

                <p className="mt-4 text-lg sm:text-xl font-prose text-stone-700 leading-relaxed">
                  {config.newspaperSubTheme}
                </p>

                <div className="mt-6 pt-6 border-t border-stone-300/80 space-y-2 text-sm text-stone-600">
                  <div>
                    <span className="font-semibold text-stone-900">Nhóm thực hiện: </span>
                    <span>{config.teamName}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900">Thông điệp: </span>
                    <span className="font-prose italic">“{config.teamSlogan}”</span>
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900">Email đại diện: </span>
                    <a
                      href={`mailto:${config.members[0]?.email || 'nguyenan20062000@gmail.com'}`}
                      className="text-[#881337] hover:underline font-mono text-xs"
                    >
                      {config.members[0]?.email || 'nguyenan20062000@gmail.com'}
                    </a>
                  </div>
                </div>
              </div>

              {/* Cụm nút điều hướng và tiện ích nộp bài (.HTML & Git) */}
              <div className="mt-8 pt-6 border-t border-stone-300 flex flex-wrap items-center gap-3">
                <a
                  href="#loi-ngo"
                  className="px-5 py-2.5 bg-[#881337] hover:bg-[#6e0f2c] text-white text-sm font-medium rounded-sm transition-colors whitespace-nowrap shrink-0"
                >
                  Đọc Lời Ngỏ &amp; Tác Phẩm
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setDraftConfig(config);
                    setIsCustomModalOpen(true);
                  }}
                  className="px-4 py-2.5 bg-[#F3EFE6] hover:bg-[#E7E1D3] text-stone-900 border border-stone-300 text-sm font-medium rounded-sm flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Edit3 className="w-4 h-4 text-[#881337]" />
                  <span>Tùy chỉnh thông tin nhóm</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsExportModalOpen(true)}
                  className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium rounded-sm flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Tải tệp index.html &amp; Lệnh Git</span>
                </button>
              </div>
            </div>

            {/* Cột phải (5/12): Khung ảnh nghệ thuật chủ đề */}
            <div className="lg:col-span-5 flex flex-col">
              <figure className="h-full bg-[#F3EFE6] border border-stone-300 p-3 flex flex-col justify-between">
                <div className="relative overflow-hidden bg-stone-800 aspect-16/10 lg:aspect-auto lg:h-full min-h-[260px]">
                  <img
                    src={HERO_IMAGE_PATH}
                    alt="Khung cảnh sân trường THPT mùa thu nắng vàng"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-[11px] uppercase tracking-widest text-stone-200">
                      Ấn phẩm Kỷ niệm 20/11
                    </p>
                    <p className="text-sm font-serif italic text-stone-100 mt-0.5">
                      “Dưới mái trường thân yêu, mỗi nét phấn trắng là một hạt mầm ước mơ.”
                    </p>
                  </div>
                </div>
                <figcaption className="mt-2.5 text-xs font-prose italic text-stone-600 flex items-center justify-between">
                  <span>Sân trường trong nắng sớm tháng Mười Một.</span>
                  <span className="font-mono not-italic text-[11px] text-stone-500 tabular-nums">
                    Ấn bản 2026
                  </span>
                </figcaption>
              </figure>
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
        <section id="loi-ngo" className="py-16 md:py-24 border-b border-stone-300/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="pb-8 border-b border-stone-300">
              <p className="text-xs uppercase tracking-widest text-stone-500 font-medium">
                {EDITORIAL_INTRO.kicker}
              </p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-semibold text-stone-900 tracking-tight">
                {EDITORIAL_INTRO.title}
              </h2>
            </div>

            {/* Bố cục đọc bất đối xứng (70% Bài lời ngỏ - 30% Ghi chú lề báo tường) */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Cột chính (8/12): Nội dung Lời ngỏ */}
              <div className="lg:col-span-8">
                {/* Câu đề từ (Pull Quote) dùng đường kẻ mảnh trên/dưới thay vì border-l-4 */}
                <blockquote className="py-6 my-2 border-y border-stone-300 text-xl sm:text-2xl font-serif italic text-stone-800 leading-relaxed text-center">
                  {EDITORIAL_INTRO.epigraph}
                </blockquote>

                <div className="mt-8 space-y-6 text-base sm:text-[17px] font-prose text-stone-800 leading-[1.85] max-w-2xl">
                  {EDITORIAL_INTRO.paragraphs.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className={
                        idx === 0
                          ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#881337] first-letter:float-left first-letter:mr-3.5 first-letter:mt-1 first-letter:leading-none'
                          : ''
                      }
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Chữ ký Ban biên tập */}
                <div className="mt-10 pt-6 border-t border-stone-300/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-2xl">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-stone-500">
                      {EDITORIAL_INTRO.signatureTitle}
                    </p>
                    <p className="mt-1 text-lg font-serif font-semibold text-stone-900">
                      {config.teamName}
                    </p>
                  </div>
                  <div className="text-xs text-stone-500 font-mono tabular-nums">
                    Cập nhật: {config.lastUpdated}
                  </div>
                </div>
              </div>

              {/* Cột lề phải (4/12): Hồ sơ Ban Biên Tập & Ý nghĩa số báo */}
              <aside className="lg:col-span-4 bg-[#F3EFE6] border border-stone-300 p-6 space-y-6">
                <div>
                  <h3 className="text-base font-serif font-semibold text-stone-900">
                    Thông Điệp Chủ Đề 20/11
                  </h3>
                  <p className="mt-2 text-sm font-prose text-stone-700 leading-relaxed">
                    Hình ảnh <strong>“Chuyến Đò Tri Thức”</strong> biểu trưng cho sự kiên nhẫn, tận tụy và hy sinh thầm lặng của người thầy. Dù dòng sông thời gian không ngừng chảy, người lái đò vẫn trọn đời gắn bó với bến bờ tri thức.
                  </p>
                </div>

                <div className="pt-5 border-t border-stone-300">
                  <h3 className="text-base font-serif font-semibold text-stone-900">
                    Ban Biên Tập ({config.members.length} thành viên)
                  </h3>
                  <ul className="mt-3 space-y-3 text-xs text-stone-700">
                    {config.members.map((member, index) => (
                      <li key={index} className="pb-2.5 border-b border-stone-300/60 last:border-none last:pb-0">
                        <div className="font-semibold text-stone-900">
                          {member.name} {member.isRepresentative ? '· Đại diện nhóm' : ''}
                        </div>
                        <div className="text-stone-600 mt-0.5">{member.role}</div>
                        <a
                          href={`mailto:${member.email}`}
                          className="text-[#881337] hover:underline font-mono inline-block mt-0.5"
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
        <section id="cac-bai-viet" className="py-16 md:py-24 border-b border-stone-300/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-300">
              <div>
                <p className="text-xs uppercase tracking-widest text-stone-500 font-medium">
                  Chuyên mục 02 · Sáng Tác Thơ Văn &amp; Cảm Nghĩ Học Trò
                </p>
                <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-semibold text-stone-900 tracking-tight">
                  Trang Viết Tri Ân Dưới Mái Trường
                </h2>
              </div>

              {/* Bộ lọc thể loại (Interactive Filter Controls) */}
              <div
                role="tablist"
                aria-label="Lọc bài viết theo thể loại"
                className="flex flex-wrap items-center gap-1 p-1 bg-[#EBE5D8] border border-stone-300 rounded-sm"
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
                          ? 'bg-[#881337] text-white shadow-xs'
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
                  className="bg-[#F3EFE6] border border-stone-300 flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Ảnh minh họa bài viết */}
                    <div
                      onClick={() => setActiveArticle(article)}
                      className="relative aspect-16/9 bg-stone-800 overflow-hidden border-b border-stone-300 cursor-pointer"
                    >
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                      />
                    </div>

                    <div className="p-6 sm:p-7">
                      {/* Metadata không đóng hộp pill (Zero-Pill Discipline) */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                        <span className="font-semibold text-[#881337]">{article.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>Tác giả: {article.author}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">{article.date}</span>
                        <span aria-hidden="true">·</span>
                        <span>{article.readTime}</span>
                      </div>

                      <h3
                        onClick={() => setActiveArticle(article)}
                        className="mt-2.5 text-2xl font-serif font-semibold text-stone-900 group-hover:text-[#881337] transition-colors cursor-pointer leading-snug"
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
                  <div className="px-6 sm:px-7 py-4 bg-[#EBE5D8]/70 border-t border-stone-300/80 flex items-center justify-between gap-4">
                    <span className="text-xs text-stone-600">{article.authorRole}</span>
                    <button
                      type="button"
                      onClick={() => setActiveArticle(article)}
                      className="px-4 py-2 bg-stone-900 hover:bg-[#881337] text-white text-xs font-semibold rounded-sm flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
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
        <section id="goc-anh" className="py-16 md:py-24 border-b border-stone-300/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-stone-300">
              <div>
                <p className="text-xs uppercase tracking-widest text-stone-500 font-medium">
                  Chuyên mục 03 · Góc Ảnh Kỷ Niệm Trường Lớp
                </p>
                <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-semibold text-stone-900 tracking-tight">
                  Khoảnh Khắc Thanh Xuân Dưới Mái Trường
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
                  className={`${photo.aspectClass} bg-[#F3EFE6] border border-stone-300 p-3.5 flex flex-col justify-between group cursor-pointer`}
                >
                  <div className="relative aspect-4/3 bg-stone-900 overflow-hidden">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity px-3.5 py-2 bg-[#FBF9F5] text-stone-900 text-xs font-semibold rounded-sm flex items-center gap-1.5 shadow-md">
                        <ZoomIn className="w-3.5 h-3.5 text-[#881337]" />
                        <span>Phóng to ảnh</span>
                      </span>
                    </div>
                  </div>

                  <figcaption className="pt-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
                      <span>
                        {photo.figureCode} · {photo.category}
                      </span>
                      <span className="font-mono tabular-nums">{photo.dateTaken}</span>
                    </div>
                    <h3 className="mt-1 text-lg font-serif font-semibold text-stone-900 group-hover:text-[#881337] transition-colors">
                      {photo.title}
                    </h3>
                    <p className="mt-1 text-sm font-prose text-stone-600 leading-relaxed">
                      {photo.caption}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------------
            CHUYÊN MỤC 04: GÓC ÂM NHẠC, VIDEO CLIP (<audio> & <video>)
            ------------------------------------------------------------------- */}
        <MediaSection />

        {/* -------------------------------------------------------------------
            CHUYÊN MỤC 05: GÓC BÌNH LUẬN (FORM + LOCALSTORAGE)
            ------------------------------------------------------------------- */}
        <section id="goc-binh-luan" className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-stone-300">
              <div>
                <p className="text-xs uppercase tracking-widest text-stone-500 font-medium">
                  Chuyên mục 05 · Góc Bình Luận &amp; Sổ Lưu Bút Tri Ân
                </p>
                <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-semibold text-stone-900 tracking-tight">
                  Gửi Ngàn Lời Chúc Tới Thầy Cô
                </h2>
              </div>
              <p className="text-xs text-stone-600 font-mono tabular-nums">
                Đang lưu trữ {comments.length} lời bình luận trong trình duyệt (localStorage)
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Cột trái (5/12): Biểu mẫu (<form>) nhập bình luận */}
              <div className="lg:col-span-5 bg-[#F3EFE6] border border-stone-300 p-6 sm:p-7">
                <h3 className="text-xl font-serif font-semibold text-stone-900">
                  Viết Lưu Bút &amp; Bình Luận Mới
                </h3>
                <p className="mt-1 text-xs text-stone-600">
                  Mọi lời chúc sẽ được hiển thị ngay lập tức và tự động lưu giữ khi tải lại trang.
                </p>

                <form onSubmit={handleCommentSubmit} className="mt-6 space-y-4">
                  <div>
                    <label
                      htmlFor="comment-fullname"
                      className="block text-xs font-semibold text-stone-800 mb-1.5"
                    >
                      Họ và tên người gửi <span className="text-[#881337]">*</span>
                    </label>
                    <input
                      id="comment-fullname"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ví dụ: Nguyễn Minh Anh"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-stone-300 rounded-sm focus:outline-none focus:border-[#881337]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="comment-role"
                      className="block text-xs font-semibold text-stone-800 mb-1.5"
                    >
                      Lớp / Vai trò <span className="text-[#881337]">*</span>
                    </label>
                    <input
                      id="comment-role"
                      type="text"
                      required
                      value={roleOrClass}
                      onChange={(e) => setRoleOrClass(e.target.value)}
                      placeholder="Ví dụ: Học sinh Lớp 12A1 / Cựu học sinh / Phụ huynh"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-stone-300 rounded-sm focus:outline-none focus:border-[#881337]"
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
                      placeholder="Ví dụ: Cô Thanh Hương chủ nhiệm & Hội đồng Sư phạm"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-stone-300 rounded-sm focus:outline-none focus:border-[#881337]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="comment-message"
                      className="block text-xs font-semibold text-stone-800 mb-1.5"
                    >
                      Nội dung bình luận &amp; lời chúc <span className="text-[#881337]">*</span>
                    </label>
                    <textarea
                      id="comment-message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Chia sẻ cảm nghĩ của bạn về tờ báo tường hoặc gửi lời tri ân nhân ngày 20/11..."
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-stone-300 rounded-sm focus:outline-none focus:border-[#881337] font-prose"
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
                    className="w-full py-2.5 px-4 bg-[#881337] hover:bg-[#6e0f2c] text-white text-sm font-semibold rounded-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Gửi Bình Luận Lên Báo Tường</span>
                  </button>
                </form>
              </div>

              {/* Cột phải (7/12): Danh sách bình luận hiển thị tức thì */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-300">
                  <h3 className="text-lg font-serif font-semibold text-stone-900">
                    Danh Sách Bình Luận Mới Nhất ({comments.length})
                  </h3>
                  {comments.length !== INITIAL_COMMENTS.length && (
                    <button
                      type="button"
                      onClick={() => setComments(INITIAL_COMMENTS)}
                      className="text-xs text-stone-600 hover:text-[#881337] underline cursor-pointer"
                    >
                      Khôi phục lưu bút mặc định
                    </button>
                  )}
                </div>

                {comments.length === 0 ? (
                  <div className="p-8 bg-[#F3EFE6] border border-stone-300 text-center text-sm text-stone-600">
                    Chưa có bình luận nào. Hãy là người đầu tiên gửi lời tri ân tới Thầy Cô!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {comments.map((item) => (
                      <article
                        key={item.id}
                        className="p-5 sm:p-6 bg-[#F3EFE6] border border-stone-300 rounded-sm transition-colors"
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
                              <p className="mt-1 text-xs text-[#881337] font-medium">
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
          1. Giới thiệu nhóm thực hiện
          2. Email liên hệ của học sinh đại diện nhóm (gắn thẻ mailto:)
          3. Ngày cập nhật nội dung gần nhất (17/11/2026)
          4. Trích dẫn nguồn tài liệu, hình ảnh, âm nhạc tham khảo
          ===================================================================== */}
      <footer className="bg-[#EBE5D8] border-t border-stone-300 text-stone-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-300">
            {/* Mục 1 (3/12): Giới thiệu về nhóm thực hiện */}
            <div className="lg:col-span-3 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#881337] font-semibold">
                <Users className="w-3.5 h-3.5" />
                <span>01. Nhóm Thực Hiện</span>
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                {config.teamName}
              </h3>
              <p className="text-xs font-prose text-stone-700 leading-relaxed">
                {config.teamDescription}
              </p>
              <p className="text-xs text-stone-600 pt-1">
                <strong>Đơn vị:</strong> {config.schoolName} — {config.className}
              </p>
            </div>

            {/* Mục 2 (4/12): Danh sách thành viên & Địa chỉ Email đại diện (mailto:) */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#881337] font-semibold">
                <Mail className="w-3.5 h-3.5" />
                <span>02. Thành Viên &amp; Email Đại Diện</span>
              </div>
              <ul className="space-y-2.5 text-xs">
                {config.members.map((member, idx) => (
                  <li key={idx} className="leading-snug">
                    <div className="font-semibold text-stone-900">
                      {member.name}{' '}
                      <span className="font-normal text-stone-600">({member.role})</span>
                    </div>
                    <a
                      href={`mailto:${member.email}`}
                      className="text-[#881337] hover:underline font-mono text-[11px]"
                    >
                      mailto:{member.email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mục 3 (2/12): Ngày cập nhật nội dung gần nhất */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#881337] font-semibold">
                <Calendar className="w-3.5 h-3.5" />
                <span>03. Cập Nhật</span>
              </div>
              <div className="p-3.5 bg-[#FBF9F5] border border-stone-300 rounded-sm">
                <p className="text-[11px] text-stone-500 uppercase tracking-wider">
                  Ngày cập nhật gần nhất
                </p>
                <p className="mt-1 text-base font-mono font-bold text-stone-900 tabular-nums">
                  {config.lastUpdated}
                </p>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Ấn phẩm được kiểm duyệt nội dung, hình ảnh và xuất bản phục vụ đợt thi đua chào mừng Ngày Nhà giáo Việt Nam 20/11.
              </p>
            </div>

            {/* Mục 4 (3/12): Trích dẫn nguồn tài liệu, hình ảnh, âm nhạc tham khảo */}
            <div className="lg:col-span-3 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#881337] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>04. Nguồn Tham Khảo</span>
              </div>
              <ul className="space-y-2.5 text-xs text-stone-700 leading-relaxed">
                {config.references.map((ref, idx) => (
                  <li key={idx}>
                    <strong className="text-stone-900">{ref.category}:</strong> {ref.detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Dòng bản quyền & Tiện ích xuất tệp nộp bài */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
            <div>
              © 2026 <strong>{config.teamName}</strong> · Chủ đề: <em>{config.newspaperTitle}</em>.
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleDownloadStandaloneHtml}
                className="text-stone-900 hover:text-[#881337] font-semibold underline underline-offset-4 cursor-pointer"
              >
                Tải tệp tĩnh index.html nộp bài
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => setIsExportModalOpen(true)}
                className="text-stone-900 hover:text-[#881337] font-semibold underline underline-offset-4 cursor-pointer"
              >
                Xem bộ câu lệnh Git &amp; README.md
              </button>
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
            className="bg-[#FBF9F5] border border-stone-300 max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-stone-300">
              <div className="text-xs text-stone-500">
                <span className="font-semibold text-[#881337]">{activeArticle.category}</span>
                <span className="mx-1.5" aria-hidden="true">·</span>
                <span>Tác phẩm số {activeArticle.orderNumber}</span>
                <span className="mx-1.5" aria-hidden="true">·</span>
                <span>{activeArticle.readTime}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="px-3 py-1.5 bg-[#F3EFE6] hover:bg-stone-200 border border-stone-300 text-xs font-semibold text-stone-800 rounded-sm flex items-center gap-1 cursor-pointer"
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

              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-stone-600 pb-6 border-b border-stone-200">
                <span>
                  Tác giả: <strong className="text-stone-900">{activeArticle.author}</strong> ({activeArticle.authorRole})
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">Ngày đăng: {activeArticle.date}</span>
              </div>

              <figure className="my-6 bg-[#F3EFE6] border border-stone-300 p-2.5">
                <img
                  src={activeArticle.coverImage}
                  alt={activeArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full max-h-72 object-cover"
                />
                <figcaption className="mt-2 text-xs font-prose italic text-stone-600 text-center">
                  {activeArticle.coverCaption}
                </figcaption>
              </figure>

              {/* Trích dẫn điểm nhấn */}
              <blockquote className="py-4 my-6 border-y border-stone-300 text-lg font-serif italic text-stone-800 text-center">
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
            className="bg-[#FBF9F5] border border-stone-300 max-w-4xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 bg-[#F3EFE6] border-b border-stone-300 flex items-center justify-between gap-4">
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
                className="px-3 py-1 bg-[#FBF9F5] hover:bg-stone-200 border border-stone-300 text-xs font-semibold text-stone-800 rounded-sm flex items-center gap-1 cursor-pointer"
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

            <div className="p-6 bg-[#FBF9F5]">
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
          MODAL 3: TẢI TỆP INDEX.HTML NỘP BÀI & BỘ CÂU LỆNH GIT / GITHUB PAGES
          ===================================================================== */}
      {isExportModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsExportModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="export-modal-title"
        >
          <div
            className="bg-[#FBF9F5] border border-stone-300 max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-stone-300">
              <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-xl">
                <FileCode className="w-5 h-5 text-[#881337]" />
                <h2 id="export-modal-title">
                  Nộp Sản Phẩm Tệp *.HTML &amp; Triển Khai GitHub Repository
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsExportModalOpen(false)}
                className="px-3 py-1.5 bg-[#F3EFE6] border border-stone-300 text-xs font-semibold rounded-sm cursor-pointer"
              >
                Đóng
              </button>
            </div>

            <div className="mt-6 space-y-6 text-sm text-stone-700">
              {/* Khối 1: Tải file index.html độc lập */}
              <div className="p-5 bg-[#F3EFE6] border border-stone-300 rounded-sm">
                <h3 className="text-base font-serif font-bold text-stone-900">
                  1. Tải tệp tĩnh <code className="font-mono text-[#881337]">index.html</code> hoàn chỉnh (Mở trực tiếp trên trình duyệt)
                </h3>
                <p className="mt-1.5 leading-relaxed">
                  Tệp <code className="font-mono">index.html</code> được đóng gói kèm đầy đủ CSS, JavaScript, dữ liệu nhóm đã tùy chỉnh của bạn và bình luận <code className="font-mono">localStorage</code>. Ngoài ra, bộ 3 tệp tách rời (<code className="font-mono">index.html</code>, <code className="font-mono">style.css</code>, <code className="font-mono">script.js</code>) cũng đã được tạo sẵn trong thư mục <code className="font-mono">/public/bao-tuong-tinh/</code>.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleDownloadStandaloneHtml}
                    className="px-4 py-2.5 bg-[#881337] hover:bg-[#6e0f2c] text-white text-xs font-semibold rounded-sm flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Tải xuống index.html ngay</span>
                  </button>
                </div>
              </div>

              {/* Khối 2: Bộ câu lệnh Git đẩy lên GitHub Repository mới */}
              <div className="p-5 bg-[#F3EFE6] border border-stone-300 rounded-sm">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#881337]" />
                    <h3 className="text-base font-serif font-bold text-stone-900">
                      2. Bộ câu lệnh Git đẩy lên GitHub Repository mới
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyGitCommands}
                    className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedGit ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedGit ? 'Đã sao chép!' : 'Sao chép lệnh Git'}</span>
                  </button>
                </div>

                <pre className="p-4 bg-stone-950 text-stone-100 font-mono text-xs overflow-x-auto rounded-sm leading-relaxed">
                  {GIT_DEPLOYMENT_COMMANDS}
                </pre>
              </div>

              {/* Khối 3: Hướng dẫn bật GitHub Pages */}
              <div className="p-5 bg-[#F3EFE6] border border-stone-300 rounded-sm">
                <h3 className="text-base font-serif font-bold text-stone-900">
                  3. Hướng dẫn bật GitHub Pages để lấy Link nộp bài Online
                </h3>
                <ol className="mt-2.5 space-y-2 list-decimal list-inside text-xs sm:text-sm leading-relaxed">
                  <li>
                    Truy cập vào <strong>GitHub Repository</strong> mới tạo của bạn sau khi chạy lệnh <code className="font-mono">git push</code>.
                  </li>
                  <li>
                    Vào mục <strong>Settings</strong> (Cài đặt) trên thanh công cụ ngang phía trên cùng, sau đó chọn <strong>Pages</strong> ở menu bên trái.
                  </li>
                  <li>
                    Tại mục <strong>Build and deployment &gt; Source</strong>, chọn <strong>Deploy from a branch</strong>.
                  </li>
                  <li>
                    Chọn nhánh <strong>main</strong> và thư mục <strong>/ (root)</strong> rồi bấm <strong>Save</strong>. Sau 1–2 phút, đường link báo tường online của nhóm sẽ hiển thị tại dạng <code className="font-mono text-[#881337]">https://&lt;ten-tai-khoan&gt;.github.io/bao-tuong-20-11/</code>.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 4: TÙY CHỈNH NHANH THÔNG TIN NHÓM (CHỦ ĐỀ, TÊN NHÓM, EMAIL, NGÀY)
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
            className="bg-[#FBF9F5] border border-stone-300 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-stone-300">
              <h2 id="custom-modal-title" className="text-xl font-serif font-bold text-stone-900">
                Tùy Chỉnh Thông Tin Báo Tường Của Nhóm
              </h2>
              <button
                type="button"
                onClick={() => setIsCustomModalOpen(false)}
                className="px-3 py-1 bg-[#F3EFE6] border border-stone-300 text-xs font-semibold rounded-sm cursor-pointer"
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
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-sm"
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
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-sm"
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
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-sm"
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
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-sm font-mono"
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
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-sm"
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
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-sm"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-semibold text-stone-800 mb-2">
                  Danh sách thành viên &amp; Email đại diện (Tự động cập nhật vào Footer &amp; File HTML tải về)
                </label>
                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {draftConfig.members.map((m, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-2.5 bg-[#F3EFE6] border border-stone-300 rounded-sm"
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
                        className="px-2.5 py-1.5 bg-white border border-stone-300 text-xs"
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
                        className="px-2.5 py-1.5 bg-white border border-stone-300 text-xs"
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
                        className="px-2.5 py-1.5 bg-white border border-stone-300 text-xs font-mono"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-300 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleResetDefaultConfig}
                  className="px-3.5 py-2 text-xs text-stone-600 hover:text-stone-900 underline cursor-pointer"
                >
                  Khôi phục thông tin mẫu
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#881337] hover:bg-[#6e0f2c] text-white text-xs font-semibold rounded-sm cursor-pointer"
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
