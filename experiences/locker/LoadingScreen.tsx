"use client";

import { useProgress } from "@react-three/drei";

/**
 * Lives outside the Canvas: useProgress reads three's global loading manager,
 * so the DOM can react to asset progress without being part of the scene.
 */
export function LoadingScreen({ text }: { text: string | null }) {
	const { active, progress } = useProgress();

	return (
		<div
			className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 bg-neutral-900 transition-opacity duration-700"
			style={{ opacity: active ? 1 : 0 }}
		>
			<p className="text-sm tracking-wide text-white/70">
				{text ?? "Loading"}
			</p>
			<div className="h-px w-40 overflow-hidden bg-white/20">
				<div
					className="h-full bg-white transition-[width] duration-300"
					style={{ width: `${progress}%` }}
				/>
			</div>
		</div>
	);
}
