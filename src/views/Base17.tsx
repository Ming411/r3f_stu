import {
  Text,
  ContactShadows,
  Environment,
  Float,
  Html,
  PresentationControls,
  useGLTF
} from '@react-three/drei';

export default function Cpn1() {
  const computer = useGLTF('./model/computer.gltf');
  return (
    <>
      <Environment preset="city" />

      <color attach="background" args={['#171720']} />

      {/* <OrbitControls makeDefault /> */}

      {/* PresentationControls 只能操作包裹的物体 */}
      {/* 添加css  touch-action: none; 因为手机端 自带的滑动是返回和刷新等，需要禁用 */}
      <PresentationControls
        global
        rotation={[0.13, 0.8, 0]}
        polar={[-0.4, 0.5]} // 俯仰角，水平角  初始化视角
        azimuth={[-1, 0.75]} // 方位角，水平角   限制最大操作角度
        config={{
          mass: 2, // 质量
          tension: 400 // 张力,弹簧的那种回弹效果
        }}
        snap={{mass: 4, tension: 400}} // snap 使得物体回到初始位置
      >
        <Float
          rotationIntensity={0.4} // 旋转强度
        >
          {/* 添加一个矩形灯光区域来模式屏幕发出的光 */}
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color={'#ff6900'}
            rotation={[0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]}
          />
          <primitive object={computer.scene} position-y={-1.2}>
            <Html
              transform // transform 使得 iframe 跟随物体旋转
              wrapperClass="htmlScreen" // 可以通过css设置样式
              distanceFactor={1.17} // 距离因子，根据距离缩放
              // 调整位置让其贴上屏幕
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
            >
              <iframe src="https://bruno-simon.com/html/" />
            </Html>
          </primitive>
          <Text
            font="./bangers-v20-latin-regular.woff"
            fontSize={1}
            position={[2, 0.75, 0.75]}
            rotation-y={-1.25}
            // children={'coder\rccc'}  // 这种写法和写在标签内的效果一样
            maxWidth={2}
            textAlign="center"
          >
            coder ccc
          </Text>
        </Float>
      </PresentationControls>

      {/* ContactShadows  用于在三维场景中添加实时的接触阴影*/}
      <ContactShadows position-y={-1.4} opacity={0.2} scale={5} blur={2.4} />
    </>
  );
}
