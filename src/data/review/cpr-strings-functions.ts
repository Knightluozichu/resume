/** 复习题库 · C 字符串和字符串函数（cpr-strings-functions）。C Primer Plus §11 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cprStringsFunctionsQuestions: ReviewQuestion[] = [
  // ── L1 认记 ──
  {
    id: "csf-1",
    chapter: "cpr-strings-functions",
    level: 1,
    question: "C 语言用什么字符标记字符串结束？",
    answer: "空字符 **\\0**（ASCII 0）。所有 string.h 函数都靠它判断字符串到哪结束。",
    tags: ["\\0", "字符串"],
  },
  {
    id: "csf-2",
    chapter: "cpr-strings-functions",
    level: 1,
    question: "strlen(\"Hi\") 和 sizeof(\"Hi\") 通常各返回多少？",
    answer:
      "**strlen → 2**（只数 H、i，不含 \\0）。**sizeof → 3**（含结尾 \\0 的整个字面量对象大小）。差 1 是正常现象。",
    tags: ["strlen", "sizeof"],
  },
  {
    id: "csf-3",
    chapter: "cpr-strings-functions",
    level: 1,
    question: "strcmp(s1, s2) 返回 0 表示什么？",
    answer: "两字符串**内容相同**（按 unsigned char 字典序比较后相等）。非 0 表示不等；负/正表示 s1 较小/较大。",
    tags: ["strcmp"],
  },
  {
    id: "csf-4",
    chapter: "cpr-strings-functions",
    level: 1,
    question: "strcpy 和 strcat 的头文件是什么？",
    answer: "**#include <string.h>**。strcpy 复制整串；strcat 把源串接到目标串已有内容末尾。",
    tags: ["string.h"],
  },
  {
    id: "csf-5",
    chapter: "cpr-strings-functions",
    level: 1,
    question: "读入一行文本应优先用 gets 还是 fgets？",
    answer:
      "**fgets**。gets 不检查缓冲区大小，已从 C11 移除。fgets(buf, size, stdin) 最多读 size-1 字符并保证 \\0 结尾。",
    tags: ["fgets", "gets"],
  },

  // ── L2 理解 ──
  {
    id: "csf-6",
    chapter: "cpr-strings-functions",
    level: 2,
    question: "为什么 strcpy 可能导致缓冲区溢出？",
    answer:
      "strcpy **不检查 dest 容量**，从 src 逐字节复制直到 \\0。源串比 dest 长时会写出边界，覆盖相邻内存——安全替代：strncpy、snprintf。",
    tags: ["strcpy", "溢出"],
  },
  {
    id: "csf-7",
    chapter: "cpr-strings-functions",
    level: 2,
    question: "char ar[] = \"Hi\" 与 char *p = \"Hi\" 在可修改性上有何区别？",
    answer:
      "**ar[]** 在栈上分配可写副本，**可改** ar[0]。**p** 指向只读字面量，**p[0]='h' 是未定义行为**。要可改串用数组或 malloc。",
    tags: ["数组", "指针"],
  },
  {
    id: "csf-8",
    chapter: "cpr-strings-functions",
    level: 2,
    question: "为什么不能用 if (s1 == s2) 比较字符串内容？",
    answer:
      "`==` 比较**指针地址**是否相同，不是字符内容。两串内容相同但存于不同地址时 `==` 为假。内容比较用 **strcmp(s1,s2)==0**。",
    tags: ["strcmp", "指针"],
  },
  {
    id: "csf-9",
    chapter: "cpr-strings-functions",
    level: 2,
    question: "strcat(dest, src) 使用前必须满足什么空间条件？",
    answer:
      "dest 中已有有效字符串（以 \\0 结尾），且剩余空间 ≥ **strlen(src) + 1**（含新 \\0）。strcat 不检查边界，空间不足会溢出。",
    tags: ["strcat"],
  },
  {
    id: "csf-10",
    chapter: "cpr-strings-functions",
    level: 2,
    question: "手动 char word[4] 逐字赋值时，为什么必须写 word[3] = '\\0'？",
    answer:
      "没有 \\0 就不是合法 C 字符串。strlen/strcpy 等会一直往后读直到撞上别的内存。逐字填充时**必须**在末尾显式写 \\0。",
    tags: ["\\0", "初始化"],
  },

  // ── L3 应用 ──
  {
    id: "csf-11",
    chapter: "cpr-strings-functions",
    level: 3,
    question:
      "读代码，写出 dest 的内容。\n```c\nchar dest[20] = \"Hi\";\nstrcat(dest, \"!\");\n```",
    answer: 'dest 变为 **"Hi!"**（4 字节含 \\0）。strcat 在 "Hi" 的 \\0 处接上 "!"。',
    tags: ["strcat", "读代码"],
  },
  {
    id: "csf-12",
    chapter: "cpr-strings-functions",
    level: 3,
    question:
      "读代码，strcmp 结果如何？\n```c\nint r = strcmp(\"apple\", \"banana\");\n```",
    answer: "**r < 0**（负值）。首字符 **'a' vs 'b'**，'a' 小于 'b'，故 \"apple\" 字典序更小，strcmp 返回负值。",
    tags: ["strcmp", "读代码"],
  },
  {
    id: "csf-13",
    chapter: "cpr-strings-functions",
    level: 3,
    question:
      "char a[] = \"Cat\"; char *b = \"Cat\"; sizeof(a) 与 sizeof(b) 在 64 位系统通常各为多少？",
    answer: "**sizeof(a) = 4**（3 字符+\\0）。**sizeof(b) = 8**（指针变量大小）。a 是数组，b 是指针——类型不同。",
    tags: ["sizeof", "数组vs指针"],
  },
  {
    id: "csf-14",
    chapter: "cpr-strings-functions",
    level: 3,
    question: "fgets(line, 10, stdin) 最多读入几个字符到 line？",
    answer: "最多 **9** 个字符（size-1），第 10 个位置留给 **\\0**。若输入超过 9 个可见字符，剩余留在输入缓冲区。",
    tags: ["fgets"],
  },
  {
    id: "csf-15",
    chapter: "cpr-strings-functions",
    level: 3,
    question:
      "找出问题。\n```c\nchar msg[5] = \"Hello\";\n```",
    answer:
      '"Hello" 需 **6 字节**（5 字母+\\0），数组只有 5。**没有空间放结尾 \\0**——未定义行为。应改为 char msg[6] 或更短字面量。',
    tags: ["初始化", "排错"],
  },

  // ── L4 综合 ──
  {
    id: "csf-16",
    chapter: "cpr-strings-functions",
    level: 4,
    question: "不用 strlen，写函数 int my_len(const char *s) 返回字符串长度。",
    answer:
      "```c\nint my_len(const char *s) {\n    int n = 0;\n    while (s[n] != '\\0')\n        n++;\n    return n;\n}\n```\n从 s[0] 数到 \\0 之前。",
    tags: ["自定义函数", "strlen"],
  },
  {
    id: "csf-17",
    chapter: "cpr-strings-functions",
    level: 4,
    question:
      "写程序：用 fgets 读一行（最多 79 字符），去掉末尾换行，若与 \"quit\" 相同则打印 goodbye 并结束，否则 echo 该行。",
    answer:
      "```c\n#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char line[80];\n    while (fgets(line, sizeof line, stdin)) {\n        line[strcspn(line, \"\\n\")] = '\\0';\n        if (strcmp(line, \"quit\") == 0) {\n            puts(\"goodbye\");\n            break;\n        }\n        printf(\"%s\\n\", line);\n    }\n    return 0;\n}\n```",
    tags: ["综合实现", "fgets", "strcmp"],
  },
  {
    id: "csf-18",
    chapter: "cpr-strings-functions",
    level: 4,
    question:
      "说明 strcpy(dest, src) 执行时 dest 和 src 指针各自如何移动，直到何时停止。",
    answer:
      "循环：`*dest++ = *src++`，每次拷贝一字节并两指针后移，直到拷贝了 **\\0** 为止（条件 `!= '\\0'` 在赋值后判断）。返回 dest 初始地址。",
    tags: ["strcpy", "综合理解"],
  },
];

export default cprStringsFunctionsQuestions;
