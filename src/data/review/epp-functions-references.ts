import type { ReviewQuestion } from "./types";

/** C++ Primer Plus · 函数与引用复习题 */
export const eppFunctionsReferencesQuestions: ReviewQuestion[] = [
  {
    id: "epp-functions-references-1",
    chapter: "epp-functions-references",
    level: 1,
    question: `C++ 函数的定义由哪几部分组成？引用参数和按值参数有什么区别？`,
    answer:
      `函数定义四部分：返回类型、函数名、形参列表（括号内）、函数体（花括号内）。形参列表可为空，返回类型为 void 表示无返回值。\`return\` 语句把结果交回调用者。\n\n引用参数 vs 按值参数：\n- 按值参数 \`void f(int x)\`：实参的值被拷贝到形参 x，函数内修改 x 不影响实参。开销是拷贝，对大对象昂贵。\n- 引用参数 \`void f(int& x)\`：形参 x 是实参的别名（同一块内存的另一名字），函数内修改 x 直接改实参。无拷贝开销。\n\n引用参数两大用途：\n1. 避免大对象拷贝：传类对象、容器时用 \`const Type&\`（只读引用）避免拷贝又防误改。\n2. 需要修改实参或返回多个值：用非 const 引用让函数能改实参，或用多个引用参数「输出」结果。\n\n关键约定：只读传参用 \`const T&\`，要修改实参用 \`T&\`，基本类型（int/double）按值即可（拷贝便宜）。`,
    tags: ["函数定义", "引用参数", "按值参数"],
  },
  {
    id: "epp-functions-references-2",
    chapter: "epp-functions-references",
    level: 2,
    question: `默认参数的规则是什么？为什么默认参数必须从右往左连续给？`,
    answer:
      `默认参数规则：\n1. 在函数声明（或定义，二选一，通常声明在头文件）里给形参指定默认值，如 \`void f(int a, int b = 1, int c = 2);\`。\n2. 调用时可省略有默认值的实参，编译器用默认值补上：\`f(0)\` 等价 \`f(0, 1, 2)\`，\`f(0, 5)\` 等价 \`f(0, 5, 2)\`。\n3. 不能只省中间参数：\`f(0, , 9)\` 非法——实参按位置匹配，省略中间会错位。\n\n必须从右往左连续给的原因：调用时实参按位置从左到右匹配形参，省略只能发生在「末尾」。如果允许中间有默认值而右侧没有，如 \`void f(int a, int b=1, int c);\`，调用 \`f(0, 0)\` 时编译器无法判断第二个 0 是给 b 还是给 c——产生歧义。\n\n因此规则是：有默认值的参数必须在没有默认值的参数右边，且连续。这保证了「从右往左省略」无歧义。\n\n注意：声明和定义只能在一处给默认值（通常在头文件声明处），两处都给会报重复定义错误。`,
    tags: ["默认参数", "函数声明", "规则"],
  },
  {
    id: "epp-functions-references-3",
    chapter: "epp-functions-references",
    level: 3,
    question: `你写了 \`void f(int)\` 和 \`void f(double)\` 两个重载，调用 \`f(3)\` 调哪个？调用 \`f(3.0)\` 调哪个？如果再加重载 \`f(int, int=0)\`，调用 \`f(3)\` 会怎样？`,
    answer:
      `重载决议按「实参类型与形参类型的匹配程度」选最佳：\n\n1. \`f(3)\`：3 是 int，与 \`f(int)\` 精确匹配，调用 \`f(int)\`。\n2. \`f(3.0)\`：3.0 是 double，与 \`f(double)\` 精确匹配，调用 \`f(double)\`。\n\n这两个调用明确，因为 int 实参精确匹配 int 形参（优于转 double），double 实参精确匹配 double 形参（优于转 int）。\n\n3. 加入 \`f(int, int = 0)\` 后调用 \`f(3)\`：产生二义性错误。因为 \`f(3)\` 既能匹配 \`f(int)\`（单参精确匹配），也能匹配 \`f(int, int=0)\`（省略默认参数后也是 int 精确匹配）。两者都是「精确匹配」，编译器无法决定选哪个，报「ambiguous call」错误。\n\n修法：避免这种让单参重载与带默认参数的重载在调用点产生歧义的声明。要么去掉 \`f(int)\`，要么去掉 \`f(int,int=0)\` 的默认参数，要么调用时显式写两个参数 \`f(3, 0)\`。\n\n启示：函数重载与默认参数组合时要小心二义性，重载决议的「最佳匹配」不唯一时编译器会拒绝。`,
    tags: ["函数重载", "重载决议", "二义性"],
  },
  {
    id: "epp-functions-references-4",
    chapter: "epp-functions-references",
    level: 4,
    question: `综合分析：C++ 的函数重载靠「名字相同参数不同」实现，而 C 不允许重载。重载在底层（名称修饰）是如何落地的？这带来什么工程影响？`,
    answer:
      `底层落地——名称修饰（name mangling）：\nC++ 编译器把函数签名（名字 + 参数类型 + 命名空间 + const 等）编码成唯一的内部符号名。如 \`void f(int)\` 修饰成 \`_Z1fi\`，\`void f(double)\` 修饰成 \`_Z1fd\`。链接器看到的是这些唯一符号，所以同名不同参的重载在符号层不冲突。C 不做修饰，函数名就是符号名，故同名函数冲突。\n\n工程影响：\n1. 支持类型安全的泛型接口：同一操作（如 print）对 int/double/string 各写一个重载，调用者用统一名字，编译器按实参类型自动选对版本，比 C 的 \`print_int\`/\`print_double\` 命名更优雅。\n2. \`extern \"C\"\` 关闭修饰：C++ 函数若要用 C 链接约定（被 C 代码或动态库按原名调用），加 \`extern \"C\"\` 关闭修饰，符号名就是函数名。这是 C/C++ 混链的桥梁。\n3. 跨编译器 ABI 不兼容：不同编译器修饰规则不同（Itanium ABI vs MSVC），导致 C++ 编译出的 .so/.dll 不能跨编译器混链，限制了二进制复用。\n4. 调试需还原符号：\`nm\`/\`objdump\` 看到的是修饰名，需 \`c++filt\` 还原成可读签名。\n\n本质：重载是语言层的便利，mangling 是把它映射到底层「只认符号名」的链接器的机制。两者结合让 C++ 的类型系统与链接器共存，但也引入 ABI 脆弱性——这是 C++ 比 C 灵活也比 C 难做二进制兼容的根源。`,
    tags: ["综合", "函数重载", "name mangling", "ABI"],
  },
];
