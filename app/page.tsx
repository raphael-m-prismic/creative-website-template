import type { Metadata } from "next";
import Link from "next/link";

type Experience = {
	name: string;
	href: string;
	description: string;
};

const EXPERIENCES: Experience[] = [
	{
		name: "Experience template",
		href: "/experience-template",
		description:
			"The reference wiring: a cube driven by Prismic. Duplicate this folder to start a new experience.",
	},
	{
		name: "Locker experience",
		href: "/locker-experience",
		description:
			"The real one: a GLB locker, textured planes on shelves, hover outline, pointer-driven camera.",
	},
];

export const metadata: Metadata = {
	title: "Creative experiences with Prismic",
	description:
		"A proof of concept: several distinct 3D experiences in one project, each with its own Prismic page type.",
};

export default function Home() {
	return (
		<div className="flex flex-1 justify-center bg-white px-6 py-20 sm:px-10 sm:py-32">
			<main className="w-full max-w-xl">
				<h1 className="text-2xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-3xl">
					Creative experiences with Prismic
				</h1>

				<p className="mt-6 text-sm leading-relaxed text-neutral-600">
					A proof of concept showing that several distinct 3D experiences can
					live in one project, each with its own Prismic page type, each
					editable by a marketer. Inspired by Elle&rsquo;s Locker.
				</p>

				<ul className="mt-16 border-t border-neutral-200">
					{EXPERIENCES.map((experience) => (
						<li key={experience.href} className="border-b border-neutral-200">
							<Link
								href={experience.href}
								className="block py-6 transition-colors hover:bg-neutral-50"
							>
								<span className="text-base font-medium text-neutral-900">
									{experience.name}
								</span>
								<span className="mt-1 block font-mono text-xs text-neutral-400">
									{experience.href}
								</span>
								<span className="mt-3 block text-sm leading-relaxed text-neutral-600">
									{experience.description}
								</span>
							</Link>
						</li>
					))}
				</ul>

				<div className="mt-16 space-y-3 text-sm leading-relaxed text-neutral-500">
					<p>
						Add{" "}
						<code className="font-mono text-neutral-700">?debug</code> to either
						route for a leva panel and OrbitControls, to place objects and read
						back their values.
					</p>
					<p>
						The architecture is documented in the{" "}
						<a
							href="https://github.com/raphael-m-prismic/creative-website-template#readme"
							className="text-neutral-700 underline underline-offset-4 transition-colors hover:text-neutral-900"
						>
							README
						</a>
						.
					</p>
				</div>
			</main>
		</div>
	);
}
