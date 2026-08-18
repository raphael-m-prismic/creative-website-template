"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { Items } from "./Items";
import { Locker } from "./Locker";
import type { LockerItem } from "./resolveItems";
import { useDebug } from "./useDebug";

export function Scene({ items }: { items: LockerItem[] }) {
	const debug = useDebug();

	return (
		<Canvas camera={{ position: [0, 0, 3.2], fov: 40 }} dpr={[1, 2]}>
			<ambientLight intensity={0.8} />
			<directionalLight position={[4, 6, 8]} intensity={2.5} />
			<directionalLight position={[-6, 2, -4]} intensity={0.8} />

			<Suspense fallback={null}>
				<Locker />
				<Items items={items} debug={debug} />
			</Suspense>

			<OrbitControls enablePan={false} />
			{debug && <axesHelper args={[2]} />}
		</Canvas>
	);
}
