import type { ReviewQuestion } from "./types";

/** 全局光照全书学习地图 复习题 */
export const gilLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "gil-learning-map-1",
    chapter: "gil-learning-map",
    level: 1,
    question: `全局光照全书分为哪四大板块？`,
    answer: `直接与间接光、离线GI方法、采样理论、实时GI。`,
    tags: ["全书结构", "学习路径"],
  },
  {
    id: "gil-learning-map-2",
    chapter: "gil-learning-map",
    level: 2,
    question: `为什么四大板块要按「概念→方法→理论→工程」的顺序学习？`,
    answer: `因为存在递进依赖：直接/间接光是概念基础（理解什么是GI），离线方法是原理学习（辐射度/路径追踪/光子映射如何工作），采样理论是数学工具（重要性采样/有偏无偏如何优化），实时GI是工程目标（在毫秒预算内近似GI）。每一层都建立在前一层之上。`,
    tags: ["学习路径", "递进关系"],
  },
  {
    id: "gil-learning-map-3",
    chapter: "gil-learning-map",
    level: 3,
    question: `GI 与直接光照渲染的根本区别是什么？`,
    answer: `直接光照只计算光从光源到表面的一次弹射，阴影区域纯黑。GI计算所有光弹射（直接+间接），间接光来自其他表面的反射，填充阴影、传递色彩、产生环境光效果。GI更真实但计算量呈指数增长。`,
    tags: ["GI", "直接光照"],
  },
  {
    id: "gil-learning-map-4",
    chapter: "gil-learning-map",
    level: 4,
    question: `对比离线GI与实时GI的技术路线差异，分析各自的核心挑战。`,
    answer: `离线GI用蒙特卡洛路径追踪，无采样数上限，核心挑战是噪声收敛速度（方差降低技术）。实时GI预算仅几毫秒，用近似方法（RSM将间接光烘焙到纹理，LPV在3D网格中传播光照，VPL用虚拟点光源近似），核心挑战是在有限预算内逼近离线质量。降噪技术是实时GI的关键桥梁——低采样+AI降噪可接近离线质量。`,
    tags: ["离线GI", "实时GI", "综合"],
  },
];