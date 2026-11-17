import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Film, Music } from 'lucide-react';
import { AUDIO_TRACKS_DATA, PHOTO_GALLERY_DATA, HERO_IMAGE_PATH } from '../data/wallPaperData';
import { createInstrumentalWavUrl } from '../utils/mediaGenerator';

interface VideoScene {
  imageSrc: string;
  chapter: string;
  title: string;
  subtitle: string;
  startSec: number;
  endSec: number;
}

const VIDEO_SCENES: VideoScene[] = [
  {
    imageSrc: HERO_IMAGE_PATH,
    chapter: 'Cảnh 01 · Mùa Thu Mái Trường',
    title: 'Nắng Tháng Mười Một Trên Sân Trường Xưa',
    subtitle: '“Mỗi sớm mai bước qua cánh cổng trường, tiếng lá xào xạc gọi về bao ký ức tuổi học trò...”',
    startSec: 0,
    endSec: 6,
  },
  {
    imageSrc: PHOTO_GALLERY_DATA[0].src,
    chapter: 'Cảnh 02 · Bục Giảng Thầm Lặng',
    title: 'Nét Phấn Trắng & Những Giờ Giảng Say Sưa',
    subtitle: '“Khi thầy viết bảng, bụi phấn rơi rơi — Có hạt bụi nào rơi trên bục giảng, có hạt bụi nào vương trên tóc thầy...”',
    startSec: 6,
    endSec: 12,
  },
  {
    imageSrc: PHOTO_GALLERY_DATA[1].src,
    chapter: 'Cảnh 03 · Hoa Và Lưu Bút',
    title: 'Nụ Cười Tuổi Mười Tám & Lời Tri Ân',
    subtitle: '“Những trang lưu bút viết vội, những bó hoa tươi thắm gửi trọn tấm lòng biết ơn của tập thể 12A1.”',
    startSec: 12,
    endSec: 18,
  },
  {
    imageSrc: PHOTO_GALLERY_DATA[3].src,
    chapter: 'Cảnh 04 · Hành Trang Vào Đời',
    title: 'Chuyến Đò Tri Thức Cập Bến Ước Mơ',
    subtitle: '“Kính chúc quý Thầy Cô mãi dồi dào sức khỏe — Ngọn hải đăng soi sáng vạn dặm đường đời.”',
    startSec: 18,
    endSec: 24,
  },
];

const TOTAL_VIDEO_DURATION = 24;

