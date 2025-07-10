import React from "react";

export default function BuildingSection({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto bg-black/30 font-youblockhead">
      <div className="bg-white border-4 border-gray-500 rounded-xl min-w-[320px] max-w-[90vw] max-h-[85vh] shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between bg-gray-500 border-b-2 border-gray-500 px-6 py-2">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xl rounded-full w-9 h-9 flex items-center justify-center ml-4"
            onClick={onClose}
            aria-label="Close"
          >×</button>
        </div>
        <div className="p-6 flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
