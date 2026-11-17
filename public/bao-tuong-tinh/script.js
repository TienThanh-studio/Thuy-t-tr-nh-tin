/**
 * ============================================================================
 * [TÙY CHỈNH NỘI DUNG BÁO TƯỜNG TẠI ĐÂY]
 * ============================================================================
 */
const ARTICLES = [
  {
    id: 'art-1',
    category: 'Tản văn',
    title: 'Màu Phấn Trắng Và Những Mùa Thu Đi Qua Mái Tóc Thầy',
    subtitle: 'Tản văn đạt giải Nhất cuộc thi viết Tri ân Thầy Cô cấp Trường năm học 2026',
    author: 'Trần Ngọc Bảo Châu',
    authorRole: 'Học sinh Lớp 12A1',
    date: '15/11/2026',
    readTime: '5 phút đọc',
    excerpt:
      'Chiều thu năm cuối cấp, tôi ngồi ở bàn đầu, lặng nhìn những hạt bụi phấn li ti bay trong vệt nắng xiên qua khung cửa gỗ. Chưa bao giờ tôi nhận ra mái tóc cô chủ nhiệm lại pha nhiều sương trắng đến thế...',
    pullQuote:
      'Hóa ra những hạt bụi phấn không hề rơi xuống đất rồi tan biến; chúng đậu lại trên mái tóc thầy cô, và hóa thành ánh sáng mở đường trong tâm hồn chúng tôi.',
    content: [
      'Chiều thu năm cuối cấp, tôi ngồi ở dãy bàn đầu tiên gần bục giảng, lặng nhìn những hạt bụi phấn li ti xoay tròn trong vệt nắng vàng óng xiên qua khung cửa sổ gỗ. Cô giáo dạy Văn của chúng tôi đang say sưa giảng về vẻ đẹp của những trang thơ cổ điển, bàn tay cô đưa từng nét chữ thanh thoát, mềm mại trên tấm bảng xanh sẫm màu thời gian.',
      'Đã gần ba năm gắn bó dưới mái trường THPT, thế nhưng phải đến khoảnh khắc bình yên ấy, khi chỉ còn vài tháng nữa là tiếng trống trường cuối cùng của tuổi học trò điểm nhịp, tôi mới chợt nhận ra mái tóc cô đã pha nhiều sợi bạc đến nhường nào.',
      'Hóa ra, những hạt bụi phấn không hề rơi xuống đất rồi tan biến; chúng đậu lại trên mái tóc thầy cô, và hóa thành ánh sáng mở đường trong tâm hồn chúng tôi. Ngày 20 tháng 11 năm nay là mùa tri ân cuối cùng của chúng tôi trong màu áo trắng học trò.'
    ]
  },
  {
    id: 'art-2',
    category: 'Thơ',
    title: 'Khúc Ca Người Gieo Ánh Sáng Bên Bến Sông Xưa',
    subtitle: 'Sáng tác thơ tự do kính tặng các Thầy Cô nhân dịp 20/11',
    author: 'Lê Hoàng Minh Khôi',
    authorRole: 'Thành viên Câu lạc bộ Văn học 12A1',
    date: '16/11/2026',
    readTime: '3 phút đọc',
    excerpt:
      'Tháng mười một gió về ngang cửa lớp / Nắng dịu dàng hong ấm những trang thơ / Thầy vẫn đứng bên bục gỗ đơn sơ / Gieo con chữ nở thành hoa tri thức...',
    pullQuote:
      'Dẫu mai này tung cánh khắp muôn phương / Giữa biển lớn vẫn nhớ về bến cũ / Nơi có Thầy cùng ngọn đèn không ngủ / Soi bước em đi suốt vạn dặm đường đời.',
    content: [
      'Tháng mười một gió về ngang cửa lớp\nNắng dịu dàng hong ấm những trang thơ\nThầy vẫn đứng bên bục gỗ đơn sơ\nGieo con chữ nở thành hoa tri thức.',
      'Bao mùa phượng cháy hồng rồi lại tắt\nBao chuyến đò lặng lẽ vượt dòng sông\nTiếng giảng bài sưởi ấm những ngày đông\nTừng nét phấn vẽ chân trời rộng mở.',
      'Dẫu mai này tung cánh khắp muôn phương\nGiữa biển lớn vẫn nhớ về bến cũ\nNơi có Thầy cùng ngọn đèn không ngủ\nSoi bước em đi suốt vạn dặm đường đời.'
    ]
  },
  {
    id: 'art-3',
    category: 'Cảm nghĩ',
    title: 'Lời Dặn Dò Cuối Trang Vở Nháp Và Bài Học Làm Người',
    subtitle: 'Hồi ức nhỏ về người thầy dạy Toán nghiêm khắc nhưng giàu tình thương',
    author: 'Nguyễn An Minh',
    authorRole: 'Trưởng nhóm Bút Trẻ Mùa Thu',
    date: '16/11/2026',
    readTime: '4 phút đọc',
    excerpt:
      'Trong ngăn kéo bàn học của tôi đến tận bây giờ vẫn giữ một tờ giấy kiểm tra Hình học từ năm lớp Mười Một. Điểm số không phải là mười tròn trĩnh, nhưng dòng chữ mực đỏ của Thầy ở góc trang giấy đã thay đổi tôi mãi mãi...',
    pullQuote:
      'Một bài toán có thể giải bằng nhiều cách, nhưng sự trung thực và lòng kiên trì thì chỉ có một con đường duy nhất.',
    content: [
      'Trong ngăn kéo bàn học của tôi đến tận bây giờ vẫn giữ phẳng phiu một tờ giấy kiểm tra môn Hình học từ học kỳ một năm lớp Mười Một. Điểm số trên tờ giấy ấy không phải là điểm mười tròn trĩnh, nhưng dòng nhận xét viết bằng mực đỏ nắn nót ở cuối trang của thầy Hùng đã thay đổi thái độ sống của tôi mãi mãi.',
      'Sự bao dung và tinh tế của thầy khiến tôi vừa xấu hổ vừa biết ơn vô hạn. Cảm ơn Thầy không chỉ dạy chúng em những định lý toán học khô khan, mà còn dạy chúng em định lý quan trọng nhất của cuộc đời: sống tử tế và không ngừng cố gắng.'
    ]
  }
];

