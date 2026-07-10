import type { ReviewQuestion } from "./types";

/** 光照模型与着色 复习题 */
export const cg4LightingModelsQuestions: ReviewQuestion[] = [
  {
    id: "cg4-lighting-models-1",
    chapter: "cg4-lighting-models",
    level: 1,
    question: `Phong 光照模型的三个分量是什么？`,
    answer: `1) 环境光(Ambient)：模拟间接光照的常数项 I*k_a；2) 漫反射(Diffuse)： Lambert 定律 I*k_d*max(N·L, 0)，与光源方向和法线夹角有关；3) 镜面反射(Specular)：I*k_s*max(R·V, 0)^n，模拟高光，n 为光泽度指数。总光照 = 环境光 + 漫反射 + 镜面反射。`,
    tags: ["Phong模型", "光照分量"],
  },
  {
    id: "cg4-lighting-models-2",
    chapter: "cg4-lighting-models",
    level: 2,
    question: `Phong 模型和 Blinn-Phong 模型的区别是什么？为什么 Blinn-Phong 更常用？`,
    answer: `Phong 用反射向量 R 与观察向量 V 的点积计算镜面反射，需先计算 R = 2*(N·L)*N - L。Blinn-Phong 用半向量 H = normalize(L + V) 与法线 N 的点积：max(N·H, 0)^n。Blinn-Phong 更常用因为：1) H 的计算比 R 简单（少一次反射计算）；2) 当 V 和 L 距离近时（常见场景），N·H 的角度变化更平缓，高光更自然；3) 性能更好，质量相近。`,
    tags: ["Blinn-Phong", "半向量", "对比"],
  },
  {
    id: "cg4-lighting-models-3",
    chapter: "cg4-lighting-models",
    level: 3,
    question: `Flat、Gouraud 和 Phong 三种着色模式有什么区别？`,
    answer: `Flat shading：每个图元用一个法线计算一个颜色，所有片段相同——面片感强。Gouraud shading：在顶点着色器中计算光照颜色，片段用重心坐标插值颜色——顶点数少时光照不连续。Phong shading：在片段着色器中逐片段插值法线后计算光照——最平滑但计算量最大。三者质量递增、性能递减。现代 GPU 普遍使用 Phong shading（片段着色器中计算光照）。`,
    tags: ["着色模式", "Flat", "Gouraud", "Phong"],
  },
  {
    id: "cg4-lighting-models-4",
    chapter: "cg4-lighting-models",
    level: 4,
    question: `BRDF 是什么？为什么 Phong 模型不是物理正确的 BRDF？如何将其改造为物理正确？`,
    answer: `BRDF（双向反射分布函数）描述入射光如何反射到出射方向，必须满足能量守恒（反射能量≤入射能量）和可逆性（交换入射出射结果不变）。Phong 模型不满足能量守恒——镜面反射可超过入射光强，且不可逆。改造方法：1) 归一化镜面项使其满足能量守恒（乘以归一化因子）；2) 使用 Fresnel 项替代常数 k_s；3) 用微表面模型（Cook-Torrance）替代简单 Phong 镜面项，其中包含 D（法线分布）、F（菲涅尔）、G（几何遮挡）三项。这就是 PBR（基于物理的渲染）的基础。`,
    tags: ["BRDF", "PBR", "能量守恒", "Cook-Torrance"],
  },
];
