import * as prismic from "@prismicio/client";
import type { Content } from "@prismicio/client";

import { SLOTS } from "./slots";

/** The code caps texture width; the editor cannot blow up scene memory. */
const TEXTURE_WIDTH = 1024;

/**
 * The shape the 3D code works with. It knows nothing about Prismic.
 */
export type LockerItem = {
	uid: string;
	label: string | null;
	href: string | null;
	textureUrl: string;
	/** width / height of the source image, used to size the plane. */
	aspect: number;
};

/**
 * The single place in this experience that understands the Prismic document.
 * Objects without an image are dropped; extra objects beyond the number of
 * slots are ignored.
 */
export function resolveContent(
	data: Content.LockerExperienceDocument["data"],
): LockerItem[] {
	const items: LockerItem[] = [];

	for (const [index, object] of data.objects.entries()) {
		const textureUrl = prismic.asImageSrc(object.image, { w: TEXTURE_WIDTH });
		const dimensions = object.image.dimensions;

		if (!textureUrl || !dimensions) continue;

		if (items.length >= SLOTS.length) {
			if (process.env.NODE_ENV !== "production") {
				console.warn(
					`[locker] Only ${SLOTS.length} slots available — ignoring extra objects from position ${index + 1}.`,
				);
			}
			break;
		}

		items.push({
			uid: object.uid ?? `object-${index}`,
			label: object.label,
			href: prismic.asLink(object.link),
			textureUrl,
			aspect: dimensions.width / dimensions.height,
		});
	}

	return items;
}
