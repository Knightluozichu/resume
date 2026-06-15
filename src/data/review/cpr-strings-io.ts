/** 复习题库 · C 字符串和格式化输入/输出（cpr-strings-io）。C Primer Plus §4 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cprStringsIOQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "csio-1",
    chapter: "cpr-strings-io",
    level: 1,
    question: "C 语言的字符串在底层是什么？如何标记字符串的结束？",
    answer:
      "C 字符串底层是 char 类型的数组——字符一个接一个连续排列在内存中。字符串的结束由空字符 \\0（ASCII 0）标记。没有 \\0 的不是字符串，只是普通字符数组。",
    tags: ["字符串", "\\0", "char数组"],
  },
  {
    id: "csio-2",
    chapter: "cpr-strings-io",
    level: 1,
    question: "`strlen(\"Hello\")` 和 `sizeof(\"Hello\")` 的结果分别是多少？为什么不同？",
    answer:
      "`strlen(\"Hello\")` 返回 5——它从第一个字符 H 开始数，数到 \\0 就停，\\0 不计入。`sizeof(\"Hello\")` 返回 6——C 编译器自动给 \"Hello\" 末尾加上 \\0，sizeof 计算了包括 \\0 在内的全部 6 个字节。两者差 1，不是 bug，是 C 的设计。",
    tags: ["strlen", "sizeof", "\\0", "字符串字面值"],
  },
  {
    id: "csio-3",
    chapter: "cpr-strings-io",
    level: 1,
    question: "printf 的格式说明通式是什么？列出四个字段各自的含义。",
    answer:
      "通式：`%[标志][宽度][.精度]类型`。① 标志（-+/#/0）：控制对齐、正负号显隐、前缀显示、补零；② 宽度：输出至少占用多少个字符位（默认右对齐，加 - 左对齐）；③ .精度：对于浮点数控制小数点后位数，对于字符串控制最多打印字符数；④ 类型（d/f/s/c/u/x）：必选，告诉 printf 参数是什么类型。",
    tags: ["printf", "格式说明", "标志", "宽度", "精度"],
  },
  {
    id: "csio-4",
    chapter: "cpr-strings-io",
    level: 1,
    question: "`%10d`、`%-10d`、`%010d`、`%+d` 分别表示什么含义？",
    answer:
      "`%10d`：总宽度至少 10 个字符，右对齐（数字在右边，左边填空格）。`%-10d`：总宽度 10 个字符，左对齐（数字在左边，右边填空格）。`%010d`：总宽度 10 个字符，左边用 0 而不是空格填充。`%+d`：强制显示正负号——正数前面也会显示 +。",
    tags: ["printf", "宽度", "对齐", "补零", "正号"],
  },
  {
    id: "csio-5",
    chapter: "cpr-strings-io",
    level: 1,
    question: "scanf 读取数据时，为什么普通变量必须加 `&`，而字符数组名不需要？",
    answer:
      "scanf 需要知道数据该写到哪里——也就是变量的**内存地址**。普通变量（int、float 等）的名字代表值，不是地址——所以必须用 `&` 取地址：`scanf(\"%d\", &n)`。数组名的值本身就是数组首元素的地址——`name` 等价于 `&name[0]`——所以 `scanf(\"%s\", name)` 不需要再加 &。这是 C 语言里数组名和普通变量的核心区别。",
    tags: ["scanf", "&", "取地址", "数组名"],
  },
  {
    id: "csio-6",
    chapter: "cpr-strings-io",
    level: 1,
    question: "gets() 函数有什么安全问题？C 标准推荐用什么来替代它？",
    answer:
      "gets() 不知道目标数组有多大——用户输入超过数组大小的内容会继续往内存写，覆盖栈上其他数据，这是经典的「缓冲区溢出」漏洞。C11 标准已正式删除 gets()。推荐用 `fgets(数组名, sizeof(数组), stdin)` 替代——第三个参数 `sizeof` 保证了 fgets 知道数组能装多少，最多读 sizeof(数组)-1 个字符，留一个位置给 \\0。",
    tags: ["gets", "fgets", "缓冲区溢出", "安全"],
  },

  // ── L2 理解：为什么 / 机制 ──
  {
    id: "csio-7",
    chapter: "cpr-strings-io",
    level: 2,
    question: "`char str[5] = \"Hello\";` 编译能通过，但运行时 `printf(\"%s\", str)` 输出乱码——为什么？如果 strlen 和 sizeof 都数不到 \\0，会有什么后果？",
    answer:
      "\"Hello\" 需要 6 个字节（5 个字母 + 1 个 \\0），但数组只分配了 5 个字节。编译器把 5 个字符塞进去，没有空间放 \\0。printf 的 %s 输出时从 str 首地址开始读，读不到 \\0 就一直往后读——把紧跟在 str 后面的内存内容也当字符串输出了，直到偶然遇到一个值为 0 的字节才停。strlen 同理——没遇到 \\0 就一直往后数，结果不可预测。这就是为什么声明字符数组要留给 \\0 的位置。",
    tags: ["\\0缺失", "数组大小", "字符串越界"],
  },
  {
    id: "csio-8",
    chapter: "cpr-strings-io",
    level: 2,
    question: "为什么 printf 的输出有自己的缓冲区？如果 `printf(\"Hello\")` 后不写 `\\n` 也不调用 `fflush`，可能发生什么？",
    answer:
      "输出缓冲区的设计是为了减少系统调用——每次往显示器写一个字符的系统开销很大，攒一批一起写效率高得多。printf 把格式化后的内容先放到 stdout 缓冲区，遇到 \\n 或缓冲区满时一起刷新到控制台。如果没有 \\n 且不调 fflush(stdout)，\"Hello\" 可能一直待在缓冲区里直到程序退出才刷出来——用户在程序运行期间看不到这行输出。这也是为什么调试时 printf 要记得加 \\n。",
    tags: ["缓冲区", "printf", "fflush", "\\n"],
  },
  {
    id: "csio-9",
    chapter: "cpr-strings-io",
    level: 2,
    question: "`scanf(\"%d\")` 和 `scanf(\"%d \")` 的行为有什么不同？为什么在格式串尾部加空格是个坑？",
    answer:
      "`%d` 读取数字遇到非数字字符就停（如空格），scanf 返回。但 `%d `（%d 后面多了一个空格）告诉 scanf「读完 %d 后再跳过所有空白字符，**直到遇到一个非空白字符才返回**」——也就是你输入 42 回车后 scanf 不会返回，它还在等一个非空白字符。用户以为程序卡死了，其实是 scanf 在格式串末尾的空格指示它继续跳过后续空白。规则：格式串末尾不要放无关空格。",
    tags: ["scanf", "格式串空格陷阱"],
  },
  {
    id: "csio-10",
    chapter: "cpr-strings-io",
    level: 2,
    question: "`fgets` 和 `gets` 在读入一行文字时的行为有哪些区别？为什么 `fgets` 读到的字符串末尾可能会有 `\\n`？",
    answer:
      "三个核心区别：① fgets 有长度限制（第二个参数指定了最多读多少字符），gets 没有——这是最危险的差异；② fgets 会把遇到的换行符 \\n 也读入字符串（除非一行刚好填满缓冲区），gets 会丢弃 \\n；③ fgets 有第三个参数可以指定从哪个流读取（stdin 就是键盘，也可以从文件读），gets 只能从 stdin 读。fgets 保留 \\n 的好处是你可以通过检查末尾是否是 \\n 来判断一行是否被截断。",
    tags: ["fgets", "gets", "换行符", "\\n"],
  },

  // ── L3 应用：读代码 / 排错 ──
  {
    id: "csio-11",
    chapter: "cpr-strings-io",
    level: 3,
    question:
      "下面代码的预期行为不一致——从 `scanf` 切换到 `getchar` 时输入\"被跳过了\"。找出问题原因并写出两种修正方案。\n```c\nint n; char ch;\nprintf(\"输入一个数字: \");\nscanf(\"%d\", &n);\nprintf(\"输入一个字符: \");\nch = getchar();\nprintf(\"数字=%d, 字符=[%c]\\n\", n, ch);\n```",
    answer:
      "原因：scanf(\"%d\", &n) 读取数字 42 后，回车键产生的 \\n 留在输入缓冲区。紧接着 getchar() 立刻从缓冲区读到了这个 \\n——它不需要等待用户按新字符。ch 变成 \\n，看起来像 getchar \"被跳过\"。\n\n修正方案①：在 scanf 后加一行 `while (getchar() != '\\n');`——循环吃掉所有残留字符直到换行。\n修正方案②：在 getchar 前加 `scanf(\" %c\", &ch);` 替代 getchar——%c 前面加一个空格会跳过所有前置空白（包括 \\n）。\n\n根本教训：scanf 只取走自己匹配到的内容，剩下的留在缓冲区等你下次来取。",
    tags: ["scanf", "缓冲区残留", "getchar", "排错"],
  },
  {
    id: "csio-12",
    chapter: "cpr-strings-io",
    level: 3,
    question:
      "`printf(\"|%-10.3f|\\n\", 3.14159);` 输出什么？逐一解释 `-`、`10`、`.3` 各自的作用。",
    answer:
      "输出 `|3.142     |`。① `-`：左对齐——数字靠左，右边填空格。② `10`：总宽度至少 10 个字符（含小数点和小数位）。`3.142` 占了 5 个字符（3/.1/4/2），右边填 5 个空格达到 10。③ `.3`：保留 3 位小数——3.14159 的四舍五入结果是 3.142。整个过程：先计算值 → 按精度四舍五入 → 按对齐和宽度填位。",
    tags: ["printf", "格式组合", "左对齐", "精度"],
  },
  {
    id: "csio-13",
    chapter: "cpr-strings-io",
    level: 3,
    question:
      "`printf(\"%d %% %d = %d\\n\", 10, 3, 10 % 3);` 输出什么？为什么要写 `%%` 而不是一个 `%`？",
    answer:
      "输出 `10 % 3 = 1`。`10 % 3` 是求余运算符（模运算），结果是 1。在 printf 格式串里，单独的 `%` 是格式说明的起始符——printf 看到 `%` 就去找后面的类型字母。如果你想输出一个百分号字符本身，必须用 `%%` 来「转义」——第一个 % 告诉 printf \"格式说明来了\"，第二个 % 表示 \"格式说明的内容——就是输出一个 %\"。这是 printf 自身的转义规则，和 \\\\ 表示一个反斜杠同理。",
    tags: ["printf", "%%", "转义", "模运算"],
  },
  {
    id: "csio-14",
    chapter: "cpr-strings-io",
    level: 3,
    question:
      "读下面的程序，写出每一行 printf 的输出，并解释 `strlen(arr)` 和 `sizeof(arr)` 的差别。\n```c\nchar arr[] = { 'A','B','C' };\nprintf(\"strlen = %zu\\n\", strlen(arr));\nprintf(\"sizeof = %zu\\n\", sizeof(arr));\n```",
    answer:
      "这段代码有**问题**。`char arr[] = {'A','B','C'};` 是逐个字符初始化——编译器**不会**自动给你加 \\0！`arr` 只有 3 个字节（A/B/C），没有 \\0。`sizeof(arr)` 可以正常返回 3，但 `strlen(arr)` 从 arr[0] 开始数 \\0——它在内存里 arr[2] 之后找到的第一个 0 字节可能在第 3 个字节后很远的地方，返回一个不可预测的大数字。`{\"ABC\"}`（双引号）才会自动加 \\0——`{'A','B','C'}`（单引号+大括号）不会——这是 C 初学者容易混淆的细节。",
    tags: ["strlen", "sizeof", "初始化差异", "\\0", "排错"],
  },
  {
    id: "csio-15",
    chapter: "cpr-strings-io",
    level: 3,
    question:
      "以下两段代码的 printf 输出各是什么？为什么结果不同？\n```c\n// 代码 A\nint x = 5 / 2;\nprintf(\"%d\\n\", x);\n\n// 代码 B\nfloat y = 5.0f / 2.0f;\nprintf(\"%.1f\\n\", y);\n```",
    answer:
      "代码 A 输出 `2`——5/2 是整数除法，结果截断为 2。代码 B 输出 `2.5`——5.0f/2.0f 是浮点除法，保留小数。关键区别在于除法运算符 `/` 的行为取决于操作数的类型：两个 int 做整数除法、两个 float 或一个 float 一个 int 做浮点除法。用 printf 输出时格式说明必须跟变量类型匹配——int 用 %d、float 用 %f。",
    tags: ["整数除法", "浮点除法", "printf", "类型"],
  },

  // ── L4 综合：陷阱 / 全流程 ──
  {
    id: "csio-16",
    chapter: "cpr-strings-io",
    level: 4,
    question:
      "设计一个程序：用 fgets 读取用户输入的一行文字（可能带空格），用 strlen 求长度，然后以五种不同的 printf 格式输出同一段文字：① 默认、② 右对齐宽度50、③ 左对齐宽度30、④ 只显示前10个字符（%.10s）、⑤ 居右宽度20且只显示前5个字符（%20.5s）。写出完整程序。",
    answer:
      "```c\n#include <stdio.h>\n#include <string.h>\nint main(void) {\n    char line[128];\n\n    printf(\"请输入一行文字：\");\n    fgets(line, sizeof(line), stdin);\n\n    // 去掉 fgets 留下的 \\n（可选）\n    line[strcspn(line, \"\\n\")] = '\\0';\n\n    printf(\"\\n原长度 = %zu\\n\\n\", strlen(line));\n    printf(\"① 默认输出:  [%s]\\n\", line);\n    printf(\"② 右对齐50:  [%50s]\\n\", line);\n    printf(\"③ 左对齐30:  [%-30s]\\n\", line);\n    printf(\"④ 前10字符:  [%.10s]\\n\", line);\n    printf(\"⑤ 右20精5:   [%20.5s]\\n\", line);\n\n    return 0;\n}\n```\n\n核心知识点：`%s` 可以和宽度（数字）、精度（.数字）、对齐标志（-）自由组合——`%20.5s` 就是宽度 20、精度 5、默认右对齐的字符串。",
    tags: ["fgets", "printf组合", "综合实现"],
  },
  {
    id: "csio-17",
    chapter: "cpr-strings-io",
    level: 4,
    question:
      "解释以下程序的问题：为什么输入 `42` 后程序没有等待第二个输入就输出了？写出两种修正方案。\n```c\nint n; char ch;\nscanf(\"%d\", &n);\nscanf(\"%c\", &ch);\nprintf(\"n=%d ch=[%c](ASCII=%d)\\n\", n, ch, ch);\n```",
    answer:
      "问题：scanf(\"%d\", &n) 读到 42 停止，回车键 \\n 留在缓冲区。第二个 scanf(\"%c\", &ch) 立即从缓冲区读到了 \\n，不需要用户再次输入。输出变成 ch=[换行](ASCII=10)。\n\n修正方案①：在第二个 scanf 的 %c 前加空格——`scanf(\" %c\", &ch);`——格式串前面的空格告诉 scanf 跳过所有空白字符（空格、\\n、\\t）。\n\n修正方案②：在两个 scanf 之间加 `getchar();` 吃掉残留的 \\n——但要注意如果用户输入了多个空格或额外字符，一个 getchar 吃不完。\n\n根本原理：scanf 的 %d/%f/%s 默认跳过前导空白，但 %c 不跳过——它会读到缓冲区里的下一个字符（不管是不是空白）。解决方案要么在 %c 前手动加空格，要么用 fgets 彻底替换 scanf。",
    tags: ["scanf", "缓冲区残留", "%c", "综合排错"],
  },
  {
    id: "csio-18",
    chapter: "cpr-strings-io",
    level: 4,
    question:
      "用 fgets 而非 scanf 实现一个交互式程序：分三次分别读入姓名（可能含空格）、年龄（整数）、分数（浮点数），每次输入前给出清晰的提示，最后用 printf 的格式控制把信息打印成对齐美观的表格。写出完整程序。",
    answer:
      "```c\n#include <stdio.h>\n#include <string.h>\n#include <stdlib.h>\nint main(void) {\n    char name[64], buf[64];\n    int age;\n    float score;\n\n    printf(\"请输入姓名：\");\n    fgets(name, sizeof(name), stdin);\n    name[strcspn(name, \"\\n\")] = '\\0';  // 去掉 \\n\n\n    printf(\"请输入年龄：\");\n    fgets(buf, sizeof(buf), stdin);\n    age = atoi(buf);  // 字符串 → 整数\n\n    printf(\"请输入分数：\");\n    fgets(buf, sizeof(buf), stdin);\n    score = atof(buf); // 字符串 → 浮点数\n\n    printf(\"\\n\");\n    printf(\"%-16s %5s %8s\\n\",   \"姓名\", \"年龄\", \"分数\");\n    printf(\"%-16s %5s %8s\\n\",   \"────\", \"──\", \"──\");\n    printf(\"%-16s %5d %8.1f\\n\", name, age, score);\n\n    return 0;\n}\n```\n\n关键设计选择：全用 fgets 避免 scanf 的缓冲区残留问题。整数和浮点数使用 atoi/atof 从字符串转换——这样你永远不用跟 scanf 的 %d 和 & 较劲。fgets 的第三个参数 sizeof 保证了不会溢出。",
    tags: ["fgets", "atoi", "atof", "表格输出", "综合实现"],
  },
];

export default cprStringsIOQuestions;
