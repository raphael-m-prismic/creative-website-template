"use client"

import { useMemo } from "react";
import { useTexture } from "@react-three/drei";
import { SphereTextures, TemplateExperience } from "./resolveContent";
import { SRGBColorSpace, Texture } from "three";

type SphereProps = {
    experience: TemplateExperience;
};

const DEFAULT_COLOR = "#FF0000"

/**
 * Displacement moves real vertices, so it needs real geometry to move: at the
 * plain segment count the bumps would alias into facets. The dense sphere is
 * only built when a displacement map is actually there.
 */
const SEGMENTS = 32;
const DISPLACED_SEGMENTS = 256;

/** Height in world units, on a radius-1 sphere. */
const DISPLACEMENT_SCALE = 0.15;

/** Material props keyed by the resolved URL that feeds them. */
const MAP_PROPS = {
    map: "diffuseUrl",
    displacementMap: "displacementUrl",
    normalMap: "normalUrl",
    roughnessMap: "roughnessUrl",
} as const satisfies Record<string, keyof SphereTextures>;

type MapProp = keyof typeof MAP_PROPS;

function TexturedMaterial({ textures }: { textures: SphereTextures }) {
    /** Only the maps the editor filled in: drei loads whatever keys it is given. */
    const urls = useMemo(() => {
        const entries: Record<string, string> = {};
        for (const [prop, key] of Object.entries(MAP_PROPS)) {
            const url = textures[key];
            if (url) entries[prop] = url;
        }
        return entries;
    }, [textures]);

    const maps = useTexture(urls) as Partial<Record<MapProp, Texture>>;

    return (
        <meshStandardMaterial
            map={maps.map}
            /**
             * The diffuse map is color, the rest is data and stays linear.
             * Must follow `map`: r3f pierces into the texture already set, and
             * undefined is skipped when the editor left the diffuse map empty.
             */
            map-colorSpace={maps.map ? SRGBColorSpace : undefined}
            normalMap={maps.normalMap}
            roughnessMap={maps.roughnessMap}
            displacementMap={maps.displacementMap}
            displacementScale={DISPLACEMENT_SCALE}
            /* Push inward by half the height so the sphere keeps its radius. */
            displacementBias={-DISPLACEMENT_SCALE * 0.5}
            /* map multiplies with color, so white is the neutral base. */
            color={maps.map ? "white" : DEFAULT_COLOR}
        />
    );
}

export function Sphere({ experience }: SphereProps) {
    const textures = experience.sphere_textures;
    const segments = textures?.displacementUrl ? DISPLACED_SEGMENTS : SEGMENTS;

    return (
        <mesh
            position={[3.2, 0, 0]}
            rotation={[0, 0, 0]}
            scale={[0.8, 0.8, 0.8]}
            castShadow
            receiveShadow
        >
            <sphereGeometry args={[1, segments, segments]} />
            {textures ? (
                <TexturedMaterial textures={textures} />
            ) : (
                <meshStandardMaterial color={DEFAULT_COLOR} />
            )}
        </mesh>
    );
}
