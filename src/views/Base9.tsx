import {OrbitControls} from '@react-three/drei';
import {Perf} from 'r3f-perf';
// import Model from './Model';
// import Humburger from './Humburger';
import Fox from './Fox';
import {Suspense} from 'react';
export default function Cpn1() {
  return (
    <>
      <Perf position="top-left" />
      <color attach="background" args={['ivory']} />
      <OrbitControls makeDefault />

      <directionalLight
        position={[1, 2, 3]}
        intensity={1.5}
        castShadow
        shadow-normalBias={0.04} // 消除模型阴影的锯齿
      />

      <mesh receiveShadow position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      <Suspense
        fallback={
          // loading 时的占位元素
          // scale 缩放xyz
          <mesh position-y={0.5} scale={[2, 3, 2]}>
            {/* args 分割份数 */}
            <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
            <meshBasicMaterial wireframe color="red" />
          </mesh>
        }
      >
        {/* 可以异步加载模型 */}
        {/* <Model /> */}
        {/* <Humburger scale={0.35} /> */}
        <Fox />
      </Suspense>
    </>
  );
}
