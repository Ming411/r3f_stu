import {Center, OrbitControls, Text3D, useMatcapTexture} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import {Perf} from 'r3f-perf';
import {useEffect, useRef} from 'react';
import THREE, {MeshMatcapMaterial, TorusGeometry} from 'three';

const torusGeometry2 = new TorusGeometry(1, 0.6, 16, 32);
const material2 = new MeshMatcapMaterial();

export default function Cpn1() {
  const matcapTexture = useMatcapTexture('394641_B1A67E_75BEBE_7D7256', 256);

  const donuts = useRef<THREE.Mesh[]>([]);

  useFrame((_, delta) => {
    for (const donut of donuts.current) {
      donut.rotation.y += delta * 0.2;
    }
  });
  useEffect(() => {
    material2.matcap = matcapTexture[0];
    material2.needsUpdate = true; // 必须要设置这个属性,否则不会更新
  }, []);

  return (
    <>
      <Perf position={'top-left'} />

      <OrbitControls makeDefault />

      <Center>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.75} // 字体大小
          height={0.2} // 字体厚度
          curveSegments={12} // 曲线分段数
          bevelEnabled // 是否开启斜角,拐角处更加圆滑
          bevelThickness={0.02} // 斜角厚度
          bevelSize={0.02} // 斜角大小
          bevelOffset={0} // 斜角偏移
          bevelSegments={5} // 斜角分段数
        >
          HELLO R3F
          <meshMatcapMaterial matcap={matcapTexture[0]} />
        </Text3D>
      </Center>

      {[...Array(100)].map((_, index) => (
        <mesh
          ref={element => (donuts.current[index] = element)}
          geometry={torusGeometry2}
          material={material2}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
          ]}
          key={index}
          scale={0.2 + Math.random() * 0.2}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        />
      ))}
    </>
  );
}
