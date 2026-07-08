import type { ReviewQuestion } from "./types";

export const shpFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "shp-final-review-1",
    chapter: "shp-final-review",
    level: 1,
    question: "Shader 开发的完整工作流程是什么？",
    answer: "1)分析效果需求确定管线阶段 2)编写 HLSL 着色器代码 3)配置输入布局和常量缓冲 4)编译验证 5)在引擎中集成测试 6)性能优化 7)效果调参迭代。",
    tags: ["工作流程", "总结"],
  },
  {
    id: "shp-final-review-2",
    chapter: "shp-final-review",
    level: 2,
    question: "从顶点着色器到最终屏幕输出，数据经历了哪些变换？",
    answer: "顶点着色器：模型空间→裁剪空间（MVP）→透视除法→NDC→视口变换→屏幕坐标→光栅化插值→像素着色器→颜色输出→后处理→帧缓冲→显示。",
    tags: ["数据流", "管线总结"],
  },
  {
    id: "shp-final-review-3",
    chapter: "shp-final-review",
    level: 3,
    question: "Shader 性能优化的系统化方法是什么？",
    answer: "1)先用 Profiler 定位瓶颈（CPU/GPU/顶点/像素）2)像素优化：减少采样、低精度、去分支 3)顶点优化：减少顶点数、LOD 4)带宽优化：压缩纹理、Mipmap 5)算法优化：分离卷积、预计算 6)验证每次优化的效果。",
    tags: ["性能优化", "方法论"],
  },
  {
    id: "shp-final-review-4",
    chapter: "shp-final-review",
    level: 4,
    question: "给定一个需求「实现带动态光照和后处理的水面效果」，设计 Shader 方案。",
    answer: "1)顶点着色器：Gerstner 波顶点位移+法线计算 2)像素着色器：Fresnel 混合反射/折射+Phong 光照+泡沫噪声 3)法线贴图流动 UV 模拟波纹 4)后处理：HDR+Bloom+色调映射 5)优化：LOD 降采样、预计算噪声纹理 6)SSR 补充局部反射。",
    tags: ["综合设计", "水面", "实战"],
  },
];
