"use client";

import { useCallback, useState } from "react";

/**
 * Holds the one bit of state a loading screen needs, in the experience view
 * that owns both halves: <SceneReady> lives inside the Canvas and reports up,
 * the loading screen lives outside it and reads down.
 */
export function useSceneReady() {
	const [ready, setReady] = useState(false);

	return {
		/** True once the scene has loaded *and* drawn. */
		ready,
		/** Pass to <SceneReady onReady={...} /> inside the Canvas. */
		onReady: useCallback(() => setReady(true), []),
	};
}
