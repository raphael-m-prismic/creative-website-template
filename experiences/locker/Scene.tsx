"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { Locker } from "./Locker";

export function Scene() {
	return (
		<Canvas camera={{ position: [0, 0, 6], fov: 40 }} dpr={[1, 2]}>
			<ambientLight intensity={0.8} />
			<directionalLight position={[4, 6, 8]} intensity={2.5} />
			<directionalLight position={[-6, 2, -4]} intensity={0.8} />

			<Suspense fallback={null}>
				<Locker />
			</Suspense>

			<OrbitControls enablePan={false} />
			{process.env.NODE_ENV !== "production" && <axesHelper args={[3]} />}
		</Canvas>
	);
}
