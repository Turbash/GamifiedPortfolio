let soundCooldown = false;
let soundTimeout = null;

export function playSound(srcs) {
  if (soundCooldown) return;
  soundCooldown = true;
  clearTimeout(soundTimeout);
  soundTimeout = setTimeout(() => {
    soundCooldown = false;
  }, 500);

  const sources = Array.isArray(srcs) ? srcs : [srcs];
  let audio;
  for (let src of sources) {
    audio = new window.Audio(src);
    const ext = src.split('.').pop();
    if (
      (ext === 'mp3' && audio.canPlayType('audio/mpeg')) ||
      (ext === 'wav' && audio.canPlayType('audio/wav')) ||
      (ext === 'ogg' && audio.canPlayType('audio/ogg')) ||
      (ext === 'caf' && audio.canPlayType('audio/x-caf'))
    ) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
      break;
    }
  }
}
