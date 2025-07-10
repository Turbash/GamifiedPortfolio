import React from "react";

const projects = [
    {
        name: "HolidayPlanner2.0",
        desc: "Smart holiday planner blending JavaScript and Python for itinerary optimization.",
        tech: ["JavaScript", "Python", "Hugging Face"],
        github: "https://github.com/Turbash/HolidayPlanner2.0",
        features: [
            "Itinerary suggestions",
            "Weather integration",
			"Suggested restaurants and Hotels",
            "Interactive frontend"
        ],
    },
    {
        name: "TubeFetch",
        desc: "Python tool to fetch and process YouTube data.",
        tech: ["Python","Discord.py"],
        github: "https://github.com/Turbash/TubeFetch",
        features: [
            "YouTube API integration",
            "Data extraction"
        ],
    },
    {
        name: "Metro Route Optimizer",
        desc: "C++ application to optimize metro routes for efficient travel.",
        tech: ["C++", "QT"],
        github: "https://github.com/Turbash/Metro-Route-Optimizer",
        features: [
            "Route optimization",
            "Graph algorithms",
            "User-friendly interface"
        ],
    },
    {
        name: "ContactSaver",
        desc: "Automatic contact saving Android application.",
        tech: ["Kotlin"],
        github: "https://github.com/Turbash/ContactSaver",
        features: [
            "Automated contact management",
            "Android app"
        ],
    },
    {
        name: "Paste-App",
        desc: "Sample paste text editor for quick text sharing and editing.",
        tech: ["JavaScript", "CSS", "HTML"],
        github: "https://github.com/Turbash/Paste-App",
        features: [
            "Paste and edit text",
            "Lightweight UI"
        ],
    }
];

export default function BarracksSection() {
	return (
		<div>
			<h2 className="text-xl font-bold mb-4 flex items-center gap-2">
				🏗️ Projects & Work
			</h2>
			<div className="flex flex-col gap-4">
				{projects.map((p, i) => (
					<div
						key={i}
						className="bg-blue-50 border-l-4 border-blue-400 rounded px-4 py-3 shadow-sm"
					>
						<div className="flex flex-wrap items-center gap-2 mb-1">
							<span className="font-semibold text-blue-900">{p.name}</span>
							{p.github && (
								<a
									href={p.github}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 underline text-sm"
								>
									GitHub
								</a>
							)}
						</div>
						<div className="text-blue-800 text-sm mb-1">{p.desc}</div>
						<div className="flex flex-wrap gap-2 mb-1">
							{p.tech.map((t, j) => (
								<span
									key={j}
									className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs"
								>
									{t}
								</span>
							))}
						</div>
						{p.features.length > 0 && (
							<ul className="list-disc ml-6 text-xs text-blue-700">
								{p.features.map((f, k) => (
									<li key={k}>{f}</li>
								))}
							</ul>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
