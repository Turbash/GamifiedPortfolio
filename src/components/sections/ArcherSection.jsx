import React from "react";
import { FaEnvelope, FaLinkedin, FaGithub, FaTwitter, FaGlobe, FaDiscord } from "react-icons/fa";

const contacts = [
	{
		label: "Email",
		value: "turbas91_soe@jnu.ac.in",
		icon: <FaEnvelope className="text-green-700" />,
		link: "mailto:turbas91_soe@jnu.ac.in",
	},
	{
		label: "LinkedIn",
		value: "linkedin.com/in/turbash-negi",
		icon: <FaLinkedin className="text-blue-700" />,
		link: "https://linkedin.com/in/turbash-negi",
	},
	{
		label: "GitHub",
		value: "github.com/Turbash",
		icon: <FaGithub className="text-gray-800" />,
		link: "https://github.com/Turbash",
	},
	{
		label: "Twitter",
		value: "twitter.com/Rawatdeepi27862",
		icon: <FaTwitter className="text-blue-400" />,
		link: "https://twitter.com/Rawatdeepi27862",
	},
	{
		label: "Website",
		value: "portfolio-website-ten-black-33.vercel.app",
		icon: <FaGlobe className="text-green-800" />,
		link: "https://portfolio-website-ten-black-33.vercel.app/",
	},
	{
		label: "Discord",
		value: "discord.com/users/1291336227005403156",
		icon: <FaDiscord className="text-indigo-600" />,
		link: "https://discord.com/users/1291336227005403156",
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
						className="flex items-center gap-3 bg-green-50 border-l-4 border-green-400 rounded px-4 py-2 shadow-sm overflow-x-hidden"
					>
						<span className="text-xl">{c.icon}</span>
						{c.link ? (
							<a
								href={c.link}
								target="_blank"
								rel="noopener noreferrer"
								className="text-green-800 font-semibold hover:underline flex items-center gap-1"
							>
								{c.label}:{" "}
								<span className="font-normal">{c.value}</span>
							</a>
						) : (
							<span className="text-green-800 font-semibold flex items-center gap-1">
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
