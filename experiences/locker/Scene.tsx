"use client";

import { Suspense } from "react";
import { DoubleSide } from "three";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

import { Items } from "./Items";
import { Locker } from "./Locker";
import type { LockerItem } from "./resolveItems";
import { useDebug } from "./useDebug";

const GROUND_Y = -0.941;

export function Scene({ items }: { items: LockerItem[] }) {
	const debug = useDebug();

	return (
		<Canvas camera={{ position: [0, 0, 3.6], fov: 40 }} dpr={[1, 2]} shadows>
			<color attach="background" args={['#ffffff']} />

			<Environment preset="sunset" />

			<directionalLight
				position={[-3, 6, -2]}
				intensity={1.4}
				castShadow
				shadow-mapSize={[2048, 2048]}
				shadow-bias={-0.0005}
				shadow-camera-near={0.5}
				shadow-camera-far={20}
				shadow-camera-left={-3}
				shadow-camera-right={3}
				shadow-camera-top={3}
				shadow-camera-bottom={-3}
			/>

			<Suspense fallback={null}>
				<Locker />
				<Items items={items} debug={debug} />
			</Suspense>

			<mesh
				position={[0, GROUND_Y, 0]}
				rotation-x={-Math.PI * 0.5}
				receiveShadow
			>
				<planeGeometry args={[30, 6]} />
				<meshStandardMaterial
					color={"white"}
					side={DoubleSide}
				/>
			</mesh>

			<OrbitControls enablePan={false} />
			{debug && <axesHelper args={[2]} />}
		</Canvas>
	);
}
