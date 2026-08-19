"use client";

import { useLayoutEffect, useRef } from "react";
import { Center, useGLTF } from "@react-three/drei";
import { Group, Mesh, MeshNormalMaterial } from "three";
import { TemplateExperience } from "./resolveContent";

type SuzanneProps = {
    experience: TemplateExperience;
};

const MODEL_PATH = "/models/suzanne.glb";

export function Suzanne({ experience }: SuzanneProps) {
    const { scene } = useGLTF(MODEL_PATH);
    const ref = useRef<Group>(null);

    useLayoutEffect(() => {
        scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.rotation.y = Math.PI

                object.castShadow = true;
                object.receiveShadow = true;

                object.material = new MeshNormalMaterial()
            }
        });
    }, [scene]);

    return (
        <primitive ref={ref} object={scene} position={experience.suzanne_position} />
    );
}

useGLTF.preload(MODEL_PATH);