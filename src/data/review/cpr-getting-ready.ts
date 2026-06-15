/** 复习题库 · C 初识C语言（cpr-getting-ready）。C Primer Plus §1 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cprGettingReadyQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "cpr-1",
    chapter: "cpr-getting-ready",
    level: 1,
    question: "C 语言是哪一年、由谁、在哪里创造的？最初是为了什么目的？",
    answer:
      "1972 年，Dennis Ritchie 在贝尔实验室创造了 C 语言。最初是为了重写 Unix 操作系统——在那之前 Unix 用汇编写，换台机器就要全部重来。",
    tags: ["C语言诞生", "历史"],
  },
  {
    id: "cpr-2",
    chapter: "cpr-getting-ready",
    level: 1,
    question: "C 语言经历了哪几个主要的标准版本？按时间顺序说出名称。",
    answer:
      "K&R C（1978，事实标准）→ C89/ANSI C（1989，第一个正式标准）→ C99（1999）→ C11（2011）→ C18（2018，C11 的修正勘误版）。",
    tags: ["C标准", "历史"],
  },
  {
    id: "cpr-3",
    chapter: "cpr-getting-ready",
    level: 1,
    question: "编程的七个步骤是什么？按顺序说出名称。",
    answer:
      "定义目标 → 设计 → 编写 → 编译 → 运行 → 测试 → 维护。这七步形成一个循环——维护过程中发现新需求或 bug，回到定义目标或设计开始下一轮。",
    tags: ["编程七步骤"],
  },
  {
    id: "cpr-4",
    chapter: "cpr-getting-ready",
    level: 1,
    question: "C 源码的编译过程分哪四道工位？每道工位产出的文件后缀是什么？",
    answer:
      "①预处理 → .i（展开过的纯净 C 代码）；②编译 → .s（汇编语言）；③汇编 → .o（二进制目标文件）；④链接 → 可执行文件（无固定后缀，Linux 无后缀/Windows .exe）。",
    tags: ["编译流水线", "四阶段"],
  },
  {
    id: "cpr-5",
    chapter: "cpr-getting-ready",
    level: 1,
    question: "`printf` 函数的声明在哪个头文件里？`printf` 的实现在哪？",
    answer:
      "声明在 `<stdio.h>` 头文件里（通过预处理 `#include` 粘贴进来）。实现在 C 标准库（libc）的 .o 或 .a 文件里——链接阶段拼接进来。",
    tags: ["头文件", "printf", "链接"],
  },
  {
    id: "cpr-6",
    chapter: "cpr-getting-ready",
    level: 1,
    question: "什么是「可移植性」？C 语言靠什么保证可移植性？",
    answer:
      "可移植性是指同一份 C 源码在不同操作系统和 CPU 上用对应编译器重新编译后，运行行为一致。C 语言靠 C 标准（C89/C99/C11/C18）来保证——只要写的是标准 C，不做编译器特有的扩展，换平台不改代码。",
    tags: ["可移植性", "C标准"],
  },
  {
    id: "cpr-7",
    chapter: "cpr-getting-ready",
    level: 1,
    question: "`int main(void)` 里的 `int`、`main`、`void` 分别是什么意思？",
    answer:
      "`int` 是函数的返回类型——main 会返回一个整数给操作系统。`main` 是函数名——操作系统运行你的程序时第一件事就是钻进 main。`void` 在括号里表示 main 不接受任何命令行参数。",
    tags: ["main函数", "返回值"],
  },

  // ── L2 理解：为什么 / 机制 ──
  {
    id: "cpr-8",
    chapter: "cpr-getting-ready",
    level: 2,
    question: "C89 标准为什么对 C 语言的发展那么重要？没有它之前会有什么问题？",
    answer:
      "C89 之前只有 K&R C 这本「事实标准」——不同公司的编译器对同一段代码的理解可能不同，程序在这里能编译、换到那里就编译不过，或者编译过了但行为不同。C89 第一次把语法、关键字、标准库函数全部用正式文档定死，让所有遵守标准的编译器产出行为一致的程序。",
    tags: ["C标准", "C89", "可移植性"],
  },
  {
    id: "cpr-9",
    chapter: "cpr-getting-ready",
    level: 2,
    question: "预处理阶段把头文件内容「粘贴」进来的行为，和运行时去读取头文件有什么区别？为什么 C 选择在编译前做这件事？",
    answer:
      "C 是编译型语言——一切翻译都在运行前完成。如果编译器不知道头文件里的类型声明，编译阶段就无法做类型检查、生成正确的机器码。运行时读取意味着每次都重新解析，浪费性能且无法提前检查错误。粘贴进来是一次性代价——第一次编译完就再也不用读头文件了。",
    tags: ["预处理", "头文件", "编译型语言"],
  },
  {
    id: "cpr-10",
    chapter: "cpr-getting-ready",
    level: 2,
    question: "汇编器的工作和编译器的工作有什么本质区别？为什么汇编器比编译器快得多？",
    answer:
      "编译器要做复杂的事情：解析 C 语言语法树、做语义分析（类型检查、作用域）、优化代码、最后生成汇编——这是从一种高级语言到另一种语言的深度翻译。汇编器的工作简单得多：汇编指令和机器码几乎是「一对一」的——mov 翻译成某个操作码、寄存器名翻译成编号，没有复杂的分析和优化。",
    tags: ["编译vs汇编", "编译器"],
  },
  {
    id: "cpr-11",
    chapter: "cpr-getting-ready",
    level: 2,
    question: "为什么 `undefined reference` 这种错误要到链接阶段才报，而不是编译阶段？",
    answer:
      "编译阶段每次只看一个 .c 文件——它只检查这个文件内部的语法和类型，不关心你提到的函数在别的文件里有没有实现。链接阶段才把所有 .o 文件和库摆在一起：逐个检查所有符号引用是否都有对应的定义。找到 `printf` 的声明但找不到它的实现机器码，才报 undefined reference。",
    tags: ["链接", "undefined reference", "编译vs链接"],
  },
  {
    id: "cpr-12",
    chapter: "cpr-getting-ready",
    level: 2,
    question: "编程七步骤里，「定义目标」和「设计」两步的区别是什么？可以跳过设计直接写代码吗？",
    answer:
      "定义目标是说「程序要干什么」（What），设计是说「怎么实现它」（How）。比如目标=「管理通讯录」，设计=用结构体存联系人还是用数据库？用户怎么翻页？完全可以跳过设计直接写——但代价是写到一半发现数据结构选错了，推倒重来的工作量可能比前面写的全部代码都大。",
    tags: ["编程七步骤", "设计"],
  },
  {
    id: "cpr-13",
    chapter: "cpr-getting-ready",
    level: 2,
    question: "`#include <stdio.h>` 和 `#include \"mylib.h\"` 的区别是什么？预处理器从哪找这两个文件？",
    answer:
      "`< >` 表示系统标准头文件——预处理器从编译器安装目录的 include 路径（如 /usr/include）中查找。`\" \"` 表示用户自定义头文件——预处理器先从当前源码目录查找，找不到再到系统路径找。所以自己写的头文件用 `\" \"`，系统的用 `< >`。",
    tags: ["头文件", "#include", "预处理"],
  },
  {
    id: "cpr-14",
    chapter: "cpr-getting-ready",
    level: 2,
    question: "main 函数的 `return 0;` 最终被谁接收了？在命令行里怎么知道一个程序返回了什么值？",
    answer:
      "返回值被操作系统接收。在 Linux/macOS 终端里，上一个程序的返回值存在 `$?` 变量里——`echo $?` 就能看到（0 表示正常，非零表示错误）。在 Windows 的 cmd 中，用 `echo %ERRORLEVEL%` 查看。脚本和自动构建系统根据这个值决定下一步做什么——比如编译失败就不跑测试。",
    tags: ["main函数", "return", "exit code"],
  },

  // ── L3 应用：读代码 / 排错 ──
  {
    id: "cpr-15",
    chapter: "cpr-getting-ready",
    level: 3,
    question: "编译报错：`fatal error: 'stdoi.h' file not found`。发生在哪道工位？最可能的原因是什么？怎么修？",
    answer:
      "发生在预处理阶段。最可能的原因是头文件名拼写错误——`stdio.h` 被写成了 `stdoi.h`（io 写反了）。修改：改成正确的 `#include <stdio.h>` 即可。如果拼写正确仍是这个错，检查编译器是否正确安装、标准库路径是否在搜索范围内。",
    tags: ["预处理", "头文件", "排错"],
  },
  {
    id: "cpr-16",
    chapter: "cpr-getting-ready",
    level: 3,
    question: "下面这段代码有几处错误？\n`include <stdio.h>`\n`int main(void)`\n`    printf(\"Hello\");`\n`    return 0;`\n`}`",
    answer:
      "三处错误：①第一行 `include` 前面少了 `#`——预处理器不认识不带 # 的 include，会把它当普通语句报错；②`printf` 那行末尾少了分号 `;`；③`main` 后面少了左大括号 `{`（`int main(void)` 之后必须接 `{` 开始函数体）。",
    tags: ["语法错误", "读代码"],
  },
  {
    id: "cpr-17",
    chapter: "cpr-getting-ready",
    level: 3,
    question: "同事的代码编译时报 `undefined reference to 'print'`。他确定需要一个叫 print 的函数来输出文字。问题出在哪？",
    answer:
      "C 标准库的输出函数叫 `printf`，不是 `print`——少打了一个 `f`。`printf` 是 format print 的意思。链接时在所有 .o 和库里找不到 `print` 这个名字，所以报 undefined reference。把 `print` 改成 `printf` 即可。",
    tags: ["链接", "undefined reference", "printf"],
  },
  {
    id: "cpr-18",
    chapter: "cpr-getting-ready",
    level: 3,
    question: "你用 `gcc hello.c -o hello` 成功编译了一个程序，同事的电脑上同样代码同样命令却报 `'gcc' is not recognized`。最可能的原因是什么？",
    answer:
      "同事的电脑没有安装 GCC 编译器。或者安装了但没有把 gcc 的路径加到系统 PATH 环境变量里——命令行找不到 `gcc` 这个可执行文件。Windows 用户通常装 MinGW-w64 或使用 Visual Studio 的 cl.exe；macOS 用户可以通过 `xcode-select --install` 装命令行工具获得 clang/gcc。",
    tags: ["gcc", "环境配置"],
  },
  {
    id: "cpr-19",
    chapter: "cpr-getting-ready",
    level: 3,
    question: "编程七步骤里，如果测试发现 bug，你应该回到哪一步重新开始？为什么不是回到「编写」就行？",
    answer:
      "取决于 bug 的类型。如果是代码细节写错（比如忘了分号、变量名打错了）→ 回到编写（步③）直接改。如果发现整个算法逻辑有问题（比如排序不对）→ 可能要回到设计（步②）重新选算法。如果是需求理解错了（比如客户要 A 你做了 B）→ 要回到定义目标（步①）。不能一刀切回「编写」——根因可能在设计甚至目标层面。",
    tags: ["编程七步骤", "测试", "排错"],
  },
  {
    id: "cpr-20",
    chapter: "cpr-getting-ready",
    level: 3,
    question: "一个项目有 10 个 .c 文件。你只改了其中一个文件，用 `gcc *.c -o app` 和用 `make` 有什么区别？",
    answer:
      "`gcc *.c -o app` 会把全部 10 个文件重新编译一遍（预处理→编译→汇编→链接），不管有没有改过——白白浪费时间。`make`（通过 Makefile）会比较每个 .c 文件的修改时间戳和对应的 .o 文件的修改时间戳：只重新编译「比对应 .o 更新」的那 1 个 .c 文件，其他 9 个跳过编译，直接进入链接。这就是「增量编译」。",
    tags: ["构建系统", "make", "增量编译"],
  },

  // ── L4 综合：陷阱 / 全流程 ──
  {
    id: "cpr-21",
    chapter: "cpr-getting-ready",
    level: 4,
    question: "一位新手写了三个文件：`main.c` 调用 `foo()`、`foo.c` 定义 `foo()`、`foo.h` 声明 `foo()`。他执行了 `gcc -c main.c` 生成 `main.o`，然后直接运行 `./main.o`，结果报 `Permission denied` 或格式错误。他漏了哪几步？",
    answer:
      "他漏了两步：①没有编译 `foo.c`——还需要 `gcc -c foo.c` 生成 `foo.o`。②没有链接——`.o` 文件不是可执行文件，是「零件」，需要通过链接器（`gcc main.o foo.o -o app`）把所有 .o 拼成可执行文件。`.o` 文件直接用 `./` 执行不了——它不是 ELF/PE 格式的可执行文件，操作系统不知道怎么加载它。",
    tags: ["编译流程", "链接", "综合"],
  },
  {
    id: "cpr-22",
    chapter: "cpr-getting-ready",
    level: 4,
    question: "如果 C 没有标准化（没有 C89/C99/C11/C18），在你编写的程序中会发生什么具体的问题？至少说出两个。",
    answer:
      "①同一份代码在 GCC 上能编译、换到 MSVC 上编译失败或行为不同——因为不同编译器对语法和标准库函数的理解不一致。②团队开发时每个人都用各自编译器支持的不同「方言」写代码，合并时冲突不断。③如果想换操作系统（如从 Windows 迁到 Linux），整个项目可能要重写相当大部分的代码而不是重新编译就行。",
    tags: ["C标准", "可移植性", "综合"],
  },
  {
    id: "cpr-23",
    chapter: "cpr-getting-ready",
    level: 4,
    question: "C18 被称为 C11 的「修正勘误版」而没有新增任何语言特性。一个标准版本没有任何新特性，还有意义吗？说出两条理由。",
    answer:
      "有意义的。理由①：澄清歧义——C11 的某些条文措辞模糊，不同编译器可能有不同解读，C18 把措辞改精确了。理由②：勘误——C11 发布后发现了文本上的一些错误（比如例子里的代码写错了、编号冲突），C18 把它修正了。标准化不只是加新功能——维持现有标准的解读一致性同样重要。",
    tags: ["C标准", "C18", "综合"],
  },
  {
    id: "cpr-24",
    chapter: "cpr-getting-ready",
    level: 4,
    question: "一个程序用 `printf` 输出文字，但运行后发现输出顺序和你代码里的顺序不一样——第三行的文字出现在了第一行之前。描述一种可能的原因和排查方法。",
    answer:
      "最可能的原因是「缓冲区没有及时刷新」。`printf` 把文字先放进 stdout 缓冲区，默认遇到 `\n` 或程序正常退出时才刷新。如果某个 `printf` 没有以 `\n` 结尾，它的内容可能滞留在缓冲区里，等到后面某个有 `\n` 的 `printf` 刷新时，批一起推出来却没按你预想的顺序——尤其当 printf 和 fprintf(stderr,...) 混用时（stderr 无缓冲而 stdout 有缓冲）。排查方法：在每个 printf 后加 `fflush(stdout)` 强制立即刷新，或在末尾加 `\n`。",
    tags: ["缓冲区", "printf", "stdout", "综合"],
  },
];

export default cprGettingReadyQuestions;
