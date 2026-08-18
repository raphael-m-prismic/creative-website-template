"use client";

import { useState, type CSSProperties, type TransitionEvent } from "react";
import { useProgress } from "@react-three/drei";

/**
 * Every experience writes its own loading screen — its own copy, layout and
 * colours. This hook is the part that must not differ: when the screen is
 * visible, when it stops blocking clicks, and when it stops existing.
 *
 * Headless on purpose. It returns state and props to spread, never markup or
 * class names, so an experience can put anything it likes on screen.
 */
export function useLoadingScreen({ ready }: { ready: boolean }) {
	const { progress } = useProgress();
	const [faded, setFaded] = useState(false);

	/**
	 * Opaque from the very first paint, including the server-rendered markup.
	 * useProgress cannot decide this: it reads three's global loading manager,
	 * which reports idle both before loading starts and after it ends, so keying
	 * visibility off `active` leaves the scene uncovered on first paint. It is
	 * still the right source for a progress bar.
	 */
	const style: CSSProperties = {
		opacity: ready ? 0 : 1,
		/**
		 * The screen is opaque, so anything clickable underneath is invisible but
		 * still there. Blocks while up, released for the fade.
		 */
		pointerEvents: ready ? "none" : "auto",
	};

	/**
	 * Stop painting once the fade is done. The guards keep transitions bubbling
	 * up from children — a progress bar's width, say — from counting as the fade.
	 */
	function onTransitionEnd(event: TransitionEvent<HTMLElement>) {
		if (
			ready &&
			event.target === event.currentTarget &&
			event.propertyName === "opacity"
		) {
			setFaded(true);
		}
	}

	return {
		/** True once the fade has finished: render nothing at all from here on. */
		done: faded,
		/** 0–100, for experiences that want to show a bar or a number. */
		progress,
		/**
		 * Spread onto the element carrying the fade. That element still needs an
		 * opacity transition of its own — the duration is a design choice, and
		 * without one `done` never flips and the screen stays mounted, invisible.
		 */
		containerProps: { style, onTransitionEnd },
	};
}
