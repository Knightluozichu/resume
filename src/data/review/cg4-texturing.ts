import type { ReviewQuestion } from "./types";

/** 纹理映射技术 复习题 */
export const cg4TexturingQuestions: ReviewQuestion[] = [
  {
    id: "cg4-texturing-1",
    chapter: "cg4-texturing",
    level: 1,
    question: `什么是纹理映射？UV 坐标的作用是什么？`,
    answer: `纹理映射是将 2D 纹理图像贴合到 3D 几何表面的技术。UV 坐标 (u, v) 是纹理空间中的 2D 坐标，范围通常为 [0,1]，定义了每个顶点对应纹理图像上的哪个位置。光栅化时 UV 坐标通过重心坐标插值到每个片段，片段着色器用插值后的 UV 从纹理中采样颜色。`,
    tags: ["纹理映射", "UV坐标"],
  },
  {
    id: "cg4-texturing-2",
    chapter: "cg4-texturing",
    level: 2,
    question: `最近邻采样和双线性采样的区别是什么？各自什么场景使用？`,
    answer: `最近邻采样：取离采样坐标最近的纹素颜色，速度快但产生块状锯齿。双线性采样：取 4 个最近邻纹素按距离加权平均，结果平滑但有轻微模糊。最近邻适合像素风格游戏（需要保留硬边缘）或性能受限场景。双线性是默认选择，适合大多数 3D 渲染。高质量场景还可用三线性（Mipmap 层间双线性混合）或各向异性过滤（处理斜角观察）。`,
    tags: ["采样方法", "双线性", "最近邻"],
  },
  {
    id: "cg4-texturing-3",
    chapter: "cg4-texturing",
    level: 3,
    question: `Mipmap 是什么？它如何解决纹理 aliasing 问题？`,
    answer: `Mipmap 是预生成的多级纹理金字塔——原始纹理是 Level 0，每级将上一级缩小一半直到 1x1。渲染时根据片段的纹理密度选择合适级别（或混合相邻两级）。它解决 aliasing（远处纹理的摩尔纹/闪烁）因为远处片段覆盖多个纹素，用低分辨率 Mipmap 等价于预计算的区域平均。代价是额外 1/3 内存（1+1/4+1/16+...≈4/3）。选择级别的方法基于屏幕空间纹素密度。`,
    tags: ["Mipmap", "aliasing", "多级纹理"],
  },
  {
    id: "cg4-texturing-4",
    chapter: "cg4-texturing",
    level: 4,
    question: `法线贴图的原理是什么？为什么它能用 2D 纹理模拟 3D 几何细节？有什么限制？`,
    answer: `法线贴图存储逐纹素的法线方向（RGB 编码 [-1,1] 的 XYZ），替代几何法线参与光照计算。原理是光照（Phong/Blinn-Phong）主要依赖法线方向——改变法线就能改变光照分布，从而在平坦表面上产生凹凸错觉。关键是将法线从切线空间变换到世界空间（用 TBN 矩阵：Tangent, Bitangent, Normal）。限制：1) 轮廓边缘无法产生真实位移（侧面看仍是平的）；2) 不改变实际几何，无自阴影；3. 需要 Parallax Mapping 或 Displacement Mapping 来进一步增强。`,
    tags: ["法线贴图", "切线空间", "TBN矩阵"],
  },
];
