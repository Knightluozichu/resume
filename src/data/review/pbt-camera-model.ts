import type { ReviewQuestion } from "./types";

/** 相机模型与采样 复习题 */
export const pbtCameraModelQuestions: ReviewQuestion[] = [
  {
    id: "pbt-camera-model-1",
    chapter: "pbt-camera-model",
    level: 1,
    question: `针孔相机模型有什么特点？`,
    answer: `所有光线通过一个几何点，形成完美透视投影，无畸变、无景深，全场景清晰。是最简单的相机模型。`,
    tags: ["针孔相机", "基础"],
  },
  {
    id: "pbt-camera-model-2",
    chapter: "pbt-camera-model",
    level: 2,
    question: `为什么光线追踪从相机发出光线而不是从光源发出？`,
    answer: `因为从光源正向追踪效率极低——光源发出的光子中只有极少量到达相机。从相机反向追踪保证每条光线都对图像有贡献，效率高出几个数量级。光路可逆性保证结果相同。`,
    tags: ["光线追踪", "效率"],
  },
  {
    id: "pbt-camera-model-3",
    chapter: "pbt-camera-model",
    level: 3,
    question: `薄透镜模型如何产生景深？光圈如何影响景深范围？`,
    answer: `薄透镜在光圈上采样多个点，每个点发射光线。焦平面上的物体所有光线汇聚到同一像素（清晰），焦外物体光线分散形成散布圆（模糊）。光圈越大散布圆越大、景深越浅；光圈越小越接近针孔模型、景深越深。`,
    tags: ["薄透镜", "景深"],
  },
  {
    id: "pbt-camera-model-4",
    chapter: "pbt-camera-model",
    level: 4,
    question: `设计一个相机采样方案，同时实现抗锯齿和景深，并分析采样数对质量与性能的影响。`,
    answer: `对每个像素进行 N 个分层随机采样（抗锯齿），每个采样点再在透镜光圈上进行 M 个分层采样（景深），共 N×M 条光线。增加 N 消除锯齿，增加 M 使散景更平滑。总采样数 N×M 与噪声方差成反比，但渲染时间线性增长。实际中通常 N=4-16, M=4-16，配合自适应采样在噪声大的区域增加采样。`,
    tags: ["采样设计", "综合", "性能"],
  },
];