import type { ReviewQuestion } from "./types";

/** 精通 Rust 第2版 总复习 复习题 */
export const mrsFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "mrs-final-review-1",
    chapter: "mrs-final-review",
    level: 1,
    question: "《精通 Rust 第2版》全书四大板块的顺序和依赖关系是什么？",
    answer: "四大板块：进阶基础（学习地图、高级类型）→ 内存与并发（内存管理、并发深入）→ 元编程（宏深入、Trait 进阶、Unsafe 深入）→ 生态与工程（WebAssembly、网络编程、总复习）。依赖关系递进：进阶基础建立类型系统深度认知（Newtype/DST/Never），内存与并发建立所有权和线程安全模型（Rust 核心），元编程建立在类型系统和内存模型之上（宏操作语法树、Trait 进阶需所有权理解、Unsafe 需内存模型），生态与工程综合前三者落地实际场景。跳过任一层上层悬空。",
    tags: ["四大板块", "学习路径", "基础"],
  },
  {
    id: "mrs-final-review-2",
    chapter: "mrs-final-review",
    level: 2,
    question: "如何用一句话概括 Rust 的设计哲学？它如何体现在全书各板块中？",
    answer: "设计哲学：「零成本抽象 + 编译期安全」——不牺牲运行时性能的前提下，把尽可能多的安全检查推到编译期。体现在各板块：1) 进阶基础——Newtype/类型别名是零成本抽象（编译期消除），类型系统编译期防类型混用；2) 内存并发——所有权是零成本内存安全（无 GC），Send/Sync 是零成本线程安全（编译期拒绝数据竞争）；3) 元编程——宏编译期展开零运行时开销，Unsafe 把安全边界显式化集中审计；4) 生态工程——async/await 编译为状态机零成本，wasm 跨平台零开销。核心理念：能编译通过就不会有内存安全或线程安全问题，且运行时与 C 一样快。",
    tags: ["设计哲学", "零成本抽象", "理解"],
  },
  {
    id: "mrs-final-review-3",
    chapter: "mrs-final-review",
    level: 3,
    question: "请设计一个 Rust 项目，综合运用所有权、并发、trait 和 unsafe，实现一个线程安全的内存池。",
    answer: "```rust\nuse std::sync::Mutex;\nuse std::alloc::{alloc, dealloc, Layout};\n\nstruct PoolInner {\n    ptr: *mut u8,\n    layout: Layout,\n    free_list: Vec<usize>,  // 空闲块偏移\n    block_size: usize,\n    capacity: usize,\n}\n\npub struct MemoryPool {\n    inner: Mutex<PoolInner>,\n}\n\n// SAFETY: PoolInner 通过 Mutex 保护，裸指针只在锁内使用\nunsafe impl Send for MemoryPool {}\nunsafe impl Sync for MemoryPool {}\n\nimpl MemoryPool {\n    pub fn new(block_size: usize, capacity: usize) -> Self {\n        let total = block_size * capacity;\n        let layout = Layout::from_size_align(total, 16).unwrap();\n        let ptr = unsafe { alloc(layout) };\n        let free_list = (0..capacity).collect();\n        Self {\n            inner: Mutex::new(PoolInner {\n                ptr, layout, free_list,\n                block_size, capacity,\n            }),\n        }\n    }\n\n    pub fn alloc(&self) -> Option<*mut u8> {\n        let mut inner = self.inner.lock().unwrap();\n        inner.free_list.pop().map(|offset| {\n            // SAFETY: offset < capacity, ptr 有效\n            unsafe { inner.ptr.add(offset * inner.block_size) }\n        })\n    }\n\n    pub fn dealloc(&self, ptr: *mut u8) {\n        let inner = self.inner.lock().unwrap();\n        let offset = unsafe { ptr.offset_from(inner.ptr) as usize };\n        // SAFETY: ptr 来自 alloc，offset 有效\n        // 这里需要 Mutex 保护 free_list 修改\n        drop(inner);\n        let mut inner = self.inner.lock().unwrap();\n        inner.free_list.push(offset / inner.block_size);\n    }\n}\n\nimpl Drop for MemoryPool {\n    fn drop(&mut self) {\n        let inner = self.inner.lock().unwrap();\n        // SAFETY: 释放自己分配的内存\n        unsafe { dealloc(inner.ptr, inner.layout); }\n    }\n}\n```\n\n综合了：所有权（Mutex 管理内部状态）、并发（Mutex+Send/Sync 线程安全）、trait（Drop 自动释放）、unsafe（裸指针内存操作）。每个 unsafe 块有 SAFETY 注释。",
    tags: ["内存池", "综合应用", "unsafe", "并发", "代码编写"],
  },
  {
    id: "mrs-final-review-4",
    chapter: "mrs-final-review",
    level: 4,
    question: "如果要为一个团队推行 Rust，你会如何分阶段推进？如何处理学习曲线陡的问题？",
    answer: "分三阶段推进：**阶段一（1-2月）基础认知**——团队共学 Rust Book 前十章，重点理解所有权和借用规则。用 Rust 重写一个简单的内部工具（如日志解析器），让团队感受 Rust 的安全性和性能。建立 Rust 开发环境规范（rustfmt/clippy/CI 检查）。**阶段二（3-4月）试点项目**——选一个非关键路径的新项目用 Rust 开发（如内部 CLI 工具或微服务），由 1-2 名 Rust 较熟的成员带头。引入 tokio 做异步、serde 做序列化等核心生态库。建立 code review 规范，重点审查 unsafe 使用和错误处理。**阶段三（5-6月）扩展推广**——总结试点项目经验，推广到更多项目。建立团队 Rust 组件库和最佳实践文档。处理学习曲线的方法：1) 不要一个人硬啃——组织读书会集体学习；2) 编译器是老师——读懂错误信息是核心技能，初期多花时间在错误信息上；3) 先 Safe 后 Unsafe——初期禁止用 unsafe，全 Safe Rust 足以完成大部分工作；4) 用 clippy 辅助——它能把很多 idiomatic Rust 习惯教给你；5) 接受初期慢——前两周写 Rust 比写 Python 慢 5 倍是正常的，一个月后会追回来。核心原则：先建立信心再扩展，不要一上来就上最复杂的项目。",
    tags: ["团队推广", "学习曲线", "分阶段", "综合"],
  },
];
