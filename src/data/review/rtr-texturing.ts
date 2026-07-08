import type { ReviewQuestion } from "./types";

export const RtrTexturingQuestions: ReviewQuestion[] = [
  {
    id: "rtr-texturing-1",
    chapter: "rtr-texturing",
    level: 1,
    question: "纹理映射的基本原理是什么？UV 坐标的作用是什么？",
    answer: "纹理映射把 2D 图像贴到 3D 表面。UV 坐标是顶点的 2D 纹理坐标（0-1 范围），定义顶点对应纹理图的哪个位置，光栅化时插值得到每个片元的 UV 再采样纹理。",
    tags: ["纹理映射", "UV"],
  },
  {
    id: "rtr-texturing-2",
    chapter: "rtr-texturing",
    level: 2,
    question: "mipmap 是什么？为什么能提升渲染质量和性能？",
    answer: "mipmap 是纹理的逐级降采样版本链（1/2, 1/4, 1/8...）。渲染远处物体时采样小 mip 避免锯齿（质量提升），且小 mip 在纹理缓存中命中率更高（性能提升）。代价是多占 1/3 显存。",
    tags: ["mipmap", "降采样"],
  },
  {
    id: "rtr-texturing-3",
    chapter: "rtr-texturing",
    level: 3,
    question: "各向异性过滤相比三线性过滤解决了什么问题？",
    answer: "三线性过滤在斜视角看地面时仍会模糊（因为两个轴向降采样程度相同）。各向异性过滤根据视角非均匀采样（沿视角方向多采样），让斜视角纹理更清晰。代价是采样次数增多。",
    tags: ["各向异性过滤", "三线性", "斜视角"],
  },
  {
    id: "rtr-texturing-4",
    chapter: "rtr-texturing",
    level: 4,
    question: "法线贴图为什么能在低模上呈现高模细节？它的局限是什么？",
    answer: "法线贴图存微表面法线扰动，让光照计算（点积）以为表面有凹凸，产生高光变化模拟细节。局限是它只改变法线不改变几何——轮廓仍是低模（边缘无凹凸），且在极端角度会穿帮（凸起没有遮挡阴影）。位移映射才能真改几何。",
    tags: ["法线贴图", "低模", "局限"],
  },
];
