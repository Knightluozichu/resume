/** 复习题库 · C++ 快速入门（cpp-getting-started）。C++ Primer §1 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cppGettingStartedQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "cgs-1",
    chapter: "cpp-getting-started",
    level: 1,
    question: "C++ 源码从敲下到能运行，中间要经过哪四道工位？按顺序说出名称。",
    answer:
      "预处理 → 编译 → 汇编 → 链接。预处理展开头文件和宏、去掉注释；编译把 C++ 翻译成汇编语言；汇编把汇编变成二进制机器码（.o 目标文件）；链接把多个 .o 和库拼成可执行文件。",
    tags: ["编译流水线", "四阶段"],
  },
  {
    id: "cgs-2",
    chapter: "cpp-getting-started",
    level: 1,
    question: "`int main()` 里的 `int` 和 `return 0` 分别在说什么？",
    answer:
      "`int` 是 main 函数的返回类型，表示它会交回一个整数给操作系统。`return 0` 就是在说「程序正常结束，没有问题」，把 0 这个整数交回给操作系统。",
    tags: ["main函数", "return"],
  },
  {
    id: "cgs-3",
    chapter: "cpp-getting-started",
    level: 1,
    question: "`#include <iostream>` 这一行是干什么的？放在哪里？",
    answer:
      "它告诉预处理器：把 `<iostream>` 这个头文件的内容原样粘贴到这一行所在的位置。iostream 里声明了 `cin` 和 `cout`，让你能在程序里读写输入输出。它通常写在文件最开头。",
    tags: ["头文件", "预处理器"],
  },
  {
    id: "cgs-4",
    chapter: "cpp-getting-started",
    level: 1,
    question: "`//` 和 `/* */` 这两种注释有什么区别？编译器怎么处理它们？",
    answer:
      "`//` 是单行注释——从它开始到本行末尾全被忽略。`/* */` 是多行注释——裹住的部分（可以跨行）全被忽略。编译器在预处理的末尾就把注释都删掉了，它们绝不会进入最终的二进制程序。",
    tags: ["注释"],
  },
  {
    id: "cgs-5",
    chapter: "cpp-getting-started",
    level: 1,
    question: "`std::cout` 里的 `std::` 是什么意思？为什么不能直接写 `cout`？",
    answer:
      "`std::` 是命名空间前缀，表示「住在 std 这个门牌号下的那个 cout」。C++ 标准库里的东西都在 std 命名空间里。不写 `std::` 的话编译器不知道你在说哪个 cout。也可以加一行 `using std::cout;`，后面就能直接写 cout。",
    tags: ["命名空间", "cout"],
  },
  {
    id: "cgs-6",
    chapter: "cpp-getting-started",
    level: 1,
    question: "什么是「流（stream）」？C++ 里哪两个预定义流对象分别负责输入和输出？",
    answer:
      "流就像一根水管，数据顺着它从源头流向目的地。`cout` 是输出流——用 `<<` 往里面塞东西，它顺着管道流到控制台显示出来。`cin` 是输入流——用 `>>` 从键盘过来的管道里往外抽数据。",
    tags: ["流", "cin", "cout"],
  },
  {
    id: "cgs-7",
    chapter: "cpp-getting-started",
    level: 1,
    question: "`g++ hello.cpp -o hello` 这条命令在背后会依次做哪四件事？",
    answer:
      "依次做预处理、编译、汇编、链接。预处理展开头文件和宏；编译把 C++ 翻译成汇编；汇编把汇编变成机器码（.o）；链接把 .o 文件和标准库拼成可执行文件 hello。",
    tags: ["g++", "编译流水线"],
  },
  {
    id: "cgs-8",
    chapter: "cpp-getting-started",
    level: 1,
    question: "C++ 语句的末尾通常以什么符号结束？为什么需要它？",
    answer:
      "以分号 `;` 结束。它告诉编译器「这句话说完了，可以处理下一句了」。忘写分号是最常见的编译错误之一，因为编译器会把下一行也当成同一句话继续读，读到乱七八糟的东西才报错。",
    tags: ["语句", "分号"],
  },

  // ── L2 理解：为什么 / 机制 ──
  {
    id: "cgs-9",
    chapter: "cpp-getting-started",
    level: 2,
    question: "预处理阶段为什么要「展开头文件」、直接把内容粘贴进来？不能运行时再去读吗？",
    answer:
      "因为 C++ 是编译型语言——一切都在运行之前就翻译完了。头文件里的声明（比如 cout 是什么类型、接受什么参数）编译器必须提前看到，才能在编译阶段做类型检查、生成正确的机器码。如果运行时才去读，编译器根本不知道 cout 是什么。",
    tags: ["预处理器", "头文件", "编译型语言"],
  },
  {
    id: "cgs-10",
    chapter: "cpp-getting-started",
    level: 2,
    question: '为什么链接阶段才会报 "undefined reference to xxx"，而不是编译阶段？',
    answer:
      "编译阶段只检查每个 .cpp 文件自己内部的语法和类型，不关心你提到的函数在**别的文件**里有没有实现——因为编译器一次只看一个文件。链接阶段才把所有 .o 文件和库摆在一起检查：一个文件里说「我要用 cout」，链接器去所有库和 .o 里找 cout 的机器码实现，找不到才报 undefined reference。",
    tags: ["链接", "undefined reference", "编译vs链接"],
  },
  {
    id: "cgs-11",
    chapter: "cpp-getting-started",
    level: 2,
    question: "cout 的输出不是立即出现在屏幕上，中间有一个「缓冲区」。缓冲区有什么好处？",
    answer:
      "缓冲区先收集一批要输出的字，攒够了或遇到 `endl` 才一口气推到屏幕。好处是减少输出操作的次数——一个字一送跟一卡车一送，速度差很多。代价是程序崩了、缓冲区没来得及清的话，最后一段字可能丢失。",
    tags: ["缓冲区", "cout", "endl"],
  },
  {
    id: "cgs-12",
    chapter: "cpp-getting-started",
    level: 2,
    question: "编译器在编译阶段做的「语法检查」具体在查什么？能举一个它查不出来的错误吗？",
    answer:
      "语法检查查的是括号对不对、分号漏没漏、类型匹不匹配、变量声明过没等结构问题。但**逻辑错误**查不出来——比如你把 `a + b` 写成了 `a - b`，语法完全正确，编译器不会报错，结果就是错的。这类错误只能靠你自己或测试发现。",
    tags: ["编译器", "语法检查", "逻辑错误"],
  },
  {
    id: "cgs-13",
    chapter: "cpp-getting-started",
    level: 2,
    question: "`cout << \"Hello\" << \" World\" << endl;` 里出现了三个 `<<`，它们是怎么一步步把字推出去的？",
    answer:
      "`<<` 运算符**从左到右**结合。第一个 `<<` 把 `\"Hello\"` 送进 cout 流；这个操作的结果「还是 cout 流本身」，于是第二个 `<<` 基于它再把 `\" World\"` 推进去；同理第三个 `<<` 把 `endl` 推进去。理解成「链式管道推进」。",
    tags: ["<<", "链式调用"],
  },
  {
    id: "cgs-14",
    chapter: "cpp-getting-started",
    level: 2,
    question: "为什么 `/* */` 多行注释不能嵌套？如果你在 `/* /* */ */` 里，哪个 `*/` 是结算点？",
    answer:
      "C++ 的 `/* */` 注释用第一个遇到的 `*/` 结束，所以不能嵌套。在 `/* /* */ */` 里，第一个 `*/` 就结束了注释——但这个 `*/` 之后的那部分代码（原本是外层注释的内容）暴露出来了，编译器会把它当代码处理，报错。如果你确实需要注释大段包含 `/* */` 的代码，用 `#if 0 ... #endif` 代替。",
    tags: ["注释", "嵌套", "陷阱"],
  },
  {
    id: "cgs-15",
    chapter: "cpp-getting-started",
    level: 2,
    question: "汇编器把汇编语言翻译成机器码的过程和编译器把 C++ 翻译成汇编的过程，哪个更难？为什么？",
    answer:
      "编译器更难。汇编到机器码几乎是「一对一」硬翻译——mov 翻译成某个操作码、寄存器名翻译成编号，规则简单固定。编译器则需要理解 C++ 复杂语法（类、模板、重载）、做语义分析、决定优化策略，这是「理解一种高级语言再重塑」。",
    tags: ["编译vs汇编", "编译器"],
  },
  {
    id: "cgs-16",
    chapter: "cpp-getting-started",
    level: 2,
    question: "`main` 函数的 `return` 值（比如 0）最终被谁接收了？那个值能用来干什么？",
    answer:
      "被操作系统接收。0 通常表示「正常结束」，非零值表示某种错误。在命令行里，上一个程序的返回值存在 `$?` 里（Linux/macOS），批处理脚本可以根据它决定下一步做什么——比如编译失败了就不继续跑单元测试。",
    tags: ["main函数", "return", "exit code"],
  },

  // ── L3 应用：读代码 / 排错 ──
  {
    id: "cgs-17",
    chapter: "cpp-getting-started",
    level: 3,
    question:
      "编译报错：`fatal error: 'iostream' file not found`。发生在哪道工位？最可能的原因是什么？",
    answer:
      "发生在预处理阶段。最可能的原因：① 编译器找不到标准库的头文件路径（比如环境没配好）；② 拼写错误，把 `iostream` 写成了 `iostram`；③ 用的是 C 风格的头文件写法，C++ 应该用 `<iostream>` 而不是 `<iostream.h>`。",
    tags: ["预处理器", "头文件", "排错"],
  },
  {
    id: "cgs-18",
    chapter: "cpp-getting-started",
    level: 3,
    question:
      "下面这段代码有什么问题？\n`int main() {`\n`    std::cout << \"Hello\" << endl`\n`    return 0;`\n`}`",
    answer:
      "两处问题：① `cout` 那行结尾少了分号 `;`——编译器会把下一行 `return` 连起来解析，报 syntax error；② `endl` 前面少了 `std::`——编译器不认识单独的 `endl`，除非前面已经 `using std::endl;` 了。",
    tags: ["分号", "命名空间", "读代码"],
  },
  {
    id: "cgs-19",
    chapter: "cpp-getting-started",
    level: 3,
    question:
      "把 `return 0;` 删掉，用 g++ 编译（不加 -std=c++11 等 flags），程序能通过编译吗？实际运行会怎样？",
    answer:
      "能通过编译——C++ 标准规定 main 函数可以不写 return，编译器会**自动帮你补一个 `return 0;`**（但只对 main 特殊待遇，其他返回 int 的函数不行）。也就是说删掉它程序照常运行，退出码仍是 0。但这不是好习惯——显式写 return 0 让意图更清楚。",
    tags: ["main函数", "return", "隐式return"],
  },
  {
    id: "cgs-20",
    chapter: "cpp-getting-started",
    level: 3,
    question:
      "Windows 下双击 .exe 运行你的 Hello World 程序，窗口一闪就没了。怎么改代码让它停住？写两种不同的方法。",
    answer:
      "方法一：在 `return 0;` 之前加 `std::cin.get();`——程序等你敲回车才继续。方法二：加 `system(\"pause\");`（需要 `#include <cstdlib>`，仅 Windows）。方法一更好，因为它不依赖操作系统特定命令。也可以直接从 cmd/PowerShell 命令行运行程序，窗口自然不会消失。",
    tags: ["控制台", "Windows", "cin.get"],
  },
  {
    id: "cgs-21",
    chapter: "cpp-getting-started",
    level: 3,
    question:
      "同事的代码编译时报 `undefined reference to 'myFunction'`。他确定 myFunction 在同一个项目的另一个 .cpp 文件里。最可能漏了什么？",
    answer:
      "他用 `g++ main.cpp -o main` 只编译了主文件，**没有把包含 myFunction 定义的那个 .cpp 文件一起链接**。正确的命令应该是 `g++ main.cpp other.cpp -o main`，把两个 .cpp 都编译然后链接在一起。或者他没有把那个 .cpp 加入 IDE 项目。",
    tags: ["链接", "undefined reference", "排错"],
  },
  {
    id: "cgs-22",
    chapter: "cpp-getting-started",
    level: 3,
    question:
      "`using namespace std;` 写在文件最开头，能让后面所有 `std::` 都不写了。为什么很多教程不推荐新手这么做？",
    answer:
      "因为 `std` 里有大量名字（如 sort、find、begin、end），一股脑全「请进来」可能跟你自己的变量名或别的库里的同名名字**撞名**——编译器不知道该用哪个，报 ambiguous 错误。你写了什么自己不知道的冲突很难排查。建议按需 `using std::cout;` 或坚持写 `std::cout`。",
    tags: ["命名空间", "using namespace", "最佳实践"],
  },

  // ── L4 综合：陷阱 / 全流程 ──
  {
    id: "cgs-23",
    chapter: "cpp-getting-started",
    level: 4,
    question:
      "一个完整的 C++ 程序编译流程中，分别出现了三种报错：`fatal error: 'xxx.h' file not found`、`syntax error: expected ';'`、`undefined reference to 'main'`。它们分别发生在哪道工位？各说明什么根本问题？",
    answer:
      "① `fatal error: 'xxx.h' file not found` 在**预处理**阶段，根本问题是编译器找不到指定的头文件路径。② `syntax error` 在**编译**阶段，根本问题是代码语法结构不正确（如漏了分号）。③ `undefined reference to 'main'` 在**链接**阶段，根本问题是所有链接进来的 .o 和库里都没有 `main` 函数的定义——你可能忘了写 main 函数或没有把包含 main 的那种 .cpp 文件加进编译。",
    tags: ["编译流水线", "错误分类", "综合"],
  },
  {
    id: "cgs-24",
    chapter: "cpp-getting-started",
    level: 4,
    question:
      "一个团队的项目有 100+ 个 .cpp 文件。为什么每次只改了 1 个文件，`g++ *.cpp -o app` 却要重新编译全部 100+ 个文件？有没有办法只重新编译改了的那 1 个？",
    answer:
      "因为 `g++ *.cpp -o app` 是一条命令走完所有步骤——每次所有文件都预处理、编译、汇编、再链接，不管有没有改。解决办法是**分开编译 + 增量链接**：先把每个 .cpp 单独编译成 .o（`g++ -c a.cpp`），然后只对改过的那 1 个重新编译，最后把所有 .o 链接起来。这就是 Make/CMake 构建系统干的事——它通过比**.o 和 .cpp 的时间戳**，只重编译「比对应 .o 更新」的 .cpp 文件。",
    tags: ["增量编译", "Make", "构建系统", "综合"],
  },
  {
    id: "cgs-25",
    chapter: "cpp-getting-started",
    level: 4,
    question:
      "假设你在 `main.cpp` 调用了一个在 `math.cpp` 里写的函数 `multiply(a, b)`。写出把这俩文件编译成可执行文件的全过程命令，并解释链接器在最后一步具体匹配了什么。",
    answer:
      "步骤：① `g++ -c main.cpp -o main.o`（只编译，产出 main.o）；② `g++ -c math.cpp -o math.o`（只编译，产出 math.o）；③ `g++ main.o math.o -o app`（链接，产出可执行文件 app）。链接器在第三步做的事：遍历 main.o 里所有「对外部符号的引用」——发现有一个 `multiply` 的引用未被满足；然后在 math.o（以及标准库）的符号表里找到 `multiply` 的定义（即它的机器码地址）；把 main.o 里占位的那条「call ???」填成「call 这个地址」。",
    tags: ["链接", "符号解析", "全流程", "综合"],
  },
];

export default cppGettingStartedQuestions;
