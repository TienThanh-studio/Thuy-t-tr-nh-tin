# Chuyến Đò Tri Thức — Báo Tường Điện Tử Chào Mừng 20/11

> **Chủ đề:** Tri ân Thầy Cô — Chào mừng Ngày Nhà giáo Việt Nam 20/11 & Tuổi học trò dưới mái trường  
> **Nhóm thực hiện:** Nhóm Bút Trẻ Mùa Thu (Tổ 1 & Tổ 2 — Tập thể Lớp 12A1)  
> **Ngày cập nhật gần nhất:** `17/11/2026`

---

## 1. Giới thiệu Dự án

**“Chuyến Đò Tri Thức”** là ấn phẩm Báo tường điện tử được thiết kế theo phong cách báo chí và lưu trữ học thuật (Archival Broadsheet & Editorial Design), kết hợp giữa nét trang trọng truyền thống của tờ báo tường giấy học đường với khả năng tương tác đa phương tiện của công nghệ web hiện đại (HTML5, CSS3, JavaScript ES6+).

### Các chuyên mục chính trên trang báo:
1. **Phần 1 — Tiêu đề trang web (`<header>`):**
   - Thanh điều hướng 3 vùng chuẩn mực dẫn mượt mà tới từng chuyên mục.
   - Banner nghệ thuật chủ đề *“Chuyến Đò Tri Thức”* cùng thông tin số báo, đơn vị thực hiện và ngày cập nhật `17/11/2026`.
2. **Phần 2 — Nội dung chính (`<main>` gồm đủ 5 chuyên mục):**
   - **01. Bài giới thiệu (Lời ngỏ):** Bài viết *“Những Người Gieo Hạt Thầm Lặng Bên Thềm Tháng Mười Một”* trình bày với chữ cái đầu dòng lớn (Drop-cap) và trích dẫn mở đầu trang trọng.
   - **02. Các bài viết:** Tuyển tập 4 sáng tác đặc sắc (*Tản văn, Thơ, Cảm nghĩ, Hồi ức*) hiển thị dạng thẻ (cards), hỗ trợ lọc theo thể loại và nút **“Đọc thêm toàn văn”** mở cửa sổ Modal chi tiết mà không làm rối bố cục.
   - **03. Góc ảnh:** Thư viện ảnh kỷ niệm trường lớp bố cục lưới bất đối xứng kèm chú thích chi tiết, hỗ trợ bấm vào ảnh để **phóng to (Lightbox)** xem câu chuyện đằng sau mỗi bức hình.
   - **04. Góc âm nhạc & Video clip:** Nhúng trình phát âm thanh `<audio controls>` (bản hòa tấu Piano & Music Box *Bụi Phấn* và *Ký Ức Dưới Mái Trường*) cùng trình chiếu `<video>` / phim ngắn tư liệu *“Những Chuyến Đò Thầm Lặng”* có bộ điều khiển trực quan và chọn phân cảnh.
   - **05. Góc bình luận (Sổ lưu bút):** Biểu mẫu `<form>` nhập *Họ và tên*, *Lớp/Vai trò*, *Người nhận tri ân* và *Nội dung bình luận*. Khi gửi, lời chúc hiển thị ngay lập tức và được lưu trữ bền vững bằng `localStorage` (không bị mất khi tải lại trang).
3. **Phần 3 — Chân trang web (`<footer>`):**
   - Giới thiệu nhóm thực hiện (*Nhóm Bút Trẻ Mùa Thu*).
   - Danh sách thành viên và địa chỉ email đại diện có gắn liên kết `mailto:` trực tiếp.
   - Ngày cập nhật nội dung gần nhất (`17/11/2026`).
   - Trích dẫn đầy đủ nguồn tài liệu văn học, hình ảnh, âm nhạc và phông chữ tham khảo.

---

## 2. Cấu trúc Thư mục Dự án

Dự án hỗ trợ **cả hai hình thức nộp bài và triển khai**:
- **Bản nộp trực tiếp tệp tĩnh (`*.html`, `style.css`, `script.js`):** Nằm trong thư mục `/public/bao-tuong-tinh/` hoặc tải xuống trực tiếp tệp `index.html` độc lập ngay từ nút **“Tải tệp HTML & GitHub”** trên giao diện web.
- **Bản ứng dụng Web đầy đủ (Vite + React + Tailwind CSS):** Phục vụ chạy máy chủ phát triển hoặc tự động build lên GitHub Pages / Cloud Run.

