import type { ReviewQuestion } from "./types";

export const glsVertexProcessingQuestions: ReviewQuestion[] = [
  {
    id: "gls-vertex-processing-1",
    chapter: "gls-vertex-processing",
    level: 1,
    question: `顶点着色器的主要职责？`,
    answer: `1)MVP坐标变换 2)计算并传递插值属性(UV/法线/颜色) 3)可选:骨骼动画/形态混合/粒子更新。输出gl_Position(裁剪空间)和out变量。`,
    tags: ["顶点着色器"],
  },
  {
    id: "gls-vertex-processing-2",
    chapter: "gls-vertex-processing",
    level: 2,
    question: `透视除法是什么？何时发生？`,
    answer: `将裁剪坐标(x,y,z,w)除以w得到NDC(x/w,y/w,z/w)。w与z相关(透视投影)使近大远小。在顶点着色器后、光栅化前由硬件自动执行。`,
    tags: ["透视除法", "NDC"],
  },
  {
    id: "gls-vertex-processing-3",
    chapter: "gls-vertex-processing",
    level: 3,
    question: `裁剪在哪个阶段进行？`,
    answer: `图元装配阶段，在透视除法后。裁剪空间中视锥体对应立方体(-w~w)。完全在外丢弃，跨越边界的裁剪生成新顶点。背面剔除也在此时。`,
    tags: ["裁剪"],
  },
  {
    id: "gls-vertex-processing-4",
    chapter: "gls-vertex-processing",
    level: 4,
    question: `如何在顶点着色器中实现骨骼动画？`,
    answer: `1)上传骨骼矩阵数组(UBO/SSBO) 2)每个顶点有骨骼索引和权重(layout) 3)顶点着色器中:最终矩阵=sum(weight[i]*boneMatrix[idx[i]]) 4)变换顶点位置和法线。权重和通常为1。`,
    tags: ["骨骼动画", "顶点着色器"],
  },
];
