import type { ReviewQuestion } from "./types";

/** Lua 程序设计 · 类型与值复习题 */
export const lupTypesValuesQuestions: ReviewQuestion[] = [
  {
    id: "lup-types-values-1",
    chapter: "lup-types-values",
    level: 1,
    question: "Lua 有哪 8 种基本类型？type() 函数返回什么？",
    answer:
      "8 种基本类型：\n1. nil — 缺失值\n2. boolean — true/false\n3. number — 数字（浮点/整数）\n4. string — 不可变字节序列\n5. function — 函数\n6. table — 唯一数据结构\n7. userdata — C 数据包装\n8. thread — 协程\n\ntype(val) 返回类型名的字符串，如 type(42) 返回 \"number\"，type(nil) 返回 \"nil\"。",
    tags: ["8种类型", "type()", "基础概念"],
  },
  {
    id: "lup-types-values-2",
    chapter: "lup-types-values",
    level: 2,
    question: "以下代码输出什么？解释 Lua 的真值规则。\n```lua\nlocal x = 0\nif x then print(\"true\") else print(\"false\") end\n```",
    answer:
      "输出 `true`。\n\nLua 中只有 nil 和 false 为假，其余所有值（包括 0、空字符串、空表）都为真。x = 0 是 number 类型值 0，在条件判断中为真。\n\n这与 C 语言不同（C 中 0 为假），也和 Python 不同（Python 中 0 和空容器为假）。\n\n如果要检查变量是否已赋值用 `if x ~= nil`，如果要检查是否为零用 `if x ~= 0`。不能用 `if x then` 来检查'空'——因为 0 和空表在 Lua 中都是真。",
    tags: ["真值规则", "nil", "false"],
  },
  {
    id: "lup-types-values-3",
    chapter: "lup-types-values",
    level: 3,
    question: "Lua 数组索引从几开始？# 运算符有什么限制？",
    answer:
      "Lua 数组索引从 1 开始（不是 0）。\n\n# 运算符返回 table 的'数组部分'长度——从 1 开始的连续整数索引个数。\n\n限制：\n1. **只算数组部分**：#{name=\"A\"} 返回 0，字典字段不算\n2. **遇到 nil 不确定**：#{10, nil, 30} 的返回值不确定\n3. **不适用于稀疏数组**：如果数组不连续，# 结果不可靠\n\n正确做法：保持数组从 1 开始连续无 nil。需要字典长度时用 pairs 遍历计数。",
    tags: ["数组索引", "#运算符", "table"],
  },
  {
    id: "lup-types-values-4",
    chapter: "lup-types-values",
    level: 4,
    question: "Lua 的动态类型语义是什么？\"值有类型，变量没有\"如何理解？",
    answer:
      "Lua 是动态类型语言——变量没有类型，值有类型。变量只是名字（标签），可以指向任何类型的值。\n\n```lua\nlocal x = 10        -- x 指向 number 类型的值 10\nprint(type(x))     -- number\nx = \"hello\"        -- x 现在指向 string 类型的值\nprint(type(x))     -- string\nx = nil            -- x 不指向任何值\nprint(type(x))     -- nil\n```\n\n理解：变量不是类型的容器，而是值的标签。类型绑定在值本身上，不绑定在变量名上。同一个变量可以先指向数字，再指向字符串——因为类型属于值不属于变量。\n\n类型检查在运行时进行（type() 函数）。这与静态类型语言（C/Java）完全不同——静态类型中变量有固定类型，赋值不匹配会编译错误。",
    tags: ["动态类型", "值有类型", "变量无类型"],
  },
];
