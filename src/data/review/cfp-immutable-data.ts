import type { ReviewQuestion } from "./types";

/** C# 函数式编程 · 不可变数据复习题 */
export const cfpImmutableDataQuestions: ReviewQuestion[] = [
  {
    id: "cfp-immutable-data-1",
    chapter: "cfp-immutable-data",
    level: 1,
    question: `C# 中 \`record\` 和 \`class\` 的主要区别是什么？为什么说 record 是「不可变」的？`,
    answer:
      `主要区别：\n1. **可变性**：\`class\` 的属性默认 \`{ get; set; }\`（可读写），\`record\` 的属性默认 \`{ get; init; }\`（只能在构造时设置，之后不可修改）\n2. **值语义**：\`class\` 是引用相等（\`==\` 比较引用地址），\`record\` 是值相等（\`==\` 比较所有字段值）\n3. **with 表达式**：\`record\` 支持 \`with { ... }\` 创建修改后的副本，\`class\` 不支持\n4. **编译器生成**：\`record\` 自动生成 \`Equals\`、\`GetHashCode\`、\`ToString\`、\`Deconstruct\`\n\nrecord 是「不可变」的原因：属性用 \`init\` 访问器，只能在对象初始化时赋值（构造函数或对象初始化器），之后任何赋值都会编译报错。修改 record 需要 \`with\` 表达式创建新副本：\`var p2 = p1 with { Name = \"Bob\" }\`——原对象 \`p1\` 不变，\`p2\` 是修改了 Name 的新对象。`,
    tags: ["record", "class", "不可变", "init", "值语义"],
  },
  {
    id: "cfp-immutable-data-2",
    chapter: "cfp-immutable-data",
    level: 2,
    question: `以下代码输出什么？请解释 \`with\` 表达式的工作机制。`,
    answer:
      `\`\`\`csharp\nrecord Point(int X, int Y);\n\nvar p1 = new Point(1, 2);\nvar p2 = p1 with { X = 10 };\nConsole.WriteLine(p1);  // Point { X = 1, Y = 2 }\nConsole.WriteLine(p2);  // Point { X = 10, Y = 2 }\nConsole.WriteLine(p1 == p2);  // False\n\`\`\`\n\n输出：\n- \`p1\`: \`Point { X = 1, Y = 2 }\`——原对象不变\n- \`p2\`: \`Point { X = 10, Y = 2 }\`——X 被修改，Y 保持原值\n- \`p1 == p2\`: \`False\`——值不相等（X 不同）\n\n\`with\` 表达式的工作机制：\n1. 编译器调用 record 的拷贝构造函数，创建 \`p1\` 的完整副本\n2. 然后用 \`X = 10\` 修改副本的 X 属性（init 访问器在 with 上下文中允许赋值）\n3. 返回修改后的新 record 实例\n4. 原对象 \`p1\` 完全不受影响\n\n关键：\`with\` 不是修改原对象，而是「拷贝 + 修改指定字段」。这是不可变数据变更的标准方式。`,
    tags: ["with", "record", "拷贝", "值相等"],
  },
  {
    id: "cfp-immutable-data-3",
    chapter: "cfp-immutable-data",
    level: 3,
    question: `请设计一个不可变的 \`Money\` 类型，包含 \`Amount\` 和 \`Currency\` 字段。实现一个 \`Add\` 方法，返回新的 \`Money\` 而非修改原对象。处理不同货币相加的情况。`,
    answer:
      `\`\`\`csharp\npublic record Money(decimal Amount, string Currency)\n{\n    public Money Add(Money other)\n    {\n        if (Currency != other.Currency)\n            throw new ArgumentException(\n                $\"Cannot add {Currency} and {other.Currency}\");\n        return this with { Amount = Amount + other.Amount };\n    }\n\n    // 函数式风格：用静态方法替代实例方法\n    public static Money operator +(Money a, Money b) => a.Add(b);\n\n    public Money Scale(decimal factor) => this with { Amount = Amount * factor };\n}\n\n// 使用\nvar price = new Money(99.99m, \"CNY\");\nvar shipping = new Money(15.00m, \"CNY\");\nvar total = price.Add(shipping);  // Money(114.99, \"CNY\")\n// price 和 shipping 不变\n\nvar discounted = price.Scale(0.8m);  // Money(79.992, \"CNY\")\n// price 不变\n\`\`\`\n\n关键点：\n1. \`record\` 提供不可变性——\`Amount\` 和 \`Currency\` 是 init-only\n2. \`Add\` 用 \`with\` 创建新副本，原对象不变\n3. \`Scale\` 同理——所有「修改」操作都返回新对象\n4. 运算符重载 \`+\` 让代码更自然：\`price + shipping\`\n5. 不同货币相加抛异常——这是「失败快速」的命令式风格；函数式风格可以用 \`Result<Money>\` 返回（见错误处理章节）`,
    tags: ["record", "with", "不可变设计", "Money", "运算符重载"],
  },
  {
    id: "cfp-immutable-data-4",
    chapter: "cfp-immutable-data",
    level: 4,
    question: `不可变数据为什么能提升并发安全？请从「共享可变状态」问题出发，分析不可变性如何消除竞态条件，以及 \`with\` 表达式的拷贝开销在什么场景下是问题。`,
    answer:
      `共享可变状态是并发的根源：\n\n多个线程访问同一个可变对象时，如果没有同步机制，读写交错会导致数据竞争。例如：\n\`\`\`csharp\nclass Counter { public int Value { get; set; } }\nvar c = new Counter();\n// 线程A: c.Value++ (读-改-写，非原子)\n// 线程B: c.Value++ (同时执行，可能丢失一次递增)\n\`\`\`\n需要 \`lock\` 或 \`Interlocked\` 保护，但锁带来性能损耗和死锁风险。\n\n不可变性消除竞态条件的原理：\n1. **无需锁**：不可变对象创建后永不变化，多个线程读取同一个对象永远安全——没有写入就不会有竞争\n2. **无防御性拷贝**：可变对象传给其他方法时，可能被修改，调用方需要防御性拷贝。不可变对象可以安全共享，无需拷贝\n3. **引用透明**：\`var p2 = p1 with { X = 10 }\` 创建新对象，\`p1\` 不变。其他线程持有的 \`p1\` 引用不受影响\n4. **原子替换**：多线程场景中，用新对象替换旧引用（\`volatile\` 或 \`Interlocked.Exchange\`）是原子的，不需要锁整个对象\n\n\`with\` 拷贝开销的问题场景：\n1. **频繁修改**：循环中反复 \`with\` 修改同一对象，每次都创建新副本。如 \`for (int i = 0; i < 1000; i++) state = state with { Count = state.Count + 1 }\` 产生 1000 个临时对象，GC 压力大\n2. **大对象**：record 有很多字段时，\`with\` 拷贝全部字段。只改一个字段也要全量拷贝。不过 record 的拷贝是浅拷贝（引用类型字段只拷贝引用），通常很快\n3. **集合操作**：不可变集合（\`ImmutableList<T>\`）的 \`Add\` 是 O(log n) 的树操作，比 \`List<T>.Add\` 的均摊 O(1) 慢\n\n解决策略：\n1. **批量修改**：先把数据累积在可变结构中，最后转为不可变。如 \`List<T>\` → \`ImmutableList<T>.ToImmutableList()\`\n2. **Builder 模式**：\`ImmutableList<T>.Builder\` 提供可变 API，构建完成后 \`ToImmutable()\`\n3. **持久化数据结构**：\`ImmutableList\`/\`ImmutableDictionary\` 用树结构共享不可变节点，\`with\` 只拷贝路径上的节点，不是全量拷贝\n4. **局部可变**：函数内部用可变变量，返回不可变结果。纯函数的边界在函数出入口，内部实现可以用命令式\n\n结论：不可变性消除共享状态的并发 bug，代价是修改操作的拷贝开销。在并发场景下收益远大于代价；在单线程高频修改场景下，用 Builder 或局部可变来缓解。`,
    tags: ["并发安全", "竞态条件", "with开销", "持久化数据结构", "Builder"],
  },
];
