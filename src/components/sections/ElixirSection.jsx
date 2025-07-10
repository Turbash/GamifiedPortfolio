import React from "react";

const skills = [
	{
		category: "Frontend",
		icon: "🎨",
		items: ["React", "Next.js", "Tailwind CSS", "HTML", "CSS", "JavaScript"],
	},
	{
		category: "Backend",
		icon: "🛠️",
		items: ["Node.js", "Express.js", "MongoDB", "FastAPI"],
	},
	{
		category: "Languages",
		icon: "💻",
		items: ["JavaScript", "Python", "Java","C++", "Kotlin"],
	},
	{
		category: "AI/ML",
		icon: "🤖",
		items: ["LangChain", "Hugging Face", "OpenAI API"],
	},
	{
		category: "Other Tools",
		icon: "🧰",
		items: ["Git", "Postman", "Vercel", "Framer Motion"],
	},
	{
		category: "Soft Skills",
		icon: "🗣️",
		items: ["Communication", "Problem Solving", "Collaboration"],
	},
];

export default function ElixirSection() {
	return (
		<div>
			<h2 className="text-xl font-bold mb-4 flex items-center gap-2">
				🧪 Skills & Tech
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{skills.map((s, i) => (
					<div
						key={i}
						className="bg-purple-50 border-l-4 border-purple-400 rounded px-4 py-3 shadow-sm flex flex-col gap-1"
					>
						<div className="font-semibold text-purple-900 flex items-center gap-2">
							<span className="text-lg">{s.icon}</span> {s.category}
						</div>
						<div className="flex flex-wrap gap-2 mt-1">
							{s.items.map((item, j) => (
								<span
									key={j}
									className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-sm"
								>
									{item}
								</span>
							))}
						</div>
					</div>
				))}
			</div>
			<div className="mt-4 text-sm text-gray-600">
				<span className="font-semibold">Proficiency:</span> Most skills are
				Intermediate to Advanced.
			</div>
		</div>
	);
}
