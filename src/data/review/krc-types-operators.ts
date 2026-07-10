/** 复习题库 · 类型、运算符与表达式（krc-types-operators）。K&R 第 2 章改编。 */

import type { ReviewQuestion } from "./types";

export const krcTypesOperatorsQuestions: ReviewQuestion[] = [
  // ── L1 认记 ──
  {
    id: "krc-to-1",
    chapter: "krc-types-operators",
    level: 1,
    question: `C 语言的基本数据类型有哪些？\`char\`、\`int\`、\`float\`、\`double\` 在 64 位平台上各占多少字节？`,
    answer:
      `基本类型：\`char\`（字符/小整数）、\`int\`（整数）、\`float\`（单精度浮点）、\`double\`（双精度浮点）。64 位平台上典型大小：\`char\` = 1 字节，\`int\` = 4 字节，\`float\` = 4 字节，\`double\` = 8 字节。C 标准唯一定义的绝对大小是 \`sizeof(char) == 1\`，其余依平台而定。`,
    tags: ["基本类型", "sizeof", "字节大小"],
  },
  // ── L2 理解 ──
  {
    id: "krc-to-2",
    chapter: "krc-types-operators",
    level: 2,
    question: `\`int i = 7; float f = i / 2;\` 的结果 f 是多少？为什么不是 3.5？如何修正？`,
    answer:
      `f = 3.0。因为 \`i / 2\` 中 \`i\` 是 int、\`2\` 是 int，C 执行整数除法，7 / 2 = 3（截断小数），然后 3 隐式转换为 float 赋给 f。\n修正方法：① \`float f = i / 2.0;\`（让除数是 double，整个除法提升为浮点除法）② \`float f = (float)i / 2;\`（先把被除数转成 float）。关键：C 的算术运算在操作数类型相同时不做提升，必须至少有一个操作数是浮点类型才走浮点除法。`,
    tags: ["整数除法", "类型转换", "隐式提升"],
  },
  // ── L3 应用 ──
  {
    id: "krc-to-3",
    chapter: "krc-types-operators",
    level: 3,
    question: `写出表达式 \`a[i]++\` 和 \`++a[i]\` 的区别。如果 \`i = 2\`、\`a[2] = 5\`，两个表达式执行后 \`a[2]\` 分别是多少？表达式本身的值是多少？`,
    answer:
      `\`a[i]++\` 是后缀自增：表达式值 = 5（自增前的值），执行后 \`a[2]\` = 6。\n\`++a[i]\` 是前缀自增：表达式值 = 6（自增后的值），执行后 \`a[2]\` = 6。\n两者最终都会让 \`a[2]\` 变成 6，区别在于表达式本身的返回值：后缀返回旧值，前缀返回新值。这在赋值或传参时有实际区别：\`b = a[i]++\` 让 b = 5，\`b = ++a[i]\` 让 b = 6。`,
    tags: ["自增运算符", "前缀后缀", "表达式求值"],
  },
  // ── L4 综合 ──
  {
    id: "krc-to-4",
    chapter: "krc-types-operators",
    level: 4,
    question: `C 语言的类型转换分为「隐式转换」和「显式转换」。请列举隐式转换发生的场景，并分析 \`unsigned int u = 10; int i = -1; if (i < u) printf(\"yes\");\` 是否输出 yes？为什么？`,
    answer:
      `隐式转换场景：① 算术运算中不同类型混合（int + float → 都提升为 float）② 赋值时右值转成左值类型 ③ 函数参数传递时转成形参类型 ④ 比较运算中两边类型不同时统一。\n上述代码**不输出 yes**。因为 \`i\`（int，值为 -1）与 \`u\`（unsigned int）比较时，C 的隐式转换规则是「有符号转为无符号」：-1 被转成 unsigned int，其值变成 4294967295（2^32 - 1），远大于 10，所以 \`i < u\` 为假。这是 C 语言中最经典的陷阱之一：有符号与无符号比较时，负数会变成巨大的正数。`,
    tags: ["类型转换", "unsigned", "比较陷阱", "隐式转换"],
  },
];

export default krcTypesOperatorsQuestions;
