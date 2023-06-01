import * as THREE from 'three';
import {OrbitControls, useHelper, BakeShadows} from '@react-three/drei';
import {Perf} from 'r3f-perf';
import {useRef} from 'react';
export default function Cpn1() {
  const directionLight = useRef<THREE.DirectionalLight>(null);

  // 添加平行光辅助线
  useHelper(
    directionLight as React.MutableRefObject<THREE.Object3D>,
    THREE.DirectionalLightHelper,
    0.2,
    'hotpink'
  );

  return (
    <>
      {/* 用于将场景中的阴影信息预先计算并保存到贴图中，以便在运行时更快地渲染阴影，从而提高性能 */}
      <BakeShadows />
      <color attach="background" args={['ivory']} />
      <Perf position="top-left" />
      <OrbitControls makeDefault />

      <directionalLight
        castShadow
        ref={directionLight}
        position={[1, 2, 3]}
        intensity={1.5}
        shadow-mapSize={[1024 * 2, 1024 * 2]} // 设置阴影贴图的大小，值越大，阴影越清晰
      ></directionalLight>
      <ambientLight intensity={0.5} />

      <mesh castShadow position-x={-1}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial wireframe color="aqua" />
      </mesh>

      <mesh castShadow position-x={1}>
        <boxGeometry />
        <meshStandardMaterial color={'purple'} />
      </mesh>

      <mesh receiveShadow position-y={-1.1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color={'greenyellow'} />
        {/* <shadowMaterial transparent opacity={0.4} /> */}
      </mesh>
    </>
  );
}
