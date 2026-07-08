import type { ReviewQuestion } from "./types";

export const uslAdvancedTechniquesQuestions: ReviewQuestion[] = [
  {
    id: "usl-advanced-techniques-1",
    chapter: "usl-advanced-techniques",
    level: 1,
    question: "Unity ShaderLab 中 shader_feature 和 multi_compile 的区别？",
    answer: "shader_feature 只编译使用到的变体（编译时根据材质决定），适合不常用的开关。multi_compile 编译所有组合的变体，适合全局通用的功能。shader_feature 包体更小但需手动管理变体，multi_compile 包体大但兼容性好。",
    tags: ["shader_feature", "multi_compile", "变体"],
  },
  {
    id: "usl-advanced-techniques-2",
    chapter: "usl-advanced-techniques",
    level: 2,
    question: "如何在 ShaderLab 中实现溶解（Dissolve）效果？",
    answer: "1)用噪声纹理采样得到阈值 2)与 DissolveAmount 参数比较 3)低于阈值的像素 clip 丢弃 4)在阈值边缘用渐变色绘制燃烧边缘 5)边缘宽度用 smoothstep 控制 6)DissolveAmount 从 0 到 1 动画实现溶解过渡。",
    tags: ["溶解效果", "噪声", "clip"],
  },
  {
    id: "usl-advanced-techniques-3",
    chapter: "usl-advanced-techniques",
    level: 3,
    question: "如何在 ShaderLab 中实现能量护盾效果？",
    answer: "1)用 Fresnel 控制边缘发光强度 2)用噪声纹理叠加纹理动画模拟能量流动 3)用顶点偏移或法线扰动模拟护盾起伏 4)用 GrabPass 做折射扭曲 5)受击时用时间参数触发脉冲扩散 6)Blend Add 叠加发光效果 7)设置渲染队列为 Transparent。",
    tags: ["能量护盾", "Fresnel", "综合"],
  },
  {
    id: "usl-advanced-techniques-4",
    chapter: "usl-advanced-techniques",
    level: 4,
    question: "如何优化 ShaderLab 中过多的 Shader 变体问题？",
    answer: "1)用 shader_feature 替代 multi_compile 减少编译量 2)合并相似关键词 3)用 #pragma skip_variants 跳过不需要的变体 4)用 Shader Variant Collection 预热关键变体 5)用 Addressables 按需加载 Shader 6)分析 build 报告去除未使用变体 7)考虑用 if 判断替代部分关键词。",
    tags: ["变体优化", "构建优化", "实践"],
  },
];
