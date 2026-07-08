import type { ReviewQuestion } from "./types";

export const uslShaderlabStructureQuestions: ReviewQuestion[] = [
  {
    id: "usl-shaderlab-structure-1",
    chapter: "usl-shaderlab-structure",
    level: 1,
    question: "ShaderLab 文件的基本结构包含哪些部分？",
    answer: "Shader 名称声明、Properties 语义块（属性声明）、SubShader 语义块（一个或多个）、Fallback 回退声明。SubShader 内含 Pass 语义块、Tags、LOD 和渲染状态设置。",
    tags: ["文件结构"],
  },
  {
    id: "usl-shaderlab-structure-2",
    chapter: "usl-shaderlab-structure",
    level: 2,
    question: "Unity 如何选择执行哪个 SubShader？",
    answer: "Unity 从上到下遍历 SubShader，选择第一个显卡支持的 SubShader 执行。通过 Tags 设置渲染队列和类型，通过 LOD 限制低端设备使用简化版本。若都不支持则使用 Fallback 指定的回退 Shader。",
    tags: ["SubShader", "LOD", "Fallback"],
  },
  {
    id: "usl-shaderlab-structure-3",
    chapter: "usl-shaderlab-structure",
    level: 3,
    question: "ShaderLab 中的 Tags 有什么作用？",
    answer: "Tags 控制 Shader 的渲染行为：Queue 设置渲染队列（Background/Geometry/Transparent/Overlay）、RenderType 用于替换着色器、DisableBatching 禁用合批。Tags 在 SubShader 和 Pass 级别都可设置。",
    tags: ["Tags", "渲染队列"],
  },
  {
    id: "usl-shaderlab-structure-4",
    chapter: "usl-shaderlab-structure",
    level: 4,
    question: "如何设计一个支持多平台多质量的 Shader 结构？",
    answer: "1)写多个 SubShader 按 LOD 从高到低排列 2)高 LOD 用复杂光照和纹理 3)低 LOD 简化算法和减少采样 4)用 Shader Feature/Multi Compile 控制变体 5)设置合适的 Fallback 兜底 6)用 #pragma target 控制 Shader Model 版本适配不同设备。",
    tags: ["多平台", "LOD", "实践"],
  },
];
