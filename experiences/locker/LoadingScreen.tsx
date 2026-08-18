"use client";

import { useLoadingScreen } from "../_shared/useLoadingScreen";

type Props = {
	text: string | null;
	/** Loaded and drawn. See _shared/SceneReady. */
	ready: boolean;
};

/** Light, to match the scene it uncovers. useLoadingScreen owns the timing. */
export function LoadingScreen({ text, ready }: Props) {
	const { done, progress, containerProps } = useLoadingScreen({ ready });

	if (done) return null;

	return (
		<div
			className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white transition-opacity duration-700"
			{...containerProps}
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
