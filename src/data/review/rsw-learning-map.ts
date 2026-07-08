import type { ReviewQuestion } from "./types";

/** 学习地图 复习题 */
export const rswLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "rsw-learning-map-1",
    chapter: "rsw-learning-map",
    level: 1,
    question: "Rust 编程之道全书分为哪四大板块？",
    answer: "Rust 基石（所有权与借用）、类型系统（Trait、泛型与生命周期）、错误与安全（错误处理、unsafe、并发）、高级工程（async 运行时、宏、总复习）。",
    tags: ["全书结构", "学习路径"],
  },
  {
    id: "rsw-learning-map-2",
    chapter: "rsw-learning-map",
    level: 2,
    question: "为什么四大板块要按「基石→类型→安全→工程」的顺序学习？",
    answer: "因为建立了递进能力链：所有权是理解一切的基础（内存如何分配释放），类型系统是抽象复用的骨架，错误与安全是工程稳健的保障，高级工程是生产级能力。每一层都建立在前一层之上——不理解所有权就无法理解生命周期，不理解生命周期就无法理解并发中的引用安全。",
    tags: ["学习路径", "递进关系"],
  },
  {
    id: "rsw-learning-map-3",
    chapter: "rsw-learning-map",
    level: 3,
    question: "Rust 的「零成本抽象」是什么意思？用迭代器举例说明。",
    answer: "零成本抽象指高层抽象编译后与手写底层代码一样高效，不为不用的功能付代价。例如 vec.iter().map(|x| x*2).filter(|x| x>5).sum() 这串链式调用看似有多次遍历，编译器优化成单次遍历，无中间集合分配，与手写 for 循环一样快。",
    tags: ["零成本抽象", "迭代器"],
  },
  {
    id: "rsw-learning-map-4",
    chapter: "rsw-learning-map",
    level: 4,
    question: "对比 Rust、C++、Go 在内存安全与性能上的设计取舍，说明 Rust 之道的特点。",
    answer: "C++ 把内存安全全交给程序员，性能极致但运行时崩溃常见；Go 用 GC 换安全，牺牲精细控制与一定性能；Rust 用所有权模型在编译期证明内存安全与线程安全，运行时零额外开销（无 GC）。Rust 之道的特点是「编译期安全 + 运行时零成本」——把运行时错误前移到编译期，同时不为安全检查付运行时代价。",
    tags: ["语言对比", "设计哲学", "综合"],
  },
];
