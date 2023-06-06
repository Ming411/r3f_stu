import {OrbitControls} from '@react-three/drei';
import Drunk from './custom_postprocessing/Drunk';
import {EffectComposer} from '@react-three/postprocessing';
import {useRef} from 'react';
import {BlendFunction} from 'postprocessing';
export default function Cpn1() {
  const drunkRef = useRef(null);
  return (
    <>
      <EffectComposer>
        <Drunk ref={drunkRef} frequency={2} amplitude={0.1} blendFunction={BlendFunction.DARKEN} />
      </EffectComposer>

      <color attach="background" args={['#ffffff']} />

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
