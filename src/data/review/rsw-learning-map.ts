import type { ReviewQuestion } from "./types";

export const rswLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "rsw-learning-map-1",
    chapter: "rsw-learning-map",
    level: 1,
    question: "《Rust编程之道》13章按顺序是什么？",
    answer: "新时代的语言、语言精要、类型系统、内存管理、所有权系统、函数闭包和迭代器、结构化编程、字符串与集合、构建健壮的程序、模块化开发、安全并发、元编程、超越安全边界。",
    tags: ["官方目录", "学习路径"],
  },
  {
    id: "rsw-learning-map-2",
    chapter: "rsw-learning-map",
    level: 2,
    question: "为什么内存管理与所有权系统必须保留为两个独立章节？",
    answer: "内存管理解释栈、堆、布局、RAII和泄漏等表示与释放机制；所有权系统解释绑定、move、borrow、生命周期和共享模型。引用关系不能替代物理表示，二者相连但不等价。",
    tags: ["内存管理", "所有权"],
  },
  {
    id: "rsw-learning-map-3",
    chapter: "rsw-learning-map",
    level: 3,
    question: "预测、执行、扰动、解释四阶段门禁分别提供什么证据？",
    answer: "预测给出可证伪模型，执行提供固定环境结果，扰动暴露边界和失败位置，解释要求脱离示例重建类型、owner、状态与阶段关系。",
    tags: ["掌握门禁", "证据"],
  },
  {
    id: "rsw-learning-map-4",
    chapter: "rsw-learning-map",
    level: 4,
    question: "一个异步服务发生死锁时如何沿章节逆向诊断？",
    answer: "先回第11章检查锁、await、条件谓词和关闭，再回第5章共享owner与内部可变性、第9章超时取消错误通道、第10章模块边界；涉及外部指针时再查第13章安全协议。",
    tags: ["逆向诊断", "综合"],
  },
];
