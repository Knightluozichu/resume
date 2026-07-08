import type { ReviewQuestion } from "./types";

export const glsTextureMappingQuestions: ReviewQuestion[] = [
  {
    id: "gls-texture-mapping-1",
    chapter: "gls-texture-mapping",
    level: 1,
    question: "多层纹理(Multitexturing)如何实现？",
    answer: "着色器中声明多个sampler2D，分别绑定到不同纹理单元。glActiveTexture(GL_TEXTURE0/1/2)绑定纹理，uniform设为单元编号。片段着色器中混合多个纹理(如基础色+法线+高光)。",
    tags: ["多层纹理"],
  },
  {
    id: "gls-texture-mapping-2",
    chapter: "gls-texture-mapping",
    level: 2,
    question: "纹理压缩格式有哪些？优势？",
    answer: "BC1-7(DXT/S3TC,桌面)、ASTC(移动/桌面)、ETC2(移动)。优势:减少显存4-8倍、减少带宽提升性能、GPU硬件解压零开销。质量有损但视觉影响小。",
    tags: ["纹理压缩"],
  },
  {
    id: "gls-texture-mapping-3",
    chapter: "gls-texture-mapping",
    level: 3,
    question: "各向异性过滤解决什么问题？",
    answer: "斜角观察表面时标准Mipmap过度模糊。各向异性过滤沿观察方向采样多个纹素(非正方形区域)，保持斜角清晰度。最高16x，代价是增加采样开销。",
    tags: ["各向异性"],
  },
  {
    id: "gls-texture-mapping-4",
    chapter: "gls-texture-mapping",
    level: 4,
    question: "纹理数组和纹理图集的区别？",
    answer: "纹理数组:同尺寸纹理存一个数组，着色器用索引选择，不跨纹理边界。纹理图集:多纹理拼一张大图，UV坐标映射子区域，可能跨边界采样。数组更干净但要求同尺寸。",
    tags: ["纹理数组", "纹理图集"],
  },
];
