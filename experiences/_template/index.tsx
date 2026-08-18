"use client";

import type { Content } from "@prismicio/client";

import { useSceneReady } from "../_shared/useSceneReady";
import { LoadingScreen } from "./LoadingScreen";
import { Overlay } from "./Overlay";
import { Scene } from "./Scene";
import type { TemplateExperience } from "./resolveContent";

type Props = {
	experience: TemplateExperience;
	content: Content.ExperienceTemplateDocument["data"];
};

export default function TemplateExperienceView({ experience, content }: Props) {
	const { ready, onReady } = useSceneReady();

	return (
		<div className="relative h-dvh w-full bg-neutral-900">
			<Scene experience={experience} onReady={onReady} />
			<Overlay content={content} />
			{/* Last, so it paints over the overlay while it is up. */}
			<LoadingScreen ready={ready} />
		</div>
	);
}
