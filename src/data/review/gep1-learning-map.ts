import type { ReviewQuestion } from "./types";

export const gep1LearningMapQuestions: ReviewQuestion[] = [
  {
    id: "gep1-learning-map-1",
    chapter: "gep1-learning-map",
    level: 1,
    question: `卷1《基础框架》的三阶段递进结构是什么？`,
    answer: `地基层（引擎架构/内存/数学/变换）→ 运行时层（渲染/资源）→ 组织通信层（场景图/事件）。顺序由依赖关系决定：上层依赖下层，地基不稳则运行时无法高效。`,
    tags: ["学习地图", "三阶段"],
  },
  {
    id: "gep1-learning-map-2",
    chapter: "gep1-learning-map",
    level: 2,
    question: `为什么说「内存系统是地基中的地基」？`,
    answer: `引擎几乎所有对象都要从内存分配器取内存。通用 malloc 分配时间不可控（可能触发系统调用导致帧抖动）。自定义分配器（栈/池/单帧）让分配变成可预测的指针移动，是稳定帧率的第一道防线。没有可靠的内存系统，上层优化都建立在沙子上。`,
    tags: ["内存系统", "地基"],
  },
  {
    id: "gep1-learning-map-3",
    chapter: "gep1-learning-map",
    level: 3,
    question: `用「一帧的旅程」描述卷1 各模块在一帧中的调用顺序。`,
    answer: `帧开始：内存系统单帧分配器 Reset → 事件系统 Dispatch 上帧积压事件 → 变换系统 Update 世界矩阵 → 场景图更新包围球+视锥剔除 → 渲染管线 CPU 侧排序合批、GPU 侧绘制 → 资源管理异步加载/卸载 → 帧结束等下帧 Reset。数学库在变换和渲染中被反复调用。`,
    tags: ["游戏循环", "模块协作"],
  },
  {
    id: "gep1-learning-map-4",
    chapter: "gep1-learning-map",
    level: 4,
    question: `如果跳过地基直接学渲染，会遇到什么问题？请综合分析。`,
    answer: `渲染管线依赖数学库做空间变换（MVP 矩阵）、依赖内存系统做数据布局（顶点缓冲的分配）、依赖场景图做剔除（提供可见物体列表）。地基没打牢，学渲染只会停留在「调图形 API」层面：遇到帧时间抖动不知道是内存分配问题、遇到剔除效率低不知道是空间分割问题、遇到变换错误不知道是矩阵乘法顺序问题。地基知识是诊断性能与正确性问题的「底层语言」。`,
    tags: ["综合", "学习路径"],
  },
];
