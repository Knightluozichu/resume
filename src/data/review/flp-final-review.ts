import type { ReviewQuestion } from "./types";
export const flpFinalReviewQuestions: ReviewQuestion[] = [
  { id: "flp-final-review-1", chapter: "flp-final-review", level: 1, question: "Python数据模型贯穿全书的作用是什么？", answer: "它让对象通过特殊方法、协议和描述符接入语法，并为序列、函数、类型、并发与元编程提供共同分派模型。", tags: ["总复习", "数据模型"] },
  { id: "flp-final-review-2", chapter: "flp-final-review", level: 2, question: "动态能力和静态类型怎样协作？", answer: "运行时仍按协议和对象行为分派，类型提示在开发阶段约束结构；外部数据和值域仍由运行验证和测试负责。", tags: ["总复习", "类型"] },
  { id: "flp-final-review-3", chapter: "flp-final-review", level: 3, question: "怎样选择线程、进程和协程？", answer: "根据I/O或CPU瓶颈、隔离需求、库是否阻塞、取消模型和容量预算选择，并以吞吐、延迟与失败证据验证。", tags: ["总复习", "并发"] },
  { id: "flp-final-review-4", chapter: "flp-final-review", level: 4, question: "何时元编程已经过度？", answer: "当普通函数、组合、property、descriptor、init_subclass或类装饰器足以表达规则，而元类只让求值时机和失败位置更难追踪时，就是过度。", tags: ["总复习", "元编程"] },
];
