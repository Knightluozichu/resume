import type { ReviewQuestion } from "./types";

export const uapLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "uap-learning-map-1",
    chapter: "uap-learning-map",
    level: 1,
    question: "Unity 3D 高级编程全书的四个阶段是什么？",
    answer: "架构（设计原则+设计模式）、性能（内存管理+渲染优化）、系统（UI 框架+网络同步）、工程（热更新+CI/CD）。四阶段递进：先立架构骨架，再守性能底线，后搭系统上层，最后建工程护城河。",
    tags: ["全书脉络", "学习路径"],
  },
  {
    id: "uap-learning-map-2",
    chapter: "uap-learning-map",
    level: 2,
    question: "主程和普通开发者的核心区别是什么？",
    answer: "普通开发者关心「功能怎么实现」，主程关心「项目怎么扛」。主程价值在跨系统决策：架构能否长期演进、性能能否扛住机型碎片、工程能否让团队安全迭代。主程不是写更多代码，而是做正确的架构和工程决策，让团队代码可维护、性能可预期、迭代可安全。",
    tags: ["主程职责", "能力域"],
  },
  {
    id: "uap-learning-map-3",
    chapter: "uap-learning-map",
    level: 3,
    question: "为什么说架构阶段是全书的地基，必须优先补齐？",
    answer: "架构决定代码能否长期演进。没有分层，模块循环依赖，改一处波及全局；没有 DI，类不可测试不可替换。性能、系统、工程都建立在架构之上：性能优化需要清晰模块边界才能定位瓶颈，系统对接需要统一接口契约，工程 CI 需要可测试的代码。架构歪了，上层全是债。所以一人补能力优先补架构。",
    tags: ["架构", "阶段依赖"],
  },
  {
    id: "uap-learning-map-4",
    chapter: "uap-learning-map",
    level: 4,
    question: "用全书十章知识，描述一个 Unity 项目从原型到上线的完整主程决策链路。",
    answer: "1）原型期：架构先行（第2-3章）——分层+DI+模式，骨架可保留原型可丢弃；2）开发期：性能立规矩（第4-5章）——GC 零容忍、DrawCall 设预算、Profiler 常态化；3）联调期：系统打通（第6-7章）——UI 框架+网络同步对接；4）上线期：工程收尾（第8-9章）——热更新通道+CI/CD 流水线+自动化测试。每个需求到来走决策链：架构承接→模式选择→性能预算→系统对接→工程交付。",
    tags: ["决策链路", "综合", "全书"],
  },
];
