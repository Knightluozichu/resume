import type { ReviewQuestion } from "./types";

/** unsafe Rust 复习题 */
export const rswUnsafeRustQuestions: ReviewQuestion[] = [
  {
    id: "rsw-unsafe-rust-1",
    chapter: "rsw-unsafe-rust",
    level: 1,
    question: "unsafe 块解锁的五大能力是什么？",
    answer: "1. 解引用裸指针 *const/*mut；2. 调用 unsafe 函数/方法（含 FFI）；3. 访问或修改可变 static 变量；4. 实现 unsafe trait（如手动 Send/Sync）；5. 访问 union 字段。共同点：编译器无法静态验证这些操作的安全性，需程序员用人工推理维护不变式。",
    tags: ["unsafe", "五大能力"],
  },
  {
    id: "rsw-unsafe-rust-2",
    chapter: "rsw-unsafe-rust",
    level: 2,
    question: "unsafe 块内的代码是否完全不受检查？",
    answer: "不是。unsafe 块内的代码仍受类型检查、借用检查（对引用部分）等约束。它只是「关闭」了五项特定检查（如裸指针解引用）。unsafe 不是「免检通行证」——你仍不能在 unsafe 块里做任何 safe 代码不能做的事，它只是解锁了那五种能力。把它当免检通行证会导致隐蔽的内存安全 bug。",
    tags: ["unsafe", "检查范围"],
  },
  {
    id: "rsw-unsafe-rust-3",
    chapter: "rsw-unsafe-rust",
    level: 3,
    question: "什么是 unsafe 的封装契约？为什么 Vec::push 对外 safe 但内部用了 unsafe？",
    answer: "封装契约：unsafe 是实现细节，不泄漏到 safe 公共 API。safe 函数通过维护不变式，保证所有合法输入都安全。Vec::push 内部用 unsafe 操作裸指针和容量（手动分配/拷贝），但 Vec 维护了不变式：len <= capacity、指针有效、元素正确初始化。push 对所有合法调用保持这些不变式——永远把 len 限制在 capacity 内，必要时扩容。因此调用方无法通过正常使用触发不安全，对外就是 safe。这就是把 unsafe 藏在最小范围、用 safe API 包出不变式。",
    tags: ["封装契约", "不变式", "Vec"],
  },
  {
    id: "rsw-unsafe-rust-4",
    chapter: "rsw-unsafe-rust",
    level: 4,
    question: "裸指针和引用有什么区别？在什么场景下正当使用 unsafe 裸指针？",
    answer: "引用 &T/&mut T 受借用检查器守护，保证有效、无别名、对齐；裸指针 *const/*mut 无此保证，可别名、可悬垂、可不齐，只能在 unsafe 中解引用。正当使用 unsafe 裸指针的场景：1. FFI 调用 C 库（C 用裸指针）；2. 实现新的并发原语（如自定义锁、无锁结构）；3. 极致性能优化（如 get_unchecked 绕过边界检查）；4. 操作硬件/内存映射（嵌入式）。原则：先用 safe 标准库方案，确认无法满足再考虑 unsafe，且最小化范围、safe 封装、写 # Safety 文档。",
    tags: ["裸指针", "引用", "FFI", "综合"],
  },
];
