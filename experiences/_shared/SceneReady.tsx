"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

/** Callbacks run before the draw, so 3 ticks means 2 frames actually painted. */
const READY_FRAMES = 3;

/**
 * A loading screen is DOM and cannot see frames, so the scene reports out.
 * Mount inside a Suspense boundary: assets resolved is not yet on screen.
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