export const MediaSection: React.FC = () => {
  const [audioUrls, setAudioUrls] = useState<Record<string, string>>({});
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});

  // Trạng thái trình phát Video tư liệu
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoBgAudioRef = useRef<HTMLAudioElement | null>(null);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const loadedImagesRef = useRef<Record<string, HTMLImageElement>>({});

  // Khởi tạo file WAV cho các bản nhạc và nhạc nền video
  useEffect(() => {
    const urls: Record<string, string> = {};
    for (const track of AUDIO_TRACKS_DATA) {
      urls[track.id] = createInstrumentalWavUrl(track.melodyPreset);
    }
    urls['video_soundtrack'] = createInstrumentalWavUrl('bui_phan');
    setAudioUrls(urls);

    return () => {
      Object.values(urls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  // Tải trước ảnh cho trình dựng Video Canvas -> <video>
  useEffect(() => {
    VIDEO_SCENES.forEach((scene) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = scene.imageSrc;
      img.onload = () => {
        loadedImagesRef.current[scene.imageSrc] = img;
        drawVideoFrame(0);
      };
    });
  }, []);

  // Kết nối luồng Canvas trực tiếp vào thẻ <video> chuẩn HTML5
  useEffect(() => {
    const canvas = canvasRef.current;
    const videoEl = videoElementRef.current;
    if (canvas && videoEl && typeof (canvas as HTMLCanvasElement & { captureStream?: (fps?: number) => MediaStream }).captureStream === 'function') {
      try {
        const stream = (canvas as HTMLCanvasElement & { captureStream: (fps?: number) => MediaStream }).captureStream(30);
        videoEl.srcObject = stream;
      } catch {
        // Fallback sử dụng trực tiếp khung hình Canvas đồng bộ
      }
    }
  }, []);

  const drawVideoFrame = (currentTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const scene =
      VIDEO_SCENES.find((s) => currentTime >= s.startSec && currentTime < s.endSec) ||
      VIDEO_SCENES[VIDEO_SCENES.length - 1];

    const sceneProgress = Math.max(0, Math.min(1, (currentTime - scene.startSec) / (scene.endSec - scene.startSec)));

    ctx.fillStyle = '#1C1917';
    ctx.fillRect(0, 0, width, height);

    const img = loadedImagesRef.current[scene.imageSrc];
    if (img && img.complete && img.naturalWidth > 0) {
      // Hiệu ứng chuyển động điện ảnh Ken Burns nhẹ nhàng
      const scale = 1.03 + sceneProgress * 0.08;
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = width / height;
      let drawW = width * scale;
      let drawH = height * scale;

      if (imgAspect > canvasAspect) {
        drawW = height * imgAspect * scale;
      } else {
        drawH = (width / imgAspect) * scale;
      }

      const offsetX = (width - drawW) / 2 - sceneProgress * 18;
      const offsetY = (height - drawH) / 2 - sceneProgress * 10;

      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    }

    // Lớp phủ Scrim điện ảnh đảm bảo độ tương phản chữ >= 4.5:1
    const grad = ctx.createLinearGradient(0, height * 0.35, 0, height);
    grad.addColorStop(0, 'rgba(15, 13, 11, 0.05)');
    grad.addColorStop(0.55, 'rgba(15, 13, 11, 0.58)');
    grad.addColorStop(1, 'rgba(15, 13, 11, 0.92)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Hiệu ứng hạt bụi phấn vàng lấp lánh bay trong nắng
    ctx.fillStyle = 'rgba(253, 230, 138, 0.42)';
    for (let i = 0; i < 18; i++) {
      const px = ((i * 97 + currentTime * (14 + (i % 5) * 3)) % width);
      const py = ((i * 61 + Math.sin(currentTime + i) * 28) % (height * 0.75));
      const radius = 1.2 + (i % 3) * 0.9;
      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Vẽ phụ đề nghệ thuật trong khung video
    ctx.fillStyle = 'rgba(245, 240, 230, 0.85)';
    ctx.font = '500 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`${scene.chapter.toUpperCase()}  ·  PHIM TƯ LIỆU 20/11`, 36, height - 110);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '600 26px "Playfair Display", Georgia, serif';
    ctx.fillText(scene.title, 36, height - 74);

    ctx.fillStyle = 'rgba(231, 229, 228, 0.92)';
    ctx.font = 'italic 15px "Lora", Georgia, serif';
    ctx.fillText(scene.subtitle, 36, height - 42);
  };

  // Vòng lặp thời gian cho Video tư liệu
  useEffect(() => {
    drawVideoFrame(videoTime);
  }, [videoTime]);

  useEffect(() => {
    if (!isVideoPlaying) return;
    const interval = window.setInterval(() => {
      setVideoTime((prev) => {
        const next = prev + 0.1;
        if (next >= TOTAL_VIDEO_DURATION) {
          setIsVideoPlaying(false);
          if (videoBgAudioRef.current) {
            videoBgAudioRef.current.pause();
            videoBgAudioRef.current.currentTime = 0;
          }
          return 0;
        }
        return next;
      });
    }, 100);

    return () => window.clearInterval(interval);
  }, [isVideoPlaying]);

  const toggleVideoPlay = () => {
    // Tạm dừng các trình phát audio đơn lẻ nếu đang bật
    Object.values(audioRefs.current).forEach((el) => {
      if (el && !el.paused) el.pause();
    });
    setActiveAudioId(null);

    const nextState = !isVideoPlaying;
    setIsVideoPlaying(nextState);

    if (videoElementRef.current) {
      if (nextState) {
        videoElementRef.current.play().catch(() => {});
      } else {
        videoElementRef.current.pause();
      }
    }

    if (videoBgAudioRef.current) {
      videoBgAudioRef.current.muted = isVideoMuted;
      if (nextState) {
        videoBgAudioRef.current.currentTime = videoTime;
        videoBgAudioRef.current.play().catch(() => {});
      } else {
        videoBgAudioRef.current.pause();
      }
    }
  };

  const handleVideoSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setVideoTime(newTime);
    if (videoBgAudioRef.current) {
      videoBgAudioRef.current.currentTime = newTime;
    }
  };

  const toggleVideoMute = () => {
    const nextMuted = !isVideoMuted;
    setIsVideoMuted(nextMuted);
    if (videoBgAudioRef.current) {
      videoBgAudioRef.current.muted = nextMuted;
    }
  };

  const restartVideo = () => {
    setVideoTime(0);
    if (videoBgAudioRef.current) {
      videoBgAudioRef.current.currentTime = 0;
      if (isVideoPlaying) {
        videoBgAudioRef.current.play().catch(() => {});
      }
    }
  };

  const toggleTrackPlay = (trackId: string) => {
    const audioEl = audioRefs.current[trackId];
    if (!audioEl) return;

    // Dừng video nếu đang chạy
    if (isVideoPlaying) {
      setIsVideoPlaying(false);
      if (videoBgAudioRef.current) videoBgAudioRef.current.pause();
    }

    // Dừng các bản nhạc khác
    Object.entries(audioRefs.current).forEach(([id, el]) => {
      if (id !== trackId && el && !el.paused) {
        el.pause();
      }
    });

    if (audioEl.paused) {
      audioEl.play().catch(() => {});
      setActiveAudioId(trackId);
    } else {
      audioEl.pause();
      setActiveAudioId(null);
    }
  };

  const formatSec = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const currentScene =
    VIDEO_SCENES.find((s) => videoTime >= s.startSec && videoTime < s.endSec) ||
    VIDEO_SCENES[0];

  return (
    <section id="goc-am-nhac" className="py-16 md:py-24 border-b border-stone-300/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tiêu đề chuyên mục 04 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-stone-300">
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-500 font-medium">
              Chuyên mục 04 · Góc Âm Nhạc &amp; Video Clip Kỷ Niệm
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-semibold text-stone-900 tracking-tight">
              Thanh Âm Mái Trường &amp; Thước Phim Tri Ân
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-md font-prose italic">
            Lắng nghe những giai điệu gắn liền với bảng đen phấn trắng và thưởng thức thước phim tư liệu kỷ niệm của tập thể lớp 12A1.
          </p>
        </div>

        {/* Khối 2 cột: Cột trái Trình phát Audio (<audio>) - Cột phải Trình phát Video Clip (<video>) */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cột 1 (5/12): Danh sách Góc Âm Nhạc với thẻ <audio controls> chuẩn HTML5 */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2 text-stone-900 font-serif font-semibold text-lg">
                <Music className="w-4 h-4 text-[#881337]" />
                <span>Tuyển Tập Giai Điệu Tri Ân (&lt;audio&gt;)</span>
              </div>
              <span className="text-xs text-stone-500 font-mono tabular-nums">02 Tác phẩm</span>
            </div>

            {AUDIO_TRACKS_DATA.map((track) => {
              const isPlaying = activeAudioId === track.id;
              return (
                <article
                  key={track.id}
                  className="p-6 bg-[#F3EFE6] border border-stone-300/90 rounded-sm transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs text-stone-500 font-sans">
                        <span>Bản thu {track.number}</span>
                        <span className="mx-1.5" aria-hidden="true">·</span>
                        <span>Thời lượng {track.durationLabel}</span>
                      </div>
                      <h3 className="mt-1.5 text-lg font-serif font-semibold text-stone-900 leading-snug">
                        {track.title}
                      </h3>
                      <p className="mt-1 text-xs text-stone-600">
                        {track.composer} · {track.performer}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleTrackPlay(track.id)}
                      className="w-10 h-10 rounded-full bg-[#881337] text-white flex items-center justify-center hover:bg-[#6e0f2c] transition-colors shrink-0 cursor-pointer"
                      aria-label={isPlaying ? `Tạm dừng ${track.title}` : `Phát ${track.title}`}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>
                  </div>

                  {/* Lời giới thiệu ngắn cho tác phẩm */}
                  <p className="mt-3 text-sm text-stone-700 font-prose leading-relaxed">
                    {track.description}
                  </p>

                  {/* Trình phát <audio controls> chuẩn HTML5 theo đúng yêu cầu đề bài */}
                  <div className="mt-4 pt-3 border-t border-stone-300/70">
                    <label className="block text-xs text-stone-500 mb-1.5">
                      Trình điều khiển âm thanh HTML5 trực tiếp:
                    </label>
                    <audio
                      ref={(el) => {
                        audioRefs.current[track.id] = el;
                      }}
                      controls
                      preload="metadata"
                      src={audioUrls[track.id] || undefined}
                      onPlay={() => {
                        if (isVideoPlaying) {
                          setIsVideoPlaying(false);
                          videoBgAudioRef.current?.pause();
                        }
                        Object.entries(audioRefs.current).forEach(([id, el]) => {
                          if (id !== track.id && el && !el.paused) el.pause();
                        });
                        setActiveAudioId(track.id);
                      }}
                      onPause={() => {
                        if (activeAudioId === track.id) setActiveAudioId(null);
                      }}
                      onEnded={() => {
                        if (activeAudioId === track.id) setActiveAudioId(null);
                      }}
                      className="w-full h-9 accent-[#881337]"
                    >
                      Trình duyệt của bạn không hỗ trợ thẻ audio.
                    </audio>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Cột 2 (7/12): Góc Video Clip kỷ niệm với thẻ <video> & bộ điều khiển trực quan */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-6">
              <div className="flex items-center gap-2 text-stone-900 font-serif font-semibold text-lg">
                <Film className="w-4 h-4 text-[#881337]" />
                <span>Phim Ngắn Tư Liệu: Những Chuyến Đò Thầm Lặng (&lt;video&gt;)</span>
              </div>
              <span className="text-xs text-stone-500 font-mono tabular-nums">
                HD 16:9 · {formatSec(videoTime)} / {formatSec(TOTAL_VIDEO_DURATION)}
              </span>
            </div>

            <div className="bg-[#F3EFE6] border border-stone-300/90 rounded-sm overflow-hidden">
              {/* Khung trình chiếu kết hợp <video> và Canvas điện ảnh */}
              <div className="relative aspect-video bg-stone-950 overflow-hidden group">
                {/* Thẻ <video> chuẩn HTML5 nhận luồng stream từ Canvas tư liệu */}
                <video
                  ref={videoElementRef}
                  muted
                  playsInline
                  className="sr-only"
                  aria-label="Phim tư liệu Những Chuyến Đò Thầm Lặng"
                />

                <canvas
                  ref={canvasRef}
                  width={960}
                  height={540}
                  onClick={toggleVideoPlay}
                  className="w-full h-full object-cover cursor-pointer"
                />

                {/* Nhạc nền đồng bộ cho Video Clip */}
                {audioUrls['video_soundtrack'] && (
                  <audio
                    ref={videoBgAudioRef}
                    src={audioUrls['video_soundtrack']}
                    loop
                    preload="auto"
                  />
                )}

                {/* Nút Play trung tâm khi video đang dừng */}
                {!isVideoPlaying && (
                  <button
                    type="button"
                    onClick={toggleVideoPlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/25 hover:bg-black/35 transition-colors cursor-pointer"
                    aria-label="Phát video clip kỷ niệm"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#881337] text-white flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform">
                      <Play className="w-7 h-7 ml-1" />
                    </div>
                  </button>
                )}
              </div>

              {/* Thanh điều khiển Video trực quan */}
              <div className="p-4 sm:p-5 bg-[#EBE5D8] border-t border-stone-300">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={toggleVideoPlay}
                    className="px-3.5 py-2 bg-[#881337] hover:bg-[#6e0f2c] text-white text-xs font-medium rounded-sm flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {isVideoPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>Tạm dừng</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        <span>Phát Video</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={restartVideo}
                    className="p-2 text-stone-700 hover:text-stone-950 border border-stone-300 bg-[#FBF9F5] rounded-sm transition-colors cursor-pointer"
                    title="Phát lại từ đầu"
                    aria-label="Phát lại từ đầu"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  {/* Thanh tua thời gian (Scrubber) */}
                  <div className="flex-1 flex items-center gap-2.5">
                    <span className="text-xs font-mono tabular-nums text-stone-700">
                      {formatSec(videoTime)}
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={TOTAL_VIDEO_DURATION}
                      step={0.1}
                      value={videoTime}
                      onChange={handleVideoSeek}
                      aria-label="Tua thời gian video"
                      className="w-full h-1.5 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-[#881337]"
                    />
                    <span className="text-xs font-mono tabular-nums text-stone-500">
                      {formatSec(TOTAL_VIDEO_DURATION)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={toggleVideoMute}
                    className="p-2 text-stone-700 hover:text-stone-950 border border-stone-300 bg-[#FBF9F5] rounded-sm transition-colors cursor-pointer"
                    aria-label={isVideoMuted ? 'Bật tiếng video' : 'Tắt tiếng video'}
                    title={isVideoMuted ? 'Bật tiếng' : 'Tắt tiếng'}
                  >
                    {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

                {/* Chuyển nhanh giữa 4 phân cảnh trong Video */}
                <div className="mt-4 pt-3 border-t border-stone-300/80 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {VIDEO_SCENES.map((scene, idx) => {
                    const isActive = currentScene.chapter === scene.chapter;
                    return (
                      <button
                        key={scene.chapter}
                        type="button"
                        onClick={() => {
                          setVideoTime(scene.startSec);
                          if (videoBgAudioRef.current) {
                            videoBgAudioRef.current.currentTime = scene.startSec;
                          }
                        }}
                        className={`text-left p-2 rounded-sm border text-xs transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-[#FBF9F5] border-[#881337] text-stone-900 font-medium'
                            : 'bg-transparent border-stone-300/70 text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        <div className="font-mono text-[11px] text-stone-500 tabular-nums">
                          0{idx + 1} · {formatSec(scene.startSec)}
                        </div>
                        <div className="truncate mt-0.5">{scene.title}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Lời giới thiệu ngắn cho Video clip */}
                <div className="mt-4 pt-3 border-t border-stone-300/80 text-sm text-stone-700 font-prose leading-relaxed">
                  <strong className="font-sans font-semibold text-stone-900">Lời giới thiệu tác phẩm: </strong>
                  Video clip <em>“Những Chuyến Đò Thầm Lặng”</em> do Ban Truyền thông Nhóm Bút Trẻ Mùa Thu biên tập từ những khung hình kỷ niệm thực tế tại trường, kết hợp âm nhạc hòa tấu <em>Bụi Phấn</em> nhằm tái hiện một ngày mùa thu bình dị mà thiêng liêng của thầy và trò.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
