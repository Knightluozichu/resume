import type { ReviewQuestion } from "./types";

export const uslFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "usl-final-review-1",
    chapter: "usl-final-review",
    level: 1,
    question: `Unity ShaderLab 开发的完整流程是什么？`,
    answer: `1)分析效果需求选择着色器类型 2)编写 ShaderLab 文件结构和 Properties 3)实现 SubShader 和 Pass 逻辑 4)选择光照模型或自定义 5)材质面板调参 6)C# 脚本动态控制 7)多平台适配与性能优化。`,
    tags: ["工作流程", "总结"],
  },
  {
    id: "usl-final-review-2",
    chapter: "usl-final-review",
    level: 2,
    question: `ShaderLab 文件从 Properties 到最终渲染的完整数据流？`,
    answer: `Properties 声明属性→材质面板设置值→C# 传递参数→SubShader 选择→Pass 执行渲染状态→CG/HLSL 代码处理顶点和像素→光照模型计算→混合输出到帧缓冲→后处理→显示。`,
    tags: ["数据流", "管线总结"],
  },
  {
    id: "usl-final-review-3",
    chapter: "usl-final-review",
    level: 3,
    question: `Unity Shader 开发的性能优化要点有哪些？`,
    answer: `1)减少 Pass 数量 2)控制变体数量用 shader_feature 3)LOD 多级 Shader 4)减少纹理采样和合并纹理 5)表面着色器编译开销大时改用顶点/片段 6)GrabPass 改用 Command Buffer 7)移动端用 half 精度 8)合批减少 Draw Call。`,
    tags: ["性能优化", "总结"],
  },
  {
    id: "usl-final-review-4",
    chapter: "usl-final-review",
    level: 4,
    question: `给定需求「实现一个带溶解和描边技能特效的角色 Shader」，设计方案。`,
    answer: `1)Properties 声明 DissolveAmount、EdgeColor、OutlineWidth 等参数 2)Pass 1 正常渲染角色带光照 3)Pass 2 沿法线外扩 Cull Front 做描边 4)在 Pass 1 中加噪声纹理 clip 实现溶解 5)smoothstep 做燃烧边缘 6)C# 脚本控制 DissolveAmount 动画 7)shader_feature 控制描边开关 8)LOD 适配低端设备。`,
    tags: ["综合设计", "实战"],
  },
];
