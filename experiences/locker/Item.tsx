"use client";

import { useState } from "react";
import { useTexture } from "@react-three/drei";
import { SRGBColorSpace } from "three";

import type { LockerItem } from "./resolveItems";

type Props = {
	item: LockerItem;
	position: [number, number, number];
	rotation: [number, number, number];
	height: number;
};

export function Item({ item, position, rotation, height }: Props) {
	const [hovered, setHovered] = useState(false);
	const map = useTexture(item.textureUrl);
	map.colorSpace = SRGBColorSpace;

	const width = height * item.aspect;
	const scale = hovered ? 1.06 : 1;

	return (
		<mesh
			position={position}
			rotation={rotation}
			scale={scale}
			onPointerOver={(event) => {
				event.stopPropagation();
				setHovered(true);
				document.body.style.cursor = item.href ? "pointer" : "auto";
			}}
			onPointerOut={() => {
				setHovered(false);
				document.body.style.cursor = "auto";
			}}
			onClick={(event) => {
				event.stopPropagation();
				if (item.href) window.open(item.href, "_blank", "noopener");
			}}
		>
			<planeGeometry args={[width, height]} />
			<meshBasicMaterial map={map} transparent toneMapped={false} />
		</mesh>
	);
}
