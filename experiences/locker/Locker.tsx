"use client";

import { useLayoutEffect } from "react";
import { Center, useGLTF } from "@react-three/drei";
import { Mesh } from "three";

const MODEL_PATH = "/models/locker.glb";

export function Locker() {
	const { scene } = useGLTF(MODEL_PATH);

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
			<primitive object={scene} />
		</Center>
	);
}

useGLTF.preload(MODEL_PATH);
