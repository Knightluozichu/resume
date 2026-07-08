import type { ReviewQuestion } from "./types";

export const glsGeometryShadersQuestions: ReviewQuestion[] = [
  {
    id: "gls-geometry-shaders-1",
    chapter: "gls-geometry-shaders",
    level: 1,
    question: "几何着色器的输入输出？",
    answer: "输入:点/线/三角形(带邻接信息可选)。输出:可发射0~N个图元(点/线/三角形)。layout(triangles) in; layout(triangle_strip,max_vertices=3) out。用EmitVertex()和EndPrimitive()。",
    tags: ["几何着色器", "输入输出"],
  },
  {
    id: "gls-geometry-shaders-2",
    chapter: "gls-geometry-shaders",
    level: 2,
    question: "几何着色器的典型应用？",
    answer: "1)法线/线框可视化 2)毛发渲染(每三角形膨胀出毛发) 3)爆炸粒子(图元碎裂) 4)阴影体积(拉伸silhouette) 5)billboard生成。核心是图元级别的增删。",
    tags: ["应用"],
  },
  {
    id: "gls-geometry-shaders-3",
    chapter: "gls-geometry-shaders",
    level: 3,
    question: "几何着色器为什么性能差？",
    answer: "1)并行度低(一个图元一个线程vs片段着色器大规模并行) 2)输出顶点数不定导致工作量不均 3)可能放大几何量增加光栅化负担。现代API(Direct3D 12/Vulkan)甚至不推荐使用。",
    tags: ["性能"],
  },
  {
    id: "gls-geometry-shaders-4",
    chapter: "gls-geometry-shaders",
    level: 4,
    question: "几何着色器vs曲面细分的区别？",
    answer: "几何着色器:逐图元增删，输出有上限(max_vertices)，适合少量变换。曲面细分:面片→大量细分顶点，无固定上限，适合LOD。曲面细分管线有专用固定功能Tessellator，性能优于几何着色器做细分。",
    tags: ["几何着色器", "曲面细分", "对比"],
  },
];