const PHOTOS = [
  {
    id: 'photo-1',
    figureCode: 'Hình 01 · Bục Giảng',
    title: 'Nét Phấn Trắng Trong Nắng Chiều Thu',
    dateTaken: 'Tháng 11/2026',
    photographer: 'Phạm Hà Phương Linh (12A1)',
    src: '/src/assets/images/gallery_teacher_blackboard_1794923384996.jpg',
    caption: 'Cô giáo tận tụy bên bảng đen với những dòng giảng văn Truyện Kiều dưới ánh nắng chiều thu.',
    memoryStory: 'Bức ảnh được chụp vào tiết Ngữ văn chiều thứ Sáu tuần đầu tháng 11 khi nắng chiếu xiên qua khung cửa gỗ.'
  },
  {
    id: 'photo-2',
    figureCode: 'Hình 02 · Tri Ân',
    title: 'Nụ Cười Tuổi Học Trò & Những Trang Lưu Bút 20/11',
    dateTaken: '14/11/2026',
    photographer: 'Nguyễn An Minh (12A1)',
    src: '/src/assets/images/gallery_student_memories_1794923379511.jpg',
    caption: 'Các bạn nữ sinh lớp 12A1 cùng nhau chuẩn bị hoa tươi và viết sổ lưu bút tri ân thầy cô.',
    memoryStory: 'Cả tổ 1 và tổ 2 đã ở lại sau giờ học để tự tay bó những đóa hoa tươi thắm nhất gửi tặng các thầy cô bộ môn.'
  },
  {
    id: 'photo-3',
    figureCode: 'Hình 03 · Tri Thức',
    title: 'Góc Thư Viện Mùa Thu & Trang Bản Thảo Đầu Tiên',
    dateTaken: '10/11/2026',
    photographer: 'Lê Hoàng Minh Khôi (12A1)',
    src: '/src/assets/images/gallery_school_library_1794923380931.jpg',
    caption: 'Chiếc bàn gỗ sồi trong thư viện trường — nơi ra đời những bài thơ và lời ngỏ của tờ báo tường.',
    memoryStory: 'Tại góc bàn yên tĩnh ngập nắng của thư viện trường, nhóm Bút Trẻ Mùa Thu đã cùng nhau phác thảo bố cục tờ báo.'
  },
  {
    id: 'photo-4',
    figureCode: 'Hình 04 · Mái Trường',
    title: 'Hàng Xe Đạp Dưới Tán Cây Cổ Thụ Giờ Tan Tầm',
    dateTaken: '12/11/2026',
    photographer: 'Vũ Đức Trọng Nhân (12A1)',
    src: '/src/assets/images/gallery_graduation_yard_1794923382659.jpg',
    caption: 'Sân trường rợp bóng cây cổ thụ cùng những hàng xe đạp quen thuộc gắn liền với ba năm thanh xuân.',
    memoryStory: 'Hình ảnh bình dị mà thân thương nhất của tuổi học trò mỗi chiều tan học dưới ánh hoàng hôn ấm áp.'
  }
];

const INITIAL_COMMENTS = [
  {
    id: 'cmt-1',
    fullName: 'Cô Nguyễn Thị Thanh Hương',
    roleOrClass: 'Giáo viên Chủ nhiệm Lớp 12A1',
    message: 'Cô thật sự xúc động khi đọc từng bài viết và ngắm nhìn những bức ảnh kỷ niệm mà nhóm Bút Trẻ Mùa Thu đã dày công thực hiện.',
    createdAt: '16/11/2026 · 20:15'
  },
  {
    id: 'cmt-2',
    fullName: 'Đặng Quốc Huy',
    roleOrClass: 'Bí thư Chi đoàn 12A1',
    message: 'Nhân ngày Nhà giáo Việt Nam 20/11, em xin kính chúc quý Thầy Cô luôn dồi dào sức khỏe và hạnh phúc!',
    createdAt: '17/11/2026 · 07:30'
  }
];

