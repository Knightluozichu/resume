/** 复习题库 · C++ 函数（cpp-functions）。C++ Primer §6 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cppFunctionsQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "cfn-1",
    chapter: "cpp-functions",
    level: 1,
    question: "C++ 中函数的四个基本组成部分是什么？分别起什么作用？",
    answer:
      "① 返回类型——函数执行完后返回什么类型的值（void 表示不返回）。② 函数名——调用时的唯一标识。③ 形参列表——调用方需要传什么数据（可为空）。④ 函数体——花括号里被调用时执行的代码。这四个部分合起来叫「函数定义」。只写返回类型 + 函数名 + 形参列表（不含函数体）叫「函数声明」，告诉编译器这函数存在、后面会定义。",
    tags: ["函数定义", "返回类型", "形参", "函数体"],
  },
  {
    id: "cfn-2",
    chapter: "cpp-functions",
    level: 1,
    question: "什么是「局部对象」？C++ 中局部对象有哪些种类？",
    answer:
      "局部对象是定义在函数体或语句块内的变量。分三类：① 自动对象（普通局部变量）——函数执行到定义处创建，离开作用域时自动销毁。② 局部静态对象（`static int count = 0;`）——只在第一次执行到定义处初始化一次，程序结束时才销毁，函数多次调用间保持值。③ register 局部对象——提示编译器放寄存器（C++11 起废弃、C++17 移除，忽略即可）。",
    tags: ["局部对象", "自动对象", "静态局部变量", "static"],
  },
  {
    id: "cfn-3",
    chapter: "cpp-functions",
    level: 1,
    question: "C++ 中有哪几种参数传递方式？用一句话区分它们。",
    answer:
      "① 值传递（pass by value）——形参是实参的独立副本，函数内修改形参不影响实参。② 引用传递（pass by reference）——形参是实参的别名，共享同一块内存，修改形参就是修改实参。③ 指针传递（pass by pointer）——传实参的地址，函数内通过解引用间接访问原变量（本质也是值传递——传的是地址的值，但效果上和引用类似）。④ const 引用传递——只读别名，不能修改实参但避免了拷贝开销。",
    tags: ["值传递", "引用传递", "指针传递", "const引用"],
  },
  {
    id: "cfn-4",
    chapter: "cpp-functions",
    level: 1,
    question: "什么是函数重载（overloading）？编译器如何区分两个重载函数？",
    answer:
      "函数重载指同一作用域内可以有多个同名但**形参列表不同**的函数。编译器通过形参的数量、类型和顺序来区分。只改返回类型不算重载——编译器只看形参列表决定调用哪个。匹配过程分三阶段：① 找同名且可见的「候选函数」；② 看形参数量和类型能否配上「可行函数」；③ 选隐式转换代价最小的「最佳匹配」。",
    tags: ["函数重载", "overload", "形参列表"],
  },
  {
    id: "cfn-5",
    chapter: "cpp-functions",
    level: 1,
    question: "什么是内联函数（inline function）？怎么用？它一定会内联吗？",
    answer:
      "内联函数用 `inline` 关键字声明——建议编译器在调用点直接把函数体「展开」而不是生成 call 指令进栈跳转，从而消除函数调用的开销。写法：`inline int add(int a, int b) { return a + b; }`。注意 `inline` 只是**请求**不是命令——编译器有权忽略（函数太复杂、有递归、有循环等场景拒绝内联）。现代编译器会自动内联简单函数，不写 inline 也可能内联。",
    tags: ["inline", "内联函数", "性能"],
  },
  {
    id: "cfn-6",
    chapter: "cpp-functions",
    level: 1,
    question: "constexpr 函数是什么？和普通函数有什么不同？",
    answer:
      "`constexpr` 函数是「可能」在编译期求值的函数。定义时用 `constexpr` 而非 `inline`。要求：函数体只有一条 return 语句（C++11 限制严格，C++14 放宽了），返回值和所有形参都必须是字面值类型。如果所有实参都是常量表达式，编译器在编译期就把结果算出来——零运行时开销。如果实参中有变量，它就和普通函数一样在运行时执行。",
    tags: ["constexpr", "编译期", "常量表达式"],
  },
  {
    id: "cfn-7",
    chapter: "cpp-functions",
    level: 1,
    question: "数组作为函数形参时，发生了什么？`void f(int arr[10])` 和 `void f(int* arr)` 是一样的吗？",
    answer:
      "完全一样。数组在函数形参中会**退化（decay）成指针**——编译器把 `int arr[10]`、`int arr[]`、`int arr[5]` 甚至 `int *arr` 这四种写法都视为完全等价的 `int*`。函数内部 `sizeof(arr)` 得到的是指针的大小（8 字节/64位），不是数组的大小。数组的大小在退化为指针时丢失了——这就是为什么凡是函数需要知道数组长度，**必须把长度作为单独参数传进去**。",
    tags: ["数组退化", "指针", "sizeof", "形参"],
  },
  {
    id: "cfn-8",
    chapter: "cpp-functions",
    level: 1,
    question: "`int *p` 和 `const int *p` 和 `int *const p` 三种指针声明有什么区别？",
    answer:
      "`int *p`——普通指针，p 可以改指向（重指向别的地址），也可以通过 p 修改指向的 int。`const int *p`（等价于 `int const *p`）——指向常量 int 的指针：不能通过 p 修改指向的值（`*p = 5;` 编译错误），但 p 本身可以改指向。`int *const p`——常量指针：p 不能改指向（初始化后不能再指别处），但可以通过 p 修改指向的值。`const int *const p`——两者都不可改。口诀：const 在 * 左边 = 指向的东西只读，const 在 * 右边 = 指针本身只读。",
    tags: ["const指针", "顶层const", "底层const", "指针"],
  },
  {
    id: "cfn-9",
    chapter: "cpp-functions",
    level: 1,
    question: "什么是默认实参（default argument）？有什么规则？",
    answer:
      "默认实参是在函数声明中给形参写的 `= 值`，调用方如果不传这个实参就用默认值。规则：① 默认实参必须从右往左连续——不能跳着给默认值（`void f(int a, int b = 5, int c = 3)` 合法，`void f(int a = 1, int b)` 不合法）。② 默认实参只写在声明里（通常放头文件），定义里不重复。③ 声明可以逐次添加默认实参，但不能覆盖已有默认值。④ 局部变量不能做默认实参（必须是常量表达式）。",
    tags: ["默认实参", "default argument"],
  },
  {
    id: "cfn-10",
    chapter: "cpp-functions",
    level: 1,
    question: "什么是尾置返回类型（trailing return type）？什么时候用？",
    answer:
      "尾置返回类型把返回类型写在形参列表之后（`auto func(int a) -> int { return a * 2; }`）。常规场景没必要写——当返回类型依赖形参时（如模板函数 `template <typename T> auto add(T a, T b) -> decltype(a + b)`）才用。现代 C++14 起 auto 返回类型推导让很多场景不需要显式尾置了，但模板里声明返回类型时仍然常见。",
    tags: ["尾置返回类型", "trailing return type", "auto"],
  },
  {
    id: "cfn-11",
    chapter: "cpp-functions",
    level: 1,
    question: "什么时候该在形参中使用 const？对值传递形参加 const 有用吗？",
    answer:
      "指针或引用形参加 `const` 非常有用——告诉调用方「我不会改你的数据」，同时允许传入 const 对象和字面值。对值传递形参加顶层 const（如 `void f(const int x)`）**对调用方无用**——因为 x 已经是副本了、你改不改它都不影响实参。但**对函数实现者有用**——标记 x 在整个函数体内不可修改，防止意外赋值，作为自文档化手段。实践中建议只在需要的时候给值传形参加 const——不要为了用而用。",
    tags: ["const", "值传递", "形参限定"],
  },
  {
    id: "cfn-12",
    chapter: "cpp-functions",
    level: 1,
    question: "C++ 函数可以返回数组或函数吗？如果不行，怎么办？",
    answer:
      "函数不能直接返回数组（数组不能拷贝），也不能直接返回函数。但可以返回指向数组的指针和指向函数的指针——语法非常晦涩。更好的现代做法：① 返回 `std::vector`、`std::array`、`std::string` 这些可拷贝的容器代替 C 风格数组；② 用类型别名简化函数指针；③ 用尾置返回类型简化声明；④ C++11 后用 `std::function` 包装可调用对象作为返回类型。如果只是想把数据「传出」函数，用引用参数（`vector<string> &out`）是更直观的选择。",
    tags: ["返回值", "数组", "函数指针", "std::function"],
  },

  // ── L2 理解：为什么 / 机制 ──
  {
    id: "cfn-13",
    chapter: "cpp-functions",
    level: 2,
    question: "为什么建议用 `const T&` 传递大对象而不是 `T`？什么情况下该用 `T`？",
    answer:
      "`const T&` 传递不拷贝整个对象——只传引用（84 字节的 string 只传 8 字节的引用），函数内只能读不能改。`T` 值传递会在栈上创建对象的完整副本——对于 vector/string/自定义类可能是数千字节拷贝，时间和空间开销大。该用 `T` 的场景：① 小对象（如 int/double 本身就 4-8 字节，拷贝和引用开销一样甚至更小）② 函数确实要改副本而非原值（如 `string toUpper(string s) { /* 改 s */ return s; }`）。刚接触以 const T& 为默认、需要改副本/小对象才用值传递。",
    tags: ["const引用", "值传递", "性能", "拷贝"],
  },
  {
    id: "cfn-14",
    chapter: "cpp-functions",
    level: 2,
    question: "函数调用时栈帧（stack frame）里发生了什么？为什么说局部变量「用完就没了」？",
    answer:
      "每次函数调用时CPU：（1）把实参压栈（或放寄存器）→（2）把返回地址压栈（知道函数结束后回哪）→（3）为局部变量和形参在栈顶分配空间——这一整块叫「栈帧」→（4）跳转到函数体执行→（5）return 时把返回值放 eax/rax 寄存器→（6）回收栈帧——把栈指针拨回调用前的位置。「用完就没了」就是因为栈帧被回收——局部变量的内存区域被操作系统收回，下次调用会被覆盖。静态局部变量除外——它们不在栈上，在静态存储区。",
    tags: ["栈帧", "stack frame", "调用栈", "内存"],
  },
  {
    id: "cfn-15",
    chapter: "cpp-functions",
    level: 2,
    question: "函数重载的二义性（ambiguous）是什么？举一个必然导致二义性的例子。",
    answer:
      "二义性指编译器找不到唯一的「最佳匹配」函数——多个重载版本匹配得一样好。必然导致二义性的典型场景：`void f(int)` 和 `void f(double)` 用字面值 `f(0)` 调用——对 int 参数是精确匹配，double 需要整型提升。但如果是 `void f(long)` 和 `void f(float)` 用 `f(0)` 调用——两个都需要一次标准转换、没有哪个更好 → ambiguous → 编译错误。另一个常见坑：`void f(int)` 和 `void f(const int &)` 用 `f(5)` 调用也是 ambiguous（值传和引用传对字面值的匹配等好）。",
    tags: ["重载", "二义性", "ambiguous", "最佳匹配"],
  },
  {
    id: "cfn-16",
    chapter: "cpp-functions",
    level: 2,
    question: "什么时候传引用比传值更危险？`int &foo()` 返回一个局部变量的引用会发生什么？",
    answer:
      "返回局部变量的引用或指针是「悬垂引用（dangling reference）」——函数返回后局部变量的栈帧被回收，引用指向的内存随时可能被覆盖。`int &foo() { int x = 5; return x; }` ——foo() 返回的引用指向已销毁的 x，后续任何对返回值的读写都是未定义行为（可能恰好读到残留值、可能程序崩溃、可能被编译器优化为完全不可预知的行为）。同理：指针也不能指向局部变量后返回。安全做法：返回值（通过拷贝返回值的副本）或返回静态/动态分配的对象。",
    tags: ["悬垂引用", "dangling", "返回引用", "未定义行为"],
  },
  {
    id: "cfn-17",
    chapter: "cpp-functions",
    level: 2,
    question: "inline 函数为什么必须放在头文件里？不放在头文件会怎样？",
    answer:
      "inline 函数在调用点被展开——编译器需要在整个编译单元内看到 inline 函数的完整定义才能展开。如果 inline 函数只放在某个 .cpp 文件里，其他 .cpp 编译时看不到定义，无法内联展开（可能报链接错误「未定义符号」）。所以 inline 函数的完整定义通常直接写在头文件中，被每个包含它的 .cpp 在编译期看到。constexpr 函数同理。",
    tags: ["inline", "头文件", "内联", "ODR"],
  },
  {
    id: "cfn-18",
    chapter: "cpp-functions",
    level: 2,
    question: "为什么 `void f(int &x)` 不能接受字面值（如 `f(5)`），但 `void f(const int &x)` 可以？",
    answer:
      "`int &x` 是非常量引用——「我要通过这个引用修改实参」。字面值 `5` 不是个有名字、有地址的变量——它是一个临时值，没有地方让你「写到它里面去修它」。C++ 禁止把临时值绑到非常量引用上——因为改了也没地方看。`const int &x` 是「我只读、不改」——既然不改、绑定到一个临时值就没有问题——编译器会创建一个隐藏的临时变量存 5，让 x 引用它。这就是为什么函数要读但不改的形参应该用 const T&——能接受更多种类的实参。",
    tags: ["const引用", "字面值", "临时值", "非常量引用"],
  },

  // ── L3 应用：读代码 / 排错 ──
  {
    id: "cfn-19",
    chapter: "cpp-functions",
    level: 3,
    question:
      "下面这段代码输出什么？为什么？\n  `void swap_wrong(int a, int b) { int t = a; a = b; b = t; }`\n  `int main() { int x = 3, y = 7; swap_wrong(x, y); std::cout << x << ' ' << y; return 0; }`",
    answer:
      "输出 `3 7`——x 和 y 都没有变。`swap_wrong` 的参数是值传递——a 和 b 是 x 和 y 的独立副本。函数体内交换的是副本，x 和 y 不受影响。修正：把形参改成引用——`void swap_right(int &a, int &b)`，此时 a 和 b 是 x 和 y 的别名——交换 a 和 b 就是交换 x 和 y，输出 `7 3`。",
    tags: ["值传递", "引用传递", "swap", "排错"],
  },
  {
    id: "cfn-20",
    chapter: "cpp-functions",
    level: 3,
    question:
      "这段代码有 bug——找出并解释：\n  `void printArraySize(int arr[10]) { std::cout << sizeof(arr); }`\n  `int main() { int nums[10] = {}; printArraySize(nums); }`",
    answer:
      "Bug：输出的是 8（64 位系统），不是 40。`int arr[10]` 在形参中退化成了 `int*`——`sizeof(arr)` 实际上是 `sizeof(int*)` = 8（指针大小），不是 `sizeof(int[10])` = 40。函数永远不知道传入的数组有多大——必须单独传长度：`void printArraySize(int *arr, int n) { std::cout << n * sizeof(int); }` 或直接 cout << n。",
    tags: ["数组退化", "sizeof", "指针", "排错"],
  },
  {
    id: "cfn-21",
    chapter: "cpp-functions",
    level: 3,
    question:
      "下面这样用默认实参合法吗？`void f(int a, int b = 5, int c);` 为什么？如果后面再加一行 `void f(int a, int b, int c = 3);` 呢？",
    answer:
      "第一个声明不合法：默认实参必须从最右边的形参开始连续给——`int b = 5` 后面还有 `int c` 没给默认值，违反规则，编译器报错。但如果顺序对了（`void f(int a, int b = 5, int c = 10);`），后面再写一行 `void f(int a, int b, int c = 3);`，则最终默认实参是 b=5, c=3——后续声明可以给之前没默认值的形参加，但不能覆盖已有的。",
    tags: ["默认实参", "函数声明", "排错"],
  },
  {
    id: "cfn-22",
    chapter: "cpp-functions",
    level: 3,
    question:
      "下面重载有潜在问题——调用 `print(0)` 时会怎样？\n  `void print(int x) { std::cout << \"int\"; }`\n  `void print(double x) { std::cout << \"double\"; }`\n  `void print(long x) { std::cout << \"long\"; }`",
    answer:
      "0 是 `int` 字面值：对 `print(int)` 是精确匹配——最好。`print(double)` 需要浮点转换，`print(long)` 需要整型提升——两者都比精确匹配差。所以 `print(0)` 会调用 `print(int)`，输出 `int`。但如果只有后两个重载、没有 `print(int)`，`print(0)` 就是 ambiguous——long 的提升和 double 的转换同一等级、分不出优劣——编译器报错。",
    tags: ["重载", "ambiguous", "重载二义性", "排错"],
  },
  {
    id: "cfn-23",
    chapter: "cpp-functions",
    level: 3,
    question:
      "下面这段 constexpr 函数为什么编译报错？\n  `constexpr int random_value() { std::srand(time(0)); return std::rand(); }`",
    answer:
      "constexpr 函数要求**所有实参都是常量表达式时编译期就能算出结果**。但 `srand()` 和 `rand()` 依赖运行时状态（随机种子、系统时间等），不可能在编译期确定——编译器报错。constexpr 函数体内只能用能在编译期求值的东西——不能调用非 constexpr 函数、不能读写文件、不能依赖全局变量。简单说 constexpr 函数要「纯函数」：相同输入 → 相同输出、无副作用。",
    tags: ["constexpr", "编译错误", "编译期"],
  },
  {
    id: "cfn-24",
    chapter: "cpp-functions",
    level: 3,
    question:
      "下面的写法有什么隐藏问题？`void process(const std::string &s, int count = s.size())`",
    answer:
      "编译错误——默认实参不能引用同一声明中的其他形参（即便是前面的形参也不行）：名字 `s` 在默认实参表达式中不可见。即使改成合法的表达，默认实参也必须是能在编译期确定的常量表达式（或者在不依赖其他形参时在调用点求值——有的编译器允许引用前面的形参但标准不保证）。修正：把默认值定义为独立常量——`void process(const std::string &s, int count = -1)`，函数体内判断 `if (count < 0) count = s.size()`; 来处理默认逻辑。",
    tags: ["默认实参", "形参", "编译错误", "排错"],
  },

  // ── L4 综合：陷阱 / 全流程 ──
  {
    id: "cfn-25",
    chapter: "cpp-functions",
    level: 4,
    question:
      "综合题：设计并实现一个函数 `countLetters`，要求：(1) 接收一个 `const string &` 文本和一个 `char` 要统计的字符；(2) **不区分大小写**统计字符出现次数（'A' 和 'a' 算同一个）；(3) 用 `inline` 声明；(4) 处理空白字符——跳过空格和制表符。给出完整实现和调用示例。",
    answer:
      "```cpp\n#include <string>\n#include <cctype>\ninline int countLetters(const std::string &text, char target) {\n    target = std::tolower(static_cast<unsigned char>(target));\n    int count = 0;\n    for (char ch : text) {\n        if (std::isspace(static_cast<unsigned char>(ch))) continue;\n        if (std::tolower(static_cast<unsigned char>(ch)) == target) count++;\n    }\n    return count;\n}\n// 调用：countLetters(\"Hello World\", 'l') → 3 (两个 'l' + 一个 'L')\n```\n要点：① 参数 text 用 const string& 避免拷贝 ② target 先统一转小写、循环中逐个比 ③ static_cast<unsigned char> 处理 char 转 unsigned char 避免符号扩展 ④ inline 适合这种体积极小的工具函数。",
    tags: ["综合", "inline", "const引用", "string", "tolower"],
  },
  {
    id: "cfn-26",
    chapter: "cpp-functions",
    level: 4,
    question:
      "综合题：写一个函数 `split`，把一个字符串按分隔符切开并返回所有子串。要求：(1) 接收 `const string &` 输入和 `char` 分隔符；(2) 返回 `vector<string>` ——注意这里应该返回值还是引用？为什么？(3) 用引用参数 `vector<string> &out` 来「输出」结果行不行？哪种更好？",
    answer:
      "方案A——返回值（推荐）：\n```cpp\n#include <string>\n#include <vector>\n#include <sstream>\nstd::vector<std::string> split(const std::string &s, char delim) {\n    std::vector<std::string> tokens;\n    std::istringstream iss(s);\n    std::string token;\n    while (std::getline(iss, token, delim)) tokens.push_back(token);\n    return tokens;\n}\n```\n方案B——引用参数输出：`void split(const string &s, char delim, vector<string> &out)` 也行——避免了一次返回值的拷贝。但方案A更干净：调用方直接 `auto words = split(text, ' ');` 就能用，语义清晰。C++11 起有「移动语义」——返回局部 vector 时编译器自动把内部指针移出去不拷贝，方案A没有性能代价。推荐方案A。",
    tags: ["综合", "返回值", "引用参数", "move", "vector"],
  },
  {
    id: "cfn-27",
    chapter: "cpp-functions",
    level: 4,
    question:
      "综合题：为什么这段代码编译通过却「什么都没改」？排查并修正。\n  `void init(int *p) { p = new int(42); }`\n  `int main() { int *ptr = nullptr; init(ptr); std::cout << *ptr; return 0; }`",
    answer:
      "`init` 的参数 `p` 是指针的**值传递**——p 是 ptr 的副本（都存着 nullptr，但 p 和 ptr 是不同的指针变量）。`p = new int(42)` 只把**副本 p** 指向了新分配的内存——ptr 仍然是 nullptr。main 中 `*ptr` 解引用空指针 = 段错误。修正方案A：传指针的引用——`void init(int *&p) { p = new int(42); }`，此时 p 是 ptr 的别名。方案B：传二级指针——`void init(int **p) { *p = new int(42); }`，调用 `init(&ptr)`。方案A 更推荐（引用语法更干净）。核心教训：**指针也是按值传递的**——函数内改指针指向不会影响外部的指针变量。",
    tags: ["综合", "指针传递", "值传递", "new", "二级指针"],
  },
  {
    id: "cfn-28",
    chapter: "cpp-functions",
    level: 4,
    question:
      "综合题：用函数重载写一个通用的 `max` 函数族——同时支持两个 int、两个 double、三个 int 的比较。要求：其中两个 int 的版本用 `inline` 声明、三个 int 的版本复用两个 int 的版本。写出三份重载声明和定义。",
    answer:
      "```cpp\n// 两个 int——inline，小函数用内联提性能\ninline int max(int a, int b) { return a > b ? a : b; }\n// 两个 double\ninline double max(double a, double b) { return a > b ? a : b; }\n// 三个 int——复用两个 int 版本\ninline int max(int a, int b, int c) { return max(max(a, b), c); }\n```\n设计要点：① 三个 int 的版本通过调用两个 int 的重载来「逐对比较」，避免了重新写三元运算——代码复用 + 意图清晰 ② 如果三个 int 版本调用的是 `max(a, b)` 后再 `max(result, c)`，编译器通过函数重载匹配自动挑到两个 int 版本 ③ inline 适合这种体积极小的工具函数——调用开销可能比函数体本身还大。",
    tags: ["综合", "函数重载", "inline", "max"],
  },
];

export default cppFunctionsQuestions;
