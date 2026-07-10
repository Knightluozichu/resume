import type { ReviewQuestion } from "./types";

/** GLSL ES 着色器语言 复习题 */
export const dogShaderLanguageQuestions: ReviewQuestion[] = [
  {
    id: "dog-shader-language-1",
    chapter: "dog-shader-language",
    level: 1,
    question: `GLSL ES 有哪些基本数据类型？uniform、attribute/in、varying/out-in 各什么用途？`,
    answer: `基本类型：标量 float/int/bool、向量 vec2/3/4、矩阵 mat2/3/4、采样器 sampler2D。uniform 是绘制不变的全局共享常量（如变换矩阵）；attribute(ES2)/in(ES3顶点) 是每顶点输入；varying(ES2)/out-in(ES3) 是顶点输出片元输入、会被光栅化插值。`,
    tags: ["类型", "限定符"],
  },
  {
    id: "dog-shader-language-2",
    chapter: "dog-shader-language",
    level: 2,
    question: `顶点与片元着色器如何通过 varying 传值？片元收到的值和顶点输出的一样吗？`,
    answer: `顶点着色器用 out 声明变量并赋值，片元着色器用同名同类型的 in 接收，ES3 靠名称匹配自动连接。不一样：光栅化阶段对图元覆盖的每个像素，把顶点 varying 按重心坐标插值，片元拿到的是插值后的值，而非某个顶点的原值。`,
    tags: ["varying", "插值"],
  },
  {
    id: "dog-shader-language-3",
    chapter: "dog-shader-language",
    level: 3,
    question: `片元着色器报「no default precision for float」是什么原因？怎么修？`,
    answer: `GLSL ES 规定片元着色器无默认 float 精度（顶点默认 highp），不显式声明会编译失败。修复：在片元着色器顶部加 precision mediump float;（或 highp），整文件生效。`,
    tags: ["精度", "编译错误"],
  },
  {
    id: "dog-shader-language-4",
    chapter: "dog-shader-language",
    level: 4,
    question: `varying 在片元里拿不到或值乱跳，可能原因有哪些？ES2 与 ES3 的匹配机制有何不同？`,
    answer: `可能原因：顶点 out 与片元 in 名称不一致或类型不匹配，管线没建立连接；或精度/限定符写错。ES2 用 varying 关键字声明匹配，ES3 用 out/in 靠名称匹配。两者都要求两端同名同类型；ES3 若用了 interface block 则按块名+字段匹配。排查时核对两端声明并查链接日志 glGetProgramInfoLog 确认 varying 是否被优化掉。`,
    tags: ["综合", "varying 匹配", "调试"],
  },
];
