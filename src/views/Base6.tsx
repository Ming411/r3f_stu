import * as THREE from 'three';
import {RandomizedLight, OrbitControls, useHelper, AccumulativeShadows} from '@react-three/drei';
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
  useFrame((state, delta) => {
    if (cube.current) {
      const time = state.clock.elapsedTime;
      cube.current.position.x = 2 + Math.sin(time);
      cube.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <>
      <color attach="background" args={['ivory']} />
      <Perf position="top-left" />
      <OrbitControls makeDefault />

      {/* AccumulativeShadows 允许多个物体的阴影在一起累积，从而创建更加真实的阴影效果。 */}
      <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={10}
        color="#316d39" // 阴影颜色
        opacity={0.8}
        frames={Infinity} // 帧数, Infinity 这样就可以让阴影一直动态变化
        temporal // 临时抗锯齿，提高阴影质量
        blend={100} // 混合,解决阴影闪烁问题
      >
        {/* 随机光线 */}
        <RandomizedLight
          amount={8} // 光线数量
          radius={1} // 光线半径
          ambient={0.5} // 环境光
          intensity={1} // 光线强度
          bias={-0.0001} // 偏移
          position={[1, 2, 3]}
        />
      </AccumulativeShadows>

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

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color={'greenyellow'} />
        {/* <shadowMaterial transparent opacity={0.4} /> */}
      </mesh>
    </>
  );
}
