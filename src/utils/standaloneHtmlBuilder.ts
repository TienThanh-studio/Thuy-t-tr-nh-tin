import {
  WallPaperConfig,
  EDITORIAL_INTRO,
  ARTICLES_DATA,
  PHOTO_GALLERY_DATA,
  AUDIO_TRACKS_DATA,
  CommentItem,
} from '../data/wallPaperData';

/**
 * Tạo nội dung tệp tĩnh index.html hoàn chỉnh (tích hợp sẵn CSS & JS chuẩn)
 * để người dùng có thể bấm "Tải tệp index.html nộp bài" và mở trực tiếp
 * trên mọi trình duyệt không cần cài đặt server.
 */
export function buildStandaloneHtmlFile(
  config: WallPaperConfig,
  comments: CommentItem[],
  originUrl: string
): string {
  const resolveAssetUrl = (path: string) => {
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    return `${originUrl.replace(/\/$/, '')}${path}`;
  };

  const articlesJson = JSON.stringify(
    ARTICLES_DATA.map((a) => ({
      ...a,
      coverImage: resolveAssetUrl(a.coverImage),
    })),
    null,
    2
  );

  const photosJson = JSON.stringify(
    PHOTO_GALLERY_DATA.map((p) => ({
      ...p,
      src: resolveAssetUrl(p.src),
    })),
    null,
    2
  );

  const commentsJson = JSON.stringify(comments, null, 2);

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- =====================================================================
       [THÔNG TIN TÙY CHỈNH TRANG BÁO TƯỜNG ĐIỆN TỬ]
       - Chủ đề trang báo: ${config.newspaperTitle} - ${config.newspaperSubTheme}
       - Tên nhóm thực hiện: ${config.teamName}
       - Ngày cập nhật gần nhất: ${config.lastUpdated}
       ===================================================================== -->
  <title>${config.newspaperTitle} — ${config.newspaperSubTheme}</title>
  <meta name="description" content="${config.newspaperSubTheme} - Thực hiện bởi ${config.teamName}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg-paper: #FBF9F5;
      --bg-surface: #F3EFE6;
      --text-ink: #1C1917;
      --text-muted: #57534E;
      --border-hairline: #D6D0C4;
      --accent-crimson: #881337;
      --accent-crimson-hover: #6E0F2C;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg-paper); color: var(--text-ink); line-height: 1.6; }
    h1, h2, h3, .serif { font-family: 'Playfair Display', Georgia, serif; }
    .prose { font-family: 'Lora', Georgia, serif; }
    .mono { font-family: 'JetBrains Mono', monospace; font-variant-numeric: tabular-nums; }
    .container { max-width: 1160px; margin: 0 auto; padding: 0 24px; }

    /* Top Bar Contract: 3 Zones */
    .topbar {
      position: sticky; top: 0; z-index: 40;
      background: rgba(251, 249, 245, 0.95);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid var(--border-hairline);
    }
    .topbar-inner {
      display: flex; align-items: center; justify-content: space-between;
      gap: 32px; height: 68px;
    }
    .brand {
      font-family: 'Playfair Display', serif;
      font-size: 1.35rem; font-weight: 700; color: var(--text-ink);
      text-decoration: none; white-space: nowrap;
    }
    .nav-links { display: flex; align-items: center; gap: 28px; list-style: none; }
    .nav-links a {
      text-decoration: none; color: var(--text-muted); font-size: 0.9rem; font-weight: 500;
      white-space: nowrap; transition: color 0.15s;
    }
    .nav-links a:hover { color: var(--accent-crimson); text-decoration: underline; text-underline-offset: 6px; }
    .btn-primary {
      background: var(--accent-crimson); color: #fff; border: none;
      padding: 9px 18px; font-size: 0.85rem; font-weight: 600;
      border-radius: 3px; cursor: pointer; text-decoration: none; white-space: nowrap;
      transition: background 0.15s;
    }
    .btn-primary:hover { background: var(--accent-crimson-hover); }

    /* Banner Hero */
    .hero { padding: 40px 0 56px; border-bottom: 1px solid var(--border-hairline); }
    .masthead-meta {
      display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px;
      padding-bottom: 16px; margin-bottom: 28px; border-bottom: 1px solid var(--border-hairline);
      font-size: 0.8rem; color: var(--text-muted);
    }
    .hero-grid { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 40px; align-items: center; }
    .hero-kicker { font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--accent-crimson); font-weight: 600; }
    .hero-title { font-size: clamp(2.3rem, 4.2vw, 3.6rem); line-height: 1.12; margin: 12px 0 16px; }
    .hero-sub { font-size: 1.08rem; color: var(--text-muted); margin-bottom: 24px; }
    .hero-img-wrap { border: 1px solid var(--border-hairline); padding: 10px; background: var(--bg-surface); }
    .hero-img-wrap img { width: 100%; height: 360px; object-fit: cover; display: block; }
    .fig-caption { font-size: 0.78rem; color: var(--text-muted); font-style: italic; margin-top: 8px; font-family: 'Lora', serif; }

    /* Sections */
    section { padding: 64px 0; border-bottom: 1px solid var(--border-hairline); }
    .sec-header { margin-bottom: 36px; padding-bottom: 16px; border-bottom: 1px solid var(--border-hairline); }
    .sec-kicker { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--text-muted); }
    .sec-title { font-size: 2.1rem; margin-top: 6px; }

    /* Intro */
    .intro-box { max-width: 760px; margin: 0 auto; }
    .epigraph {
      padding: 20px 0; margin-bottom: 28px;
      border-top: 1px solid var(--border-hairline); border-bottom: 1px solid var(--border-hairline);
      font-family: 'Playfair Display', serif; font-style: italic; font-size: 1.3rem; color: var(--text-ink); text-align: center;
    }
    .dropcap::first-letter {
      float: left; font-family: 'Playfair Display', serif; font-size: 3.4rem;
      line-height: 0.85; padding-right: 12px; padding-top: 4px; color: var(--accent-crimson); font-weight: 700;
    }

    /* Cards Grid */
    .cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 28px; }
    .card {
      background: var(--bg-surface); border: 1px solid var(--border-hairline);
      display: flex; flex-direction: column; justify-content: space-between; padding: 24px;
    }
    .card-meta { font-size: 0.78rem; color: var(--text-muted); margin-bottom: 10px; }
    .card-title { font-size: 1.35rem; margin-bottom: 10px; line-height: 1.3; }
    .card-excerpt { font-size: 0.94rem; color: #3F3B37; margin-bottom: 20px; }
    .btn-outline {
      background: transparent; border: 1px solid var(--text-ink); color: var(--text-ink);
      padding: 8px 14px; font-size: 0.82rem; font-weight: 600; cursor: pointer; align-self: flex-start;
      transition: all 0.15s;
    }
    .btn-outline:hover { background: var(--text-ink); color: #fff; }

    /* Photo Gallery */
    .gallery-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; }
    .gallery-item { background: var(--bg-surface); border: 1px solid var(--border-hairline); padding: 12px; cursor: pointer; }
    .gallery-item img { width: 100%; height: 230px; object-fit: cover; display: block; transition: transform 0.2s; }
    .gallery-item:hover img { transform: scale(1.015); }

    /* Media */
    .media-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
    .media-card { background: var(--bg-surface); border: 1px solid var(--border-hairline); padding: 24px; }
    audio, video { width: 100%; margin-top: 12px; }

    /* Comments */
    .comment-layout { display: grid; grid-template-columns: 1fr 1.3fr; gap: 40px; }
    .form-group { margin-bottom: 16px; }
    .form-group label { display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px; }
    .form-group input, .form-group textarea {
      width: 100%; padding: 10px 12px; border: 1px solid var(--border-hairline);
      background: #fff; font-family: inherit; font-size: 0.92rem;
    }
    .comment-item { padding: 18px; background: var(--bg-surface); border: 1px solid var(--border-hairline); margin-bottom: 14px; }

    /* Modal */
    .modal-backdrop {
      position: fixed; inset: 0; background: rgba(20, 18, 16, 0.72);
      display: none; align-items: center; justify-content: center; padding: 20px; z-index: 100;
    }
    .modal-backdrop.open { display: flex; }
    .modal-box {
      background: var(--bg-paper); max-width: 740px; width: 100%; max-height: 88vh;
      overflow-y: auto; padding: 36px; border: 1px solid var(--border-hairline); position: relative;
    }
    .modal-close {
      position: absolute; top: 18px; right: 20px; background: var(--bg-surface);
      border: 1px solid var(--border-hairline); padding: 6px 12px; cursor: pointer; font-weight: 600;
    }

    /* Footer */
    footer { background: var(--bg-surface); padding: 56px 0 40px; font-size: 0.88rem; color: var(--text-muted); }
    .footer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 32px; margin-bottom: 32px; }
    .footer-title { font-family: 'Playfair Display', serif; font-size: 1.15rem; color: var(--text-ink); margin-bottom: 12px; font-weight: 700; }
    .footer-list { list-style: none; }
    .footer-list li { margin-bottom: 8px; }
    .footer-list a { color: var(--accent-crimson); text-decoration: none; }
    .footer-list a:hover { text-decoration: underline; }

    @media (max-width: 820px) {
      .hero-grid, .media-grid, .comment-layout { grid-template-columns: 1fr; }
      .nav-links { display: none; }
    }
  </style>
