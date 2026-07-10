import type { ReviewQuestion } from "./types";

export const GpgGeometryQuestions: ReviewQuestion[] = [
  {
    id: "gpg-geometry-1",
    chapter: "gpg-geometry",
    level: 1,
    question: `LOD 策略的核心思想是什么？`,
    answer: `根据物体与相机距离用不同精度模型渲染，近处高细节、远处低细节，平衡画质与性能。`,
    tags: ["LOD", "细节层次"],
  },
  {
    id: "gpg-geometry-2",
    chapter: "gpg-geometry",
    level: 2,
    question: `曲面细分管线的三个阶段分别做什么？`,
    answer: `壳着色器（HS）接收控制点计算细分因子；细分器（固定功能）根据因子在面片内生成新顶点坐标；域着色器（DS）用曲面公式从坐标和控制点计算顶点最终位置和属性。`,
    tags: ["曲面细分", "管线"],
  },
  {
    id: "gpg-geometry-3",
    chapter: "gpg-geometry",
    level: 3,
    question: `为什么 GPU 端曲面细分比 CPU 预生成多 LOD 更灵活？`,
    answer: `CPU 预生成 LOD 是离散的（高/中/低三档），切换有跳变且占更多显存。GPU 曲面细分是连续的，细分因子可逐帧根据距离平滑变化无缝过渡，且只在需要的面片上发生不增加整体内存。`,
    tags: ["曲面细分", "LOD", "GPU"],
  },
  {
    id: "gpg-geometry-4",
    chapter: "gpg-geometry",
    level: 4,
    question: `LOD 切换时的 popping 问题如何解决？geomorphing 和曲面细分各有什么优劣？`,
    answer: `Popping 是离散 LOD 切换时的视觉跳变。Geomorphing 在切换距离区间内对两个 LOD 渐变插值，实现平滑过渡但需预存两个 LOD。曲面细分在 GPU 端连续调整细分因子，无缝且省内存但只能用于可参数化的曲面。实际项目常两者结合。`,
    tags: ["popping", "geomorphing", "LOD"],
  },
];
