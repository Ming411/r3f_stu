import {Canvas} from '@react-three/fiber';
import Game from './Game';
import {KeyboardControls} from '@react-three/drei';
import Interface from './Interface';

export default function App() {
  return (
    <KeyboardControls
      map={[
        {
          name: 'forward',
          keys: ['KeyW', 'ArrowUp']
        },
        {
          name: 'backward',
          keys: ['KeyS', 'ArrowDown']
        },
        {
          name: 'leftward',
          keys: ['KeyA', 'ArrowLeft']
        },
        {
          name: 'rightward',
          keys: ['KeyD', 'ArrowRight']
        },
        {
          name: 'jump',
          keys: ['Space']
        }
      ]}
    >
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          // position: [2.5, 4, 6]
          position: [3, 4, 20]
        }}
      >
        <Game />
      </Canvas>
      <Interface />
    </KeyboardControls>
  );
}
