"use client"

import { TemplateExperience } from "./resolveContent";

type CubeProps = {
    experience: TemplateExperience;
};

export function Cube({ experience }: CubeProps) {
    return (
        <mesh
            position={[-3.2, 0, 0]}
            rotation={[0.35, 0.6, 0]}
            scale={[0.8, 0.8, 0.8]}
            castShadow
            receiveShadow
        >
            <boxGeometry args={[1.8, 1.8, 1.8]} />
            <meshStandardMaterial color={experience.cube_color} />
        </mesh>
    );
}