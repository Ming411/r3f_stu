import {useGLTF, Text, Float} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import {CuboidCollider, RapierRigidBody, RigidBody} from '@react-three/rapier';
import {useMemo, useRef, useState} from 'react';
import * as THREE from 'three';
import {Vector3} from 'three';

/* 
当其为 true 时，Three.js 将对材质、纹理、灯光等进行颜色转换和处理，
以确保最终呈现的图像在不同设备上具有一致的颜色表现。
设置为 false 时，Three.js 将不会进行颜色管理，并且会直接使用应用程序中定义的颜色。
*/
THREE.ColorManagement.enabled = false; // 关闭颜色管理

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floor1Material = new THREE.MeshStandardMaterial({
  color: '#111111',
  metalness: 0,
  roughness: 0
});
const floor2Material = new THREE.MeshStandardMaterial({
  color: '#222222',
  metalness: 0,
  roughness: 0
});
const obstacleMaterial = new THREE.MeshStandardMaterial({
  color: '#ff0000',
  metalness: 0,
  roughness: 1
});
const wallMaterial = new THREE.MeshStandardMaterial({color: '#887777', metalness: 0, roughness: 0});

// 开始板块
function BlockStart({position = [0, 0, 0]}) {
  return (
    <group position={new Vector3().fromArray(position)}>
      <Float floatIntensity={0.25} rotationIntensity={0.25}>
        <Text
          font="./bebas-neue-v9-latin-regular.woff"
          maxWidth={0.25}
          lineHeight={0.75}
          textAlign="right"
          position={[0.75, 0.65, 0]}
          rotation-y={-0.25}
          scale={0.4}
        >
          coder ccc
          <meshBasicMaterial
            toneMapped={false} // 关闭色调映射
          />
        </Text>
      </Float>
      <mesh
        position={[0, -0.1, 0]}
        receiveShadow
        geometry={boxGeometry}
        material={floor1Material}
        scale={[4, 0.2, 4]}
      ></mesh>
    </group>
  );
}
// 随机板块一
function BlockSpinner({position = [0, 0, 0]}) {
  const [speed] = useState(() => Math.random() + 0.2);
  const obstacle = useRef<RapierRigidBody>(null);
  useFrame(state => {
    const time = state.clock.getElapsedTime();

    const rotation = new THREE.Quaternion();
    rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
    obstacle.current?.setNextKinematicRotation(rotation);
  });
  return (
    <group position={new Vector3().fromArray(position)}>
      <mesh
        position={[0, -0.1, 0]}
        receiveShadow
        geometry={boxGeometry}
        material={floor2Material}
        scale={[4, 0.2, 4]}
      ></mesh>

      {/* 
      dynamic：表示动态刚体，即受到外力作用会发生移动和旋转的物体，通常用于模拟弹性物体的物理行为。
      static：表示静态刚体，即不会发生运动和旋转的物体，通常用于模拟场景中的固定物体，如地面、墙壁等。
      kinematic：表示运动学刚体，即虽然可以实现运动和旋转，但是其运动状态不受外力作用的影响，需要通过程序控制其运动状态。
      */}
      <RigidBody
        ref={obstacle}
        type="kinematicPosition" // 运动学刚体
        position={[0, 0.3, 0]}
        restitution={0.2} // 弹性
        friction={0} // 摩擦力
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}
// 随机板块二
function BlockLimbo({position = [0, 0, 0]}) {
  const obstacle = useRef<RapierRigidBody>(null);
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame(state => {
    const time = state.clock.getElapsedTime();

    const y = Math.sin(time + timeOffset) + 1.15;
    obstacle.current?.setNextKinematicTranslation({
      x: position[0],
      y: position[1] + y,
      z: position[2]
    });
  });

  return (
    <group position={new Vector3().fromArray(position)}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}
// 随机板块三
export function BlockAxe({position = [0, 0, 0]}) {
  const obstacle = useRef<RapierRigidBody>(null);
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame(state => {
    const time = state.clock.getElapsedTime();

    const x = Math.sin(time + timeOffset) * 1.25;
    obstacle.current?.setNextKinematicTranslation({
      x: position[0] + x,
      y: position[1] + 0.75,
      z: position[2]
    });
  });

  return (
    <group position={new Vector3().fromArray(position)}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[1.5, 1.5, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}
// 结束板块
function BlockEnd({position = [0, 0, 0]}) {
  const hamburger = useGLTF('/hamburger.glb');

  hamburger.scene.children.forEach(mesh => {
    mesh.castShadow = true;
  });
  return (
    <group position={new Vector3().fromArray(position)}>
      <Text font="/bebas-neue-v9-latin-regular.woff" scale={1} position={[0, 2.25, 2]}>
        FINISH
        <meshBasicMaterial toneMapped={false} />
      </Text>
      <mesh
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, 0, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <RigidBody
        type="fixed"
        colliders="hull"
        position={[0, 0.25, 0]}
        restitution={0.2}
        friction={0}
      >
        <primitive object={hamburger.scene} scale={0.2} />
      </RigidBody>
    </group>
  );
}
// 墙体
function Bounds({length = 1}) {
  return (
    <>
      <RigidBody
        type="fixed"
        restitution={0.2} // 弹性
        friction={0} // 摩擦力
      >
        <mesh
          scale={[0.3, 1.5, 4 * length]}
          // box本身宽度是1，然后scale了0.3，所以宽度是0.3，为了居中，所以是0.15
          position={[2.15, 0.75, -(length * 2) + 2]}
          geometry={boxGeometry}
          material={wallMaterial}
          castShadow
          receiveShadow
        />
        <mesh
          scale={[0.3, 1.5, 4 * length]} // 每一块长度是4
          // box本身宽度是1，然后scale了0.3，所以宽度是0.3，为了居中，所以是0.15
          // -(length * 2) + 2 表示 先移动一半的运动区长度，再移动一半开始结束区的
          position={[-2.15, 0.75, -(length * 2) + 2]}
          geometry={boxGeometry}
          material={wallMaterial}
          castShadow
          receiveShadow
        />
        <mesh
          scale={[4, 1.5, 0.3]} // 每一块长度是4
          // box本身宽度是1，然后scale了0.3，所以宽度是0.3，为了居中，所以是0.15
          // -(length * 2) + 2 表示 先移动一半的运动区长度，再移动一半开始结束区的
          position={[0, 0.75, -(length * 4) + 2]}
          geometry={boxGeometry}
          material={wallMaterial}
          castShadow
          receiveShadow
        />
        {/* 底部 */}
        <CuboidCollider
          args={[2, 0.1, 2 * length]}
          position={[0, -0.1, -(length * 2) + 2]}
          restitution={0.2}
          friction={1}
        />
      </RigidBody>
    </>
  );
}

export default function Level({count = 5, types = [BlockSpinner, BlockLimbo, BlockAxe], seed = 0}) {
  const blocks = useMemo(() => {
    const blocks = [];
    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      blocks.push(type);
    }
    return blocks;
  }, [count, types, seed]);

  return (
    <>
      {/* <BlockStart position={[0, 0, 16]} />
      <BlockSpinner position={[0, 0, 12]} />
      <BlockLimbo position={[0, 0, 8]} />
      <BlockAxe position={[0, 0, 4]} />
      <BlockEnd position={[0, 0, 0]} /> */}

      <BlockStart position={[0, 0, 0]} />
      {blocks.map((Block, i) => (
        <Block key={i} position={[0, 0, -(i + 1) * 4]} />
      ))}
      <BlockEnd position={[0, 0, -(count + 1) * 4]} />

      <Bounds length={count + 2} />
    </>
  );
}
