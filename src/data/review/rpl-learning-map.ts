import type { ReviewQuestion } from "./types";

/** 学习地图 复习题 */
export const rplLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "rpl-learning-map-1",
    chapter: "rpl-learning-map",
    level: 1,
    question: `Rust 所有权系统的核心规则是什么？`,
    answer: `三条规则：1.每个值在任意时刻有且仅有一个所有者。2.当所有者离开作用域值被 drop。3.赋值或传参时所有权转移（move），原变量失效。三条规则让 Rust 编译期保证内存安全无需 GC。`,
    tags: ["所有权","move","drop","作用域"],
  },
  {
    id: "rpl-learning-map-2",
    chapter: "rpl-learning-map",
    level: 2,
    question: `本书四大板块的顺序是什么？为什么？`,
    answer: `基础语法（所有权）→类型系统（借用、生命周期）→高级特性（trait、错误处理、泛型）→并发与现代特性（线程、async）。建立因果链：所有权是一切基础，借用建立在所有权之上，trait 和泛型是类型系统高级应用，并发 async 是综合应用。`,
    tags: ["学习路径","四大板块","所有权"],
  },
  {
    id: "rpl-learning-map-3",
    chapter: "rpl-learning-map",
    level: 3,
    question: `Rust 相比 C/C++ 和 GC 语言在内存管理上有什么独特优势？`,
    answer: `相比 C/C++：编译期保证内存安全（无 use-after-free、double-free、悬空指针），所有权自动决定释放时机。相比 GC 语言：无运行时 GC 停顿，确定性释放（离开作用域即 drop），零运行时开销。独特优势：编译期内存安全+确定性释放+零运行时开销。`,
    tags: ["Rust","内存管理","GC","编译期安全"],
  },
  {
    id: "rpl-learning-map-4",
    chapter: "rpl-learning-map",
    level: 4,
    question: `为什么说不理解所有权就无法写 Rust？给出三个场景。`,
    answer: `1.函数传参：不理解 move，传 String 给函数后调用方继续使用编译错误，需理解借用或 clone。2.集合存储：对象存入 Vec 后原变量失效，需理解所有权转移到集合。3.闭包捕获：异步代码中闭包捕获变量可能已 drop，需理解 move 闭包显式转移所有权或用 Arc<Mutex> 共享。`,
    tags: ["所有权","move","借用","闭包"],
  }
];
