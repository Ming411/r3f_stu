import {OrbitControls} from '@react-three/drei';

export default function Cpn1() {
  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={0.5} />

      <ambientLight intensity={0.5} />

      <mesh position-x={2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="aqua" />
      </mesh>

      <mesh position-x={-2}>
        <boxGeometry />
        <meshStandardMaterial color={'purple'} />
      </mesh>

      <mesh position-y={-1.5} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshBasicMaterial color={'greenyellow'} />
      </mesh>
    </>
  );
}
