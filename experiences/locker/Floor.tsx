import { DoubleSide } from "three";

type FloorProps = {
	position?: [number, number, number];
	size?: [number, number];
};

export function Floor({
	position = [0, 0, 0],
	size = [30, 6],
}: FloorProps) {
	return (
		<mesh position={position} rotation-x={-Math.PI * 0.5} receiveShadow>
			<planeGeometry args={size} />
			<meshStandardMaterial color={"white"} side={DoubleSide} />
		</mesh>
	);
}
