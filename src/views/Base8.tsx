import * as THREE from 'three';
import {
  ContactShadows,
  Environment,
  Lightformer,
  OrbitControls,
  Sky,
  Stage,
  useHelper
} from '@react-three/drei';
import {useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import {Perf} from 'r3f-perf';
import {useControls} from 'leva';
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

  // 可以将平行光的位置和太阳位置绑定成一个，这样就可以通过太阳位置来控制平行光的位置
  const {sunPosition} = useControls('sky', {
    sunPosition: {
      value: [1, 1, 1],
      step: 0.1,
      min: -10,
      max: 10
    }
  });
  const {envMapIntensity} = useControls('envMapIntensity', {
    envMapIntensity: {
      value: 3.5,
      step: 0.1,
      min: 0,
      max: 10
    }
  });

  return (
    <>
      {/* 不需要开启canvas阴影 */}
      {/* ContactShadows 用于在模型与地面接触处生成阴影 */}
      <ContactShadows
        position={[0, -0.99, 0]}
        resolution={1024} // 阴影贴图的分辨率
        scale={10}
        blur={1} // 模糊程度
        frames={Infinity} // 阴影贴图的帧数
      />

      <Perf position="top-left" />
      <color attach="background" args={['ivory']} />
      <OrbitControls makeDefault />

      <Stage
        shadows={{
          type: 'contact',
          opacity: 0.5,
          blur: 3
        }}
      >
        <mesh castShadow position-x={-1}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="aqua" envMapIntensity={envMapIntensity} />
        </mesh>

        <mesh ref={cube} castShadow position-x={1}>
          <boxGeometry />
          <meshStandardMaterial color={'purple'} envMapIntensity={envMapIntensity} />
        </mesh>
      </Stage>
    </>
  );
}
