import type { ReviewQuestion } from "./types";

/** 深入理解 OpenGL WebGL OpenGL ES 全书学习地图 复习题 */
export const dogLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "dog-learning-map-1",
    chapter: "dog-learning-map",
    level: 1,
    question: `OpenGL、OpenGL ES、WebGL 三者是什么关系？`,
    answer: `同源关系：OpenGL 是桌面全功能原版；OpenGL ES 是为移动/嵌入式精简的子集；WebGL 是 OpenGL ES 的浏览器 JS 绑定（WebGL1≈ES2、WebGL2≈ES3）。共享图形管线理念与 GLSL，差异在 API 子集与扩展。`,
    tags: ["三 API 关系"],
  },
  {
    id: "dog-learning-map-2",
    chapter: "dog-learning-map",
    level: 2,
    question: `图形管线有哪些核心阶段？哪些是可编程的？`,
    answer: `顶点输入 → 顶点着色器 → 图元装配 → 光栅化 → 片元着色器 → 逐片元测试（深度/模板）→ 帧缓冲。其中顶点着色器与片元着色器是可编程阶段（用 GLSL 编写），其余为固定功能阶段（可通过状态配置）。`,
    tags: ["图形管线", "着色器"],
  },
  {
    id: "dog-learning-map-3",
    chapter: "dog-learning-map",
    level: 3,
    question: `为什么说 OpenGL 是「状态机」？这带来什么编程注意点？`,
    answer: `OpenGL 通过当前状态（绑定的缓冲、使用的程序、开启的测试等）决定绘制行为，绘制命令本身不带配置。状态在帧间持续生效，忘记重设会沿用上次状态导致泄漏，所以每帧绘制前要显式设定所需状态，不能依赖隐式残留。`,
    tags: ["状态机", "状态泄漏"],
  },
  {
    id: "dog-learning-map-4",
    chapter: "dog-learning-map",
    level: 4,
    question: `把桌面 OpenGL 代码直接搬到 WebGL 报错，可能原因有哪些？如何排查？`,
    answer: `WebGL 基于 OpenGL ES 精简子集，桌面独有特性（几何/曲面细分着色器、部分扩展、glBegin/glEnd 旧式 API、双精度等）不可用；着色器版本声明需用 #version 300 es 且精度限定符必填。排查：以 ES3 为基线逐函数查可用性、查着色器编译日志、用扩展查询 WebGLRenderingContext.getSupportedExtensions 确认特性支持，再换方案实现。`,
    tags: ["综合", "跨 API 迁移", "WebGL"],
  },
];
