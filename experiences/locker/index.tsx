"use client";

import type { Content } from "@prismicio/client";

import { useSceneReady } from "../_shared/useSceneReady";
import { DebugPanel } from "../_shared/DebugPanel";
import { LoadingScreen } from "./LoadingScreen";
import { Overlay } from "./Overlay";
import { Scene } from "./Scene";
import type { LockerItem } from "./resolveItems";

type Props = {
	items: LockerItem[];
	content: Content.LockerExperienceDocument["data"];
};

export default function LockerExperienceView({ items, content }: Props) {
	const { ready, onReady } = useSceneReady();

	return (
		<div className="relative h-dvh w-full bg-white">
			<Scene items={items} onReady={onReady} />
			<Overlay content={content} />
			<LoadingScreen text={content.loading_text} ready={ready} />
			<DebugPanel />
		</div>
	);
}
