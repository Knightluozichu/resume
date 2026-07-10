import type { ReviewQuestion } from "./types";

/** Effective C# 只读与常量复习题 */
export const ecsReadonlyConstQuestions: ReviewQuestion[] = [
  {
    id: "ecs-readonly-const-1",
    chapter: "ecs-readonly-const",
    level: 1,
    question: `const 和 readonly 的根本区别是什么？`,
    answer:
      `const 是编译期常量，值在编译时被字面量替换进调用方 IL，运行时无字段查找；readonly 是运行期常量，字段在构造函数执行后不可变，引用处在运行时从定义处读取。\n\n类型限制：const 只能用内置数值、字符串、null；readonly 可用任意类型。\n\n版本行为：const 跨程序集不随库更新而变化（烤进调用方 IL）；readonly 跨程序集随库更新生效（运行时读取）。Effective C# 条款 2 推荐：跨程序集常量一律用 readonly。`,
    tags: ["const", "readonly", "编译期", "运行期"],
  },
  {
    id: "ecs-readonly-const-2",
    chapter: "ecs-readonly-const",
    level: 2,
    question:
      `库 v2 把 const Max 从 10 改成 20，调用方未重编译。运行时调用方看到的是 10 还是 20？为什么？`,
    answer:
      `看到的是 10。\n\n原因：const 值在编译时被字面量替换烤进调用方 IL。库 v2 只改了库自身的字段定义，不会修改已编译调用方的 IL——调用方的 IL 里仍是字面量 10。运行时根本没有去库的字段查找，直接用烤入的 10。\n\n这就是 const 版本脆弱性的根源。如果改用 static readonly，调用方运行时从字段定义读取，库升级后立即看到 20，无需重编译。这也是 Effective C# 推荐跨程序集用 readonly 的根本原因。`,
    tags: ["版本兼容", "烤入", "跨程序集", "静默用旧值"],
  },
  {
    id: "ecs-readonly-const-3",
    chapter: "ecs-readonly-const",
    level: 3,
    question:
      `什么场景才该用 const？为什么默认选 readonly 而不是 const？`,
    answer:
      `const 的合法场景：永不改变、同程序集内、且需极致性能的常量（如数学常数 Pi、BitsPerByte）。这些值在所有版本中都不会变，烤入调用方没有版本风险，且省去运行时字段查找。\n\n默认选 readonly 的原因：\n1. 版本安全——跨程序集升级时调用方无需重编译即看到新值，const 会静默用旧值。\n2. 类型灵活——readonly 可用任意类型（DateTime、自定义结构），const 只限内置数值/字符串/null。\n3. 初值灵活——readonly 可在构造函数中根据参数计算初值，const 只能用编译期常量表达式。\n4. 性能代价极小——readonly 是一次字段访问，JIT 常内联常量字段，实际差异可忽略。\n\nconst 的版本脆弱性在跨程序集场景下是定时炸弹，默认 readonly 才是安全选择。`,
    tags: ["const场景", "readonly默认", "版本安全", "性能"],
  },
  {
    id: "ecs-readonly-const-4",
    chapter: "ecs-readonly-const",
    level: 4,
    question:
      `在库中定义版本号用 const 还是 readonly？如果用 const 发布补丁改版本号会怎样？请分析根因并给出方案。`,
    answer:
      `应该用 static readonly。\n\n用 const 发布补丁的后果：补丁改了库的版本号常量值，但所有已编译的调用方 IL 里烤入的还是旧版本号。用户更新了库补丁，行为却没变——程序仍按旧版本号判断逻辑，可能引发「明明升级了却没生效」的隐蔽 bug。\n\n根因：const 是编译期常量，值烤进调用方 IL。补丁只替换库的程序集，不会重新编译调用方，调用方 IL 不变。const 的「单一数据源」只在编译时存在，发布后变成了「多份烤入副本」，无法同步更新。\n\n方案：\n1. 任何可能跨版本变化的值（版本号、配置阈值、限流参数）一律用 static readonly，运行时从字段定义读取，补丁即生效。\n2. const 只保留给真正永不改变的物理/数学常数。\n3. 如果需要不可变集合，用 static readonly 配合 ImmutableArray，而非 const（const 不支持引用类型）。`,
    tags: ["版本号", "补丁", "根因分析", "方案设计"],
  },
];
