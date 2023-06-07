import {OrbitControls} from '@react-three/drei';
import {Perf} from 'r3f-perf';
import {Physics, RigidBody, CuboidCollider, BallCollider} from '@react-three/rapier';
/* 
https://rapier.rs/docs/user_guides/javascript/getting_started_js
https://rapier.rs/javascript3d/index.html
Readme:https://github.com/pmndrs/react-three-rapier#readme
https://docs.pmnd.rs/react-three-fiber/getting-started/examples (搜索rapier)
*/

export default function Experience() {
  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <Physics debug>
        {/* RigidBody 包裹的物体具有物理效应 */}
        <RigidBody
          colliders="ball" // 需要给对应的物体添加正确的碰撞器
          /* 
          还有类型为 
          hull // 多边形
          cuboid // 立方体
          trimesh  // 三角网格,甜甜圈适用
          */
        >
          <mesh castShadow position={[-2, 4, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        <RigidBody
          //  colliders="trimesh"  // 影响性能
          colliders={false} // 即关闭物理效果
          position={[-2, 0, 0]}
          rotation-x={Math.PI * 0.5}
        >
          {/* CuboidCollider 相当于在指定位置建立了一个具有物理效果的矩形物体，只不过不可见 */}
          <CuboidCollider args={[1.5, 1.5, 0.5]} />
          {/* 球形物理物体 */}
          <BallCollider args={[1.5]} />
          <mesh castShadow>
            <torusGeometry args={[1, 0.5, 32, 100]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody>

        {/* <RigidBody>
          <mesh castShadow position={[2, 2, 0]}>
            <boxGeometry args={[3, 2, 1]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
          <mesh castShadow position={[2, 2, 3]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody> */}

        {/* 默认物体会自动下降 设置固定 */}
        <RigidBody type="fixed">
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
}
