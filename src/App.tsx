import * as THREE from 'three';
import {Canvas} from '@react-three/fiber';
import Cpn from './views/Base19';

export default function App() {
  const cameraSettings = {
    // zoom: 100, // 场景放大
    fov: 75,
    near: 0.1,
    far: 200,
    position: new THREE.Vector3(3, 2, 6)
  };
  // const created = ({gl, scene}: {gl: THREE.WebGLRenderer; scene: THREE.Scene}) => {
  //   // canvas创建完毕
  //   /*
  //   如果您想要设置场景中的背景颜色，应该使用 scene.background
  //   如果您想要设置 WebGL 渲染器的清空颜色，应该使用 gl.setClearColor。
  //   */
  //   gl.setClearColor('red', 1); // 颜色 透明度
  //   scene.background = new THREE.Color('purple');
  // };
  return (
    <>
      <Canvas
        flat // 相当于开启 色调映射  Tonemapping（亮的地方亮，暗的地方暗）
        shadows={true} // 开启阴影
        camera={cameraSettings}
        // onPointerMissed={() => console.log('missed')}
        gl={{
          antialias: true // 抗锯齿开
          // toneMapping: THREE.ACESFilmicToneMapping // 色调映射
        }}
        // onCreated={created}
      >
        <Cpn />
      </Canvas>
    </>
  );
}
