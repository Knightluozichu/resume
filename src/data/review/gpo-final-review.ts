import type { ReviewQuestion } from "./types";

export const gpoFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "gpo-final-review-1",
    chapter: "gpo-final-review",
    level: 1,
    question: `GPU Pro 全书六大模块是什么？它们围绕什么核心展开？`,
    answer: `六大模块：渲染技术（前向/延迟/可见性缓冲）、光照阴影（PBR/GI/PCSS/VSM）、图像空间（SSAO/SSR/SSGI）、GPU 模拟（粒子/流体/布料）、体积渲染（Ray Marching/Froxel）、高级着色（SSS/各向异性/多层材质）。围绕「前沿渲染」核心展开，呈「高效渲染→真实光照→屏幕空间效果→GPU计算→高级效果」的递进关系。`,
    tags: ["全书结构", "六大模块"],
  },
  {
    id: "gpo-final-review-2",
    chapter: "gpo-final-review",
    level: 2,
    question: `如何根据项目需求选择 GPU Pro 中的技术？给出决策框架。`,
    answer: `1) 场景类型——室内重点 GI+SSS，室外重点体积雾+地形，水面重点 SSR+流体。2) 平台——PC 完整实现（延迟+PCSS+32步），移动端 Forward++PCF+8步+half。3) 性能预算——按帧时间分配：光照30%、阴影15%、后处理20%、体积15%。4) 交互需求——动态 GI 用 DDGI，静态用烘焙。5) 技术依赖——SSR 需场景颜色 RT，SSAO 需法线 RT，延迟渲染可复用 G-Buffer。`,
    tags: ["技术选型", "决策框架"],
  },
  {
    id: "gpo-final-review-3",
    chapter: "gpo-final-review",
    level: 3,
    question: `GPU Pro 技术的「论文工程化」包含哪些步骤？`,
    answer: `1) 理解原理——读论文理解数学模型（如 PCSS 的面光源几何、VSM 的切比雪夫不等式）。2) 识别可近似点——找计算量大但不影响视觉的环节。3) 工程近似——LUT 替代运行时、降分辨率+上采样、时间复用 TAA。4) 降级方案——SSR 未命中用 Probe，SSAO 边缘与烘焙 AO 混合。5) 平台适配——PC 完整，移动 half+减采样+简化 BRDF。6) 性能验证——GPU Profiler 验证帧时间和瓶颈。`,
    tags: ["论文工程化", "转化流程"],
  },
  {
    id: "gpo-final-review-4",
    chapter: "gpo-final-review",
    level: 4,
    question: `一帧渲染中各 GPU Pro 技术如何协作？技术间的数据依赖是什么？`,
    answer: `GBufferPass（渲染技术）→ LightingPass（PBR+GI）→ SSAOPass/SSRPass（复用 G-Buffer 的法线/深度/颜色 RT）→ ShadowPass（PCSS/VSM，独立 Shadow Map）→ Compute Shader（GPU 模拟，与渲染并行，通过 Indirect Draw 渲染）→ VolumetricFogPass（需要深度 RT，输出 3D 纹理）→ 材质 Shader（SSS/各向异性，在几何 Pass 中执行）→ PostProcess（Bloom/调色/ToneMap）。数据依赖：SSR 需场景颜色 RT，SSAO 需法线 RT（延迟渲染可复用 G-Buffer），体积雾需深度 RT。同时启用需考虑 RT 共享和带宽。`,
    tags: ["技术协作", "数据依赖", "一帧渲染"],
  },
];
