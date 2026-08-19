"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";

/**
 * Camera feel, declared here and only here. Kept on a sphere around the origin
 * where the locker sits, so the framing can never drift off the model.
 */

/** Resting position. The Canvas sets only fov; radius and angles derive here. */
export const BASE_POSITION: readonly [number, number, number] = [0, 0, 3.6];

/** Max horizontal swing, radians. Too far and the item planes go edge-on. */
export const YAW_AMPLITUDE = 0.25;

/** Max vertical swing. Kept under the yaw — vertical drift reads stronger. */
export const PITCH_AMPLITUDE = 0.17;

/** Gap left after one second; step = 1 - DAMPING ** delta, so framerate-safe. */
export const DAMPING = 0.005;

/** The sphere the camera is pinned to. */
const RADIUS = Math.hypot(...BASE_POSITION);
const BASE_YAW = Math.atan2(BASE_POSITION[0], BASE_POSITION[2]);
const BASE_PITCH = Math.asin(BASE_POSITION[1] / RADIUS);

/** OS reduce-motion, read after mount so SSR and the first render agree. */
function useReducedMotion() {
	const [reduced, setReduced] = useState(false);

	useEffect(() => {
		const query = window.matchMedia("(prefers-reduced-motion: reduce)");
		setReduced(query.matches);

		const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
		query.addEventListener("change", onChange);
		return () => query.removeEventListener("change", onChange);
	}, []);

	return reduced;
}

export function CameraRig() {
	const camera = useThree((state) => state.camera);
	const reducedMotion = useReducedMotion();

	/** Damped towards the pointer every frame. */
	const yaw = useRef(BASE_YAW);
	const pitch = useRef(BASE_PITCH);

	/** Nothing else sets the camera now; re-park if reduced motion turns on. */
	useLayoutEffect(() => {
		yaw.current = BASE_YAW;
		pitch.current = BASE_PITCH;
		camera.position.set(...BASE_POSITION);
		camera.lookAt(0, 0, 0);
	}, [camera, reducedMotion]);

	useFrame((state, delta) => {
		if (reducedMotion) return;

		/** Normalised -1..1, and frozen while the pointer is off the canvas. */
		const targetYaw = BASE_YAW + state.pointer.x * YAW_AMPLITUDE;
		const targetPitch = BASE_PITCH + state.pointer.y * PITCH_AMPLITUDE;

		const step = 1 - Math.pow(DAMPING, delta);
		yaw.current += (targetYaw - yaw.current) * step;
		pitch.current += (targetPitch - pitch.current) * step;

		/** Damping angles, not position, keeps the camera on the sphere. */
		const cosPitch = Math.cos(pitch.current);
		camera.position.set(
			RADIUS * cosPitch * Math.sin(yaw.current),
			RADIUS * Math.sin(pitch.current),
			RADIUS * cosPitch * Math.cos(yaw.current),
		);
		camera.lookAt(0, 0, 0);
	});

	return null;
}