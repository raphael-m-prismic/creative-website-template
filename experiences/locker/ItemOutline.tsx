"use client";

import { useMemo } from "react";
import type { Texture } from "three";

/** Outline thickness, in texture UV units along the Y axis. */
const THICKNESS = 0.03;

/** Extra room around the item so the dilated ring is not clipped. */
const SCALE = 1 + THICKNESS * 2;

const vertexShader = /* glsl */ `
	varying vec2 vUv;

	void main() {
		vUv = uv;
		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	}
`;

/**
 * Dilates the texture's alpha in every direction, then subtracts the original
 * alpha. What is left is a ring that follows the artwork's cutout.
 */
const fragmentShader = /* glsl */ `
	uniform sampler2D uMap;
	uniform float uThickness;
	uniform float uAspect;
	uniform float uScale;

	varying vec2 vUv;

	float alphaAt(vec2 uv) {
		if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return 0.0;
		return texture2D(uMap, uv).a;
	}

	void main() {
		vec2 uv = (vUv - 0.5) * uScale + 0.5;

		float base = alphaAt(uv);
		float dilated = base;

		for (int i = 0; i < 16; i++) {
			float angle = float(i) * 0.39269908;
			vec2 offset = vec2(cos(angle) / uAspect, sin(angle)) * uThickness;
			dilated = max(dilated, alphaAt(uv + offset));
		}

		float ring = clamp(dilated - base, 0.0, 1.0);
		if (ring < 0.01) discard;

		gl_FragColor = vec4(1.0, 1.0, 1.0, ring);
	}
`;

type Props = {
	map: Texture;
	width: number;
	height: number;
};

export function ItemOutline({ map, width, height }: Props) {
	const uniforms = useMemo(
		() => ({
			uMap: { value: map },
			uThickness: { value: THICKNESS },
			uAspect: { value: width / height },
			uScale: { value: SCALE },
		}),
		[map, width, height],
	);

	return (
		<mesh position={[0, 0, 0.002]}>
			<planeGeometry args={[width * SCALE, height * SCALE]} />
			<shaderMaterial
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
				uniforms={uniforms}
				transparent
				depthWrite={false}
			/>
		</mesh>
	);
}
