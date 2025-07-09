import React from "react";

export default function CannonSection() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        💣 Coding Challenges
      </h2>
      <div className="bg-gray-50 border-l-4 border-gray-400 rounded px-4 py-3 shadow-sm mb-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-800">LeetCode:</span>
          <a
            href="https://leetcode.com/turbash"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            https://leetcode.com/turbash
          </a>
        </div>
        <div className="text-gray-700 text-sm mt-1">
          250+ problems solved
          <br />
          Special focus on algorithms and dynamic programming
        </div>
      </div>
      <div className="mb-2 text-gray-700 text-sm">
        <span className="font-semibold">Other Sites:</span> Practiced on
        Codeforces, HackerRank
      </div>
      <div>
        <div className="font-semibold text-gray-800 mb-1">Notable Problems:</div>
        <ul className="list-disc ml-6 text-gray-700 text-sm space-y-1">
          <li>“Decode Ways II” – DP Hard – Solved in under contest time</li>
          <li>“Alien Dictionary” – Topo Sort – Got 95% ranking</li>
          <li>
            “Shortest Superstring” – Bitmask DP – Deep dive project used in AI
            interview prep
          </li>
        </ul>
      </div>
    </div>
  );
}
