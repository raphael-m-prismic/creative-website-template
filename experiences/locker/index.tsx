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
	return (
		<div className="relative h-dvh w-full bg-white">
			<Scene items={items} />
			<Overlay content={content} />
			<LoadingScreen text={content.loading_text} />
			<DebugPanel />
		</div>
	);
}
