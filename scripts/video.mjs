// Builds the silent hero loop from the resort film (../media/uploads/2021/04/TheVijayranPalaceJaipurnew.mp4).
// Only clean cinematic shots are used (no burned-in captions, cars or posed models).
// Run: node scripts/video.mjs
import { execFileSync } from 'node:child_process'
import ffmpeg from 'ffmpeg-static'

const SRC = '../media/uploads/2021/04/TheVijayranPalaceJaipurnew.mp4'
const CUTS = [[6.1, 8.9], [71.6, 74.8], [36.3, 40.9], [80.0, 81.8], [82.0, 83.9]] // [start, end] seconds
const W = 1600, H = 900

const total = CUTS.reduce((t, [s, e]) => t + (e - s), 0)
const graphFor = (W, H) => `${CUTS.map(([s, e], i) =>
  `[0:v]trim=${s}:${e},setpts=PTS-STARTPTS,scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},fps=25[v${i}]`).join(';')};${CUTS.map((_, i) => `[v${i}]`).join('')}concat=n=${CUTS.length}:v=1:a=0,` +
  `eq=saturation=1.06:contrast=1.03,fade=t=in:st=0:d=0.8,fade=t=out:st=${(total - 0.8).toFixed(2)}:d=0.8[out]`

const run = args => execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' })
run(['-i', SRC, '-filter_complex', graphFor(W, H), '-map', '[out]', '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '29',
  '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', 'public/video/hero.mp4'])
run(['-i', SRC, '-filter_complex', graphFor(960, 540), '-map', '[out]', '-an',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '28', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', 'public/video/hero-sm.mp4'])
run(['-ss', String(CUTS[0][0] + 0.6), '-i', SRC, '-frames:v', '1', '-vf', `scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H}`, '-q:v', '4', 'public/video/hero-poster.jpg'])
// Full film for the "Watch the film" lightbox (with sound, opt-in only)
run(['-i', SRC, '-vf', 'scale=1280:720', '-c:v', 'libx264', '-preset', 'slow', '-crf', '30', '-pix_fmt', 'yuv420p',
  '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', 'public/video/film.mp4'])
console.log(`hero loop: ${total.toFixed(1)}s`)
