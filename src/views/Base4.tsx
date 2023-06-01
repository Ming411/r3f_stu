import {OrbitControls} from '@react-three/drei';
import {useControls, button} from 'leva';
import {Perf} from 'r3f-perf';
export default function Cpn1() {
  // 调试工具中将展示我们定义的属性
  const {prefVisiable} = useControls({
    prefVisiable: true
  });
  // 参数一 就是成组的属性的名字
  // 如果想创建多个文件夹就多次调用 useControls
  const {position, moreValue, color, visiable} = useControls('folder1', {
    position: {
      value: 0,
      min: -5,
      max: 5,
      step: 0.01
    },
    moreValue: {
      value: {
        x: 2,
        y: 0
      },
      step: 0.01,
      joystick: 'invertY' // 配置操纵杆Y轴反向
    },
    /**
     * 'rgb(255,6,8)'
     *'orange'
     *'#ff00ff'
     *'hsl(188deg,180%,58%)'
     *'hsla(188deg,188%,58%,0.5)'
     *{r:200,g:106,b:125,a:0.4}
     */

    color: 'purple',
    visiable: true,
    myInterval: {
      min: 0,
      max: 10,
      value: [4, 5]
    },
    clickMe: button(() => {
      console.log('click me');
    }),
    // 选择器
    choice: {
      options: ['a', 'b', 'c']
    }
  }); // 自动更新组件

  const {scale} = useControls('folder2', {
    scale: {
      value: 1,
      min: 0,
      max: 2,
      step: 0.01
    }
  });
  return (
    <>
      <color attach="background" args={['ivory']} />
      {/* 可以通过面板  查看顶点个数 线条个数 着色器等*/}
      {prefVisiable && <Perf position="top-left" />}
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={0.5} />

      <ambientLight intensity={0.5} />

      <mesh position-x={position} visible={visiable}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial wireframe color="aqua" />
      </mesh>

      <mesh position={[moreValue.x, moreValue.y, 0]} scale={scale}>
        <boxGeometry />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh position-y={-1.5} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshBasicMaterial color={'greenyellow'} />
      </mesh>
    </>
  );
}
