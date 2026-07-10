import type { ReviewQuestion } from "./types";

/** 精通 Rust 第2版 学习地图 复习题 */
export const mrsLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "mrs-learning-map-1",
    chapter: "mrs-learning-map",
    level: 1,
    question: `《精通 Rust 第2版》全书四大板块的名称和顺序是什么？`,
    answer: `四大板块按递进顺序：1) Rust 进阶基础（学习地图、高级类型）——建立类型系统的深度认知；2) 内存与并发（内存管理、并发深入）——掌握 Rust 的核心竞争力所有权与线程安全；3) 元编程（宏深入、Trait 进阶、Unsafe 深入）——扩展编译期和底层能力；4) 生态与工程（WebAssembly、网络编程、总复习）——落地到实际工程场景。`,
    tags: ["四大板块", "学习路径", "基础"],
  },
  {
    id: "mrs-learning-map-2",
    chapter: "mrs-learning-map",
    level: 2,
    question: `为什么内存与并发板块排在元编程之前？这个顺序的依赖逻辑是什么？`,
    answer: `内存与并发是 Rust 的核心竞争力——所有权系统、借用检查、Send/Sync trait 是 Rust 区别于其他语言的根基。元编程（宏、Trait 进阶、Unsafe）建立在对类型系统和内存模型的理解之上：宏需要在编译期操作语法树，Trait 进阶涉及关联类型和泛型约束，Unsafe 直接绕过安全检查操作裸指针。不理解内存模型就无法安全地使用 Unsafe，不理解所有权就无法设计正确的 Trait。因此内存与并发是元编程的前置依赖。`,
    tags: ["板块依赖", "内存模型", "理解"],
  },
  {
    id: "mrs-learning-map-3",
    chapter: "mrs-learning-map",
    level: 3,
    question: `一个有 C++ 经验的开发者学习本书，应该如何规划重点章节？`,
    answer: `C++ 开发者已有内存管理经验，但需要重点理解 Rust 的差异：1) Rust 进阶基础——快速过，但需理解 Newtype、DST 等 Rust 独有概念；2) 内存与并发——这是核心，重点学所有权系统与 C++ RAII 的区别、借用检查器如何替代手动管理、Send/Sync 如何在编译期保证线程安全（C++ 靠运行时纪律，Rust 靠编译器强制）；3) 元编程——宏系统与 C++ 模板差异大，需重点学声明宏和过程宏；Unsafe 可对照 C++ 裸指针经验快速掌握；4) 生态与工程——WebAssembly 是 Rust 的优势领域，C++ 开发者可重点学。总之，内存与并发是最大差异点，应花最多时间。`,
    tags: ["学习规划", "C++经验", "应用"],
  },
  {
    id: "mrs-learning-map-4",
    chapter: "mrs-learning-map",
    level: 4,
    question: `如何用一句话概括 Rust 的设计哲学？这个哲学如何体现在四大板块中？`,
    answer: `Rust 的设计哲学是「零成本抽象 + 编译期安全」——在不牺牲运行时性能的前提下，把尽可能多的安全检查推到编译期。这个哲学体现在四大板块：1) 进阶基础——Newtype 和类型别名是零成本抽象（编译期消除，运行时无开销），类型系统在编译期防止错误；2) 内存与并发——所有权和 Send/Sync 是零成本的编译期安全保证，无 GC 也能内存安全，无锁也能线程安全；3) 元编程——宏在编译期展开，无运行时开销；Unsafe 把安全边界显式化，集中在可审计的代码块中；4) 生态与工程——WebAssembly 追求零成本跨平台，网络编程利用 async 零成本抽象。全书每个板块都在践行这一哲学。`,
    tags: ["设计哲学", "零成本抽象", "编译期安全", "综合"],
  },
];
