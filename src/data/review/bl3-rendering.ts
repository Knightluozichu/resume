import type { ReviewQuestion } from "./types";

export const bl3RenderingQuestions: ReviewQuestion[] = [
  {
    id: "bl3-rendering-1",
    chapter: "bl3-rendering",
    level: 1,
    question: `Cycles 和 Eevee 的核心区别是什么？`,
    answer: `Cycles 是光线追踪渲染器，逐像素模拟光线弹射，画质高但慢。Eevee 是实时渲染器，用光栅化近似光照，速度快但精度不够。Cycles 适合最终出图，Eevee 适合快速预览。`,
    tags: ["Cycles", "Eevee"],
  },
  {
    id: "bl3-rendering-2",
    chapter: "bl3-rendering",
    level: 2,
    question: `Cycles 的采样数（Samples）如何影响渲染？`,
    answer: `采样数是每像素发射的光线数量。采样越高噪点越少画质越好，但渲染时间线性增长。预览用 32-64，最终出图用 128-256。配合降噪可以在较低采样下获得干净画面。`,
    tags: ["采样数", "渲染质量"],
  },
  {
    id: "bl3-rendering-3",
    chapter: "bl3-rendering",
    level: 3,
    question: `Eevee 的屏幕空间反射有什么限制？`,
    answer: `Eevee 的屏幕空间反射只能反射屏幕可见区域的物体——画面外的物体不参与反射，边缘会断裂。Cycles 追踪光线在场景中弹射，反射所有几何体包括屏幕外区域。`,
    tags: ["屏幕空间反射", "Eevee 限制"],
  },
  {
    id: "bl3-rendering-4",
    chapter: "bl3-rendering",
    level: 4,
    question: `为什么实时渲染永远比不过离线渲染的真实感？`,
    answer: `根源是计算预算：实时渲染每帧只有 16ms，必须用光栅化近似和屏幕空间技巧，无法做递归光线追踪。离线渲染可以花数小时逐像素追踪光线，统计噪声趋近零。实时光线追踪（RTX）在缩小差距但物理正确和实时近似之间的鸿沟永远存在。`,
    tags: ["实时渲染", "离线渲染", "综合"],
  },
];