</head>
<body>

  <!-- PHẦN 1: TIÊU ĐỀ TRANG WEB (<header>) -->
  <header class="topbar">
    <div class="container topbar-inner">
      <a href="#" class="brand">${config.newspaperTitle}</a>
      <nav aria-label="Điều hướng chính">
        <ul class="nav-links">
          <li><a href="#loi-ngo">Lời Ngỏ</a></li>
          <li><a href="#cac-bai-viet">Các Bài Viết</a></li>
          <li><a href="#goc-anh">Góc Ảnh</a></li>
          <li><a href="#goc-am-nhac">Âm Nhạc &amp; Video</a></li>
          <li><a href="#goc-binh-luan">Góc Bình Luận</a></li>
        </ul>
      </nav>
      <a href="#goc-binh-luan" class="btn-primary">Gửi Lưu Bút 20/11</a>
    </div>
  </header>

  <!-- BANNER CHỦ ĐỀ BÁO TƯỜNG -->
  <div class="hero">
    <div class="container">
      <div class="masthead-meta">
        <span>${config.issueNumber}</span>
        <span>${config.schoolName} · ${config.className}</span>
        <span>Cập nhật gần nhất: <strong class="mono">${config.lastUpdated}</strong></span>
      </div>
      <div class="hero-grid">
        <div>
          <p class="hero-kicker">Ấn Phẩm Báo Tường Điện Tử Chào Mừng 20/11</p>
          <h1 class="hero-title">${config.newspaperTitle}</h1>
          <p class="hero-sub prose">${config.newspaperSubTheme}</p>
          <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 24px;">
            Thực hiện bởi: <strong>${config.teamName}</strong> — <em>“${config.teamSlogan}”</em>
          </p>
          <a href="#loi-ngo" class="btn-primary">Khám Phá Ấn Phẩm</a>
        </div>
        <div class="hero-img-wrap">
          <img src="${resolveAssetUrl('/src/assets/images/hero_school_courtyard_1794923380167.jpg')}" alt="Sân trường mùa thu" referrerPolicy="no-referrer" />
          <p class="fig-caption">Sân trường ngập nắng vàng tháng Mười Một — nơi lưu giữ thanh xuân và lòng biết ơn Thầy Cô.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- PHẦN 2: NỘI DUNG CHÍNH (<main>) -->
  <main class="container">

    <!-- 1. BÀI GIỚI THIỆU / LỜI NGỎ -->
    <section id="loi-ngo">
      <div class="sec-header">
        <p class="sec-kicker">${EDITORIAL_INTRO.kicker}</p>
        <h2 class="sec-title">${EDITORIAL_INTRO.title}</h2>
      </div>
      <div class="intro-box prose">
        <blockquote class="epigraph">${EDITORIAL_INTRO.epigraph}</blockquote>
        <p class="dropcap" style="margin-bottom: 18px; font-size: 1.06rem;">${EDITORIAL_INTRO.paragraphs[0]}</p>
        <p style="margin-bottom: 18px; font-size: 1.06rem;">${EDITORIAL_INTRO.paragraphs[1]}</p>
        <p style="margin-bottom: 24px; font-size: 1.06rem;">${EDITORIAL_INTRO.paragraphs[2]}</p>
        <div style="text-align: right; padding-top: 12px; border-top: 1px solid var(--border-hairline);">
          <p style="font-size: 0.85rem; color: var(--text-muted);">${EDITORIAL_INTRO.signatureTitle}</p>
          <p class="serif" style="font-weight: 700; font-size: 1.05rem;">${config.teamName}</p>
        </div>
      </div>
    </section>

    <!-- 2. CÁC BÀI VIẾT -->
    <section id="cac-bai-viet">
      <div class="sec-header">
        <p class="sec-kicker">Chuyên mục 02 · Sáng Tác Văn Học &amp; Cảm Nghĩ Học Trò</p>
        <h2 class="sec-title">Các Bài Viết Tri Ân Thầy Cô</h2>
      </div>
      <div id="articles-container" class="cards-grid"></div>
    </section>

    <!-- 3. GÓC ẢNH -->
    <section id="goc-anh">
      <div class="sec-header">
        <p class="sec-kicker">Chuyên mục 03 · Thư Viện Ảnh Kỷ Niệm (Bấm vào ảnh để phóng to Lightbox)</p>
        <h2 class="sec-title">Góc Ảnh Ký Ức Dưới Mái Trường</h2>
      </div>
      <div id="gallery-container" class="gallery-grid"></div>
    </section>

    <!-- 4. GÓC ÂM NHẠC, VIDEO CLIP -->
    <section id="goc-am-nhac">
      <div class="sec-header">
        <p class="sec-kicker">Chuyên mục 04 · Giai Điệu &amp; Phim Ngắn Tư Liệu</p>
        <h2 class="sec-title">Góc Âm Nhạc &amp; Video Clip</h2>
      </div>
      <div class="media-grid">
        <div class="media-card">
          <p class="sec-kicker">Trình Phát Âm Thanh (&lt;audio&gt;)</p>
          <h3 style="margin: 6px 0 8px;">${AUDIO_TRACKS_DATA[0].title}</h3>
          <p class="prose" style="font-size: 0.9rem; color: var(--text-muted);">${AUDIO_TRACKS_DATA[0].description}</p>
          <audio id="standalone-audio" controls></audio>
        </div>
        <div class="media-card">
          <p class="sec-kicker">Trình Phát Video Tư Liệu (&lt;video&gt; / Canvas)</p>
          <h3 style="margin: 6px 0 8px;">Phim Ngắn: Những Chuyến Đò Thầm Lặng</h3>
          <p class="prose" style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 10px;">
            Thước phim tổng hợp những khoảnh khắc đáng nhớ nhất của thầy và trò nhân dịp 20/11.
          </p>
          <canvas id="standalone-video-canvas" width="640" height="360" style="width:100%; background:#1c1917; display:block;"></canvas>
          <div style="margin-top: 10px;">
            <button type="button" id="btn-play-video" class="btn-primary">Phát / Tạm Dừng Video Kỷ Niệm</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. GÓC BÌNH LUẬN -->
    <section id="goc-binh-luan">
      <div class="sec-header">
        <p class="sec-kicker">Chuyên mục 05 · Sổ Lưu Bút Trực Tuyến (Lưu trữ bằng localStorage)</p>
        <h2 class="sec-title">Góc Bình Luận &amp; Lời Chúc 20/11</h2>
      </div>
      <div class="comment-layout">
        <form id="comment-form" class="media-card">
          <h3 style="margin-bottom: 16px;">Gửi Lời Tri Ân Mới</h3>
          <div class="form-group">
            <label for="input-name">Họ và tên *</label>
            <input id="input-name" type="text" required placeholder="Nhập họ và tên của bạn..." />
          </div>
          <div class="form-group">
            <label for="input-role">Lớp / Vai trò *</label>
            <input id="input-role" type="text" required placeholder="Ví dụ: Học sinh lớp 12A1 / Cựu học sinh..." />
          </div>
          <div class="form-group">
            <label for="input-message">Nội dung bình luận *</label>
            <textarea id="input-message" rows="4" required placeholder="Viết lời chúc hoặc kỷ niệm đáng nhớ với Thầy Cô..."></textarea>
          </div>
          <button type="submit" class="btn-primary">Gửi Bình Luận</button>
        </form>
        <div>
          <h3 style="margin-bottom: 16px;">Danh Sách Lưu Bút (<span id="comment-count" class="mono">0</span>)</h3>
          <div id="comments-list"></div>
        </div>
      </div>
    </section>
  </main>

  <!-- PHẦN 3: CHÂN TRANG WEB (<footer>) -->
  <footer>
    <div class="container">
      <div class="footer-grid">
        <!-- 1. Thông tin giới thiệu về nhóm thực hiện -->
        <div>
          <h4 class="footer-title">1. Nhóm Thực Hiện</h4>
          <p style="margin-bottom: 8px; color: var(--text-ink); font-weight: 600;">${config.teamName}</p>
          <p>${config.teamDescription}</p>
        </div>
        <!-- 2. Địa chỉ email liên hệ của học sinh đại diện (mailto:) -->
        <div>
          <h4 class="footer-title">2. Thành Viên &amp; Email Đại Diện</h4>
          <ul class="footer-list">
            ${config.members
              .map(
                (m) =>
                  `<li><strong>${m.name}</strong> (${m.role})<br/><a href="mailto:${m.email}">${m.email}</a></li>`
              )
              .join('')}
          </ul>
        </div>
        <!-- 3. Ngày cập nhật nội dung gần nhất -->
        <div>
          <h4 class="footer-title">3. Thông Tin Ấn Phẩm</h4>
          <p><strong>Chủ đề:</strong> ${config.newspaperTitle}</p>
          <p><strong>Đơn vị:</strong> ${config.schoolName} — ${config.className}</p>
          <p style="margin-top: 8px;"><strong>Ngày cập nhật gần nhất:</strong> <span class="mono" style="color: var(--text-ink); font-weight: 600;">${config.lastUpdated}</span></p>
        </div>
        <!-- 4. Trích dẫn nguồn tài liệu, hình ảnh, âm nhạc -->
        <div>
          <h4 class="footer-title">4. Nguồn Tham Khảo &amp; Trích Dẫn</h4>
          <ul class="footer-list">
            ${config.references
              .map((r) => `<li><strong>${r.category}:</strong> ${r.detail}</li>`)
              .join('')}
          </ul>
        </div>
      </div>
      <div style="border-top: 1px solid var(--border-hairline); padding-top: 20px; text-align: center; font-size: 0.8rem;">
        © 2026 ${config.teamName} · Báo tường điện tử chào mừng Ngày Nhà giáo Việt Nam 20/11.
      </div>
    </div>
  </footer>

  <!-- MODAL ĐỌC BÀI VIẾT & LIGHTBOX XEM ẢNH -->
  <div id="modal-backdrop" class="modal-backdrop" role="dialog" aria-modal="true">
    <div class="modal-box">
      <button type="button" id="modal-close" class="modal-close">Đóng (ESC)</button>
      <div id="modal-body"></div>
    </div>
  </div>

  <script>
    const ARTICLES = ${articlesJson};
    const PHOTOS = ${photosJson};
    const INITIAL_COMMENTS = ${commentsJson};
    const STORAGE_KEY = 'baotuong_20_11_comments_v1';

    // 1. Render Các Bài Viết
    const articlesContainer = document.getElementById('articles-container');
    ARTICLES.forEach((art) => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = \`
        <div>
          <div class="card-meta">\${art.category} · \${art.author} · \${art.readTime}</div>
          <h3 class="card-title">\${art.title}</h3>
          <p class="card-excerpt prose">\${art.excerpt}</p>
        </div>
        <button type="button" class="btn-outline" data-article-id="\${art.id}">Đọc thêm toàn văn →</button>
      \`;
      articlesContainer.appendChild(card);
    });

    // 2. Render Góc Ảnh
    const galleryContainer = document.getElementById('gallery-container');
    PHOTOS.forEach((photo) => {
      const fig = document.createElement('figure');
      fig.className = 'gallery-item';
      fig.setAttribute('data-photo-id', photo.id);
      fig.innerHTML = \`
        <img src="\${photo.src}" alt="\${photo.title}" referrerPolicy="no-referrer" />
        <figcaption style="margin-top: 10px;">
          <div style="font-size: 0.75rem; color: var(--text-muted);">\${photo.figureCode} · \${photo.dateTaken}</div>
          <div class="serif" style="font-weight: 700; font-size: 1.05rem; margin: 4px 0;">\${photo.title}</div>
          <p class="prose" style="font-size: 0.85rem; color: var(--text-muted);">\${photo.caption}</p>
        </figcaption>
      \`;
      galleryContainer.appendChild(fig);
    });

    // 3. Xử lý Modal Bài Viết & Lightbox Ảnh
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');

    function openModal(html) {
      modalBody.innerHTML = html;
      modalBackdrop.classList.add('open');
    }
    function closeModal() {
      modalBackdrop.classList.remove('open');
    }
    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    articlesContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-article-id]');
      if (!btn) return;
      const art = ARTICLES.find((a) => a.id === btn.getAttribute('data-article-id'));
      if (!art) return;
      const paragraphsHtml = art.content
        .map((p) => \`<p class="prose" style="margin-bottom: 16px; white-space: pre-line; font-size: 1.05rem;">\${p}</p>\`)
        .join('');
      openModal(\`
        <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 8px;">\${art.category} · Tác giả: \${art.author} (\${art.authorRole}) · \${art.date}</div>
        <h2 style="font-size: 1.9rem; margin-bottom: 8px;">\${art.title}</h2>
        <p style="font-style: italic; color: var(--text-muted); margin-bottom: 20px;">\${art.subtitle}</p>
        <blockquote class="epigraph" style="font-size: 1.1rem;">“\${art.pullQuote}”</blockquote>
        <div>\${paragraphsHtml}</div>
      \`);
    });

    galleryContainer.addEventListener('click', (e) => {
      const item = e.target.closest('[data-photo-id]');
      if (!item) return;
      const photo = PHOTOS.find((p) => p.id === item.getAttribute('data-photo-id'));
      if (!photo) return;
      openModal(\`
        <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 8px;">\${photo.figureCode} · Chụp bởi: \${photo.photographer} · \${photo.dateTaken}</div>
        <h2 style="font-size: 1.6rem; margin-bottom: 14px;">\${photo.title}</h2>
        <img src="\${photo.src}" alt="\${photo.title}" style="width: 100%; max-height: 460px; object-fit: contain; background: #1c1917;" />
        <p class="prose" style="margin-top: 14px; font-weight: 600;">\${photo.caption}</p>
        <p class="prose" style="margin-top: 8px; color: var(--text-muted);">\${photo.memoryStory}</p>
      \`);
    });

    // 4. Quản lý Góc Bình Luận với localStorage
    function loadComments() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : INITIAL_COMMENTS;
      } catch (e) {
        return INITIAL_COMMENTS;
      }
    }
    function renderComments() {
      const list = loadComments();
      document.getElementById('comment-count').textContent = list.length;
      const container = document.getElementById('comments-list');
      container.innerHTML = list
        .map(
          (c) => \`
          <div class="comment-item">
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 6px;">
              <strong style="color: var(--text-ink); font-size: 0.92rem;">\${c.fullName}</strong> · \${c.roleOrClass} · <span class="mono">\${c.createdAt}</span>
            </div>
            <p class="prose" style="font-size: 0.95rem;">\${c.message}</p>
          </div>
        \`
        )
        .join('');
    }
    renderComments();

    document.getElementById('comment-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const fullName = document.getElementById('input-name').value.trim();
      const roleOrClass = document.getElementById('input-role').value.trim();
      const message = document.getElementById('input-message').value.trim();
      if (!fullName || !roleOrClass || !message) return;
      const now = new Date();
      const createdAt = now.toLocaleDateString('vi-VN') + ' · ' + now.toTimeString().slice(0, 5);
      const updated = [{ id: 'cmt-' + Date.now(), fullName, roleOrClass, message, createdAt }, ...loadComments()];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {}
      e.target.reset();
      renderComments();
    });

    // 5. Tạo giai điệu WAV cho <audio> và trình chiếu <canvas>
    (function initAudioAndVideo() {
      const sr = 22050, sec = 16, samples = sr * sec;
      const buf = new Float32Array(samples);
      const melody = [
        [67, 0.2, 0.9], [72, 1.1, 0.9], [72, 2.0, 0.9], [74, 2.9, 1.3], [76, 4.2, 0.9], [72, 5.1, 1.8],
        [74, 7.2, 0.9], [76, 8.1, 0.9], [77, 9.0, 1.2], [74, 10.2, 0.9], [71, 11.1, 0.9], [67, 12.0, 2.2]
      ];
      melody.forEach(([m, st, dur]) => {
        const freq = 440 * Math.pow(2, (m - 69) / 12);
        const sIdx = Math.floor(st * sr), eIdx = Math.min(samples, Math.floor((st + dur + 0.6) * sr));
        for (let i = sIdx; i < eIdx; i++) {
          const t = (i - sIdx) / sr;
          buf[i] += Math.sin(2 * Math.PI * freq * t) * Math.min(1, t / 0.02) * Math.exp(-t * 1.7) * 0.22;
        }
      });
      const wav = new ArrayBuffer(44 + samples * 2), v = new DataView(wav);
      const ws = (o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
      ws(0, 'RIFF'); v.setUint32(4, 36 + samples * 2, true); ws(8, 'WAVE'); ws(12, 'fmt ');
      v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
      v.setUint32(24, sr, true); v.setUint32(28, sr * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true);
      ws(36, 'data'); v.setUint32(40, samples * 2, true);
      for (let i = 0; i < samples; i++) {
        const s = Math.max(-1, Math.min(1, buf[i]));
        v.setInt16(44 + i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      }
      const audioEl = document.getElementById('standalone-audio');
      audioEl.src = URL.createObjectURL(new Blob([wav], { type: 'audio/wav' }));

      const canvas = document.getElementById('standalone-video-canvas');
      const ctx = canvas.getContext('2d');
      let playing = false, tick = 0;
      function draw() {
        ctx.fillStyle = '#1C1917';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FBF9F5';
        ctx.font = '600 22px "Playfair Display", serif';
        ctx.fillText('Chuyến Đò Tri Thức — Kỷ Niệm 20/11', 32, 160);
        ctx.fillStyle = '#D6D0C4';
        ctx.font = 'italic 15px "Lora", serif';
        ctx.fillText('“Khi thầy viết bảng, bụi phấn rơi rơi...”', 32, 195);
        for (let i = 0; i < 15; i++) {
          ctx.fillStyle = 'rgba(253, 230, 138, 0.5)';
          ctx.beginPath();
          ctx.arc((i * 67 + tick * 2) % canvas.width, (i * 43 + Math.sin(tick * 0.05 + i) * 20) % canvas.height, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      draw();
      setInterval(() => { if (playing) { tick++; draw(); } }, 50);
      document.getElementById('btn-play-video').addEventListener('click', () => { playing = !playing; });
    })();
  </script>
</body>
</html>`;
}

export const GIT_DEPLOYMENT_COMMANDS = `# Bước 1: Khởi tạo Git repository mới tại thư mục dự án báo tường
git init

# Bước 2: Thêm toàn bộ mã nguồn (index.html, README.md, assets...) vào vùng chờ (Staging)
git add .

# Bước 3: Đóng gói (Commit) phiên bản đầu tiên với thông điệp rõ ràng
git commit -m "feat: hoan thanh bao tuong dien tu Chuyen Do Tri Thuc 20/11"

# Bước 4: Đổi tên nhánh chính thành main (chuẩn mặc định của GitHub)
git branch -M main

# Bước 5: Liên kết với GitHub Repository mới của bạn (Thay <TEN_TAI_KHOAN> và <TEN_REPO>)
git remote add origin https://github.com/<TEN_TAI_KHOAN>/bao-tuong-20-11.git

# Bước 6: Đẩy toàn bộ mã nguồn lên GitHub
git push -u origin main`;
