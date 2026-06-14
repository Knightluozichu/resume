/** 复习题库 · C++ 语句（cpp-statements）。C++ Primer §5 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cppStatementsQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "cst-1",
    chapter: "cpp-statements",
    level: 1,
    question: "C++ 中有哪几种条件分支语句？各自的基本语法是什么？",
    answer:
      "有两种：`if/else` 和 `switch`。`if (条件) { ... } else if (条件) { ... } else { ... }` 根据布尔条件选择路径；`switch (整型表达式) { case 值: ... break; default: ... }` 根据离散值跳转。`if` 处理范围判断（`x > 0`），`switch` 处理等值匹配（`x == 1`）。",
    tags: ["if", "switch", "条件分支"],
  },
  {
    id: "cst-2",
    chapter: "cpp-statements",
    level: 1,
    question: "C++ 中有哪三种循环语句？它们各自在什么场景下最合适？",
    answer:
      "`for`——适合「跑已知次数」的计数器循环（遍历数组、跑 N 次）。`while`——适合「次数未知、靠条件驱动」的循环（读文件到 EOF、等合法输入）。`do-while`——适合「至少跑一次」的循环（先显示菜单再判断是否退出）。",
    tags: ["for", "while", "do-while", "循环"],
  },
  {
    id: "cst-3",
    chapter: "cpp-statements",
    level: 1,
    question: "`break` 和 `continue` 各做什么？用一句话区分它们。",
    answer:
      "`break` 立即终止整个循环——跳出循环体，循环结束。`continue` 只跳过当前这一轮循环体的剩余代码，然后进入下一轮迭代的判断。一句话：break = 退出循环，continue = 跳过本轮。",
    tags: ["break", "continue", "跳转"],
  },
  {
    id: "cst-4",
    chapter: "cpp-statements",
    level: 1,
    question: "`switch` 语句中 `break` 的作用是什么？如果忘记写 `break` 会发生什么？",
    answer:
      "`break` 用于跳出 `switch` 语句——执行完当前 case 的代码后立即离开 switch。如果忘记写 `break`，程序会「贯穿（fall-through）」到下一个 case，继续执行下一段代码——多数情况下这不是你想要的，属于高频 bug。",
    tags: ["switch", "break", "fall-through"],
  },
  {
    id: "cst-5",
    chapter: "cpp-statements",
    level: 1,
    question: "`switch` 的 `case` 标签后面可以写什么类型的表达式？能用 `string` 吗？",
    answer:
      "只能用**整型常量表达式**——`int`、`char`、`enum` 等整数类型的常量值。**不能用 `string`、`double`/`float` 或变量。** 每个 `case` 的值必须在编译时就确定，且所有 `case` 值不能重复。",
    tags: ["switch", "case", "类型限制"],
  },
  {
    id: "cst-6",
    chapter: "cpp-statements",
    level: 1,
    question: "`try`/`catch`/`throw` 这三个关键字各自扮演什么角色？",
    answer:
      "`throw`——「抛出异常」——在发现错误的地方把问题报告出去。`try`——「试着执行」——把可能出错的代码包起来。`catch`——「捕获异常」——在合适的地方处理错误。三者配合：throw 发出信号 → try 块里的代码在错误处停止 → 跳到匹配的 catch 块处理。",
    tags: ["异常", "try", "catch", "throw"],
  },
  {
    id: "cst-7",
    chapter: "cpp-statements",
    level: 1,
    question: "`do-while` 和 `while` 的唯一本质差别是什么？",
    answer:
      "**判断条件的时间点不同。** `while` 是先判断条件再决定是否执行循环体——条件一开始就是 false 的话循环体一次都不执行。`do-while` 先执行一遍循环体再判断条件——无论如何至少执行一次。",
    tags: ["do-while", "while", "循环"],
  },

  // ── L2 理解：为什么 / 机制 ──
  {
    id: "cst-8",
    chapter: "cpp-statements",
    level: 2,
    question: "为什么 `switch` 只允许整型表达式作为判断条件？浮点数或字符串为什么不行？",
    answer:
      "`switch` 在 case 值密集时编译器常优化成「跳转表」——把每个 case 值映射成偏移量直接跳过去（O(1) 跳转），这是它偏好整型的一个原因（注意这只是常见优化、并非标准强制：稀疏或少量 case 时编译器往往生成比较链或二分查找）。更本质的原因是 case 标签必须是编译期整型常量、能精确判等。浮点数有精度问题（`3.0` 和 `2.999...` 算同一个值吗？），字符串比较代价大且非编译期常量，都不满足这个要求。",
    tags: ["switch", "跳转表", "设计理由"],
  },
  {
    id: "cst-9",
    chapter: "cpp-statements",
    level: 2,
    question: "C++ 的 `if` 条件为什么要求是一个「能转成 bool 的值」？`if (x = 5)` 为什么能编译通过却不是你想要的？",
    answer:
      "C++ 里任何非零数值都能隐式转为 `true`，零转为 `false`。`x = 5` 是赋值表达式，返回值是被赋的值 5。5 ≠ 0，所以 `if (x = 5)` 的条件被当作 `true`——无论 x 原来是多少都进 if 体。正确写法是 `if (x == 5)`。这是 C++ 最经典的 bug 之一。",
    tags: ["if", "=", "==", "赋值vs比较"],
  },
  {
    id: "cst-10",
    chapter: "cpp-statements",
    level: 2,
    question: "`for` 语句头部的三个表达式（init、condition、update）各自在什么时候执行？用 `for (int i = 0; i < 10; i++)` 解释每一步的时间线。",
    answer:
      "① init（`int i = 0`）：只执行一次，在进入循环之前。② condition（`i < 10`）：每次迭代**之前**检查，true 才进循环体。③ 执行循环体。④ update（`i++`）：每次迭代**之后**执行。⑤ 回到②。时间线：init→条件→体→更新→条件→体→更新→...→条件 false 退出。",
    tags: ["for", "执行顺序", "循环"],
  },
  {
    id: "cst-11",
    chapter: "cpp-statements",
    level: 2,
    question: "什么是「悬垂 else（dangling else）」问题？`if (a > 0) if (b > 0) cout << 1; else cout << 2;` 里 `else` 匹配哪个 `if`？",
    answer:
      "「悬垂 else」指 else 与哪个 if 配对可能产生歧义的情况。C++ 规定 `else` 匹配**最近的未匹配 `if`**——所以这里 `else` 匹配内层 `if (b > 0)`，和外层 `if (a > 0)` 无关。缩进不能改变匹配关系。想让 else 匹配外层 if 需加花括号：`if (a > 0) { if (b > 0) cout << 1; } else cout << 2;`",
    tags: ["if-else", "悬垂else", "dangling-else"],
  },
  {
    id: "cst-12",
    chapter: "cpp-statements",
    level: 2,
    question: "`try/catch` 和传统的「返回错误码」相比，有什么本质区别？什么时候该用异常、什么时候不该用？",
    answer:
      "本质区别是**错误的传播方向**。错误码是「一层一层往上返回」，每层都要检查，容易遗漏。异常是「从错误点直接抛到处理点」，中间层不用管——代码干净但运行时开销大。该用异常：构造函数失败、深层调用出问题、罕见且不可恢复的错误。不该用：普通用户输入不合法（用 if 判断）、性能敏感的热路径。",
    tags: ["异常", "错误码", "错误处理"],
  },

  // ── L3 应用：读代码 / 排错 ──
  {
    id: "cst-13",
    chapter: "cpp-statements",
    level: 3,
    question:
      "写出下面程序的完整输出：\n`for (int i = 0; i < 6; i++) { if (i % 2 == 0) continue; if (i == 5) break; std::cout << i << ' '; }`",
    answer:
      "i=0：0%2==0 → continue（跳过输出）。i=1：1%2≠0 → 输出 1。i=2：continue。i=3：输出 3。i=4：continue。i=5：5%2≠0 但 `i == 5` 命中 break，直接跳出 for 循环。最终输出：`1 3 `。",
    tags: ["for", "continue", "break", "手算"],
  },
  {
    id: "cst-14",
    chapter: "cpp-statements",
    level: 3,
    question:
      "下面这个 switch 语句输出什么？为什么？\n`int x = 2; switch(x) { case 1: std::cout << 'A'; case 2: std::cout << 'B'; case 3: std::cout << 'C'; default: std::cout << 'D'; }`",
    answer:
      "输出 `BCD`。x=2 命中 case 2，输出 B。因为没有 break，程序继续贯穿——执行 case 3 输出 C，再执行 default 输出 D。这就是 fall-through。在每个 case 末尾加 `break;` 修正。",
    tags: ["switch", "fall-through", "排错"],
  },
  {
    id: "cst-15",
    chapter: "cpp-statements",
    level: 3,
    question:
      "下面给成绩打等级的 if-else 链，逻辑正确吗？score=59 输出什么？score=120 呢？如何改进？\n`if (score >= 90) grade = 'A'; else if (score >= 80) grade = 'B'; else if (score >= 70) grade = 'C'; else if (score >= 60) grade = 'D'; else grade = 'F';`",
    answer:
      "逻辑本身正确。score=59 → 全条件 false → else → grade='F'。score=120 → 第一条件 `>=90` 命中 → grade='A'——但 120 分在百分制里不存在。缺失输入合法性检查。改进：开头加 `if (score < 0 || score > 100) { std::cout << '非法分数'; return; }`",
    tags: ["if-else", "边界条件", "输入校验"],
  },
  {
    id: "cst-16",
    chapter: "cpp-statements",
    level: 3,
    question:
      "解释这段代码为什么是死循环并给两种修正：\n`unsigned int i = 10; while (i >= 0) { std::cout << i << ' '; i--; }`",
    answer:
      "`unsigned int` 永远不会小于 0。`i--` 到 i=0 后再减，`0u - 1` 绕回约 43 亿的巨大正数，`i >= 0` 永远 true。修正一：用 `int` 代替 `unsigned int`。修正二：条件改成 `i > 0` 并在循环里最后做 i--，i=1 输出后变为 0 退出。注意修正二会输出 10..1（不含 0），与原意（10 输出到 0）略有出入；若要保留输出 0，仍以改用 `int`（修正一）为准。",
    tags: ["unsigned", "死循环", "while", "排错"],
  },
  {
    id: "cst-17",
    chapter: "cpp-statements",
    level: 3,
    question:
      "写一个 while 循环，让用户反复输入整数，输入 0 时退出。每次输入非零数时累加。指出为什么用 while 而不是 for。",
    answer:
      "```cpp\nint sum = 0, num;\nwhile (std::cin >> num && num != 0)\n    sum += num;\n```\n用 `while` 的原因：循环次数事先不知道——取决于用户什么时候输入 0。`while` 的条件「读到非零数」自然地驱动循环，不需要计数器。这正契合 while「条件驱动、次数未知」的设计意图。",
    tags: ["while", "条件循环", "实战"],
  },
  {
    id: "cst-18",
    chapter: "cpp-statements",
    level: 3,
    question:
      "下面 try/catch 代码有问题——找出问题并修正：\n`try { int x = 5, y = 0; if (y == 0) throw \"除零\"; int z = x / y; } catch (int e) { std::cout << e; }`",
    answer:
      "问题：throw 了一个 `const char*` 类型的字符串字面值，但 catch 期望的是 `int`——类型不匹配，异常不会被捕获，程序调用 `std::terminate()` 终止。修正：把 catch 参数类型改为 `catch (const char* e)` 或者 throw 一个整数（如 `throw -1;`）。更推荐的做法是用 `throw std::runtime_error(\"除零\");`，catch `const std::exception& e`。",
    tags: ["异常", "throw", "catch", "类型匹配"],
  },

  // ── L4 综合：陷阱 / 全流程 ──
  {
    id: "cst-19",
    chapter: "cpp-statements",
    level: 4,
    question:
      "综合题：用本章学的 if-else、do-while、break 语句写一个「猜数字」游戏。要求：(1) 随机生成 1~100 的数；(2) do-while 保证至少猜一次；(3) 每次用 if-else 提示大了/小了；(4) 猜中用 break 退出；(5) 最多猜 7 次，超次提示失败。不得使用 goto。",
    answer:
      "```cpp\n#include <iostream>\n#include <cstdlib>\n#include <ctime>\nint main() {\n    srand(static_cast<unsigned>(time(nullptr)));\n    int secret = rand() % 100 + 1;\n    int guess, attempts = 0;\n    std::cout << \"猜 1~100：\";\n    do {\n        std::cin >> guess;\n        attempts++;\n        if (guess == secret) {\n            std::cout << \"正确！\" << attempts << \"次。\";\n            break;\n        }\n        if (attempts >= 7) {\n            std::cout << \"失败！答案是\" << secret << \"。\";\n            break;\n        }\n        std::cout << (guess > secret ? \"大了\" : \"小了\") << \"，再猜：\";\n    } while (true);\n    return 0;\n}\n```",
    tags: ["综合", "猜数字", "do-while", "if-else", "break"],
  },
  {
    id: "cst-20",
    chapter: "cpp-statements",
    level: 4,
    question:
      "下面 switch 综合陷阱：为什么说它是「合法但危险」的？给出更安全的写法。\n`int day = 3; switch(day) { case 1: case 2: case 3: case 4: case 5: std::cout << \"工作日\"; case 6: case 7: std::cout << \"周末\"; }`",
    answer:
      "问题：case 1-5 输出「工作日」后无 break，贯穿到 case 6-7 又输出「周末」——周一到周五实际上输出「工作日周末」。修正：每个 `std::cout` 后加 `break;`。更安全的风格：每个 case 不需要贯穿时，用花括号 `{ ... break; }` 明确边界。需要故意贯穿时加注释 `// fall through` 表明意图。",
    tags: ["switch", "fall-through", "break", "安全", "综合"],
  },
];

export default cppStatementsQuestions;
