/**
 * Content decides what goes in the locker, this file decides where. Filled top
 * to bottom in Prismic order.
 *
 * Model is 0.63 x 1.88 x 0.89, centered: interior x -0.31..0.31, y -0.94..0.94,
 * back wall z -0.44.
 */
export type Slot = {
	position: [number, number, number];
	rotation: [number, number, number];
	/** Plane height in world units. Width is derived from the image ratio. */
	height: number;
};

export const SLOTS: Slot[] = [
	{
		position: [-0.05, 0.75, -0.41],
		rotation: [0, 0, 0],
		height: 0.19,
	},
	{
		position: [0.03, 0.68, -0.20],
		rotation: [0, -0.37, 0.25],
		height: 0.23,
	},
	{
		position: [-0.11, 0.40, -0.42],
		rotation: [0, 0, 0],
		height: 0.15,
	},
	{
		position: [-0.07, 0.10, -0.20],
		rotation: [-0.42, 0, 0],
		height: 0.26,
	},
	{
		position: [-0.06, -0.34, -0.42],
		rotation: [0, 0, 0],
		height: 0.42,
	},
	{
		position: [0.11, -0.85, -0.37],
		rotation: [-0.40, -0.48, 0],
		height: 0.10,
	},
	{
		position: [-0.04, -0.51, -0.19],
		rotation: [-0.16, -0.07, 1.10],
		height: 0.32,
	},
];
