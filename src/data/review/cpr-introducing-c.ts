/** 复习题库 · C语言概述（cpr-introducing-c）。C Primer Plus §2 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cprIntroducingCQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "cic-1",
    chapter: "cpr-introducing-c",
    level: 1,
    question: "一个最小的 C 程序必须包含哪几个部分？按出现顺序说出来。",
    answer:
      "① `#include <stdio.h>`（头文件声明）→ ② `int main(void)`（程序入口）→ ③ 花括号 `{ ... }` 里的语句主体 → ④ `return 0;`（返回状态码）。缺了 main 函数，操作系统不知道从哪开始执行；缺了 return，编译器在新标准下虽自动补 0，但养成写的习惯是好的。",
    tags: ["C程序结构", "main函数"],
  },
  {
    id: "cic-2",
    chapter: "cpr-introducing-c",
    level: 1,
    question: "`#include <stdio.h>` 这一行做了什么？没有它程序会怎样？",
    answer:
      "它告诉预处理器：把 `<stdio.h>` 这个头文件的内容原样粘贴到这一行所在的位置。stdio.h 里声明了 `printf()` 等标准输入输出函数。没有它，编译器不认识 `printf` 这个名字，会因为「隐式函数声明」报错或警告。",
    tags: ["头文件", "预处理"],
  },
  {
    id: "cic-3",
    chapter: "cpr-introducing-c",
    level: 1,
    question: "`//` 和 `/* */` 两种注释有什么区别？编译器怎么处理它们？",
    answer:
      "`//` 是单行注释，从它开始到本行末尾全被忽略。`/* */` 是多行注释，裹住的部分（可以跨多行）全被忽略。编译器在预处理的末尾就把注释都删掉了——注释只给人看，绝不进最终的二进制程序。",
    tags: ["注释"],
  },
  {
    id: "cic-4",
    chapter: "cpr-introducing-c",
    level: 1,
    question: "C 语言的变量声明必须满足哪两条规则？`int 2ndPlace;` 为什么不对？",
    answer:
      "① 变量先声明后使用——编译器看到使用某变量之前，必须先看到它的声明。② 变量名只能由字母、数字和下划线组成，且不能以数字开头。`2ndPlace` 以数字开头，不合法；正确写法是 `secondPlace` 或 `_2ndPlace`。",
    tags: ["变量声明", "命名规则"],
  },
  {
    id: "cic-5",
    chapter: "cpr-introducing-c",
    level: 1,
    question: "C 语言里 `int num = 10;` 和分两行 `int num; num = 10;` 有区别吗？",
    answer:
      "效果一样——两次都是让 num 的值变成 10。区别在于：第一行是**声明+初始化**同时完成（num 从出生就是 10）；第二行是**先声明、后赋值**（num 先有一段未定义的值，第二行才赋 10）。赋值和初始化的时机不同，但对于这种简单场景最终结果一致。",
    tags: ["变量", "赋值", "初始化"],
  },
  {
    id: "cic-6",
    chapter: "cpr-introducing-c",
    level: 1,
    question: "`printf()` 里的 `%d`、`%f`、`%s` 分别用什么来替换？如果类型和转换说明不匹配会怎样？",
    answer:
      "`%d` 用 int 整数替换（如 `printf(\"%d\", 42)` → 42）。`%f` 用 float/double 浮点数替换（如 `printf(\"%f\", 3.14)` → 3.140000）。`%s` 用 char* 字符串替换（如 `printf(\"%s\", \"Hello\")` → Hello）。类型不匹配时是未定义行为——可能输出乱码、可能给错值、可能崩溃——编译器不会阻止你，但结果不可预期。",
    tags: ["printf", "转换说明"],
  },
  {
    id: "cic-7",
    chapter: "cpr-introducing-c",
    level: 1,
    question: "`printf(\"Hello\\nWorld\");` 输出几行？`\\n` 和 `\\t` 分别是什么？",
    answer:
      "输出两行——Hello 在第一行，World 在第二行，`\\n` 在中间换了行。`\\n` 是换行符（newline），让光标移到下一行开头。`\\t` 是制表符（tab），在输出中插入一段空白（通常跳 4 或 8 个空格宽度）。它们都是「转义序列」——用一个 `\\` 开头告诉 printf 这不是普通字符。",
    tags: ["printf", "转义序列"],
  },

  // ── L2 理解：原因 / 机制 ──
  {
    id: "cic-8",
    chapter: "cpr-introducing-c",
    level: 2,
    question: "一个程序只有 main.c 一个文件时，能否调用另一个文件 helper.c 里定义的函数？如果可以，需要怎么做？",
    answer:
      "可以，但需要三步：① helper.c 里定义那个函数（写实现）。② main.c 里在使用前先声明这个函数的原型（如 `void sayHello(void);`），或者把声明写进 helper.h 然后用 `#include \"helper.h\"` 引入。③ 编译时把两个文件一起喂给 gcc：`gcc main.c helper.c -o app`，链接器会把两个 .o 拼在一起。",
    tags: ["多文件编译", "函数声明"],
  },
  {
    id: "cic-9",
    chapter: "cpr-introducing-c",
    level: 2,
    question: "变量 `int num;` 声明以后、在赋值之前，它的值是什么？能不能直接用？",
    answer:
      "它的值是不确定的——取决于那块内存里上一次留下的数据是什么。这就是「未初始化变量」。在 C 里使用未初始化的变量是未定义行为：不同的编译器、不同的运行环境下可能出不同的值（有时候是 0、有时候是随机数），程序的结果不可预期。所以永远先赋值再用。",
    tags: ["变量", "未初始化"],
  },
  {
    id: "cic-10",
    chapter: "cpr-introducing-c",
    level: 2,
    question: "gcc 分步编译 `gcc -c main.c` 和一步到位 `gcc main.c -o app` 的区别是什么？什么时候需要用 `-c`？",
    answer:
      "`gcc -c main.c` 只做前三道工位（预处理 + 编译 + 汇编），产出 `main.o` 目标文件，**不链接**。`gcc main.c -o app` 跑完全部四道工位，直接出可执行文件。当你只有一个文件时用一步到位；当你需要把多个 .c 各自编译成 .o、再一起链接时（多文件项目），就先用 `-c` 各编各的，最后一条 gcc 命令拼接。",
    tags: ["编译", "gcc", "分步编译"],
  },
  {
    id: "cic-11",
    chapter: "cpr-introducing-c",
    level: 2,
    question: "C 语言中，`float weight = 68.5;` 和 `int weight = 68.5;` 有什么不同？为什么？",
    answer:
      "第一行用 float 存储 68.5，结果 weight=68.5（小数被正确保留），占用约 4 字节。第二行用 int 存储 68.5——小数部分被「截断」丢弃（不是四舍五入），结果 weight=68，占用约 4 字节。类型决定了变量能存什么值以及怎么存。",
    tags: ["类型", "变量", "截断"],
  },
  {
    id: "cic-12",
    chapter: "cpr-introducing-c",
    level: 2,
    question: "`printf(\"%d %d\", a, b);` 与 `printf(\"%d %d\", b, a);` 有什么不同？括号里参数的顺序重要吗？",
    answer:
      "非常重要。printf 从左到右读取格式字符串里的转换说明，依次用后面参数列表的值来填——第 1 个 `%d` 对应第 1 个参数，第 2 个 `%d` 对应第 2 个参数。把 a 和 b 的顺序交换，屏幕上的两个数字就会对调。编译器不会帮你检查顺序是否正确。",
    tags: ["printf", "参数顺序"],
  },

  // ── L3 应用：分析 / 预测 / 修代码 ──
  {
    id: "cic-13",
    chapter: "cpr-introducing-c",
    level: 3,
    question:
      "下面这段代码有什么问题？怎么修？\n```c\n#include <stdio.h>\nint main(void) {\n    int num;\n    printf(\"num = %d\\n\", num);\n    return 0;\n}\n```",
    answer:
      "问题：num 只声明了，没有赋初值。它存着一个不确定的垃圾值，printf 会输出一个随机的数字。修复：声明时直接初始化——`int num = 0;` 或在使用前先赋值——`int num; num = 0; printf(...)`。永远不要在赋值前读取变量的值。",
    tags: ["未初始化", "bug"],
  },
  {
    id: "cic-14",
    chapter: "cpr-introducing-c",
    level: 3,
    question:
      "下面两个 printf，哪个会有问题？为什么？\n```c\nint a = 5;\nfloat b = 3.14;\nprintf(\"a=%f, b=%d\\n\", a, b);\nprintf(\"a=%d, b=%f\\n\", a, b);\n```",
    answer:
      "第一行有问题：`%f` 期望 float/double，却收到了 int a=5——int 和 float 在内存里的存储格式完全不同，printf 按错误的格式解读 a 的二进制，输出一个很奇怪的数字。第二行是正确的：`%d` 对 int，`%f` 对 float，类型匹配。记住：转换说明的类型必须和后面参数的实际类型一一对应。",
    tags: ["printf", "类型匹配"],
  },
  {
    id: "cic-15",
    chapter: "cpr-introducing-c",
    level: 3,
    question:
      "你有一个 `main.c` 调用了 `helper.c` 里的 `int add(int x, int y)` 函数。编译时 `gcc main.c -o app` 报错 `undefined reference to 'add'`。问题出在哪？怎么修？",
    answer:
      "问题出在链接阶段：main.c 里（通过声明或头文件）告诉了编译器 add 函数存在，编译器编译 main.c 时只在调用处留下一个「空洞」。但 `gcc main.c` 这条命令里没有把 helper.c 一起喂给链接器——链接器在所有的 .o 和库都找不到 add 的实际实现，于是报 `undefined reference`。修复：`gcc main.c helper.c -o app`，把两个 .c 文件一起编译链接。",
    tags: ["链接", "多文件", "undefined reference"],
  },
  {
    id: "cic-16",
    chapter: "cpr-introducing-c",
    level: 3,
    question:
      "下面这段代码的输出是什么？按 printf 的工作方式，逐段解释屏幕上会出现什么。\n```c\nint apples = 3;\nfloat price = 4.5;\nprintf(\"我有 %d 个苹果，每个 %.1f 元\\n\", apples, price);\n```",
    answer:
      "输出：`我有 3 个苹果，每个 4.5 元`（然后换行）。逐段解释：\"我有 \" 原样输出 → %d 被 apples 的值 3 替换 → \" 个苹果，每个 \" 原样输出 → %.1f 被 price 的值 4.5 替换（保留 1 位小数）→ \" 元\" 原样输出 → \\n 产生换行。格式字符串就像一个「模板」——普通文字照抄，百分号打头的转换说明被对应参数的值替换。",
    tags: ["printf", "格式字符串"],
  },

  // ── L4 综合：手写 / 设计 ──
  {
    id: "cic-17",
    chapter: "cpr-introducing-c",
    level: 4,
    question:
      "写一个完整的 C 程序：声明 int 变量 days 并初始化为 365，float 变量 avgTemp 并初始化为 23.5，然后分别用一行 printf 输出这两个变量。输出格式如「一年有 365 天，某地年平均气温 23.5 度」。",
    answer:
      '```c\n#include <stdio.h>\n\nint main(void) {\n    int days = 365;\n    float avgTemp = 23.5;\n    printf("一年有 %d 天\\n", days);\n    printf("某地年平均气温 %.1f 度\\n", avgTemp);\n    return 0;\n}\n```\n\n注意：① `#include <stdio.h>` 不可少，否则 printf 不能用；② 变量名 days/avgTemp 合法（字母开头、无空格）；③ `%d` 对应 int、`%f` 对应 float——类型不能写错。',
    tags: ["完整程序", "printf", "变量"],
  },
  {
    id: "cic-18",
    chapter: "cpr-introducing-c",
    level: 4,
    question:
      '设计一个两文件程序：main.c 里调用一个函数 `void greet(void)` 输出 "Hello from C!"；greet 函数定义在 greet.c 里。写出 main.c 和 greet.c 的完整代码，以及编译命令。',
    answer:
      "main.c：\n```c\n#include <stdio.h>\nvoid greet(void);  /* 声明函数的原型——告诉编译器这个函数存在 */\n\nint main(void) {\n    printf(\"main 函数在调用 greet...\\n\");\n    greet();\n    return 0;\n}\n```\n\ngreet.c：\n```c\n#include <stdio.h>\n\nvoid greet(void) {\n    printf(\"Hello from C!\\n\");\n}\n```\n\n编译命令：`gcc main.c greet.c -o app`\n\n关键点：① main.c 里必须先声明 greet 的原型（否则编译器不认识），② 编译时两个 .c 文件一起喂给 gcc——链接器会在 greet.o 里找到 greet 的实现地址，填进 main.o 的调用处。",
    tags: ["多文件", "函数声明", "编译"],
  },
];

// 共 18 题 (L1×7, L2×5, L3×4, L4×2)
