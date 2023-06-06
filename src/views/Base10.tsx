import {Center, OrbitControls, Text3D, useMatcapTexture} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import {Perf} from 'r3f-perf';
import {Ref, useEffect, useRef, useState} from 'react';
import THREE, {MeshMatcapMaterial, TorusGeometry} from 'three';

const torusGeometry2 = new TorusGeometry(1, 0.6, 16, 32);
const material2 = new MeshMatcapMaterial();

export default function Cpn1() {
  // https://github.com/nidorx/matcaps/tree/master   可以在这里找到更多的matcap
  const matcapTexture = useMatcapTexture('394641_B1A67E_75BEBE_7D7256', 256);

  const [torusGeometry, setTorusGeometry] = useState();
  const [material, setMaterial] = useState();

  const donutsGroup = useRef<THREE.Group>(null);

  useFrame((state, delate) => {
    for (const donut of donutsGroup.current!.children) {
      donut.rotation.x += 0.01;
      donut.rotation.y += 0.01;
    }
  });
  useEffect(() => {
    // 当色彩出现偏差时,可以尝试设置编码格式
    // matcapTexture[0].encoding = THREE.sRGBEncoding; // 设置编码格式
    // matcapTexture[0].needsUpdate = true;

    material2.matcap = matcapTexture[0];
    material2.needsUpdate = true; // 必须要设置这个属性,否则不会更新
  }, []);

  return (
    <>
      <Perf position={'top-left'} />

      <OrbitControls makeDefault />

      {/* Center 组件包裹可以让物体快速居中 */}
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

      <torusGeometry
        // 相当于 setTorusGeometry(<torusGeometry... />)
        ref={setTorusGeometry as unknown as Ref<TorusGeometry>}
        args={[
          1, // 半径
          0.6, // 管道半径
          16, // 管道分段数
          32 // 环分段数
        ]}
      />
      <meshMatcapMaterial
        ref={setMaterial as unknown as Ref<MeshMatcapMaterial>}
        matcap={matcapTexture[0]}
      />

      <group ref={donutsGroup}>
        {/* 直接遍历创建会生成100个geometry,性能不好,需要单独将geometry提取出去 */}
        {[...Array(100)].map((_, index) => (
          <mesh
            // geometry={torusGeometry}
            // material={material}
            /* 可以使用原生也可以使用r3f中的 */
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
      </group>
    </>
  );
}
