"use client";

import { useControls } from "leva";

import { Item } from "./Item";
import type { LockerItem } from "./resolveItems";
import { SLOTS, type Slot } from "./slots";

type Props = {
	items: LockerItem[];
	debug: boolean;
};

/**
 * Wraps one item with leva sliders. Read the values in the panel, then paste
 * them into slots.ts — the panel is a placement tool, not a content feature.
 */
function DebugItem({ item, slot }: { item: LockerItem; slot: Slot }) {
	const values = useControls(`${item.uid}`, {
		positionX: { value: slot.position[0], min: -1, max: 1, step: 0.01 },
		positionY: { value: slot.position[1], min: -1.5, max: 1.5, step: 0.01 },
		positionZ: { value: slot.position[2], min: -1, max: 1, step: 0.01 },
		rotationX: { value: slot.rotation[0], min: -Math.PI, max: Math.PI, step: 0.01 },
		rotationY: { value: slot.rotation[1], min: -Math.PI, max: Math.PI, step: 0.01 },
		rotationZ: { value: slot.rotation[2], min: -Math.PI, max: Math.PI, step: 0.01 },
		height: { value: slot.height, min: 0.05, max: 1.5, step: 0.01 },
	});

	return (
		<Item
			item={item}
			position={[values.positionX, values.positionY, values.positionZ]}
			rotation={[values.rotationX, values.rotationY, values.rotationZ]}
			height={values.height}
		/>
	);
}

export function Items({ items, debug }: Props) {
	return (
		<>
			{items.map((item, index) => {
				const slot = SLOTS[index];
				if (!slot) return null;

				return debug ? (
					<DebugItem key={item.uid} item={item} slot={slot} />
				) : (
					<Item
						key={item.uid}
						item={item}
						position={slot.position}
						rotation={slot.rotation}
						height={slot.height}
					/>
				);
			})}
		</>
	);
}
