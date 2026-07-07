import type { ReviewQuestion } from "./types";

/** C# 函数式编程 · 函数式错误处理复习题 */
export const cfpErrorHandlingFpQuestions: ReviewQuestion[] = [
  {
    id: "cfp-error-handling-fp-1",
    chapter: "cfp-error-handling-fp",
    level: 1,
    question: "try-catch 的主要问题是什么？Result<T, E> 类型如何解决这些问题？",
    answer:
      "try-catch 的主要问题：\n1. **错误是隐式的**——函数签名 `int Parse(string)` 不体现可能抛出的异常，调用者不看源码不知道\n2. **异常是控制流**——throw 中断正常执行流，从抛出点跳到 catch 点，难以组合\n3. **编译器不强制处理**——调用者可以不 catch，异常会传播到上层\n4. **性能开销**——异常抛出有栈展开成本\n\nResult<T, E> 的解决方案：\n1. **错误是显式的**——签名 `Result<int, string> Parse(string)` 明确表示「返回 int 或 string 类型的错误」\n2. **错误是数据**——Ok/Err 是普通值，不中断控制流，可以传递、存储、组合\n3. **编译器强制处理**——Match 必须处理 Ok 和 Err 两个分支，类型系统保证\n4. **无异常开销**——Result 是普通类型，没有栈展开\n\n核心区别：try-catch 把错误当作控制流中断，Result 把错误当作数据流。Result 让错误处理成为类型系统强制的义务，而非可选的补救。",
    tags: ["try-catch", "Result", "隐式错误", "显式错误", "控制流vs数据流"],
  },
  {
    id: "cfp-error-handling-fp-2",
    chapter: "cfp-error-handling-fp",
    level: 2,
    question: "请实现 `Result<T, E>` 的 `Bind` 方法，并解释它在 Ok 和 Err 时的行为。然后写一个链式示例：解析字符串 → 除法 → 转字符串。",
    answer:
      "```csharp\npublic abstract record Result<T, E>;\npublic sealed record Ok<T, E>(T Value) : Result<T, E>;\npublic sealed record Err<T, E>(E Error) : Result<T, E>;\n\n// Bind：链式操作核心\npublic static Result<U, E> Bind<T, U, E>(this Result<T, E> r, Func<T, Result<U, E>> f)\n    => r is Ok<T, E> ok\n        ? f(ok.Value)                    // Ok：提取值，传给函数继续\n        : new Err<U, E>((r as Err<T, E>)!.Error);  // Err：短路，传播错误\n\n// 辅助函数\nResult<int, string> ParseInt(string s)\n    => int.TryParse(s, out var n)\n        ? new Ok<int, string>(n)\n        : new Err<int, string>($\"Cannot parse '{s}'\");\n\nResult<int, string> SafeDivide(int a, int b)\n    => b == 0\n        ? new Err<int, string>(\"Division by zero\")\n        : new Ok<int, string>(a / b);\n\n// 链式：解析 → 除法 → 转字符串\nResult<string, string> Compute(string input)\n    => ParseInt(input)                    // Result<int, string>\n        .Bind(x => SafeDivide(100, x))    // Result<int, string>\n        .Map(x => x.ToString());          // Result<string, string>\n\n// 使用\nvar r1 = Compute(\"4\");   // Ok(\"25\")\nvar r2 = Compute(\"0\");   // Err(\"Division by zero\")——SafeDivide 短路\nvar r3 = Compute(\"ab\");  // Err(\"Cannot parse 'ab'\")——ParseInt 短路\n```\n\nBind 在 Ok 时：提取 Value，传给函数 f，返回 f 的结果（新的 Result）。\nBind 在 Err 时：不调用 f，直接创建新的 Err 包装原错误信息——短路传播。\n\n关键：链式 Bind 中任何一步 Err，后续全部短路，错误信息一路传播到最终结果。",
    tags: ["Result", "Bind", "短路", "链式", "ParseInt"],
  },
  {
    id: "cfp-error-handling-fp-3",
    chapter: "cfp-error-handling-fp",
    level: 3,
    question: "请实现一个用户注册验证管道，要求：1）用户名非空且 <= 50 字符；2）年龄 0-150；3）邮箱包含 @。用 Result 类型返回第一个验证错误，并实现一个 `CreateUser` 函数串联所有验证。",
    answer:
      "```csharp\npublic record User(string Name, int Age, string Email);\n\n// 验证函数\nResult<string, string> ValidateName(string name)\n    => string.IsNullOrWhiteSpace(name)\n        ? new Err<string, string>(\"Name required\")\n        : name.Length > 50\n            ? new Err<string, string>(\"Name too long\")\n            : new Ok<string, string>(name);\n\nResult<int, string> ValidateAge(int age)\n    => age < 0 || age > 150\n        ? new Err<int, string>(\"Age must be 0-150\")\n        : new Ok<int, string>(age);\n\nResult<string, string> ValidateEmail(string email)\n    => !email.Contains('@')\n        ? new Err<string, string>(\"Invalid email\")\n        : new Ok<string, string>(email);\n\n// 串联验证：Bind 链式，第一个错误短路\nResult<User, string> CreateUser(string name, int age, string email)\n    => ValidateName(name)                          // Result<string, string>\n        .Bind(n => ValidateAge(age)                // Result<int, string>\n            .Map(a => (Name: n, Age: a)))          // Result<(string,int), string>\n        .Bind(t => ValidateEmail(email)            // Result<string, string>\n            .Map(e => new User(t.Name, t.Age, e))); // Result<User, string>\n\n// 使用\nvar r1 = CreateUser(\"Alice\", 30, \"alice@test.com\");\n// Ok(User(\"Alice\", 30, \"alice@test.com\"))\n\nvar r2 = CreateUser(\"\", 30, \"alice@test.com\");\n// Err(\"Name required\")——第一个验证就失败，后续短路\n\nvar r3 = CreateUser(\"Alice\", 200, \"alice@test.com\");\n// Err(\"Age must be 0-150\")——年龄验证失败\n\nvar r4 = CreateUser(\"Alice\", 30, \"invalid-email\");\n// Err(\"Invalid email\")——邮箱验证失败\n\n// 处理结果\nvar message = r4.Match(\n    ok: u => $\"Created: {u.Name}\",\n    err: e => $\"Error: {e}\"\n);  // \"Error: Invalid email\"\n```\n\n关键点：\n1. 每个验证函数返回 `Result<T, string>`——T 是验证后的值，string 是错误信息\n2. `Bind` 串联验证——任一失败短路传播\n3. `Map` 转换值——验证通过后构建 User\n4. `Match` 处理最终结果——Ok 创建成功，Err 返回错误信息\n5. 错误是第一个遇到的——如果需要累积所有错误，改用 `List<string>` 作为错误类型",
    tags: ["验证管道", "Result", "Bind", "CreateUser", "短路"],
  },
  {
    id: "cfp-error-handling-fp-4",
    chapter: "cfp-error-handling-fp",
    level: 4,
    question: "请分析「边界 try-catch，内核 Result」架构模式。为什么不在所有地方都用 Result？在什么场景下 try-catch 比 Result 更合适？",
    answer:
      "「边界 try-catch，内核 Result」架构模式：\n\n在系统边界（IO、外部 API、框架调用）用 try-catch 捕获异常转为 Result。一旦转为 Result，内核逻辑用 Bind/Map 链式传播，不再需要 try-catch。\n\n```\n外部世界（异常）\n    ↓ try-catch 转换\n系统边界（Result）\n    ↓ Bind/Map 链式\n内核逻辑（纯 Result）\n    ↓ Match 处理\n系统边界（输出）\n```\n\n不在所有地方用 Result 的原因：\n\n1. **系统级错误用异常更合适**——NullReferenceException、IndexOutOfRangeException、StackOverflowException 是程序 bug，不应该「处理」而应该修复代码。用 Result 包装这些错误会掩盖 bug。\n\n2. **框架和库用异常**——.NET BCL 大量使用异常（File.ReadAllText、int.Parse、Dictionary 访问）。在调用这些 API 时必须用 try-catch。\n\n3. **异步编程中的异常**——`await` 会 unwrap Task 内的异常。如果用 Result 包装异步操作，需要在 async 边界手动处理，增加复杂度。\n\n4. **异常的栈展开有价值**——对于意外错误，栈展开提供调用链信息，便于调试。Result 不携带调用栈。\n\ntry-catch 比 Result 更合适的场景：\n\n1. **程序 bug（意外错误）**——空引用、索引越界、类型转换失败。这些是代码错误，应该崩溃并修复，不是「预期失败」\n2. **框架边界**——ASP.NET 的中间件、MVC 的 action filter 用异常过滤器处理错误，不适合 Result\n3. **不可恢复的系统错误**——OOM、StackOverflow、ThreadAbort。这些无法用 Result 优雅处理\n4. **第三方库的异常**——如果第三方库用异常，调用方必须 try-catch\n5. **全局错误处理**——ASP.NET 的 ExceptionFilter、全局 Logger 依赖异常传播\n\nResult 更合适的场景：\n\n1. **业务逻辑错误（预期错误）**——解析失败、验证失败、业务规则违反\n2. **可恢复的操作**——文件不存在可以提示用户重选，不需要崩溃\n3. **链式操作**——多个可能失败的操作串联，Bind 比嵌套 try-catch 更清晰\n4. **纯函数内核**——没有副作用的逻辑，用 Result 保持引用透明\n\n结论：Result 和 try-catch 不是互斥的，而是互补的。在边界做转换，在内核用 Result，在系统级错误用异常。这种分层架构让错误处理既类型安全又实用。",
    tags: ["边界try-catch", "内核Result", "架构模式", "场景选择", "异常vs Result"],
  },
];
