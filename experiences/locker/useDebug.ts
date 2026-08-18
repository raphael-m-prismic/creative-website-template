"use client";

import { useEffect, useState } from "react";

/**
 * Debug mode is opt-in via ?debug in the URL. Read after mount so the
 * server-rendered markup and the first client render agree.
 */
export function useDebug() {
	const [debug, setDebug] = useState(false);

	useEffect(() => {
		setDebug(new URLSearchParams(window.location.search).has("debug"));
	}, []);

	return debug;
}
