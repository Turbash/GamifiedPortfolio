import React, { useState, useRef, useEffect } from 'react';
import TownhallSection from './sections/TownhallSection';
import GoldSection from './sections/GoldSection';
import ElixirSection from './sections/ElixirSection';
import BarracksSection from './sections/BarracksSection';
import CannonSection from './sections/CannonSection';
import ArcherSection from './sections/ArcherSection';
import { playSound } from '../utils/sound';
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
  const [introState, setIntroState] = useState('visible'); 
  const [hovered, setHovered] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [bgMusicSrc, setBgMusicSrc] = useState('/audios/background_music.ogg');
  const [showMusicMenu, setShowMusicMenu] = useState(false);
  const [introStarted, setIntroStarted] = useState(false); 
  const dragInfo = useRef({ key: null, offsetX: 0, offsetY: 0, isDragging: false });

  const percentToPx = (percent, total) => (parseFloat(percent) / 100) * total;
  const pxToPercent = (px, total) => `${(px / total) * 100}%`;

  const handleDragStart = (e, b) => {
    e.preventDefault();
    e.stopPropagation();
    dragInfo.current.key = b.key;
    dragInfo.current.isDragging = false;
    setDraggingKey(b.key);
    playSound([
      `/audios/buildings/${b.key}_pickup.mp3`
    ]);
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
    if (dragInfo.current.key) {
      playSound([
        `/audios/buildings/${dragInfo.current.key}_drop.mp3`
      ]);
    }
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
      playSound([
        `/audios/buildings/${b.key}_pickup.mp3`
      ]);
      setSelected(b.key);
    }
  };

  const handleLoadingContinue = () => {
    setHasInteracted(true);
    setLoading(false);
    setIntroStarted(true); 
  };

  const handleIntroHide = () => {
    if (introState === 'visible') {
      setIntroState('hiding');
      setTimeout(() => {
        setShowIntro(false);
        if (bgMusicRef.current) {
          bgMusicRef.current.currentTime = 0;
          bgMusicRef.current.play().catch(() => {});
        }
      }, 700);
    }
  };

  const SelectedComponent = selected ? buildingInfo[selected].component : null;

  const bgMusicRef = useRef(null);
  const tutorialMusicRef = useRef(null);

  useEffect(() => {
    if (!tutorialMusicRef.current) {
      tutorialMusicRef.current = new window.Audio('/audios/tutorial_music.mp3');
      tutorialMusicRef.current.loop = true;
      tutorialMusicRef.current.volume = 0.7;
    }
    if (introStarted && showIntro) {
      tutorialMusicRef.current.currentTime = 0;
      tutorialMusicRef.current.play().catch(() => {});
      bgMusicRef.current && bgMusicRef.current.pause();
    } else {
      tutorialMusicRef.current && tutorialMusicRef.current.pause();
    }
    return () => {
      tutorialMusicRef.current && tutorialMusicRef.current.pause();
    };
  }, [introStarted, showIntro]);

  useEffect(() => {
    if (!bgMusicRef.current) return;
    bgMusicRef.current.pause();
    const wasPlaying = !loading && !showIntro;
    bgMusicRef.current = new window.Audio(bgMusicSrc);
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.5;
    if (wasPlaying) {
      bgMusicRef.current.currentTime = 0;
      bgMusicRef.current.play().catch(() => {});
    }
  }, [bgMusicSrc]);

  useEffect(() => {
    if (!bgMusicRef.current) {
      bgMusicRef.current = new window.Audio(bgMusicSrc);
      bgMusicRef.current.loop = true;
      bgMusicRef.current.volume = 0.5;
    }
    if (!loading && !showIntro) {
      bgMusicRef.current.play().catch(() => {});
    } else {
      bgMusicRef.current && bgMusicRef.current.pause();
    }
  }, [loading, showIntro]);

  return (
    <div className="absolute top-0 left-0 w-screen h-screen pointer-events-none village-dashboard-root font-youblockhead">
      {!loading && (
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
      )}
      {loading && (
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
      )}
      {!loading && (
        <>
          {introStarted && showIntro && (
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
        </>
      )}
    </div>
  );
}