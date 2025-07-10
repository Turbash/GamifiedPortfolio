import React from "react";

export default function Loading({ handleLoadingContinue }) {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-end justify-end bg-black pointer-events-auto">
      <video
        src="/coc_loading.webm"
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        className="fixed inset-0 w-full max-h-full z-0"
        style={{ objectFit: 'cover' }}
        onLoadedData={e => {
          e.target.play().catch(() => {});
        }}
      />
      <div className="relative w-full flex justify-center z-10 pb-12">
        <button
          className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white text-xl font-bold rounded-lg shadow-lg border-2 border-yellow-700 pointer-events-auto"
          onClick={handleLoadingContinue}
        >
          Click to Continue
        </button>
      </div>
    </div>
  );
}
