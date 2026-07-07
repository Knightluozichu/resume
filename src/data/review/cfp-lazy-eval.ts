import type { ReviewQuestion } from "./types";

/** C# 函数式编程 · 延迟求值复习题 */
export const cfpLazyEvalQuestions: ReviewQuestion[] = [
  {
    id: "cfp-lazy-eval-1",
    chapter: "cfp-lazy-eval",
    level: 1,
    question: "什么是延迟求值？C# 中哪些 LINQ 方法是延迟的，哪些是立即执行的？",
    answer:
      "延迟求值是指构建查询时不执行计算，只有迭代结果时才按需计算。\n\n延迟方法（返回 IEnumerable<T>，不执行）：\n- Where、Select、OrderBy、ThenBy、Skip、Take、Distinct、GroupBy、SelectMany、Reverse\n- 这些方法只构建迭代器管道，不触发执行\n\n立即方法（触发迭代，返回具体值）：\n- ToList、ToArray、ToDictionary、ToLookup、ToHashSet（物化为集合）\n- Sum、Count、Average、Min、Max、Aggregate（归约为标量）\n- First、FirstOrDefault、Last、Single、Any、All、Contains（短路或取值）\n\n判断方法：如果返回 IEnumerable<T>，通常是延迟的；如果返回 List/Array/标量/bool，通常是立即的。",
    tags: ["延迟求值", "IEnumerable", "延迟方法", "立即方法"],
  },
  {
    id: "cfp-lazy-eval-2",
    chapter: "cfp-lazy-eval",
    level: 2,
    question: "以下代码输出什么？请解释延迟执行对源数据修改的影响。",
    answer:
      "```csharp\nvar nums = new List<int> { 1, 2, 3 };\nvar query = nums.Select(x => x * 2);\n// query 尚未执行\nnums.Add(4);\nnums.Add(5);\nvar result = query.ToList();\n```\n\n输出：`result = [2, 4, 6, 8, 10]`\n\n原因：\n1. `nums.Select(x => x * 2)` 构建延迟迭代器，不执行——此时 nums 是 [1,2,3]\n2. `nums.Add(4)` 和 `nums.Add(5)` 修改源列表——此时 nums 是 [1,2,3,4,5]\n3. `query.ToList()` 触发迭代——迭代的是**当前的** nums（[1,2,3,4,5]），不是构建时的 nums\n4. 每个元素乘以 2，得到 [2,4,6,8,10]\n\n关键：延迟执行捕获的是数据源的引用，不是快照。迭代时使用源数据的当前状态。如果源在构建后修改，结果反映修改。\n\n避免方法：构建后立即 `ToList()` 物化，或使用不可变集合。",
    tags: ["延迟执行", "源数据修改", "引用vs快照", "ToList"],
  },
  {
    id: "cfp-lazy-eval-3",
    chapter: "cfp-lazy-eval",
    level: 3,
    question: "请用 `yield return` 实现一个无限斐波那契序列，然后用 LINQ 取出前 20 个偶数项。解释为什么无限序列不会导致栈溢出或死循环。",
    answer:
      "```csharp\nIEnumerable<int> Fibonacci()\n{\n    int a = 0, b = 1;\n    while (true)  // 无限循环\n    {\n        yield return a;\n        (a, b) = (b, a + b);\n    }\n}\n\n// 取前 20 个偶数斐波那契数\nvar evenFibs = Fibonacci()\n    .Where(f => f % 2 == 0)\n    .Take(20)\n    .ToArray();\n// [0, 2, 8, 34, 144, 610, 2584, 10946, 46368, 196418, ...]\n```\n\n不会栈溢出或死循环的原因：\n1. **yield return 是状态机**：编译器把 Fibonacci() 编译为一个迭代器类，`while(true)` 不会无限执行——每次 `MoveNext()` 只执行到下一个 `yield return` 就暂停\n2. **Take(20) 是终止条件**：Where 过滤后，Take(20) 只取前 20 个。取够 20 个后，Take 调用迭代器的 Dispose，停止迭代\n3. **管道融合**：Fibonacci().Where(...).Take(20) 在一次迭代中，每个斐波那契数先经过 Where 判断，是偶数则被 Take 计数。Take 计满 20 个就停止整个管道\n4. **按需计算**：不是先生成所有斐波那契数（无限）再过滤，而是生成一个→过滤一个→计数一个。取够 20 个就停止生成\n\n关键：延迟执行 + Take 的组合让无限序列变得安全——只计算需要的部分。",
    tags: ["yield return", "无限序列", "Take", "管道融合", "状态机"],
  },
  {
    id: "cfp-lazy-eval-4",
    chapter: "cfp-lazy-eval",
    level: 4,
    question: "延迟执行有哪些陷阱？请从副作用、多次迭代、异常时序和性能四个维度分析，并给出最佳实践建议。",
    answer:
      "延迟执行的四大陷阱：\n\n1. **副作用陷阱**：\nLambda 中的副作用在迭代时才触发，时序难以预测。\n```csharp\nint counter = 0;\nvar q = nums.Select(x => { counter++; return x * 2; });\n// counter = 0（未迭代）\nvar r1 = q.ToList();  // counter = 5\nvar r2 = q.ToList();  // counter = 10（重新迭代）\n```\n建议：Lambda 中避免副作用，把副作用放到终端操作后。\n\n2. **多次迭代重复计算**：\n每次 foreach/ToList/Sum 都重新迭代源数据。如果源是数据库查询或复杂计算，性能灾难。\n```csharp\nvar q = db.Users.Where(u => u.Active);  // 延迟\nvar count = q.Count();   // 第一次查数据库\nvar list = q.ToList();   // 第二次查数据库\n```\n建议：需要多次使用结果时，先 `ToList()` 物化缓存。\n\n3. **异常时序**：\n延迟执行中，Lambda 抛异常的时机不在查询构建时，而在迭代时。堆栈跟踪不在查询构建处。\n```csharp\nvar q = nums.Select(x => x / (x - 3));  // 构建时不报错\nvar r = q.ToList();  // 迭代到 x=3 时抛 DivideByZeroException\n```\n建议：异常处理放在迭代处，不要假设查询构建时就能捕获错误。\n\n4. **性能不一定提升**：\n延迟执行消除中间集合，但有迭代器开销：\n- 每个元素经过迭代器链，有方法调用开销\n- 无法利用 SIMD 向量化（List<T> 连续内存更友好）\n- 多次迭代的延迟 query 比缓存 List 慢\n建议：在 profiling 指导下选择。热路径上可能需要 ToList() + 手动循环。\n\n最佳实践总结：\n1. 把 LINQ query 当作「配方」而非「结果」——构建时不执行\n2. 需要缓存时及时 ToList()/ToArray()\n3. Lambda 中避免副作用——副作用放终端操作后\n4. 异常处理放迭代处\n5. 多次使用结果时物化一次\n6. 热路径上 profiling 后决定延迟还是物化",
    tags: ["副作用", "多次迭代", "异常时序", "性能", "最佳实践"],
  },
];
