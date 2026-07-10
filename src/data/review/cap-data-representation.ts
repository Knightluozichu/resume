import type { ReviewQuestion } from "./types";

export const capDataRepresentationQuestions: ReviewQuestion[] = [
  {
    id: "cap-data-representation-1",
    chapter: "cap-data-representation",
    level: 2,
    question: `w 位补码的取值范围是多少？为什么关于 0 不对称？`,
    answer:
      `w 位补码范围是 [-2^(w-1), 2^(w-1)-1]。不对称的原因是位向量总数 2^w 是偶数，而 0 占用一个码位，剩余 2^w-1 个码位无法关于 0 对称平分。具体地，最高位权重为 -2^(w-1)（负），其余位最大和为 2^(w-1)-1（正）。所以 TMin_w = -2^(w-1)（最高位 1 其余 0），TMax_w = 2^(w-1)-1（最高位 0 其余 1），|TMin| = |TMax| + 1。这个不对称导致 \`-TMin\` 溢出、\`abs(TMin)\` 未定义等经典 bug。同一比特模式在不同编码下数值不同：0xFFFFFFFF 作为 32 位无符号是 4294967295，作为补码是 -1。`,
    tags: ["补码", "整数表示"],
  },
  {
    id: "cap-data-representation-2",
    chapter: "cap-data-representation",
    level: 3,
    question: `为什么 \`-1 < 0U\` 在 C 中为假？这反映了什么规则？`,
    answer:
      `C 的隐式类型转换规则：有符号与无符号运算时，有符号被隐式转为无符号。\`-1\` 作为 32 位 int 是 0xFFFFFFFF，转为无符号是 4294967295U，比 0U 大，所以 \`-1 < 0U\` 为假。这条规则让 \`sizeof()\`、\`strlen()\` 等返回 size_t（无符号）的比较埋下无数 bug：\`for (int i = n-1; i < sizeof(arr); i++)\` 当 i 为负时会因提升为无符号而判断失真，可能让循环越界。防范：永远不要把有符号变量和无符号（尤其 sizeof、strlen）直接比较；循环计数用 size_t 或显式检查负值。这是 C 系统编程最隐蔽的陷阱之一。`,
    tags: ["隐式类型转换", "C 陷阱"],
  },
  {
    id: "cap-data-representation-3",
    chapter: "cap-data-representation",
    level: 3,
    question: `为什么 0.1 + 0.2 != 0.3？这是 bug 吗？如何避免？`,
    answer:
      `不是 bug，是 IEEE 754 浮点数的固有特性。0.1 在二进制中是无限循环小数 0.0001100110011...，23 位（单精度）或 52 位（双精度）尾数必须截断产生舍入误差。0.1 和 0.2 各自的浮点近似相加后再舍入，结果不等于 0.3 的浮点近似，而是 0.30000000000000004。这是所有遵循 IEEE 754 的语言的通病。此外浮点不满足结合律：(a+b)+c 可能 != a+(b+c)，大量累加用 Kahan 求和可减小误差。金融等不能容忍误差的场景应使用定点数或十进制库（如 Java BigDecimal、Python decimal 模块）。`,
    tags: ["浮点数", "IEEE 754", "精度"],
  },
  {
    id: "cap-data-representation-4",
    chapter: "cap-data-representation",
    level: 4,
    question: `如何可移植地检测补码加法溢出？为什么 \`TMin\` 取相反数是未定义行为？`,
    answer:
      `补码加法 s = x + y 溢出的可移植检测：当且仅当 x、y 同号但 s 与它们异号时溢出。即 \`(x > 0 && y > 0 && s < 0) || (x < 0 && y < 0 && s >= 0)\`。不能用 \`s < x\` 检测（那是无符号的判断，补码不成立）。TMin = -2^(w-1) 取相反数应是 2^(w-1)，但 TMax = 2^(w-1)-1，2^(w-1) 超出补码范围无法表示，所以 \`-TMin\` 和 \`abs(TMin)\` 溢出。在 C 中有符号溢出是未定义行为（UB），编译器可能基于「有符号溢出不发生」做优化导致意外结果。这是补码范围关于 0 不对称的直接后果：|TMin| = |TMax|+1。安全做法：用无符号运算做有符号运算再转回，或用编译器内置 __builtin_add_overflow。`,
    tags: ["溢出", "未定义行为", "补码"],
  },
];
