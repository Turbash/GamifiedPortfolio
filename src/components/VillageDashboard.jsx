import React, { useState } from 'react';

const buildings = [
  { key: 'townhall', x: '48%', y: '37%', img: '/buildings/townhall.webp', width: 80, height: 80 },
  { key: 'gold', x: '60%', y: '40%', img: '/buildings/gold.webp', width: 80, height: 80 },
  { key: 'elixir', x: '40%', y: '60%', img: '/buildings/elixir.png', width: 80, height: 80 },
  { key: 'barracks', x: '55%', y: '70%', img: '/buildings/barracks.png', width: 80, height: 80 },
  { key: 'cannon', x: '38%', y: '48%', img: '/buildings/cannon.webp', width: 80, height: 80 },
  { key: 'archer', x: '65%', y: '60%', img: '/buildings/archer.webp', width: 80, height: 80 },
]

export default function VillageDashboard() {
  return (
    <div
      className="absolute top-0 left-0 w-screen h-screen pointer-events-none"
    >
      {buildings.map((b) => (
        <img
          key={b.key}
          src={b.img}
          alt=""
          className="absolute select-none pointer-events-auto"
          style={{
            left: b.x,
            top: b.y,
            width: b.width,
            height: b.height,
          }}
        />
      ))}
    </div>
  )
}
