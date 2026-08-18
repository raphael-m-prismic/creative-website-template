"use client";

import { useState } from "react";
import type { Content } from "@prismicio/client";

import { DebugPanel } from "./DebugPanel";
import { LoadingScreen } from "./LoadingScreen";
import { Overlay } from "./Overlay";
import { Scene } from "./Scene";
import type { LockerItem } from "./resolveItems";

type Props = {
	items: LockerItem[];
	content: Content.LockerExperienceDocument["data"];
};

export default function LockerExperienceView({ items, content }: Props) {
	/**
	 * The loading screen covers the overlay too, so it has to outlive the assets:
	 * it lifts here because only the Canvas knows when the locker is really on
	 * screen, and LoadingScreen sits outside the Canvas.
	 */
	const [ready, setReady] = useState(false);

	return (
		<div className="relative h-dvh w-full bg-white">
			<Scene items={items} onReady={() => setReady(true)} />
			<Overlay content={content} />
			<LoadingScreen text={content.loading_text} ready={ready} />
			<DebugPanel />
		</div>
	);
}
