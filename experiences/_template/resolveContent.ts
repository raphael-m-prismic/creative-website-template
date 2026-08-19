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

const COLOR_MAP_PARAMS = {
	w: TEXTURE_SIZE,
	h: TEXTURE_SIZE,
	fit: "crop",
} as const;

/**
 * Data maps are not pictures: a normal map stores an XYZ vector and a
 * displacement map stores a height. Prismic serves images with
 * `auto=compress,format`, which would re-encode them as lossy WebP and turn
 * that data into artefacts. `auto: undefined` drops the param and delivers
 * the source PNG untouched.
 */
const DATA_MAP_PARAMS = { ...COLOR_MAP_PARAMS, auto: undefined } as const;

/**
 * Every map the sphere material can use. Each one is optional: the editor
 * can ship a diffuse map alone, or a full PBR set.
 */
export type SphereTextures = {
	diffuseUrl: string | null;
	displacementUrl: string | null;
	normalUrl: string | null;
	roughnessUrl: string | null;
};

/**
 * The shape the 3D code works with. It knows nothing about Prismic.
 */
export type TemplateExperience = {
	cube_color: string;
	suzanne_position: [number, number, number];
	/** null when every map is empty, so the sphere can fall back to a flat color. */
	sphere_textures: SphereTextures | null;
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

	/**
	 * A non-repeatable group still arrives as an array of zero or one item, and
	 * it is missing entirely from documents published before the field existed —
	 * which the generated types cannot know about.
	 */
	const maps = data.sphere_textures?.[0];

	const sphereTextures: SphereTextures = {
		diffuseUrl: prismic.asImageSrc(maps?.diffuse_map, COLOR_MAP_PARAMS),
		displacementUrl: prismic.asImageSrc(maps?.displacement_map, DATA_MAP_PARAMS),
		normalUrl: prismic.asImageSrc(maps?.normal_map, DATA_MAP_PARAMS),
		roughnessUrl: prismic.asImageSrc(maps?.roughness_map, DATA_MAP_PARAMS),
	};

	return {
		cube_color: data.cube_color ?? DEFAULT_COLOR,
		suzanne_position: position,
		sphere_textures: Object.values(sphereTextures).some(Boolean)
			? sphereTextures
			: null,
	};
}
