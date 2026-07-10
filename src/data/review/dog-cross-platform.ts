import type { ReviewQuestion } from "./types";

/** 跨平台兼容性 复习题 */
export const dogCrossPlatformQuestions: ReviewQuestion[] = [
  {
    id: "dog-cross-platform-1",
    chapter: "dog-cross-platform",
    level: 1,
    question: `WebGL 如何检测某扩展是否可用？getExtension 返回 null 代表什么？`,
    answer: `用 gl.getExtension('NAME') 检测，返回扩展对象表示可用，返回 null 表示该扩展不可用。绝不能在未检测（返回 null）时调用扩展函数，否则会报「函数未定义」。`,
    tags: ["扩展检测"],
  },
  {
    id: "dog-cross-platform-2",
    chapter: "dog-cross-platform",
    level: 2,
    question: `为什么不能只靠版本号判断某特性可用？正确检测姿势是什么？`,
    answer: `版本号只反映核心 API 等级，不反映扩展支持与上限差异——同版本不同驱动/浏览器的扩展集合、纹理大小上限等都不同。正确姿势是运行时用 getExtension 查每个扩展、getParameter 查 MAX 上限、getShaderInfoLog 验证 GLSL，查到才用，版本号仅作粗筛。`,
    tags: ["特性检测", "版本号"],
  },
  {
    id: "dog-cross-platform-3",
    chapter: "dog-cross-platform",
    level: 3,
    question: `ES2、ES3、桌面的 GLSL 版本与关键限定符有何不同？为何要准备多份？`,
    answer: `ES2 用 #version 100 + attribute/varying + gl_FragColor；ES3 用 #version 300 es + in/out + 自定义 out fragColor；桌面用 #version 330 core + in/out + layout 限定符。不同平台只接受对应版本的 GLSL，同一效果需准备多份源码，运行时按能力路径选用对应版本，否则编译失败。`,
    tags: ["GLSL 版本", "多份源码"],
  },
  {
    id: "dog-cross-platform-4",
    chapter: "dog-cross-platform",
    level: 4,
    question: `只靠 gl.getParameter(VERSION) 字符串判断「支持实例化」可靠吗？如何设计 HDR 后处理的跨平台降级？`,
    answer: `不可靠。VERSION 字符串只反映核心版本，实例化在 WebGL1 是扩展（ANGLE_instanced_arrays）、WebGL2 才是核心，版本号不能反映扩展存在性。HDR 降级：WebGL2+EXT_float_blend 走浮点渲染目标+线性色调映射；仅 WebGL2 走 RGBA8+简化调色；WebGL1 用扩展或简化几何。每条路径独立 GLSL 与回退实现，运行时检测后选一条，缺特性自动降级，处处可跑只是效果有差。`,
    tags: ["综合", "降级", "实例化"],
  },
];
