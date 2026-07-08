import type { ReviewQuestion } from "./types";

export const vdiCompilerArchitectureQuestions: ReviewQuestion[] = [
  {
    id: "vdi-compiler-architecture-1",
    chapter: "vdi-compiler-architecture",
    level: 2,
    question: "编译器三阶段各自输入输出是什么？为什么 Transform 要和 Generate 分开？",
    answer:
      "Parse：输入模板字符串，输出模板 AST（Root/Element/Interpolation/Text 节点树）。Transform：输入模板 AST，输出 JavaScript AST（含 createVNode 调用结构、patchFlag、静态提升标记等）。Generate：输入 JavaScript AST，输出 render 函数代码字符串。Transform 和 Generate 分开是为了关注点分离：Transform 负责语义转换和优化注入（与代码格式无关），Generate 负责代码拼接（与语义无关）。换输出格式（ES Module vs CommonJS）只改 Generate，换转换逻辑（支持新指令）只改 Transform，互不影响。这是编译器领域的通用设计模式。",
    tags: ["编译器", "Parse", "Transform", "Generate"],
  },
  {
    id: "vdi-compiler-architecture-2",
    chapter: "vdi-compiler-architecture",
    level: 3,
    question: "patchFlag 的作用是什么？它如何让运行时 patch 更高效？",
    answer:
      "patchFlag 是编译器在 Transform 阶段给动态节点打的标记，存入 VNode 的 patchFlag 字段，告诉运行时这个节点的哪些部分是动态的。例如 TEXT(1) 表示只有文本动态、CLASS(2) 表示只有 class 动态、PROPS(8) 表示 props 动态。patch 时渲染器检查 patchFlag：如果是 TEXT 只比对更新文本，跳过 props 和 children 的 Diff；如果是 CLASS 只比对 class。这样把「全量比对节点所有属性和子节点」优化为「只比对标记的动态部分」，跳过大量静态比对。因为编译期已知哪些动态，运行时无需重复判断，是编译时与运行时协作优化的典型案例。",
    tags: ["patchFlag", "编译优化", "patch"],
  },
  {
    id: "vdi-compiler-architecture-3",
    chapter: "vdi-compiler-architecture",
    level: 3,
    question: "静态提升（hoistStatic）是什么？为什么能提升性能？",
    answer:
      "静态提升是编译器把纯静态 VNode（不含任何动态绑定的节点）提到 render 函数外部，作为常量只创建一次。每次 render 执行时直接复用这个常量引用，而不是重新调用 createVNode 创建新的 VNode 对象。例如 `<div><span class='x'>static</span>{{ msg }}</div>`，span 是纯静态，提升后 `const _hoisted_1 = createVNode('span', {class:'x'}, 'static')` 在模块顶层只执行一次。性能提升体现在：①减少 VNode 对象创建（每次 render 少创建静态节点的 VNode）；②减少内存分配和 GC 压力；③patch 时静态节点直接复用不需比对。静态内容越多，提升收益越大。",
    tags: ["静态提升", "编译优化", "性能"],
  },
  {
    id: "vdi-compiler-architecture-4",
    chapter: "vdi-compiler-architecture",
    level: 4,
    question: "Vue 3 编译器做了哪些优化？它们如何与运行时协作提升性能？",
    answer:
      "Vue 3 编译器在 Transform 阶段注入多项优化：①静态提升——纯静态 VNode 提到 render 外只创建一次，减少 VNode 创建；②patchFlag——给动态节点打标记，运行时 patch 只比对标记的动态部分跳过静态；③Block Tree——把模板按结构性指令（v-if/v-for）切成 Block，每个 Block 收集自己的动态子节点，Diff 时只在 Block 的动态子节点范围内比对，把「整棵树 Diff」缩小到「动态节点 Diff」；④缓存事件 handler——内联函数 @click='() => x' 缓存避免每次 render 创建新函数导致子组件无谓更新。这些优化都是「编译时分析 + 运行时利用」的协作：编译时已知哪些静态哪些动态，运行时据此跳过无用比对。把开销从运行时转移到编译时，是 Vue 3 性能提升的核心。",
    tags: ["编译优化", "patchFlag", "Block Tree", "静态提升"],
  },
];
