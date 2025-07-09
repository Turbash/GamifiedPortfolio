import React from "react";

export default function TownhallSection() {
  return (
    <div className="flex flex-col items-center gap-4">
      <img
        src="/assets/me.png"
        alt="Turbash Negi"
        className="w-24 h-24 rounded-full border-4 border-gray-400 shadow-lg mb-2"
      />
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        🏰 Turbash Negi
      </h2>
      <div className="text-lg text-gray-700 font-semibold text-center">
        Full Stack Developer ⚔️ | AI Enthusiast | Builder of Fun UIs
      </div>
      <p className="text-gray-600 text-center max-w-xl">
        I'm a developer who loves blending storytelling, interactivity, and AI to
        craft powerful user experiences. Currently focused on building
        full-stack apps with React, Next.js, and LangChain.
      </p>
      <div className="bg-gray-100 border-l-4 border-gray-400 px-4 py-2 rounded shadow max-w-lg">
        <span className="font-semibold text-gray-700">Mission:</span> Build with
        creativity, solve real problems, and make tech more fun and useful for
        everyone.
      </div>
    </div>
  );
}
