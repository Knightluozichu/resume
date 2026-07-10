import type { ReviewQuestion } from "./types";

export const glrShadersQuestions: ReviewQuestion[] = [
  {
    id: "glr-shaders-1",
    chapter: "glr-shaders",
    level: 1,
    question: `GLSL中in/out/uniform区别？`,
    answer: `in输入(来自上阶段)，out输出(传给下阶段)，uniform是CPU设置的全局只读常量。顶点out自动插值为片段in。`,
    tags: ["GLSL"],
  },
  {
    id: "glr-shaders-2",
    chapter: "glr-shaders",
    level: 2,
    question: `着色器编译链接步骤？`,
    answer: `glCreateShader→glShaderSource→glCompileShader→检查→glCreateProgram→glAttachShader→glLinkProgram→检查→glUseProgram。`,
    tags: ["编译链接"],
  },
  {
    id: "glr-shaders-3",
    chapter: "glr-shaders",
    level: 3,
    question: `为什么着色器中要避免if/else？`,
    answer: `GPU是SIMD架构，分支(warp divergence)导致同warp所有线程执行所有分支。用mix/step/clamp替代。`,
    tags: ["GPU", "分支"],
  },
  {
    id: "glr-shaders-4",
    chapter: "glr-shaders",
    level: 4,
    question: `如何高效管理多个着色器程序？`,
    answer: `着色器缓存复用、UBO共享数据、按状态排序减少切换、热加载、着色器变体预编译。`,
    tags: ["着色器管理"],
  },
];
