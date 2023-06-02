import {useGLTF, useAnimations} from '@react-three/drei';
import {useControls} from 'leva';
import {useEffect} from 'react';

export default function Fox() {
  const fox = useGLTF('./Fox/glTF/Fox.gltf');
  const animations = useAnimations(fox.animations, fox.scene);
  const {animationName} = useControls({
    animationName: {options: animations.names}
  });

  useEffect(() => {
    const action = animations.actions[animationName]; // Run Walk Survey
    // action && action.play();
    action?.reset().fadeIn(0.5).play(); // 切换动画时进行一个淡入淡出的过渡

    return () => {
      action?.fadeOut(0.5); // 取消上一个动画
    };
    // 动画混合，让其平滑过渡
    // window.setTimeout(() => {
    //   const action_walk = animations.actions.Walk;
    //   action_walk && action_walk.play();
    //   action_walk && action_walk.crossFadeFrom(action!, 1, false);
    // }, 2000);
  }, [animationName]);
  return <primitive object={fox.scene} scale={0.02} position={[0.25, 0, 0.25]} rotation-y={0.3} />;
}
