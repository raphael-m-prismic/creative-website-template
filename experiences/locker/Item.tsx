"use client";

import { useState } from "react";
import { Html, useTexture } from "@react-three/drei";
import { SRGBColorSpace } from "three";

import { ItemOutline } from "./ItemOutline";
import type { LockerItem } from "./resolveContent";

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

	return (
		<group position={position}>
			<group rotation={rotation}>
				{hovered && <ItemOutline map={map} width={width} height={height} />}

				<mesh
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
			</group>

			{hovered && item.label && (
				<Html
					position={[0, height / 2 + 0.06, 0]}
					center
					zIndexRange={[10, 0]}
					style={{ pointerEvents: "none" }}
				>
					<span
						className="pointer-events-none block whitespace-nowrap px-7 py-2 text-[13px] font-bold italic leading-none tracking-wide text-white"
						style={{
							background: "#D81E7B",
							clipPath:
								"polygon(0% 44%, 9% 2%, 100% 8%, 93% 50%, 100% 94%, 7% 100%)",
							transform: "rotate(-3deg)",
						}}
					>
						{item.label}
					</span>
				</Html>
			)}
		</group>
	);
}
