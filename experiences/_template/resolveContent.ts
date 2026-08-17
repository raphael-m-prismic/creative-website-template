import * as prismic from "@prismicio/client";
import type { Content } from "@prismicio/client";

/**
 * Slots are declared in code, never in the CMS. The editor picks a name,
 * the code decides what that name means in 3D space.
 */
const SLOTS: Record<"left" | "center" | "right", [number, number, number]> = {
	left: [-2.4, 0, 0],
	center: [0, 0, 0],
	right: [2.4, 0, 0],
};

const DEFAULT_COLOR = "#8b8b8b";

/** The code owns texture dimensions, not the editor. */
const TEXTURE_SIZE = 1024;

/**
 * The shape the 3D code works with. It knows nothing about Prismic.
 */
export type TemplateExperience = {
	color: string;
	position: [number, number, number];
	textureUrl: string | null;
};

/**
 * The single place in this experience that understands the Prismic document.
 * Everything downstream consumes TemplateExperience, so the scene can run
 * with hardcoded values, with no CMS and no network.
 */
export function resolveContent(
	data: Content.ExperienceTemplateDocument["data"],
): TemplateExperience {
	const slot = data.position ?? "center";
	const position = SLOTS[slot];

	if (!position && process.env.NODE_ENV !== "production") {
		console.warn(
			`[_template] Unknown slot "${data.position}". Falling back to "center".`,
		);
	}

	return {
		color: data.color ?? DEFAULT_COLOR,
		position: position ?? SLOTS.center,
		textureUrl: prismic.asImageSrc(data.texture, {
			w: TEXTURE_SIZE,
			h: TEXTURE_SIZE,
			fit: "crop",
		}),
	};
}
