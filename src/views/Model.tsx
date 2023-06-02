import {Clone, useGLTF} from '@react-three/drei';
import {useLoader} from '@react-three/fiber';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

// useGLTF.preload('./FlightHelmet/glTF/FlightHelmet.gltf');

export default function Model() {
  // const model = useLoader(GLTFLoader, './FlightHelmet/glTF/FlightHelmet.gltf');
  const model = useGLTF('./hamburger-draco.glb');
  return (
    <>
      {/* <primitive object={model.scene} scale={0.35} position-y={-1} /> */}
      <Clone object={model.scene} scale={0.35} position-x={-4} />
      <Clone object={model.scene} scale={0.35} position-x={0} />
      <Clone object={model.scene} scale={0.35} position-x={4} />
    </>
  );
}
