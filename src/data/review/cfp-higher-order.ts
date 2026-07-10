import type { ReviewQuestion } from "./types";

/** C# 函数式编程 · 高阶函数复习题 */
export const cfpHigherOrderQuestions: ReviewQuestion[] = [
  {
    id: "cfp-higher-order-1",
    chapter: "cfp-higher-order",
    level: 1,
    question: `什么是高阶函数？C# 中 \`Select\` 和 \`Where\` 分别是高阶函数吗？为什么？`,
    answer:
      `高阶函数是接受一个或多个函数作为参数，或返回一个函数作为结果的函数。\n\n\`Select\` 是高阶函数——它接受 \`Func<T, U>\` 映射函数作为参数，对每个元素应用该函数。\n\`Where\` 是高阶函数——它接受 \`Func<T, bool>\` 谓词函数作为参数，用谓词筛选元素。\n\n两者都把函数当作数据来操作（接受函数参数），符合高阶函数的定义。C# 中 LINQ 的方法几乎都是高阶函数：Select、Where、OrderBy、Aggregate、GroupBy 等。`,
    tags: ["高阶函数", "Select", "Where", "定义"],
  },
  {
    id: "cfp-higher-order-2",
    chapter: "cfp-higher-order",
    level: 2,
    question: `Map（Select）、Filter（Where）、Reduce（Aggregate）三者的类型签名分别是什么？它们各自如何改变集合？`,
    answer:
      `类型签名：\n1. Map/Select: \`IEnumerable<U> Select<T, U>(IEnumerable<T>, Func<T, U>)\` —— 接受映射函数，对每个元素转换。改变元素的**类型和值**，不改变**数量**。\n2. Filter/Where: \`IEnumerable<T> Where<T>(IEnumerable<T>, Func<T, bool>)\` —— 接受谓词函数，筛选满足条件的元素。改变**数量**，不改变元素**本身**（类型和值不变）。\n3. Reduce/Aggregate: \`TAcc Aggregate<T, TAcc>(IEnumerable<T>, TAcc, Func<TAcc, T, TAcc>)\` —— 接受聚合函数，把集合归约为单个值。从集合变为**标量**。\n\n关键区别：Map 不改变数量但可改变类型；Filter 改变数量但不改变类型；Reduce 把集合变成单个值。`,
    tags: ["Map", "Filter", "Reduce", "类型签名"],
  },
  {
    id: "cfp-higher-order-3",
    chapter: "cfp-higher-order",
    level: 3,
    question: `请用 LINQ 管道实现：给定一组订单（含金额），过滤金额大于 100 的，映射为「金额 * 税率(1.1)」，然后求总税后金额。`,
    answer:
      `\`\`\`csharp\nrecord Order(decimal Amount);\n\nvar orders = new[]\n{\n    new Order(50m),\n    new Order(150m),\n    new Order(200m),\n    new Order(80m)\n};\n\ndecimal total = orders\n    .Where(o => o.Amount > 100m)              // 过滤：{ 150, 200 }\n    .Select(o => o.Amount * 1.1m)              // 映射：{ 165, 220 }\n    .Aggregate(0m, (acc, taxed) => acc + taxed); // 聚合：385\n\`\`\`\n\n管道三步：Where（过滤大额订单）→ Select（计算税后金额）→ Aggregate（求和）。每步是高阶函数，接受函数参数。数据流过管道，每步声明一个转换。\n\n关键：Select 改变了类型（Order → decimal），Where 不改变类型（Order → Order），Aggregate 把集合变成标量（decimal 序列 → decimal）。`,
    tags: ["管道", "Where", "Select", "Aggregate", "实战"],
  },
  {
    id: "cfp-higher-order-4",
    chapter: "cfp-higher-order",
    level: 4,
    question: `高阶函数的「延迟执行」特性是什么意思？以下代码输出什么？请解释原因并分析延迟执行的利弊。`,
    answer:
      `延迟执行（Lazy Evaluation）是指 LINQ 方法（Where、Select 等）不会立即执行，而是返回一个 \`IEnumerable<T>\` 迭代器。只有当结果被迭代（如 foreach、ToList、Aggregate）时才真正计算。\n\n\`\`\`csharp\nvar nums = new List<int> { 1, 2, 3 };\nvar query = nums.Select(x => { Console.Write($\"{x} \"); return x * 2; });\n// 此时没有输出——Select 尚未执行\nnums.Add(4);  // 在查询创建后修改原集合\nvar result = query.ToList();  // 输出: 1 2 3 4\n\`\`\`\n\n输出 \`1 2 3 4\`——不是 \`1 2 3\`。因为 \`ToList()\` 触发迭代时，\`nums\` 已经包含了 4。延迟执行意味着查询捕获的是数据源的引用，不是快照。\n\n利：\n1. 可以构建无限序列——\`Enumerable.Range(1, int.MaxValue).Where(...).Take(10)\` 只计算前 10 个\n2. 管道优化——多个操作合并为一次迭代，不产生中间集合\n3. 按需计算——不迭代就不计算，节省资源\n\n弊：\n1. 副作用陷阱——Lambda 中的副作用在迭代时才触发，时序难以预测\n2. 多次迭代重复计算——每次 foreach 都重新计算。需要 \`ToList()\` 缓存\n3. 数据源修改——查询创建后修改原集合会影响结果（如上例）\n4. 调试困难——异常在迭代时才抛出，堆栈不在查询构建处\n\n原则：把 LINQ 查询当作「配方」而非「结果」——配方描述如何计算，ToList/foreach 才是真正执行。`,
    tags: ["延迟执行", "IEnumerable", "副作用", "利弊分析"],
  },
];
