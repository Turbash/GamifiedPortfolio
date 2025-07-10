import React from "react";

export default function Intro({ introState, handleIntroHide }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-end pointer-events-auto bg-black/30 font-youblockhead"
      onClick={handleIntroHide}
    >
      <div className="relative flex items-end h-[40vh] w-full">
        <img
          src="/villager.webp"
          alt="Villager"
          className={`absolute bottom-[28%] left-[5%] 
            h-36 w-auto sm:h-52 md:h-60 lg:h-70
            transition-transform duration-700 ease-in-out
            ${introState === 'visible' ? 'villager-in' : 'villager-out-left'}`}
        />
        <div
          className={`absolute left-[28%] bottom-[32%] 
            bg-white border-2 border-gray-300 rounded-xl shadow-lg 
            px-3 py-3 sm:px-6 sm:py-4 max-w-[90vw] sm:max-w-md 
            text-sm sm:text-base md:text-lg font-medium text-gray-800
            transition-transform duration-700 ease-in-out
            ${introState === 'visible' ? 'bubble-in' : 'bubble-out-left'}`}
        >
          <span>
            Hello Chief!<br />
            Welcome to <span className="font-bold">Turbash Negi&apos;s</span> interactive portfolio village.<br />
            Click on any building to explore my skills, projects, and achievements.<br />
            (Tip: You can move the buildings around!)<br />
            <span className="block mt-2 text-xs text-blue-700 font-semibold">
              For the best nostalgic experience, use headphones or increase your volume!
            </span>
          </span>
          <div className="text-xs text-gray-500 mt-2">(Tap anywhere to continue)</div>
        </div>
      </div>
    </div>
  );
}
