import type { ReviewQuestion } from "./types";

/** C# 函数式编程 · 柯里化与偏应用复习题 */
export const cfpCurryingQuestions: ReviewQuestion[] = [
  {
    id: "cfp-currying-1",
    chapter: "cfp-currying",
    level: 1,
    question: `什么是柯里化？请把 \`Func<int, int, int> Add = (a, b) => a + b\` 柯里化，写出类型和调用方式。`,
    answer:
      `柯里化是把接受多个参数的函数转化为一系列接受单个参数的函数的过程。\n\n原始：\`Func<int, int, int> Add = (a, b) => a + b\`，调用 \`Add(3, 4)\` = 7\n\n柯里化后：\n\`\`\`csharp\nFunc<int, Func<int, int>> CurriedAdd = a => b => a + b;\n\`\`\`\n\n类型从 \`Func<int, int, int>\` 变为 \`Func<int, Func<int, int>>\`——外层接受 a 返回一个函数，该函数接受 b 返回结果。\n\n调用方式：\`CurriedAdd(3)(4)\` = 7。也可以分步：\`var add3 = CurriedAdd(3); add3(4)\` = 7。\n\nC# 原生不支持自动柯里化（F# 支持），需要手写嵌套 Lambda 或用辅助函数。`,
    tags: ["柯里化", "类型变换", "Func"],
  },
  {
    id: "cfp-currying-2",
    chapter: "cfp-currying",
    level: 2,
    question: `柯里化和偏应用有什么本质区别？请各举一个 C# 示例。`,
    answer:
      `本质区别：\n- **柯里化**是结构变换——把 \`Func<T1, T2, R>\` 变成 \`Func<T1, Func<T2, R>>\`，不涉及具体值。它是数学上的函数形式变换。\n- **偏应用**是值绑定——固定某些参数为具体值，生成需要剩余参数的新函数。它是工程上的函数复用。\n\n柯里化示例（结构变换，不固定值）：\n\`\`\`csharp\nFunc<int, Func<int, int>> Curry(Func<int, int, int> f) => a => b => f(a, b);\nvar curriedAdd = Curry((a, b) => a + b);\n// curriedAdd 的类型是 Func<int, Func<int, int>>，没有固定任何值\n\`\`\`\n\n偏应用示例（固定值）：\n\`\`\`csharp\nFunc<int, int, int> Add = (a, b) => a + b;\nFunc<int, int> Add10 = b => Add(10, b);  // 固定 a=10\n// Add10 的类型是 Func<int, int>，a 被固定为 10\n\`\`\`\n\n关系：柯里化后逐个传参，每传一个参数就是一次偏应用。偏应用不需要先柯里化——直接用闭包固定参数即可。`,
    tags: ["柯里化", "偏应用", "对比", "闭包"],
  },
  {
    id: "cfp-currying-3",
    chapter: "cfp-currying",
    level: 3,
    question: `请编写一个通用的 \`Curry\` 辅助函数，能把两参数函数和三参数函数柯里化。然后用它柯里化 \`Func<int, int, int, int> F = (a, b, c) => a + b * c\`，并用偏应用生成「固定 a=1, b=2」的函数。`,
    answer:
      `\`\`\`csharp\n// 两参数柯里化\nFunc<T1, Func<T2, R>> Curry<T1, T2, R>(Func<T1, T2, R> f)\n    => a => b => f(a, b);\n\n// 三参数柯里化\nFunc<T1, Func<T2, Func<T3, R>>> Curry3<T1, T2, T3, R>(Func<T1, T2, T3, R> f)\n    => a => b => c => f(a, b, c);\n\n// 使用\nFunc<int, int, int, int> F = (a, b, c) => a + b * c;\nvar curriedF = Curry3(F);\n// 类型：Func<int, Func<int, Func<int, int>>>\n\n// 偏应用：固定 a=1, b=2\nvar f12 = curriedF(1)(2);  // c => 1 + 2 * c\nConsole.WriteLine(f12(3));  // 7：1 + 2*3 = 7\nConsole.WriteLine(f12(10)); // 21：1 + 2*10 = 21\n\`\`\`\n\n关键点：\n1. \`Curry3\` 把三参数函数变成三层嵌套的单参数函数\n2. \`curriedF(1)(2)\` 连续偏应用两次，返回只需要 c 的函数\n3. 泛型类型参数 T1/T2/T3/R 可以不同——如 \`Func<string, int, double, bool>\``,
    tags: ["通用柯里化", "Curry", "泛型", "偏应用"],
  },
  {
    id: "cfp-currying-4",
    chapter: "cfp-currying",
    level: 4,
    question: `C# 不原生支持柯里化（F# 原生支持）。请从语言设计角度分析为什么 C# 选择不自动柯里化，以及在 C# 中偏应用比柯里化更实用的原因。`,
    answer:
      `C# 不自动柯里化的原因：\n\n1. **性能考虑**：\`Func<T1, T2, R>\` 是一个真正的多参数委托，一次调用直接传所有参数。柯里化的 \`Func<T1, Func<T2, R>>\` 需要嵌套调用——先调用外层创建闭包，再调用内层。多参数委托调用更高效，尤其在高频调用场景。\n\n2. **CLR 类型系统兼容**：CLR 方法是多参数的，\`Func<T1, T2, R>\` 直接映射到方法签名。柯里化需要在编译时把多参数方法转换成嵌套单参数委托，增加编译器复杂度和运行时开销。\n\n3. **多范式定位**：C# 是多范式语言（OOP + 函数式 + 命令式），不强制函数式风格。自动柯里化是纯函数式语言（Haskell、F#）的特征。C# 让开发者按需选择。\n\n4. **与 .NET BCL 集成**：.NET 基础类库全部使用多参数委托，如果 C# 自动柯里化，需要大量适配代码。\n\n偏应用比柯里化更实用的原因：\n\n1. **一行闭包搞定**：\`Func<int, int> Add10 = b => Add(10, b)\` 直接用闭包固定参数，不需要先做结构变换。柯里化需要手写嵌套 Lambda 或辅助函数，代码更复杂。\n\n2. **可固定任意位置**：柯里化通常从左到右逐个固定。偏应用可以固定任意位置的参数——\`Func<int, int> FromRight = a => Add(a, 100)\` 固定第二个参数。\n\n3. **更符合 C# 习惯**：C# 开发者熟悉闭包和 Lambda，偏应用是闭包的自然应用。柯里化是函数式语言的概念，在 C# 中显得不自然。\n\n4. **不需要类型转换**：偏应用直接在 \`Func<T1, T2, R>\` 上工作，不需要转换为 \`Func<T1, Func<T2, R>>\`。\n\n结论：在 C# 中，偏应用是更实用的函数复用工具。柯里化更适合纯函数式场景（如与 LINQ 的 \`Select\` 结合传单参数函数），但日常工程中偏应用足够了。`,
    tags: ["语言设计", "性能", "多范式", "偏应用优势"],
  },
];
