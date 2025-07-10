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
          className={`absolute bottom-[30%] left-[10%] h-70 w-auto transition-transform duration-700 ease-in-out
            ${introState === 'visible' ? 'villager-in' : 'villager-out-left'}`}
        />
        <div
          className={`absolute left-[30%] bottom-[35%] bg-white border-2 border-gray-300 rounded-xl shadow-lg px-6 py-4 max-w-md text-lg font-medium text-gray-800
            transition-transform duration-700 ease-in-out
            ${introState === 'visible' ? 'bubble-in' : 'bubble-out-left'}`}
        >
          <span>
            Hello Chief!<br />
            This is <span className="font-bold">Turbash Negi&apos;s</span> portfolio.<br />
            Click on the buildings to know more about him.<br />
            (Tip: You can move the buildings around!)
          </span>
          <div className="text-xs text-gray-500 mt-2">(Click anywhere to continue)</div>
        </div>
      </div>
    </div>
  );
}
