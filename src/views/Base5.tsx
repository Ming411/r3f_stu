import * as THREE from 'three';
import {SoftShadows, OrbitControls, useHelper, BakeShadows} from '@react-three/drei';
import {Perf} from 'r3f-perf';
import {useRef} from 'react';
import {useFrame} from '@react-three/fiber';

export default function Cpn1() {
  const directionLight = useRef<THREE.DirectionalLight>(null);

  // 添加平行光辅助线
  useHelper(
    directionLight as React.MutableRefObject<THREE.Object3D>,
    THREE.DirectionalLightHelper,
    0.2,
    'hotpink'
  );

  const cube = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (cube.current) {
      cube.current.rotation.y += delta;
    }
  });

  return (
    <>
      {/* 为了让阴影更加真实，我们需要使用软阴影，而不是默认的硬阴影 */}
      <SoftShadows
        size={100} // 阴影的大小，数值越小，阴影越清晰，但性能消耗越大
        samples={17} // 阴影的采样数，数值越大，阴影越平滑，但性能消耗越大
        focus={1} // 阴影的聚焦程度，数值越大，阴影越清晰，但性能消耗越大
      />
      {/* 用于将场景中的阴影信息预先计算并保存到贴图中，以便在运行时更快地渲染阴影，从而提高性能 */}
      {/* <BakeShadows /> */}
      <color attach="background" args={['ivory']} />
      <Perf position="top-left" />
      <OrbitControls makeDefault />

      <directionalLight
        castShadow
        ref={directionLight}
        position={[1, 2, 3]}
        intensity={1.5}
        /* 设置阴影贴图的大小，值越大，阴影越清晰 */
        shadow-mapSize={[1024 * 2, 1024 * 2]}
        /* shadow-camera 就相当于裁切灯光，控制阴影显示区域 */
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        /* 阴影相机能看到的最近和最远距离 */
        shadow-camera-near={0.1}
        shadow-camera-far={10}
      ></directionalLight>
      <ambientLight intensity={0.5} />

      <mesh castShadow position-x={-1}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial wireframe color="aqua" />
      </mesh>

      <mesh ref={cube} castShadow position-x={1}>
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
