import type { ReviewQuestion } from "./types";

/** PBRT 全书学习地图 复习题 */
export const pbtLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "pbt-learning-map-1",
    chapter: "pbt-learning-map",
    level: 1,
    question: "PBRT 全书分为哪五大板块？",
    answer: "辐射度量学、蒙特卡洛方法、BxDF 模型、光传输方程、系统架构。",
    tags: ["全书结构", "学习路径"],
  },
  {
    id: "pbt-learning-map-2",
    chapter: "pbt-learning-map",
    level: 2,
    question: "为什么五大板块要按「度量→采样→材料→方程→工程」的顺序学习？",
    answer: "因为存在递进依赖链：辐射度量学定义光的基本量（是后续所有公式的词汇），蒙特卡洛提供求解积分的数学工具，BxDF 用这些量和工具描述材料，光传输方程把前三者合成可求解的系统，系统架构保证在工程上可行。每一层都建立在前一层之上。",
    tags: ["学习路径", "递进关系"],
  },
  {
    id: "pbt-learning-map-3",
    chapter: "pbt-learning-map",
    level: 3,
    question: "PBRT 中「基于物理」体现在哪三个核心要素上？",
    answer: "一是用辐射度量学（而非经验值）描述光的能量；二是用光传输方程（而非经验光照模型）描述光的传播；三是用物理测量的 BxDF 数据（而非手工调参）描述材料反射特性。三者共同保证渲染结果可预测、可验证。",
    tags: ["物理正确性", "核心要素"],
  },
  {
    id: "pbt-learning-map-4",
    chapter: "pbt-learning-map",
    level: 4,
    question: "对比 PBRT 与实时渲染（如 RTR4）在设计哲学上的根本差异。",
    answer: "PBRT 追求物理正确性——用蒙特卡洛逐步求解光传输方程，不牺牲精度，代价是每帧需要数分钟到数小时。RTR4 追求实时性——每帧 16.6ms 内完成，用大量近似和预计算（如预烘焙光照、屏幕空间技术）牺牲精度换速度。PBRT 是离线渲染的标杆，RTR4 是实时渲染的百科全书，两者在精度与速度的光谱上处于两端。",
    tags: ["设计哲学", "对比", "综合"],
  },
];