import type { ReviewQuestion } from "./types";

export const ec7DelegatesEventsQuestions: ReviewQuestion[] = [
  {
    id: "ec7-delegates-events-1",
    chapter: "ec7-delegates-events",
    level: 1,
    question: `Func 和 Action 各自的签名含义是什么？写出 \`Func<int, string>\` 和 \`Action<int>\` 各自代表什么类型的方法。`,
    answer:
      `Func<T, TResult>：接受 T 类型参数，返回 TResult 类型结果。泛型参数最后一个总是返回类型。\nAction<T>：接受 T 类型参数，无返回值（void）。\n\`Func<int, string>\`：接受 int 返回 string 的方法。例如 \`string IntToString(int x) => x.ToString();\`。\n\`Action<int>\`：接受 int 无返回值的方法。例如 \`void PrintInt(int x) => Console.WriteLine(x);\`。\n还有无参版本：\`Func<TResult>\`（无参有返回值）、\`Action\`（无参无返回值）。\n多参数版本：\`Func<int, int, bool>\`（两个 int 参数返回 bool）、\`Action<string, int>\`（string 和 int 参数无返回值）。`,
    tags: ["Func", "Action", "内置委托"],
  },
  {
    id: "ec7-delegates-events-2",
    chapter: "ec7-delegates-events",
    level: 2,
    question: `event 修饰的委托与普通委托字段有什么区别？为什么发布-订阅模式必须用 event？写出代码对比。`,
    answer:
      `普通委托字段：外部可赋值（= 覆盖所有订阅者）、可触发（Invoke）、可读。event 修饰的委托：外部只能 += / -=（订阅/取消），不能赋值、不能触发，只有声明类内部能 Invoke。\n\`\`\`csharp\npublic class Publisher\n{\n    // 普通委托字段——不安全\n    public Action<string> OnMessage;\n\n    // event 修饰——安全\n    public event Action<string> OnEvent;\n\n    public void Trigger()\n    {\n        OnMessage?.Invoke(\"msg\");  // 内部可触发\n        OnEvent?.Invoke(\"msg\");    // 内部可触发\n    }\n}\nvar pub = new Publisher();\npub.OnMessage += HandlerA;\npub.OnMessage = HandlerB;     // 合法！覆盖了 HandlerA\npub.OnMessage?.Invoke(\"x\");   // 合法！外部可触发\n\npub.OnEvent += HandlerA;\npub.OnEvent += HandlerB;\n// pub.OnEvent = null;         // 编译错误！外部不能赋值\n// pub.OnEvent?.Invoke(\"x\");  // 编译错误！外部不能触发\n\`\`\`\n必须用 event 的原因：(1) 防止订阅者覆盖其他订阅者；(2) 防止外部冒充发布者触发；(3) 封装触发权限。`,
    tags: ["event", "委托", "发布-订阅", "封装"],
  },
  {
    id: "ec7-delegates-events-3",
    chapter: "ec7-delegates-events",
    level: 3,
    question: `多播委托中一个处理器抛异常会怎样？如何确保所有注册的处理器都能执行？写出解决方案代码。`,
    answer:
      `多播委托按注册顺序依次调用，一旦某个处理器抛异常，调用链中断，后续处理器不执行。异常直接传播给调用方。\n解决方案：用 GetInvocationList() 获取调用列表，逐个 try-catch 调用每个处理器：\n\`\`\`csharp\npublic event Action<string> OnMessage;\n\npublic void RaiseSafely(string msg)\n{\n    if (OnMessage == null) return;\n    var exceptions = new List<Exception>();\n    foreach (Action<string> handler in OnMessage.GetInvocationList())\n    {\n        try\n        {\n            handler(msg);  // 逐个调用\n        }\n        catch (Exception ex)\n        {\n            exceptions.Add(ex);  // 收集异常但不中断\n        }\n    }\n    if (exceptions.Count > 0)\n        throw new AggregateException(exceptions);\n}\n\`\`\`\n这样即使某个处理器失败，其他处理器仍能执行。所有异常收集到 AggregateException 中统一抛出。`,
    tags: ["多播委托", "异常处理", "GetInvocationList"],
  },
  {
    id: "ec7-delegates-events-4",
    chapter: "ec7-delegates-events",
    level: 4,
    question: `实现一个 TemperatureSensor 类，当温度变化超过阈值时触发事件。要求：用 EventHandler<T> 模式、事件参数自定义、订阅者用 Lambda 接收。写出完整代码。`,
    answer:
      `\`\`\`csharp\n// 自定义事件参数\npublic class TemperatureChangedEventArgs : EventArgs\n{\n    public double OldTemp { get; }\n    public double NewTemp { get; }\n    public double Delta => Math.Abs(NewTemp - OldTemp);\n\n    public TemperatureChangedEventArgs(double old, double neu)\n    {\n        OldTemp = old;\n        NewTemp = neu;\n    }\n}\n\n// 发布者\npublic class TemperatureSensor\n{\n    private double _temperature;\n    private readonly double _threshold;\n\n    // EventHandler<T> 标准事件模式\n    public event EventHandler<TemperatureChangedEventArgs>? TemperatureChanged;\n\n    public TemperatureSensor(double threshold = 0.5)\n    {\n        _threshold = threshold;\n    }\n\n    public double Temperature\n    {\n        get => _temperature;\n        set\n        {\n            var old = _temperature;\n            _temperature = value;\n            // 超过阈值才触发\n            if (Math.Abs(value - old) >= _threshold)\n            {\n                TemperatureChanged?.Invoke(this,\n                    new TemperatureChangedEventArgs(old, value));\n            }\n        }\n    }\n}\n\n// 使用：Lambda 订阅\nvar sensor = new TemperatureSensor(threshold: 1.0);\nsensor.TemperatureChanged += (sender, e) =>\n    Console.WriteLine($\"温度变化: {e.OldTemp} -> {e.NewTemp} (Δ{e.Delta:F1})\");\nsensor.Temperature = 25.0;  // 首次设置，无旧值比较\nsensor.Temperature = 25.5;  // 变化 0.5 < 1.0，不触发\nsensor.Temperature = 27.0;  // 变化 1.5 >= 1.0，触发事件\n\`\`\`\n要点：(1) EventArgs 子类封装事件数据；(2) EventHandler<T> 是 .NET 标准事件模式；(3) ?Invoke 防无订阅者空引用；(4) 阈值过滤减少不必要的触发；(5) Lambda 简洁订阅。`,
    tags: ["event", "EventHandler", "EventArgs", "综合设计"],
  },
];
