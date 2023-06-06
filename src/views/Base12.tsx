import {
  shaderMaterial,
  Center,
  OrbitControls,
  Sparkles,
  useGLTF,
  useTexture
} from '@react-three/drei';
import {Perf} from 'r3f-perf';
import {GLTF} from 'three/examples/jsm/loaders/GLTFLoader.js';
import vertex from '../shaders/portal/vertex.glsl';
import fragment from '../shaders/portal/fragment.glsl';
import * as THREE from 'three';
import {extend, useFrame} from '@react-three/fiber';
import {useRef} from 'react';

const PortalMaterial = shaderMaterial(
  // 这是由drei提供的shaderMaterial
  {
    uTime: 0,
    uColorStart: new THREE.Color('#ffffff'),
    uColorEnd: new THREE.Color('#000000')
  },
  vertex,
  fragment
);
extend({PortalMaterial}); // 然后就能 <PortalMaterial /> 了
interface IMyModel extends GLTF {
  nodes: {
    baked: THREE.Mesh;
    poleLightA: THREE.Mesh;
    poleLightB: THREE.Mesh;
    portalLight: THREE.Mesh;
  };
}

export default function Cpn1() {
  const model = useGLTF('./model/portal.glb') as IMyModel;

  const bakedTexture = useTexture('./model/baked.jpg');
  /* 
  在纹理坐标系中，通常情况下，(0,0)处代表纹理图片的左下角，而(1,1)处则代表右上角。
  但是，在有些情况下，纹理坐标系可能与我们期望的方向相反，即(0,0)处是纹理图片的右上角，(1,1)处则是左下角。
  这种情况下，需要通过将纹理翻转来调整纹理的朝向，以便正确地贴图。
  */
  bakedTexture.flipY = false; // 纹理翻转

  const portalMaterialRef = useRef(null);

  useFrame((_, delta) => {
    portalMaterialRef.current!.uTime += delta;
  });
  return (
    <>
      <OrbitControls makeDefault />

      <Perf position={'top-left'} />

      <color attach="background" args={['#171720']} />

      <Center>
        <mesh geometry={model.nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>

        {/* 将模型中灯设置到指定位置 */}
        <mesh geometry={model.nodes.poleLightA.geometry} position={model.nodes.poleLightA.position}>
          <meshBasicMaterial color={'aqua'} />
        </mesh>
        <mesh geometry={model.nodes.poleLightB.geometry} position={model.nodes.poleLightB.position}>
          <meshBasicMaterial color={'aqua'} />
        </mesh>

        <mesh
          geometry={model.nodes.portalLight.geometry}
          position={model.nodes.portalLight.position}
          rotation={model.nodes.portalLight.rotation}
        >
          {/* 如何应用着色器,这里的shaderMaterial是R3F的*/}
          {/* <shaderMaterial
            vertexShader={vertex}
            fragmentShader={fragment}
            uniforms={{
              uTime: {value: 0},
              uColorStart: {value: new THREE.Color('#ffffff')},
              uColorEnd: {value: new THREE.Color('#000000')}
            }}
          /> */}
          <portalMaterial ref={portalMaterialRef} /> {/* 效果与原生sharderMaterial相同 */}
        </mesh>

        {/* 萤火虫 */}
        <Sparkles size={6} scale={[4, 2, 4]} position-y={1} speed={0.2} count={40} />
      </Center>
    </>
  );
}
