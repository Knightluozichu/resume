import type { ReviewQuestion } from "./types";

/** Modern C++ Design · 十一章综合复盘题。 */
export const mcdFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "mcd-final-review-1",
    chapter: "mcd-final-review",
    level: 1,
    question: "如何把插件式场景系统映射到官方 11 章，而不是堆模式名称？",
    answer: "Ch1-3定义compile/runtime policies、traits与type schema；Ch4决定节点allocation lifetime；Ch5统一callbacks；Ch6限制真正global services并规划shutdown；Ch7编码resource ownership；Ch8-9完成plugin creator与backend family；Ch10对稳定nodes增加operations；Ch11处理两个动态对象交互。每层都有compatibility/lifetime/unload gate。",
    tags: ["综合", "十一章", "系统映射"],
  },
  {
    id: "mcd-final-review-2",
    chapter: "mcd-final-review",
    level: 2,
    question: "这个系统中最关键的三条跨章不变量是什么？",
    answer: "一是type schema/registry key与实际dynamic object一致；二是owner/module lease覆盖callback、vtable、deleter与in-flight dispatch；三是compile-time Policy/ConcreteList组合满足family、thread、clone与storage contracts。任何模板生成或registry lookup都不能替代这些语义证明。",
    tags: ["不变量", "ownership", "plugin"],
  },
  {
    id: "mcd-final-review-3",
    chapter: "mcd-final-review",
    level: 3,
    question: "如何决定用 Visitor、Multimethod、Object Factory 或 Abstract Factory？",
    answer: "ID到一个product用Object Factory；一次选择相容products family用Abstract Factory；stable element hierarchy上频繁新增一元operations用Visitor；操作同时依赖多个dynamic object types用Multimethod。先识别selection key与扩展方向，再选机制；不能用一个global registry吞掉所有关系。",
    tags: ["选型", "扩展方向", "dispatch"],
  },
  {
    id: "mcd-final-review-4",
    chapter: "mcd-final-review",
    level: 4,
    question: "何时应该拒绝 Loki 风格高度模板化实现，改用标准库或显式运行时结构？",
    answer: "当选择必须runtime变化、public ABI需稳定、模板编译/code size/diagnostics超过收益，或标准unique/shared_ptr、pmr、function、variant已准确表达contract时应拒绝自研。只有非标准语义和测得的约束值得custom Policy component，且要有compatibility tests、ownership graph、failure/shutdown/unload protocol。",
    tags: ["停止规则", "标准库", "工程取舍"],
  },
];
