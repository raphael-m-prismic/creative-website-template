import * as prismic from "@prismicio/client";
import type { Content } from "@prismicio/client";

/**
 * Slots are declared in code, never in the CMS. The editor picks a name,
 * the code decides what that name means in 3D space.
 */
const SLOTS: Record<"top" | "middle" | "bottom", [number, number, number]> = {
	top: [0, 1, 0],
	middle: [0, 0, 0],
	bottom: [0, -1, 0],
};

const DEFAULT_COLOR = "#8b8b8b";

/** The code owns texture dimensions, not the editor. */
const TEXTURE_SIZE = 1024;

/**
 * The shape the 3D code works with. It knows nothing about Prismic.
 */
export type TemplateExperience = {
	cube_color: string;
	suzanne_position: [number, number, number];
	sphere_textureUrl: string | null;
};

/**
 * The single place in this experience that understands the Prismic document.
 * Everything downstream consumes TemplateExperience, so the scene can run
 * with hardcoded values, with no CMS and no network.
 */
export function resolveContent(
	data: Content.ExperienceTemplateDocument["data"],
): TemplateExperience {
	const slot = data.suzanne_position ?? "middle";
	const position = SLOTS[slot];

	if (!position && process.env.NODE_ENV !== "production") {
		console.warn(
			`[_template] Unknown slot "${data.suzanne_position}". Falling back to "middle".`,
		);
	}

	return {
		cube_color: data.cube_color ?? DEFAULT_COLOR,
		suzanne_position: position ?? SLOTS.middle,
		sphere_textureUrl: prismic.asImageSrc(data.sphere_texture, {
			w: TEXTURE_SIZE,
			h: TEXTURE_SIZE,
			fit: "crop",
		}),
	};
}
