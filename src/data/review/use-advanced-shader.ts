import type { ReviewQuestion } from "./types";

/** 高级 Shader 技术 复习题 */
export const useAdvancedShaderQuestions: ReviewQuestion[] = [
  {
    id: "use-advanced-shader-1",
    chapter: "use-advanced-shader",
    level: 1,
    question: `程序化纹理的优势和劣势是什么？`,
    answer: `优势：分辨率无关、无需存储、参数化可调。劣势：计算开销大(每像素执行噪声)、难以精确控制、跨GPU一致性难保证。`,
    tags: ["程序化纹理"],
  },
  {
    id: "use-advanced-shader-2",
    chapter: "use-advanced-shader",
    level: 2,
    question: `视差贴图和置换贴图有什么区别？`,
    answer: `视差贴图在片元着色器偏移UV不改几何，边缘平面，开销低。置换贴图在顶点着色器移动顶点真改几何，边缘有凹凸，需高面数模型，开销高。视差是视觉欺骗，置换是物理改变。`,
    tags: ["视差", "置换"],
  },
  {
    id: "use-advanced-shader-3",
    chapter: "use-advanced-shader",
    level: 3,
    question: `GPU Instancing如何减少Draw Call？`,
    answer: `一次Draw Call提交一个网格+多个变换矩阵，GPU并行绘制所有实例。CPU只提交一次而非N次(N个物体=N个Draw Call->1个)。需Shader支持UNITY_SETUP_INSTANCE_ID和instanced属性。适合大量相同网格的物体(树/草/粒子)。`,
    tags: ["GPU Instancing", "Draw Call"],
  },
  {
    id: "use-advanced-shader-4",
    chapter: "use-advanced-shader",
    level: 4,
    question: `设计一个草地渲染方案，使用GPU Instancing+程序化纹理+视差贴图，分析各技术的角色。`,
    answer: `1)GPU Instancing：每棵草是一个简单面片(2三角形)，用Instancing一次Draw Call渲染数万棵草。每个实例有不同位置/旋转/缩放(通过instance ID索引变换矩阵)。角色：消除数万Draw Call。2)程序化纹理：草的纹理不用图片，用噪声函数+方向渐变生成草叶颜色(根部暗尖部亮)+风摆动(时间*sin函数偏移UV)。角色：无需存储大量草纹理，可动态调整颜色和风力。3)视差贴图：草面片是平的，用视差贴图在面片上偏移UV模拟草叶厚度感。角色：增加视觉细节不改几何。4)LOD：远处草简化为更少面片或公告板。5)AO：根部用顶点色暗化模拟接地。组合：Instancing解决数量(性能)，程序化解决纹理(内存)，视差解决细节(质量)，LOD解决距离(性能)。整体在移动端可渲染数万草叶保持60fps。`,
    tags: ["草地渲染", "综合", "Instancing"],
  },
];