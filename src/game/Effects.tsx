import {DepthOfField, EffectComposer, SSR} from '@react-three/postprocessing';

export default function Effects() {
  return (
    <EffectComposer>
      {/* ssr需要搭配物体的材质 配置才能生效 */}
      <SSR
        intensity={0.45}
        thickness={10}
        ior={0.45}
        maxRoughness={1}
        maxDepthDifference={10}
        blurSharpness={10}
        jitter={0.75}
      />
      <DepthOfField
        focusDistance={0.01} // 聚焦距离
        focalLength={0.2} // 焦距
        bokehScale={3} // 背景虚化程度
      />
    </EffectComposer>
  );
}
