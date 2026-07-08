import type { ReviewQuestion } from "./types";

/** Lua 程序设计 · 表达式复习题 */
export const lupExpressionsQuestions: ReviewQuestion[] = [
  {
    id: "lup-expressions-1",
    chapter: "lup-expressions",
    level: 1,
    question: "以下代码输出什么？\n```lua\nprint(5 // 2)\nprint(-5 // 2)\nprint(2 and 3)\nprint(nil or \"default\")\n```",
    answer:
      "```\n2\n-3\n3\ndefault\n```\n\n解释：\n- `5 // 2` = 2：向下取整除\n- `-5 // 2` = -3：向下取整是向负无穷取整，-2.5 向下 = -3（不是截断为 -2）\n- `2 and 3` = 3：and 返回第一个假值或最后一个值。2 为真，返回第二个值 3\n- `nil or \"default\"` = \"default\"：or 返回第一个真值或最后一个值。nil 为假，返回第二个值",
    tags: ["//", "and/or", "短路求值"],
  },
  {
    id: "lup-expressions-2",
    chapter: "lup-expressions",
    level: 2,
    question: "为什么 `(a > b) and a or b` 在 a 为 false/nil 时会出错？如何安全实现求最大值？",
    answer:
      "问题：当 a 为 false/nil 时，`(a > b) and a or b` 会失败。\n\n分析：`(true) and nil or b` = `nil or b` = b——即使条件为真也返回 b。因为 and 返回 nil（假值），然后 `nil or b` 返回 b。\n\n惯用法 `(cond) and a or b` 要求 a 不为假值。如果 a 可能是 false 或 nil，这个模式会出错。\n\n安全方案：\n```lua\n-- 方案1：用 if-else（最安全）\nlocal max\nif a > b then max = a else max = b end\n\n-- 方案2：确保 a 和 b 都是数字（不会为 false/nil）\nlocal max = (a > b) and a or b\n```\n\nLua 没有三元运算符——复杂条件用 if-else 更安全。and/or 模拟三元只适用于确定 a 不为假值的场景。",
    tags: ["and/or", "三元表达式", "陷阱"],
  },
  {
    id: "lup-expressions-3",
    chapter: "lup-expressions",
    level: 3,
    question: "Lua 中 ~= 和 // 分别是什么运算符？^ 是什么？",
    answer:
      "- `~=` 是不等于（相当于其他语言的 !=）。这是从 C/Python 迁移时最常见的语法错误——Lua 没有 !=。\n\n- `//` 是向下取整除（floor division）。`5 // 2` = 2，`-5 // 2` = -3（向负无穷取整，不是向零截断）。\n\n- `^` 是幂运算（power），不是 C 语言的位异或。`2 ^ 10` = 1024.0。Lua 5.3 引入了位运算符（& | ~ << >>），但 ^ 始终是幂运算。\n\n注意：Lua 5.3 之前的版本没有位运算符，需要用 bit32 库或 C 扩展。",
    tags: ["~=", "//", "^"],
  },
  {
    id: "lup-expressions-4",
    chapter: "lup-expressions",
    level: 4,
    question: "Lua 中字符串和数字如何自动转换？有什么注意事项？",
    answer:
      "Lua 在需要时自动在字符串和数字之间转换：\n\n**字符串→数字**（算术运算时）：\n```lua\nprint(\"10\" + 20)    -- 30（\"10\" 转为数字 10）\nprint(\"3.14\" * 2)   -- 6.28\n```\n\n**数字→字符串**（连接运算时）：\n```lua\nprint(10 .. 20)     -- \"1020\"（10 和 20 转为字符串连接）\n```\n\n注意事项：\n1. **转换不总是成功**：`\"abc\" + 1` 会报错（无法转为数字）\n2. **混合运算歧义**：`10 .. 20 + 1` 的运算顺序可能不符合直觉\n3. **比较不转换**：`\"10\" == 10` 为 false（类型不同）\n4. **建议显式转换**：用 `tonumber(s)` 和 `tostring(n)` 显式转换，避免意外行为\n5. **格式化输出**：用 `string.format(\"%d\", n)` 而非 `n .. \"\"` 做格式化转换",
    tags: ["自动转换", "字符串", "数字"],
  },
];
