import type { ReviewQuestion } from "./types";

export const ctcLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "ctc-learning-map-1",
    chapter: "ctc-learning-map",
    level: 1,
    question: "C# 10 核心技术指南全书分为哪四大板块？每板块包含哪些章节？",
    answer: "四大板块：1）语言核心（第1-2章：学习地图、类型系统总览）；2）类型系统（第3-4章：泛型深入、委托与事件）；3）异步并发（第5-6章：异步深入、并行与TPL）；4）现代特性（第7-10章：模式匹配、Record与结构体、源生成器、总复习）。",
    tags: ["学习路径", "四大板块", "全书结构"],
  },
  {
    id: "ctc-learning-map-2",
    chapter: "ctc-learning-map",
    level: 2,
    question: "为什么类型系统总览必须排在泛型深入之前？它们之间的依赖关系是什么？",
    answer: "类型系统是泛型的基础。泛型本质是类型参数化——理解值类型与引用类型的内存模型，才能理解为什么 List<int> 不装箱而 ArrayList 会装箱。泛型约束（where T : class/struct）直接依赖类型系统的分类。不理解类型系统就读不懂泛型的编译模型和协变逆变的安全约束。",
    tags: ["类型系统", "泛型", "依赖关系", "学习顺序"],
  },
  {
    id: "ctc-learning-map-3",
    chapter: "ctc-learning-map",
    level: 3,
    question: "异步深入和并行与TPL之间有什么依赖关系？Task 在两者中分别扮演什么角色？",
    answer: "异步深入是并行TPL的基础——Task是两者的共同抽象。async/await的Task<T>是泛型异步结果，continuation使用委托。并行TPL的Parallel.For和PLINQ依赖泛型委托Action<T>。异步解决I/O不阻塞线程的问题，并行解决CPU密集计算利用多核的问题。两者正交但共享Task抽象，先学异步才能理解并行中Task的调度。",
    tags: ["异步", "并行", "Task", "依赖关系"],
  },
  {
    id: "ctc-learning-map-4",
    chapter: "ctc-learning-map",
    level: 4,
    question: "C# 10 的三大设计理念是什么？请结合具体特性说明每个理念如何体现。",
    answer: "1）类型安全优先：泛型消除装箱和类型不安全、可空引用类型编译时防null、委托检查方法签名。编译时尽可能捕获错误。2）多范式融合：OOP（class）、函数式（record不可变、模式匹配、with表达式）、命令式（循环可变）、声明式（LINQ、模式匹配）。C# 10不强制单一范式。3）性能不妥协：ValueTask省堆分配、record struct避免堆分配、源生成器消除运行时反射、Span<T>零拷贝。安全与性能兼得，不因安全牺牲速度。",
    tags: ["设计理念", "类型安全", "多范式", "性能"],
  },
];
