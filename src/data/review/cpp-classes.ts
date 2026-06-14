/** 复习题库 · C++ 类（cpp-classes）。C++ Primer §7 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cppClassesQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "ccl-1",
    chapter: "cpp-classes",
    level: 1,
    question: "C++ 中 class 和 struct 有什么区别？什么时候用哪个？",
    answer:
      "唯一的区别是**默认访问权限**：class 的成员默认 private，struct 的成员默认 public。除此之外完全一样——struct 也能有构造函数、析构函数、成员函数。业界惯例：纯数据聚合（各字段公开、无复杂行为）用 struct；需要数据封装和行为的用 class。",
    tags: ["class", "struct", "默认访问权限"],
  },
  {
    id: "ccl-2",
    chapter: "cpp-classes",
    level: 1,
    question: "什么是 this 指针？它在成员函数中起什么作用？",
    answer:
      "this 是成员函数内部隐含的指针，指向调用该函数的对象。调用 `item.isbn()` 时，编译器把 `&item` 作为隐藏参数传给 `isbn()`——函数内部 `bookNo` 实际是 `this->bookNo` 的简写。const 成员函数中 this 类型为 `const T*`，非 const 函数中为 `T*`。",
    tags: ["this", "成员函数", "隐式参数"],
  },
  {
    id: "ccl-3",
    chapter: "cpp-classes",
    level: 1,
    question: "什么是构造函数？它有什么特点？",
    answer:
      "构造函数是类的一种特殊成员函数——对象创建时自动调用一次。特点：函数名与类名相同、没有返回类型（连 void 都不写）、可以有多个重载版本（参数不同）。无参的称为默认构造函数——负责把对象初始化到一个合法状态。如果没有定义任何构造函数，编译器会合成一个默认构造。",
    tags: ["构造函数", "默认构造", "自动调用"],
  },
  {
    id: "ccl-4",
    chapter: "cpp-classes",
    level: 1,
    question: "什么是成员初始化列表？它和构造函数体内赋值有什么区别？",
    answer:
      "成员初始化列表写在参数列表右括号后、函数体花括号前——`: bookNo(s), units_sold(n)`。**初始化**在构造体执行之前完成——进入 `{}` 时成员已有确定值。对比：构造体内 `bookNo = s` 是**赋值**——先默认初始化一次再覆盖，对 string 等类类型多了一次默认构造+赋值的开销。对 const 成员和引用成员，初始化列表是唯一途径（不能赋值）。",
    tags: ["成员初始化列表", "初始化 vs 赋值", "构造函数"],
  },
  {
    id: "ccl-5",
    chapter: "cpp-classes",
    level: 1,
    question: "什么是合成默认构造函数？什么情况下编译器不再生成它？",
    answer:
      "合成默认构造函数是编译器在程序员没有定义任何构造函数时自动生成的无参构造。它按「类内初始值 → 默认初始化」规则初始化成员：有类内初始值的用它，类类型成员调自己的默认构造，内置类型成员为未定义值。一旦自定义了**任何**构造函数（即便全是带参的），编译器就不再合成默认构造——此时 `T obj;` 编译报错。",
    tags: ["合成默认构造函数", "默认构造"],
  },
  {
    id: "ccl-6",
    chapter: "cpp-classes",
    level: 1,
    question: "什么是友元（friend）？它有什么特点？",
    answer:
      "友元是用 friend 关键字在类内部声明的外部函数或另一个类——授权访问本类的 private 成员。特点：友元声明不是成员函数——它在类内声明但在类外是独立函数；声明位置（public 或 private 区）无关；友元关系不传递（A 是 B 的友元、B 是 C 的友元 ≠ A 能访问 C 的 private）。主要用于操作符重载（`<<`、`>>`）和紧密关联的非成员函数。",
    tags: ["friend", "友元", "访问控制"],
  },
  // ── L2 理解：原理 / 机制 ──
  {
    id: "ccl-7",
    chapter: "cpp-classes",
    level: 2,
    question: "解释封装的含义：为什么要把数据成员设为 private？",
    answer:
      "封装的核心是把实现细节藏起来、只暴露接口。好处：① 外部代码不能绕过规则——把 `revenue` 设 private 后，只有通过 `combine()` 等函数才能修改，可以在函数内部加校验（如检查 ISBN 匹配）。② 修改内部实现不影响调用方——把 `revenue` 从 double 换成 long double、或改存储方式，只要 public 接口不变，外部代码无需改动。③ 降低认知负担——调用方只用看 public 函数，不用关心底层怎么存。",
    tags: ["封装", "private", "接口设计"],
  },
  {
    id: "ccl-8",
    chapter: "cpp-classes",
    level: 2,
    question:
      "为什么成员初始化列表的执行顺序是成员在类中的声明顺序，而不是列表中写的顺序？这会带来什么问题？",
    answer:
      "C++ 标准规定成员按声明顺序初始化和销毁——保证构造和析构的对称性（后构造的先析构）。问题：如果你在初始化列表中写 `: units_sold(n), bookNo(s)` 但声明顺序是 `bookNo` 在前 `units_sold` 在后——`bookNo` 实际上先被初始化。如果初始化列表中后续成员的初值依赖前面的成员（如 `units_sold` 的初值用了还没初始化的 `bookNo`），就是读取未定义值的 bug。",
    tags: ["初始化顺序", "声明顺序", "构造函数"],
  },
  {
    id: "ccl-9",
    chapter: "cpp-classes",
    level: 2,
    question: "const 成员函数底层发生了什么？为什么 const 对象只能调用 const 成员函数？",
    answer:
      "const 成员函数把隐含的 this 指针类型从 `T*` 变成 `const T*`——函数体内不能通过 this 修改数据成员。const 对象的 this 类型已经是 `const T*`——把 `const T*` 传给期待 `T*` 的函数意味着去掉 const 限定（放弃「不修改」承诺），编译器拒绝。反过来非 const 对象的 `T*` this 可以隐式转成 `const T*`——所以非 const 对象两者都能调。",
    tags: ["const 成员函数", "this", "类型转换"],
  },
  {
    id: "ccl-10",
    chapter: "cpp-classes",
    level: 2,
    question:
      "在类的外部定义一个成员函数时，为什么需要 `类名::` 前缀？不写会怎样？",
    answer:
      "`类名::`（作用域运算符）告诉编译器「这个函数属于这个类」。不写的话——`double avg_price() { ... }`——编译器会把它当普通自由函数，而不是类的成员函数。一是无法访问 private 成员（没有 this 指针）；二是调用方只能用 `avg_price()` 而不是 `obj.avg_price()`——语义完全错了。",
    tags: ["作用域运算符", "::", "成员函数定义"],
  },
  {
    id: "ccl-11",
    chapter: "cpp-classes",
    level: 2,
    question:
      "为什么 `Sales_data& Sales_data::combine(const Sales_data &rhs)` 的返回值类型是引用？返回 `*this` 有什么好处？",
    answer:
      "返回 `Sales_data&`（自身引用）而不是 `Sales_data`（值拷贝）有两层意义：① 效率——避免拷贝整个对象（虽然对 Sales_data 影响不大，对大型对象很关键）。② **链式调用**——`a.combine(b).combine(c)`——每个 combine 调用返回 a 自己的引用，下一段调用能接上。这是 `operator=` 和类似修改自身函数的通用惯例。",
    tags: ["返回引用", "链式调用", "*this"],
  },
  // ── L3 应用：代码推断 / 场景选择 ──
  {
    id: "ccl-12",
    chapter: "cpp-classes",
    level: 3,
    question:
      "以下构造函数定义有什么问题？\n```cpp\nclass Foo {\n    const int x;\n    int &r;\npublic:\n    Foo(int a, int &b) {\n        x = a;   // ①\n        r = b;   // ②\n    }\n};\n```",
    answer:
      "两处编译错误：① `x = a`——`x` 是 const 成员，不能在构造体内赋值（const 只能初始化一次）。② `r = b`——`r` 是引用成员，必须在初始化时绑定，不能后来「重新绑定」（引用不能重定向，`r = b` 只是把 b 的值赋给 r 引用的对象、不是让 r 引用 b）。修正——用成员初始化列表：`Foo(int a, int &b) : x(a), r(b) {}`。const 成员和引用成员**只能用初始化列表**初始化。",
    tags: ["const 成员", "引用成员", "初始化列表", "编译错误"],
  },
  {
    id: "ccl-13",
    chapter: "cpp-classes",
    level: 3,
    question:
      "定义一个类后，何时应该把成员函数标记为 const？给出判断标准和对比例子。",
    answer:
      "判断标准只有一个：「这个函数是否修改了对象的数据成员？」。不修改 = 标 const，修改 = 不标。例：`isbn()` 只返回 bookNo 的副本——标 const。`combine()` 修改 units_sold 和 revenue——不标 const。`avg_price()` 虽然做了除法运算但不改任何成员——标 const。即使函数内部调了其他 const 函数或读了成员值——只要没写 `this->member = xxx` 就没关系。设计原则：凡是只读的成员函数一律加 const——这既是承诺也是文档。",
    tags: ["const 成员函数", "设计原则", "只读不写"],
  },
  {
    id: "ccl-14",
    chapter: "cpp-classes",
    level: 3,
    question:
      "写一个 `Screen` 类如下。它的三个成员函数中哪些应该标 const、哪些不该？说明理由。\n```cpp\nclass Screen {\n    unsigned width, height;\n    std::string contents;\npublic:\n    char get() { return contents[cursor]; }\n    Screen& move(unsigned r, unsigned c);\n    unsigned getWidth() { return width; }\nprivate:\n    unsigned cursor = 0;\n};\n```",
    answer:
      "`get()`——返回 contents 中某个字符，不修改任何成员 → **该标 const**。`move()`——修改 cursor 的值（移动光标就是改状态）→ 不标 const。`getWidth()`——只读 width，不修改 → **该标 const**。补上 const 后：`char get() const`、`unsigned getWidth() const`。其他设计问题：`get()` 使用了 `cursor` 但 cursor 定义在函数之后——没关系，成员函数可以访问声明在它后面的成员（类内部无声明顺序限制）。",
    tags: ["const 成员函数", "设计判断", "只读不写"],
  },
  {
    id: "ccl-15",
    chapter: "cpp-classes",
    level: 3,
    question:
      "编写一个 `Date` 类，包含三个 int 成员 year/month/day，一个带参构造函数，以及三个分别返回年月日的 const 成员函数。然后写一段 main 代码创建两个 Date 对象并打印。",
    answer:
      "```cpp\n#include <iostream>\n\nclass Date {\n    int year, month, day;\npublic:\n    Date(int y, int m, int d) : year(y), month(m), day(d) {}\n    int getYear() const { return year; }\n    int getMonth() const { return month; }\n    int getDay() const { return day; }\n};\n\nint main() {\n    Date d1(2024, 6, 14);\n    Date d2(1999, 12, 31);\n    std::cout << d1.getYear() << \"-\" << d1.getMonth()\n              << \"-\" << d1.getDay() << '\\n';\n    std::cout << d2.getYear() << \"-\" << d2.getMonth()\n              << \"-\" << d2.getDay() << '\\n';\n    return 0;\n}\n```",
    tags: ["类实现", "构造函数", "const 成员"],
  },
  // ── L4 综合：诊断 / 设计 / 对比 ──
  {
    id: "ccl-16",
    chapter: "cpp-classes",
    level: 4,
    question:
      "下面这个类的设计存在不合理之处。逐条列出问题并提出修正。\n```cpp\nstruct Account {\n    std::string owner;\n    double balance;\n    double interest_rate;\n\n    double getBalance() const { return balance; }\n    void setBalance(double b) { balance = b; }\n};\n```",
    answer:
      "① struct 默认 public——owner、balance、interest_rate 全部暴露，外部可以 `acc.balance = -1000` 绕过校验。改为 `class Account`，数据成员放 private。② `setBalance(double b)` 允许任意设值——应该加校验（如 `if (b >= 0) balance = b;`）或改为 `deposit(double)` / `withdraw(double)` 等方法。③ interest_rate 对所有账户可能一样——考虑设成 static 成员或至少在构造函数中设默认值。④ 没有构造函数——编译器的合成默认构造让三个字段处于未定义状态（string 为空，double 未定义）。加默认构造和带参构造。",
    tags: ["封装", "struct vs class", "设计审查", "数据校验"],
  },
  {
    id: "ccl-17",
    chapter: "cpp-classes",
    level: 4,
    question:
      "设计一个 `BankAccount` 类：包含账号 owner（string）、余额 balance（double，不能为负）、交易次数 count（int，只增不减）。要求：(1) 构造函数只接受 owner 和初始余额 (2) 余额和计数 private (3) 提供 deposit/withdraw 方法（取款超余额返回 false）(4) 提供 getOwner/getBalance/getCount 只读方法 (5) 解释为什么 count 不能是 const 成员。",
    answer:
      "```cpp\nclass BankAccount {\n    std::string owner;\n    double balance;\n    int count = 0;\npublic:\n    BankAccount(const std::string &o, double b)\n        : owner(o), balance(b >= 0 ? b : 0.0) {}\n\n    bool deposit(double amount) {\n        if (amount <= 0) return false;\n        balance += amount; ++count; return true;\n    }\n    bool withdraw(double amount) {\n        if (amount <= 0 || amount > balance) return false;\n        balance -= amount; ++count; return true;\n    }\n\n    std::string getOwner() const { return owner; }\n    double getBalance() const { return balance; }\n    int getCount() const { return count; }\n};\n```\n\ncount 不能是 const 成员——因为它需要在 deposit/withdraw 中 `++count`，即修改其值。const 数据成员的值必须在构造函数初始化列表中设定且之后永不可改——和 counter 的语义矛盾。",
    tags: ["类设计", "封装", "方法设计", "const 成员"],
  },
  {
    id: "ccl-18",
    chapter: "cpp-classes",
    level: 4,
    question:
      "说明以下场景分别应该用普通函数、成员函数还是友元函数实现，并解释原因：\n① 比较两个 `Sales_data` 对象的 ISBN 是否相同\n② 把一个 `Sales_data` 对象的内容打印到 `std::cout`\n③ 计算一个 `Sales_data` 对象的平均售价",
    answer:
      "③ 成员函数（const）——它的核心操作只依赖一个对象的状态（自己的 revenue/units_sold），这种「问对象自己能回答的问题」用成员函数最自然。① 普通函数——比较两个对象的 ISBN 是「两者之间的关系」，不偏向任何一个，不需要碰 private 数据（通过 `isbn()` 接口即可），没必要用友元。② 友元函数——`operator<<` 必须是非成员函数（左操作数是 `ostream&`，不是 `Sales_data`），如果只需要公开接口可以不用友元，但如果为了效率需要直接读 private 字段则声明为 friend。",
    tags: ["成员 vs 非成员", "友元", "函数设计", "接口选择"],
  },
];
