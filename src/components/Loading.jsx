import React, { useState } from "react";

export default function Loading({ handleLoadingContinue }) {
  const [showVideo, setShowVideo] = useState(false);

  const handleVideoEnd = () => {
    handleLoadingContinue();
  };

  const handleStartVideo = () => {
    setShowVideo(true);
    setTimeout(() => {
      const video = document.getElementById("coc-loading-video");
      if (video) {
        video.muted = false;
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black pointer-events-auto">
      {!showVideo ? (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <img
            src="/clash_logo.png"
            alt="Clash of Clans Logo"
            className="w-96 h-auto mb-12"
            style={{ maxWidth: "80vw" }}
          />
          <button
            className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white text-xl font-bold rounded-lg shadow-lg border-2 border-yellow-700 pointer-events-auto"
            onClick={handleStartVideo}
          >
            Click to Continue
          </button>
        </div>
      ) : (
        <>
          <video
            id="coc-loading-video"
            src="/coc_loading.webm"
            autoPlay
            muted
            playsInline
            controls={false}
            className="fixed inset-0 w-full h-full z-0 object-contain"
            style={{ objectFit: 'contain', background: 'black' }}
            onLoadedData={e => {
              e.target.muted = false;
              e.target.play().catch(() => {});
            }}
            onEnded={handleVideoEnd}
          />
        </>
      )}
    </div>
  );
}
