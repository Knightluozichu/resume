import type { ReviewQuestion } from "./types";

/** CRC 校验与纠错码 复习题 */
export const hdCrcErrorQuestions: ReviewQuestion[] = [
  {
    id: "hd-crc-error-1",
    chapter: "hd-crc-error",
    level: 1,
    question: "CRC 用什么除法？为什么不用普通除法？",
    answer: "模2多项式除法（XOR替代加减法，无进位借位）。因为 CRC 在 GF(2) 上运算，每位是多项式系数。这种结构使 CRC 对突发错误检测能力强且硬件实现简单。",
    tags: ["CRC", "模2除法"],
  },
  {
    id: "hd-crc-error-2",
    chapter: "hd-crc-error",
    level: 2,
    question: "CRC 查表法为什么快？",
    answer: "逐位 XOR 除法每数据位需1次操作。查表法每字节1次查表+XOR，速度提升8倍。表预计算256项（每项对应一个字节的CRC余式）。",
    tags: ["CRC", "查表优化"],
  },
  {
    id: "hd-crc-error-3",
    chapter: "hd-crc-error",
    level: 3,
    question: "汉明码如何定位并纠正单比特错误？",
    answer: "校验位覆盖位置号的第k位为1的位置。重算校验位，不一致的校验位对应的2^k值异或=错误位置。翻转该位即纠正。如p1和p4不一致→错误在位置5。",
    tags: ["汉明码", "纠错"],
  },
  {
    id: "hd-crc-error-4",
    chapter: "hd-crc-error",
    level: 4,
    question: "CRC 和汉明码的区别？",
    answer: "CRC 只检测错误不能纠正。汉明码能检测并纠正单比特错误（最小汉明距离3）。扩展汉明码（SECDED）加总校验位能纠1位检2位。CRC 用于网络/存储检错，汉明码用于内存纠错。",
    tags: ["对比", "CRC vs 汉明码"],
  },
];