```text
├── index.html                         # Tệp HTML gốc của ứng dụng
├── README.md                          # Tài liệu hướng dẫn dự án & câu lệnh Git
├── package.json                       # Cấu hình dependencies và scripts
├── public/
│   └── bao-tuong-tinh/                # Bộ tệp tĩnh thuần HTML/CSS/JS mở trực tiếp trên trình duyệt
│       ├── index.html                 # Trang báo tường tĩnh (chứa đủ Header, Main 5 mục, Footer)
│       ├── style.css                  # Bảng định kiểu CSS giao diện báo tường
│       └── script.js                  # Xử lý Modal, Lightbox, Audio/Video và localStorage
└── src/
    ├── App.tsx                        # Giao diện chính của Báo tường điện tử
    ├── data/
    │   └── wallPaperData.ts           # [ĐÁNH DẤU RÕ] Nơi chỉnh sửa thông tin nhóm, bài viết, thành viên
    ├── components/
    │   └── MediaSection.tsx           # Chuyên mục 04: Trình phát <audio> & <video> kỷ niệm
    └── utils/
        ├── mediaGenerator.ts          # Bộ tổng hợp âm thanh WAV chuẩn PCM chạy offline 100%
        └── standaloneHtmlBuilder.ts   # Trình xuất tệp index.html tĩnh độc lập để nộp bài
```

---

## 3. Hướng dẫn Xem Trực tiếp & Nộp bài Tệp `*.html`

### Cách 1: Mở trực tiếp tệp `.html` trên trình duyệt (Không cần cài đặt)
1. Trên giao diện trang web đang mở, bấm vào nút **“Tải tệp HTML & Git”** ở thanh công cụ đầu trang, sau đó chọn **“Tải tệp index.html độc lập”** (hoặc mở tệp `public/bao-tuong-tinh/index.html`).
2. Nhấp đúp chuột (Double-click) vào tệp `index.html` vừa tải về để mở bằng bất kỳ trình duyệt nào (Google Chrome, Microsoft Edge, Firefox, Safari).

### Cách 2: Chạy môi trường phát triển (Development Server)
```bash
npm install
npm run dev
```
Sau đó truy cập địa chỉ `http://localhost:3000` trên trình duyệt.

---

## 4. Bộ Câu Lệnh Git Đẩy Lên GitHub Repository Mới

Để tạo và đẩy toàn bộ mã nguồn trang báo tường lên một **GitHub Repository mới**, bạn hãy mở **Terminal** (hoặc **Git Bash**) tại thư mục dự án và chạy lần lượt các câu lệnh sau:

```bash
# Bước 1: Khởi tạo Git repository tại thư mục dự án
git init

# Bước 2: Đưa toàn bộ các tệp mã nguồn vào vùng chuẩn bị (Staging Area)
git add .

# Bước 3: Tạo bản ghi (Commit) đầu tiên
git commit -m "feat: hoan thanh bao tuong dien tu Chuyen Do Tri Thuc 20/11"

# Bước 4: Đảm bảo nhánh chính mang tên 'main'
git branch -M main

# Bước 5: Liên kết với Repository mới tạo trên GitHub của bạn
# (Lưu ý: Thay <TEN_TAI_KHOAN> và <TEN_REPO> bằng đường dẫn thực tế của bạn)
git remote add origin https://github.com/<TEN_TAI_KHOAN>/<TEN_REPO>.git

# Bước 6: Đẩy toàn bộ mã nguồn lên nhánh main trên GitHub
git push -u origin main
```

---

## 5. Hướng Dẫn Bật GitHub Pages Để Lấy Link Nộp Bài Online

Nếu bạn nộp thư mục tĩnh (`index.html`, `style.css`, `script.js`) lên GitHub và muốn lấy đường dẫn trang web trực tuyến (`https://<ten-tai-khoan>.github.io/<ten-repo>/`) để gửi cho giáo viên chấm bài:

1. Truy cập vào **GitHub Repository** của bạn trên trình duyệt.
2. Nhấn vào tab **Settings** (biểu tượng bánh răng ở thanh menu trên cùng).
3. Ở thanh menu bên trái, kéo xuống mục **Code and automation** và chọn **Pages**.
4. Tại phần **Build and deployment**:
   - Mục **Source**: Chọn **Deploy from a branch**.
   - Mục **Branch**: Chọn nhánh **`main`**, thư mục chọn **`/ (root)`**, sau đó nhấn nút **Save**.
5. Đợi khoảng **1 – 2 phút** rồi tải lại trang **Settings > Pages**. Bạn sẽ thấy dòng thông báo:
   > *Your site is live at `https://<ten-tai-khoan>.github.io/<ten-repo>/`*
6. Sao chép đường link này để nộp bài kèm với tệp `index.html`.

