import type { ReviewQuestion } from "./types";

export const glrLightingQuestions: ReviewQuestion[] = [
  {
    id: "glr-lighting-1",
    chapter: "glr-lighting",
    level: 1,
    question: `为什么法线不能直接用model矩阵变换？`,
    answer: `非均匀缩放时model扭曲法线方向。法线矩阵=transpose(inverse(mat3(model)))保证法线垂直于变换后表面。`,
    tags: ["法线矩阵"],
  },
  {
    id: "glr-lighting-2",
    chapter: "glr-lighting",
    level: 2,
    question: `点光源衰减如何计算？`,
    answer: `1.0/(constant+linear*d+quadratic*d^2)。constant通常1.0，linear/quadratic根据范围选。`,
    tags: ["点光源", "衰减"],
  },
  {
    id: "glr-lighting-3",
    chapter: "glr-lighting",
    level: 3,
    question: `平行光、点光、聚光的区别？`,
    answer: `平行光只有方向无衰减；点光有位置+距离衰减；聚光有位置+方向+内外锥角。`,
    tags: ["光源类型"],
  },
  {
    id: "glr-lighting-4",
    chapter: "glr-lighting",
    level: 4,
    question: `如何用纹理实现更真实材质？`,
    answer: `漫反射贴图控制颜色，镜面贴图控制高光，法线贴图控制凹凸法线。多纹理组合实现PBR。`,
    tags: ["光照贴图", "PBR"],
  },
];
