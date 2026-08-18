"use client";

import { useState, type CSSProperties, type TransitionEvent } from "react";
import { useProgress } from "@react-three/drei";

/**
 * The part that must not differ between experiences: when the screen is up,
 * when it stops blocking clicks, when it stops existing. Headless — returns
 * state and props to spread, never markup, so each one styles its own.
 */
export function useLoadingScreen({ ready }: { ready: boolean }) {
	const { progress } = useProgress();
	const [faded, setFaded] = useState(false);

	/**
	 * Opaque from the first paint, server-rendered markup included. useProgress
	 * cannot gate this — it reports idle before loading starts as well as after
	 * it ends — but it is still the right source for a bar.
	 */
	const style: CSSProperties = {
		opacity: ready ? 0 : 1,
		/** Opaque, so it must swallow clicks meant for the hidden UI below. */
		pointerEvents: ready ? "none" : "auto",
	};

	/** Guards: child transitions, a bar's width say, bubble up here too. */
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
		/** True once faded out: render nothing from here on. */
		done: faded,
		/** 0–100. */
		progress,
		/**
		 * Spread onto the element carrying the fade. It needs an opacity
		 * transition of its own, or `done` never flips.
		 */
		containerProps: { style, onTransitionEnd },
	};
}
