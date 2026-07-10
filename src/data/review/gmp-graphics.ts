import type { ReviewQuestion } from "./types";

export const gmpGraphicsQuestions: ReviewQuestion[] = [
  {
    id: "gmp-graphics-1",
    chapter: "gmp-graphics",
    level: 1,
    question: `渲染管线的主要阶段是什么？`,
    answer: `顶点着色（3D 坐标变换到屏幕空间）→ 裁剪（去掉视野外的三角形）→ 光栅化（三角形转换为像素片段）→ 片段着色（计算每个像素颜色，纹理采样+光照）→ 输出合并（深度测试决定可见性，混合处理半透明）。可选阶段还有曲面细分和几何着色。每个阶段处理特定任务，前一阶段输出是后一阶段输入。`,
    tags: ["渲染管线", "顶点着色", "光栅化"],
  },
  {
    id: "gmp-graphics-2",
    chapter: "gmp-graphics",
    level: 2,
    question: `为什么 DrawCall 是性能瓶颈？如何减少 DrawCall？`,
    answer: `DrawCall 是性能瓶颈因为每个有 CPU 端固定开销（状态切换+命令提交），即使画一个三角形也要付。1000 个 DrawCall 可能吃掉一帧 50% CPU 时间。减少方法：1. 静态合批（相同材质的静态物体合并为一个大网格）。2. 实例化（相同网格和材质画多次用一个 DrawCall）。3. 图集（减少材质切换）。4. GPU Driven Pipeline（GPU 端决定画什么减少 CPU 提交）。`,
    tags: ["DrawCall", "合批", "实例化"],
  },
  {
    id: "gmp-graphics-3",
    chapter: "gmp-graphics",
    level: 3,
    question: `顶点着色器和片段着色器分别负责什么？`,
    answer: `顶点着色器：对每个顶点执行，将 3D 模型坐标变换到屏幕空间（模型→世界→视图→投影→屏幕变换），还可以传递数据（法线/纹理坐标）给片段着色器。片段着色器：对每个像素片段执行，计算最终颜色——纹理采样、光照计算（兰伯特/Blinn-Phong）、雾效等。顶点着色器决定「画在哪里」，片段着色器决定「画成什么颜色」。`,
    tags: ["顶点着色器", "片段着色器", "着色器"],
  },
  {
    id: "gmp-graphics-4",
    chapter: "gmp-graphics",
    level: 4,
    question: `CPU 端的可见性剔除有哪几种？为什么不依赖 GPU 自己裁剪？`,
    answer: `三种剔除：1. 视锥体剔除——去掉视野锥体外整个物体（用 AABB/OBB 与视锥体求交）。2. 遮挡剔除——去掉被大物体挡住的小物体（用 Hi-Z 缓冲或预计算遮挡关系）。3. 距离剔除——太远的不画（如远景用低精度代替）。不依赖 GPU 裁剪因为：GPU 裁剪发生在光栅化前（顶点着色之后），但 CPU 提交 DrawCall 的开销已经产生了——即使 GPU 最终不画，CPU 端的状态切换和命令提交时间已经浪费了。CPU 端先剔除可以避免无效 DrawCall 提交，大幅减少 CPU 开销。`,
    tags: ["可见性剔除", "视锥体剔除", "遮挡剔除", "综合"],
  },
];
