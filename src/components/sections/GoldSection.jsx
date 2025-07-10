import React from 'react';

const achievements = [
  {
    title: "National Space Hackathon Finalist – IIT Delhi & ISRO",
    desc: "Top 10 finalist team in a national-level hackathon organized by IIT Delhi in collaboration with ISRO.",
    icon: "🚀",
  },
  {
    title: "Second Prize – Electro Battle, Volt Club, SOE JNU",
    desc: "Secured 2nd place in Electro Battle, a competitive event organized by Volt Club, School of Engineering, JNU.",
    icon: "⚡️",
  },
  {
    title: "First Prize – Doon School Chess Tournament",
    desc: "Won first prize in the inter-school team event at The Doon School Chess Tournament.",
    icon: "♟️",
  },
  {
    title: "Individual & Team First Prize – Woodstock School Chess Competition",
    desc: "Won both individual and team first prizes at the Woodstock School Chess Competition.",
    icon: "🏅",
  },
];

export default function GoldSection() {

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">🥇 Achievements</h2>
      <ul className="space-y-4">
        {achievements.map((a, i) => (
          <li key={i} className="flex items-start gap-3 bg-yellow-50 border-l-4 border-yellow-400 rounded px-4 py-3 shadow-sm">
            <span className="text-2xl">{a.icon}</span>
            <div>
              <div className="font-semibold text-yellow-900">{a.title}</div>
              {a.desc && <div className="text-yellow-800 text-sm">{a.desc}</div>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}