const STORAGE_KEY = 'baotuong_20_11_comments_v1';

document.addEventListener('DOMContentLoaded', () => {
  const articlesContainer = document.getElementById('articles-container');
  const galleryContainer = document.getElementById('gallery-container');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');

  // 1. Render bài viết
  if (articlesContainer) {
    ARTICLES.forEach((art) => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <div>
          <div class="card-meta">${art.category} · ${art.author} · ${art.readTime}</div>
          <h3 class="card-title">${art.title}</h3>
          <p class="card-excerpt prose">${art.excerpt}</p>
        </div>
        <button type="button" class="btn-outline" data-article-id="${art.id}">Đọc thêm toàn văn →</button>
      `;
      articlesContainer.appendChild(card);
    });
  }

  // 2. Render góc ảnh
  if (galleryContainer) {
    PHOTOS.forEach((photo) => {
      const fig = document.createElement('figure');
      fig.className = 'gallery-item';
      fig.setAttribute('data-photo-id', photo.id);
      fig.innerHTML = `
        <img src="${photo.src}" alt="${photo.title}" referrerpolicy="no-referrer" />
        <figcaption style="margin-top: 10px;">
          <div style="font-size: 0.75rem; color: var(--text-muted);">${photo.figureCode} · ${photo.dateTaken}</div>
          <div class="serif" style="font-weight: 700; font-size: 1.05rem; margin: 4px 0;">${photo.title}</div>
          <p class="prose" style="font-size: 0.85rem; color: var(--text-muted);">${photo.caption}</p>
        </figcaption>
      `;
      galleryContainer.appendChild(fig);
    });
  }

  // 3. Xử lý Modal & Lightbox
  function openModal(html) {
    modalBody.innerHTML = html;
    modalBackdrop.classList.add('open');
  }
  function closeModal() {
    modalBackdrop.classList.remove('open');
  }

  modalClose?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  articlesContainer?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-article-id]');
    if (!btn) return;
    const art = ARTICLES.find((a) => a.id === btn.getAttribute('data-article-id'));
    if (!art) return;
    const paragraphsHtml = art.content
      .map((p) => `<p class="prose" style="margin-bottom: 16px; white-space: pre-line; font-size: 1.05rem;">${p}</p>`)
      .join('');
    openModal(`
      <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 8px;">${art.category} · Tác giả: ${art.author} (${art.authorRole}) · ${art.date}</div>
      <h2 style="font-size: 1.9rem; margin-bottom: 8px;">${art.title}</h2>
      <p style="font-style: italic; color: var(--text-muted); margin-bottom: 20px;">${art.subtitle}</p>
      <blockquote class="epigraph" style="font-size: 1.1rem;">“${art.pullQuote}”</blockquote>
      <div>${paragraphsHtml}</div>
    `);
  });

  galleryContainer?.addEventListener('click', (e) => {
    const item = e.target.closest('[data-photo-id]');
    if (!item) return;
    const photo = PHOTOS.find((p) => p.id === item.getAttribute('data-photo-id'));
    if (!photo) return;
    openModal(`
      <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 8px;">${photo.figureCode} · Chụp bởi: ${photo.photographer} · ${photo.dateTaken}</div>
      <h2 style="font-size: 1.6rem; margin-bottom: 14px;">${photo.title}</h2>
      <img src="${photo.src}" alt="${photo.title}" style="width: 100%; max-height: 460px; object-fit: contain; background: #1c1917;" />
      <p class="prose" style="margin-top: 14px; font-weight: 600;">${photo.caption}</p>
      <p class="prose" style="margin-top: 8px; color: var(--text-muted);">${photo.memoryStory}</p>
    `);
  });

  // 4. Quản lý Góc bình luận bằng localStorage
  function loadComments() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_COMMENTS;
    } catch {
      return INITIAL_COMMENTS;
    }
  }

  function renderComments() {
    const list = loadComments();
    const countEl = document.getElementById('comment-count');
    if (countEl) countEl.textContent = String(list.length);
    const container = document.getElementById('comments-list');
    if (!container) return;
    container.innerHTML = list
      .map(
        (c) => `
        <div class="comment-item">
          <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 6px;">
            <strong style="color: var(--text-ink); font-size: 0.92rem;">${c.fullName}</strong> · ${c.roleOrClass} · <span class="mono">${c.createdAt}</span>
          </div>
          <p class="prose" style="font-size: 0.95rem;">${c.message}</p>
        </div>
      `
      )
      .join('');
  }
  renderComments();

  document.getElementById('comment-form')?.addEventListener('submit', (e) => {
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
    } catch {}
    e.target.reset();
    renderComments();
  });

  // 5. Tổng hợp giai điệu WAV cho <audio> và trình chiếu Video Canvas
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
  if (audioEl) audioEl.src = URL.createObjectURL(new Blob([wav], { type: 'audio/wav' }));
});
