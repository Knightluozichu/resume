import type { ReviewQuestion } from "./types";

/** Modern C++ Design · 官方十一章学习地图复习题。 */
export const mcdLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "mcd-learning-map-1",
    chapter: "mcd-learning-map",
    level: 1,
    question: "官方 11 章如何分成 Part I Techniques 与 Part II Components？",
    answer: "Part I 第1-4章依次建立 Policy class design、compile-time techniques、Typelists/class generation、小对象分配；Part II 第5-11章依次构建 Functor、SingletonHolder、SmartPtr、Object Factory、Abstract Factory、Visitor、Multimethod dispatcher。后七章持续复用前四章的策略、traits、类型列表和分层状态机。",
    tags: ["官方11章", "Part I", "Part II"],
  },
  {
    id: "mcd-learning-map-2",
    chapter: "mcd-learning-map",
    level: 2,
    question: "为什么推荐先读第1-3章，再读 allocator 和七个组件？",
    answer: "第1章给出正交 Policy/Host，第二章给出 specialization/tag/traits 检测，第三章把类型序列变成 class generation schema。第4章先用分层 allocator 展示真实状态机，随后 Functor/Singleton/SmartPtr/Factories/Visitor/Multimethods 才能读出其生成路径与 contract，而非把模板当黑盒。",
    tags: ["依赖", "学习顺序", "工具箱"],
  },
  {
    id: "mcd-learning-map-3",
    chapter: "mcd-learning-map",
    level: 3,
    question: "全书哪些决策在编译期，哪些仍必须运行时？",
    answer: "Policy组合、traits、Typelist算法和class generation主要在编译期；Functor擦除、Factory ID lookup、Acyclic Visitor RTTI、Multimethod pair lookup与多数 object lifetimes仍在运行时。Modern C++ Design不是把一切静态化，而是把选择时机做成显式design dimension。",
    tags: ["编译期", "运行时", "选择时机"],
  },
  {
    id: "mcd-learning-map-4",
    chapter: "mcd-learning-map",
    level: 4,
    question: "今天重写书中代码时，哪些现代设施替代旧机制但保留原思想？",
    answer: "用 static_assert/concepts/type_traits 替代手工检测；parameter packs/tuple 替代宏 Typelist；pmr/mature allocators替代通用自研 pool；std::function/move_only_function、unique/shared/weak_ptr、magic static/call_once、type_index、variant/std::visit替代对应基础实现。仍保留 Policy分解、schema生成、ownership/lifetime和扩展方向分析。",
    tags: ["现代 C++", "迁移", "设计思想"],
  },
];
