import type { ReviewQuestion } from "./types";

/** 非常规进位制：Gray 码与负二进制 复习题 */
export const hdUnusualBasesQuestions: ReviewQuestion[] = [
  {
    id: "hd-unusual-bases-1",
    chapter: "hd-unusual-bases",
    level: 1,
    question: "Gray 码相比普通二进制的优势？",
    answer: "相邻数只差1位，避免多位同时跳变的中间状态错误。在旋转编码器、位置传感器等物理设备中至关重要。还用于 Karnaugh 图简化逻辑设计。",
    tags: ["Gray码", "优势"],
  },
  {
    id: "hd-unusual-bases-2",
    chapter: "hd-unusual-bases",
    level: 2,
    question: "二进制转 Gray 码的公式？",
    answer: "g = b ^ (b >> 1)。一条指令完成。Gray 转二进制用分治异或：b=g; b^=b>>16; b^=b>>8; b^=b>>4; b^=b>>2; b^=b>>1（32位5步）。",
    tags: ["Gray码", "转换"],
  },
  {
    id: "hd-unusual-bases-3",
    chapter: "hd-unusual-bases",
    level: 3,
    question: "负二进制如何无需符号位表示正负数？",
    answer: "位权为 1,-2,4,-8,16,...（交替正负）。通过 0/1 组合可表示任意正负整数。如 3=4+(-2)+1=111_{-2}，-3=-8+4+1=1101_{-2}。",
    tags: ["负二进制"],
  },
  {
    id: "hd-unusual-bases-4",
    chapter: "hd-unusual-bases",
    level: 4,
    question: "BCD 编码适合什么场景？",
    answer: "每4位表示一个十进制数字。适合金融计算等需要精确十进制运算的场景，避免二进制浮点数的精度问题。缺点是空间利用率低（4位只表示10个值而非16个）。",
    tags: ["BCD", "应用"],
  },
];
