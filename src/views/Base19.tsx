import {OrbitControls, useGLTF} from '@react-three/drei';
import {Perf} from 'r3f-perf';
import {
  CuboidCollider,
  CylinderCollider,
  InstancedRigidBodies,
  InstancedRigidBodyProps,
  Physics,
  RapierRigidBody,
  RigidBody
} from '@react-three/rapier';
import {useEffect, useMemo, useRef, useState} from 'react';
import {useFrame} from '@react-three/fiber';
import * as THREE from 'three';

export default function Experience() {
  const cube = useRef<RapierRigidBody>(null);
  const twister = useRef<RapierRigidBody>(null);

  const [hitSound] = useState(() => new Audio('./hit.mp3'));
  const hamburger = useGLTF('./hamburger.glb');

  const cubeJump = () => {
    const mass = cube.current?.mass();
    // applyImpulse 给物体添加作用力
    mass && cube.current?.applyImpulse({x: 0, y: 5 * mass, z: 0}, true); // 向上
    cube.current?.applyTorqueImpulse({x: 0, y: 1, z: 0}, true); // 旋转
  };

  useFrame(state => {
    const time = state.clock.getElapsedTime();

    const eulerRotation = new THREE.Euler(0, time * 3, 0); // 欧拉角
    const quaternionRotation = new THREE.Quaternion(); // 四元数
    quaternionRotation.setFromEuler(eulerRotation); // 从欧拉角设置四元数
    twister.current?.setNextKinematicRotation(quaternionRotation); // 设置旋转

    const angle = time * 0.5;
    const x = Math.cos(angle) * 2;
    const z = Math.sin(angle) * 2;
    twister.current?.setNextKinematicTranslation({x: x, y: -0.8, z: z}); // 设置位置
  });

  const collisionEnter = () => {
    // hitSound.currentTime = 0; // 重置音频
    // hitSound.volume = Math.random() * 0.5 + 0.5; // 音量
    // hitSound.play(); // 需要用户交互才能播放，即在碰撞前需要先点击一下页面
    // console.log('碰撞了');
  };

  const cubesCount = 3;
  const rigidBodies = useRef<RapierRigidBody[]>(null);
  const instances = useMemo(() => {
    const instances: InstancedRigidBodyProps[] = [];
    // 设置每个物体的位置和旋转
    for (let i = 0; i < cubesCount; i++) {
      instances.push({
        key: 'instance_' + Math.random(),
        position: [Math.random() * 3, Math.random() * 3, Math.random() * 3],
        rotation: [Math.random(), Math.random(), Math.random()],
        scale: [Math.random(), Math.random(), Math.random()]
      });
    }
    return instances;
  }, []);

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <Physics
        debug
        gravity={[
          0, // x
          -9.8, // y 负数则表示向下的引力
          0 // z
        ]}
      >
        {/* 在虚拟物理世界中  物体重量越大并不表示下落速度越快，
        即使重量不同，默认的下降速度是相同的 */}

        <RigidBody colliders="ball" position={[-2, 2, 0]}>
          <mesh castShadow>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        <RigidBody
          ref={cube}
          position={[2, 2, 0]}
          gravityScale={1} // 重力系数,数值越大表示越重
          restitution={0} // 弹性系数,数值越大表示越弹
          friction={0.7} // 摩擦系数,越大越粗糙，一般相对物体都要设置
          colliders={false} // 是否开启碰撞器,即是否开启物理效果,关闭后可自定义碰撞器
          onCollisionEnter={collisionEnter} // 碰撞开始
          // onCollisionExit={() => console.log('')} // 碰撞结束
          onSleep={() => console.log('睡着了')} //
          onWake={() => console.log('醒来了')} //
        >
          <mesh castShadow onClick={cubeJump}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
          {/* 碰撞器大小为什么是物体的两倍大小？ */}
          <CuboidCollider mass={2} args={[0.5, 0.5, 0.5]} />
        </RigidBody>

        <RigidBody
          type="fixed"
          position-y={-1.25}
          friction={0.7} // 默认值就是 0.7
        >
          <mesh receiveShadow>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>

        <RigidBody
          ref={twister}
          type="kinematicPosition" // 运动学刚体,通过设置四元数可以控制物体的运动
          friction={0}
          rotation-y={Math.PI}
          position-y={-0.8}
        >
          <mesh receiveShadow>
            <boxGeometry args={[0.4, 0.4, 3]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        <RigidBody colliders={false} position={[0, 3, 0]}>
          <primitive object={hamburger.scene} scale={0.25} />
          <CylinderCollider args={[0.5, 1.25]} position={[0, 0.4, 0]} />
        </RigidBody>

        {/* instancedMesh 用于渲染大量相同的物体，整体只会被看作是一个  */}
        <InstancedRigidBodies ref={rigidBodies} instances={instances}>
          <instancedMesh args={[undefined, undefined, cubesCount]} castShadow>
            <boxGeometry />
            <meshStandardMaterial color="orangered" />
          </instancedMesh>
        </InstancedRigidBodies>

        {/* 四周墙体 */}
        <RigidBody type="fixed">
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.25]} />
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.25]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[5.25, 1, 0]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[-5.25, 1, 0]} />
        </RigidBody>
      </Physics>
    </>
  );
}
