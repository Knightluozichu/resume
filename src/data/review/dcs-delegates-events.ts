import type { ReviewQuestion } from "./types";

/** 深入理解 C# · 委托与事件复习题 */
export const dcsDelegatesEventsQuestions: ReviewQuestion[] = [
  {
    id: "dcs-delegates-events-1",
    chapter: "dcs-delegates-events",
    level: 1,
    question: `C# 中的委托（delegate）是什么？它与 C/C++ 的函数指针有何区别？`,
    answer:
      `委托是 C# 中类型安全的函数引用——它定义了方法的签名（参数类型和返回类型），任何匹配该签名的方法都可以赋给委托实例。\n\n与 C/C++ 函数指针的区别：\n1. 类型安全：函数指针只是一个地址，编译器不检查签名匹配，传错类型会崩溃。委托在编译期检查签名——签名不匹配的委托赋值会编译报错。\n2. 面向对象：委托是对象（继承自 System.MulticastDelegate），可以携带目标对象（实例方法的 this），可以链式调用（多播）。函数指针只是裸地址，不携带对象上下文。\n3. 多播：一个委托实例可以包含多个方法（+= 添加），调用时按顺序全部执行。函数指针只能指向一个函数。\n4. 安全性：委托有安全性检查，不能随意跳转到任意内存地址。\n\n委托的本质是「类型安全的回调契约」。C# 的整个事件系统、LINQ 的谓词、async/await 的 continuation，底层都是委托。`,
    tags: ["委托", "函数指针", "类型安全", "多播"],
  },
  {
    id: "dcs-delegates-events-2",
    chapter: "dcs-delegates-events",
    level: 2,
    question: `事件（event）和普通委托字段有什么区别？为什么有了委托还需要 event 关键字？`,
    answer:
      `事件是对委托字段的封装，提供了发布-订阅模式的访问控制。核心区别：\n\n1. 访问限制：\n   - 委托字段：外部可以 \`=\` 重新赋值（覆盖所有订阅者）、可以 \`()\` 直接调用。\n   - 事件：外部只能 \`+=\` 订阅和 \`-=\` 取消订阅，不能 \`=\` 覆盖，不能 \`()\` 直接调用。只有声明类内部才能触发事件。\n\n2. 为什么要 event 关键字：\n   - 防止外部覆盖：如果用 public 委托字段，外部代码 \`button.Click = null\` 会清除所有订阅者，或 \`button.Click = MyHandler\` 会覆盖其他订阅者。event 强制只能 +=/-=。\n   - 防止外部触发：如果用 public 委托字段，外部代码 \`button.Click()\` 可以假装按钮被点了。event 确保只有声明类能触发。\n   - 接口安全：接口中可以声明 event，实现类必须提供 add/remove 访问器，语义清晰。\n\n3. 底层实现：\n   - \`public event EventHandler Click;\` 编译后生成一个 private 委托字段 + public add_Click/remove_Click 方法（类似属性的 get/set）。\n   - event 本质是「对委托字段的封装」，类似 property 对字段的封装。\n\n类比：委托字段是 public 变量，event 是只暴露 +=/-= 操作的属性。就像你不会把变量设为 public 而是用属性封装一样，回调也应该用 event 封装。`,
    tags: ["事件", "event", "封装", "发布订阅"],
  },
  {
    id: "dcs-delegates-events-3",
    chapter: "dcs-delegates-events",
    level: 3,
    question: `多播委托的调用列表中某个方法抛出异常会怎样？如何安全地按顺序调用多播委托中的每个方法？`,
    answer:
      `多播委托的异常行为：\n\n多播委托调用时（\`delegate.Invoke()\`），按调用列表顺序逐个执行方法。如果某个方法抛出异常，后面的方法不会被执行——异常直接传播给调用者，调用列表中排在异常方法后面的所有订阅者都被跳过。\n\n问题场景：事件有 5 个订阅者，第 2 个抛异常，第 3-5 个不会收到事件通知。这在事件系统中通常是不可接受的——一个订阅者的 bug 不应该影响其他订阅者。\n\n安全调用的方法：\n\n\`\`\`csharp\n// 方法一：GetInvocationList 逐个调用\nforeach (var handler in MyEvent?.GetInvocationList() ?? Array.Empty<Delegate>())\n{\n    try\n    {\n        handler.DynamicInvoke(sender, args);\n    }\n    catch (Exception ex)\n    {\n        // 记录日志，继续执行下一个订阅者\n        logger.LogError(ex, \"事件处理器异常\");\n    }\n}\n\n// 方法二：使用 Delegate.Invoke 的异步模式（不推荐，有线程池开销）\n\`\`\`\n\nGetInvocationList() 返回一个 Delegate[] 数组，每个元素是调用列表中的一个方法。逐个 DynamicInvoke 可以用 try-catch 包裹每个方法，确保一个失败不影响其他。\n\n实际框架的做法：WPF 的路由事件、ASP.NET Core 的事件系统都内部做了这种异常隔离。但标准 C# event 语法（\`MyEvent?.Invoke()\`）不做隔离——它是一把梭调用，一个抛全停。所以关键场景需要手动 GetInvocationList 隔离。`,
    tags: ["多播委托", "异常处理", "GetInvocationList", "事件安全"],
  },
  {
    id: "dcs-delegates-events-4",
    chapter: "dcs-delegates-events",
    level: 4,
    question: `从 C# 1.0 到 C# 3.0，委托的实例化语法经历了哪些变化？请完整展示同一段回调逻辑在三个版本中的写法，并分析每步简化消除了什么。`,
    answer:
      `委托实例化语法在 C# 1.0→2.0→3.0 的进化，以「列表过滤」为例：\n\n\`\`\`csharp\n// C# 1.0：显式委托 + 命名方法\nList<int> Filter(List<int> list, FilterDelegate filter)\n{\n    var result = new List<int>();\n    foreach (int x in list)\n        if (filter(x)) result.Add(x);\n    return result;\n}\n// 定义命名方法\nstatic bool IsGreaterThan5(int x) { return x > 5; }\n// 创建委托实例\nvar evens = Filter(nums, new FilterDelegate(IsGreaterThan5));\n\n// C# 2.0：匿名方法 + 委托协变 + 方法组转换\nvar evens = Filter(nums, delegate(int x) { return x > 5; });\n// 方法组转换：不需要 new FilterDelegate(...)，编译器自动推断\n\n// C# 3.0：Lambda 表达式\nvar evens = Filter(nums, x => x > 5);\n// 或直接用 LINQ\nvar evens = nums.Where(x => x > 5).ToList();\n\`\`\`\n\n每步简化的分析：\n\n1. C# 1.0→2.0 消除了：\n   - 命名方法的定义：不再需要单独定义 \`IsGreaterThan5\` 方法，匿名方法直接内联。\n   - 显式委托实例化：\`new FilterDelegate(...)\` 变成 \`delegate(int x) { ... }\`，编译器通过方法组转换自动创建委托实例。\n\n2. C# 2.0→3.0 消除了：\n   - \`delegate\` 关键字和参数类型：\`delegate(int x) { return x > 5; }\` 变成 \`x => x > 5\`。编译器从委托签名推断参数类型（int），return 变成表达式。\n   - 花括号和 return：表达式 Lambda \`x => x > 5\` 直接返回表达式的值，不需要花括号和 return。\n\n3. 语法从「定义方法 → 创建委托 → 传参」（3 步 5 行）简化到「写表达式」（1 步 1 行）。这使得 Lambda 可以内联在 LINQ 查询中，催生了整个声明式数据处理范式。\n\n根本变化：从「声明式描述 what + 命令式描述 how」分离，到 Lambda 让「how」也可以内联声明式地表达。这是 C# 从命令式走向函数式的关键一步。`,
    tags: ["委托实例化", "匿名方法", "Lambda", "语法进化"],
  },
];
