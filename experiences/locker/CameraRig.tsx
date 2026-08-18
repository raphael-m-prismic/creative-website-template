"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";

/**
 * Camera feel is declared here and only here. slots.ts decides *where* objects
 * sit; this file decides *how* the camera drifts around them.
 *
 * The rig keeps the camera on a sphere centered on the origin — the locker is
 * centered there — so the pointer orbits the model instead of panning past it,
 * and the framing can never drift off the locker.
 */

/**
 * Resting position, and the single source of truth for it: the Canvas only
 * sets fov. Radius and base angles below are derived from this, so moving the
 * camera up or back needs no other edit.
 */
export const BASE_POSITION: readonly [number, number, number] = [0, 0, 3.6];

/**
 * Max horizontal swing away from the resting angle, in radians (~8.6°). Past
 * roughly 0.15 the item planes are seen edge-on and the cutout illusion breaks.
 */
export const YAW_AMPLITUDE = 0.25;

/** Max vertical swing. Kept under the yaw — vertical drift reads stronger. */
export const PITCH_AMPLITUDE = 0.17;

/**
 * Fraction of the distance to the target still left after one full second, so
 * the per-frame step is `1 - DAMPING ** delta` and the motion lands in the same
 * place at 30fps as at 144fps. Lower is snappier; 1 would never move.
 */
export const DAMPING = 0.005;

/** Derived from BASE_POSITION: the sphere the camera is pinned to. */
const RADIUS = Math.hypot(...BASE_POSITION);
const BASE_YAW = Math.atan2(BASE_POSITION[0], BASE_POSITION[2]);
const BASE_PITCH = Math.asin(BASE_POSITION[1] / RADIUS);

/**
 * Mirrors the OS "reduce motion" setting. Read after mount so the
 * server-rendered markup and the first client render agree, and kept
 * subscribed so flipping the setting stops the rig mid-session.
 */
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

	/** Live angles, damped towards the pointer every frame. */
	const yaw = useRef(BASE_YAW);
	const pitch = useRef(BASE_PITCH);

	/**
	 * Park the camera at rest on mount — nothing else sets it now — and again if
	 * reduced motion turns on, since the frame loop then stops touching it.
	 */
	useLayoutEffect(() => {
		yaw.current = BASE_YAW;
		pitch.current = BASE_PITCH;
		camera.position.set(...BASE_POSITION);
		camera.lookAt(0, 0, 0);
	}, [camera, reducedMotion]);

	useFrame((state, delta) => {
		if (reducedMotion) return;

		/**
		 * state.pointer is already normalised to -1..1 and only updates while the
		 * pointer is over the canvas, so the camera holds still once it leaves.
		 */
		const targetYaw = BASE_YAW + state.pointer.x * YAW_AMPLITUDE;
		const targetPitch = BASE_PITCH + state.pointer.y * PITCH_AMPLITUDE;

		const step = 1 - Math.pow(DAMPING, delta);
		yaw.current += (targetYaw - yaw.current) * step;
		pitch.current += (targetPitch - pitch.current) * step;

		/** Damping the angles rather than the position keeps the camera on the sphere. */
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

/**
 * Debug-only sliders, mirroring the DebugItem pattern in Items.tsx: read the
 * values in the panel, then paste them into the constants above. The rig is not
 * mounted in debug mode — OrbitControls owns the camera there — so these tune
 * numbers rather than driving a live camera.
 */
export function CameraRigControls() {
	useControls("camera", {
		yawAmplitude: { value: YAW_AMPLITUDE, min: 0, max: 0.5, step: 0.01 },
		pitchAmplitude: { value: PITCH_AMPLITUDE, min: 0, max: 0.3, step: 0.01 },
		damping: { value: DAMPING, min: 0.0001, max: 0.2, step: 0.0001 },
	});

	return null;
}
