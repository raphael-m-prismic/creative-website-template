"use client";

import { useLayoutEffect, useRef } from "react";
import { Center, useGLTF } from "@react-three/drei";
import { Box3, Group, Vector3 } from "three";

const MODEL_PATH = "/models/locker.glb";

export function Locker() {
	const { scene } = useGLTF(MODEL_PATH);
	const ref = useRef<Group>(null);

	/**
	 * Dev helper: logs the model's real dimensions once, so slot coordinates
	 * can be written against actual numbers instead of guesses.
	 */
	useLayoutEffect(() => {
		if (process.env.NODE_ENV === "production" || !ref.current) return;

		const box = new Box3().setFromObject(ref.current);
		const size = box.getSize(new Vector3());
		console.log(
			`[locker] model size — x: ${size.x.toFixed(2)}, y: ${size.y.toFixed(2)}, z: ${size.z.toFixed(2)}`,
		);
	}, []);

	return (
		<Center>
			<primitive ref={ref} object={scene} />
		</Center>
	);
}

useGLTF.preload(MODEL_PATH);
