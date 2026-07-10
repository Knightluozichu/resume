import type { ReviewQuestion } from "./types";

export const ec7GenericsQuestions: ReviewQuestion[] = [
  {
    id: "ec7-generics-1",
    chapter: "ec7-generics",
    level: 1,
    question: `泛型相比非泛型（用 object 存储）有哪两大核心优势？`,
    answer:
      `(1) 类型安全：编译期检查类型。Stack<int> 只能存 int，存 string 编译报错。取值无需强转（int x = stack.Pop() 而非 int x = (int)stack.Pop()）。非泛型 Stack 用 object 存储，任何类型都能存进去，运行时才发现类型错误。\n(2) 消除装箱：值类型泛型（Stack<int>）内部直接用 int[] 存储，不需要装箱成 object。非泛型 Stack 用 object[] 存储，存 int 时每次都装箱（堆分配 + 数据拷贝 + GC 压力）。\n\`\`\`csharp\n// 泛型：类型安全 + 无装箱\nvar s = new Stack<int>();\ns.Push(42);      // 无装箱\nint x = s.Pop(); // 无强转\n\n// 非泛型：不安全 + 装箱\nvar s = new Stack();\ns.Push(42);          // 装箱\nint x = (int)s.Pop(); // 强转，运行时可能失败\n\`\`\``,
    tags: ["泛型", "类型安全", "装箱", "性能"],
  },
  {
    id: "ec7-generics-2",
    chapter: "ec7-generics",
    level: 2,
    question: `列出泛型约束的五种类型，并说明 \`where T : IComparable<T>\` 约束让泛型代码能做什么。`,
    answer:
      `五种约束：\n(1) where T : class — T 必须是引用类型\n(2) where T : struct — T 必须是值类型（非 Nullable）\n(3) where T : new() — T 必须有无参公共构造函数\n(4) where T : IComparable — T 必须实现指定接口\n(5) where T : Animal — T 必须是指定基类或其派生类\n\n\`where T : IComparable<T>\` 让编译器知道 T 有 \`CompareTo(T other)\` 方法，泛型代码可以调用它做比较：\n\`\`\`csharp\npublic T Max<T>(T a, T b) where T : IComparable<T>\n    => a.CompareTo(b) >= 0 ? a : b;\n// 不加约束时 a.CompareTo(b) 编译报错——编译器不知道 T 有 CompareTo\n\`\`\``,
    tags: ["泛型约束", "where", "IComparable"],
  },
  {
    id: "ec7-generics-3",
    chapter: "ec7-generics",
    level: 3,
    question: `为什么 \`List<Dog>\` 不能赋给 \`List<Animal>\`，但 \`IEnumerable<Dog>\` 可以赋给 \`IEnumerable<Animal>\`？解释协变原理。`,
    answer:
      `List<T> 的 T 是 invariant（不变）——既有 Add(T) 输入又有 T 索引输出（双向）。如果允许 List<Dog> 赋给 List<Animal>：\n\`\`\`csharp\nList<Dog> dogs = new List<Dog>();\nList<Animal> animals = dogs;  // 假设允许\nanimals.Add(new Cat());       // Cat 也是 Animal，编译通过\n// 但 dogs 里混入了 Cat！类型不安全\n\`\`\`\nIEnumerable<out T> 是协变——T 只出现在输出位置（GetEnumerator 返回 IEnumerator<T>，只输出 T 不输入 T）。把 Dog 当 Animal 输出是安全的（Dog is-a Animal），不会把错误类型塞进去。\n协变安全逻辑：输出位置只能\"读取\"T，把 Dog 读作 Animal 是安全的（向上转型）。输入位置会\"写入\"T，如果允许协变就会写入错误类型（把 Cat 写入 Dog 列表）。\n所以只有只读接口（IEnumerable）能协变，读写接口（List、IList）不能。`,
    tags: ["协变", "out", "invariant", "类型安全"],
  },
  {
    id: "ec7-generics-4",
    chapter: "ec7-generics",
    level: 4,
    question: `实现一个泛型缓存类 \`Cache<TKey, TValue>\`，要求：TKey 必须是引用类型、TValue 必须有无参构造函数、支持按 key 存取值、值为 null 时自动用 new TValue() 创建。写出完整代码。`,
    answer:
      `\`\`\`csharp\npublic class Cache<TKey, TValue>\n    where TKey : class          // TKey 必须是引用类型\n    where TValue : new()        // TValue 必须有无参构造函数\n{\n    private readonly Dictionary<TKey, TValue> _store = new();\n\n    public TValue GetOrAdd(TKey key)\n    {\n        if (!_store.TryGetValue(key, out var value))\n        {\n            value = new TValue();  // 约束保证可以 new T()\n            _store[key] = value;\n        }\n        return value;\n    }\n\n    public void Set(TKey key, TValue value) => _store[key] = value;\n\n    public bool TryGetValue(TKey key, out TValue value) =>\n        _store.TryGetValue(key, out value);\n\n    public int Count => _store.Count;\n}\n\n// 使用\nvar cache = new Cache<string, StringBuilder>();\n// TKey=string（引用类型 ✓）, TValue=StringBuilder（有无参构造 ✓）\nvar sb = cache.GetOrAdd(\"log\");  // 不存在则 new StringBuilder()\nsb.Append(\"hello\");\nvar sb2 = cache.GetOrAdd(\"log\");  // 返回同一个实例\nConsole.WriteLine(sb2.ToString());  // hello\n\`\`\`\n关键点：(1) where TKey : class 约束让 TKey 可以做 Dictionary 的键（引用类型有正确的 Equals/GetHashCode）；(2) where TValue : new() 约束让 GetOrAdd 可以 new TValue() 创建默认值；(3) 不加约束编译器不允许 new T()。`,
    tags: ["泛型类", "约束", "Dictionary", "综合设计"],
  },
];
