import type { ReviewQuestion } from "./types";

/** Rust WebAssembly 复习题 */
export const mrsWebAssemblyQuestions: ReviewQuestion[] = [
  {
    id: "mrs-web-assembly-1",
    chapter: "mrs-web-assembly",
    level: 1,
    question: "WebAssembly 是什么？Rust 为什么适合编译为 wasm？",
    answer: "WebAssembly（wasm）是一种可移植的二进制指令格式，可在沙箱环境中高效执行，支持浏览器、Node.js、边缘计算等多平台。Rust 适合编译为 wasm 的原因：1) 无 GC——wasm 没有内置 GC，Rust 的所有权系统不需要运行时垃圾回收，天然适配；2) 零运行时开销——Rust 编译为精简机器码，wasm 模块体积小加载快；3) 内存安全——Rust 编译期保证无 UAF/溢出，wasm 沙箱再加一层安全；4) 工具链成熟——wasm-pack 和 wasm-bindgen 让 Rust 与 JS 无缝互操作。C/C++ 也能编译 wasm，但 Rust 的安全保证和工具链体验更优。",
    tags: ["WebAssembly", "wasm", "基础"],
  },
  {
    id: "mrs-web-assembly-2",
    chapter: "mrs-web-assembly",
    level: 2,
    question: "wasm-bindgen 的作用是什么？它如何实现 Rust 和 JS 之间的类型转换？",
    answer: "wasm-bindgen 是 Rust 和 JS 之间的桥接工具，解决两个问题：1) wasm 只支持数字类型（i32/f64），wasm-bindgen 自动生成胶水代码处理字符串、对象、数组等复杂类型的转换；2) 提供属性宏 #[wasm_bindgen] 标注 Rust 函数/结构体可被 JS 调用，以及导入 JS 函数供 Rust 调用。类型转换机制：Rust 的 String 转为 JS 字符串（通过共享内存 + 编码转换），JS 对象包装为 JsValue 传给 Rust，Vec 转为 JS 数组等。wasm-bindgen 在编译期生成 .js 胶水文件和 .wasm 模块，运行时 JS 加载胶水文件调用 wasm 导出的函数。",
    tags: ["wasm-bindgen", "类型转换", "理解"],
  },
  {
    id: "mrs-web-assembly-3",
    chapter: "mrs-web-assembly",
    level: 3,
    question: "请编写一个用 Rust 实现的 wasm 模块，导出一个斐波那契计算函数供 JS 调用。",
    answer: "```rust\n// Cargo.toml: [lib] crate-type = [\"cdylib\"]\n// 依赖: wasm-bindgen = \"0.2\"\n\nuse wasm_bindgen::prelude::*;\n\n#[wasm_bindgen]\npub fn fibonacci(n: u32) -> u64 {\n    if n <= 1 {\n        return n as u64;\n    }\n    let mut a: u64 = 0;\n    let mut b: u64 = 1;\n    for _ in 2..=n {\n        let temp = a + b;\n        a = b;\n        b = temp;\n    }\n    b\n}\n\n// 编译: wasm-pack build --target web\n// 生成 pkg/ 目录包含 .wasm 和 .js\n```\n\nJS 端使用：```javascript\nimport init, { fibonacci } from './pkg/mylib.js';\nawait init();  // 加载 wasm 模块\nconsole.log(fibonacci(50));  // 调用 Rust 函数\n```\n\n要点：crate-type 必须是 cdylib，#[wasm_bindgen] 标注导出函数，wasm-pack build 生成可用的 pkg。Rust 的迭代实现比 JS 递归快数十倍。",
    tags: ["wasm-pack", "wasm_bindgen", "代码编写"],
  },
  {
    id: "mrs-web-assembly-4",
    chapter: "mrs-web-assembly",
    level: 4,
    question: "在什么场景下应该选择 Rust+wasm 而非纯 JS？有什么限制需要注意？",
    answer: "适合 Rust+wasm 的场景：1) 计算密集型任务——图像处理、加密解密、音视频编解码，wasm 比纯 JS 快 5-20 倍；2) 复杂算法——路径规划、物理模拟、数据分析，Rust 的性能优势显著；3) 复用现有 Rust 代码库——把后端 Rust 逻辑编译到前端，避免用 JS 重写；4) 安全敏感场景——Rust 编译期安全 + wasm 沙箱双重保障。限制：1) DOM 操作——wasm 不能直接操作 DOM，必须通过 JS 桥接，频繁调用有开销，所以纯 UI 用 JS 更好；2) 初始加载——wasm 模块需要下载和编译（虽然比 JS 快），首屏有延迟；3) 体积——虽然比等效 JS 小，但比纯 JS 函数大，小功能不值得引入；4) 调试——wasm 调试体验不如 JS（源码映射有限）。核心原则：计算用 wasm，交互用 JS，两者互补而非替代。",
    tags: ["wasm场景", "性能", "限制", "综合"],
  },
];
