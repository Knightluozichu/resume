import type { ReviewQuestion } from "./types";

/** 直接光与间接光 复习题 */
export const gilDirectIndirectQuestions: ReviewQuestion[] = [
  {
    id: "gil-direct-indirect-1",
    chapter: "gil-direct-indirect",
    level: 1,
    question: `直接光照和间接光照的区别是什么？`,
    answer: `直接光照是光从光源经一次反射到达相机，显式采样光源高效计算。间接光照是光经两次或更多次反射到达相机，需递归追踪，是GI核心开销。`,
    tags: ["直接光照", "间接光照"],
  },
  {
    id: "gil-direct-indirect-2",
    chapter: "gil-direct-indirect",
    level: 2,
    question: `色渗透是如何产生的？`,
    answer: `白光照到彩色表面（如红墙），红墙反射红光，反射的红光照到邻近白色表面使其泛红。这是间接光的自然结果，编码了物体间的空间关系。`,
    tags: ["色渗透", "间接光"],
  },
  {
    id: "gil-direct-indirect-3",
    chapter: "gil-direct-indirect",
    level: 3,
    question: `为什么环境光遮蔽(AO)是GI的最低成本近似？它丢失了什么信息？`,
    answer: `AO假设间接光均匀来自四面八方，只在角落和缝隙处因几何遮挡减少。计算只需射线测试遮挡，无需递归追踪，成本极低。丢失了间接光的方向性（来自红墙方向应有红色）、强度变化（亮表面反射更多间接光）和色彩信息（AO是灰度的），只是间接光的粗糙几何近似。`,
    tags: ["AO", "近似"],
  },
  {
    id: "gil-direct-indirect-4",
    chapter: "gil-direct-indirect",
    level: 4,
    question: `设计一个分层GI方案，平衡质量与性能，适用于室内场景。`,
    answer: `1)直接光照：显式采样所有光源，保证硬阴影质量。2)一次弹射间接光：用光线追踪采样BRDF方向，贡献主要的色渗透和间接方向性。3)多次弹射间接光：用预计算的辐照度场(irradiance volume)或辐照度图(irradiance map)近似，避免递归追踪开销。4)AO：用屏幕空间SSAO补充角落暗化。5)降噪：对一次弹射结果用时空降噪(SVGF)消除噪声。这样直接光精确、一次弹射有方向性和色彩、多次弹射有预计算基础、AO补充细节，在有限预算内逼近离线GI质量。`,
    tags: ["GI方案", "综合", "性能"],
  },
];