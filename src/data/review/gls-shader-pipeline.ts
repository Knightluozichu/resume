import type { ReviewQuestion } from "./types";

export const glsShaderPipelineQuestions: ReviewQuestion[] = [
  {
    id: "gls-shader-pipeline-1",
    chapter: "gls-shader-pipeline",
    level: 1,
    question: "OpenGL管线有哪些可编程阶段？",
    answer: "顶点着色器(必需)、曲面细分(Hull+Domain可选)、几何着色器(可选)、片段着色器(必需)。计算着色器独立于图形管线。",
    tags: ["可编程阶段"],
  },
  {
    id: "gls-shader-pipeline-2",
    chapter: "gls-shader-pipeline",
    level: 2,
    question: "曲面细分的三个子阶段？",
    answer: "Hull/Tessellation Control Shader(设定细分级别)→Tessellator(固定功能生成拓扑)→Domain/Tessellation Evaluation Shader(计算顶点位置)。用于自适应LOD。",
    tags: ["曲面细分"],
  },
  {
    id: "gls-shader-pipeline-3",
    chapter: "gls-shader-pipeline",
    level: 3,
    question: "几何着色器的作用和限制？",
    answer: "逐图元执行，可增删图元(输入1个三角形输出多个)。适合法线可视化、毛发、爆炸粒子。限制：性能差(并行度低)、输出顶点数有上限。",
    tags: ["几何着色器"],
  },
  {
    id: "gls-shader-pipeline-4",
    chapter: "gls-shader-pipeline",
    level: 4,
    question: "着色器管线中各阶段的执行频率？",
    answer: "顶点着色器逐顶点(N次)、曲面细分逐面片、几何着色器逐图元、片段着色器逐片段(N*M次)。片段着色器执行最多，优化优先级最高。",
    tags: ["执行频率", "性能"],
  },
];
