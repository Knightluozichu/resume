import type { ReviewQuestion } from "./types";

export const uusFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "uus-final-review-1",
    chapter: "uus-final-review",
    level: 1,
    question: `描述一帧 URP 渲染的完整流程。`,
    answer: `1) SRP Core 调用 Render()。2) Shadow Pass：从光源视角渲染 Shadow Map（CSM 级联）。3) Opaque Pass：渲染不透明物体，Lit 执行 PBR 光照（BRDF + GI + Shadow），Unlit 直通输出。4) Depth/Normal Pass：辅助纹理。5) Transparent Pass：半透明物体。6) Post Processing：Bloom → 调色 → Tone Mapping → Vignette。7) 输出到屏幕。`,
    tags: ["渲染流程", "一帧"],
  },
  {
    id: "uus-final-review-2",
    chapter: "uus-final-review",
    level: 2,
    question: `全书六大模块之间有什么依赖关系？`,
    answer: `管线架构是基础（决定 Pass 组织和 Shader 标签匹配），Shader Graph 是工具（编写着色器），光照和阴影是效果（依赖管线提供的光源数据和 Shadow Map），后处理是修饰（依赖 Opaque Pass 输出的 Camera Color RT），性能优化是保障（贯穿所有模块）。不串联理解会导致自定义 Shader 光照/阴影不正确，或后处理读取到错误的 RT。`,
    tags: ["模块依赖", "知识串联"],
  },
  {
    id: "uus-final-review-3",
    chapter: "uus-final-review",
    level: 3,
    question: `从零搭建 URP 项目时，关键决策点有哪些？`,
    answer: `1) URP vs HDRP：URP 跨平台兼容，HDRP 追求高端画质。2) Shader Graph vs HLSL：简单效果用 Graph 快速迭代，复杂/性能敏感效果手写 HLSL。3) 移动端配置：Render Scale 0.5~0.8、HDR 关闭、MSAA 2x、CSM 2 级 1024、附加光逐顶点上限 2-4、后处理简化。4) SRP Batcher 兼容：Shader 使用 CBUFFER，禁用 MaterialPropertyBlock。5) 变体控制：规划 Keyword 数量，用 if 分支替代不影响性能的功能切换。`,
    tags: ["项目搭建", "决策点"],
  },
  {
    id: "uus-final-review-4",
    chapter: "uus-final-review",
    level: 4,
    question: `如果自定义 Shader 的光照和阴影都不正确，你会从哪些方面排查？`,
    answer: `1) LightMode 标签：Pass 的 Tags 必须包含 \`LightMode = UniversalForward\` 才能被 Opaque Pass 渲染。2) CBUFFER 兼容：材质属性必须用 CBUFFER_START(UnityPerMaterial)/CBUFFER_END 包裹，否则 SRP Batcher 不生效但光照数据可能不对。3) Include 正确：必须 include URP 的 Lighting.hlsl 和 Shadows.hlsl，不能用内置管线的 Lighting.cginc。4) InputData/SurfaceData 构建：GetMainLight(shadowCoord) 需要正确的 shadowCoord（TransformWorldToShadowCoord）。5) 光照计算：必须调用 UniversalFragmentPBR 或手动计算 BRDF + GI + Shadow。6) RenderPipeline 标签：SubShader Tags 必须含 \`RenderPipeline = UniversalPipeline\`。`,
    tags: ["排查", "光照", "阴影", "自定义Shader"],
  },
];
