import type { ReviewQuestion } from "./types";

/** 条款 31-34 Lambda 表达式复习题 */
export const emcLambdaExpressionsQuestions: ReviewQuestion[] = [
  {
    id: "emc-lambda-expressions-1",
    chapter: "emc-lambda-expressions",
    level: 1,
    question: "Lambda 表达式由哪几部分组成？分别说明各自的作用。",
    answer:
      "Lambda 表达式由五部分组成：`[捕获](参数) mutable -> 返回类型 { 函数体 }`。\n\n1. 捕获列表 [ ]：决定如何「捕获」Lambda 所在作用域的变量。值捕获 [=]/[x] 拷贝一份，引用捕获 [&]/[&x] 持引用。\n2. 参数列表 ( )：传给 Lambda 的参数，和普通函数一样；无参时可省略。\n3. mutable：允许在函数体内修改「值捕获」的副本（默认值捕获的副本是 const）。省略则值捕获副本不可改。\n4. 尾随返回类型 -> T：显式指定返回类型；可省略，由 return 语句推导。\n5. 函数体 { }：实际逻辑，使用捕获的变量与参数。\n\nLambda 本质是生成一个「闭包类型」（含 operator() 的编译器生成类），闭包是它的实例。",
    tags: ["条款 31", "Lambda 结构", "捕获", "mutable", "闭包"],
  },
  {
    id: "emc-lambda-expressions-2",
    chapter: "emc-lambda-expressions",
    level: 2,
    question:
      "条款 31 为什么建议避免「默认捕获模式」（[=] 和 [&]）？默认引用捕获的主要风险是什么？",
    answer:
      "条款 31 建议避免默认捕获模式（[=] 和 [&]），因为它们「隐式捕获」会让程序员忽视到底捕获了什么、是值还是引用，从而埋下隐患。\n\n默认引用捕获 [&] 的主要风险是「悬空引用」：Lambda 捕获局部变量的引用，但 Lambda 的生命周期可能超过该局部变量。典型场景是异步回调、容器存储的闭包、std::thread 任务——当回调执行时局部变量早已析构，引用变成悬空，访问即未定义行为。\n```cpp\nstd::function<int()> make() {\n  int local = 42;\n  return [&] { return local; }; // local 析构后悬空！\n}\n```\n\n默认值捕获 [=] 的风险稍小但仍有坑：它不捕获 this 指针所指向的对象本身（只捕获 this 指针值），成员变量是通过 this 间接访问；若 Lambda 寿命超过对象，this 指针悬空。此外 [=] 给人「安全」的错觉，实际对引用语义的成员仍可能悬空。\n\n建议：显式列出捕获的变量（[&x] 而非 [&]），让悬空风险一眼可见；能不捕获就不捕获，用参数传入更安全。",
    tags: ["条款 31", "默认捕获", "悬空引用", "显式捕获"],
  },
  {
    id: "emc-lambda-expressions-3",
    chapter: "emc-lambda-expressions",
    level: 3,
    question:
      "条款 32 的「init 捕获」是什么？它能解决普通捕获做不到的什么事？给出一个移动捕获的例子。",
    answer:
      "init 捕获（ generalized lambda capture，C++14）是在捕获列表里给捕获的变量「指定一个初始化表达式」，形式 `[name = expr]`。它让闭包内有个名为 name 的成员，用 expr 初始化。\n\n它能解决普通捕获做不到的两件事：\n1. 移动捕获：普通捕获只能值拷贝或引用，无法把对象「移动」进闭包。init 捕获配合 std::move 可以。\n2. 给捕获成员重命名或用表达式初始化：如 `[n = count + 1]`。\n\n移动捕获例子：把一个只移动类型（如 unique_ptr、或大型容器）移入闭包，避免拷贝：\n```cpp\nauto p = std::make_unique<Widget>();\nauto func = [up = std::move(p)] { up->doSomething(); };\n// p 已被移动，闭包内 up 持有所有权\n```\n在 C++11（无 init 捕获）时代要实现「移动捕获」需手写一个 functor 类或用 std::bind 配合 shared_ptr 绕路，C++14 的 init 捕获让这件事一行搞定，是异步任务把资源移入闭包的标准手段。",
    tags: ["条款 32", "init 捕获", "移动捕获", "C++14", "std::move"],
  },
  {
    id: "emc-lambda-expressions-4",
    chapter: "emc-lambda-expressions",
    level: 4,
    question:
      "条款 34 为什么建议优先用 Lambda 而非 std::bind？std::bind 有哪些固有问题？",
    answer:
      "条款 34 优先用 Lambda 而非 std::bind，因为 std::bind 有若干固有问题：\n\n1. 可读性差：std::bind 的占位符 `_1`、`_2` 不直观，参数顺序与调用时实参的对应关系难以一眼看清。Lambda 的参数列表是显式的 `[](int x){...}`。\n\n2. 错误信息晦涩：std::bind 是模板，报错信息涉及复杂的 bind 表达式类型，难定位。Lambda 的错误信息更贴近源码。\n\n3. 重载函数难传：`std::bind(f, ...)` 中 f 若是重载函数名，编译器无法确定绑哪个重载，需手动 `static_cast` 选签名。Lambda 直接在体内调用，重载决议自然进行。\n\n4. 表达力受限：std::bind 不易表达「条件分支」「循环」等复杂逻辑，Lambda 函数体可写任意代码。bind 的「占位符表达式」如 `_1 > 5 && _1 < 10` 也比 Lambda 啰嗦。\n\n5. 内联与性能：Lambda 是一个类，编译器更易内联；std::bind 涉及类型擦除（function）和占位符分发，优化更难。\n\n唯一 std::bind 仍有用的场景（C++14 之前）：移动捕获、动态指定调用约定等。C++14 引入 init 捕获后，这些场景也能用 Lambda 表达。所以在 C++14 及以后，新代码应一律用 Lambda，仅在维护老代码或极少数边缘场景才用 std::bind。",
    tags: ["条款 34", "std::bind", "Lambda", "可读性", "占位符"],
  },
];
