import {useKeyboardControls} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import {RapierRigidBody, RigidBody, useRapier} from '@react-three/rapier';
import {useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import {useGame} from './store/useGame';
//  操控 球
export default function Player() {
  const body = useRef<RapierRigidBody>(null);
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const {rapier, world} = useRapier();

  const [smoothedCameraPosition] = useState(() => new THREE.Vector3(10, 10, 10));
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  // 用于判断是否已到达终点
  const start = useGame(state => state.start);
  const restart = useGame(state => state.restart);
  const end = useGame(state => state.end);
  const blocksCount = useGame(state => state.blocksCount);

  // 控制重复快速点击时的bug
  const jump = () => {
    const origin = body.current?.translation(); // 获取球的位置
    if (!origin) return;
    origin.y -= 0.31; // 球半径是0.3 从球的底部发射射线
    const direction = {x: 0, y: -1, z: 0}; // 射线方向
    const ray = new rapier.Ray(origin, direction); // 创建射线
    const hit = world.castRay(
      ray,
      10, // 射线长度
      true // 是否检测碰撞组件
    ); // 射线碰撞检测
    // hit.toi 碰撞时间
    if (hit && hit.toi < 0.15) {
      // 碰撞时间小于0.15 说明球在地面上
      body.current?.applyImpulse({x: 0, y: 0.5, z: 0}, true);
    }
  };

  const reset = () => {
    body.current?.setTranslation({x: 0, y: 1, z: 0}, true); // 重置球的位置
    body.current?.setLinvel({x: 0, y: 0, z: 0}, true); // 重置球的线速度
    body.current?.setAngvel({x: 0, y: 0, z: 0}, true); // 重置球的角速度
  };
  useEffect(() => {
    // 监听游戏状态
    const unsubscribeReset = useGame.subscribe(
      state => state.phase,
      value => {
        if (value === 'ready') {
          // 当游戏状态再次被设置成ready时 重置球的位置
          reset();
        }
      }
    );

    const unsubscribeJump = subscribeKeys(
      state => state.jump, // 监听jump键
      value => {
        // 按下true  抬起false
        if (value) jump();
      }
    );
    const unsubscribeAny = subscribeKeys(() => {
      // 按下任意键开始游戏
      start();
    });
    return () => {
      unsubscribeJump();
      unsubscribeAny();
      unsubscribeReset();
    }; // 组件卸载时取消监听
  }, []);

  useFrame((state, delta) => {
    const {forward, backward, leftward, rightward} = getKeys();

    const impulse = {x: 0, y: 0, z: 0};
    const torque = {x: 0, y: 0, z: 0};
    //  不同性能设置 强度不同
    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

    // 为了防止运动的太快 可以添加阻尼linearDamping配置
    if (forward) {
      impulse.z -= impulseStrength; // 冲量
      torque.x -= torqueStrength; // 扭矩
    }
    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }
    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }
    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    body.current?.applyImpulse(impulse, true); // 施加冲量
    body.current?.applyTorqueImpulse(torque, true); // 施加扭矩冲量

    // 相机跟随
    const bodyPosition = body.current?.translation();
    const cameraPosition = new THREE.Vector3(); // 相机位置
    const cameraTarget = new THREE.Vector3(); // 相机目标
    if (bodyPosition) {
      cameraPosition.copy(bodyPosition as THREE.Vector3);
      cameraPosition.z += 2.25;
      cameraPosition.y += 0.65;

      cameraTarget.copy(bodyPosition as THREE.Vector3);
      cameraTarget.y += 0.25;

      /* 通过插值可以让相机过渡更加平滑 */
      smoothedCameraPosition.lerp(cameraPosition, 5 * delta); // lerp 线性插值
      smoothedCameraTarget.lerp(cameraTarget, 5 * delta);
      state.camera.position.copy(smoothedCameraPosition);
      state.camera.lookAt(smoothedCameraTarget);

      // state.camera.position.copy(cameraPosition);
      // state.camera.lookAt(cameraTarget);

      // 判断是否到达终点
      if (bodyPosition.z < -(blocksCount * 4 + 2)) {
        end(); // 到达终点
      }
      if (bodyPosition.y < -4) {
        restart(); // 掉下去了
      }
    }
  });
  return (
    <>
      <RigidBody
        ref={body}
        colliders="ball"
        position={[0, 1, 0]}
        linearDamping={0.5} // 线性阻尼
        angularDamping={0.5} // 角阻尼
        restitution={0.2} // 弹性
        friction={1} // 摩擦力
      >
        <mesh castShadow>
          <icosahedronGeometry args={[0.3, 1]} />
          <meshStandardMaterial
            flatShading // 平面着色
            color="mediumpurple"
          />
        </mesh>
      </RigidBody>
    </>
  );
}
