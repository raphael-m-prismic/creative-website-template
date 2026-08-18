"use client";

import { useEffect, useState } from "react";

/** Opt-in via ?debug. Read after mount so SSR and the first render agree. */
export function useDebug() {
	const [debug, setDebug] = useState(false);

	useEffect(() => {
		setDebug(new URLSearchParams(window.location.search).has("debug"));
	}, []);

	return debug;
}
