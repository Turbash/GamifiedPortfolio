import React from 'react';

const achievements = [
  {
    title: "Winner – COMSOC HackX 2025",
    desc: 'For “IDSentinel,” an identity verification system using deepfake detection + zero-knowledge proofs',
    icon: "🏆",
  },
  {
    title: "Coursera Certificate – Generative AI with LangChain – 2025",
    desc: "",
    icon: "📜",
  },
  {
    title: "Google UX Design Certificate – 2024",
    desc: "",
    icon: "🎨",
  },
  {
    title: "First Place – College Hackathon 2024",
    desc: "For a real-time ML-powered food waste tracker",
    icon: "🥇",
  },
  {
    title: "3rd Year Scholarship Awarded – Academic Excellence – 2023",
    desc: "",
    icon: "🎓",
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