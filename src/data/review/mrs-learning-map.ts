import type { ReviewQuestion } from "./types";
export const mrsLearningMapQuestions: ReviewQuestion[] = [
  { id: "mrs-learning-map-1", chapter: "mrs-learning-map", level: 1, question: "官方17章分成哪五段学习链？", answer: "工程基础、类型与安全、并发与底层、服务端工程、跨平台与调试；顺序从反馈环和静态契约推进到外部系统与证据闭环。", tags: ["导览", "结构"] },
  { id: "mrs-learning-map-2", chapter: "mrs-learning-map", level: 2, question: "为什么类型与安全必须先于并发和FFI？", answer: "线程共享和跨语言调用都依赖所有权、别名、生命周期和错误契约；基础不清时，unsafe只会隐藏尚未理解的问题。", tags: ["依赖", "安全"] },
  { id: "mrs-learning-map-3", chapter: "mrs-learning-map", level: 3, question: "如何验收一章而不是只读完一章？", answer: "先预测类型和状态，再运行最小示例；补正常、边界、失败和资源中断测试，保存工具链、命令、退出状态与关键输出。", tags: ["实验", "证据"] },
  { id: "mrs-learning-map-4", chapter: "mrs-learning-map", level: 4, question: "如何处理原书2019年前后的生态API？", answer: "保留Cargo项目模型、类型安全、背压、事务和调试等架构不变量，具体crate API按项目锁定版本的维护文档迁移。", tags: ["迁移", "版本"] },
];
