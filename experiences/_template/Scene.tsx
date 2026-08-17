"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { SRGBColorSpace } from "three";

import type { TemplateExperience } from "./resolveContent";

function TexturedMaterial({ url, color }: { url: string; color: string }) {
	const map = useTexture(url);
	map.colorSpace = SRGBColorSpace;

	return <meshStandardMaterial map={map} color={color} />;
}

function Cube({ experience }: { experience: TemplateExperience }) {
	return (
		<mesh position={experience.position} rotation={[0.35, 0.6, 0]}>
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

export function Scene({ experience }: { experience: TemplateExperience }) {
	return (
		<Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 2]}>
			<ambientLight intensity={0.7} />
			<directionalLight position={[4, 5, 6]} intensity={2.5} />
			<Suspense fallback={null}>
				<Cube experience={experience} />
			</Suspense>
			<OrbitControls enablePan={false} />
		</Canvas>
	);
}
