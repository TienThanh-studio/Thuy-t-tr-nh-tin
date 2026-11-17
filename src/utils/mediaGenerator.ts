/**
 * Bộ tạo âm thanh WAV chuẩn PCM 16-bit trực tiếp trên trình duyệt
 * Giúp thẻ <audio controls> phát nhạc mượt mà 100% cả khi mở file offline
 * mà không lo lỗi đường dẫn nhạc bên ngoài bị chặn.
 */

function noteToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

interface NoteEvent {
  midi: number;
  startSec: number;
  durationSec: number;
  velocity: number;
}

// Giai điệu cảm hứng "Bụi Phấn" (nhịp 3/4 dịu dàng, ấm áp)
const BUI_PHAN_NOTES: NoteEvent[] = [
  // Câu 1: Khi thầy viết bảng...
  { midi: 67, startSec: 0.2, durationSec: 0.9, velocity: 0.7 }, // G4
  { midi: 72, startSec: 1.1, durationSec: 0.9, velocity: 0.75 }, // C5
  { midi: 72, startSec: 2.0, durationSec: 0.9, velocity: 0.7 }, // C5
  { midi: 74, startSec: 2.9, durationSec: 1.3, velocity: 0.8 }, // D5
  { midi: 76, startSec: 4.2, durationSec: 0.9, velocity: 0.75 }, // E5
  { midi: 72, startSec: 5.1, durationSec: 1.8, velocity: 0.7 }, // C5

  // Hậu âm bass nhẹ
  { midi: 48, startSec: 0.2, durationSec: 2.7, velocity: 0.45 }, // C3
  { midi: 55, startSec: 1.1, durationSec: 1.8, velocity: 0.35 }, // G3
  { midi: 53, startSec: 2.9, durationSec: 2.2, velocity: 0.45 }, // F3
  { midi: 48, startSec: 5.1, durationSec: 2.0, velocity: 0.45 }, // C3

  // Câu 2: Bụi phấn rơi rơi...
  { midi: 74, startSec: 7.2, durationSec: 0.9, velocity: 0.75 }, // D5
  { midi: 76, startSec: 8.1, durationSec: 0.9, velocity: 0.75 }, // E5
  { midi: 77, startSec: 9.0, durationSec: 1.2, velocity: 0.82 }, // F5
  { midi: 74, startSec: 10.2, durationSec: 0.9, velocity: 0.7 }, // D5
  { midi: 71, startSec: 11.1, durationSec: 0.9, velocity: 0.7 }, // B4
  { midi: 67, startSec: 12.0, durationSec: 1.9, velocity: 0.68 }, // G4

  { midi: 50, startSec: 7.2, durationSec: 3.0, velocity: 0.42 }, // D3
  { midi: 43, startSec: 10.2, durationSec: 3.6, velocity: 0.45 }, // G2

  // Câu 3: Có hạt bụi nào...
  { midi: 67, startSec: 14.2, durationSec: 0.9, velocity: 0.72 }, // G4
  { midi: 76, startSec: 15.1, durationSec: 0.9, velocity: 0.78 }, // E5
  { midi: 76, startSec: 16.0, durationSec: 0.9, velocity: 0.75 }, // E5
  { midi: 79, startSec: 16.9, durationSec: 1.4, velocity: 0.85 }, // G5
  { midi: 77, startSec: 18.3, durationSec: 0.9, velocity: 0.78 }, // F5
  { midi: 74, startSec: 19.2, durationSec: 1.8, velocity: 0.72 }, // D5

  { midi: 48, startSec: 14.2, durationSec: 2.7, velocity: 0.45 }, // C3
  { midi: 52, startSec: 16.9, durationSec: 2.3, velocity: 0.42 }, // E3
  { midi: 50, startSec: 19.2, durationSec: 2.0, velocity: 0.45 }, // D3

  // Câu 4: Rơi trên bục giảng... Rơi trên tóc thầy...
  { midi: 71, startSec: 21.3, durationSec: 0.9, velocity: 0.72 }, // B4
  { midi: 74, startSec: 22.2, durationSec: 0.9, velocity: 0.75 }, // D5
  { midi: 79, startSec: 23.1, durationSec: 1.2, velocity: 0.82 }, // G5
  { midi: 76, startSec: 24.3, durationSec: 1.0, velocity: 0.78 }, // E5
  { midi: 74, startSec: 25.3, durationSec: 1.0, velocity: 0.74 }, // D5
  { midi: 72, startSec: 26.3, durationSec: 2.8, velocity: 0.85 }, // C5

  { midi: 43, startSec: 21.3, durationSec: 3.0, velocity: 0.45 }, // G2
  { midi: 48, startSec: 26.3, durationSec: 3.2, velocity: 0.5 }, // C3
  { midi: 60, startSec: 26.5, durationSec: 3.0, velocity: 0.45 }, // C4
  { midi: 64, startSec: 26.7, durationSec: 2.8, velocity: 0.45 }, // E4
];

