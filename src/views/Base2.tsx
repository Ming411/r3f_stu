import {extend, useFrame, useThree} from '@react-three/fiber';
import {useRef} from 'react';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import CustomObject from './CustomObject';
extend({OrbitControls: OrbitControls}); // 先继承原生控制器
export default function Cpn1() {
  const {camera, gl} = useThree();
  const cubeRef = useRef<THREE.Mesh>(null); // 获取实体
  useFrame((state, delta) => {
    // 相当于 requestAnimationFrame
    // 此处这里state中可以获取相机等各种属性
    // elapsedTime 已过时间
    // console.log(state.camera, state.clock.elapsedTime);

    const angle = state.clock.elapsedTime;
    camera.position.x = Math.sin(angle) * 3;
    camera.position.z = Math.cos(angle) * 3;
    camera.lookAt(0, 0, 0);

    if (cubeRef.current) {
      cubeRef.current.rotation.y += delta;
    }
  });
  return (
    <>
      {/* 必须指定相机和 渲染场景 */}
      <orbitControls args={[camera, gl.domElement]} />
      <directionalLight position={[1, 2, 3]} intensity={0.5} />
      {/* ambientLight是一种Three.js中的光源类型，它可以用来模拟环境光。 */}
      <ambientLight intensity={0.5} />
      {/* 这些代码都需要写在Canvas组件里面 */}
      <group>
        <mesh position-x={2} scale={1.1}>
          {/* 半径  分隔份数 */}
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial wireframe color="aqua" />
        </mesh>
        <mesh ref={cubeRef} position-x={-2}>
          <boxGeometry />
          <meshStandardMaterial color={'purple'} />
        </mesh>
      </group>
      {/* 旋转90度 */}
      <mesh position-y={-1.5} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshBasicMaterial color={'greenyellow'} />
      </mesh>
      <CustomObject />
    </>
  );
}
