import type { ReviewQuestion } from "./types";

/** C# 函数式编程 · 函数优先复习题 */
export const cfpFunctionsFirstQuestions: ReviewQuestion[] = [
  {
    id: "cfp-functions-first-1",
    chapter: "cfp-functions-first",
    level: 1,
    question: `什么是「函数是一等公民」？C# 中 \`Func<int, int>\` 和 \`int\` 有什么共同点？`,
    answer:
      `函数是一等公民意味着函数与普通数据类型享有同等权利：可以赋值给变量、作为参数传递、作为返回值返回、存储在数据结构中。\n\n\`Func<int, int>\` 和 \`int\` 的共同点：\n1. 都是类型——\`int\` 是整数类型，\`Func<int, int>\` 是「接受 int 返回 int 的函数」类型\n2. 都可以声明变量——\`int x = 5;\` 和 \`Func<int, int> f = y => y * 2;\` 语法结构完全一致\n3. 都可以作为参数——\`void Foo(int x)\` 和 \`void Bar(Func<int, int> f)\` 都是合法签名\n4. 都可以作为返回值——\`int GetX()\` 和 \`Func<int, int> GetF()\` 都是合法签名\n\n核心区别：\`int\` 的值是数字，\`Func<int, int>\` 的值是「行为」（一段可执行的逻辑）。但它们在类型系统中的地位完全平等。`,
    tags: ["一等公民", "Func", "类型系统"],
  },
  {
    id: "cfp-functions-first-2",
    chapter: "cfp-functions-first",
    level: 2,
    question: `以下命令式代码如何用函数式管道重写？请解释每一步的函数角色。`,
    answer:
      `命令式代码：\n\`\`\`csharp\nvar result = new List<int>();\nforeach (var x in nums)\n    if (x > 5)\n        result.Add(x * 2);\n\`\`\`\n\n函数式管道重写：\n\`\`\`csharp\nvar result = nums\n    .Where(x => x > 5)\n    .Select(x => x * 2)\n    .ToList();\n\`\`\`\n\n每一步的函数角色：\n1. \`Where(x => x > 5)\`——\`Where\` 是高阶函数，接受谓词函数 \`x => x > 5\` 作为参数，过滤元素\n2. \`Select(x => x * 2)\`——\`Select\` 是高阶函数，接受映射函数 \`x => x * 2\` 作为参数，转换元素\n3. \`x => x > 5\` 和 \`x => x * 2\`——Lambda 是函数值，被当作参数传递\n\n核心区别：命令式描述「怎么做」（循环、条件、累加），函数式描述「做什么」（过滤、映射）。函数作为参数使得过滤和映射的逻辑可以被复用和组合。`,
    tags: ["命令式", "函数式", "Where", "Select", "管道"],
  },
  {
    id: "cfp-functions-first-3",
    chapter: "cfp-functions-first",
    level: 3,
    question: `请编写一个函数 \`Compose\`，它接受两个函数 \`f\` 和 \`g\`，返回它们的组合函数 \`h\`，使得 \`h(x) = f(g(x))\`。并给出使用示例。`,
    answer:
      `\`\`\`csharp\n// 组合函数：先执行 g，再执行 f\nFunc<T, V> Compose<T, U, V>(Func<U, V> f, Func<T, U> g)\n    => x => f(g(x));\n\n// 使用示例\nFunc<int, int> doubleIt = x => x * 2;\nFunc<int, int> addOne = x => x + 1;\n\n// 组合：先加1，再翻倍 → (x + 1) * 2\nFunc<int, int> addThenDouble = Compose(doubleIt, addOne);\n\nConsole.WriteLine(addThenDouble(3));  // 输出 8：先 addOne(3)=4，再 doubleIt(4)=8\n\`\`\`\n\n关键点：\n1. \`Compose\` 是高阶函数——它接受函数作为参数，返回函数作为结果\n2. 返回的 \`x => f(g(x))\` 是一个闭包，捕获了 \`f\` 和 \`g\`\n3. 类型链必须匹配：\`g: T -> U\`，\`f: U -> V\`，组合结果 \`h: T -> V\`\n4. 这是函数式编程的核心能力——通过组合小函数构建复杂逻辑，而不是写一个大函数`,
    tags: ["组合", "Compose", "高阶函数", "闭包"],
  },
  {
    id: "cfp-functions-first-4",
    chapter: "cfp-functions-first",
    level: 4,
    question: `函数式编程强调「纯函数」和「无副作用」。C# 的 LINQ 方法（如 Where、Select）是纯函数吗？请分析 LINQ 的设计如何体现函数式原则，以及它的局限。`,
    answer:
      `LINQ 方法本身遵循函数式原则，但不是严格意义上的纯函数——取决于数据源和实现。\n\n体现函数式原则：\n1. 声明式——\`Where\`/\`Select\` 描述做什么，不描述怎么做\n2. 高阶函数——接受函数参数（谓词、映射器），是函数式管道的基石\n3. 延迟执行——\`Where\`/\`Select\` 返回 \`IEnumerable<T>\`，不立即执行，直到 \`ToList()\` 或迭代才求值。这使得管道可以无限流式处理\n4. 不修改原集合——返回新序列，原集合不变（不可变性原则）\n\n不是纯函数的原因：\n1. 传入的 Lambda 可能有副作用——\`Select(x => { Console.WriteLine(x); return x; })\` 有 IO 副作用\n2. 数据源可能是可变的——如果 \`nums\` 在迭代中被其他线程修改，结果不确定\n3. \`IEnumerable<T>\` 的迭代器可能持有状态（如数据库连接的 \`IQueryable\`）\n\n局限：\n1. C# 不强制纯函数——编译器不检查副作用，纯函数是约定而非强制\n2. 性能开销——延迟执行产生中间迭代器对象，热路径上 foreach 可能更快\n3. 异常处理——Lambda 中抛异常会中断管道，不如函数式的 Result 类型优雅\n4. LINQ to Objects 是同步的——异步流需要 \`IAsyncEnumerable<T>\` 和 \`await foreach\`\n\n结论：LINQ 是 C# 中最接近函数式风格的 API，但它依赖开发者的自律来保持纯函数性。真正的函数式错误处理需要 Result/Option 类型（见后续章节）。`,
    tags: ["纯函数", "LINQ", "副作用", "延迟执行", "局限"],
  },
];