// Giai điệu "Ký Ức Dưới Mái Trường Xưa" (Harp & Piano êm dịu)
const KY_UC_NOTES: NoteEvent[] = [
  { midi: 69, startSec: 0.2, durationSec: 1.1, velocity: 0.72 }, // A4
  { midi: 72, startSec: 1.2, durationSec: 1.1, velocity: 0.75 }, // C5
  { midi: 76, startSec: 2.2, durationSec: 1.4, velocity: 0.8 }, // E5
  { midi: 74, startSec: 3.6, durationSec: 1.1, velocity: 0.72 }, // D5
  { midi: 72, startSec: 4.7, durationSec: 1.8, velocity: 0.7 }, // C5

  { midi: 45, startSec: 0.2, durationSec: 3.2, velocity: 0.45 }, // A2
  { midi: 52, startSec: 1.2, durationSec: 2.4, velocity: 0.38 }, // E3
  { midi: 48, startSec: 3.6, durationSec: 2.9, velocity: 0.45 }, // C3

  { midi: 71, startSec: 6.7, durationSec: 1.0, velocity: 0.72 }, // B4
  { midi: 74, startSec: 7.7, durationSec: 1.0, velocity: 0.75 }, // D5
  { midi: 79, startSec: 8.7, durationSec: 1.5, velocity: 0.82 }, // G5
  { midi: 76, startSec: 10.2, durationSec: 2.2, velocity: 0.76 }, // E5

  { midi: 43, startSec: 6.7, durationSec: 3.5, velocity: 0.45 }, // G2
  { midi: 48, startSec: 10.2, durationSec: 2.5, velocity: 0.45 }, // C3

  { midi: 77, startSec: 12.8, durationSec: 1.0, velocity: 0.78 }, // F5
  { midi: 76, startSec: 13.8, durationSec: 1.0, velocity: 0.75 }, // E5
  { midi: 72, startSec: 14.8, durationSec: 1.2, velocity: 0.74 }, // C5
  { midi: 69, startSec: 16.0, durationSec: 1.2, velocity: 0.72 }, // A4
  { midi: 71, startSec: 17.2, durationSec: 2.0, velocity: 0.75 }, // B4

  { midi: 41, startSec: 12.8, durationSec: 3.2, velocity: 0.45 }, // F2
  { midi: 40, startSec: 16.0, durationSec: 3.2, velocity: 0.45 }, // E2

  { midi: 69, startSec: 19.5, durationSec: 1.1, velocity: 0.74 }, // A4
  { midi: 72, startSec: 20.6, durationSec: 1.1, velocity: 0.76 }, // C5
  { midi: 76, startSec: 21.7, durationSec: 1.4, velocity: 0.82 }, // E5
  { midi: 71, startSec: 23.1, durationSec: 1.2, velocity: 0.74 }, // B4
  { midi: 69, startSec: 24.3, durationSec: 3.2, velocity: 0.85 }, // A4

  { midi: 45, startSec: 19.5, durationSec: 3.6, velocity: 0.45 }, // A2
  { midi: 45, startSec: 24.3, durationSec: 3.5, velocity: 0.5 }, // A2
  { midi: 57, startSec: 24.5, durationSec: 3.2, velocity: 0.42 }, // A3
  { midi: 64, startSec: 24.7, durationSec: 3.0, velocity: 0.42 }, // E4
];

export function createInstrumentalWavUrl(preset: 'bui_phan' | 'ky_uc_mai_truong'): string {
  const sampleRate = 22050;
  const totalSeconds = preset === 'bui_phan' ? 30 : 28;
  const numSamples = sampleRate * totalSeconds;
  const floatBuffer = new Float32Array(numSamples);

  const notes = preset === 'bui_phan' ? BUI_PHAN_NOTES : KY_UC_NOTES;

  for (const note of notes) {
    const freq = noteToFreq(note.midi);
    const startIdx = Math.floor(note.startSec * sampleRate);
    const durationSamples = Math.floor((note.durationSec + 0.8) * sampleRate);
    const endIdx = Math.min(numSamples, startIdx + durationSamples);

    for (let i = startIdx; i < endIdx; i++) {
      const t = (i - startIdx) / sampleRate;
      // Âm sắc ấm áp kết hợp Piano & Music Box (cơ bản + họa âm bậc 2, 3, 4 tắt dần)
      const attack = Math.min(1, t / 0.018);
      const decay = Math.exp(-t * 1.65);
      const envelope = attack * decay * note.velocity * 0.26;

      const fundamental = Math.sin(2 * Math.PI * freq * t);
      const harmonic2 = 0.35 * Math.sin(2 * Math.PI * freq * 2 * t) * Math.exp(-t * 2.5);
      const harmonic3 = 0.14 * Math.sin(2 * Math.PI * freq * 3 * t) * Math.exp(-t * 4.0);

      floatBuffer[i] += (fundamental + harmonic2 + harmonic3) * envelope;
    }
  }

  // Đóng gói thành định dạng RIFF WAV tiêu chuẩn
  const wavBytes = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(wavBytes);

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + numSamples * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true); // PCM chunk size
  view.setUint16(20, 1, true); // PCM format
  view.setUint16(22, 1, true); // Mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, numSamples * 2, true);

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    const sample = Math.max(-1, Math.min(1, floatBuffer[i]));
    view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
    offset += 2;
  }

  const blob = new Blob([wavBytes], { type: 'audio/wav' });
  return URL.createObjectURL(blob);
}
