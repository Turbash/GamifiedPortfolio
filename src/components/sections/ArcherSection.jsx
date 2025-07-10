import React from "react";

const contacts = [
	{
		label: "Email",
		value: "turbashnegi@gmail.com",
		icon: "✉️",
		link: "mailto:turbashnegi@gmail.com",
	},
	{
		label: "LinkedIn",
		value: "linkedin.com/in/turbash",
		icon: "💼",
		link: "https://linkedin.com/in/turbash",
	},
	{
		label: "GitHub",
		value: "github.com/turbash",
		icon: "🐙",
		link: "https://github.com/turbash",
	},
	{
		label: "Twitter",
		value: "twitter.com/turbashcodes",
		icon: "🐦",
		link: "https://twitter.com/turbashcodes",
	},
	{
		label: "Website",
		value: "turbash.vercel.app",
		icon: "🌐",
		link: "https://turbash.vercel.app",
	},
	{
		label: "Discord",
		value: "turbash#1291336227005403156",
		icon: "🎮",
		link: null,
	},
];

export default function ArcherSection() {
	return (
		<div>
			<h2 className="text-xl font-bold mb-4 flex items-center gap-2">
				🏹 Contact & Socials
			</h2>
			<ul className="space-y-3">
				{contacts.map((c, i) => (
					<li
						key={i}
						className="flex items-center gap-3 bg-green-50 border-l-4 border-green-400 rounded px-4 py-2 shadow-sm"
					>
						<span className="text-xl">{c.icon}</span>
						{c.link ? (
							<a
								href={c.link}
								target="_blank"
								rel="noopener noreferrer"
								className="text-green-800 font-semibold hover:underline"
							>
								{c.label}:{" "}
								<span className="font-normal">{c.value}</span>
							</a>
						) : (
							<span className="text-green-800 font-semibold">
								{c.label}:{" "}
								<span className="font-normal">{c.value}</span>
							</span>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}
