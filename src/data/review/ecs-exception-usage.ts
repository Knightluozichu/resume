import type { ReviewQuestion } from "./types";

/** Effective C# 异常使用复习题 */
export const ecsExceptionUsageQuestions: ReviewQuestion[] = [
  {
    id: "ecs-exception-usage-1",
    chapter: "ecs-exception-usage",
    level: 1,
    question: `重抛异常时 throw 和 throw ex 有什么区别？应该用哪个？`,
    answer:
      `throw（裸 throw）保留原始抛出点的完整调用栈，调试器能直达真正出错的代码行。\n\nthrow ex 把 ex 当新异常从当前 catch 行抛出，原始调用栈被重置到 catch 行，原始抛出点丢失。\n\n应该用裸 throw。Effective C# 的铁律：重抛永远用 throw; 不带异常对象。丢栈会让线上排查变成噩梦——只知道异常在哪个 catch 行被重抛，不知道最初在哪一行抛出。throw ex 是常见错误，必须避免。`,
    tags: ["throw", "throw ex", "调用栈", "重抛"],
  },
  {
    id: "ecs-exception-usage-2",
    chapter: "ecs-exception-usage",
    level: 2,
    question:
      `异常过滤器 when 相比「捕获-判断-重抛」模式有什么优势？`,
    answer:
      `when (条件) 在进入 catch 前做判定，条件 false 时直接跳过此 catch，异常继续向上传播且调用栈完整不丢失。\n\n优势：\n1. 不丢栈——过滤器 false 时异常继续传播，栈不被重置，不像「捕获后 throw」可能因中间逻辑丢栈。\n2. 代码简洁——不用先 catch Exception 再 if 判断再 throw，一个 when 子句搞定。\n3. 无副作用——过滤器为 false 时不进入 catch 块，不会意外执行清理逻辑。\n4. 可做纯日志——catch (Exception e) when (Log(e)) 里 Log 返回 false，仅记录不捕获，异常继续传播。\n\n典型用法：catch (IOException e) when (e.HResult == 0x80070020) 只处理共享违例，其他 IOException 自动继续传播。`,
    tags: ["异常过滤器", "when", "不丢栈", "精确catch"],
  },
  {
    id: "ecs-exception-usage-3",
    chapter: "ecs-exception-usage",
    level: 3,
    question:
      `catch 顺序为什么必须由具体异常到基类异常？如果反过来会怎样？`,
    answer:
      `C# 按 catch 子句的出现顺序匹配，第一个类型匹配的 catch 生效。基类异常（如 Exception）能匹配所有异常，放在前面会让后面的具体异常 catch 永远无法执行——所有异常都被基类 catch 先匹配走。\n\n如果反过来（Exception 在前，IOException 在后）：IOException 是 Exception 的子类，所有 IOException 会被前面的 Exception catch 捕获，后面的 IOException catch 成了死代码。编译器对部分情况会报错（如同一 try 里先 catch 基类再 catch 子类），但跨继承链的顺序需开发者自己保证。\n\n正确顺序：最具体的异常（FileNotFoundException）最前，较具体的（IOException）次之，Exception 兜底放最后。这样每个 catch 都能精确匹配对应的异常类型。`,
    tags: ["catch顺序", "具体到一般", "继承链", "死代码"],
  },
  {
    id: "ecs-exception-usage-4",
    chapter: "ecs-exception-usage",
    level: 4,
    question:
      `设计一个异常处理策略：一个方法需要重试可恢复的 IOException（如网络超时），但把其他异常原样上抛且不丢栈。用异常过滤器如何实现？`,
    answer:
      `用异常过滤器区分可恢复和不可恢复的异常：\n\npublic async Task<T> ReadWithRetryAsync<T>(Func<Task<T>> action)\n{\n    for (int i = 0; i < 3; i++)\n    {\n        try\n        {\n            return await action().ConfigureAwait(false);\n        }\n        catch (IOException ex) when (IsTransient(ex))\n        {\n            // 仅可恢复的瞬时错误才重试\n            await Task.Delay(ExponentialBackoff(i)).ConfigureAwait(false);\n            // 循环继续重试\n        }\n        // 不可恢复的异常：when (IsTransient(ex)) 为 false，\n        // 不进入此 catch，异常继续传播，栈完整不丢\n    }\n    throw new IOException(\"重试次数耗尽\");\n}\n\n关键点：\n1. when (IsTransient(ex)) 为 true 时进入 catch 重试；为 false 时（如磁盘满这种不可恢复 IOException）跳过 catch，异常原样上抛，调用栈完整。\n2. 非 IOException（如 ArgumentException）根本不匹配 catch (IOException)，也原样上抛。\n3. 重试用裸循环而非 throw/re-catch，避免栈被重置。最后一次重试失败抛新异常明确告知重试耗尽。\n4. ConfigureAwait(false) 保证库代码不死锁。\n\n这个策略把「可恢复才重试、不可恢复原样上抛、栈不丢」三个需求统一在异常过滤器里，比旧的「catch-判断-rethrow」更安全清晰。`,
    tags: ["异常策略", "重试", "异常过滤器", "方案设计", "综合"],
  },
];
