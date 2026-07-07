import type { ReviewQuestion } from "./types";

/** CLR via C# · 值类型与引用类型复习题 */
export const cvcValueReferenceQuestions: ReviewQuestion[] = [
  {
    id: "cvc-value-reference-1",
    chapter: "cvc-value-reference",
    level: 1,
    question: "值类型和引用类型在内存分配上有什么区别？各自包含哪些类型？",
    answer:
      "内存分配区别：\n\n- **值类型**：通常分配在线程栈上，变量直接包含数据。方法返回时栈帧弹出，自动释放。不经过 GC。例外：作为引用类型字段时分配在堆上，被装箱时在堆上创建副本。\n- **引用类型**：分配在 GC 堆上，变量存储的是指向堆对象的引用（指针）。由 GC 管理生命周期——所有引用消失后 GC 回收。\n\n各类型包含：\n- **值类型**：`int`、`double`、`bool`、`char`、`enum`、`struct`（含 `DateTime`、`Point`、`Guid` 等）\n- **引用类型**：`class`、`string`、`array`、`delegate`、`interface`、`object`\n\n注意：`string` 是引用类型（class String），虽然它表现得像值类型（不可变），但内存分配在堆上，由 GC 管理。",
    tags: ["值类型", "引用类型", "栈", "堆", "GC"],
  },
  {
    id: "cvc-value-reference-2",
    chapter: "cvc-value-reference",
    level: 2,
    question: "什么是装箱（Boxing）？它有什么性能代价？如何避免？",
    answer:
      "装箱是将值类型转换为引用类型（object 或接口）的操作。CLR 在 GC 堆上分配一个对象，复制值类型数据到堆对象中，返回堆对象的引用。\n\n性能代价：\n1. **堆分配**：每次装箱都在 GC 堆上分配内存，增加 GC 压力。\n2. **数据复制**：值类型数据从栈复制到堆。\n3. **缓存不友好**：堆上装箱对象分散在各处，不如连续数组缓存友好。\n4. **拆箱开销**：从 object 取回值类型需要类型检查 + 内存复制。\n\n在循环中装箱尤其致命——`ArrayList.Add(i)` 在循环中执行 100 万次，产生 100 万个临时堆对象，GC 需要全部回收。\n\n避免方法：\n1. **使用泛型**：`List<int>` 代替 `ArrayList`，`Dictionary<int, string>` 代替 `Hashtable`。泛型在编译时为值类型生成专用代码，零装箱。\n2. **使用泛型方法**：`void Process<T>(T value)` 代替 `void Process(object value)`。\n3. **重载**：为常用值类型提供重载，如 `StringBuilder.Append(int)` 避免装箱。\n4. **注意隐式装箱**：`Console.WriteLine($\"{obj}\")` 中值类型会装箱；`enum` 转 `object` 会装箱。",
    tags: ["装箱", "拆箱", "泛型", "性能", "GC"],
  },
  {
    id: "cvc-value-reference-3",
    chapter: "cvc-value-reference",
    level: 3,
    question: "什么时候应该用 struct（值类型），什么时候应该用 class（引用类型）？请给出判断标准。",
    answer:
      "用 struct 的条件（必须全部满足）：\n\n1. **类型小**（< 16 字节）：大 struct 的频繁复制比引用赋值更慢。复制 100 字节的 struct 比复制 8 字节的指针慢得多。\n2. **不可变**（readonly struct）：可变 struct 是 bug 之源——`Point p = GetPoint(); p.X = 5;` 如果 `GetPoint()` 返回的是属性（get 返回值类型），修改的是副本，原对象不变。\n3. **值语义合理**：赋值应该复制而非共享。`Point`、`DateTime`、`Money` 的赋值应该是独立的——改一个不影响另一个。\n4. **不会被频繁装箱**：如果类型经常被当作 object 或接口使用（如放入非泛型集合），装箱会抵消 struct 的所有优势。\n\n满足以上条件用 struct（如 `Point`、`DateTime`、`Guid`）。否则用 class。\n\n常见错误：\n- 用 struct 做大对象（> 16 字节）→ 频繁复制拖垮性能\n- 用可变 struct → 修改副本不修改原对象的 bug\n- 用 struct 实现接口然后频繁当接口用 → 每次使用都装箱\n\n黄金法则：**默认用 class**。只在明确满足以上四个条件时才考虑 struct。错误的 struct 选择比 class 更危险。",
    tags: ["struct", "class", "值类型选择", "性能"],
  },
  {
    id: "cvc-value-reference-4",
    chapter: "cvc-value-reference",
    level: 4,
    question: "分析以下代码中的装箱情况，并说明如何优化：`Hashtable table = new Hashtable(); for (int i = 0; i < 10000; i++) table.Add(i, i.ToString());`",
    answer:
      "装箱分析：\n\n```csharp\nHashtable table = new Hashtable();\nfor (int i = 0; i < 10000; i++)\n    table.Add(i, i.ToString());\n```\n\n这段代码在每次循环中发生以下装箱：\n\n1. **key 装箱**：`Hashtable.Add` 接受 `object key, object value`。`i` 是 `int`（值类型），传入时装箱 → 每次循环 1 次装箱。\n2. **i.ToString() 不装箱**：`ToString()` 是 `int` 的方法（ValueType 继承自 Object），调用时不装箱。但 `i.ToString()` 返回 `string`（引用类型），`string` 赋给 `object value` 参数不需要装箱。\n3. **Hashtable 内部查找时的装箱**：`Hashtable` 内部用 `GetHashCode()` 和 `Equals()` 比较 key。`int` 的 `GetHashCode()` 在非泛型 Hashtable 中通过 object 调用——需要先装箱再调用。每次 Add 内部可能多次装箱（哈希冲突时）。\n\n保守估计：每次循环至少 1 次 key 装箱，10000 次循环 = 10000 次装箱（实际可能更多）。\n\n优化方案：\n\n```csharp\n// 方案 1：使用泛型 Dictionary\nDictionary<int, string> dict = new Dictionary<int, string>();\nfor (int i = 0; i < 10000; i++)\n    dict.Add(i, i.ToString());\n// 零装箱！Dictionary<int, string> 内部用 int[] 存储 key，string[] 存储 value\n\n// 方案 2：如果 value 也是 int\nDictionary<int, int> dict2 = new Dictionary<int, int>();\nfor (int i = 0; i < 10000; i++)\n    dict2.Add(i, i);\n// 零装箱\n```\n\n泛型 Dictionary 的优势：\n1. key 和 value 都是强类型，零装箱\n2. `GetHashCode()` 和 `Equals()` 直接调用 int 的实现，不需要通过 object\n3. 内部数组是 `int[]` 和 `string[]`，缓存友好\n4. 编译时类型检查，运行时无类型转换开销\n\n性能差异：10000 次循环，Hashtable 可能产生 20000+ 次堆分配（key 装箱 + 内部比较装箱），Dictionary<int, string> 零堆分配。",
    tags: ["装箱", "Hashtable", "Dictionary", "泛型", "性能优化"],
  },
];
