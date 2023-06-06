import {OrbitControls, meshBounds, useGLTF} from '@react-three/drei';
import {ThreeEvent} from '@react-three/fiber';
import {useRef} from 'react';
import {MeshStandardMaterial} from 'three';

export default function Cpn1() {
  const hamburger = useGLTF('./hamburger.glb');
  const cube = useRef<THREE.Mesh>(null);
  const eventHandler = () => {
    // console.log(event);
    cube.current &&
      (cube.current.material as MeshStandardMaterial).color.set(
        `hsl(${Math.random() * 360}, 100%, 75%)`
      );
  };
  return (
    <>
      {/* makeDefault 可以在操作其他物体时 不移动镜头 */}
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={0.5} />

      <ambientLight intensity={0.5} />

      <mesh
        position-x={2}
        onClick={ev => {
          ev.stopPropagation(); // 解决点击穿透问题
        }}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial wireframe color="aqua" />
      </mesh>

      <mesh
        position-x={-2}
        ref={cube}
        // raycast={meshBounds} // 只有在这个范围内才会触发事件 包围球
        onClick={eventHandler}
        // onContextMenu={eventHandler} // 右键
        // onPointerMissed 一般绑定在canvas上，可以判断鼠标是否点击到没有注册事件的物体上
        // 还有事件 onPointerDown onPointerUp onPointerOver onPointerOut onPointerEnter onPointerLeave onPointerMove onPointerMissed
        onPointerEnter={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => {
          document.body.style.cursor = 'default';
        }}
      >
        <boxGeometry />
        <meshStandardMaterial color={'purple'} />
      </mesh>

      <mesh position-y={-1.5} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshBasicMaterial color={'greenyellow'} />
      </mesh>

      <primitive
        object={hamburger.scene}
        scale={0.25}
        position-y={0.5}
        onClick={(event: ThreeEvent<MouseEvent>) => {
          console.log(event.object);
          event.stopPropagation(); // 模型中的每个模块都是由很多geometry组成
        }}
      />
    </>
  );
}
