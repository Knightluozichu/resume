import type { ReviewQuestion } from "./types";

export const ec7OperatorsControlQuestions: ReviewQuestion[] = [
  {
    id: "ec7-operators-control-1",
    chapter: "ec7-operators-control",
    level: 1,
    question: "`&&` 和 `&` 有什么区别？为什么逻辑判断应该用 `&&`？",
    answer:
      "&& 是短路逻辑与：左侧为 false 时右侧不求值。& 是非短路逻辑与：两侧都求值。\n逻辑判断用 && 的原因：(1) 防空指针——`if (obj != null && obj.Count > 0)` 中 obj 为 null 时 obj.Count 不执行；(2) 避免不必要的计算——`if (cheap && expensive())` 中 cheap 为 false 时 expensive() 不调用。\n& 仅用于位运算（如 `0xFF & 0x0F`），不用做逻辑与。",
    tags: ["短路求值", "运算符", "安全"],
  },
  {
    id: "ec7-operators-control-2",
    chapter: "ec7-operators-control",
    level: 2,
    question: "用 C# 7.0 模式匹配 switch 表达式实现：输入一个 object，如果是正整数返回 \"positive\"，负整数返回 \"negative\"，零返回 \"zero\"，字符串返回 \"string: <值>\"，其他返回 \"unknown\"。",
    answer:
      "```csharp\nstring Describe(object o) => o switch\n{\n    int n when n > 0 => \"positive\",\n    int n when n < 0 => \"negative\",\n    int n => \"zero\",\n    string s => $\"string: {s}\",\n    _ => \"unknown\"\n};\n```\n要点：(1) switch 表达式用 => 返回值；(2) 类型模式 `int n` 匹配类型并绑定变量；(3) `when` 守卫做额外条件判断；(4) `_` 弃元匹配任何值（default）；(5) 编译器检查穷尽性，漏分支编译报错。",
    tags: ["模式匹配", "switch表达式", "when守卫"],
  },
  {
    id: "ec7-operators-control-3",
    chapter: "ec7-operators-control",
    level: 3,
    question: "空合并运算符 `??` 和空条件运算符 `?.` 各自的作用是什么？写出 `var len = text?.Length ?? 0;` 的等价代码，并解释 `??=` 的含义。",
    answer:
      "?? ：左侧不为 null 返回左侧，否则返回右侧（提供默认值）。\n?. ：左侧不为 null 时访问成员，否则返回 null（避免显式 null 检查）。\n`text?.Length ?? 0` 等价代码：\n```csharp\nint len;\nif (text != null)\n    len = text.Length;\nelse\n    len = 0;\n// 或三元表达式\nint len = text != null ? text.Length : 0;\n```\n??= 空合并赋值（C# 7.0）：`name ??= \"default\"` 等价于 `if (name == null) name = \"default\"`。只在 name 为 null 时才赋值，否则保持原值。\n组合使用场景：`config?.Timeout ??= 30;`——config 不为 null 且 Timeout 为 null 时设为 30。",
    tags: ["空合并", "空条件", "??=", "null处理"],
  },
  {
    id: "ec7-operators-control-4",
    chapter: "ec7-operators-control",
    level: 4,
    question: "在 foreach 循环中删除集合元素会怎样？请分析原因并给出三种正确的解决方案。",
    answer:
      "会抛 InvalidOperationException。原因：foreach 使用迭代器（IEnumerator）遍历，迭代器内部维护版本号。集合被修改（Add/Remove）时版本号变化，迭代器检测到不匹配就抛异常（快速失败机制，防止遍历过程中数据结构被破坏导致未定义行为）。\n三种解决方案：\n```csharp\n// 方案 1：for 循环倒序遍历\nfor (int i = list.Count - 1; i >= 0; i--)\n    if (ShouldRemove(list[i])) list.RemoveAt(i);\n\n// 方案 2：先收集要删的索引/元素，再统一删除\nvar toRemove = list.Where(x => ShouldRemove(x)).ToList();\nforeach (var item in toRemove) list.Remove(item);\n\n// 方案 3：用 LINQ 生成新集合（不改原集合）\nvar filtered = list.Where(x => !ShouldRemove(x)).ToList();\n```\n方案 1 最高效（原地修改，O(n)）；方案 2 清晰但两遍遍历；方案 3 函数式风格，不可变，最安全但产生新集合。",
    tags: ["foreach", "集合修改", "迭代器", "LINQ"],
  },
];
