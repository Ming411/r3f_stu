// 自定义后期处理效果
import {Effect} from 'postprocessing';
import {DrunkProps} from './types';
import {Uniform} from 'three';
import {BlendFunction} from 'postprocessing';
const fragementShader = /* glsl */ `
uniform float frequency;
uniform float amplitude; 
uniform float offset;

void mainUv(inout vec2 uv) {
  // offset 动态产生 波浪效果
  uv.y += sin(uv.x * frequency + offset) * amplitude;
}

void mainImage( const in vec4 inputColor, const in vec2 uv, out vec4 outputColor ) {
  // 1,1,1,1是白色，0,0,0,1是黑色
  // outputColor = vec4(uv,1.0,1.0);
  // outputColor = inputColor;  // 这种效果是原图，我们需要的就是通过修改输出颜色来实现特效

  // vec4 color = inputColor;
  // color.rgb *= vec3(0.8,1.0,0.5);
  // outputColor = color;

  outputColor = vec4(0.8, 1.0, 0.5, inputColor.a);  // 需要搭配blendFunction使用
}
`;

export default class DrunkEffect extends Effect {
  constructor({frequency, amplitude, blendFunction = BlendFunction.DARKEN}: DrunkProps) {
    super('DrunkEffect', fragementShader, {
      blendFunction: blendFunction,
      // 通过uniforms传递参数
      uniforms: new Map([
        ['frequency', new Uniform(frequency)],
        ['amplitude', new Uniform(amplitude)],
        ['offset', new Uniform(0)]
      ])
    });
  }

  update(renderer: THREE.Renderer, inputBuffer: any, deltaTime: number) {
    // 每次渲染都会调用
    // 动态修改参数
    this.uniforms.get('offset')!.value += deltaTime;
  }
}
