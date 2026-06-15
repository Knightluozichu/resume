/** 复习题库 · C 数据和C（cpr-data-and-c）。C Primer Plus §3 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cprDataAndCQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "cdc-1",
    chapter: "cpr-data-and-c",
    level: 1,
    question: "C 语言的基本数据类型分哪三大类？每类举出两个具体类型。",
    answer:
      "整型类（short、int、long、long long）、浮点型类（float、double、long double）、字符型（char）。共三大类。",
    tags: ["基本类型", "分类"],
  },
  {
    id: "cdc-2",
    chapter: "cpr-data-and-c",
    level: 1,
    question: "在 64 位 Linux/macOS 上，`int`、`double`、`char` 各占多少字节？",
    answer:
      "`int` 占 4 字节，`double` 占 8 字节，`char` 占 1 字节（C 标准规定 `sizeof(char)` 永远为 1）。",
    tags: ["sizeof", "int", "double", "char"],
  },
  {
    id: "cdc-3",
    chapter: "cpr-data-and-c",
    level: 1,
    question: "`short`、`long`、`long long` 这三个修饰符各有什么作用？`long` 在不同平台上一致吗？",
    answer:
      "`short` 缩小整型（通常 2 字节），`long` 拉长整型（至少 4 字节，≥ int），`long long` 超级拉长（至少 8 字节）。`long` 在不同平台上不一致——Windows 上 long 是 4 字节，Linux/macOS 上是 8 字节。",
    tags: ["修饰符", "short", "long", "long long"],
  },
  {
    id: "cdc-4",
    chapter: "cpr-data-and-c",
    level: 1,
    question: "`unsigned int` 和 `signed int` 的核心区别是什么？分别能存什么范围的值（32 位平台上）？",
    answer:
      "核心区别在于最高位的解读方式。`signed int` 使用补码，一半范围给负数：−2,147,483,648 ~ 2,147,483,647。`unsigned int` 只存 ≥0：0 ~ 4,294,967,295。同一个二进制位模式，signed 和 unsigned 解读出的值完全不同。",
    tags: ["unsigned", "signed", "补码"],
  },
  {
    id: "cdc-5",
    chapter: "cpr-data-and-c",
    level: 1,
    question: "`float` 和 `double` 的有效数字分别是几位？写 `3.14` 默认是什么类型？要显式写 `float` 该怎么做？",
    answer:
      "`float` 约 6 位有效数字，`double` 约 15 位有效数字。不加后缀的小数字面值 `3.14` 默认是 `double` 类型。要显式写 `float`，末尾加 `f` 或 `F`：`3.14f`。",
    tags: ["float", "double", "字面值", "后缀"],
  },
  {
    id: "cdc-6",
    chapter: "cpr-data-and-c",
    level: 1,
    question: "`printf` 的 `%d`、`%f`、`%c`、`%u`、`%ld`、`%lld` 分别对应什么类型？",
    answer:
      "`%d` → int（有符号整数）、`%f` → float/double（浮点数）、`%c` → char（字符）、`%u` → unsigned int（无符号整数）、`%ld` → long、`%lld` → long long。占位符必须跟参数类型严格对应——错了不报错但输出乱码。",
    tags: ["printf", "格式占位符"],
  },
  {
    id: "cdc-7",
    chapter: "cpr-data-and-c",
    level: 1,
    question: "说出 `\\n`、`\\t`、`\\\\`、`\\\"`、`\\0` 这五个转义序列各自的含义。",
    answer:
      "`\\n` = 换行（LF，光标到下下一行开头）、`\\t` = 水平制表（Tab，跳到下一个制表位）、`\\\\` = 反斜杠字符本身、`\\\"` = 双引号字符本身（字符串里写引号）、`\\0` = 空字符（NUL，ASCII 0，标记字符串结束）。",
    tags: ["转义序列", "escape sequence"],
  },
  {
    id: "cdc-8",
    chapter: "cpr-data-and-c",
    level: 1,
    question: "C 语言声明常量的三种方式是什么？各有什么特点？",
    answer:
      "① `#define PI 3.14159`——预处理器宏，纯文本替换，没有类型检查，不占内存。② `const int D = 7;`——常变量，有类型，占内存但只读，编译器能检查。③ `enum { RED, GREEN, BLUE };`——枚举常量，给一组相关整数起名字，默认从 0 递增。",
    tags: ["常量", "#define", "const", "enum"],
  },

  // ── L2 理解：为什么 / 机制 ──
  {
    id: "cdc-9",
    chapter: "cpr-data-and-c",
    level: 2,
    question: "为什么 C 语言要同时有 `int`、`short`、`long`、`long long` 四种整型？只留一个 `int` 不行吗？",
    answer:
      "不同场景对内存和范围的需求不同。嵌入式设备内存紧缺，用 `short`（2 字节）省空间；日常计算 `int`（4 字节）刚好；处理大文件尺寸或时间戳（可能 >21 亿）必须用 `long` 或 `long long`（8 字节）。全部用最大号的长整型会浪费内存——C 让你在不同时空间按需选择。",
    tags: ["整型大小", "内存", "设计考量"],
  },
  {
    id: "cdc-10",
    chapter: "cpr-data-and-c",
    level: 2,
    question: "既然 `double` 精度比 `float` 高那么多，为什么 C 还要保留 `float`？直接用 `double` 不是更好吗？",
    answer:
      "`float` 只占 4 字节（double 的一半），在 GPU 图形计算、嵌入式、大量浮点数组中，内存和带宽是关键瓶颈——用 `float` 能省下 50% 空间。另外 GPU 的大规模并行计算对 `float` 做了极致优化，`double` 性能可能慢很多。日常推荐 `double` 因为精度够、现代 CPU 对 double 计算已经很快。",
    tags: ["float", "double", "精度", "内存权衡"],
  },
  {
    id: "cdc-11",
    chapter: "cpr-data-and-c",
    level: 2,
    question: "`unsigned int u = 0; u = u - 1;` 后 u 是多少？为什么不是 −1？这个现象叫什么？",
    answer:
      "u 变成 4294967295（32 位平台上 unsigned int 的最大值，即 2³²−1）。原因是 `unsigned` 类型不能表示负数——0 减 1 在无符号的规则下发生了「回绕（wrap-around）」，相当于模 2³² 运算。这不是 bug，是 C 标准定义的无符号整型的合法行为。",
    tags: ["unsigned", "回绕", "wrap-around"],
  },
  {
    id: "cdc-12",
    chapter: "cpr-data-and-c",
    level: 2,
    question: "为什么 `char` 类型既可以用 `%c` 当字符输出，又可以用 `%d` 当整数输出？这两种解读方式说明了什么？",
    answer:
      "因为在计算机内部，`char` 存的就是一个整数（ASCII 码）——'A' 和 65 在底层是完全一样的二进制。`%c` 告诉 printf「把这段数据当字符解释和显示」、`%d` 告诉 printf「把这段数据当整数解释和显示」。这恰好说明了类型的核心意义：同样的二进制数据，解读方式不同，呈现的结果就不同。",
    tags: ["char", "ASCII", "类型解读"],
  },
  {
    id: "cdc-13",
    chapter: "cpr-data-and-c",
    level: 2,
    question: "`float f = 1.0 / 3.0;` 和 `float f = 1.0f / 3.0f;` 有什么区别？结果精度一样吗？",
    answer:
      "第一条：`1.0` 和 `3.0` 是 double 字面值，除法按 double 精度计算（15 位有效数字），结果再截断赋给 float——赋给 float 的那一步丢失了精度，但除的时候是高精度。第二条：`1.0f` 和 `3.0f` 是 float 字面值，除法按 float 精度计算（6 位有效数字），全程都是低精度。通常第一条的结果更准——先在 double 里算出高精度结果，截断损失比全程 float 小。",
    tags: ["float", "double", "字面值类型", "精度"],
  },
  {
    id: "cdc-14",
    chapter: "cpr-data-and-c",
    level: 2,
    question: "`#define` 和 `const` 都能定义常量，两者有什么本质不同？什么时候该用哪个？",
    answer:
      "`#define` 是预处理器文本替换——在编译前就把代码里的名字全部换成值，没有类型、不分配内存、调试器里看不到变量名。`const` 是真正的变量——有类型、占内存、编译器能检查类型、调试器能跟踪。一般规则：单纯的数值常量（π、MAX_SIZE）用 `#define` 简单；需要类型安全（参数、数组大小）或者会被取地址的，用 `const`。",
    tags: ["#define", "const", "预处理", "类型安全"],
  },

  // ── L3 应用：读代码 / 排错 ──
  {
    id: "cdc-15",
    chapter: "cpr-data-and-c",
    level: 3,
    question:
      "下面代码有什么问题？指出每处问题。\n`int a = 5, b = 2;`\n`float c = a / b;`\n`printf(\"c = %d\\n\", c);`",
    answer:
      "两处问题：① `float c = a / b;`——`a / b` 是整数除法，得 2，赋给 c 后 c = 2.0，不是你以为的 2.5。② `printf(\"%d\", c);`——占位符 %d 期望 int，实际 c 是 float，输出乱码。应该用 %f。修正：`float c = (float)a / b;` + `printf(\"%f\\n\", c);`。",
    tags: ["整数除法", "printf占位符", "排错"],
  },
  {
    id: "cdc-16",
    chapter: "cpr-data-and-c",
    level: 3,
    question:
      "`printf(\"%d\\n\", 3.14);` 输出一个奇怪的大整数（如 1374389535），为什么？编译器为什么不报错？",
    answer:
      "因为 %d 告诉 printf「下一个参数是 4 字节的有符号 int」，但 3.14 是 8 字节的 double。printf 只取了 double 二进制表示的前 4 个字节当 int 解读——得到的是 double 的二进制片段对应的整数，当然不是 3。编译器不报错是因为 printf 是变参函数——类型检查在变参部分被绕过了，这是 C 语言的历史包袱。",
    tags: ["printf", "类型不匹配", "变参函数"],
  },
  {
    id: "cdc-17",
    chapter: "cpr-data-and-c",
    level: 3,
    question:
      "`char c = 'A';` 和 `char c = 65;` 两种写法有区别吗？`printf(\"%d\\n\", 'A');` 输出多少？",
    answer:
      "两种写法完全等价——在 C 中，字符常量 `'A'` 的类型本质上是 `int`（不是 char！），其值就是 ASCII 码 65。赋给 char 变量时发生 int→char 的隐式转换。`printf(\"%d\\n\", 'A');` 输出 65——因为 `'A'` 作为 int 类型传递给 printf，%d 按整数输出。C 的这个特性意味着 `'A' + 1` 的结果是 66（即 `'B'`）。",
    tags: ["char", "字符常量", "ASCII"],
  },
  {
    id: "cdc-18",
    chapter: "cpr-data-and-c",
    level: 3,
    question:
      "`unsigned short s = -1; printf(\"%hu\\n\", s);` 输出 65535。解释这个结果是怎么来的。",
    answer:
      "−1 在计算机的 16-bit 二进制补码表示中是 11111111 11111111（全 1）。当用 `unsigned short` 解读这个位模式时，最高位不再是符号位——全 1 解读为 2¹⁶−1 = 65535。这就是「同一段二进制，signed 看是 −1，unsigned 看是 65535」。%hu 是正确的 unsigned short 占位符，输出 65535。",
    tags: ["unsigned", "short", "补码", "位模式"],
  },
  {
    id: "cdc-19",
    chapter: "cpr-data-and-c",
    level: 3,
    question:
      "编写 printf 格式串：输出一个 double 变量 pi = 3.14159，要求保留 2 位小数、左对齐、总宽度 10 个字符。写出格式串和完整语句。",
    answer:
      "`printf(\"pi = %-10.2f\\n\", pi);`。`%-` 表示左对齐，`10` 是总宽度（含小数点和小数位），`.2` 是保留 2 位小数，`f` 对应 double 类型。输出结果：`pi = 3.14      `（后面有空格填满 10 个字符宽度）。",
    tags: ["printf", "格式化", "宽度", "精度"],
  },

  // ── L4 综合：陷阱 / 全流程 ──
  {
    id: "cdc-20",
    chapter: "cpr-data-and-c",
    level: 4,
    question:
      "设计一个程序：用户输入一个摄氏温度（浮点数），输出对应的华氏温度（F = C × 9/5 + 32）。你要使用正确的类型保证计算精度——能写出两种版本，一种用 `float`，一种用 `double`，并比较两种版本在 0℃ 和 100℃ 时的输出精度差异。",
    answer:
      "```c\n#include <stdio.h>\nint main(void) {\n    float  cf = 0.0f;\n    double cd = 0.0;\n\n    printf(\"输入摄氏温度: \");\n    scanf(\"%lf\", &cd);  // scanf 中 double 用 %lf\n    cf = (float)cd;\n\n    // float 版本\n    float  ff = cf * 9.0f / 5.0f + 32.0f;\n    printf(\"float  F = %.6f\\n\", ff);\n\n    // double 版本\n    double fd = cd * 9.0 / 5.0 + 32.0;\n    printf(\"double F = %.10f\\n\", fd);\n\n    return 0;\n}\n```\n\n输入 100℃ 时：float 输出华氏 212.000000（刚好是整数，精度够），double 输出 212.0000000000。输入 37.5℃ 时：float 输出 99.500000（小数点后才 6 位，开始有舍入误差），double 输出 99.5000000000（更精确）。关键点：`9.0f/5.0f` 和 `9.0/5.0` 分别按 float 和 double 精度做除法。",
    tags: ["浮点运算", "温度转换", "精度对比", "scanf", "综合"],
  },
];

export default cprDataAndCQuestions;
