"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { SRGBColorSpace } from "three";
import { useControls } from "leva";

import { SceneReady } from "../_shared/SceneReady";
import { useDebug } from "../_shared/useDebug";
import type { TemplateExperience } from "./resolveContent";

function TexturedMaterial({ url, color }: { url: string; color: string }) {
	const map = useTexture(url);
	map.colorSpace = SRGBColorSpace;

	return <meshStandardMaterial map={map} color={color} />;
}

type CubeProps = {
	experience: TemplateExperience;
	debug: boolean;
};

function Cube({ experience, debug }: CubeProps) {
	/** Drag it in the panel, read the values, paste them into a slot. */
	const { position } = useControls({ position: experience.position });

	return (
		<mesh
			position={debug ? position : experience.position}
			rotation={[0.35, 0.6, 0]}
		>
			<boxGeometry args={[1.8, 1.8, 1.8]} />
			{experience.textureUrl ? (
				<TexturedMaterial
					url={experience.textureUrl}
					color={experience.color}
				/>
			) : (
				<meshStandardMaterial color={experience.color} />
			)}
		</mesh>
	);
}

type Props = {
	experience: TemplateExperience;
	onReady: () => void;
};

export function Scene({ experience, onReady }: Props) {
	const debug = useDebug();

	return (
		<Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 2]}>
			<ambientLight intensity={2} />
			<directionalLight position={[4, 5, 6]} intensity={2.5} />
			<Suspense fallback={null}>
				<Cube experience={experience} debug={debug} />
				<SceneReady onReady={onReady} />
			</Suspense>

			{/* Camera and helpers are debug-only: the visitor sees the framing the code chose. */}
			{debug && (
				<>
					<OrbitControls enablePan={false} />
					<axesHelper args={[2]} />
				</>
			)}
		</Canvas>
	);
}
