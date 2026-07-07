import type { ReviewQuestion } from "./types";

/** 深入理解 C# · 迭代器与 yield 复习题 */
export const dcsIteratorYieldQuestions: ReviewQuestion[] = [
  {
    id: "dcs-iterator-yield-1",
    chapter: "dcs-iterator-yield",
    level: 1,
    question: "`yield return` 和 `return` 在迭代器方法中有什么本质区别？",
    answer:
      "本质区别在于「执行模式」：\n\n- `return`：方法体一次性执行完毕，返回一个结果。方法的状态（局部变量）在返回后销毁。\n- `yield return`：方法体被编译器改写成状态机，每次调用 `MoveNext()` 才执行到下一个 `yield return` 处，然后暂停。方法的状态（局部变量、执行位置）被保存在状态机对象中，下次 `MoveNext()` 时恢复。\n\n具体表现：\n1. 延迟执行：`yield return` 的方法在被调用时不会立即执行方法体——它只创建一个迭代器对象。只有当调用方 `MoveNext()` 时才开始执行，每次 `MoveNext()` 执行到下一个 `yield return` 暂停。\n2. 暂停-恢复：`yield return 1` 产出 1 后暂停，局部变量保留。下次 `MoveNext()` 从 `yield return 1` 的下一行继续执行。\n3. 无限序列：`yield return` 可以产出无限序列（如 `while(true) yield return i++;`），因为每次只算一个元素。`return` 无法返回无限序列。\n\n底层实现：编译器把含 `yield return` 的方法编译成一个实现了 `IEnumerable<T>` 和 `IEnumerator<T>` 的嵌套类（状态机），方法的局部变量变成状态机字段，方法体被拆成 switch-case 对应不同的 yield 位置。",
    tags: ["yield return", "延迟执行", "状态机", "迭代器"],
  },
  {
    id: "dcs-iterator-yield-2",
    chapter: "dcs-iterator-yield",
    level: 2,
    question: "为什么说迭代器是「延迟执行」的？请用一个实际例子说明延迟执行带来的性能优势和陷阱。",
    answer:
      "延迟执行（lazy evaluation）：迭代器方法在被调用时不执行方法体，只返回一个「承诺将来产出数据」的迭代器对象。只有真正枚举（foreach/MoveNext）时才逐个产出元素。\n\n性能优势示例：\n```csharp\nIEnumerable<int> GetLargeData() {\n    for (int i = 0; i < 1_000_000; i++)\n        yield return i;\n}\n// 只取前 10 个\nvar first10 = GetLargeData().Take(10).ToList();\n```\n如果非延迟（立即执行），GetLargeData 会生成 100 万元素的数组再 Take(10)——99.999% 的计算浪费。延迟执行下，Take(10) 只触发 10 次 MoveNext，GetLargeData 的循环只跑到 i=9 就停了。\n\n延迟执行的陷阱：\n```csharp\nvar data = GetLargeData().Where(x => ExpensiveFilter(x));\n// 此时 ExpensiveFilter 还没执行\nforeach (var x in data) { ... }  // 第一次执行 ExpensiveFilter\nforeach (var x in data) { ... }  // 第二次执行 ExpensiveFilter！\n```\n每次 foreach 都从头枚举迭代器，Where 的谓词被重复执行。如果数据源是数据库查询，每次 foreach 都会重新查数据库。\n\n修法：用 `.ToList()` 或 `.ToArray()` 缓存结果——`var cached = data.ToList()` 后再多次遍历 cached 不会重复执行。\n\n核心原则：延迟执行省一次性的计算开销，但如果需要多次遍历，必须手动物化（ToList/ToArray）。",
    tags: ["延迟执行", "lazy evaluation", "性能", "陷阱"],
  },
  {
    id: "dcs-iterator-yield-3",
    chapter: "dcs-iterator-yield",
    level: 3,
    question: "编译器如何把一个包含 `yield return` 的方法转换成状态机？请描述生成的状态机类的关键结构。",
    answer:
      "编译器把含 yield 的方法转换成一个状态机类，关键结构：\n\n```csharp\n// 原始代码\nIEnumerable<int> CountTo(int n) {\n    for (int i = 1; i <= n; i++)\n        yield return i;\n}\n\n// 编译器生成的状态机（简化版）\nclass CountToStateMachine : IEnumerable<int>, IEnumerator<int> {\n    public int _state;       // 当前状态（-1 未开始，0 运行中，-2 结束）\n    public int _current;     // 当前 yield 的值\n    public int _n;           // 方法参数 n\n    public int _i;           // 局部变量 i\n\n    public bool MoveNext() {\n        switch (_state) {\n            case 0:  // 从 for 循环开始或继续\n                _i = (_state == 0) ? 1 : _i;\                while (_i <= _n) {\n                    _current = _i;\n                    _state = 0;\n                    _i++;\n                    return true;  // 产出一个值，暂停\n                }\n                _state = -2;\n                return false;     // 结束\n        }\n        return false;\n    }\n\n    public int Current => _current;\n    public IEnumerator<int> GetEnumerator() {\n        return new CountToStateMachine { _n = this._n, _state = 0 };\n    }\n}\n```\n\n关键结构分析：\n1. `_state` 字段：记录执行到哪个 yield 位置。对于多个 yield，每个 yield 对应一个 state 编号，switch-case 跳转到对应位置恢复执行。\n2. `_current` 字段：保存当前 `yield return` 的值，供 `Current` 属性返回。\n3. 局部变量提升为字段：方法的局部变量（`_i`）和参数（`_n`）变成状态机字段，这样暂停后恢复时局部变量值不丢失。\n4. `MoveNext()` 方法：核心方法。每次调用执行到下一个 `yield return`，设置 `_current` 并返回 true；执行完毕返回 false。\n5. `GetEnumerator()` 每次调用创建新的状态机实例，支持多次独立遍历。\n\n这个状态机模式与 C# 5.0 的 async/await 状态机几乎相同——async/await 复用了迭代器状态机的基础设施，只是 yield return 变成了 await，MoveNext 变成了 continuation 回调。",
    tags: ["状态机", "编译器转换", "MoveNext", "yield原理"],
  },
  {
    id: "dcs-iterator-yield-4",
    chapter: "dcs-iterator-yield",
    level: 4,
    question: "迭代器方法的资源清理有何特殊问题？`yield break` 与 `IDisposable` 在迭代器中如何配合？多次 yield 的 try-finally 语义是什么？",
    answer:
      "迭代器方法的资源清理有一个特殊问题：因为方法体被拆成状态机，`try-finally` 的 finally 块不在每次 yield return 时执行——它只在迭代器被正确释放（Dispose）或正常结束时才执行。\n\n具体问题：\n```csharp\nIEnumerable<string> ReadLines(string path) {\n    var reader = new StreamReader(path);  // 打开文件\n    try {\n        string? line;\n        while ((line = reader.ReadLine()) != null)\n            yield return line;  // 暂停在这里，reader 仍打开\n    } finally {\n        reader.Dispose();  // 何时执行？\n    }\n}\n```\n\n如果不 foreach 完就退出（如 break/return/异常），reader 不会被 Dispose——因为 finally 块在状态机的 Dispose 方法中，只有迭代器被 Dispose 才执行。\n\n正确用法：\n```csharp\n// foreach 自动 Dispose 迭代器\nforeach (var line in ReadLines(path)) {\n    if (line.StartsWith(\"#\")) break;  // break 触发迭代器 Dispose，finally 执行\n    Console.WriteLine(line);\n}\n\n// 手动枚举必须用 using\nusing var iter = ReadLines(path).GetEnumerator();\nwhile (iter.MoveNext()) {\n    if (iter.Current.StartsWith(\"#\")) break;  // using 确保 Dispose\n    Console.WriteLine(iter.Current);\n}\n```\n\nyield break 的作用：\n`yield break` 提前结束迭代器（相当于普通方法的 return）。它会触发 try-finally 的 finally 块执行——编译器把 yield break 编译成设置 state=-2 并执行 finally 块。\n\nforeach 的保障：\nC# 的 foreach 语句编译后会生成 `try-finally` 或 `using`，确保迭代器（IEnumerator 继承 IDisposable）在遍历结束或 break/异常时被 Dispose。这使得迭代器中的 try-finally 资源清理是可靠的——前提是调用方用 foreach 或 using。\n\n核心要点：迭代器的 finally 块依赖 Dispose 调用。foreach 编译器自动保证 Dispose，手动 MoveNext 必须自己用 using 包裹。这是迭代器与普通方法 try-finally 语义的最大区别。",
    tags: ["资源清理", "yield break", "IDisposable", "try-finally", "迭代器语义"],
  },
];
