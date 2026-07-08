import type { ReviewQuestion } from "./types";

/** Lua 程序设计 · 学习地图复习题 */
export const lupLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "lup-learning-map-1",
    chapter: "lup-learning-map",
    level: 1,
    question: "Lua 全书四大板块的顺序是什么？",
    answer:
      "四大板块：Lua 基础（类型与值）→ 核心机制（表达式与语句）→ 高级特性（函数闭包协程）→ 元编程与 C 交互（元表与 C API）。\n\n按这个顺序学习是因为建立了递进能力链：类型值是数据基础，表达式语句是操作工具，函数闭包协程是封装与控制，元表 C API 是扩展与嵌入。",
    tags: ["四大板块", "学习路径", "递进链"],
  },
  {
    id: "lup-learning-map-2",
    chapter: "lup-learning-map",
    level: 2,
    question: 'Lua 的核心定位是什么？"提供机制而非策略"是什么意思？',
    answer:
      "Lua 的核心定位是嵌入式脚本语言——小巧（约 20000 行 C 代码），设计为嵌入宿主程序中扩展功能。\n\n'提供机制而非策略'意味着：Lua 不预设编程范式。它提供元表让你自己实现 OOP（而非内置 class），提供闭包让你自己实现函数式（而非内置 map/filter），提供协程让你自己实现并发（而非内置线程），提供 C API 让你自己扩展功能（而非丰富标准库）。\n\n这让 Lua 保持极简、快速、可嵌入——核心小但扩展能力无限。",
    tags: ["嵌入式语言", "设计哲学", "机制而非策略"],
  },
  {
    id: "lup-learning-map-3",
    chapter: "lup-learning-map",
    level: 3,
    question: "为什么 Lua 只用 table 作为数据结构？这种设计的优缺点？",
    answer:
      "Lua 只用 table 是'提供机制而非策略'的体现。table 足够通用——模拟数组（t[1],t[2]）、字典（t[\"key\"]）、对象（t.method）、模块。\n\n优点：\n1. 语言核心极简——只需实现一种数据结构\n2. 学习成本低——掌握 table 就掌握所有数据组织\n3. 灵活性高——同一段代码可处理数组和字典\n4. 元表可扩展 table 行为——实现 OOP、运算符重载\n\n缺点：\n1. 没有类型约束——table 可同时是数组和字典\n2. 性能不如专门结构——数组部分和哈希部分混合\n3. 可读性降低——看到 t[1] 不确定是数组还是字典\n4. 标准库弱——需自己实现 set、queue 等",
    tags: ["table", "设计哲学", "优缺点"],
  },
  {
    id: "lup-learning-map-4",
    chapter: "lup-learning-map",
    level: 4,
    question: "用其他语言（如 Python）的思维学 Lua 会遇到哪些陷阱？",
    answer:
      "主要陷阱：\n\n1. **变量默认全局**：Python 中变量默认局部，Lua 中默认全局。忘记 local 导致全局污染。\n\n2. **不等于运算符**：Python 用 !=，Lua 用 ~=。\n\n3. **数组索引**：Python 从 0 开始，Lua 从 1 开始。\n\n4. **真值规则**：Python 中 0/空容器为假，Lua 中只有 nil 和 false 为假。\n\n5. **没有 class**：Python 有 class 关键字，Lua 用元表模拟 OOP。\n\n6. **没有 continue/switch/++**：Python 有这些，Lua 没有（用 goto/table/手动加1替代）。\n\n7. **and/or 返回值**：Python 返回布尔值，Lua 返回操作数本身。\n\n8. **标准库**：Python 标准库丰富，Lua 极简，很多功能需自己实现或用 C 扩展。\n\n学 Lua 要'忘掉'其他语言的思维，理解 Lua 极简核心+元编程扩展的设计。",
    tags: ["学习陷阱", "跨语言迁移", "Lua特色"],
  },
];
