import type { ReviewQuestion } from "./types";

/** OpenGL ES 移动端适配 复习题 */
export const dogOpenglEsQuestions: ReviewQuestion[] = [
  {
    id: "dog-opengl-es-1",
    chapter: "dog-opengl-es",
    level: 1,
    question: `EGL 的作用是什么？创建上下文的基本流程？`,
    answer: `EGL 是 OpenGL ES 与原生窗口系统的绑定接口，负责创建渲染上下文、绑定 Surface、管理显示。流程：eglGetDisplay → eglInitialize → eglChooseConfig → eglCreateContext → eglCreateWindowSurface → eglMakeCurrent。`,
    tags: ["EGL", "上下文"],
  },
  {
    id: "dog-opengl-es-2",
    chapter: "dog-opengl-es",
    level: 2,
    question: `移动 GPU 的 TBDR 架构是什么？为什么过度绘制在移动端代价特别高？`,
    answer: `TBDR 把画面切成小块，每块在片上高速缓存里完成全部片元处理后一次写回显存，省带宽省电。每块的片元处理量与过度绘制成正比——被覆盖的片元仍被着色，透明层叠尤其浪费，直接推高每块功耗与耗时，因此过度绘制是移动端头号性能杀手。`,
    tags: ["TBDR", "过度绘制"],
  },
  {
    id: "dog-opengl-es-3",
    chapter: "dog-opengl-es",
    level: 3,
    question: `移动端画面出现条纹/网格失真，桌面正常，原因和修法是什么？`,
    answer: `原因：位置变换用了 mediump，精度/范围不够导致顶点位置抖动产生条纹。修法：位置、矩阵、法线变换一律用 highp 防溢出；颜色、UV 等可容忍低精度的用 mediump 省电，分通道按需选精度，并在片元着色器顶部声明默认 float 精度。`,
    tags: ["精度", "条纹"],
  },
  {
    id: "dog-opengl-es-4",
    chapter: "dog-opengl-es",
    level: 4,
    question: `ES3 相比 ES2 的关键新增有哪些？如何在移动端针对 TBDR 做渲染优化？`,
    answer: `ES3 新增 MRT、实例化、变换反馈、3D 纹理、UBO、GLSL 3.00、遮挡查询、深度纹理阴影采样。TBDR 优化：减少透明物体、不透明物体从前向后排序、用 early-z 或预深度 pass 剔除被遮挡片元以降低每块片元数；按通道选精度（位置 highp、颜色 mediump）省电；用实例化减少 draw call，用 UBO 统一更新 uniform 降低 CPU 开销。`,
    tags: ["综合", "ES3", "TBDR 优化"],
  },
];
