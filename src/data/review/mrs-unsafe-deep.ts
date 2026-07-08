import type { ReviewQuestion } from "./types";

/** Rust Unsafe 深入 复习题 */
export const mrsUnsafeDeepQuestions: ReviewQuestion[] = [
  {
    id: "mrs-unsafe-deep-1",
    chapter: "mrs-unsafe-deep",
    level: 1,
    question: "Rust 中 unsafe 关键字能做哪五件事？为什么需要 unsafe？",
    answer: "五件事：1) 解引用裸指针（*const T / *mut T）；2) 调用 unsafe 函数（包括 FFI 调用 C 函数）；3) 访问或修改可变 static 变量；4) 访问 union 的字段；5) 实现不安全 trait（如手动实现 Send/Sync）。需要 unsafe 的原因：Rust 的安全检查是保守的——它无法验证所有场景的安全性（如裸指针是否指向有效内存、C 函数是否遵守约定）。unsafe 不是「禁用检查」，而是「由程序员承担检查责任」——编译器信任你在 unsafe 块中手动保证了安全不变量。它让 Rust 在保持全局安全的同时，有能力与底层硬件和外部代码交互。",
    tags: ["unsafe", "五项能力", "基础"],
  },
  {
    id: "mrs-unsafe-deep-2",
    chapter: "mrs-unsafe-deep",
    level: 2,
    question: "什么是 unsafe 的安全封装模式？为什么要封装？",
    answer: "安全封装模式：把 unsafe 操作集中在模块内部，公开 safe API 在调用 unsafe 前做不变量检查。例如 Vec 内部用 unsafe 操作裸指针管理缓冲区，但公开的 push/get 等 API 是 safe 的——它们检查边界、容量等不变量后才调用 unsafe 代码。封装的原因：1) 最小化 unsafe 代码——只有封装层需要审计，外部调用者无感；2) 不变量集中管理——所有安全检查在一个地方，不会遗漏；3) 错误隔离——如果 unsafe 代码有 bug，问题被限制在封装层内，不会扩散到整个程序。Rust 标准库大量使用这个模式——Vec、String、HashMap 等内部都有 unsafe，但对外全是 safe API。",
    tags: ["安全封装", "最小化", "理解"],
  },
  {
    id: "mrs-unsafe-deep-3",
    chapter: "mrs-unsafe-deep",
    level: 3,
    question: "请编写一个使用 unsafe 的安全封装示例：实现一个 SplitVec，可以把一个切片安全地分成两个不重叠的可变引用。",
    answer: "```rust\nfn split_first_mut<T>(slice: &mut [T]) -> Option<(&mut T, &mut [T])> {\n    let len = slice.len();\n    if len == 0 { return None; }\n    let ptr = slice.as_mut_ptr();\n    // unsafe: 手动保证两个引用不重叠\n    unsafe {\n        Some((\n            &mut *ptr,                           // 第一个元素\n            ::std::slice::from_raw_parts_mut(\n                ptr.add(1), len - 1               // 剩余元素\n            ),\n        ))\n    }\n}\n\n// 安全不变量：ptr 和 ptr.add(1) 指向不同内存区域\n// 编译器无法证明这一点（它不知道 add(1) 不会越界）\n// 但我们通过 len 检查保证了安全\n```\n\n这是标准库 split_first_mut 的简化版。编译器保守地拒绝两个 &mut [T] 指向同一切片，但通过 unsafe 裸指针操作可以安全地分割。不变量（len > 0 保证不越界）在 unsafe 块外检查，unsafe 块内只做编译器无法验证的安全操作。",
    tags: ["unsafe", "裸指针", "安全封装", "代码编写"],
  },
  {
    id: "mrs-unsafe-deep-4",
    chapter: "mrs-unsafe-deep",
    level: 4,
    question: "在什么场景下必须使用 unsafe？如何判断「能 Safe 就不 Unsafe」的边界？",
    answer: "必须用 unsafe 的场景：1) FFI——调用 C 库函数（C 不懂 Rust 的所有权规则）；2) 裸指针操作——实现自定义数据结构（Vec、LinkedList、Arena）需要手动管理内存布局；3) 性能关键路径——编译器的保守检查导致无法优化的场景（如 split_mut 的别名问题）；4) 硬件交互——嵌入式编程操作内存映射寄存器；5) 手动实现 Send/Sync——当类型确实是线程安全的但编译器无法自动推导时。判断边界的原则：1) 先尝试 Safe Rust——大部分需求用安全代码就能满足；2) 编译器拒绝时先理解为什么——是别名问题？生命周期？还是类型系统限制？3) 确认 unsafe 能解决且有充分理由——性能测试证明有瓶颈、或功能上必须（如 FFI）；4) 封装在最小范围内——safe API 包裹 unsafe 块，每个 unsafe 块写注释说明安全理由。核心：unsafe 是工具不是捷径——用它是因为安全代码做不到，不是因为安全代码写起来麻烦。",
    tags: ["unsafe场景", "安全边界", "架构设计", "综合"],
  },
];
