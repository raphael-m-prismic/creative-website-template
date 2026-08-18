"use client";

import { useState } from "react";
import { useProgress } from "@react-three/drei";

type Props = {
	text: string | null;
	/** True once the scene has loaded *and* drawn. See SceneReady. */
	ready: boolean;
};

/**
 * Opaque from the very first paint, including the server-rendered markup, and
 * dismissed only when the scene says it is on screen.
 *
 * useProgress cannot own that decision: it reads three's global loading
 * manager, which reports idle both before loading starts and after it ends, so
 * keying visibility off `active` leaves the scene uncovered on first paint. It
 * is still the right source for the bar.
 */
export function LoadingScreen({ text, ready }: Props) {
	const { progress } = useProgress();
	const [faded, setFaded] = useState(false);

	if (faded) return null;

	return (
		<div
			/**
			 * Blocks interaction while up: it is opaque, so anything clickable in the
			 * overlay below is invisible but still there. Released for the fade.
			 */
			className={`absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white transition-opacity duration-700 ${
				ready ? "pointer-events-none" : "pointer-events-auto"
			}`}
			style={{ opacity: ready ? 0 : 1 }}
			/**
			 * Stop painting once the fade is done. The guards keep the bar's own
			 * width transition, which bubbles up from the child, from counting.
			 */
			onTransitionEnd={(event) => {
				if (
					ready &&
					event.target === event.currentTarget &&
					event.propertyName === "opacity"
				) {
					setFaded(true);
				}
			}}
		>
			<p className="text-sm tracking-wide text-neutral-600">
				{text ?? "Loading"}
			</p>
			<div className="h-px w-40 overflow-hidden bg-neutral-900/15">
				<div
					className="h-full bg-neutral-900 transition-[width] duration-300"
					style={{ width: `${progress}%` }}
				/>
			</div>
		</div>
	);
}
