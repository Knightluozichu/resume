import type { ReviewQuestion } from "./types";

/** 深入理解 C# · 动态语言特性复习题 */
export const dcsDynamicLanguageQuestions: ReviewQuestion[] = [
  {
    id: "dcs-dynamic-language-1",
    chapter: "dcs-dynamic-language",
    level: 1,
    question: `C# 的 \`dynamic\` 关键字和 \`object\` 有什么区别？\`dynamic\` 的类型检查发生在什么时候？`,
    answer:
      `dynamic 和 object 的核心区别在于「类型检查的时机」：\n\n- \`object\`：编译时类型检查。object 是所有类型的基类，但使用前必须显式强制转换（如 \`(string)obj\`），转换类型不匹配会编译报错（若编译器能判断）或运行时抛 InvalidCastException。\n- \`dynamic\`：运行时类型检查。dynamic 绕过编译时类型检查——编译器把 dynamic 视为「类型待定」，所有方法调用、属性访问、运算符都在运行时通过 DLR（Dynamic Language Runtime）绑定。不需要强制转换，但调用不存在的方法会在运行时抛 RuntimeBinderException。\n\n类型检查时机：\n\`\`\`csharp\nobject o = 10;\no.ToUpper();  // 编译报错：object 没有 ToUpper 方法\n((string)o).ToUpper();  // 编译通过，运行时抛 InvalidCastException（int 不能转 string）\n\ndynamic d = 10;\nd.ToUpper();  // 编译通过，运行时抛 RuntimeBinderException（int 没有 ToUpper）\nd = \"hello\";\nd.ToUpper();  // 编译通过，运行时返回 \"HELLO\"\n\`\`\`\n\ndynamic 的本质是「编译器帮你生成 DLR 调用代码」。编译时不检查成员是否存在，运行时由 DLR 的 CallSite 机制动态绑定。同一个 dynamic 变量可以先后持有不同类型的值，调用各自的方法。`,
    tags: ["dynamic", "object", "类型检查", "DLR"],
  },
  {
    id: "dcs-dynamic-language-2",
    chapter: "dcs-dynamic-language",
    level: 2,
    question: `C# 引入 \`dynamic\` 的主要动机是什么？它在 COM 互操作和与动态语言交互方面解决了什么问题？`,
    answer:
      `C# 4.0 引入 dynamic 的主要动机：\n\n1. COM 互操作：\n   - 在 dynamic 之前，调用 COM 对象（如 Excel、Word）需要大量强制转换。COM 的某些方法返回 object，你不知道实际类型，必须 \`(Excel.Range)comObj\`。\n   - 使用 dynamic 后，COM 对象可以 \`dynamic excel = new Application(); dynamic range = excel.Range[\"A1\"]; range.Value = 42;\` ——无需任何强制转换，DLR 自动绑定到 COM 的 IDispatch 接口。\n   - 还省去了可选参数的 \`Type.Missing\` 地狱——COM 的很多方法有 30+ 可选参数，C# 4.0 之前每个都要传 Type.Missing，dynamic + 命名参数后可以只传需要的。\n\n2. 与动态语言互操作：\n   - IronPython、IronRuby 等动态语言运行在 DLR 上。C# 的 dynamic 可以直接调用 Python 对象的方法，无需反射。\n   - \`dynamic pyObj = pythonEngine.CreateScope(); pyObj.my_python_function(42);\` ——DLR 负责跨语言绑定。\n\n3. 替代反射：\n   - 调用一个类型不确定的方法时，传统做法是反射：\`type.GetMethod(\"Foo\").Invoke(obj, args)\` ——冗长、无类型安全、性能差。\n   - 用 dynamic：\`dynamic d = obj; d.Foo(args)\` ——简洁，DLR 内部缓存 CallSite，第二次调用比反射快得多。\n\n4. 简化 XML/JSON 处理：\n   - 处理结构不确定的 JSON 时，dynamic 可以 \`dynamic json = JsonConvert.DeserializeObject(str); json.items[0].name\` 而不需要定义类。\n\n核心洞察：dynamic 不是「C# 变成了动态语言」，而是「C# 可以与动态世界（COM、脚本语言、JSON）交互」。C# 本身仍是静态类型语言，dynamic 是通往动态世界的桥梁。`,
    tags: ["dynamic动机", "COM互操作", "反射替代", "DLR"],
  },
  {
    id: "dcs-dynamic-language-3",
    chapter: "dcs-dynamic-language",
    level: 3,
    question: `DLR（Dynamic Language Runtime）的 CallSite 缓存机制是如何工作的？为什么说第二次调用 dynamic 比第一次快得多？`,
    answer:
      `DLR 的 CallSite 缓存机制：\n\n1. CallSite 的概念：\n   编译器把每个 dynamic 调用编译成一个 CallSite<T> 对象。CallSite 是一个「调用点」，它持有一个委托，负责在运行时绑定目标方法。第一次调用时，CallSite 的委托还没绑定——它需要通过 DLR 的 Binder 查找正确的方法。\n\n2. 第一次调用的流程（慢）：\n   - CallSite 调用 Binder.Bind，Binder 通过反射检查 dynamic 对象的实际类型（如 int），找到匹配的方法（如 int.ToString()）。\n   - Binder 生成一个新的委托，包装「直接调用 int.ToString() 的代码」。\n   - CallSite 把这个委托缓存到 L0 缓存（CallSite 级别）。\n   - 整个过程涉及反射 + IL 生成，第一次调用有明显开销。\n\n3. 第二次调用的流程（快）：\n   - 同一个 dynamic 变量持有相同类型（int），CallSite 检查 L0 缓存——命中！\n   - 直接调用缓存的委托，跳过 Binder 反射和 IL 生成。\n   - 第二次调用接近直接方法调用的速度（只多一层委托间接调用 + 类型检查）。\n\n4. 多级缓存：\n   - L0（CallSite 级别）：缓存最近一次绑定的规则。命中率最高。\n   - L1（RuleCache 级别）：缓存该 CallSite 的多个绑定规则（如 int 和 string 交替出现时，L0 会 miss 但 L1 命中）。\n   - L2：跨 CallSite 的全局缓存。\n\n5. 缓存失效：\n   如果 dynamic 变量的类型改变（从 int 变成 string），L0 缓存 miss，走 L1 查找。如果 L1 也没有，重新走 Binder 绑定并更新缓存。\n\n性能对比：\n- 第一次 dynamic 调用：约反射速度（慢）。\n- 第二次起（同类型）：接近直接调用速度（快），比反射快 10-100 倍。\n- 反射（MethodInfo.Invoke）：每次都走查找，无缓存优化。\n\n结论：dynamic 的性能取决于「类型稳定性」。如果同一个 CallSite 总是调用同一类型的方法，CallSite 缓存命中率高，性能接近直接调用。如果类型频繁变化，缓存频繁失效，性能退化到接近反射。`,
    tags: ["DLR", "CallSite", "缓存机制", "性能"],
  },
  {
    id: "dcs-dynamic-language-4",
    chapter: "dcs-dynamic-language",
    level: 4,
    question: `在什么场景下应该使用 \`dynamic\`，什么场景下应该用泛型或方法重载？使用 dynamic 有哪些风险？`,
    answer:
      `dynamic 的适用与不适用场景：\n\n适合用 dynamic 的场景：\n1. COM 互操作：Excel/Word 自动化，dynamic 消除大量强制转换，是官方推荐做法。\n2. 调用未知类型的 Python/Ruby 对象：跨语言互操作，dynamic 是唯一简洁选择。\n3. JSON/XML 等结构不确定的数据：快速原型开发，不需要定义类。但生产环境应改用强类型反序列化。\n4. 简化反射调用：如果需要调用一个编译时未知的方法，dynamic 比反射简洁。但要注意性能。\n5. 测试 mock 框架：Moq 等框架内部使用 dynamic/反射实现 mock。\n\n不适合用 dynamic 的场景（应该用泛型或重载）：\n1. 需要类型安全的核心业务逻辑：dynamic 丧失编译时类型检查，错误推迟到运行时。\n2. 公共 API 设计：API 参数用 dynamic 会让调用方困惑（传什么类型都行，但运行时可能崩）。应该用泛型约束（\`where T : IInterface\`）。\n3. 性能敏感的热路径：即使有 CallSite 缓存，dynamic 仍比直接调用慢（多一层委托间接 + 类型检查）。热路径应该用泛型或虚方法。\n4. 重构频繁的代码：dynamic 调用不被 IDE 重构工具识别——重命名方法时，dynamic 调用不会被更新。\n\n使用 dynamic 的风险：\n1. 编译时安全丢失：拼错方法名 \`d.ToStirng()\`（拼写错误）编译通过，运行时崩。\n2. 重构不安全：IDE 的重命名、查找引用不覆盖 dynamic 调用。\n3. 智能提示失效：dynamic 变量没有成员列表提示。\n4. 重载解析延迟到运行时：\`d.Foo(42)\` 在编译时无法确定调用哪个重载，运行时由 DLR 解析，可能与预期不符。\n5. 性能不可预测：第一次调用慢（绑定开销），如果类型频繁变化持续慢。\n\n决策原则：dynamic 是「与动态世界交互的桥梁」，不是「逃避类型系统的工具」。如果编译时知道类型，永远用泛型/接口/重载。只有当编译时确实不知道类型（COM、脚本、动态 JSON），才用 dynamic。`,
    tags: ["dynamic适用场景", "泛型对比", "风险", "设计决策"],
  },
];
