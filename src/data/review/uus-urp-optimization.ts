import type { ReviewQuestion } from "./types";

export const uusUrpOptimizationQuestions: ReviewQuestion[] = [
  {
    id: "uus-urp-optimization-1",
    chapter: "uus-urp-optimization",
    level: 1,
    question: `URP 性能优化的五大维度是什么？`,
    answer: `1) 合批（SRP Batch / GPU Instancing）：减少 Draw Call 和 SetPassCall。2) 剔除（Frustum/Occlusion Culling + LOD）：跳过不可见物体。3) 渲染分辨率（Render Scale / MSAA）：降低像素填充率开销。4) 纹理（ASTC 压缩 / Mipmap / Atlas）：减少纹理带宽和内存。5) 着色器（变体控制 / Keyword 精简）：减少编译变体数和内存。`,
    tags: ["性能优化", "五大维度"],
  },
  {
    id: "uus-urp-optimization-2",
    chapter: "uus-urp-optimization",
    level: 2,
    question: `SRP Batch 和 GPU Instancing 的区别是什么？能否同时生效？`,
    answer: `SRP Batch 合并相同 Shader 的不同材质（通过 CBUFFER 持久化），减少 SetPassCall，适用于不同材质但相同 Shader。GPU Instancing 合并相同 Mesh + 相同材质的不同实例到一次 Draw Call，适用于大量重复物体。两者不能同时生效——满足 Instancing 条件时（相同 Mesh + 相同材质）优先走 Instancing，SRP Batcher 不参与。两者是互补关系。`,
    tags: ["SRP Batch", "GPU Instancing", "合批"],
  },
  {
    id: "uus-urp-optimization-3",
    chapter: "uus-urp-optimization",
    level: 3,
    question: `Shader 变体为什么会爆炸？如何控制变体数量？`,
    answer: `每个 multi_compile boolean Keyword 翻倍变体数，N 个 Keyword = 2^N 个变体。5 个 = 32 个，10 个 = 1024 个。变体过多导致编译时间暴增、内存占用大、加载卡顿。控制策略：1) 只在影响性能路径的功能上用 Keyword（如光照计算分支），不影响性能的用 if 分支（现代 GPU 分支开销低）；2) 用 shader_feature 替代 multi_compile（只编译用到的变体）；3) 用 local shader_feature 限制变体作用域；4) 用 Shader Variant Collection 预热关键变体。`,
    tags: ["Shader变体", "Keyword", "变体控制"],
  },
  {
    id: "uus-urp-optimization-4",
    chapter: "uus-urp-optimization",
    level: 4,
    question: `移动端 URP 优化的关键项有哪些？各项的原因是什么？`,
    answer: `1) Render Scale 0.5~0.8：移动端像素填充率有限，降分辨率是最直接帧率提升。2) 关闭 HDR：HDR RT 双倍带宽，移动端带宽受限。3) MSAA 2x 或关闭：4x MSAA 开销大，可用 FXAA 替代。4) CSM 2 级 + 1024 分辨率：4 级 CSM 开销是 2 级的 2 倍。5) 附加光逐顶点 + 上限 2-4：移动端 ALU 有限，逐像素光源开销大。6) 关闭实时 GI：SH 计算和 Reflection Probe 采样开销大。7) 后处理只保留 Tone Mapping + 轻量 Bloom：每个 Blit 在移动端带宽开销显著。8) 纹理 ASTC 压缩 + Mipmap：减少纹理带宽。`,
    tags: ["移动端优化", "URP Asset", "性能"],
  },
];
