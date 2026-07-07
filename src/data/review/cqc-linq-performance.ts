import type { ReviewQuestion } from "./types";

/** 编写高质量代码 · LINQ 性能复习题 */
export const cqcLinqPerformanceQuestions: ReviewQuestion[] = [
  {
    id: "cqc-linq-performance-1",
    chapter: "cqc-linq-performance",
    level: 1,
    question: "LINQ 的延迟执行和立即执行有什么区别？各举两个例子。",
    answer:
      "延迟执行：只构建查询树不遍历数据，枚举时才执行。返回 IEnumerable<T>。\n- Where、Select、OrderBy、Skip、Take、GroupBy\n- 特征：多次枚举会多次执行查询。\n\n立即执行：立即遍历数据并返回结果。\n- ToList、ToArray、Count、Sum、First、Any、ToDictionary\n- 特征：触发一次遍历，结果存储在内存中。\n\n示例：\n```\nvar q = data.Where(x => x > 0);  // 延迟，不遍历\nq.Count();  // 立即，遍历1次\nq.ToList(); // 立即，又遍历1次\n```",
    tags: ["延迟执行", "立即执行", "IEnumerable", "ToList"],
  },
  {
    id: "cqc-linq-performance-2",
    chapter: "cqc-linq-performance",
    level: 2,
    question: "以下代码遍历了几次数据？如何优化？\n```\nvar query = data.Where(x => x.IsValid);\nvar count = query.Count();\nvar sum = query.Sum();\nvar list = query.ToList();\n```",
    answer:
      "遍历了 3 次：`Count()` 1 次，`Sum()` 1 次，`ToList()` 1 次。每次都重新执行 Where 过滤。\n\n优化方案：先物化再复用。\n```\nvar list = data.Where(x => x.IsValid).ToList();  // 遍历1次\nvar count = list.Count;  // O(1)\nvar sum = list.Sum();     // 遍历 List，但不重新执行 Where\n```\n\n如果 data 获取成本高（如数据库查询或网络请求），优化收益更大——3 次数据库查询变 1 次。\n\n原则：需要多次使用延迟查询结果时，先 ToList/ToArray 物化。",
    tags: ["多次遍历", "物化", "ToList", "优化"],
  },
  {
    id: "cqc-linq-performance-3",
    chapter: "cqc-linq-performance",
    level: 3,
    question: "什么场景应该用 LINQ，什么场景应该手写循环？判断标准是什么？",
    answer:
      "用 LINQ 的场景：\n- 非热路径（不在循环或高频调用中）\n- 需要可读性和表达力\n- 数据量不大\n- 复杂查询逻辑（多步 Where/Select/GroupBy 链）\n\n手写循环的场景：\n- 热路径（每帧渲染、每请求处理、大规模数据处理循环）\n- 需要零分配（LINQ 的 Where/Select 分配迭代器对象和委托闭包）\n- 极致性能要求\n\n判断标准：用 BenchmarkDotNet 测量。LINQ 和循环的差异在热路径上是否显著。不确定时先用 LINQ 保可读性，性能不达标再换循环。\n\n热路径示例（用手写循环）：\n```\n// 游戏每帧调用\npublic int SumPositive(int[] arr) {\n    int sum = 0;\n    foreach (var n in arr) if (n > 0) sum += n;\n    return sum;\n}\n```",
    tags: ["LINQ vs 循环", "热路径", "BenchmarkDotNet", "性能取舍"],
  },
  {
    id: "cqc-linq-performance-4",
    chapter: "cqc-linq-performance",
    level: 4,
    question: "综合分析：LINQ 的链式调用在枚举时是如何以「流水线」方式执行的？`Take` 的短路优化是如何工作的？这对性能有什么影响？",
    answer:
      "流水线执行：\n\nLINQ 链式调用 `source.Where(...).Select(...).Take(3)` 在枚举时不是先过滤全部再映射全部再取 3 个，而是逐元素流过管道：\n\n1. 从 source 取第 1 个元素\n2. 经过 Where：满足条件则继续，不满足则取下一个元素\n3. 经过 Select：映射为新值\n4. 经过 Take：计数 1，输出\n5. 重复直到 Take 取够 3 个，停止遍历\n\n短路优化：\n\n`Take(3)` 取够 3 个元素后立即停止上游遍历。如果 source 有 100 万个元素，Where 过滤后前 3 个满足条件，则只遍历到第 3 个满足条件的元素就停止——不需要遍历全部 100 万个。\n\n性能影响：\n1. 流水线方式减少中间集合分配——不会先构建「过滤后的完整列表」再映射。\n2. Take 的短路优化让大数据量取前 N 个非常高效。\n3. 但 OrderBy 是例外——排序需要遍历全部数据才能确定顺序，Orderby().Take(3) 会先完整排序。.NET 7+ 对此做了部分优化但不要依赖。\n4. 多次枚举会多次执行流水线——这是延迟执行的代价，需要时先 ToList 物化。",
    tags: ["综合", "流水线", "Take短路", "OrderBy", "性能影响"],
  },
];
