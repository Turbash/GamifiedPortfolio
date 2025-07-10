import React, { useState, useRef, useEffect } from 'react';
import TownhallSection from './sections/TownhallSection';
import GoldSection from './sections/GoldSection';
import ElixirSection from './sections/ElixirSection';
import BarracksSection from './sections/BarracksSection';
import CannonSection from './sections/CannonSection';
import ArcherSection from './sections/ArcherSection';
import BuildingSection from './BuildingSection';
import Building from './Building';
import { playSound } from '../utils/sound';
import './VillageDashboard.css'; 
import Intro from './Intro';
import Loading from './Loading';
import MusicSwitch from './MusicSwitch';

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
    title: "Gold Mine",
    description: "Achievements and awards",
    component: GoldSection,
  },
  elixir: {
    title: "Elixir Collector",
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
        <MusicSwitch
          bgMusicSrc={bgMusicSrc}
          setBgMusicSrc={setBgMusicSrc}
          showMusicMenu={showMusicMenu}
          setShowMusicMenu={setShowMusicMenu}
        />
      )}
      {loading && (
        <Loading handleLoadingContinue={handleLoadingContinue} />
      )}
      {!loading && (
        <>
          {introStarted && showIntro && (
            <Intro
              introState={introState}
              handleIntroHide={handleIntroHide}
            />
          )}
          {buildings.map((b) => (
            <Building
              key={b.key}
              img={b.img}
              left={b.x}
              top={b.y}
              width={b.width}
              height={b.height}
              zIndex={selected === b.key ? 20 : 10}
              dragging={draggingKey === b.key}
              onMouseDown={e => handleDragStart(e, b)}
              onTouchStart={e => handleDragStart(e, b)}
              onClick={() => handleBuildingClick(b)}
              onMouseEnter={() => setHovered(b.key)}
              onMouseLeave={() => setHovered(null)}
              onTouchEnd={() => setHovered(null)}
              showTooltip={hovered === b.key && !selected && !showIntro}
              tooltipTitle={buildingInfo[b.key].title}
              tooltipDesc={buildingInfo[b.key].description}
              tooltipLeft={`calc(${b.x} + ${b.width / 2}px)`}
              tooltipTop={`calc(${b.y} - 10px)`}
            />
          ))}
          {!showIntro && selected && (
            <BuildingSection
              title={buildingInfo[selected].title}
              onClose={() => setSelected(null)}
            >
              {SelectedComponent && <SelectedComponent />}
            </BuildingSection>
          )}
        </>
      )}
    </div>
  );
}