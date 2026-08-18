"use client";

import { Suspense } from "react";
import { DoubleSide } from "three";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

import { CameraRig } from "./CameraRig";
import { Items } from "./Items";
import { Locker } from "./Locker";
import { SceneReady } from "../_shared/SceneReady";
import type { LockerItem } from "./resolveItems";
import { useDebug } from "../_shared/useDebug";

const GROUND_Y = -0.941;

type Props = {
	items: LockerItem[];
	onReady: () => void;
};

export function Scene({ items, onReady }: Props) {
	const debug = useDebug();

	return (
		<Canvas camera={{ fov: 40 }} dpr={[1, 2]} shadows>
			<color attach="background" args={['#ffffff']} />

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
				<Environment preset="sunset" />
				<Locker />
				<Items items={items} debug={debug} />
				<SceneReady onReady={onReady} />
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

			{/* One camera owner at a time: both would fight over the transform. */}
			{debug ? (
				<>
					<OrbitControls enablePan={false} />
				</>
			) : (
				<CameraRig />
			)}

			{debug && <axesHelper args={[2]} />}
		</Canvas>
	);
}
