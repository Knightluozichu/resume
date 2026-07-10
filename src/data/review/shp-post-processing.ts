import type { ReviewQuestion } from "./types";

export const shpPostProcessingQuestions: ReviewQuestion[] = [
  {
    id: "shp-post-processing-1",
    chapter: "shp-post-processing",
    level: 1,
    question: `后处理 Shader 的基本原理是什么？`,
    answer: `先将场景渲染到离屏纹理（Render Target），再用一个全屏四边形（全屏三角形）将该纹理作为输入，在像素着色器中对每个像素做处理（模糊、色调映射、辉光等），输出到最终屏幕缓冲。`,
    tags: ["后处理", "Render Target"],
  },
  {
    id: "shp-post-processing-2",
    chapter: "shp-post-processing",
    level: 2,
    question: `高斯模糊为什么通常分两趟（水平+垂直）而不是一趟？`,
    answer: `二维高斯模糊的卷积核大小为 N*N，一趟需要 N*N 次采样。分离为水平（1*N）和垂直（1*N）两趟后只需 2*N 次采样，复杂度从 O(N^2) 降为 O(N)，大幅减少纹理采样次数。`,
    tags: ["高斯模糊", "优化"],
  },
  {
    id: "shp-post-processing-3",
    chapter: "shp-post-processing",
    level: 3,
    question: `色调映射（Tone Mapping）的作用是什么？`,
    answer: `HDR 渲染产生的颜色值可能超过 [0,1] 范围，显示器无法直接显示。色调映射将 HDR 值压缩到 LDR [0,1] 范围，保留高亮区域细节。常用 ACES、Reinhard 等曲线，避免直接截断导致的高光丢失。`,
    tags: ["Tone Mapping", "HDR"],
  },
  {
    id: "shp-post-processing-4",
    chapter: "shp-post-processing",
    level: 4,
    question: `如何实现一个可配置的 Bloom（辉光）效果管线？`,
    answer: `1)渲染场景到HDR纹理 2)用亮度阈值提取高亮区域 3)对高亮纹理做多次降采样（Mip链）4)每级做高斯模糊并累加 5)从最小Mip逐级上采样叠加 6)最终将Bloom结果叠加回场景并做色调映射。`,
    tags: ["Bloom", "管线", "实践"],
  },
];
