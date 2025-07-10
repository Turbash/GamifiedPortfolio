import React from "react";

export default function MusicSwitch({ bgMusicSrc, setBgMusicSrc, showMusicMenu, setShowMusicMenu }) {
  return (
    <div className="fixed top-4 right-4 z-[300] pointer-events-auto">
      <button
        className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-4 py-2 rounded-lg shadow-lg border-2 border-yellow-700"
        onClick={() => setShowMusicMenu((v) => !v)}
      >
        🎵 Music
      </button>
      {showMusicMenu && (
        <div className="mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-3 flex flex-col min-w-[180px]">
          <button
            className={`text-left px-2 py-1 rounded hover:bg-yellow-100 font-semibold ${bgMusicSrc === '/audios/background_music.ogg' ? 'bg-yellow-200' : ''}`}
            onClick={() => {
              setBgMusicSrc('/audios/background_music.ogg');
              setShowMusicMenu(false);
            }}
          >
            Default Music
          </button>
          <button
            className={`text-left px-2 py-1 rounded hover:bg-yellow-100 font-semibold ${bgMusicSrc === '/audios/og_background_music.mp3' ? 'bg-yellow-200' : ''}`}
            onClick={() => {
              setBgMusicSrc('/audios/og_background_music.mp3');
              setShowMusicMenu(false);
            }}
          >
            OG Music
          </button>
        </div>
      )}
    </div>
  );
}
