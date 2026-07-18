import type { ReviewQuestion } from "./types";

export const rswLifetimesQuestions: ReviewQuestion[] = [
  {
    id: "rsw-lifetimes-1",
    chapter: "rsw-lifetimes",
    level: 1,
    question: "String值、handle与字符buffer通常分别在哪里？",
    answer: "String逻辑值由栈上pointer、length、capacity等handle和堆上UTF-8 buffer组成；move通常转移handle和释放责任，不复制buffer。",
    tags: ["内存管理", "栈与堆"],
  },
  {
    id: "rsw-lifetimes-2",
    chapter: "rsw-lifetimes",
    level: 2,
    question: "size、alignment与padding分别表达什么？",
    answer: "Size是数组中相邻值的存储步长，alignment是合法地址倍数要求，padding是为满足字段或整体对齐插入的空隙；默认Rust布局不承诺稳定FFI顺序。",
    tags: ["内存布局", "对齐"],
  },
  {
    id: "rsw-lifetimes-3",
    chapter: "rsw-lifetimes",
    level: 3,
    question: "RAII在提前返回和panic时怎样工作？",
    answer: "资源owner离开scope时Drop清理，`?`提前返回和unwind通常也会析构已初始化局部值；abort或进程异常终止不保证执行，因此关键提交仍需显式错误边界。",
    tags: ["RAII", "Drop"],
  },
  {
    id: "rsw-lifetimes-4",
    chapter: "rsw-lifetimes",
    level: 4,
    question: "为什么Safe Rust仍可能内存泄漏，怎样修复Rc环？",
    answer: "内存安全不保证所有资源最终回收，Rc强引用环会让计数不归零。用强边表达owner、Weak表达父指针或回边，并在upgrade时处理目标已释放。",
    tags: ["泄漏", "Rc", "Weak"],
  },
];
