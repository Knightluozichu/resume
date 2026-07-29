"use client";

import { CppGameBuildLab, type CppGameBuildModel } from "./cpp-game-build-lab";

const model = {
  unitId: "bcgp3-21",
  title: "第 21 章：视差背景、OpenGL 与 Shaders",
  focus:
    "用相机位移驱动多层视差，并在 SFML 2.6 Shader/OpenGL 边界内加载、设置 uniform、绘制和回退",
  invariant:
    "每层偏移由同一相机状态和层系数确定，Shader 失败时仍有可见回退路径，uniform 与目标程序匹配",
  fault: "着色器编译失败后仍无条件用空 Shader 绘制，最终得到黑屏却没有错误日志",
  evidence:
    "相机位置、层系数、计算后偏移、Shader::isAvailable、loadFromFile 结果、uniform 值和回退 draw 调用",
  concepts: [
    "视差背景（parallax backgrounds）",
    "opengl",
    "着色器（shaders）",
    "cameragraphics 类（cameragraphics class）",
    "完成游戏（completed game）",
  ],
  zones: [
    {
      label: "视差状态",
      detail: "相机位置、层深度和纹理重复",
    },
    {
      label: "Shader 管线",
      detail: "GLSL 源码、编译、uniform 与 RenderStates",
    },
    {
      label: "完成与回退",
      detail: "最终合成、能力检测、错误日志和普通绘制",
    },
  ],
  trace: [
    "读取相机",
    "计算层偏移",
    "检查 Shader",
    "设置 uniform",
    "绘制或回退",
  ],
  scenarios: [
    {
      label: "多层视差移动",
      input: "相机向右移动 100 世界单位，背景层使用不同视差系数",
      expected: "近层位移大于远层，所有偏移可由同一公式复算",
    },
    {
      label: "Shader 不可用",
      input: "能力检测或编译返回失败",
      expected: "记录原因并切换普通纹理绘制，游戏仍可操作且非黑屏",
    },
  ],
} satisfies CppGameBuildModel;

export function ParallaxShadersPipelineLab() {
  return <CppGameBuildLab model={model} view="pipeline" />;
}

export function ParallaxShadersFrameLab() {
  return <CppGameBuildLab model={model} view="frame" />;
}

export function ParallaxShadersFaultLab() {
  return <CppGameBuildLab model={model} view="fault" />;
}
