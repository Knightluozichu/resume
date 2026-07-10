import type { ReviewQuestion } from "./types";

export const usfFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "usf-final-review-1",
    chapter: "usf-final-review",
    level: 1,
    question: `Unity 屏幕特效开发的完整流程是什么？`,
    answer: `1)分析效果需求确定技术方案 2)编写屏幕特效 Shader（全屏处理）3)创建 C# 脚本管理 OnRenderImage 4)配置 RenderTexture 和材质 5)串联多效果链 6)性能优化（降分辨率/合并 Pass）7)URP 迁移到 RenderFeature。`,
    tags: ["工作流程", "总结"],
  },
  {
    id: "usf-final-review-2",
    chapter: "usf-final-review",
    level: 2,
    question: `屏幕特效从场景渲染到最终输出的完整数据流？`,
    answer: `场景渲染→RenderTexture（颜色+深度）→OnRenderImage→Blit(src,dest,material)→Shader 全屏处理→多效果链式串联→最终输出到屏幕。深度纹理和法线纹理可作为额外输入参与计算。`,
    tags: ["数据流", "管线总结"],
  },
  {
    id: "usf-final-review-3",
    chapter: "usf-final-review",
    level: 3,
    question: `屏幕特效性能优化的要点有哪些？`,
    answer: `1)降分辨率处理再上采样 2)合并多效果到一个 Pass 3)用降采样-上采样替代大核模糊 4)RenderTexture 池化避免 GC 5)移动端减少效果数量和精度 6)深度/法线纹理按需开启 7)URP 中用 RenderFeature 精确控制注入点 8)Profiler 定位最贵 Pass。`,
    tags: ["性能优化", "总结"],
  },
  {
    id: "usf-final-review-4",
    chapter: "usf-final-review",
    level: 4,
    question: `给定需求「实现一个电影级后处理管线」，设计方案。`,
    answer: `1)HDR 渲染场景+深度/法线纹理 2)SSAO 环境遮蔽 3)SSR 屏幕反射 4)Bloom 辉光（降采样-上采样+Lens Dirt）5)色彩校正（白平衡+ACES+LUT）6.色差/暗角/胶片颗粒风格化 7)运动模糊 8)景深 9)按渲染顺序串联：AO→SSR→Bloom→DOF→MotionBlur→ColorGrading→风格化→输出 10)用 Volume 控制 Blending 过渡。`,
    tags: ["综合设计", "电影级", "实战"],
  },
];
