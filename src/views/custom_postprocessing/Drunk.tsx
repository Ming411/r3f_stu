import {forwardRef} from 'react';
import DrunkEffect from './DrunkEffect';
import {DrunkProps} from './types';

const Drunk = forwardRef<DrunkEffect, DrunkProps>(function Drunk(props: DrunkProps, ref) {
  const effect = new DrunkEffect(props);
  return <primitive ref={ref} object={effect} />;
});

export default Drunk;
