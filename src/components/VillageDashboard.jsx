import React, { useState, useRef } from 'react';
import TownhallSection from './sections/TownhallSection';
import GoldSection from './sections/GoldSection';
import ElixirSection from './sections/ElixirSection';
import BarracksSection from './sections/BarracksSection';
import CannonSection from './sections/CannonSection';
import ArcherSection from './sections/ArcherSection';
import './VillageDashboard.css'; 

const initialBuildings = [
  { key: 'townhall', x: '48%', y: '37%', img: '/buildings/townhall.webp', width: 90, height: 90 },
  { key: 'gold', x: '55%', y: '35%', img: '/buildings/gold.webp', width: 60, height: 60 },
  { key: 'elixir', x: '45%', y: '50%', img: '/buildings/elixir.png', width: 60, height: 60 },
  { key: 'barracks', x: '48%', y: '23%', img: '/buildings/barracks.png', width: 90, height: 90 },
  { key: 'cannon', x: '42%', y: '35%', img: '/buildings/cannon.webp', width: 70, height: 70 },
  { key: 'archer', x: '55%', y: '45%', img: '/buildings/archer.webp', width: 70, height: 70 },
];

const buildingInfo = {
  townhall: {
    title: "Townhall",
    description: "Central hub of my portfolio",
    component: TownhallSection,
  },
  gold: {
    title: "Gold Storage",
    description: "Achievements and awards",
    component: GoldSection,
  },
  elixir: {
    title: "Elixir Storage",
    description: "Skills and technologies",
    component: ElixirSection,
  },
  barracks: {
    title: "Barracks",
    description: "Projects and work experience",
    component: BarracksSection,
  },
  cannon: {
    title: "Cannon",
    description: "Problem-solving and coding challenges",
    component: CannonSection,
  },
  archer: {
    title: "Archer Tower",
    description: "Contact info and social links",
    component: ArcherSection,
  },
};

export default function VillageDashboard() {
  const [selected, setSelected] = useState(null);
  const [buildings, setBuildings] = useState(initialBuildings);
  const [showIntro, setShowIntro] = useState(true);
  const [draggingKey, setDraggingKey] = useState(null);
  const [introState, setIntroState] = useState('visible'); // 'visible' | 'hiding' | 'hidden'
  const [hovered, setHovered] = useState(null);
  const dragInfo = useRef({ key: null, offsetX: 0, offsetY: 0, isDragging: false });

  const percentToPx = (percent, total) => (parseFloat(percent) / 100) * total;
  const pxToPercent = (px, total) => `${(px / total) * 100}%`;

  const handleDragStart = (e, b) => {
    e.preventDefault();
    e.stopPropagation();
    dragInfo.current.key = b.key;
    dragInfo.current.isDragging = false;
    setDraggingKey(b.key);
    const parentRect = e.target.parentNode.getBoundingClientRect();
    const mouseX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const mouseY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    const leftPx = b.x.endsWith('%') ? percentToPx(b.x, parentRect.width) : b.x;
    const topPx = b.y.endsWith('%') ? percentToPx(b.y, parentRect.height) : b.y;
    dragInfo.current.offsetX = mouseX - (parentRect.left + leftPx);
    dragInfo.current.offsetY = mouseY - (parentRect.top + topPx);

    window.addEventListener('mousemove', handleDrag);
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchmove', handleDrag, { passive: false });
    window.addEventListener('touchend', handleDragEnd);
  };

  const handleDrag = (e) => {
    if (!dragInfo.current.key) return;
    dragInfo.current.isDragging = true;
    e.preventDefault();
    const parent = document.querySelector('.village-dashboard-root');
    const parentRect = parent.getBoundingClientRect();
    const mouseX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const mouseY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
    let newX = mouseX - parentRect.left - dragInfo.current.offsetX;
    let newY = mouseY - parentRect.top - dragInfo.current.offsetY;
    newX = Math.max(0, Math.min(newX, parentRect.width - 80));
    newY = Math.max(0, Math.min(newY, parentRect.height - 80));
    setBuildings((prev) =>
      prev.map((b) =>
        b.key === dragInfo.current.key
          ? {
              ...b,
              x: pxToPercent(newX, parentRect.width),
              y: pxToPercent(newY, parentRect.height),
            }
          : b
      )
    );
  };

  const handleDragEnd = () => {
    dragInfo.current.key = null;
    setTimeout(() => { dragInfo.current.isDragging = false; }, 0);
    setDraggingKey(null);
    window.removeEventListener('mousemove', handleDrag);
    window.removeEventListener('mouseup', handleDragEnd);
    window.removeEventListener('touchmove', handleDrag);
    window.removeEventListener('touchend', handleDragEnd);
  };

  const handleBuildingClick = (b) => {
    if (!dragInfo.current.isDragging) {
      setSelected(b.key);
    }
  };

  const handleIntroHide = () => {
    if (introState === 'visible') {
      setIntroState('hiding');
      setTimeout(() => setShowIntro(false), 700); // match animation duration
    }
  };

  const SelectedComponent = selected ? buildingInfo[selected].component : null;

  return (
    <div className="absolute top-0 left-0 w-screen h-screen pointer-events-none village-dashboard-root font-youblockhead">
      {showIntro && (
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
      )}
      {buildings.map((b) => (
        <React.Fragment key={b.key}>
          <img
            src={b.img}
            alt=""
            className={`absolute select-none pointer-events-auto ${
              draggingKey === b.key ? 'cursor-grabbing' : 'cursor-pointer'
            }`}
            style={{
              left: b.x,
              top: b.y,
              width: `${b.width}px`,
              height: `${b.height}px`,
              zIndex: selected === b.key ? 20 : 10,
              touchAction: 'none',
            }}
            onMouseDown={(e) => handleDragStart(e, b)}
            onTouchStart={(e) => handleDragStart(e, b)}
            onClick={() => handleBuildingClick(b)}
            onMouseEnter={() => setHovered(b.key)}
            onMouseLeave={() => setHovered(null)}
            onTouchEnd={() => setHovered(null)}
          />
          {hovered === b.key && !selected && !showIntro && (
            <div
              className="absolute pointer-events-none z-50 min-w-[180px] max-w-[240px] left-0 top-0"
              style={{
                left: `calc(${b.x} + ${b.width / 2}px)`,
                top: `calc(${b.y} - 10px)`,
                transform: 'translate(-50%, -100%)',
              }}
            >
              <div className="bg-yellow-200 border-2 border-yellow-600 rounded-lg shadow-lg px-4 py-2 text-center animate-fade-in">
                <div className="font-bold text-yellow-900 text-lg">{buildingInfo[b.key].title}</div>
                <div className="text-yellow-800 text-sm">{buildingInfo[b.key].description}</div>
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
      {!showIntro && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto bg-black/30 font-youblockhead">
          <div className="bg-white border-4 border-gray-500 rounded-xl min-w-[320px] max-w-[90vw] max-h-[85vh] shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between bg-gray-500 border-b-2 border-gray-500 px-6 py-4">
              <h2 className="text-2xl font-bold text-white">{buildingInfo[selected].title}</h2>
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xl rounded-full w-9 h-9 flex items-center justify-center ml-4"
                onClick={() => setSelected(null)}
                aria-label="Close"
              >×</button>
            </div>
            <div className="p-6 flex-1 overflow-auto">
              {SelectedComponent && <SelectedComponent />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}