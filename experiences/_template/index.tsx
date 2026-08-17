import type { Content } from "@prismicio/client";

import { Overlay } from "./Overlay";
import { Scene } from "./Scene";
import type { TemplateExperience } from "./resolveContent";

type Props = {
	experience: TemplateExperience;
	content: Content.ExperienceTemplateDocument["data"];
};

export default function TemplateExperienceView({ experience, content }: Props) {
	return (
		<div className="relative h-dvh w-full bg-neutral-900">
			<Scene experience={experience} />
			<Overlay content={content} />
		</div>
	);
}
