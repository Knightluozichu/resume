/** 复习题库 · C 位操作（cpr-bit-fiddling）。C Primer Plus §15 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cprBitFiddlingQuestions: ReviewQuestion[] = [
  // ── L1 认记 ──
  {
    id: "bit-1",
    chapter: "cpr-bit-fiddling",
    level: 1,
    question: "C 中十六进制整数字面量如何书写？",
    answer: "前缀 **0x** 或 **0X**，如 **0x2A** 表示十进制 42。",
    tags: ["进制", "十六进制"],
  },
  {
    id: "bit-2",
    chapter: "cpr-bit-fiddling",
    level: 1,
    question: "按位与 & 在两位上的结果规则？",
    answer: "两位**都为 1** 时该位结果为 **1**，否则为 **0**。",
    tags: ["按位与"],
  },
  {
    id: "bit-3",
    chapter: "cpr-bit-fiddling",
    level: 1,
    question: "按位异或 ^ 的规则？",
    answer: "两位**不同**为 **1**，**相同**为 **0**。",
    tags: ["异或"],
  },
  {
    id: "bit-4",
    chapter: "cpr-bit-fiddling",
    level: 1,
    question: "左移 x << n 在无溢出时常等价于什么运算？",
    answer: "等价于 **x × 2^n**（整数乘法）；右侧补 **0**。",
    tags: ["左移"],
  },
  {
    id: "bit-5",
    chapter: "cpr-bit-fiddling",
    level: 1,
    question: "位字段声明语法示例？",
    answer: "**unsigned member : width;** 如 `unsigned ready : 1;` 表示 ready 占 1 bit。",
    tags: ["bit-field"],
  },

  // ── L2 理解 ──
  {
    id: "bit-6",
    chapter: "cpr-bit-fiddling",
    level: 2,
    question: "按位 & 与逻辑 && 的主要区别？",
    answer:
      "**&** 对**每一位**运算；**&&** 判断**真假**且**短路**，不逐 bit 组合。标志位用 &。",
    tags: ["按位", "逻辑"],
  },
  {
    id: "bit-7",
    chapter: "cpr-bit-fiddling",
    level: 2,
    question: "如何用掩码把 flags 的第 n 位置 1？",
    answer: "**flags |= (1u << n);** 或 **flags |= MASK;** 其中 MASK 对应那一位。",
    tags: ["掩码", "置位"],
  },
  {
    id: "bit-8",
    chapter: "cpr-bit-fiddling",
    level: 2,
    question: "unsigned 右移 >> n 左侧补什么？",
    answer: "补 **0**；等价于整除 **2^n**（向下取整）。",
    tags: ["右移"],
  },
  {
    id: "bit-9",
    chapter: "cpr-bit-fiddling",
    level: 2,
    question: "为什么标志位推荐用 unsigned？",
    answer:
      "避免 **signed** 上 **~** 与 **>>** 的**符号扩展**导致掩码清位、测试出错；位模式语义更清晰。",
    tags: ["unsigned"],
  },
  {
    id: "bit-10",
    chapter: "cpr-bit-fiddling",
    level: 2,
    question: "位字段能否取地址 &s.ready？",
    answer: "**不能**；位字段**不可取地址**，也不能与指针算术混用。",
    tags: ["bit-field"],
  },

  // ── L3 应用 ──
  {
    id: "bit-11",
    chapter: "cpr-bit-fiddling",
    level: 3,
    question: "写出清掉 FLAG（单 bit 掩码）的表达式。",
    answer: "**flags &= ~FLAG;** 要求 FLAG 与 flags 均为 **unsigned**，FLAG 仅一位为 1。",
    tags: ["清位"],
  },
  {
    id: "bit-12",
    chapter: "cpr-bit-fiddling",
    level: 3,
    question: "从 unsigned reg 中提取位于 shift 处、宽 width 的字段？",
    answer: "**(reg >> shift) & ((1u << width) - 1u)**；先右移再与掩码。",
    tags: ["掩码", "提取"],
  },
  {
    id: "bit-13",
    chapter: "cpr-bit-fiddling",
    level: 3,
    question: "0xFF 对应低 8 位全 1 的掩码，如何用移位构造？",
    answer: "**(1u << 8) - 1u** 或 **0xFFu**；注意 **1u** 避免 signed 溢出。",
    tags: ["掩码"],
  },
  {
    id: "bit-14",
    chapter: "cpr-bit-fiddling",
    level: 3,
    question: "x << 32 对 32 位 unsigned 有何问题？",
    answer: "移位量 **≥ 位宽** 是**未定义行为**；须保证 **n < 32**（或 sizeof*8）。",
    tags: ["UB", "移位"],
  },
  {
    id: "bit-15",
    chapter: "cpr-bit-fiddling",
    level: 3,
    question: "printf 打印八进制和十六进制用什么格式？",
    answer: "**%o** 八进制、**%x** 小写十六进制、**%X** 大写；**%d** 十进制。",
    tags: ["printf", "进制"],
  },

  // ── L4 综合 ──
  {
    id: "bit-16",
    chapter: "cpr-bit-fiddling",
    level: 4,
    question: "设计 unsigned 标志：READ=bit0, WRITE=bit1, EXEC=bit2，写出测试 READ 是否开启的条件。",
    answer:
      "`#define F_READ (1u<<0)`；**`(flags & F_READ) != 0`**。置位 `flags |= F_READ`；清位 `flags &= ~F_READ`。",
    tags: ["综合", "标志位"],
  },
  {
    id: "bit-17",
    chapter: "cpr-bit-fiddling",
    level: 4,
    question: "对比 bit-field 与手动位移+掩码：可移植性与适用场景？",
    answer:
      "**bit-field**：省内存、贴近寄存器，**布局实现定义**，**不可**跨平台二进制。**手动掩码**：代码稍长，**可移植**、适合网络/文件协议。",
    tags: ["综合理解"],
  },
  {
    id: "bit-18",
    chapter: "cpr-bit-fiddling",
    level: 4,
    question: "对 signed 负数右移 >> 1，能否假设等于数学除以 2？",
    answer:
      "**不能**；C 对 signed **>>** **实现定义**，常见为算术右移（-1>>1 仍为 -1）。位操作应使用 **unsigned**。",
    tags: ["signed", "右移"],
  },
];

export default cprBitFiddlingQuestions;
