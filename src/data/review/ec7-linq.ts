import type { ReviewQuestion } from "./types";

export const ec7LinqQuestions: ReviewQuestion[] = [
  {
    id: "ec7-linq-1",
    chapter: "ec7-linq",
    level: 1,
    question: `LINQ 的查询语法和方法语法有什么关系？写出等价的两种语法实现：从 numbers 中筛选大于 2 的元素，排序后乘以 10。`,
    answer:
      `两种语法编译后完全等价。查询语法用 from-where-orderby-select 关键字（类似 SQL），方法语法用扩展方法和 Lambda 链式调用。方法语法功能是查询语法的超集。\n\`\`\`csharp\nint[] numbers = { 3, 1, 4, 1, 5, 9, 2, 6 };\n\n// 查询语法\nvar result1 = from x in numbers\n              where x > 2\n              orderby x\n              select x * 10;\n\n// 方法语法（等价）\nvar result2 = numbers\n    .Where(x => x > 2)\n    .OrderBy(x => x)\n    .Select(x => x * 10);\n// 两者结果相同：{ 30, 40, 50, 60, 90 }\n\`\`\`\n实际开发中方法语法更常用——功能完整（Sum/Take/First 等只有方法语法）且链式更灵活。`,
    tags: ["查询语法", "方法语法", "等价"],
  },
  {
    id: "ec7-linq-2",
    chapter: "ec7-linq",
    level: 2,
    question: `什么是延迟执行？以下代码输出什么？解释原因：\n\`\`\`csharp\nvar list = new List<int> { 1, 2, 3 };\nvar query = list.Where(x => x > 1);\nlist.Add(4);\nConsole.WriteLine(query.Count());\n\`\`\``,
    answer:
      `输出 3。延迟执行：Where 返回迭代器，不在声明时执行，而是枚举时才求值。\n执行过程：\n1. \`list = {1,2,3}\`\n2. \`query = list.Where(x => x > 1)\` —— 只构建查询管道，不执行\n3. \`list.Add(4)\` —— list 变成 {1,2,3,4}\n4. \`query.Count()\` —— 立即执行算子，触发枚举。此时 list 是 {1,2,3,4}，筛选 >1 得到 {2,3,4}，Count = 3\n\n如果 Count() 在 Add 之前调用，结果是 2（只有 2,3 满足 >1）。延迟执行的陷阱：数据源变化导致结果变化。要固定结果，用 ToList() 缓存：\n\`\`\`csharp\nvar cached = list.Where(x => x > 1).ToList();  // 立即执行，缓存\nlist.Add(4);\nConsole.WriteLine(cached.Count);  // 仍是 2\n\`\`\``,
    tags: ["延迟执行", "迭代器", "陷阱"],
  },
  {
    id: "ec7-linq-3",
    chapter: "ec7-linq",
    level: 3,
    question: `用 LINQ 实现以下需求：有一组学生 \`List<Student>\`，Student 有 Name、Score、Major 属性。求每个专业的平均分，并按平均分降序排列，输出专业名和平均分。`,
    answer:
      `\`\`\`csharp\nvar students = new List<Student>\n{\n    new(\"Alice\", 85, \"CS\"),\n    new(\"Bob\", 72, \"Math\"),\n    new(\"Carol\", 90, \"CS\"),\n    new(\"Dave\", 65, \"Math\"),\n    new(\"Eve\", 78, \"CS\"),\n};\n\nvar result = students\n    .GroupBy(s => s.Major)                    // 按专业分组\n    .Select(g => new                           // 投影为匿名类型\n    {\n        Major = g.Key,\n        AvgScore = g.Average(s => s.Score)     // 计算平均分\n    })\n    .OrderByDescending(x => x.AvgScore);       // 按平均分降序\n\nforeach (var r in result)\n    Console.WriteLine($\"{r.Major}: {r.AvgScore:F1}\");\n// 输出：\n// CS: 84.3\n// Math: 68.5\n\`\`\`\n关键算子：GroupBy 按键分组返回 IGrouping<string, Student>；g.Key 是分组键（Major）；g 是 IEnumerable<Student> 可用 Average/Sum/Count 等聚合；Select 投影为匿名类型；OrderByDescending 降序排列。\nrecord Student(string Name, int Score, string Major);`,
    tags: ["GroupBy", "聚合", "匿名类型", "综合"],
  },
  {
    id: "ec7-linq-4",
    chapter: "ec7-linq",
    level: 4,
    question: `分析以下代码的问题并修复。场景：从数据库查询活跃用户，在多个地方使用查询结果：\n\`\`\`csharp\nvar query = db.Users.Where(u => u.IsActive);\nConsole.WriteLine($\"Count: {query.Count()}\");\nforeach (var u in query) Console.WriteLine(u.Name);\nvar first = query.FirstOrDefault();\n\`\`\``,
    answer:
      `问题：延迟执行导致 db.Users.Where(...) 查询被执行了 3 次（Count、foreach、FirstOrDefault 各一次）。如果是 EF Core，每次都发一条 SQL 到数据库，性能极差。\n修复方案：用 ToList() 缓存查询结果，只查一次数据库：\n\`\`\`csharp\nvar users = db.Users.Where(u => u.IsActive).ToList();  // 立即执行，查一次\nConsole.WriteLine($\"Count: {users.Count}\");  // 内存操作\nforeach (var u in users) Console.WriteLine(u.Name);\nvar first = users.FirstOrDefault();\n\`\`\`\n但有时延迟执行是需要的：\n\`\`\`csharp\n// 需要分别查 count 和 first 但不想全加载\nvar count = db.Users.Count(u => u.IsActive);     // 只查 count\nvar first = db.Users.FirstOrDefault(u => u.IsActive); // 只查一条\n// 这种情况下不 ToList，让 EF Core 生成优化 SQL\n\`\`\`\n判断原则：(1) 同一查询多次使用 → ToList 缓存；(2) 只需聚合统计 → 直接用 Count/Sum（EF Core 生成 SELECT COUNT SQL）；(3) 数据源是内存集合（List）→ 延迟执行开销小，不 ToList 也行；(4) 数据源是数据库 → 务必注意延迟执行的 SQL 重复问题。`,
    tags: ["延迟执行", "EF Core", "性能", "ToList"],
  },
];
