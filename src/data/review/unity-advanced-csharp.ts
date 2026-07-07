/** 复习题库 · C#技术要点（unity-advanced-csharp）。《Unity3D高级编程：主程手记》第2章。 */

import type { ReviewQuestion } from "./types";

export const unityAdvancedCsharpQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "ua-cs-1",
    chapter: "unity-advanced-csharp",
    level: 1,
    question: "什么是装箱（Boxing）和拆箱（Unboxing）？",
    answer:
      "**装箱**是将值类型（如 int、float、enum、struct）隐式转换为 object 或该值类型实现的接口类型的过程——运行时会在托管堆上分配一个对象，把值拷贝进去，并返回引用。**拆箱**是反向操作：将 object 引用显式转换回值类型——运行时检查对象类型是否匹配，然后把堆上的值拷贝回栈上的变量。装箱拆箱会产生堆内存分配和类型检查开销，在热路径（每帧执行、频繁循环）中必须避免。",
    tags: ["装箱", "拆箱", "Boxing", "值类型", "堆分配"],
  },
  {
    id: "ua-cs-2",
    chapter: "unity-advanced-csharp",
    level: 1,
    question: "为什么说 string 是不可变（Immutable）的？这带来了什么后果？",
    answer:
      "C# 中的 `string` 一旦创建，其内容在堆上就不可修改——所有看似「修改字符串」的操作（`Substring`、`Replace`、`+`拼接、`ToUpper`等）都会返回一个**新的 string 对象**，原字符串保持不变。后果：① 循环中反复拼接字符串（如 `s += \"x\"`）会产生大量临时 string 对象，造成 GC 压力；② 字符串比较和传参是安全的（不用担心被意外修改）；③ 需要频繁拼接/修改字符串时应该使用 `StringBuilder`。",
    tags: ["string", "不可变", "Immutable", "GC", "StringBuilder"],
  },
  {
    id: "ua-cs-3",
    chapter: "unity-advanced-csharp",
    level: 1,
    question: "List<T> 的扩容机制是什么？",
    answer:
      "`List<T>` 内部使用一个动态数组 `_items` 来存储元素，初始容量为 0（或构造时指定）。当 `Add` 时发现 `Count == Capacity`，会触发扩容：新容量取 `当前容量 × 2`（.NET Core 2.0+/Unity 新版 Mono），或初始 4 后翻倍（旧版从 0 开始时首次扩到 4），然后 `Array.Copy` 将旧数组元素拷贝到新数组。扩容会产生新数组分配和 O(n) 拷贝开销。**最佳实践**：如果事先知道元素数量上限，构造时传入容量参数 `new List<T>(expectedCount)`，避免反复扩容。",
    tags: ["List", "扩容", "动态数组", "容量", "性能"],
  },

  // ── L2 理解：为什么 / 区别 ──
  {
    id: "ua-cs-4",
    chapter: "unity-advanced-csharp",
    level: 2,
    question: "值类型和引用类型在内存分配、赋值行为上有什么本质区别？",
    answer:
      "**值类型**（struct、enum、基本数值类型）：分配在栈上（或作为引用类型字段的一部分内联在堆上），赋值时做**逐字段拷贝**——修改副本不影响原值。**引用类型**（class、数组、string、委托）：对象本身分配在托管堆上，变量只持有指向堆对象的引用（指针），赋值时只拷贝引用——两个变量指向同一个对象，通过一个修改会影响另一个。关键影响：① 值类型赋值/传参有拷贝成本，过大的 struct（超过 16 字节通常不建议）拷贝开销反而比引用大；② 值类型没有 GC 开销，但装箱后会产生堆对象；③ 引用类型的对象受 GC 管理，但传参只拷贝 8 字节引用，成本低。",
    tags: ["值类型", "引用类型", "栈", "堆", "内存分配"],
  },
  {
    id: "ua-cs-5",
    chapter: "unity-advanced-csharp",
    level: 2,
    question: "为什么说 LINQ 在热路径（Hot Path）上是禁忌？LINQ 具体会产生哪些开销？",
    answer:
      "热路径指每帧执行或高频调用的代码（如 Update、战斗循环、UI 列表刷新）。LINQ 的问题：① **闭包分配**：`Where(x => x.Active)` 中的 lambda 如果捕获外部变量，会在堆上分配闭包对象；② **迭代器分配**：LINQ 返回 `IEnumerable<T>`，使用 `foreach` 遍历会在某些情况下分配迭代器（注意：`List<T>.Where` 在 .NET Core 2.1+ 做了优化但 Unity Mono 未必有）；③ **委托调用开销**：每个谓词都是委托调用，比直接 for 循环慢；④ **链式调用产生临时对象**：`.Where().Select().OrderBy()` 每一步都产生新的迭代器对象；⑤ **无法预测的性能**：某些 LINQ 操作（如 OrderBy、GroupBy）内部会分配数组和比较器。LINQ 可以用在初始化、低频事件响应等非热路径，但每帧跑的代码必须用 for/foreach 原始循环手写。",
    tags: ["LINQ", "热路径", "GC", "闭包", "性能"],
  },
  {
    id: "ua-cs-6",
    chapter: "unity-advanced-csharp",
    level: 2,
    question: "Dictionary<TKey, TValue> 是如何解决哈希冲突的？为什么自定义类型作为 Key 需要重写 GetHashCode 和 Equals？",
    answer:
      "Dictionary 内部使用**数组+链表（拉链法）**（.NET Core 3.0+ 引入了改进版本，在链表长度超过阈值时转为哈希桶内的搜索树以提升最坏性能）：通过 `key.GetHashCode() % buckets.Length` 计算桶索引，同一桶内的元素用链表（或 entry 数组链）串联。查找时先定位桶，再遍历链表用 `Equals` 逐个比较 Key。自定义 struct/class 作为 Key 时：① 默认 `GetHashCode` 对 struct 是反射式逐字段哈希（慢），对 class 是基于对象引用的哈希（用内容相同的不同对象查找会 miss）；② 默认 `Equals` 对 struct 是反射逐字段比较（慢），对 class 是引用相等（内容相同但不同引用会 miss）。所以必须重写两者，并且保证**相等的对象必须有相同的哈希码、哈希码分布尽量均匀**，否则会导致大量哈希冲突退化为线性查找或查找失败。",
    tags: ["Dictionary", "哈希表", "GetHashCode", "Equals", "哈希冲突"],
  },

  // ── L3 应用：代码分析 / 最佳实践 ──
  {
    id: "ua-cs-7",
    chapter: "unity-advanced-csharp",
    level: 3,
    question: "下面这段代码有哪些性能问题？请逐条指出并给出优化方案。\n```csharp\nvoid Update() {\n    string msg = \"HP:\" + hp + \" MP:\" + mp;\n    var list = new List<GameObject>();\n    for (int i = 0; i < enemies.Count; i++) {\n        if (enemies[i].Hp > 0) list.Add(enemies[i].gameObject);\n    }\n    var sorted = list.OrderBy(g => g.transform.position.z).ToList();\n    Debug.Log(\"Active enemies: \" + list.Count);\n}\n```",
    answer:
      "问题：① **Update 中字符串拼接**——`\"HP:\" + hp + \" MP:\" + mp` 和 `\"Active enemies: \" + list.Count` 每帧产生临时 string 对象，引发 GC；应使用 `StringBuilder` 预分配或在需要显示时才拼接（UI 层按需更新而非每帧）；② **每帧 new List<GameObject>**——每帧在堆上分配新 List，产生 GC；应将 List 作为类字段复用，用 `Clear()` 清空而非 new；③ **LINQ OrderBy + ToList**——每帧排序产生大量临时对象（排序迭代器、比较器闭包、新 List），GC Alloc 严重；如果需要排序应在数据变化时排好序缓存结果，或手写排序；④ **enemies[i].gameObject / transform**——MonoBehaviour 的 `.gameObject` 和 `.transform` 是引擎属性访问，虽然 Unity 缓存了 transform，但频繁链式访问仍有开销，可缓存 `var go = enemies[i].gameObject;`。",
    tags: ["代码分析", "Update", "GC", "List复用", "LINQ", "字符串拼接"],
  },
  {
    id: "ua-cs-8",
    chapter: "unity-advanced-csharp",
    level: 3,
    question: "泛型集合（如 List<T>、Dictionary<K,V>）相比非泛型集合（ArrayList、Hashtable）有什么优势？为什么泛型能减少装箱？",
    answer:
      "非泛型集合存储的是 `object`——任何值类型放进去都会被**装箱**为 object 引用，取出来时又要**拆箱**，每次操作都产生堆分配和类型转换开销，而且没有编译期类型安全（可以把 string 和 int 混着放，取出来才报错）。泛型集合在编译时为具体类型 `T` 生成特化版本：`List<int>` 内部是 `int[]` 数组，直接存储 int 值，不需要装箱，取出来直接就是 int；同时编译器会检查类型，放错类型直接编译报错。对于 Unity 热路径，**一律使用泛型集合**，禁止使用 ArrayList、Hashtable 等非泛型集合。注意：`List<object>` 和以接口类型为 T 的泛型集合仍然可能导致值类型装箱（因为接口引用需要 object 表示）。",
    tags: ["泛型", "非泛型", "装箱", "ArrayList", "List", "类型安全"],
  },
  {
    id: "ua-cs-9",
    chapter: "unity-advanced-csharp",
    level: 3,
    question: "GC 优化编码中，「零 GC Alloc 热路径」需要遵守哪些戒律？至少列举 6 条。",
    answer:
      "热路径零 GC 编码戒律：① **禁止 new 引用类型对象**——不要在 Update/LateUpdate/FixedUpdate/高频循环中 new 任何 class 对象、数组、委托（闭包）；容器使用 Clear() 复用；② **禁止使用无容量参数的 new List<T>()/new Dictionary<K,V>()**——根据预估容量构造，避免运行中扩容产生拷贝；③ **禁止字符串拼接**——用 StringBuilder（复用实例）、string.Format（低频场景）、或直接对 Text 组件逐段赋值；字符串常量用 `const` 或 `nameof()`；④ **禁止 LINQ**——手写 for/foreach 循环，注意 foreach 在某些 Unity 版本对 List 以外的集合仍会产生迭代器 alloc，热路径统一用 for；⑤ **禁止装箱**——不要将值类型传给 object 参数的方法（如 `Debug.Log(\"x:\" + 1)` 会装箱 int），不要在非泛型集合存放值类型；⑥ **缓存组件引用**——GetComponent<T>()、FindObjectOfType、Camera.main、GameObject.Find 等结果在 Awake/Start 缓存到字段，不要每帧调用；⑦ **避免协程中 new WaitForSeconds**——缓存 WaitForSeconds 对象复用，或使用 WaitForSecondsRealtime；⑧ **减少 params 参数和 params 数组**——每调用一次会 new 数组。",
    tags: ["GC优化", "零GC", "热路径", "性能", "编码规范"],
  },

  // ── L4 主程视角：技术决策 ──
  {
    id: "ua-cs-10",
    chapter: "unity-advanced-csharp",
    level: 4,
    question: "你作为主程制定团队的 C# 编码规范时，哪些规则应该作为强制项（Code Review 必卡），哪些规则可以作为建议项？请说明理由。",
    answer:
      "**强制项（违反即打回）**：① 热路径（Update/LateUpdate/FixedUpdate/战斗核心循环）禁止 new 引用类型、禁止 LINQ、禁止字符串+拼接、禁止未缓存的 GetComponent/Find——这些直接影响帧率和 GC Spike，是卡顿的根源，必须用自动化工具（如 Rider 静态分析规则、自定义 Roslyn Analyzer）检测；② 禁止使用 ArrayList/Hashtable 等非泛型集合——没有任何理由用它们；③ Dictionary 的 Key 是自定义类型时必须重写 GetHashCode/Equals，并写单元测试验证哈希分布；④ 所有 List/Dictionary 成员在确定大小场景下必须传入容量参数；⑤ 禁止在业务逻辑中使用 public 字段——用属性，且不要暴露集合的可写引用（考虑 IReadOnlyList）；⑥ 协程中 WaitForSeconds 必须缓存复用。**建议项（视场景）**：① 是否使用 StringBuilder——非热路径（如初始化、UI打开）直接拼接可读性更好；② struct 大小控制——不超过 16 字节是经验值，但不是硬性规定，Profile 后再定；③ 是否使用 foreach——Unity 2018+ 对 List<T> 的 foreach 已不产生 GC，用 foreach 可读性更好；④ 命名风格、注释密度——属于代码审美，团队约定即可。主程的原则是**只强制对性能和正确性有硬影响的规则**，不要在代码风格上过度管制消耗团队精力，但对性能红线必须零容忍。",
    tags: ["主程决策", "编码规范", "Code Review", "GC", "团队规范"],
  },
];
