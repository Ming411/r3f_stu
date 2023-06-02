import * as THREE from 'three';
import {
  ContactShadows,
  Environment,
  Lightformer,
  OrbitControls,
  Sky,
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
      {/* 天空盒 */}
      {/* <Sky
        sunPosition={sunPosition} // 太阳位置
      /> */}

      <Environment
        background
        // resolution={32} // 环境贴图的分辨率
        preset="sunset" // 预设值
        ground={{
          height: 7, // 环境贴图高度
          radius: 28, // 环境贴图半径
          scale: 100 // 地面纹理缩放
        }}
      >
        {/* <color attach={'background'} args={['black']} /> */}
        {/* <Lightformer
          position-z={-5}
          scale={10}
          color="red"
          intensity={10}
          form={'ring'} // 光源形状
        /> */}
        {/* 在env中的物体会对其它物体产生环境影响 */}
        {/* <mesh position-z={-5} scale={10}>
          <planeGeometry />
          <meshBasicMaterial color={[10, 0, 0]} />
        </mesh> */}
      </Environment>

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

      {/* <directionalLight
        castShadow
        ref={directionLight}
        position={sunPosition}
        intensity={1.5}
        shadow-mapSize={[1024 * 2, 1024 * 2]}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-camera-near={0.1}
        shadow-camera-far={10}
      ></directionalLight> */}

      <mesh castShadow position-x={-1}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="aqua" envMapIntensity={envMapIntensity} />
      </mesh>

      <mesh ref={cube} castShadow position-x={1}>
        <boxGeometry />
        <meshStandardMaterial color={'purple'} envMapIntensity={envMapIntensity} />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color={'greenyellow'} envMapIntensity={envMapIntensity} />
        {/* <shadowMaterial transparent opacity={0.4} /> */}
      </mesh>
    </>
  );
}
