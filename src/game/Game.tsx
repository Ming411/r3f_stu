import {OrbitControls} from '@react-three/drei';
import Lights from './Lights.jsx';
import Level from './Level.js';
import {Physics} from '@react-three/rapier';
import Player from './Player.js';
import {useGame} from './store/useGame.js';
import Effects from './Effects.js';
export default function Game() {
  const blocksCount = useGame(state => state.blocksCount);
  const blocksSeed = useGame(state => state.blocksSeed);
  return (
    <>
      <color args={['#252731']} attach="background" />
      <OrbitControls makeDefault />
      <Effects />
      <Physics debug>
        <Lights />
        <Level count={blocksCount} seed={blocksSeed} />
        <Player />
      </Physics>
    </>
  );
}
