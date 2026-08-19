"use client"

import { useTexture } from "@react-three/drei";
import { TemplateExperience } from "./resolveContent";
import { SRGBColorSpace } from "three";

type SphereProps = {
    experience: TemplateExperience;
};

const DEFAULT_COLOR = "#FF0000"

function TexturedMaterial({ url }: { url: string; }) {
    const map = useTexture(url);
    map.colorSpace = SRGBColorSpace;

    return <meshStandardMaterial map={map} />;
}

export function Sphere({ experience }: SphereProps) {
    return (
        <mesh
            position={[3.2, 0, 0]}
            rotation={[0, 0, 0]}
            scale={[0.8, 0.8, 0.8]}
            castShadow
            receiveShadow
        >
            <sphereGeometry args={[1, 32, 32]} />
            {experience.sphere_textureUrl ? (
                <TexturedMaterial
                    url={experience.sphere_textureUrl}
                />
            ) : (
                <meshStandardMaterial color={DEFAULT_COLOR} />
            )}
        </mesh>
    );
}