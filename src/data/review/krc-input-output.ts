/** 复习题库 · 输入与输出（krc-input-output）。K&R 第 7 章改编。 */

import type { ReviewQuestion } from "./types";

export const krcInputOutputQuestions: ReviewQuestion[] = [
  // ── L1 认记 ──
  {
    id: "krc-io-1",
    chapter: "krc-input-output",
    level: 1,
    question: `C 程序启动时自动打开的三个标准流是什么？分别对应文件描述符几号？`,
    answer:
      `stdin（标准输入，fd 0）、stdout（标准输出，fd 1）、stderr（标准错误，fd 2）。它们都是 \`FILE *\` 类型的指针，由标准库自动打开，程序无需手动 fopen。stdout 通常行缓冲（终端）或全缓冲（管道/文件），stderr 无缓冲（保证错误信息立即输出）。`,
    tags: ["标准流", "stdin", "stdout", "stderr", "FILE*"],
  },
  // ── L2 理解 ──
  {
    id: "krc-io-2",
    chapter: "krc-input-output",
    level: 2,
    question: `\`printf(\"%d\", 3.14);\` 输出一个奇怪的大整数而不是 3，为什么编译器不报错？`,
    answer:
      `因为 \`printf\` 是变参函数（参数个数和类型可变），C 编译器无法在编译期检查格式串与参数类型是否匹配。\`%d\` 告诉 printf 把下一个参数当 int（4 字节）读，但实际传的是 double（8 字节）——printf 只取了 double 二进制表示的前 4 字节当 int 解读，得到的是完全无关的整数。\n这是 C 变参函数的历史包袱。一些编译器（gcc/clang）能通过格式串分析发出警告（\`-Wformat\`），但不是所有情况都能检测到。正确写法：\`printf(\"%f\", 3.14);\` 或 \`printf(\"%d\", (int)3.14);\`。`,
    tags: ["printf", "变参函数", "类型不匹配", "格式化"],
  },
  // ── L3 应用 ──
  {
    id: "krc-io-3",
    chapter: "krc-input-output",
    level: 3,
    question: `\`fgets\` 和 \`gets\` 有什么区别？为什么 \`gets\` 被从 C11 标准中移除了？`,
    answer:
      `\`fgets(buf, n, fp)\`：最多读 n-1 个字符到 buf，遇到换行符或文件末尾停止，**保留换行符**在 buf 中，并自动添加 '\\0'。第二个参数限制读取长度，不会溢出缓冲区。\n\`gets(buf)\`：读一行直到换行符，**不限制读取长度**，没有边界检查——如果输入超过 buf 大小，直接溢出覆盖相邻内存。\n\`gets\` 被移除是因为它是 C 标准库中唯一无法安全使用的函数：没有任何办法限制输入长度，任何使用 gets 的代码都是缓冲区溢出漏洞。1999 年的 Morris 蠕虫就利用了 gets 的溢出。C11 用 \`gets_s\`（带长度参数）替代。`,
    tags: ["fgets", "gets", "缓冲区溢出", "安全", "行I/O"],
  },
  // ── L4 综合 ──
  {
    id: "krc-io-4",
    chapter: "krc-input-output",
    level: 4,
    question: `标准 I/O 的缓冲机制有哪三种？解释为什么 \`printf(\"hello\"); while(1);\` 在终端会立即显示 hello，但用 \`./a.out > file.txt\` 重定向后文件里看不到 hello？如何解决？`,
    answer:
      `三种缓冲：① 全缓冲（缓冲区满才刷写，如磁盘文件）② 行缓冲（遇换行符刷写，如终端 stdout）③ 无缓冲（立即刷写，如 stderr）。\n终端模式：stdout 是行缓冲，\`printf(\"hello\")\` 没有 '\\n'，但因为终端模式下某些实现会在程序阻塞时自动刷写，或缓冲区最终会被刷出。\n重定向到文件：stdout 变成全缓冲，\`printf(\"hello\")\` 把 hello 存在用户态缓冲区，还没满不会调用 write 系统调用，\`while(1)\` 死循环让程序永不退出，缓冲区永远不会被刷写到文件。\n解决：① \`fflush(stdout)\` 主动刷写 ② 加 \`\\n\`（行缓冲模式下触发刷写，但全缓冲模式不保证） ③ \`setbuf(stdout, NULL)\` 关闭缓冲。最可靠的是 fflush。`,
    tags: ["缓冲机制", "全缓冲", "行缓冲", "fflush", "重定向", "综合"],
  },
];

export default krcInputOutputQuestions;
