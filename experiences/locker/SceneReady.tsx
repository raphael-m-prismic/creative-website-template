"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

/**
 * useFrame ticks to let pass before the scene counts as visible. Callbacks run
 * *before* the draw call, so tick 3 means two frames have actually been
 * painted — enough to cover the hitch while textures upload to the GPU on
 * first draw.
 */
const READY_FRAMES = 3;

/**
 * Mounted inside the Suspense boundary, so it exists only once every asset has
 * resolved, and then waits for real frames on top of that: assets finishing
 * their decode is not the same thing as the locker being on screen.
 */
export function SceneReady({ onReady }: { onReady: () => void }) {
	const frames = useRef(0);

	useFrame(() => {
		if (frames.current >= READY_FRAMES) return;

		frames.current += 1;
		if (frames.current === READY_FRAMES) onReady();
	});

	return null;
}
