import {useRef} from 'react';
import * as THREE from 'three';
import {
  Html,
  PivotControls,
  OrbitControls,
  TransformControls,
  Text,
  Float,
  MeshReflectorMaterial
} from '@react-three/drei';

export default function Cpn1() {
  const cube = useRef<THREE.Mesh>(null);
  const sphere = useRef<THREE.Mesh>(null);
  return (
    <>
      {/* makeDefault 可以在操作其他物体时 不移动镜头 */}
      <OrbitControls enableDamping={false} makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={0.5} />

      <ambientLight intensity={0.5} />

      {/* PivotControls 另一种物体控制器 */}
      {/* 关闭深度检测，不然辅助轴在物体里面就看不到了 */}
      <PivotControls
        anchor={[0, 0, 0]}
        depthTest={false}
        lineWidth={4}
        axisColors={['#9381ff', '#ff4d6d', '#7ae582']}
        scale={2}
      >
        <mesh position-x={2} ref={sphere}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial wireframe color="aqua" />
          {/* html默认位置就是[0,0,0] */}
          <Html
            position={[1, 1, 0]}
            // 我们可以通过自定义class来设置样式
            wrapperClass="label"
            // 旋转以html为中心
            center
            // 跟随相机近大远小
            distanceFactor={6}
            // 当碰到这两个物体时，不显示html
            occlude={[cube, sphere]}
          >
            超👍👍👍
          </Html>
        </mesh>
      </PivotControls>

      <mesh ref={cube} position-x={-2}>
        <boxGeometry />
        <meshStandardMaterial color={'purple'} />
      </mesh>
      {/*TransformControls可以给物体建立一个坐标系并可移动*/}
      {/* 
      @mode: 可选值为 'translate' | 'rotate' | 'scale' | 'shear' | 'drag' | 'none'
      */}
      <TransformControls object={cube as React.MutableRefObject<THREE.Object3D>} mode="translate" />

      <mesh position-y={-1.5} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        {/* <meshBasicMaterial color={'greenyellow'} /> */}

        {/* 镜面材质 */}
        {/* 
        @mirror: 镜面反射程度
        @resolution: 镜面分辨率
        @blur: 模糊程度
        @mixBlur: 混合程度
        @color: 镜面颜色
        */}
        <MeshReflectorMaterial
          mirror={0.5}
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={1}
          color={'greenyellow'}
        />
      </mesh>

      {/* 字体资源可以去Google中去找 */}

      {/* Float组件 会让元素具有漂浮晃动效果 */}
      <Float speed={5} floatIntensity={2}>
        <Text
          font="./bangers-v20-latin-regular.woff"
          fontSize={0.3}
          color={'salmon'}
          position-y={1}
          maxWidth={2} // 最大宽度,超过换行
          textAlign="center"
        >
          I LOVE THREE
          {/* 添加三维材质，让其颜色受光照影响 */}
          <meshNormalMaterial />
        </Text>
      </Float>
    </>
  );
}
