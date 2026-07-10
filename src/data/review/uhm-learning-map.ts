import type { ReviewQuestion } from "./types";

export const uhmLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "uhm-learning-map-1",
    chapter: "uhm-learning-map",
    level: 1,
    question: `Unity for HMI 全书的核心结构是什么？`,
    answer: `从 HMI 基础概念出发，经 UI 框架搭建、数据绑定、动画系统、输入处理，到性能优化、部署发布和高级 HMI 技术。呈「基础入门 → 核心技能 → 高级实践 → 总复习」的递进结构。`,
    tags: ["学习地图", "全书结构"],
  },
  {
    id: "uhm-learning-map-2",
    chapter: "uhm-learning-map",
    level: 2,
    question: `HMI 与普通游戏 UI 的核心区别是什么？`,
    answer: `HMI 面向工业/车载场景，强调实时性（数据刷新延迟低）、安全性（界面不能卡顿或崩溃）、确定性（行为可预测）。游戏 UI 追求视觉效果和体验，HMI 追求可靠性和信息传达效率。两者在刷新策略、渲染管线和测试标准上有本质区别。`,
    tags: ["HMI", "游戏UI", "区别"],
  },
  {
    id: "uhm-learning-map-3",
    chapter: "uhm-learning-map",
    level: 3,
    question: `推荐的学习路径是什么？如果跳过数据绑定直接学动画会有什么问题？`,
    answer: `推荐路径：HMI 基础 → UI 框架 → 数据绑定 → 动画 → 输入处理 → 性能 → 部署 → 高级。跳过数据绑定直接学动画，会导致不理解动画的触发来源——HMI 的动画不是装饰性的，而是数据变化的视觉反馈。没有数据驱动的动画只是空壳，无法响应真实状态变化。`,
    tags: ["学习路径", "数据绑定"],
  },
  {
    id: "uhm-learning-map-4",
    chapter: "uhm-learning-map",
    level: 4,
    question: `为什么说「UI 是门面，数据是灵魂，性能是底线」？这三者如何构成 HMI 的核心三角？`,
    answer: `UI 是用户直接感知的外在表现层，决定了信息传达效率。数据是驱动 UI 变化的核心引擎，仪表数值、状态变化都来自底层数据源，没有数据 HMI 就是无源之水。性能是可用性底线——车载 HMI 要求稳定 60fps，工业 HMI 要求毫秒级响应，性能不达标可能导致安全事故。三者构成「表现→驱动→保障」的闭环：UI 展示数据，数据驱动 UI，性能保障两者可靠运行。`,
    tags: ["设计逻辑", "核心三角", "综合"],
  },
];
