import React from "react";

export default function Building({
  img,
  left,
  top,
  width,
  height,
  zIndex,
  dragging,
  onMouseDown,
  onTouchStart,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onTouchEnd,
  showTooltip,
  tooltipTitle,
  tooltipDesc,
  tooltipLeft,
  tooltipTop,
}) {
  return (
    <>
      <img
        src={img}
        alt=""
        className={`absolute select-none pointer-events-auto ${dragging ? 'cursor-grabbing' : 'cursor-pointer'}`}
        style={{
          left,
          top,
          width: `${width}px`,
          height: `${height}px`,
          zIndex,
          touchAction: 'none',
        }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onTouchEnd={onTouchEnd}
      />
      {showTooltip && (
        <div
          className="absolute pointer-events-none z-50 min-w-[180px] max-w-[240px] left-0 top-0"
          style={{
            left: tooltipLeft,
            top: tooltipTop,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="bg-yellow-200 border-2 border-yellow-600 rounded-lg shadow-lg px-4 py-2 text-center animate-fade-in">
            <div className="font-bold text-yellow-900 text-lg">{tooltipTitle}</div>
            <div className="text-yellow-800 text-sm">{tooltipDesc}</div>
          </div>
        </div>
      )}
    </>
  );
}
