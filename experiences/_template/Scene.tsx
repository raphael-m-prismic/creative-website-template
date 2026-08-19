"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { SceneReady } from "../_shared/SceneReady";
import { useDebug } from "../_shared/useDebug";
import type { TemplateExperience } from "./resolveContent";
import { Suzanne } from "./Suzanne";
import { Cube } from "./Cube";
import { Sphere } from "./Sphere";
import { Floor } from "./Floor";

type Props = {
	experience: TemplateExperience;
	onReady: () => void;
};

export function Scene({ experience, onReady }: Props) {
	const debug = useDebug();

	return (
		<Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]} shadows>
			<color attach="background" args={['#ffffff']} />

			<OrbitControls enablePan={false} />

			<ambientLight intensity={2} />
			<directionalLight
				position={[-2, 6, -2]}
				intensity={1.4}
				castShadow
				shadow-mapSize={[2048, 2048]}
				shadow-bias={-0.0005}
				shadow-camera-near={0.5}
				shadow-camera-far={20}
				shadow-camera-left={-6}
				shadow-camera-right={6}
				shadow-camera-top={3}
				shadow-camera-bottom={-3}
			/>

			<Suspense fallback={null}>
				<Cube experience={experience} />
				<Suzanne experience={experience} />
				<Sphere experience={experience} />
				<SceneReady onReady={onReady} />
			</Suspense>

			<Floor position={[0, -2.5, 0]} />

			{/* Helpers are debug-only: the visitor sees the framing the code chose. */}
			{debug && <axesHelper args={[2]} />}
		</Canvas>
	);
}
