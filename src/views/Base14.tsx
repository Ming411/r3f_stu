import {OrbitControls} from '@react-three/drei';
import {EffectComposer, Vignette, Glitch, Noise, Bloom} from '@react-three/postprocessing';
import {BlendFunction, GlitchMode} from 'postprocessing';
import * as THREE from 'three';

export default function Cpn1() {
  return (
    <>
      <color attach="background" args={['#000000']} />

      <EffectComposer>
        {/* Vignette 场景黑边特效 */}
        {/* <Vignette
          offset={0.3} // 晕影
          darkness={0.9}
          blendFunction={BlendFunction.NORMAL} // 特效混合方式
        /> */}
        {/* Glitch 场景闪烁特效 赛博朋克 */}
        {/* <Glitch
          mode={GlitchMode.CONSTANT_WILD} // 闪烁模式
          delay={new THREE.Vector2(0.5, 1)} // 闪烁延迟,分别是x,y分量
          duration={new THREE.Vector2(0.1, 0.3)} // 闪烁持续时间
          strength={new THREE.Vector2(0.02, 0.04)} // 闪烁强度
        /> */}

        {/* 老电视花屏 噪音特效 */}
        {/* 还有好多种混合效果 */}
        {/* <Noise blendFunction={BlendFunction.SOFT_LIGHT} /> */}

        {/* Bloom 特效可以用来模拟亮度较高的光源散发出的光晕效果。 */}
        {/* 
        mipmapBlur 的作用是对纹理贴图的每个下采样级别（即纹理贴图的不同尺寸）进行一定程度的模糊处理
        从而减少锯齿和其他图像伪影。
        */}
        <Bloom
          mipmapBlur
          intensity={0.1} // 强度
          luminanceThreshold={0} // 亮度阈值,表示只要亮度大于0就会产生光晕效果
        />
      </EffectComposer>

      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={0.5} />

      <ambientLight intensity={0.5} />

      <mesh position-x={2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="aqua" />
      </mesh>

      <mesh position-x={-2}>
        <boxGeometry />
        {/* 这种设置  受光照影响 */}
        {/* <meshStandardMaterial
          color={[5, 1, 4]} // rgb颜色,普通设置颜色的方式无效，例如red
          toneMapped={false} // 关闭色调映射,搭配bloom特效
        /> */}

        {/* 这种不会，四周均匀发光 */}
        {/* <meshStandardMaterial
          color={'orange'}
          emissive={'orange'} // 发光颜色
          emissiveIntensity={2} // 发光强度
          toneMapped={false}
        /> */}

        {/* 基础材质无法设置发光颜色 rbg值越大越亮*/}
        <meshBasicMaterial color={[1.5, 1, 4]} toneMapped={false} />
      </mesh>

      <mesh position-y={-1.5} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshBasicMaterial color={'greenyellow'} />
      </mesh>
    </>
  );
}
