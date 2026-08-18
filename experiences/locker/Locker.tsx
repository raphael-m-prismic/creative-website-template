"use client";

import { useLayoutEffect, useRef } from "react";
import { Center, useGLTF } from "@react-three/drei";
import { Box3, Group, Mesh, Vector3 } from "three";

const MODEL_PATH = "/models/locker.glb";

export function Locker() {
	const { scene } = useGLTF(MODEL_PATH);
	const ref = useRef<Group>(null);

	useLayoutEffect(() => {
		if (process.env.NODE_ENV === "production" || !ref.current) return;

		const box = new Box3().setFromObject(ref.current);
		const size = box.getSize(new Vector3());

	}, []);

	useLayoutEffect(() => {
		scene.traverse((object) => {
			if (object instanceof Mesh) {
				object.castShadow = true;
				object.receiveShadow = true;
			}
		});
	}, [scene]);

	return (
		<Center>
			<primitive ref={ref} object={scene} />
		</Center>
	);
}

useGLTF.preload(MODEL_PATH);
