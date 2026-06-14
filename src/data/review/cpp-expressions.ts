/** 复习题库 · C++ 表达式（cpp-expressions）。C++ Primer §4 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cppExpressionsQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "cex-1",
    chapter: "cpp-expressions",
    level: 1,
    question: "表达式由哪两类基本元素构成？各举一个例子。",
    answer:
      "由操作数（operand）和运算符（operator）构成。操作数如变量 `x` 或字面值 `42`，运算符如 `+`、`*`、`=`。每个表达式求值后都会产生一个结果。",
    tags: ["表达式", "操作数", "运算符"],
  },
  {
    id: "cex-2",
    chapter: "cpp-expressions",
    level: 1,
    question: "C++ 中 `*` `/` `%` 和 `+` `-` 谁的优先级更高？",
    answer:
      "`*` `/` `%`（乘除取余）的优先级比 `+` `-`（加减）高，和数学课上学的一样。所以 `a + b * c` 先算 `b * c`，再算 `+`。",
    tags: ["优先级", "算术运算符"],
  },
  {
    id: "cex-3",
    chapter: "cpp-expressions",
    level: 1,
    question: "什么是「结合律」？左结合和右结合分别是什么意思？",
    answer:
      "结合律决定同优先级运算符的求值方向。左结合意思是「从左到右算」——如 `a - b + c` 等效 `(a - b) + c`。右结合意思是「从右到左算」——如赋值 `a = b = 0` 等效 `a = (b = 0)`。",
    tags: ["结合律", "优先级"],
  },
  {
    id: "cex-4",
    chapter: "cpp-expressions",
    level: 1,
    question: "`++i`（前缀）和 `i++`（后缀）对变量 i 的最终值影响有区别吗？表达式的返回值呢？",
    answer:
      "对 i 的**最终值**没区别——两种写法都会让 i 变成 i+1。但**表达式本身的返回值**不同：前缀 `++i` 返回自增后的新值，后缀 `i++` 返回自增前的旧值。",
    tags: ["递增", "前缀后缀"],
  },
  {
    id: "cex-5",
    chapter: "cpp-expressions",
    level: 1,
    question: "`x += 3` 等价于什么？这种写法叫什么？",
    answer:
      "等价于 `x = x + 3`。这种写法叫「复合赋值（compound assignment）」。C++ 支持 `+=` `-=` `*=` `/=` `%=` 等多种复合赋值运算符。",
    tags: ["复合赋值", "赋值运算符"],
  },
  {
    id: "cex-6",
    chapter: "cpp-expressions",
    level: 1,
    question: "`static_cast<int>(3.14)` 的结果是什么？它和直接 `int x = 3.14` 有什么不同？",
    answer:
      "结果是 3（小数部分被截断，不是四舍五入）。`static_cast` 是显式转换写法，告诉编译器「我知道会丢精度，故意的」。直接 `int x = 3.14;` 也能通过编译但意图不明——`static_cast` 更安全、可读性更好。",
    tags: ["static_cast", "显式转换"],
  },

  // ── L2 理解：为什么 / 机制 ──
  {
    id: "cex-7",
    chapter: "cpp-expressions",
    level: 2,
    question: "C++ 为什么需要运算符优先级？没有优先级规则、纯按书写顺序从左到右算会有什么问题？",
    answer:
      "因为数学上乘法天然比加法「更紧」——`a + b * c` 的语义应该是「a 加上 b 与 c 的积」，按书写顺序算就会变成「a 加 b 再乘 c」，和数学常识矛盾。优先级规则让程序员按数学直觉写表达式就能得到正确结果，不用每次都加一堆括号。",
    tags: ["优先级", "设计理由"],
  },
  {
    id: "cex-8",
    chapter: "cpp-expressions",
    level: 2,
    question: "赋值运算符 `=` 为什么是右结合的？如果它是左结合，`a = b = 0` 会怎么算？",
    answer:
      "右结合让 `a = b = 0` 等价于 `a = (b = 0)`——先把 0 赋给 b，再把 `(b = 0)` 这个赋值表达式的结果（0）赋给 a。如果是左结合，`(a = b) = 0`，等于先取 a=b 的结果（一个值，不是变量），再试图给一个值赋值——这没有意义。右结合让链式赋值能够成立。",
    tags: ["结合律", "赋值", "链式赋值"],
  },
  {
    id: "cex-9",
    chapter: "cpp-expressions",
    level: 2,
    question: "为什么 `int x = 5; int y = x++ + ++x;` 是未定义行为？拆开解释每一步的问题在哪。",
    answer:
      "因为 C++ 标准不规定 `x++` 和 `++x` 的求值先后顺序，并且同一表达式里 x 被改了两次（++x 改一次、x++ 改一次）又读了一次——这叫「无序修改」。不同编译器可能选不同顺序：先算 x++ 得旧值 5、再 ++x 把 x 变 7；或者反过来先 ++x 变 6、再 x++ 返回 6——结果不确定。C++ 标准直接说「这是 undefined behavior（UB）」，编译器做什么都合法。",
    tags: ["未定义行为", "递增", "求值顺序"],
  },
  {
    id: "cex-10",
    chapter: "cpp-expressions",
    level: 2,
    question: "隐式类型转换是「安全」的——编译器自动帮你在背后做，为什么还要学它？不用了解转换规则不行吗？",
    answer:
      "因为在某些场景下隐式转换会悄悄「翻车」——最经典的就是 signed 和 unsigned 混用。`unsigned u = 10; int i = -5; cout << u + i;` 输出一个巨大正数，因为 i 被隐式转成 unsigned。不了解转换规则就不知道这里为什么会出 bug。另一个翻车点是 int 到 float 的隐式转换——可能丢精度（float 有效数字约 7 位，大 int 塞不进）。",
    tags: ["隐式转换", "signed/unsigned", "精度丢失"],
  },
  {
    id: "cex-11",
    chapter: "cpp-expressions",
    level: 2,
    question: "`7 / 2` 在 C++ 里结果是 3 而不是 3.5。整数除法为什么不像人类的直觉一样返回小数结果？",
    answer:
      "因为 C++ 的除法 `/` 看到两个操作数都是 `int`，就按整数除法来——做整除、截断小数、返回 `int`。这是 C++ 的「运算符行为由操作数类型决定」原则。要得到小数结果，至少把一个操作数换成浮点类型：`7.0 / 2` 或 `static_cast<double>(7) / 2`。",
    tags: ["整数除法", "类型决定行为"],
  },
  {
    id: "cex-12",
    chapter: "cpp-expressions",
    level: 2,
    question: "C++ 取余 `%` 的结果符号由谁决定？`6 % -4` 的结果是正还是负？为什么？",
    answer:
      "由**被除数**的符号决定。C++ 保证 `(a / b) * b + a % b == a` 恒成立，所以 `a % b` 结果的符号与 `a` 一致。`6 % -4` 中 6/(-4)=-1，(-1)*(-4)+余=6 → 4+余=6 → 余=2，结果为正。",
    tags: ["取余", "符号规则"],
  },

  // ── L3 应用：读代码 / 排错 ──
  {
    id: "cex-13",
    chapter: "cpp-expressions",
    level: 3,
    question:
      "写出下面这段程序每一步的输出，并解释每步 a 和 b 的值如何变化：\n`int a = 5, b = 2;`\n`a *= b++; // ① a=? b=?`\n`b = ++a - --b; // ② a=? b=?`",
    answer:
      "① `b++` 返回旧值 2，a = a*2 = 10。然后 b 自增为 3。结果 a=10,b=3。\n② `++a` 把 a 从 10 改成 11（返回 11）。`--b` 把 b 从 3 改成 2（返回 2）。11-2=9 赋给 b。结果 a=11,b=9。",
    tags: ["复合赋值", "递增递减", "手算"],
  },
  {
    id: "cex-14",
    chapter: "cpp-expressions",
    level: 3,
    question:
      "下面代码编译报错或运行产生意外结果——找出问题并给出修正：\n`int total = 100;`\n`int count = 3;`\n`double avg = total / count;`\n`std::cout << avg;`",
    answer:
      "问题：`total / count` 两个操作数都是 int，做整数除法，结果 33，然后才转成 double 赋给 avg，avg 是 33.0 而不是期望的 33.333。修正：在除法前把至少一个操作数转成 double，如 `double avg = static_cast<double>(total) / count;`",
    tags: ["整数除法", "类型转换", "排错"],
  },
  {
    id: "cex-15",
    chapter: "cpp-expressions",
    level: 3,
    question:
      "有人写了 `if (x = 5) { ... }` 想判断 x 是否等于 5，但程序行为不对。出了什么问题？为什么编译器不报错？",
    answer:
      "`x = 5` 是赋值，不是比较。赋值表达式返回被赋的值（5），5≠0 所以 if 条件视为 true——无论 x 原来是多少都会进 if。正确写法是 `x == 5`。编译器不报错是因为 `x = 5` 在语法上完全合法——赋值表达式可以用在任何需要值的地方。这是 C++ 最经典的一类 bug 之一。",
    tags: ["赋值vs比较", "=", "=="],
  },
  {
    id: "cex-16",
    chapter: "cpp-expressions",
    level: 3,
    question:
      "找出下面表达式的求值顺序：`int a = 1, b = 2, c = 3; int r = a + b * c - a / b;` 不用括号改写这行，把隐含的括号都标出来。",
    answer:
      "隐含的括号：`int r = (a + (b * c)) - (a / b);`\n求值顺序：① `b * c` = 6；② `a / b` = 0（整数除法 1/2=0）；③ `a + 6` = 7；④ `7 - 0` = 7 赋给 r。\n关键规则：乘除优先于加减，同级左结合。",
    tags: ["优先级", "求值顺序", "手算"],
  },
  {
    id: "cex-17",
    chapter: "cpp-expressions",
    level: 3,
    question:
      "`unsigned int u = 3; int i = -1; if (u > i) { ... }` 这个 if 条件是 true 还是 false？为什么？",
    answer:
      "false！因为 unsigned 和 signed 混用时，signed `i` 会被隐式转换成 unsigned。`-1` 的 32 位补码是 `0xFFFFFFFF`，当 unsigned 解读是 4294967295。`3 > 4294967295` 是 false。这完全违反人类直觉——明明 3 > -1 才对。修复：`if (static_cast<int>(u) > i)` 或直接用 `int` 存 u 的值比较。",
    tags: ["signed/unsigned", "隐式转换", "比较陷阱"],
  },
  {
    id: "cex-18",
    chapter: "cpp-expressions",
    level: 3,
    question:
      "编译报错 `invalid operands to binary expression ('int' and 'double')`——`%` 运算符两侧类型是什么？查优先级表，`a % b + c` 里的 `%` 比 `+` 先算还是后算？",
    answer:
      "`%`（取余）要求两侧操作数都是整数类型，不允许浮点。报错就是因为 `int % double` 中 double 不合法。`%` 的优先级和 `*` `/` 同级，都高于 `+` `-`，所以 `a % b + c` 先算 `a % b` 再算 `+ c`。",
    tags: ["取余", "优先级", "排错"],
  },

  // ── L4 综合：陷阱 / 全流程 ──
  {
    id: "cex-19",
    chapter: "cpp-expressions",
    level: 4,
    question:
      "以下三个表达式各自隐藏着什么问题？(1) `int y = ++x + x++;` (2) `int a = 5; a = a++ + ++a;` (3) `cout << i << i++;` 总结衡量一个复杂表达式是否安全的核心原则。",
    answer:
      "三个全都是**未定义行为（UB）**——原因都是「在一个表达式里多次修改同一个变量，而这些修改之间没有明确的先后定序」（C++11 起标准用「sequenced before / 先序」描述这种定序关系）。C++ 标准不规定子表达式的求值顺序，不同编译器可能产生不同结果。核心安全原则：**在一个完整表达式里，每个变量最多被修改一次；如果被修改了，就不要在同一表达式里再读它**。把复杂表达式拆成多行简单赋值，清晰永远比聪明重要。",
    tags: ["未定义行为", "UB", "安全原则", "综合"],
  },
  {
    id: "cex-20",
    chapter: "cpp-expressions",
    level: 4,
    question:
      "一个新手写了 `double result = 5 / 9 * (f - 32);` 想把华氏度转摄氏度，但结果总是 0。出了什么问题？给两种不同的修正方案，并比较它们的优劣。",
    answer:
      "问题：`5 / 9` 是整数除法，结果为 0，后面乘什么都得 0。\n方案一（类型转换）：`double result = static_cast<double>(5) / 9 * (f - 32);`——让 5 变 double，5.0/9 得到约 0.5556。\n方案二（写浮点字面值）：`double result = 5.0 / 9.0 * (f - 32);`——最简单直接，5.0 就是 double 字面值。\n方案二更推荐——写法最自然、意图最清晰，零额外认知负担。方案一的好处是用 `static_cast` 明确表达「我在做类型转换」。",
    tags: ["整数除法", "类型转换", "公式", "综合"],
  },
];

export default cppExpressionsQuestions;
