import {useEffect, useMemo, useRef} from 'react';
import * as THREE from 'three';

export default function CustomObject() {
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  const verticesCount = 10 * 3; // xyz 组成一个顶点 每三个顶点组成一个三角形
  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3); // 10个三角形
    for (let i = 0; i < verticesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 3;
    }
    return positions;
  }, []);
  useEffect(() => {
    // bufferGeometry+meshStandardMaterial 必须指定顶点颜色
    geometryRef.current?.computeVertexNormals();
  }, []);
  return (
    <mesh>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach={'attributes-position'}
          count={verticesCount} // 顶点个数 30
          itemSize={3}
          array={positions}
        />
      </bufferGeometry>
      <meshStandardMaterial color={'hotpink'} side={THREE.DoubleSide} />
    </mesh>
  );
}
