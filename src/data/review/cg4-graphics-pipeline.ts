import type { ReviewQuestion } from "./types";

/** 图形渲染管线 复习题 */
export const cg4GraphicsPipelineQuestions: ReviewQuestion[] = [
  {
    id: "cg4-graphics-pipeline-1",
    chapter: "cg4-graphics-pipeline",
    level: 1,
    question: "图形渲染管线的五个核心阶段是什么？",
    answer: "1) 顶点输入：提供顶点数据；2) 顶点着色器：逐顶点变换和属性计算；3) 图元装配：顶点组装成图元（三角形等）；4) 光栅化：图元扫描转换为片段；5) 片段着色器：逐片段计算最终颜色。",
    tags: ["管线阶段", "基础"],
  },
  {
    id: "cg4-graphics-pipeline-2",
    chapter: "cg4-graphics-pipeline",
    level: 2,
    question: "顶点着色器和片段着色器的执行粒度有什么区别？",
    answer: "顶点着色器逐顶点执行，每个顶点运行一次，输出变换后的位置和属性。片段着色器逐片段执行，每个片段（候选像素）运行一次，输出最终颜色。一个三角形可能只有 3 个顶点但覆盖数千个片段，所以片段着色器的执行次数远多于顶点着色器。",
    tags: ["着色器", "执行粒度"],
  },
  {
    id: "cg4-graphics-pipeline-3",
    chapter: "cg4-graphics-pipeline",
    level: 3,
    question: "在渲染管线中，图元装配阶段的作用是什么？为什么它需要放在顶点着色之后？",
    answer: "图元装配将顶点着色器输出的独立顶点按绘制模式（如 GL_TRIANGLES）组装成图元，并在图元级别做裁剪和背面剔除。它必须在顶点着色之后，因为裁剪和剔除需要变换后的裁剪空间坐标（投影后的位置），只有顶点着色器完成了 Model-View-Projection 变换后才能正确判断图元是否在视锥体内。",
    tags: ["图元装配", "裁剪", "管线顺序"],
  },
  {
    id: "cg4-graphics-pipeline-4",
    chapter: "cg4-graphics-pipeline",
    level: 4,
    question: "为什么现代 GPU 管线设计为可编程阶段与固定功能阶段混合？这种设计有什么优势和限制？",
    answer: "可编程阶段（顶点/片段/几何着色器）给开发者灵活性，可以自定义变换和着色算法；固定功能阶段（光栅化、深度测试、混合）由硬件实现以保证性能和一致性。优势是平衡灵活性与性能——关键路径用固定硬件加速，创意部分可编程。限制是固定阶段无法自定义算法（如光栅化规则不可改），且可编程阶段受限于 GPU 的并行模型和指令集。",
    tags: ["GPU架构", "可编程管线", "综合"],
  },
];
