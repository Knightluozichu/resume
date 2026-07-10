import type { ReviewQuestion } from "./types";

/** Effective C++ 编码约定复习题 */
export const efcCodingConventionsQuestions: ReviewQuestion[] = [
  {
    id: "efc-coding-conventions-1",
    chapter: "efc-coding-conventions",
    level: 1,
    question: `条款 53 说「不要轻忽编译器的警告」。为什么不能只依赖编译通过就认为代码正确？`,
    answer:
      `不能轻忽编译器警告的原因：\n\n1. 警告通常意味着真实的隐患：编译器不会无故发出警告，每条警告都对应一个潜在问题——未初始化变量、隐式类型转换丢失精度、不可达代码、未使用的变量等。\n\n2. 不同编译器警告不同：某个编译器不报警不代表代码安全。在 GCC 上无警告的代码在 MSVC 或 Clang 上可能有警告。代码需要在多个编译器上无警告才算干净。\n\n3. 警告级别变化：编译器升级后可能新增警告。之前无警告的代码在新编译器上可能报警——这意味着新编译器发现了旧编译器没发现的问题。\n\n4. 警告可能预示 UB：许多警告对应的是未定义行为。例如「有符号整数溢出」「空指针解引用」——这些在当前编译器上可能「恰好工作」，但在优化或换平台后会崩溃。\n\n实践建议：\n- 开启最高警告级别（\`-Wall -Wextra\`）\n- 把警告当作错误处理（\`-Werror\`）\n- 理解每条警告的含义，不要用 \`#pragma\` 盲目压制\n- 如果确实需要压制某条警告，注释说明原因`,
    tags: ["条款53", "编译器警告", "编译", "代码质量"],
  },
  {
    id: "efc-coding-conventions-2",
    chapter: "efc-coding-conventions",
    level: 2,
    question:
      `条款 30 说「透彻了解 inline 的里里外外」。inline 的本质是什么？过度 inline 有什么代价？`,
    answer:
      `inline 的本质：\n- inline 是对编译器的「请求」而非命令——编译器可以忽略\n- inline 的真正作用是允许函数定义在头文件中而不违反 ODR（单一定义规则）\n- 编译器可能内联非 inline 函数（如类内定义的函数隐式 inline），也可能不内联显式 inline 的函数\n\n过度 inline 的代价：\n\n1. 代码膨胀：每个调用点都展开函数体，如果函数体大或调用点多，可执行文件体积显著增大\n\n2. 指令缓存不命中：代码膨胀导致缓存命中率下降，可能反而变慢——大函数 inline 后占用更多缓存行\n\n3. 构建耦合：inline 函数定义在头文件中，修改函数体需要重新编译所有包含该头文件的文件。非 inline 函数改实现只需重新链接\n\n4. 虚函数无法内联：虚函数通过虚表分发，编译期不知道调用哪个版本，通常无法内联（除非编译器能确定类型）\n\n5. 库的 ABI 脆弱：inline 函数是头文件的一部分，修改后所有使用者的二进制不兼容\n\ninline 的正确使用：\n- 只 inline小函数（1-3 行）—— setters/getters、简单数学运算\n- 不 inline 大函数、循环体复杂的函数\n- 不 inline 构造/析构函数——它们看起来短但暗中调用了基类和成员的构造/析构，实际代码量可能很大\n- 模板函数隐式 inline（定义在头文件），但仍需注意实例化膨胀\n- 让编译器决定——现代编译器的优化能力很强，\`inline\` 关键字更多是「允许在头文件定义」而非「必须内联」`,
    tags: ["条款30", "inline", "代码膨胀", "编译优化", "头文件"],
  },
  {
    id: "efc-coding-conventions-3",
    chapter: "efc-coding-conventions",
    level: 3,
    question:
      `条款 27 说「尽量少做转型动作」。C++ 的四种新式转型 \`static_cast\`、\`dynamic_cast\`、\`const_cast\`、\`reinterpret_cast\` 分别用于什么场景？为什么旧式转型 \`(T)x\` 应该避免？`,
    answer:
      `四种新式转型：\n\n1. \`static_cast<T>(expr)\`——明确定义的类型转换\n- 基本类型转换：\`double\` → \`int\`、\`void*\` → \`T*\`\n- 子类→基类（向上转型，安全）\n- 基类→子类（向下转型，不安全，不做运行时检查）\n- 非多态类型之间的转换\n- 不能去掉 const，不能跨不相关类型转换\n\n2. \`dynamic_cast<T>(expr)\`——安全的多态向下转型\n- 仅用于有虚函数的类层次\n- 运行时检查：如果对象实际类型不匹配，返回 \`nullptr\`（指针）或抛 \`bad_cast\`（引用）\n- 代价高昂：需要 RTTI 信息，遍历类层次\n- 如果发现自己大量用 \`dynamic_cast\`，通常说明设计有问题——应该用虚函数而非类型判断\n\n3. \`const_cast<T>(expr)\`——增删 const\n- 唯一能去掉 const 的转型\n- 用于「调用一个不接受 const 但不会修改参数的函数」\n- 去掉 const 后修改原本 const 的对象是 UB\n\n4. \`reinterpret_cast<T>(expr)\`——位模式重新解释\n- 指针类型之间转换：\`int*\` → \`char*\`\n- 指针↔整数转换\n- 最危险的转型，可移植性差\n- 只在底层编程（序列化、硬件交互）中使用\n\n为什么避免旧式转型 \`(T)x\`：\n1. 难以辨识：\`(Widget*)p\` 可能是 \`static_cast\` 也可能是 \`const_cast\` 或 \`reinterpret_cast\`，阅读者无法判断意图\n2. 难以搜索：旧式转型用括号，grep 很难精确匹配。新式转型名字独特，容易搜索和审查\n3. 可能做了意料之外的转换：旧式转型会尝试所有转型方式直到找到一种能编译的，可能做了你不想要的转换。新式转型限制了类型，错误使用会编译失败\n4. 缺乏安全检查：\`static_cast\` 做基本安全检查，旧式转型不检查\n\n少做转型的深层原因：\n- 转型是类型系统的「逃生舱」——每次转型都绕过了编译器的类型安全检查\n- 转型可能导致运行时开销（\`dynamic_cast\`）或 UB（错误的 \`static_cast\`）\n- 好的面向对象设计应该让类型系统为你工作——用虚函数而非类型判断，用泛型而非类型转换`,
    tags: ["条款27", "转型", "static_cast", "dynamic_cast", "const_cast", "reinterpret_cast"],
  },
  {
    id: "efc-coding-conventions-4",
    chapter: "efc-coding-conventions",
    level: 4,
    question:
      `条款 54 介绍 TR1/标准库，条款 55 介绍 Boost。请综合论述「不重复造轮子」在 C++ 工程实践中的重要性，以及标准库和 Boost 在现代 C++ 中的角色演变。`,
    answer:
      `「不重复造轮子」的工程意义：\n\n1. 正确性：标准库和 Boost 经过数千开发者审查和多年实战检验，bug 率远低于手写代码。手写的 \`shared_ptr\` 几乎必然有引用计数线程安全、循环引用等缺陷。\n\n2. 可维护性：标准库代码有完善的文档和社区支持。手写工具代码需要自己写文档、修 bug、回答问题——这些隐性成本巨大。\n\n3. 可移植性：标准库随编译器一起移植到所有平台。手写代码需要自己在每个平台测试和适配。\n\n4. 团队认知成本：新成员加入团队时，标准库是共同语言。手写的工具库需要额外的学习成本。\n\nTR1 → 标准 C++11/14/17/20 的演变（条款 54 的前瞻性）：\n\nScott Meyers 写 Effective C++ 第三版时（2005年），C++ 还没有 C++11，他介绍的 TR1（Technical Report 1）是一组「准标准库」扩展。TR1 的核心组件后来全部进入了标准：\n\n- \`tr1::shared_ptr\` → \`std::shared_ptr\`（C++11）\n- \`tr1::function\` → \`std::function\`（C++11）\n- \`tr1::bind\` → \`std::bind\`（C++11）\n- \`tr1::hash\` → \`std::hash\`（C++11）\n- \`tr1::tuple\` → \`std::tuple\`（C++11）\n- \`tr1::array\` → \`std::array\`（C++11）\n- \`tr1::regex\` → \`std::regex\`（C++11）\n- \`tr1::type_traits\` → \`std::type_traits\`（C++11）\n- \`tr1::random\` → \`std::random\`（C++11）\n\n这说明条款 54 的核心建议——「熟悉标准程序库」——不仅适用于 2005 年，在 C++11/14/17/20 时代更加重要。每个新标准都带来大量新组件，不及时学习就会重复造轮子。\n\nBoost 在现代 C++ 中的角色（条款 55）：\n\nBoost 一直是 C++ 标准库的「孵化器」和「试验田」：\n- \`boost::shared_ptr\` → \`std::shared_ptr\`\n- \`boost::thread\` → \`std::thread\`\n- \`boost::filesystem\` → \`std::filesystem\`\n- \`boost::asio\` → \`std::net\`（提案中）\n- \`boost::variant\` → \`std::variant\`（C++17）\n- \`boost::optional\` → \`std::optional\`（C++17）\n- \`boost::any\` → \`std::any\`（C++17）\n- \`boost::string_ref\` → \`std::string_view\`（C++17）\n\nBoost 的双重角色：\n1. 标准库的预研：新组件先在 Boost 中成熟，再进入标准。熟悉 Boost 意味着提前掌握未来的标准。\n2. 标准库的补充：有些 Boost 组件可能永远不会进标准（如 Boost.MPL 被 Concepts 替代），但仍有使用价值。\n\n现代 C++ 开发者的知识体系：\n- C++11/14/17/20 标准库是必学的基础——智能指针、\`function\`、\`tuple\`、\`type_traits\`、\`filesystem\`、\`variant\`、\`optional\`\n- Boost 是「标准库+1」的扩展库——在标准库不够用时首先考虑 Boost\n- 只有在标准库和 Boost 都没有的领域，才考虑自己实现或找第三方库\n\n条款 54-55 的深层教训：\n- C++ 的标准库在不断扩张，每年都有新组件进入标准\n- 一个高效的 C++ 开发者必须持续学习标准库的演进——否则就会用过时的手写代码替代标准库组件\n- 「不重复造轮子」不是偷懒，而是工程成熟度的标志——你把精力花在业务逻辑上，把通用工具交给经过验证的库\n- Scott Meyers 在 2005 年就预见了这一趋势——TR1 的组件后来全部进入标准，说明「熟悉标准库和 Boost」是一个长期有效的建议`,
    tags: ["综合", "条款54", "条款55", "TR1", "Boost", "标准库", "现代C++"],
  },
];
