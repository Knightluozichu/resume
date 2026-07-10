import type { ReviewQuestion } from "./types";

export const CgpRasterGraphicsQuestions: ReviewQuestion[] = [
  {
    id: "cgp-raster-graphics-1",
    chapter: "cgp-raster-graphics",
    level: 1,
    question: `光栅化的基本原理是什么？`,
    answer: `光栅化把矢量图元（线段、三角形）转换为屏幕像素。通过扫描转换确定哪些像素被图元覆盖，并插值顶点属性给每个覆盖的像素。`,
    tags: ["光栅化", "扫描转换"],
  },
  {
    id: "cgp-raster-graphics-2",
    chapter: "cgp-raster-graphics",
    level: 2,
    question: `走样（Aliasing）是什么？为什么会产生？`,
    answer: `走样是连续信号离散采样不足导致的高频信号「伪装」成低频信号的现象。光栅化时像素是离散采样点，如果图元边缘的高频变化超过采样率（像素密度），就会出现锯齿和闪烁。`,
    tags: ["走样", "采样", "锯齿"],
  },
  {
    id: "cgp-raster-graphics-3",
    chapter: "cgp-raster-graphics",
    level: 3,
    question: `超级采样（SSAA）和多采样抗锯齿（MSAA）的区别是什么？`,
    answer: `SSAA 在更高分辨率渲染整帧再降采样，每个子样本独立计算片元着色器，质量最好但极慢。MSAA 只在几何边缘做多点采样（每子样本独立深度测试），片元着色器只算一次再复制到通过测试的子样本，快得多但只抗几何锯齿不抗着色锯齿。`,
    tags: ["SSAA", "MSAA", "抗锯齿"],
  },
  {
    id: "cgp-raster-graphics-4",
    chapter: "cgp-raster-graphics",
    level: 4,
    question: `Bresenham 直线算法为什么只用整数运算？它的核心思想是什么？`,
    answer: `核心思想是用误差项累计决定下一个像素 y 是否递增，避免浮点运算。早期硬件浮点很慢，整数运算快且精确。误差项 d 每步加斜率的分子，超过 0.5 就 y++ 并减 1。这种整数 DDA 在没有 FPU 的时代让图形渲染成为可能，至今仍影响嵌入式图形。`,
    tags: ["Bresenham", "整数运算", "DDA"],
  },
];
