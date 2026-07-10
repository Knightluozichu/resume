import type { ReviewQuestion } from "./types";

/** C# 函数式编程 · Monad与链式复习题 */
export const cfpMonadsQuestions: ReviewQuestion[] = [
  {
    id: "cfp-monads-1",
    chapter: "cfp-monads",
    level: 1,
    question: `什么是 Monad？请用一句话概括 Maybe/Option Monad 的核心机制，并举一个 C# 中的 Monad 例子。`,
    answer:
      `Monad 是一种设计模式，把值包装在上下文中，提供 Bind 操作链式处理包装值——如果当前是「有值」就提取值传给函数继续，如果是「无值」就短路传播。\n\nMaybe/Option Monad 的核心机制：Some(T) 表示有值，None 表示无值。Bind 在 None 时自动短路，跳过后续所有操作。\n\nC# 中的 Monad 例子：\n1. \`Nullable<T>\` / \`?.\` 运算符——null 时短路\n2. \`Task<T>\` / \`await\`——异步完成后继续\n3. \`IEnumerable<T>\` / \`SelectMany\`——每个元素展开为子序列\n4. \`Option<T>\`（自定义）——Some/None 短路\n\n它们都遵循 Monad 模式：包装值 + Bind 操作 + 自动传播。`,
    tags: ["Monad", "Option", "Bind", "短路"],
  },
  {
    id: "cfp-monads-2",
    chapter: "cfp-monads",
    level: 2,
    question: `请推导 Bind 操作的类型签名，并解释为什么 Bind 的参数函数返回 \`Option<U>\` 而不是 \`U\`。`,
    answer:
      `Bind 类型签名：\n\`\`\`\nOption<U> Bind<T, U>(Option<T> source, Func<T, Option<U>> f)\n\`\`\`\n\n参数函数返回 \`Option<U>\` 而不是 \`U\` 的原因：\n\n1. **支持链式短路**：如果函数返回 \`U\`，Bind 就无法在函数内部表达「失败」。返回 \`Option<U>\` 让函数能表达「这个操作可能失败」——返回 None 表示失败，返回 Some 表示成功。\n\n2. **保持 Monad 结构**：Bind 的输出必须是 \`Option<U>\`（和输入同构），这样才能继续链式 Bind。如果返回 \`U\`，需要额外的 \`Some()\` 包装，就是 Map 而非 Bind 了。\n\n3. **区分 Map 和 Bind**：\n   - Map：\`Func<T, U>\` → \`Option<U>\`（函数不感知 Option）\n   - Bind：\`Func<T, Option<U>>\` → \`Option<U>\`（函数自己决定成功/失败）\n\n4. **实际场景**：\`Bind(u => FindProfile(u.Id))\` 中 \`FindProfile\` 可能找不到用户，返回 \`Option<Profile>\`。如果 Bind 的函数只返回 \`Profile\`，就无法表达「找不到」的情况。\n\n关系：\`Map(opt, f) = Bind(opt, v => Some(f(v)))\`——Map 是 Bind 的特化（函数不返回 Option 时自动包装）。`,
    tags: ["Bind", "类型签名", "Map vs Bind", "Option"],
  },
  {
    id: "cfp-monads-3",
    chapter: "cfp-monads",
    level: 3,
    question: `请实现一个完整的 Option<T> 类型，包括 Some/None、Bind、Map、Match 和 GetOrElse。然后实现一个 \`TryParse\` 函数返回 Option<int>，用链式操作实现「解析字符串 → 除法 → 转字符串」。`,
    answer:
      `\`\`\`csharp\n// Option 类型定义\npublic abstract record Option<T>;\npublic sealed record SomeOpt<T>(T Value) : Option<T>;\npublic sealed record NoneOpt<T>() : Option<T>;\n\npublic static class Option\n{\n    public static Option<T> Some<T>(T value) => new SomeOpt<T>(value);\n    public static Option<T> None<T>() => new NoneOpt<T>();\n}\n\n// 扩展方法\npublic static class OptionExt\n{\n    public static Option<U> Bind<T, U>(this Option<T> opt, Func<T, Option<U>> f)\n        => opt is SomeOpt<T> s ? f(s.Value) : Option.None<U>();\n\n    public static Option<U> Map<T, U>(this Option<T> opt, Func<T, U> f)\n        => opt.Bind(v => Option.Some(f(v)));\n\n    public static R Match<T, R>(this Option<T> opt, Func<T, R> some, Func<R> none)\n        => opt is SomeOpt<T> s ? some(s.Value) : none();\n\n    public static T GetOrElse<T>(this Option<T> opt, T fallback)\n        => opt.Match(v => v, () => fallback);\n}\n\n// TryParse 返回 Option\nOption<int> TryParseInt(string s)\n    => int.TryParse(s, out var n) ? Option.Some(n) : Option.None<int>();\n\nOption<int> SafeDivide(int a, int b)\n    => b == 0 ? Option.None<int>() : Option.Some(a / b);\n\n// 链式：解析 → 除法 → 转字符串\nOption<string> Compute(string input)\n    => TryParseInt(input)                    // Option<int>\n        .Bind(x => SafeDivide(100, x))       // Option<int>\n        .Map(x => x.ToString());             // Option<string>\n\n// 使用\nvar r1 = Compute(\"4\");   // Some(\"25\")——100/4=25\nvar r2 = Compute(\"0\");   // None——除以零，SafeDivide 返回 None，短路\nvar r3 = Compute(\"abc\"); // None——解析失败，第一个 Bind 就短路\nvar r4 = Compute(\"4\").GetOrElse(\"error\");  // \"25\"\nvar r5 = Compute(\"0\").GetOrElse(\"error\");  // \"error\"\n\`\`\`\n\n关键点：\n1. \`Bind\` 处理可能失败的操作（TryParse、SafeDivide）\n2. \`Map\` 处理不会失败的操作（ToString）\n3. 任何一步 None，后续全部短路\n4. \`GetOrElse\` 提供默认值，从 Option 回到普通值\n5. \`Match\` 可以分支处理 Some 和 None`,
    tags: ["Option实现", "Bind", "Map", "Match", "TryParse", "链式"],
  },
  {
    id: "cfp-monads-4",
    chapter: "cfp-monads",
    level: 4,
    question: `C# 的 LINQ \`SelectMany\` 就是 Monad 的 Bind。请解释这个关联，并实现 \`SelectMany\` 让 Option<T> 支持 LINQ 查询语法。然后分析为什么 C# 的 \`?.\` 运算符可以说是一个「内置的 Maybe Monad」。`,
    answer:
      `LINQ SelectMany 与 Monad Bind 的关联：\n\n\`IEnumerable<T>.SelectMany(Func<T, IEnumerable<U>>)\` 把每个元素映射为子序列，然后拍平。类型签名：\n\`\`\`\nIEnumerable<U> SelectMany<T, U>(IEnumerable<T>, Func<T, IEnumerable<U>>)\n\`\`\`\n\n这与 Monad Bind 的签名 \`M<U> Bind<T, U>(M<T>, Func<T, M<U>>)\` 完全一致——只是 M 是 IEnumerable。所以 SelectMany 就是 IEnumerable Monad 的 Bind。\n\n让 Option 支持 LINQ 查询语法：\n\`\`\`csharp\npublic static class OptionLinq\n{\n    public static Option<U> SelectMany<T, U>(\n        this Option<T> opt, Func<T, Option<U>> f)\n        => opt.Bind(f);\n\n    public static Option<V> SelectMany<T, U, V>(\n        this Option<T> opt,\n        Func<T, Option<U>> f,\n        Func<T, U, V> project)\n        => opt.Bind(t => f(t).Bind(u => Option<V>.Some(project(t, u))));\n\n    public static Option<U> Select<T, U>(\n        this Option<T> opt, Func<T, U> f)\n        => opt.Map(f);\n\n    public static Option<T> Where<T>(\n        this Option<T> opt, Func<T, bool> pred)\n        => opt.Bind(v => pred(v) ? Option<T>.Some(v) : Option<T>.None<T>());\n}\n\n// 现在可以用 LINQ 查询语法\nvar result = from x in TryParseInt(\"4\")\n             from y in TryParseInt(\"2\")\n             where x > 0\n             select x / y;  // Option<int> = Some(2)\n\`\`\`\n\n\`?.\` 是内置 Maybe Monad 的原因：\n\n1. **短路语义相同**：\`a?.B?.C?.D\` 中任一为 null，后续全部跳过，返回 null——与 \`Option.Bind\` 的 None 短路完全一致\n2. **包装类型**：\`T?\` 是 \`Nullable<T>\`——包装「有值或null」，与 \`Option<T>\` 同构\n3. **Bind 操作**：\`?.\` 是 Bind 的语法糖——\`a?.B\` 等价于 \`Bind(a, x => x.B)\`\n\n但 \`?.\` 的局限：\n1. 只处理 null，不能自定义「无值」语义（如错误信息）\n2. 不能与 LINQ 查询语法组合\n3. 不能扩展（不能自定义新的 Bind 逻辑）\n4. null 是隐式的——\`string\` 可能是 null 但类型系统不区分\n\nOption<T> 的优势：\n1. Some/None 是显式的——类型签名体现可空性\n2. 可以携带错误信息（None -> Error(msg)）\n3. 支持 LINQ 查询语法\n4. 可自定义扩展（Where、Match、GetOrElse）\n\n结论：\`?.\` 是 C# 内置的简化 Maybe Monad，Option<T> 是可自定义的完整 Maybe Monad。在需要错误信息或与 LINQ 组合时，Option 更合适；在简单 null 检查时，\`?.\` 更简洁。`,
    tags: ["SelectMany", "LINQ查询语法", "?. 运算符", "Maybe Monad", "关联分析"],
  },
];
