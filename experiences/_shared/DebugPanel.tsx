"use client";

import { Leva } from "leva";

import { useDebug } from "./useDebug";

export function DebugPanel() {
	const debug = useDebug();

	if (!debug) return null;

	return <Leva collapsed={false} />;
}
