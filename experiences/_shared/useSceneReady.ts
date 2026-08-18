"use client";

import { useCallback, useState } from "react";

/** Ready bridge: SceneReady reports from inside the Canvas, the screen reads out. */
export function useSceneReady() {
	const [ready, setReady] = useState(false);

	return { ready, onReady: useCallback(() => setReady(true), []) };
}
