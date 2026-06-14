/** 复习题库 · C++ 重载运算与类型转换（cpp-overloaded-operations）。C++ Primer §14 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cppOverloadedOperationsQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "coo-1",
    chapter: "cpp-overloaded-operations" as any,
    level: 1,
    question: "什么是运算符重载？它本质是什么？",
    answer:
      "运算符重载是 C++ 让自定义类型也能使用内置运算符（`+` `==` `<<` `[]` 等）的机制。本质是定义一个叫 `operatorX` 的函数——编译器将 `a + b` 翻译为 `a.operator+(b)`（成员）或 `operator+(a,b)`（非成员）的普通函数调用。它是函数的语法糖——没有创造新运算符，只是给已有运算符赋予新的参数类型。",
    tags: ["运算符重载", "operator", "语法糖"],
  },
  {
    id: "coo-2",
    chapter: "cpp-overloaded-operations" as any,
    level: 1,
    question: "哪些运算符必须是成员函数？哪些必须是非成员函数？为什么？",
    answer:
      "**必须是成员函数的**：`=`（赋值）、`[]`（下标）、`()`（函数调用）、`->`（箭头）——语言强制规定，左操作数必须是该类对象。**必须是非成员函数的**：`<<`（输出）和 `>>`（输入）——左操作数是 `ostream`/`istream`（标准库类），你不可能给它添加成员函数。算术（`+` `-` `*` `/`）和关系（`==` `<`）推荐非成员——两侧操作数都可享受隐式类型转换，比成员更自然。",
    tags: ["成员函数", "非成员函数", "运算符重载规则"],
  },
  {
    id: "coo-3",
    chapter: "cpp-overloaded-operations" as any,
    level: 1,
    question: "什么是 `return *this` 模式？哪些运算符用它，为什么？",
    answer:
      "`return *this` 是返回调用对象自身引用（`ClassName&`）的重载模式——使上一步的返回值恰好就是下一步需要的类型，从而支持链式调用。应用场景：赋值（`a = b = c`）、复合赋值（`a += b += c`）、前缀递增递减（`++(++p)`）、函数调用（`obj(1)(2)`）。如果返回 `void`——链式就会断裂，编译器报错。如果是产生新结果的运算符（`+`、后缀`++`），则返回值而不是引用。",
    tags: ["return *this", "链式调用", "赋值", "复合赋值"],
  },
  {
    id: "coo-4",
    chapter: "cpp-overloaded-operations" as any,
    level: 1,
    question: "前缀 `++p` 和后缀 `p++` 在运算符重载中怎么区分？返回值类型有什么区别？",
    answer:
      "**区分方式**：后缀版本接受一个 `int` 形参（编译器自动传 `0`，只用于区分前缀，不实际使用）。形如 `operator++()` 是前缀、`operator++(int)` 是后缀。**返回值区别**：前缀返回 `ClassName&`（自身引用——自增后返回*this，零拷贝高效）；后缀返回 `ClassName`（值的副本——保存旧状态、自增、返回旧状态副本，多一次拷贝）。因此能用前缀就避免后缀——除非确实需要旧值。",
    tags: ["递增递减", "前缀后缀", "operator++", "返回值"],
  },
  {
    id: "coo-5",
    chapter: "cpp-overloaded-operations" as any,
    level: 1,
    question: "类型转换运算符是什么？为什么要加 `explicit`？`explicit operator bool()` 有什么特殊之处？",
    answer:
      "类型转换运算符是类内定义的将类类型转换为其他类型的函数——形如 `operator int() const`。定义后类对象可隐式转为目标类型——危险在于可能产生意外的隐式转换链（如 `si << 2` 被转为 `bool(true)` 再转 `int(1)`→结果不是期望的左移而是 1）。`explicit` 阻止这种意外。`explicit operator bool()` 特殊在于——条件判断语境（`if`/`while`/`for`/`?:`/`!`/`&&`/`||`）中它仍然隐式生效，保留了 `if(obj)` 的自然写法同时防止算术中的意外转换。",
    tags: ["类型转换", "explicit", "operator bool"],
  },
  {
    id: "coo-6",
    chapter: "cpp-overloaded-operations" as any,
    level: 1,
    question: "友元（friend）函数是什么？在运算符重载中什么时候用？",
    answer:
      "友元是用 `friend` 关键字在类内声明的外部函数或类——它虽然不是类的成员，但可以访问类的 `private` 和 `protected` 成员。运算符重载中常用于非成员运算符函数需要访问私有数据时——如 `operator<<`（必须是非成员）需要输出 `bookNo` 等私有成员，就用 `friend` 声明它。使用原则：只在确实需要访问私有成员且不能通过公有接口实现时才用——它打破了封装性。",
    tags: ["friend", "友元", "封装"],
  },

  // ── L2 理解：用法与区别 ──
  {
    id: "coo-7",
    chapter: "cpp-overloaded-operations" as any,
    level: 2,
    question: "算术运算符为什么推荐用非成员实现？如果 `operator+` 写成成员函数会有什么限制？举例说明。",
    answer:
      "非成员函数的两个操作数都作为参数传入——**两侧都参与隐式类型转换**。成员函数左操作数是隐式 `this`——必须是该类类型，不支持隐式转换。举例：`string s; \"hello\" + s;`——如果 `+` 是成员函数、左操作数 `\"hello\"` 是 `const char*`、不是 `string` 类型、编译失败。如果是非成员——`const char*` 隐式转换为 `string` 后再调用 `operator+(string, string)`，顺利通过。",
    tags: ["算术运算符", "成员 vs 非成员", "隐式转换"],
  },
  {
    id: "coo-8",
    chapter: "cpp-overloaded-operations" as any,
    level: 2,
    question: "输出运算符 `operator<<` 为什么返回 `ostream&` 而不是 `void`？如果返回 `void` 会怎样？",
    answer:
      "返回 `ostream&` 是为了支持链式输出——`cout << a << b << c` 等价于 `operator<<(operator<<(operator<<(cout, a), b), c)`。第一次调用返回的 `ostream&` 作为第二次调用的第一个参数——返回 `void` 就断了链。不仅如此，标准库的流操纵算子（如 `endl`）也依赖此机制——`cout << a << endl` 要求 `<< a` 的返回仍是 `ostream&`。同理输入返回 `istream&`。",
    tags: ["operator<<", "链式输出", "ostream"],
  },
  {
    id: "coo-9",
    chapter: "cpp-overloaded-operations" as any,
    level: 2,
    question: "下标运算符 `operator[]` 为什么通常提供一对重载（const 和 非 const）？各自返回什么类型？",
    answer:
      "非常量版本 `Elem& operator[](size_t)`——返回普通引用，可读可写（支持 `v[0] = x`）。常量版本 `const Elem& operator[](size_t) const`——返回 const 引用，只读。如果不提供 const 版本——`const` 对象无法调用非常量成员函数、`obj[0]` 直接编译错误。这对重载保证 `const` 对象也能用下标访问、但不允许通过它修改数据——和内置数组的 const 语义完全一致。",
    tags: ["operator[]", "const", "下标运算符"],
  },
  {
    id: "coo-10",
    chapter: "cpp-overloaded-operations" as any,
    level: 2,
    question: "函数对象（functor）和普通函数、lambda 表达式有什么联系和区别？lambda 的本质是什么？",
    answer:
      "**普通函数/函数指针**：最基础的——无状态，只指向已有函数。**Lambda**：编译器自动生成的**匿名函数对象**——本质是重载了 `operator()` 的匿名类，可以捕获上下文变量（通过 `[=]` `[&]` 语法）作为成员。**函数对象（functor）**：手动定义的类，显式重载 `operator()`——有名字、有独立状态（成员变量）、可复用。三者通过 `std::function` 或模板参数都可以统一作为可调用对象使用——满足「能用 `()` 调用」即可。",
    tags: ["函数对象", "lambda", "可调用对象", "functor"],
  },

  // ── L3 应用：代码级判断与用法 ──
  {
    id: "coo-11",
    chapter: "cpp-overloaded-operations" as any,
    level: 3,
    question:
      "下面代码有什么问题？\n```cpp\nclass MyString {\npublic:\n    MyString operator+(const MyString &rhs) {\n        // ...\n    }\n    void operator+=(const MyString &rhs) {\n        // ...\n    }\n};\n```",
    answer:
      "两个问题：① `operator+` 写成**成员函数**——推荐非成员以支持双侧隐式转换（如 `\u201Chello\u201D + s` 会失败）。② `operator+=` 返回 **`void`**——应该返回 `MyString&`（`*this`）以支持链式调用 `a += b += c`。修正：`+` 改为非成员函数委托给 `+=`；`+=` 返回 `MyString& operator+=(const MyString&) { ... return *this; }`。",
    tags: ["成员 vs 非成员", "operator+=", "返回类型"],
  },
  {
    id: "coo-12",
    chapter: "cpp-overloaded-operations" as any,
    level: 3,
    question:
      "为 `Point` 类（含 `double x, y`）实现完整的运算符重载：`+`（两点相加）、`==`（比较相等）、`<<`（输出 `(x,y)` 格式）。每个运算符选择成员或非成员，并说明理由。",
    answer:
      "```cpp\nclass Point {\n    friend std::ostream& operator<<(std::ostream&, const Point&);\n    friend Point operator+(const Point&, const Point&);\n    friend bool operator==(const Point&, const Point&);\npublic:\n    Point(double x = 0, double y = 0) : x(x), y(y) {}\n    Point& operator+=(const Point &rhs) { x+=rhs.x; y+=rhs.y; return *this; }\nprivate:\n    double x, y;\n};\n// operator<< 必须非成员（左操作数是 ostream）\nstd::ostream& operator<<(std::ostream &os, const Point &p) {\n    os << '(' << p.x << \",\" << p.y << ')';\n    return os;\n}\n// operator+ 推荐非成员——委托给 +=\nPoint operator+(const Point &lhs, const Point &rhs) {\n    Point sum = lhs; sum += rhs; return sum;\n}\n// operator== 推荐非成员——双侧隐式转换\nbool operator==(const Point &lhs, const Point &rhs) {\n    return lhs.x == rhs.x && lhs.y == rhs.y;\n}\n```\n理由：① `<<` 必须非成员 ② `+` 和 `==` 推荐非成员——支持 `1.0 + p` 等隐式转换 ③ `+=` 成员——返回 `*this&` 支持链式。",
    tags: ["运算符重载", "Point", "完整实现"],
  },
  {
    id: "coo-13",
    chapter: "cpp-overloaded-operations" as any,
    level: 3,
    question:
      "为 `Array` 类（内部用 `int* data` 管理动态数组）实现 `operator[]`。需要几个版本？各自返回什么类型？写出实现。",
    answer:
      "需要**两个版本**——成对出现：\n```cpp\nclass Array {\npublic:\n    // 非常量版本：可读可写\n    int& operator[](std::size_t n) {\n        return data[n];\n    }\n    // 常量版本：只读\n    const int& operator[](std::size_t n) const {\n        return data[n];\n    }\n    // ...\nprivate:\n    int *data;\n    std::size_t size;\n};\n```\n非常量版返回 `int&`——允许 `arr[0] = 42` 赋值。常量版返回 `const int&`——const 对象只能调用这个版本、不允许修改。两个都必须返回引用（不是值）——否则 `arr[0] = x` 无法编译（赋值给右值）。",
    tags: ["operator[]", "const重载", "下标"],
  },
  {
    id: "coo-14",
    chapter: "cpp-overloaded-operations" as any,
    level: 3,
    question:
      "实现一个 `Filter` 函数对象类——它持有 `int threshold`，`operator()(int val)` 返回 `val >= threshold` 的 `bool` 值。写出完整实现并在 `std::copy_if` 中使用它。",
    answer:
      "```cpp\nclass Filter {\npublic:\n    Filter(int t) : threshold(t) {}\n    bool operator()(int val) const { return val >= threshold; }\nprivate:\n    int threshold;\n};\n// 使用：\nstd::vector<int> src = {1, 5, 2, 8, 3};\nstd::vector<int> dest;\nstd::copy_if(src.begin(), src.end(), std::back_inserter(dest),\n             Filter(4));  // 传临时函数对象——threshold=4\n// dest = {5, 8}\n```\n关键设计：① `operator()` 返回 `bool`——`copy_if` 要求谓词返回 bool ② 通过构造函数设定阈值——构造后调用方只需写 `Filter(4)` 一个词，阈值 4 已保存在对象内部 ③ 函数对象比函数指针灵活——阈值是状态，不同阈值构造不同的 Filter 对象即可。",
    tags: ["函数对象", "functor", "copy_if", "谓词"],
  },
  {
    id: "coo-15",
    chapter: "cpp-overloaded-operations" as any,
    level: 3,
    question:
      "下面的代码中 `si << 2` 的输出是什么？为什么？\n```cpp\nclass SmallInt {\npublic:\n    SmallInt(int i = 0) : val(i) {}\n    operator int() const { return val; }  // 非 explicit\nprivate:\n    int val;\n};\nSmallInt si(3);\ncout << (si << 2) << endl;\n```",
    answer:
      "输出是 **12**：`si` 经非 explicit `operator int()` 隐式转为 `int(3)`，再算 `3 << 2 = 12`。编译器将 `si << 2` 解释为：① `si` 隐式转为 `int(3)` → ② `3 << 2`（左移运算）→ ③ 结果是 `12`。但这暴露了危险——如果类设计者期望 `si << 2` 报编译错误（因为 SmallInt 没有定义左移运算符），非 explicit 的类型转换就制造了一个看似正确但实际错误的结果。修法：`explicit operator int() const`——逼迫使用者显式写 `static_cast<int>(si) << 2`，消除歧义。",
    tags: ["类型转换", "explicit", "隐式转换", "歧义"],
  },

  // ── L4 综合：场景选型与完整设计 ──
  {
    id: "coo-16",
    chapter: "cpp-overloaded-operations" as any,
    level: 4,
    question:
      "设计一个 `Rational` 有理数类——用 `int num, den` 表示分子分母。要求：(1) 支持 `+` `-` `*` `/` 四则运算（`/` 分母为0抛异常）；(2) 支持 `==` `!=` `<` 比较；(3) 支持 `<<` 输出 `num/den` 格式；(4) 支持 `explicit operator double()` 转浮点数；(5) 说明每个运算符选择成员/非成员的理由。",
    answer:
      "```cpp\n#include <stdexcept>\nclass Rational {\n    friend Rational operator+(const Rational&, const Rational&);\n    friend Rational operator-(const Rational&, const Rational&);\n    friend Rational operator*(const Rational&, const Rational&);\n    friend Rational operator/(const Rational&, const Rational&);\n    friend bool operator==(const Rational&, const Rational&);\n    friend std::ostream& operator<<(std::ostream&, const Rational&);\npublic:\n    Rational(int n = 0, int d = 1) : num(n), den(d) {\n        if (den == 0) throw std::invalid_argument(\"den=0\");\n    }\n    explicit operator double() const { return static_cast<double>(num)/den; }\nprivate:\n    int num, den;\n};\nRational operator+(const Rational &l, const Rational &r) {\n    return Rational(l.num*r.den + r.num*l.den, l.den*r.den);\n}\nRational operator-(const Rational &l, const Rational &r) {\n    return Rational(l.num*r.den - r.num*l.den, l.den*r.den);\n}\nRational operator*(const Rational &l, const Rational &r) {\n    return Rational(l.num*r.num, l.den*r.den);\n}\nRational operator/(const Rational &l, const Rational &r) {\n    if (r.num == 0) throw std::invalid_argument(\"div by zero\");\n    return Rational(l.num*r.den, l.den*r.num);\n}\nbool operator==(const Rational &l, const Rational &r) {\n    return l.num*r.den == r.num*l.den;\n}\nstd::ostream& operator<<(std::ostream &os, const Rational &r) {\n    os << r.num << '/' << r.den; return os;\n}\n```\n理由：① 算术(`+ - * /`)非成员——支持 `Rational(1,2) + 1` 的隐式转换 ② `==` 非成员——同上 ③ `<<` 必须非成员——左操作数是 ostream ④ `operator double()` explicit——防止 `r + 1.5` 被错误地隐式转 double 而不是走 Rational 运算。",
    tags: ["Rational", "完整设计", "友元", "explicit"],
  },
  {
    id: "coo-17",
    chapter: "cpp-overloaded-operations" as any,
    level: 4,
    question:
      "判断对错并详细解释：\"所有运算符重载都应该声明为友元函数，这样它们才能访问类的私有成员。\"",
    answer:
      "**错**。这个说法同时违反了三条原则：① **哪些必须是成员**——`=` `[]` `()` `->` 必须是**成员函数**而不是友元，友元是非成员——根本不能用友元实现它们。② **哪些不需要友元**——复合赋值（`+=`）作为成员函数已经能访问私有数据；算术（`+`）通过委托给 `+=` 实现——根本不需要访问私有成员，不需要友元。③ **尽量减少友元**——友元打破封装，只在确实有必要（如 `<<` 必须非成员但又需要访问私有成员）时才用。不是说所有非成员都是友元——很多非成员运算符靠公有接口就能完成工作。",
    tags: ["友元", "成员", "封装", "运算符设计"],
  },
  {
    id: "coo-18",
    chapter: "cpp-overloaded-operations" as any,
    level: 4,
    question:
      "你正在设计一个 `StrVec` 类（类似 `vector<string>`）。下面三个场景——为每个场景选择正确的运算符重载策略，并解释你的决策：\n(A) 支持 `v[0]` 下标访问\n(B) 支持 `v1 = v2` 赋值\n(C) 支持 `cout << v` 输出所有元素，元素间用空格隔开\n(D) 支持 `v + v2` 连接两个 StrVec，返回新的 StrVec",
    answer:
      "**(A) 下标**：`operator[]` 必须是成员。提供一对——`string& operator[](size_t)` 和 `const string& operator[](size_t) const`。返回引用支持 `v[0] = \"x\"`。\n\n**(B) 赋值**：`operator=` 必须是成员——五法则中的拷贝赋值就够了，StrVec 管理堆资源需要深拷贝。返回 `StrVec&`（`*this`）支持 `v1 = v2 = v3`。\n\n**(C) 输出**：`operator<<` 必须是非成员——左操作数是 `ostream`。声明为友元以访问私有数据。返回 `ostream&` 支持 `cout << v1 << v2`。\n\n**(D) 连接**：`operator+` 推荐非成员——支持左右侧隐式转换。先定义 `StrVec& operator+=(const StrVec&)` 成员，再让非成员 `operator+` 委托给它。`+` 返回值（新 StrVec），`+=` 返回 `*this&`。",
    tags: ["StrVec", "场景选型", "容器设计"],
  },
  {
    id: "coo-19",
    chapter: "cpp-overloaded-operations" as any,
    level: 4,
    question:
      "阅读下面的代码片段。回答：(1) 执行到 `auto g = f(3.14);` 时发生了什么？(2) `g` 的类型是什么？(3) `g(10)` 的结果是多少？(4) 这段代码用到的每个 C++ 特性分别叫什么？\n```cpp\nauto f = [base = 5](double x) {\n    return [=](int n) { return static_cast<int>(base * x) + n; };\n};\nauto g = f(3.14);\nint r = g(10);\n```",
    answer:
      "(1) `f(3.14)` 调用外层 lambda——`base=5, x=3.14`，返回内层 lambda（捕获了 `base=5` 和 `x=3.14`）。\n(2) `g` 的类型是内层 lambda 的**闭包类型（closure type）**——编译器生成的匿名函数对象类，重载了 `operator()(int n)`。\n(3) `g(10)` 计算 `static_cast<int>(5 * 3.14) + 10 = static_cast<int>(15.7) + 10 = 15 + 10 = 25`。\n(4) 用到的特性：**lambda 表达式**（`[]` 捕获列表）、**闭包**（捕获 `base` 和 `x` 生成有状态的可调用对象）、**函数调用运算符 `operator()`**（lambda 的本质就是重载了 operator() 的匿名类）、**`static_cast`**（显式类型转换）。这段代码完美体现了 lambda 和函数对象的关系——每个 lambda 都是一个有状态的 `operator()` 重载。",
    tags: ["lambda", "闭包", "operator()", "综合"],
  },
  {
    id: "coo-20",
    chapter: "cpp-overloaded-operations" as any,
    level: 4,
    question:
      "你接手了旧的 `Matrix` 类代码——它用 `double*` 管理堆上的二维矩阵数据。现在需要为它添加运算符重载——`operator+`、`operator<<`、`operator()`——使得以下代码能编译：\n```cpp\nMatrix a(2,2), b(2,2), c(2,2);\n// 初始化 a, b...\nc = a + b;\ncout << c << endl;\ndouble val = c(0, 1);  // 取第0行第1列元素\n```\n写出三个运算符的声明（不用写函数体），标记成员/非成员/friend，并解释每个选择的原因。",
    answer:
      "```cpp\nclass Matrix {\n    friend Matrix operator+(const Matrix&, const Matrix&);\n    friend std::ostream& operator<<(std::ostream&, const Matrix&);\npublic:\n    Matrix(int rows, int cols);\n    double operator()(int row, int col) const;  // 成员——必须是成员\n    // ...\nprivate:\n    double *data;\n    int rows, cols;\n};\n// operator+：非成员 + friend——需要访问 data 做逐元素加、支持双侧隐式转换\n// operator<<：非成员 + friend——左操作数是 ostream、需要访问 data 输出\n// operator()：成员（必须是成员）——用 (row,col) 语法取值\n```\n选择原因：① `operator()` 是语言规定必须是成员——恰好语义上 `(row,col)` 就是操作自身 ② `operator+` 非成员——允许 `a + b` 两边隐式转换；需要 friend 因为要读 `data` 私有指针 ③ `operator<<` 非成员——左操作数是 ostream 不是 Matrix；需要 friend 访问私有数据输出。注意 `operator()` 返回 `double`（值）不是引用——取单个元素的值类型通常如此。",
    tags: ["Matrix", "运算符设计", "friend", "operator()"],
  },
];
