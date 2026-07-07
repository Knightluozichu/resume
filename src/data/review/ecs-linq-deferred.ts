import type { ReviewQuestion } from "./types";

/** Effective C# LINQ 延迟执行复习题 */
export const ecsLinqDeferredQuestions: ReviewQuestion[] = [
  {
    id: "ecs-linq-deferred-1",
    chapter: "ecs-linq-deferred",
    level: 1,
    question: "LINQ 查询在构造时执行吗？什么时候才真正执行？",
    answer:
      "构造时不执行。var q = src.Where(x => x > 0).Select(x => x * 2); 这行只构造了一个查询对象（记录了「过滤大于 0、再乘 2」操作链的配方），没有遍历 src，Where 和 Select 都没跑。\n\n真正执行的时机是枚举——foreach (var x in q)、ToList()、Count()、First() 等触发 MoveNext 的操作。此时迭代器才逐步执行过滤和投影。\n\n这种设计叫延迟执行。查询变量只是配方，不是结果。Where/Select/OrderBy/SelectMany/Take/Skip 是延迟执行方法；ToList/ToArray/Count/First/Sum 是立即执行方法。",
    tags: ["延迟执行", "构造", "枚举", "配方"],
  },
  {
    id: "ecs-linq-deferred-2",
    chapter: "ecs-linq-deferred",
    level: 2,
    question:
      "延迟执行的双刃剑是什么？先 q.Count() 再 foreach (q) 会发生什么？",
    answer:
      "双刃剑：\n利——查询反映数据源最新状态。构造查询后向 src 追加元素，下次枚举自动包含，无需手动刷新。\n弊——重复枚举重复执行。每次枚举都重新跑一遍操作链。\n\n先 q.Count() 再 foreach (q)：Count() 枚举一次跑完整查询，foreach 又枚举一次再跑完整查询。如果 src 是远程查询（数据库），意味着两次网络往返；如果是昂贵计算，意味着两倍 CPU。\n\n修法：需要多次访问时先 var list = q.ToList(); 物化，立即执行一次存入 List。后续 list.Count 和 foreach 读 List，不再重复执行查询。",
    tags: ["双刃剑", "重复枚举", "Count", "物化"],
  },
  {
    id: "ecs-linq-deferred-3",
    chapter: "ecs-linq-deferred",
    level: 3,
    question:
      "lambda 捕获循环变量为什么会导致所有结果拿到最后一个值？如何修复？",
    answer:
      "lambda 捕获的是变量引用而非值的快照。C# 的 foreach 循环变量在每次迭代是同一变量（C# 5 前 for 循环也是），循环结束后所有闭包都指向这个变量，而它此时已是最后一个值。所以所有 lambda 执行时读到的都是最后的值。\n\n修复方法：\n1. 循环内创建局部变量拷贝：foreach (var i in items) { var local = i; queries.Add(() => local * 2); }。每次迭代的 local 是独立的局部变量，闭包捕获各自的 local。\n2. 用带索引的 Select 重载：items.Select((item, index) => item * 2)，避免手动捕获循环变量。\n\n注意：C# 5 起 foreach 的循环变量每次迭代是独立的（修复了 foreach 的闭包陷阱），但 for 循环变量仍是共享的，for 循环仍需局部变量拷贝。",
    tags: ["闭包", "循环变量", "lambda捕获", "修复"],
  },
  {
    id: "ecs-linq-deferred-4",
    chapter: "ecs-linq-deferred",
    level: 4,
    question:
      "设计一个场景：你需要对一个数据库查询结果既统计数量又遍历处理。直接用延迟查询和先物化各有什么后果？请给出最优方案。",
    answer:
      "场景：var q = db.Users.Where(u => u.Active).Select(u => u.Name); 需要先输出数量，再逐个处理。\n\n直接用延迟查询的后果：\n- var count = q.Count(); 触发一次 SQL 查询（SELECT COUNT(*)）。\n- foreach (var x in q) 又触发一次 SQL 查询（SELECT Name）。\n- 两次数据库往返，且两次查询之间数据可能变化导致 count 和实际遍历数不一致（脏读）。\n\n先物化的后果：\n- var list = q.ToList(); 触发一次 SQL 查询，结果存入内存 List。\n- list.Count 和 foreach 读 List，零查询。\n- 只一次数据库往返，且 count 和遍历基于同一快照，一致。\n- 代价：内存占用（存全部结果）。若结果集巨大，物化可能 OOM。\n\n最优方案：\n1. 结果集不大：先 ToList 物化，一次查询多次读取，一致且高效。\n2. 结果集巨大：分页处理，每页 ToList 后处理，避免全量物化。或用流式处理（foreach 单次枚举，在循环内计数），只一次查询但不物化全量。\n3. 只需计数：直接 q.Count()，不物化。\n\n核心原则：多次访问必物化（避免重复查询），单次访问保持延迟（省内存），巨大结果集用分页或流式。",
    tags: ["物化", "数据库查询", "方案设计", "流式处理", "综合"],
  },
];
