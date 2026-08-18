import type { Content } from "@prismicio/client";

import { LoadingScreen } from "./LoadingScreen";
import { Scene } from "./Scene";

type Props = {
	content: Content.LockerExperienceDocument["data"];
};

export default function LockerExperienceView({ content }: Props) {
	return (
		<div className="relative h-dvh w-full bg-neutral-900">
			<Scene />
			<LoadingScreen text={content.loading_text} />
		</div>
	);
}
