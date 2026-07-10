import type { ReviewQuestion } from "./types";

/** 编写高质量代码 · 可空引用复习题 */
export const cqcNullableRefQuestions: ReviewQuestion[] = [
  {
    id: "cqc-nullable-ref-1",
    chapter: "cqc-nullable-ref",
    level: 1,
    question: `C# 8.0 引入的可空引用类型中，\`string\` 和 \`string?\` 有什么区别？`,
    answer:
      `\`string\` 表示非可空引用类型——编译器认为它保证不为 null，直接解引用不会警告。\n\n\`string?\` 表示可空引用类型——编译器认为它可能为 null，直接解引用会发出 CS8602 警告。\n\n注意：\`string?\` 在运行时与 \`string\` 完全一样，\`?\` 只是给编译器看的标注，运行时无额外字段或开销。这是纯编译期静态分析。`,
    tags: ["可空引用", "string?", "编译期分析"],
  },
  {
    id: "cqc-nullable-ref-2",
    chapter: "cqc-nullable-ref",
    level: 2,
    question: `处理可空引用有哪三种正确方式？各自适用什么场景？`,
    answer:
      `三种正确方式：\n\n1. null 条件运算符 \`?.\`：不确定是否为 null 时安全访问。如 \`name?.Length ?? 0\`——name 为 null 时返回 0，无异常。适合「null 是合法值」的场景。\n\n2. if 守卫：用 \`if (name is not null)\` 检查后，编译器在 if 块内知道变量非 null，不会警告。适合「非 null 时执行逻辑，null 时做别的事」的场景。\n\n3. null 抑制运算符 \`!\`：你确信变量此时非 null，告诉编译器别警告。如 \`name!.Length\`。适合「编译器无法推断但你能保证非 null」的场景，如 DI 注入属性初始化后。\n\n优先级：能用 \`?.\` 或 \`if\` 守卫的优先用守卫，\`!\` 是最后手段。`,
    tags: ["?.", "if守卫", "!", "三种方式"],
  },
  {
    id: "cqc-nullable-ref-3",
    chapter: "cqc-nullable-ref",
    level: 3,
    question: `什么时候该用 \`!\` 抑制运算符，什么时候不该用？请举例说明。`,
    answer:
      `该用的场景（确信非 null 但编译器无法推断）：\n\n1. DI 注入属性在 \`OnInitialized\` 后使用——构造函数时为 null，但框架保证初始化后非 null，编译器不知道。\n2. 经过外部库前置条件检查后——如调用了 \`ArgumentNullException.ThrowIfNull(arg)\` 后，编译器可能未识别。\n3. 从不可空数据源取值但方法签名标注为可空时。\n\n不该用的场景：\n\n1. 不确定是否为 null 只是「想消掉警告」——等于自欺欺人，运行时照样 NullReferenceException。\n2. 能用 \`?.\` 或 \`if\` 守卫替代时——守卫更安全、更可读。\n\n原则：\`!\` 只在你确信非 null 且编译器无法推断时使用，是最后手段而非偷懒工具。`,
    tags: ["!", "抑制运算符", "应用场景"],
  },
  {
    id: "cqc-nullable-ref-4",
    chapter: "cqc-nullable-ref",
    level: 4,
    question: `可空引用类型 \`string?\` 和可空值类型 \`int?\` 在运行时有什么本质区别？这对性能和 API 设计有什么影响？`,
    answer:
      `本质区别：\n\n\`int?\` 是 \`Nullable<int>\` 的语法糖，运行时是一个真实的结构体，包含 \`HasValue\`（bool）和 \`Value\`（int）两个字段，占 8 字节。有运行时开销。\n\n\`string?\` 在运行时与 \`string\` 完全一样，\`?\` 只是编译器标注，运行时无额外字段、无额外开销。纯编译期静态分析。\n\n对性能的影响：\`int?\` 比 \`int\` 多占 4 字节且访问 Value 有分支检查；\`string?\` 与 \`string\` 性能完全相同。\n\n对 API 设计的影响：\`int?\` 在序列化时会有特殊行为（JSON 中 null vs 0）；\`string?\` 的 null 检查只在编译期，运行时调用方仍可能传 null（跨程序集时编译器分析可能不完整）。因此公共 API 仍应在运行时做 null 检查（如 \`ArgumentNullException.ThrowIfNull\`），不能完全依赖编译期分析。`,
    tags: ["综合", "可空值类型", "可空引用类型", "运行时", "API设计"],
  },
];
