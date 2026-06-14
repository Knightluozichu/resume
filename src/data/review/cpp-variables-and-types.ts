/** 复习题库 · C++ 变量和基本类型（cpp-variables-and-types）。C++ Primer §2 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cppVariablesAndTypesQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "cvt-1",
    chapter: "cpp-variables-and-types",
    level: 1,
    question: "C++ 内置的基本算术类型有哪些？按类别说出至少五类。",
    answer:
      "整型（short / int / long / long long）、浮点型（float / double / long double）、字符型（char / wchar_t）、布尔型（bool）。共四大类。",
    tags: ["基本类型", "算术类型"],
  },
  {
    id: "cvt-2",
    chapter: "cpp-variables-and-types",
    level: 1,
    question: "在 64 位 Linux 上，`int` 和 `double` 各占多少字节？`float` 的有效数字大概多少位？",
    answer:
      "`int` 占 4 字节（32 位），`double` 占 8 字节（64 位）。`float` 约 7 位有效数字，`double` 约 15 位有效数字。",
    tags: ["int", "double", "float", "内存大小"],
  },
  {
    id: "cvt-3",
    chapter: "cpp-variables-and-types",
    level: 1,
    question: "`unsigned int` 和 `signed int` 的核心区别是什么？分别能存什么范围的值？",
    answer:
      "核心区别在于最高位的解读。`unsigned int` 只存 ≥0 的值（32 位范围 0 ~ 2³²−1），`signed int` 用补码表示，一半范围给负数（−2³¹ ~ 2³¹−1）。同一个二进制位模式在两种解读下含义完全不同。",
    tags: ["unsigned", "signed", "补码"],
  },
  {
    id: "cvt-4",
    chapter: "cpp-variables-and-types",
    level: 1,
    question: "`int x = 0;` 和 `int x{0};` 两种初始化写法，有什么区别？哪种更安全？",
    answer:
      "`int x = 0;` 是拷贝初始化（C 传统写法），允许隐式窄化转换（比如 `double d=3.14; int x=d;` 静默截断为 3）。`int x{0};` 是列表初始化（C++11），会拒绝窄化转换——`int x{d}` 直接报错或警告。列表初始化更安全。",
    tags: ["初始化", "列表初始化", "窄化转换"],
  },
  {
    id: "cvt-5",
    chapter: "cpp-variables-and-types",
    level: 1,
    question: "C++ 变量的「声明（declaration）」和「定义（definition）」有什么差别？",
    answer:
      "声明是告诉编译器「有这样的一个名字和类型」（可多次），但不一定分配空间。定义是在声明的基础上分配内存空间（唯一，整个程序只能有一处定义）。`extern int x;` 是纯声明（不定于此），`int x = 0;` 是定义。",
    tags: ["声明", "定义", "extern"],
  },
  {
    id: "cvt-6",
    chapter: "cpp-variables-and-types",
    level: 1,
    question: "C++ 的作用域由什么划定边界？变量什么时刻出生、什么时刻死亡？",
    answer:
      "作用域由花括号 `{}` 划定。变量从它的声明点开始出生（分配内存 + 初始化），到它所在的最内层 `}` 结束死亡（销毁 + 回收内存）。全局变量例外——它出生在 main 之前、死亡在程序退出之后。",
    tags: ["作用域", "生命周期"],
  },
  {
    id: "cvt-7",
    chapter: "cpp-variables-and-types",
    level: 1,
    question: "说出三种整数后缀（u/l/ll）和两种浮点后缀（f/l）的含义。",
    answer:
      "整数后缀：`u`（或 `U`）= unsigned，`l`（或 `L`）= long，`ll`（或 `LL`）= long long。浮点后缀：`f`（或 `F`）= float，`l`（或 `L`）= long double。不加后缀的 `42` 是 int，`3.14` 是 double。",
    tags: ["字面值", "后缀", "类型推断"],
  },
  {
    id: "cvt-8",
    chapter: "cpp-variables-and-types",
    level: 1,
    question: "字符 `'\\n'`、`'\\t'`、`'\\\\'`、`'\\0'` 分别代表什么？它们为什么叫「转义序列」？",
    answer:
      "`\\n` = 换行（LF）、`\\t` = 水平制表（Tab）、`\\\\` = 反斜杠本身、`\\0` = 空字符（字符串终点标记）。它们叫「转义」是因为把普通字母 n 转成了「换行」这个控制含义——转义符 `\\` 告诉编译器后面的字母有特殊含义，不再是普通字母。",
    tags: ["转义序列", "字符"],
  },

  // ── L2 理解：为什么 / 机制 ──
  {
    id: "cvt-9",
    chapter: "cpp-variables-and-types",
    level: 2,
    question: "为什么 `int` 默认是有符号的、而 `unsigned int` 需要显式写 `unsigned`？有什么设计考虑？",
    answer:
      "因为需要负数的场景远比纯非负数多——算术运算（加减乘除、差值）、计数差、坐标等都可能出现负数。让 `int` 默认 signed 符合直觉和最常见用法；`unsigned` 是特例，主要用在数组下标、位运算、大小的场景，需要你显式声明意图。",
    tags: ["signed", "unsigned", "设计考量"],
  },
  {
    id: "cvt-10",
    chapter: "cpp-variables-and-types",
    level: 2,
    question: "为什么 C++ 要同时有 `float` 和 `double`？既然 `double` 精度更高，直接用 `double` 不是更好吗？",
    answer:
      "`float` 只占 4 字节（double 是 8 字节），在 GPU 图形计算、嵌入式、大量数值数组中，内存和带宽是关键瓶颈——用 `float` 能省下 50% 空间。另外 GPU 的大规模并行计算对 `float` 做了极致优化，`double` 性能可能慢很多。日常计算推荐 `double` 因为它精度够、现代 CPU 对 double 的计算速度已经不输 float。",
    tags: ["float", "double", "精度", "内存权衡"],
  },
  {
    id: "cvt-11",
    chapter: "cpp-variables-and-types",
    level: 2,
    question: "为什么 C++ 编译器不自动帮未初始化的变量设成 0？",
    answer:
      "性能优先——C++ 的设计哲学是「你不需要的东西不替你付成本」。每次声明变量都自动清零有额外开销，而且往往紧接着下一行就会赋新值——那就清零了两次。编译器只保证静态存储期和全局变量自动清零，栈上局部变量则放任你自己决定。",
    tags: ["初始化", "性能", "设计哲学"],
  },
  {
    id: "cvt-12",
    chapter: "cpp-variables-and-types",
    level: 2,
    question: "为什么 `double d = 3.14; int i{d};` 编译会报错或警告？这不是明确告诉编译器「我知道要截断」了吗？",
    answer:
      "列表初始化 `{}` 的设计目的就是**拒绝隐式丢失信息**。`double` → `int` 不仅丢失小数部分，大数值还会溢出——这种「悄悄丢数据」不是你应该无意识做的事。如果你确实要截断，用 `static_cast<int>(d)` 显式告诉编译器：「我知道在干什么，这有风险但我是故意的」。C++ 的原则是：危险操作应该写得显眼，而不是藏在等号后面。",
    tags: ["列表初始化", "窄化转换", "static_cast"],
  },
  {
    id: "cvt-13",
    chapter: "cpp-variables-and-types",
    level: 2,
    question: "`unsigned int u = 10; int i = -42;` 之后算 `u + i`，结果是什么？为什么不是 -32？",
    answer:
      "结果是一个巨大的正数（32 位上是 4294967264）。原因是 C++ 的隐式类型转换规则：当同一表达式中同时出现 signed 和 unsigned 时，signed 会被**隐式转换**为 unsigned——i 从 -42 变成 4294967254，然后 u + i = 10 + 4294967254 = 4294967264。不是 -32！",
    tags: ["unsigned", "隐式转换", "signed/unsigned混用"],
  },
  {
    id: "cvt-14",
    chapter: "cpp-variables-and-types",
    level: 2,
    question: "什么是「同名遮蔽（shadowing）」？内层和外层同名变量在内存里是同一个位置吗？",
    answer:
      "同名遮蔽指内层作用域声明了一个和外层同名的变量时，内层暂时无法直接访问外层的同名变量——编译器会选中最近作用域的那个。它们在内存里是**两块不同的空间**：内层变量有自己的地址，跟外层的毫无关系。出了内层、内层变量销毁，外层变量的地址和值都原封不动地重现。",
    tags: ["shadowing", "作用域", "内存"],
  },
  {
    id: "cvt-15",
    chapter: "cpp-variables-and-types",
    level: 2,
    question: "「初始化」和「赋值」的根本差别是什么？为什么说这俩不能混用？",
    answer:
      "初始化是变量「出生时」给第一个值——发生在定义的那一刻，调用的可能是构造函数。赋值是变量「已存在后」换一个新值——发生在变量生命周期的中间，调用的是赋值运算符。对基本类型（int/double 等）两者看起来差不多，但对类类型差异巨大：`std::string s = \"hi\";` 是初始化、`s = \"bye\";` 是赋值。混用会导致对 string/vector 等类型的机制理解出错。",
    tags: ["初始化", "赋值", "构造函数"],
  },

  // ── L3 应用：读代码 / 排错 ──
  {
    id: "cvt-16",
    chapter: "cpp-variables-and-types",
    level: 3,
    question:
      "下面这段代码有什么问题？指出每个问题所在的符号或关键字。\n`unsigned int a = -5;`\n`int b = 3.14;`\n`int c{b};`\n`int d; cout << d;`",
    answer:
      "四处问题：① `a`：给 unsigned 赋负数，结果是一个巨大正数。② `b`：虽然语法通过但会发生隐式窄化转换，3.14 被截断为 3，可能不是你的本意。③ `c`：`int c{b}` 是无害的 copy（b 已经是 int），但这说明用列表初始化的初衷（防窄化）这里用不上。④ `d`：未初始化就使用 cout 输出，读出的值是不可预测的垃圾值。",
    tags: ["排错", "unsigned", "初始化", "类型转换"],
  },
  {
    id: "cvt-17",
    chapter: "cpp-variables-and-types",
    level: 3,
    question:
      "你在内层块里想修改外层的 `count` 变量，于是写 `int count = 5;`。出来后发现 `count` 没变。哪里错了？怎么修正？",
    answer:
      "`int count = 5;` 是在内层**声明了一个全新的同名局部变量**，不是修改外层的 count。外层的 count 只是被暂时遮蔽了，值根本没变。修正：去掉 `int` 前缀，只写 `count = 5;`——这就是赋值（修改当前作用域可见的 count）而非声明新变量。",
    tags: ["作用域", "shadowing", "声明vs赋值"],
  },
  {
    id: "cvt-18",
    chapter: "cpp-variables-and-types",
    level: 3,
    question:
      "编译报错：`error: narrowing conversion of '3.1400000000000001e+0' from 'double' to 'int' inside { }`。为什么会报这个错？写出两种修复方式。",
    answer:
      "因为 `int x{3.14};` 试图用列表初始化把 double 塞进 int——double 有小数部分且值域更大，列表初始化拒绝这种隐式窄化转换。修复方式一：用传统初始化 `int x = 3.14;`（允许悄悄截断，不推荐）。修复方式二（推荐）：`int x = static_cast<int>(3.14);` 显式转换，告诉编译器「我是故意的」。",
    tags: ["窄化转换", "列表初始化", "static_cast"],
  },
  {
    id: "cvt-19",
    chapter: "cpp-variables-and-types",
    level: 3,
    question:
      "下面代码中，`std::cout << sum` 输出是多少？解释每一行发生了什么。\n`unsigned u = 10;`\n`int i = -2;`\n`unsigned sum = u + i;`\n`std::cout << sum;`",
    answer:
      "输出 8。步骤：① `u + i` 这一表达式里，signed 的 i 被隐式转换为 unsigned——−2 的 32-bit 补码转为 unsigned 变成 4294967294。② `10 + 4294967294 = 4294967304`。③ 但这个值超过了 unsigned int 的范围（0~4294967295），发生**回绕（wrap-around）**，实际存储的是 4294967304 % 2³² = 8。④ sum = 8，输出 8。",
    tags: ["unsigned", "隐式转换", "回绕", "模运算"],
  },
  {
    id: "cvt-20",
    chapter: "cpp-variables-and-types",
    level: 3,
    question:
      "程序里写了一个全局变量 `int global = 100;`，main 里面又写了一个局部变量 `int global = 200;`。在 main 里 `cout << global` 输出多少？全局的 global 被「覆盖」了吗？",
    answer:
      "输出 200。局部 `global` 遮蔽了全局同名变量——在 main 里直接写 `global` 指向的是局部的那一个，值为 200。全局的 `global=100` 并没有被覆盖——它仍然存在于内存中（可以 `::global` 显式引用：`std::cout << ::global;` 输出 100）。出了 main、局部 `global` 销毁后，全局的那个依然完好。",
    tags: ["全局变量", "局部变量", "遮蔽", "::作用域解析"],
  },

  // ── L4 综合：陷阱 / 全流程 ──
  {
    id: "cvt-21",
    chapter: "cpp-variables-and-types",
    level: 4,
    question:
      "设计一个函数 `safe_add(unsigned a, int b)`，要求能正确把 `a` 和 `b` 相加。如果 `b` 是负数且 `|b| > a`，返回 0 而不是让它回绕成一个巨大正数。写出你的实现并解释每一步的考量。",
    answer:
      "方案：把 unsigned 先转成足够大的 signed 类型（如 long long），做完加法再判断结果是否 ≤ 0，最后转回 unsigned。\n\n```cpp\nunsigned safe_add(unsigned a, int b) {\n    // 都转成 long long 避免隐式 unsigned 回绕\n    long long result = static_cast<long long>(a) + b;\n    // 如果结果为负，按 unsigned 的语义返回 0\n    if (result < 0) return 0;\n    // 安全转回 unsigned\n    return static_cast<unsigned>(result);\n}\n```\n\n核心考量：先统一到足够大的 signed 类型（long long 能装下 unsigned int 全量 + int 全量），避免了混用 unsigned 和 signed 时隐式转换导致的回绕。做完判断后再安全截回 unsigned。",
    tags: ["unsigned", "混合运算", "安全封装", "综合"],
  },
  {
    id: "cvt-22",
    chapter: "cpp-variables-and-types",
    level: 4,
    question:
      "一程序里同时用了全局变量、局部变量、静态局部变量（`static int`）。画出这三种变量的内存区域和生命周期，说明它们分别什么时候出生、什么时候死亡。",
    answer:
      "① 全局变量：存在**静态存储区（data segment）**。程序启动前就分配好、程序退出后才销毁。② 局部变量（函数/块内）：存在**栈（stack）**。进入作用域时分配（push）、出 `}` 时销毁（pop）。③ 静态局部变量（函数内 `static int x = …`）：存在**静态存储区**（和全局变量同一区域），但在第一次执行到声明语句时才初始化。初始化后整个程序生命周期存在，函数调用之间值不丢失。关键区别：全局变量出生最早（main 之前就活了），局部变量生死跟花括号，静态局部变量存在全局区域但延迟初始化到首次执行到那行。",
    tags: ["存储期", "静态变量", "栈", "数据段", "综合"],
  },
];

export default cppVariablesAndTypesQuestions;
