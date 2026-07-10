import type { ReviewQuestion } from "./types";

export const gpoLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "gpo-learning-map-1",
    chapter: "gpo-learning-map",
    level: 1,
    question: `GPU Pro 的核心定位是什么？`,
    answer: `GPU Pro 是 A K Peters/CRC 出版的前沿渲染技术实践合集，核心定位是「论文工程化」——将 SIGGRAPH/GDC 等学术会议的渲染研究成果转化为实时游戏可用的工程方案。每卷收录工业界和学术界的实时渲染技术。`,
    tags: ["GPU Pro", "核心定位"],
  },
  {
    id: "gpo-learning-map-2",
    chapter: "gpo-learning-map",
    level: 2,
    question: `全书四大板块是什么？它们之间的递进关系是什么？`,
    answer: `四大板块：渲染技术基础（前向/延迟/可见性缓冲）、光照与图像空间（PBR/GI/SSAO/SSR）、GPU 计算与程序化（物理模拟/噪声/地形）、高级渲染（体积/移动端/高级着色）。递进关系：高效渲染 → 真实光照 → 屏幕空间效果 → GPU 计算 → 高级效果。`,
    tags: ["全书结构", "学习路径"],
  },
  {
    id: "gpo-learning-map-3",
    chapter: "gpo-learning-map",
    level: 3,
    question: `为什么说 GPU Pro 的技术需要做「工程近似」？给出近似策略。`,
    answer: `GPU Pro 技术源自学术研究，原始实现追求质量而非实时性，采样数多、计算量大，实时游戏有帧率约束不能直接照搬。近似策略：1) 减少采样数（SSAO 64→16）；2) LUT 替代运行时计算（BRDF 积分 LUT）；3) 降分辨率渲染再上采样（体积雾 1/4 分辨率）；4) 时间复用累积（TAA 历史帧混合）；5) half 精度替代 float（移动端）。`,
    tags: ["工程近似", "优化策略"],
  },
  {
    id: "gpo-learning-map-4",
    chapter: "gpo-learning-map",
    level: 4,
    question: `如果要用「一帧渲染流程」串联全书知识点，你会怎么描述？`,
    answer: `GBufferPass（渲染技术：写 G-Buffer/可见性缓冲）→ LightingPass（光照：PBR BRDF + 实时 GI）→ SSAOPass/SSRPass（图像空间效果）→ ShadowPass（阴影：PCSS/VSM）→ Compute Shader（GPU 模拟：粒子/流体/布料，与渲染并行）→ VolumetricFogPass（体积渲染：Froxel Ray March）→ 材质 Shader（高级着色：SSS/各向异性/多层）→ PostProcessPass（后处理：Bloom/调色/ToneMap）。每步对应一个全书模块。`,
    tags: ["渲染流程", "知识串联"],
  },
];
