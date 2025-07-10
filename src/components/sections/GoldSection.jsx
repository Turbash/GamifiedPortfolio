import React, { useState } from 'react';

function CoCModal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white border-4 border-gray-400 rounded-xl min-w-[400px] max-w-lg shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between bg-gray-100 border-b-2 border-gray-400 px-5 py-4">
          <span className="font-bold text-xl">{title}</span>
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xl rounded-full w-8 h-8 flex items-center justify-center"
            aria-label="Close"
          >×</button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

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
  const [modalOpen, setModalOpen] = useState(false);

  const projects = [
    {
      name: "Portfolio Website",
      description: "A personal portfolio built with React and gamified UI.",
      github: "https://github.com/yourusername/portfolio",
      demo: "https://yourportfolio.com"
    },
    {
      name: "Hackathon Winner",
      description: "Won 1st place at XYZ Hackathon for innovative project.",
      github: "https://github.com/yourusername/hackathon-project",
      demo: "https://hackathon-demo.com"
    }
  ];

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
      <button
        className="mt-4 px-6 py-3 bg-gray-100 border-2 border-gray-400 rounded-lg cursor-pointer font-semibold hover:bg-gray-200 transition"
        onClick={() => setModalOpen(true)}
      >
        View Building Details
      </button>
      <CoCModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Building Details"
      >
        <div className="text-lg mb-6">
          Welcome to my achievements and projects! Explore my work and connect with me.
        </div>
        <div>
          {projects.map((proj, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
              <div className="font-bold text-base">{proj.name}</div>
              <div className="my-2 text-sm">{proj.description}</div>
              <a
                href={proj.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mr-4 text-blue-700 hover:underline"
              >GitHub</a>
              <a
                href={proj.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 hover:underline"
              >Demo</a>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-4 text-gray-700 hover:underline"
          >GitHub</a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-4 text-gray-700 hover:underline"
          >Twitter</a>
          <a
            href="mailto:your@email.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:underline"
          >Email</a>
        </div>
      </CoCModal>
    </div>
  );
}