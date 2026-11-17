import React, { useRef, useState } from 'react';
import { Play, Pause, Film, Music } from 'lucide-react';
import {
  AUDIO_TRACKS_DATA,
  HERO_IMAGE_PATH,
  SCHOOL_VIDEO_PATH,
} from '../data/wallPaperData';

const AUDIO_SOURCES: Record<string, string> = {
  'track-bui-phan': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'track-ky-uc': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
};

export const MediaSection: React.FC = () => {
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleTrackPlay = (trackId: string) => {
    const audioEl = audioRefs.current[trackId];
    if (!audioEl) return;

    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }

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

  return (
    <section id="goc-am-nhac" className="py-16 md:py-24 border-b border-[#D5CBB8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tiêu đề chuyên mục 04 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#D5CBB8]">
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-500 font-medium">
              Chuyên mục 04 · Góc Âm Nhạc &amp; Phim Tư Liệu Kỷ Niệm
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-semibold text-stone-900 tracking-tight">
              Thanh Âm Mái Trường &amp; Thước Phim Tri Ân
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-md font-prose italic">
            Lắng nghe những giai điệu gắn liền với bảng đen phấn trắng và cùng nhìn lại khoảnh khắc rạng rỡ của tập thể lớp 12 Anh 2 trên sân khấu Lễ kỷ niệm tại Trường THPT Chuyên Thái Bình.
          </p>
        </div>

        {/* Khối 2 cột: Cột trái Giai điệu tri ân - Cột phải Góc phim tư liệu */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cột 1 (5/12): Tuyển Tập Giai Điệu Tri Ân */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between border-b border-[#D5CBB8] pb-3">
              <div className="flex items-center gap-2 text-stone-900 font-serif font-semibold text-lg">
                <Music className="w-4 h-4 text-[#8B1E24]" />
                <span>Tuyển Tập Giai Điệu Tri Ân</span>
              </div>
              <span className="text-xs text-stone-500 font-prose italic">02 Bản hòa tấu</span>
            </div>

            {AUDIO_TRACKS_DATA.map((track) => {
              const isPlaying = activeAudioId === track.id;
              return (
                <article
                  key={track.id}
                  className="p-6 bg-[#F3ECE0] border border-[#D5CBB8] rounded-sm transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs text-stone-500 font-sans">
                        <span>Bản nhạc {track.number}</span>
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
                      className="w-10 h-10 rounded-full bg-[#8B1E24] text-white flex items-center justify-center hover:bg-[#6e151a] transition-colors shrink-0 cursor-pointer"
                      aria-label={isPlaying ? `Tạm dừng ${track.title}` : `Phát ${track.title}`}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>
                  </div>

                  {/* Lời giới thiệu ngắn cho tác phẩm */}
                  <p className="mt-3 text-sm text-stone-700 font-prose leading-relaxed">
                    {track.description}
                  </p>

                  {/* Trình phát âm thanh */}
                  <div className="mt-4 pt-3 border-t border-[#D5CBB8]/70">
                    <audio
                      ref={(el) => {
                        audioRefs.current[track.id] = el;
                      }}
                      controls
                      preload="none"
                      src={AUDIO_SOURCES[track.id]}
                      onPlay={() => {
                        if (videoRef.current && !videoRef.current.paused) {
                          videoRef.current.pause();
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
                      className="w-full h-9 accent-[#8B1E24]"
                    >
                      Trình duyệt của bạn không hỗ trợ phát âm thanh.
                    </audio>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Cột 2 (7/12): Góc Phim Tư Liệu: Những Chuyến Đò Thầm Lặng */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between border-b border-[#D5CBB8] pb-3 mb-6">
              <div className="flex items-center gap-2 text-stone-900 font-serif font-semibold text-lg">
                <Film className="w-4 h-4 text-[#8B1E24]" />
                <span>Góc Phim Tư Liệu: Những Chuyến Đò Thầm Lặng</span>
              </div>
              <span className="text-xs text-stone-500 font-prose italic">
                Kỷ niệm Lớp 12 Anh 2 · THPT Chuyên Thái Bình
              </span>
            </div>

            <div className="bg-[#F3ECE0] border border-[#D5CBB8] rounded-sm overflow-hidden">
              <div className="aspect-video bg-stone-950 overflow-hidden">
                <video
                  ref={videoRef}
                  controls
                  playsInline
                  poster={HERO_IMAGE_PATH}
                  src={SCHOOL_VIDEO_PATH}
                  onPlay={() => {
                    Object.values(audioRefs.current).forEach((el) => {
                      if (el && !el.paused) el.pause();
                    });
                    setActiveAudioId(null);
                  }}
                  className="w-full h-full object-cover"
                >
                  Trình duyệt của bạn không hỗ trợ phát video.
                </video>
              </div>

              <div className="p-4 sm:p-5 bg-[#EAE1D0] border-t border-[#D5CBB8]">
                <div className="text-sm text-stone-700 font-prose leading-relaxed">
                  <strong className="font-sans font-semibold text-stone-900">Lời giới thiệu thước phim: </strong>
                  Thước phim tư liệu ghi lại khoảnh khắc rạng rỡ, tràn đầy sức trẻ và tình cảm gắn bó của tập thể <strong>Lớp 12 Anh 2</strong> trên sân khấu Lễ kỷ niệm tại <strong>Trường THPT Chuyên Thái Bình</strong>, do bạn <strong>Trần Hoàng Bách</strong>, <strong>Vũ Đức Dương</strong> và <strong>Nguyễn Minh Đức</strong> (Nhóm 1) biên tập.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
