import type { ReviewQuestion } from "./types";

/** CLR via C# · 异常处理复习题 */
export const cvcExceptionHandlingQuestions: ReviewQuestion[] = [
  {
    id: "cvc-exception-handling-1",
    chapter: "cvc-exception-handling",
    level: 1,
    question: `CLR 异常处理中，try/catch/finally 各自的作用是什么？finally 什么时候不执行？`,
    answer:
      `各自作用：\n- **try**：包含可能抛出异常的代码。\n- **catch**：捕获并处理特定类型的异常。可以多个 catch 块，从具体到通用排列。\n- **finally**：无论 try 是否抛异常、catch 是否匹配，都执行的代码。用于释放资源。\n\n执行顺序：\n1. try 块正常执行 → 如果没有异常，跳过 catch，执行 finally\n2. try 块抛异常 → 匹配的 catch 执行 → finally 执行\n3. try 块抛异常 → 无匹配 catch → finally 执行 → 异常继续向上传播\n\nfinally 不执行的情况：\n1. \`Environment.FailFast()\` — 直接终止进程，不执行任何 finally\n2. \`StackOverflowException\` — 栈溢出时 CLR 无法保证 finally 执行\n3. \`OutOfMemoryException\` — 严重内存不足时可能无法执行\n4. \`Environment.Exit()\` — 强制退出进程\n\n常规异常（如 NullReferenceException、ArgumentException）都能保证 finally 执行。\`using\` 语句就是 try/finally + Dispose 的语法糖——保证资源释放。`,
    tags: ["try", "catch", "finally", "using"],
  },
  {
    id: "cvc-exception-handling-2",
    chapter: "cvc-exception-handling",
    level: 2,
    question: `\`throw;\` 和 \`throw ex;\` 有什么区别？哪个应该用，为什么？`,
    answer:
      `区别：\n\n- \`throw;\`（裸 throw）：重新抛出当前异常，**保留原始 StackTrace**。调用栈信息从原始抛出点开始。\n- \`throw ex;\`（带变量）：重新抛出异常对象，**重置 StackTrace**。调用栈从 catch 块所在位置重新开始，原始抛出位置丢失。\n\n应该用 \`throw;\`，因为：\n\n1. **调试需要**：异常的 StackTrace 是定位 bug 的关键信息。\`throw;\` 保留原始抛出位置，\`throw ex;\` 丢失它——调试时看不到异常从哪里抛出。\n\n2. **IL 层面差异**：\`throw;\` 编译为 \`rethrow\` IL 指令，CLR 知道这是重新抛出同一异常，保留原始栈。\`throw ex;\` 编译为 \`throw\` IL 指令，CLR 认为是新抛出的异常，重新采集栈。\n\n3. **包装异常的替代方案**：如果需要添加上下文信息，用 \`throw new CustomException(\"context\", ex)\` 将原始异常作为 InnerException——栈信息通过 InnerException.StackTrace 保留。\n\n最佳实践：\n- 重新抛出同一异常：\`throw;\`\n- 包装异常添加上下文：\`throw new CustomException(\"msg\", ex);\`\n- 永远不要：\`throw ex;\``,
    tags: ["throw", "throw ex", "StackTrace", "rethrow"],
  },
  {
    id: "cvc-exception-handling-3",
    chapter: "cvc-exception-handling",
    level: 3,
    question: `描述 CLR 异常抛出后的栈展开（Stack Unwinding）过程。finally 块在各层如何执行？`,
    answer:
      `栈展开过程：\n\n假设调用链 Main → Process → Transform，Transform 抛出 ArgumentException：\n\n1. **Transform 栈帧**：\n   - CLR 在 Transform 中搜索 try/catch\n   - 如果 Transform 没有 catch 或 catch 类型不匹配\n   - 如果 Transform 有 finally，执行 finally\n   - 弹出 Transform 栈帧\n\n2. **Process 栈帧**：\n   - CLR 在 Process 中搜索 try/catch\n   - 假设 Process 有 \`catch (ArgumentException) { throw; }\` 和 \`finally { Cleanup(); }\`\n   - catch 匹配成功，执行 catch 块\n   - catch 中 \`throw;\` 重新抛出异常\n   - CLR 知道异常未被完全处理（catch 中 rethrow），继续栈展开\n   - 执行 Process 的 finally 块（Cleanup）\n   - 弹出 Process 栈帧\n\n3. **Main 栈帧**：\n   - CLR 在 Main 中搜索 try/catch\n   - 假设 Main 有 \`catch (Exception) { Handle(); }\`\n   - catch 匹配成功，执行 catch 块\n   - 异常被处理，不再传播\n   - 执行 Main 的 finally 块（如果有）\n   - 正常继续执行 catch 块后的代码\n\n关键规则：\n1. finally 在每层栈帧弹出前执行——无论是否有匹配的 catch\n2. catch 中 rethrow 不会跳过同层的 finally——finally 仍然执行\n3. 如果所有栈帧都搜索完仍未找到匹配 catch，CLR 视为未处理异常，终止进程\n4. finally 块中如果抛出新异常，原异常被替换——新异常从此点开始传播`,
    tags: ["栈展开", "finally", "catch匹配", "rethrow"],
  },
  {
    id: "cvc-exception-handling-4",
    chapter: "cvc-exception-handling",
    level: 4,
    question: `设计一个文件处理库的异常策略。要求处理：文件不存在、权限不足、文件格式错误、磁盘满。说明哪些用异常、哪些用返回码、如何设计自定义异常。`,
    answer:
      `异常策略设计：\n\n**1. 文件不存在（FileNotFoundException）**：\n- 用异常。文件不存在是外源（Exogenous）异常——环境状态导致的错误，调用方通常无法预防。\n- 如果文件缺失是预期内的（如配置文件可选），提供 \`TryLoad(path, out config)\` 方法返回 bool。\n\n**2. 权限不足（UnauthorizedAccessException）**：\n- 用异常。权限问题是外源异常，调用方需要知道才能提示用户或降级。\n- 不需要自定义——CLR 已有 UnauthorizedAccessException。\n\n**3. 文件格式错误（自定义异常）**：\n- 用自定义异常 \`FileFormatException\`，继承 Exception。格式错误是编程错误或数据损坏——调用方需要知道具体哪个字段错了。\n- 提供行号、字段名等上下文信息：\n\`\`\`csharp\npublic class FileFormatException : Exception\n{\n    public int LineNumber { get; }\n    public string FieldName { get; }\n    public FileFormatException(string msg, int line, string field, Exception? inner = null)\n        : base(msg, inner) { LineNumber = line; FieldName = field; }\n}\n\`\`\`\n\n**4. 磁盘满（IOException）**：\n- 用异常。磁盘满是系统级错误，调用方需要知道。CLR 的 IOException 已涵盖，可检查 inner message 区分。\n\n**返回码 vs 异常决策**：\n- 文件不存在如果是「预期」场景（用户输入路径），提供 \`TryLoad\` 返回 bool\n- 文件不存在如果是「非预期」场景（配置文件必须存在），抛异常\n- 格式错误总是抛异常——数据损坏不是正常流程\n\n**异常层次设计**：\n\`\`\`\nException\n  └─ FileProcessingException (基类)\n       ├─ FileFormatException (格式错误)\n       │    └─ InvalidHeaderException (头部错误)\n       └─ FileChecksumException (校验失败)\n\`\`\`\n\n调用方可以 catch 基类 FileProcessingException 处理所有文件处理错误，或 catch 具体子类做不同处理。\n\n**关键原则**：\n1. 不要用异常处理正常流程——文件不存在如果是预期的，用 TryLoad\n2. 自定义异常提供上下文——行号、字段名帮助调试\n3. 异常层次允许粗粒度和细粒度 catch\n4. 包装底层异常保留 InnerException——\`throw new FileFormatException(msg, line, field, ioEx)\``,
    tags: ["异常设计", "自定义异常", "TryXXX", "异常策略"],
  },
];
