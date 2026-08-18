"use client";

import { useLoadingScreen } from "../_shared/useLoadingScreen";

/** Static: this screen is scaffolding. The locker reads its copy from Prismic. */
const TEXT = "Loading";

/** Dark, to match the scene it uncovers. useLoadingScreen owns the timing. */
export function LoadingScreen({ ready }: { ready: boolean }) {
	const { done, progress, containerProps } = useLoadingScreen({ ready });

	if (done) return null;

	return (
		<div
			className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-neutral-900 transition-opacity duration-700"
			{...containerProps}
		>
			<p className="text-sm tracking-wide text-white/70">{TEXT}</p>
			<div className="h-px w-40 overflow-hidden bg-white/20">
				<div
					className="h-full bg-white transition-[width] duration-300"
					style={{ width: `${progress}%` }}
				/>
			</div>
		</div>
	);
}
