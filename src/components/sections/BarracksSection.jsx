import React from "react";

const projects = [
	{
		name: "UFC Fight Predictor 2.0",
		desc: "Next.js + AI-powered fight prediction app",
		tech: ["Next.js", "Python", "Streamlit", "Hugging Face"],
		github: "https://github.com/turbash/UFC-Fight-Predictor",
		features: ["Predicts fight winner & method", "AI explanation", "Charts"],
	},
	{
		name: "Packing List AI App (WIP)",
		desc: "Smart app that generates travel packing lists with AI",
		tech: ["React", "Zustand", "LangChain"],
		features: [
			"Destination-aware suggestions",
			"Weather integration",
			"Item categories",
		],
	},
	{
		name: "Realtime Chat App",
		desc: "Full-stack web chat with real-time messaging",
		tech: ["React", "Node.js", "Firebase", "Tailwind CSS"],
		features: [],
	},
	{
		name: "Blog Website + CMS",
		desc: "Lightweight blog using Markdown",
		tech: ["Next.js", "Tailwind CSS", "Zustand"],
		features: [],
	},
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
			<div className="mt-4 text-sm text-gray-600">
				<span className="font-semibold">Internships:</span> Not listed yet, but
				available on resume.
			</div>
		</div>
	);
}
