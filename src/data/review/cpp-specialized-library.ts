/** 复习题库 · C++ 标准库特殊设施（cpp-specialized-library）。C++ Primer §17 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cppSpecializedLibraryQuestions: ReviewQuestion[] = [
  // ── L1 认记 ──
  {
    id: "csl-1",
    chapter: "cpp-specialized-library" as any,
    level: 1,
    question: "什么是 `tuple`？它和 `pair` 有什么区别？",
    answer:
      "`tuple` 是 C++11 引入的**固定大小的异构容器**——可以存放任意数量、任意类型的元素。`pair` 只能存放恰好两个元素（`.first` / `.second`），而 `tuple` 可以存放零个到任意多个。访问方式不同：`pair` 用 `.first/.second` 成员，`tuple` 用 `get<N>(t)` 模板函数——`N` 必须是编译期常量，写错索引编译期就报错。`make_tuple` 可自动推导类型创建 tuple，`tie` 可以解包 tuple 到已有变量。",
    tags: ["tuple", "pair", "get<>", "异构容器"],
  },
  {
    id: "csl-2",
    chapter: "cpp-specialized-library" as any,
    level: 1,
    question: "`bitset<N>` 是什么？`N` 有什么约束？列出五种常用操作。",
    answer:
      "`bitset<N>` 是**固定大小的二进制位集合**——把每一位当作独立对象操作。`N` 必须是**编译期常量**（constexpr），因为 bitset 是类模板，`N` 是非类型模板参数。五种常用操作：① `set(pos)`——指定位置设为 1；② `reset(pos)`——指定位清零；③ `flip(pos)`——翻转指定位置（0↔1）；④ `test(pos)`——检查指定位是 0 还是 1（不修改）；⑤ `count()`——统计值为 1 的总位数。此外还有 `to_string()` 转成字符串、`to_ulong()` / `to_ullong()` 转成整数。",
    tags: ["bitset", "位操作", "set", "reset", "flip", "test", "count"],
  },
  {
    id: "csl-3",
    chapter: "cpp-specialized-library" as any,
    level: 1,
    question: "C++ 正则表达式库的核心类和函数有哪些？简要说明各组件的作用。",
    answer:
      "C++ `<regex>` 库的核心组件：① `regex`——表示编译后的正则表达式模式，构造时传入模式字符串；② `smatch`——存储匹配结果的类（`match_results<string::const_iterator>` 的别名），`smatch[0]` 是完整匹配、`smatch[1]` 起是各捕获组；③ `regex_search`——在字符串中搜索第一个匹配；④ `regex_match`——检查整个字符串是否完全匹配模式；⑤ `sregex_iterator`——迭代遍历字符串中所有匹配项。还有 `regex_replace` 用于正则替换。使用 R\"(...)\" 原始字符串字面量（raw string literal）可以避免转义反斜杠。",
    tags: ["regex", "smatch", "regex_search", "捕获组", "正则"],
  },
  {
    id: "csl-4",
    chapter: "cpp-specialized-library" as any,
    level: 1,
    question: "C++ 随机数库 `<random>` 与旧式 `rand()` 相比有哪些优势？库由哪两部分组成？",
    answer:
      "C++11 `<random>` 相比旧式 `rand()` 的四大优势：① **随机性质量可控**——`mt19937` 等引擎提供高质量伪随机数，`rand()` 的实现质量因平台而异且通常很差；② **分布和引擎分离**——引擎负责生成原始随机 bits，分布负责映射到目标范围/曲线（均匀、正态、伯努利等），组合灵活；③ **范围精确无偏差**——`uniform_int_distribution(a,b)` 在 `[a,b]` 上真正均匀，`rand()%N` 有取模偏差；④ **可复现**——同一种子同一引擎保证相同序列（调试友好），`rand()` 的种子机制不可靠。库由**随机数引擎**（如 `mt19937`）和**分布对象**（如 `uniform_int_distribution`）两部分组成，使用时通过 `dist(engine)` 结合。",
    tags: ["random", "mt19937", "rand()", "分布", "引擎", "偏差"],
  },
  {
    id: "csl-5",
    chapter: "cpp-specialized-library" as any,
    level: 1,
    question: "什么是 `make_tuple`、`tie` 和 C++17 的结构化绑定？它们各用于什么场景？",
    answer:
      "`make_tuple`——根据实参类型自动推导创建 tuple：`auto t = make_tuple(42, \"hello\", 3.14);` 产生 `tuple<int, const char*, double>`。`tie`——把现有变量的引用绑到 tuple 元素上，用于解包：`int a; string b; tie(a, b) = make_tuple(1, \"x\");` → a=1, b=\"x\"。可以用 `ignore` 占位符跳过不需要的元素。C++17 **结构化绑定**——`auto [x, y, z] = t;` 是 tie 的语法糖，直接声明新变量并批量赋值，更简洁。场景对比——需要复用已有变量用 tie，直接声明新变量用结构化绑定。",
    tags: ["make_tuple", "tie", "结构化绑定", "ignore", "解包"],
  },
  {
    id: "csl-6",
    chapter: "cpp-specialized-library" as any,
    level: 1,
    question: "正则表达式中，什么是捕获组？`smatch[0]` 和 `smatch[1]` 分别返回什么？",
    answer:
      "**捕获组**是正则模式中用括号 `()` 包围的子表达式。匹配成功时，括号内匹配到的子串会被单独提取出来——方便你提取「电话号码里的区号」「日期里的年份」等子部分。`smatch[0]` 返回整个正则表达式匹配到的完整字符串（全文）。`smatch[1]` 返回第一个左括号对应的捕获组匹配内容，`smatch[2]` 是第二个，以此类推。例如正则 `(\\d+)-(\\w+)` 匹配 `\"123-abc\"` 时——`smatch[0]=\"123-abc\"`（完整匹配），`smatch[1]=\"123\"`（第一个捕获组）、`smatch[2]=\"abc\"`（第二个捕获组）。",
    tags: ["捕获组", "smatch", "子表达式", "括号"],
  },
  {
    id: "csl-7",
    chapter: "cpp-specialized-library" as any,
    level: 1,
    question: "常用的随机数分布有哪些？各用于什么场景？",
    answer:
      "① `uniform_int_distribution<T>(a, b)`——范围 `[a,b]` 的均匀整数分布，用于骰子、抽签等。② `uniform_real_distribution<T>(a, b)`——范围 `[a,b)` 的均匀实数分布，用于随机的 x/y 坐标等。③ `normal_distribution<T>(mean, stddev)`——正态（高斯）分布，用于模拟自然测量误差、身高分布等。④ `bernoulli_distribution(p)`——伯努利分布，以概率 p 返回 true、以概率 1−p 返回 false，用于随机布尔决策。⑤ `exponential_distribution<T>(lambda)`——指数分布，用于模拟等待时间。核心原则：引擎选「质量」，分布选「形状」。",
    tags: ["uniform", "normal", "bernoulli", "分布", "概率"],
  },

  // ── L2 理解 ──
  {
    id: "csl-8",
    chapter: "cpp-specialized-library" as any,
    level: 2,
    question: "`tuple` 的元素在内存中是如何排列的？`get<0>(t)` 返回的是引用还是值？为什么？",
    answer:
      "tuple 元素在内存中是**连续存储**的——索引 0、1、2 依次排布，各元素紧挨着存放在同一块内存中（实现通常是递归继承）。`get<N>(t)` 返回的是**引用**（取决于 t 的 const 限定）：非 const tuple 返回 `T&`，const tuple 返回 `const T&`。返回引用的原因是：① 允许修改元素——`get<0>(t) = 100;` 直接改 tuple 内部；② 避免大对象拷贝。索引 N 必须是**编译期常量**——这样编译器在编译期就能确定返回类型和内存偏移量 → 零运行时开销。写成 `get<3>(t)`（超出范围）编译器直接报错。",
    tags: ["tuple", "内存布局", "get<>", "引用", "编译期"],
  },
  {
    id: "csl-9",
    chapter: "cpp-specialized-library" as any,
    level: 2,
    question: "`bitset<8> b(42);` 创建后，`b.to_string()`、`b.to_ulong()` 和 `b.count()` 分别返回什么？为什么？",
    answer:
      "`bitset<8> b(42);`——用整数 42 初始化 8 位 bitset。42 的二进制表示是 `00101010`（0×32 + 0×16 + 1×8 + 0×4 + 1×2 + 0×1 = 42），高位补 0 填满 8 位。`b.to_string()` → `\"00101010\"`——把 bitset 转为二进制字符串，高位在前。`b.to_ulong()` → `42`——转回无符号长整型，即原始数值。`b.count()` → `3`——三位为 1（第 1、3、5 位，对应 2¹+2³+2⁵=2+8+32=42）。to_string 和 to_ulong 在 bitset 值超过目标类型范围时会抛 `overflow_error` 异常。",
    tags: ["bitset", "to_string", "to_ulong", "count", "二进制"],
  },
  {
    id: "csl-10",
    chapter: "cpp-specialized-library" as any,
    level: 2,
    question: "`regex_search` 和 `regex_match` 有什么区别？各举一个使用场景。",
    answer:
      "`regex_search`——在字符串中**搜索第一个匹配的子串**。只要字符串中有某一部分满足模式就成功。场景：从一大段日志里找到所有 IP 地址。`regex_match`——检查**整个字符串是否完全匹配**模式。字符串必须从头到尾都满足模式才成功。场景：验证用户输入是不是合法邮箱地址。代码对照——`regex_search(\"abc123def\", regex(\"\\\\d+\"))` → true（找到 123）；`regex_match(\"abc123def\", regex(\"\\\\d+\"))` → false（\"abc123def\" 不全是数字）。regex_match 更严格、regex_search 更灵活——选哪个取决于你需要「找到包含的」还是「确认整体合规」。",
    tags: ["regex_search", "regex_match", "匹配", "搜索"],
  },
  {
    id: "csl-11",
    chapter: "cpp-specialized-library" as any,
    level: 2,
    question: "使用 `sregex_iterator` 遍历所有匹配时，`end` 迭代器什么时候产生？为什么需要它来判断终止？",
    answer:
      "`sregex_iterator it(str.begin(), str.end(), re)` 从字符串开头开始搜索——每次递增 `++it` 时，引擎从上一个匹配之后的位置继续搜索下一个匹配。当找不到更多匹配时，迭代器变成**尾后迭代器**（即默认构造的 `sregex_iterator{}`，不是 `end()` 函数返回值）。`for (auto it = sregex_iterator(...); it != sregex_iterator{}; ++it)` 是标准遍历模式。需要一个独立的结束哨兵是因为正则匹配的结束位置不是简单的 `str.end()`——匹配可能在字符串中间结束，需要引擎内部判断「没有下一个匹配了「。这和不带参数的默认构造函数返回的就是这个结束迭代器。",
    tags: ["sregex_iterator", "迭代器", "尾后", "遍历匹配"],
  },
  {
    id: "csl-12",
    chapter: "cpp-specialized-library" as any,
    level: 2,
    question: "分布对象 `dist(engine)` 为什么可以像函数一样调用？它每次调用返回的值一定不同吗？",
    answer:
      "分布对象可以像函数一样调用是因为它重载了 `operator()`——所有分布类都是**函数对象（functor）**。`dist(engine)` 等价于 `dist.operator()(engine)`。每次调用 `dist(engine)` 时——引擎的内部状态会推进，生成一个新的原始随机数，分布对象把它映射到目标范围/分布上。所以**每次调用通常返回不同值**——但并不保证相邻两次一定不同（概率极小但不是零）。如果需要保证每次不同，可以用 `shuffle` 配合 `random_device`。分布对象的参数（如范围 a,b）在构造后可以通过成员函数修改——不需要重新创建对象。",
    tags: ["分布", "operator()", "引擎", "函数对象"],
  },
  {
    id: "csl-13",
    chapter: "cpp-specialized-library" as any,
    level: 2,
    question: "为什么 `get<N>(t)` 的 `N` 必须是编译期常量？如果写成 `get<i>(t)`（i 是变量）会怎样？",
    answer:
      "`N` 必须是编译期常量——因为 tuple 的每个元素类型不同（如 `tuple<int, double, string>`），`get<0>(t)` 返回 `int&`、`get<1>(t)` 返回 `double&`。如果 `N` 是运行时变量，编译器无法在编译期确定**返回类型**——因为 `i` 不同时返回类型就变了。C++ 是静态类型语言——每个表达式的类型必须在编译期确定。写成 `get<i>(t)`（i 是变量）→ 编译错误，报 'the value of i is not usable in a constant expression'。解决方案：把所有元素类型统一（全用某种公共基类或 variant），或改变设计——如果确实需要运行时索引，tuple 不是合适的工具，考虑用 `vector<variant<...>>`。",
    tags: ["tuple", "get<>", "编译期常量", "静态类型"],
  },

  // ── L3 应用 ──
  {
    id: "csl-14",
    chapter: "cpp-specialized-library" as any,
    level: 3,
    question:
      '补全代码：用 `tuple` 存储一个学生的信息（姓名 `string`、学号 `int`、GPA `double`），用 `tie` 解包到三个变量，用结构化绑定写另一个等价版本。\n```cpp\nauto student = ???;\n// tie 解包\n???\n// 结构化绑定解包\n???\n```',
    answer:
      '```cpp\n// 创建\nauto student = std::make_tuple(std::string("张三"), 2021001, 3.85);\n// 或: tuple<string, int, double> student("张三", 2021001, 3.85);\n\n// tie 解包（需要预先声明变量）\nstd::string name;\nint id;\ndouble gpa;\nstd::tie(name, id, gpa) = student;\n\n// C++17 结构化绑定（一步到位）\nauto [name2, id2, gpa2] = student;\n```\n设计要点：① `make_tuple` 自动推导类型，不用手写 `tuple<string,int,double>` ② tie 的变量必须提前声明——tie 把 tuple 元素写入已有引用 ③ 结构化绑定更简洁——auto 直接声明新变量并绑定 ④ 如果不想取某个元素，tie 用 `std::ignore` 占位：`tie(name, ignore, gpa) = student;`。',
    tags: ["tuple", "tie", "结构化绑定", "make_tuple", "ignore"],
  },
  {
    id: "csl-15",
    chapter: "cpp-specialized-library" as any,
    level: 3,
    question:
      '用 `bitset<32>` 实现以下功能：(1) 将第 7 位和第 15 位设为 1；(2) 统计并输出所有位中 1 的总数；(3) 将整个 bitset 左移 3 位后输出二进制字符串。',
    answer:
      '```cpp\n#include <bitset>\n#include <iostream>\n\nstd::bitset<32> b;           // 默认全 0\nb.set(7);                     // 第 7 位 = 1\nb.set(15);                    // 第 15 位 = 1\n\nstd::cout << "set后: " << b << \'\\n\';               // 二进制输出\nstd::cout << "count = " << b.count() << \'\\n\';     // 2\n\n// 左移 3 位\nb <<= 3;\nstd::cout << "左移3位后: " << b.to_string() << \'\\n\';\n// 也可以: auto shifted = b << 3;  // 不修改 b\n```\n要点：① bitset 支持 `<<` 位移运算符（类整数运算）② `<< b` 直接插入 ostream，自动以二进制形式输出 ③ `left-shift` 后低位填入 0，原来 7/15 位上的 1 移动到 10/18 位 ④ bitset 的位从 0 开始编号（最低位为第 0 位）。',
    tags: ["bitset", "set", "count", "位移", "to_string"],
  },
  {
    id: "csl-16",
    chapter: "cpp-specialized-library" as any,
    level: 3,
    question:
      "写一个 `extract_emails` 函数——接受一个字符串，用正则提取所有邮箱地址（形如 `user@domain.com`），返回 `vector<string>`。要求用 `sregex_iterator` 遍历所有匹配。",
    answer:
      '```cpp\n#include <regex>\n#include <string>\n#include <vector>\n\nstd::vector<std::string> extract_emails(const std::string &text) {\n    std::vector<std::string> result;\n    // 邮箱正则：字母数字._%- + @ + 字母数字.- + . + 2-6字母\n    std::regex email_re(R"([\\w.%-]+@[\\w.-]+\\.[A-Za-z]{2,6})");\n\n    auto begin = std::sregex_iterator(text.begin(), text.end(), email_re);\n    auto end = std::sregex_iterator();\n\n    for (auto it = begin; it != end; ++it) {\n        result.push_back(it->str());  // it->str() 返回整个匹配\n    }\n    return result;\n}\n\n// 使用:\nauto emails = extract_emails("联系: alice@mail.com, bob@work.org");\n// emails = {"alice@mail.com", "bob@work.org"}\n```\n要点：① `R"(...)"` 是原始字符串字面量，避免在正则里写成 `\\\\w` ② `it->str()` 返回 smatch 中的完整匹配（等效 `(*it)[0].str()`）③ 默认构造的 `sregex_iterator{}` 是尾后哨兵——while/for 循环式 `it != sregex_iterator{}`。',
    tags: ["regex", "sregex_iterator", "邮箱", "原始字符串"],
  },
  {
    id: "csl-17",
    chapter: "cpp-specialized-library" as any,
    level: 3,
    question:
      "写出一个 lambda 封装 `[a,b]` 范围均匀随机整数的 `rand_int` 函数对象，然后写一个骰子类 `Dice` 用这个模式每次调用返回 1~6 的随机值。",
    answer:
      '```cpp\n#include <random>\n#include <functional>\n\n// 引擎和分布各创建一次，lambda 捕获引用，每次调用推进引擎\nauto make_rand_int(int a, int b) {\n    // 注意：引擎不能是局部变量——否则每次调用 make_rand_int 都创建新引擎\n    // 应该用 static 或在外层作用域创建\n    static std::mt19937 gen(std::random_device{}());\n    std::uniform_int_distribution<int> dist(a, b);\n    return [&gen, dist]() mutable { return dist(gen); };\n}\n\n// 骰子类\nclass Dice {\npublic:\n    Dice() : gen_(std::random_device{}()), dist_(1, 6) {}\n    int roll() { return dist_(gen_); }\n    void reseed(unsigned s) { gen_.seed(s); }\n\nprivate:\n    std::mt19937 gen_;\n    std::uniform_int_distribution<int> dist_;\n};\n\nDice d6;\nstd::cout << d6.roll();  // 每次随机出 1~6\n```\n设计要点：① 引擎创建一次（构造或 static）——反复创建引擎浪费且序列差 ② random_device 做种子——真随机种子 + 伪随机序列 ③ `mutable` 让 lambda 能修改捕获的 dist 状态 ④ 封装成类更清晰——Dice 持有引擎+分布，roll() 一行调用。',
    tags: ["random", "lambda", "Dice", "封装", "mt19937"],
  },
  {
    id: "csl-18",
    chapter: "cpp-specialized-library" as any,
    level: 3,
    question:
      "写一个函数 `parse_date`——用正则从 `\"2024-05-17\"` 中提取年、月、日三个捕获组并返回 `tuple<int,int,int>`。模式：`(\\d{4})-(\\d{2})-(\\d{2})`。",
    answer:
      '```cpp\n#include <regex>\n#include <tuple>\n#include <optional>\n\nstd::optional<std::tuple<int, int, int>> parse_date(const std::string &s) {\n    std::regex re(R"((\\d{4})-(\\d{2})-(\\d{2}))");\n    std::smatch m;\n    if (std::regex_match(s, m, re)) {  // regex_match: 整个串必须匹配\n        int year  = std::stoi(m[1].str());\n        int month = std::stoi(m[2].str());\n        int day   = std::stoi(m[3].str());\n        return std::make_tuple(year, month, day);\n    }\n    return std::nullopt;\n}\n\nauto date = parse_date("2024-05-17");\nif (date) {\n    auto [y, m, d] = *date;\n    // y=2024, m=5, d=17\n}\n```\n要点：① `regex_match`（不是 regex_search）——要求整个串严格匹配格式，拒绝 "abc2024-05-17xyz" ② `m[1]` 起对应捕获组（m[0] 是全文）③ `stoi` 把 sub_match 字符串转整数 ④ 返回 optional 是 C++17 的推荐模式——匹配失败返回 nullopt 而非抛异常。',
    tags: ["regex_match", "捕获组", "parse", "optional"],
  },

  // ── L4 综合 ──
  {
    id: "csl-19",
    chapter: "cpp-specialized-library" as any,
    level: 4,
    question:
      "设计一个 `CSVRow` 类——用 `tuple` 存储一行 CSV 数据的各个字段（类型各不相同），支持：① 用模板构造函数接收任意数量的参数并打包成 tuple；② 提供 `field<N>()` 返回第 N 个字段的引用；③ 实现 `operator==`（逐字段比较）。说明你的设计中 `N` 超出范围时如何处理。",
    answer:
      '```cpp\ntemplate<typename... Args>\nclass CSVRow {\npublic:\n    explicit CSVRow(Args... args) : data_(std::forward<Args>(args)...) {}\n\n    template<std::size_t N>\n    decltype(auto) field() {\n        return std::get<N>(data_);\n    }\n    template<std::size_t N>\n    decltype(auto) field() const {\n        return std::get<N>(data_);\n    }\n\n    template<typename... OtherArgs>\n    bool operator==(const CSVRow<OtherArgs...> &other) const {\n        if constexpr (sizeof...(Args) != sizeof...(OtherArgs))\n            return false;\n        if constexpr (sizeof...(Args) == sizeof...(OtherArgs))\n            return data_ == other.data_;\n    }\n\n    static constexpr std::size_t size() { return sizeof...(Args); }\n\nprivate:\n    std::tuple<Args...> data_;\n};\n\n// 使用:\nCSVRow<std::string, int, double> row("Alice", 30, 1.75);\nauto name = row.field<0>();   // "Alice"\nauto age  = row.field<1>();   // 30\n```\nN 超出范围——`get<N>` 在 N≥sizeof...(Args) 时**编译期报错**（static_assert）——这是模板的特性，不需要额外处理。这种「编译期保安全"正是 tuple 的优势——没机会让越界活到运行时。',
    tags: ["tuple", "CSV", "可变参数", "模板", "编译期检查"],
  },
  {
    id: "csl-20",
    chapter: "cpp-specialized-library" as any,
    level: 4,
    question:
      "判断对错并解释：在同一个程序中——`uniform_int_distribution<int>(1, 100)` 创建两个分布对象，用同一个引擎分别调用它们，两个分布对象返回的随机序列相同。",
    answer:
      "**错**。分布对象不是无状态的——它内部维护自己的状态（用于将引擎的原始输出映射到目标分布上）。**同一个分布对象**用同一个引擎每次调用会推进引擎状态，产生不同值。但**两个独立创建的分布对象**——即使范围参数相同、使用同一个引擎——它们的内部状态是**独立的**。每个分布对象各自维护自己的状态机——各调各的、互不影响、不产生相同序列。想要相同的随机序列——应该用一个分布对象多次调用，而不是创建两个相同的分布对象。这和各种分布的算法实现有关——分布不只是简单的线性变换，内部可能有缓存/拒绝采样等状态。",
    tags: ["分布", "状态", "序列", "独立对象"],
  },
  {
    id: "csl-21",
    chapter: "cpp-specialized-library" as any,
    level: 4,
    question:
      "写一个正则函数 `replace_phone_format`——把文本中所有形如 `13800138000` 的 11 位手机号替换为 `138****8000`（隐藏中间四位）。要求：① 用 `regex_replace`；② 用 `$&` 或捕获组引用匹配内容。",
    answer:
      '```cpp\n#include <regex>\n#include <string>\n\nstd::string replace_phone_format(const std::string &text) {\n    // 匹配 11 位数字（中国手机号）\n    std::regex phone_re(R"((\\d{3})(\\d{4})(\\d{4}))");\n    // $1 = 前 3 位, $2 = 中间 4 位, $3 = 后 4 位\n    // 替换为 前3 + **** + 后4\n    return std::regex_replace(text, phone_re, "$1****$3");\n}\n\n// 测试\nauto result = replace_phone_format("联系我: 13800138000 或 15912345678");\n// result = "联系我: 138****8000 或 159****5678"\n```\n要点：① 三个捕获组分别匹配前三位、中间四位、后四位 ② 替换字符串中的 `$1`、`$3` 引用对应捕获组的匹配内容 ③ `$&` 引用整个匹配（此处不需要——我们要改写中间四位）④ regex_replace 不修改原串——返回新字符串。',
    tags: ["regex_replace", "捕获组", "替换", "手机号"],
  },
  {
    id: "csl-22",
    chapter: "cpp-specialized-library" as any,
    level: 4,
    question:
      "设计一个 `SeededRandom` 类——用指定种子初始化 `mt19937` 引擎，提供 `uniform(a,b)`、`normal(mean,stddev)`、`bernoulli(p)` 三个方法，每个返回对应分布的随机值。回答：为什么引擎是成员而分布是局部变量？",
    answer:
      '```cpp\n#include <random>\n\nclass SeededRandom {\npublic:\n    explicit SeededRandom(unsigned seed) : gen_(seed) {}\n    SeededRandom() : gen_(std::random_device{}()) {}\n\n    int uniform(int a, int b) {\n        std::uniform_int_distribution<int> dist(a, b);\n        return dist(gen_);\n    }\n    double normal(double mean, double stddev) {\n        std::normal_distribution<double> dist(mean, stddev);\n        return dist(gen_);\n    }\n    bool bernoulli(double p) {\n        std::bernoulli_distribution dist(p);\n        return dist(gen_);\n    }\n    void reseed(unsigned s) { gen_.seed(s); }\n\nprivate:\n    std::mt19937 gen_;\n};\n```\n为什么引擎是成员——引擎的状态必须**跨调用持久化**。如果每次 uniform() 都创建新引擎，它总是从同一个种子出发 → 每次都返回相同序列的第一个值 → 失去「随机"的意义。分布可以在函数内创建为局部变量——每次根据参数构造一个新的，用完即弃，成本很小。引擎昂贵（~2.5KB 状态空间）不应反复创建；分布轻量（通常就几个参数）且参数每次可能不同——局部创建最方便。',
    tags: ["引擎", "分布", "成员变量", "局部变量", "状态持久化"],
  },
  {
    id: "csl-23",
    chapter: "cpp-specialized-library" as any,
    level: 4,
    question:
      "综合实战——设计一个 `LogParser` 类，构造函数接受日志文件路径，用正则从每行 `[2024-05-17 14:30:22] ERROR: connection timeout (retry 3/5)` 中提取时间、级别、消息、重试次数，存入 `tuple<string,string,string,int>` 的 vector。提供 `get_all()` 返回全部记录。",
    answer:
      '```cpp\n#include <regex>\n#include <string>\n#include <vector>\n#include <tuple>\n#include <fstream>\n\nclass LogParser {\npublic:\n    using LogEntry = std::tuple<std::string, std::string, std::string, int>;\n\n    explicit LogParser(const std::string &filepath) {\n        std::ifstream file(filepath);\n        std::string line;\n        std::regex re(\n            R"(\\[(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2})\\] )"\n            R"((\\w+): (.+?) \\(retry (\\d+)/\\d+\\))");\n\n        while (std::getline(file, line)) {\n            std::smatch m;\n            if (std::regex_search(line, m, re)) {\n                data_.emplace_back(\n                    m[1].str(),          // 时间\n                    m[2].str(),          // 级别\n                    m[3].str(),          // 消息\n                    std::stoi(m[4])      // 重试次数\n                );\n            }\n        }\n    }\n\n    const std::vector<LogEntry> &get_all() const { return data_; }\n\nprivate:\n    std::vector<LogEntry> data_;\n};\n\n// 使用:\nLogParser parser("server.log");\nfor (auto &[time, level, msg, retry] : parser.get_all()) {\n    if (level == "ERROR") {\n        // 处理错误...\n    }\n}\n```\n设计要点：① 用 `regex_search`（不是 regex_match）——每行可能不完全是日志格式 ② 四个捕获组分别捕获时间、级别、消息、重试次数 ③ `emplace_back` 直接构造 tuple ④ 结构化绑定遍历——`auto &[time,level,msg,retry]` 一行拆出四个字段 ⑤ 正则的分行字符串字面量——用空格拼接两个 `R"(...)"` 避免超长行。',
    tags: ["regex", "tuple", "日志解析", "结构化绑定", "综合"],
  },
];
