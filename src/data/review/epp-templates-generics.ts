import type { ReviewQuestion } from "./types";

/** C++ Primer Plus · 模板与泛型复习题 */
export const eppTemplatesGenericsQuestions: ReviewQuestion[] = [
  {
    id: "epp-templates-generics-1",
    chapter: "epp-templates-generics",
    level: 1,
    question: `函数模板和类模板的语法是什么？模板实例化发生在什么时候？`,
    answer:
      `函数模板语法：\n\`\`\`\ntemplate <typename T>\nT max(T a, T b) { return a > b ? a : b; }\n\`\`\`\n\`template <typename T>\` 是模板参数列表（T 是类型参数），后面跟函数定义。调用 \`max(3, 5)\` 时编译器推导 T=int 实例化出 \`int max(int, int)\`。\n\n类模板语法：\n\`\`\`\ntemplate <typename T>\nclass Stack { void push(const T&); };\n\`\`\`\n使用时必须显式指定类型参数：\`Stack<int> s;\`，编译器实例化出 \`Stack<int>\`。\n\n模板实例化时机——编译期：\n1. 隐式实例化：函数模板在调用时编译器根据实参推导 T 并生成具体版本；类模板在使用时（如 \`Stack<int>\`）生成具体类。这是编译期发生，运行期没有「推导」开销。\n2. 显式实例化：可手动 \`template class Stack<int>;\` 或 \`template int max(int,int);\` 强制生成，用于把模板实现放 .cpp 并预实例化常用类型。\n\n关键点：模板是编译期机制，T 在编译期就替换成具体类型，运行期不存在「泛型」概念，只有实例化出的具体函数/类。这保证了类型安全（编译期检查）且零运行期开销。`,
    tags: ["函数模板", "类模板", "实例化"],
  },
  {
    id: "epp-templates-generics-2",
    chapter: "epp-templates-generics",
    level: 2,
    question: `模板的「类型参数 T」与面向对象的「基类指针多态」都能实现「一份代码适用多种类型」，二者有什么本质区别？`,
    answer:
      `本质区别在「何时确定类型」与「如何分派」：\n\n1. 何时确定类型：\n- 模板（静态多态/编译期多态）：T 在编译期实例化时替换成具体类型，生成多份具体代码。类型在编译期就固定。\n- 虚函数（动态多态/运行期多态）：基类指针在运行期可能指向不同派生类型，调哪个版本由运行期 vtable 决定。类型在运行期才确定。\n\n2. 如何分派：\n- 模板：编译期生成 N 份具体函数，直接调用，无间接跳转，可内联。\n- 虚函数：一份调用代码，运行期查 vtable 间接跳转，不可内联（一般情况）。\n\n3. 类型约束：\n- 模板：T 必须支持模板体里用到的操作（如 \`a > b\` 要求 T 支持 operator>），鸭子类型，不支持则编译错。无统一基类要求。\n- 虚函数：所有派生类必须继承自同一基类，共享接口。\n\n4. 代码体积：\n- 模板：每种类型生成一份代码，二进制体积大（代码膨胀）。\n- 虚函数：一份代码，运行期分派，体积小。\n\n选择指导：类型集合在编译期已知且有限、追求极致性能用模板（如 STL）；类型集合在运行期动态扩展（如插件加载新派生类）、需要统一接口用虚函数。两者常结合：STL 用模板，但其迭代器/函数对象又遵循虚函数式的「概念」约定。`,
    tags: ["模板", "多态", "静态多态", "动态多态"],
  },
  {
    id: "epp-templates-generics-3",
    chapter: "epp-templates-generics",
    level: 3,
    question: `你写了 \`template <typename T> T max(T a, T b)\`，调用 \`max(3, 4.5)\` 编译报错，但 \`max(3, 4)\` 和 \`max(3.0, 4.5)\` 都正常，为什么？怎么修？`,
    answer:
      `原因：模板参数推导时，T 必须能从所有实参推导出「同一个」类型，否则推导失败。\n\n- \`max(3, 4)\`：两个都是 int，推导 T=int，成功。\n- \`max(3.0, 4.5)\`：两个都是 double，推导 T=double，成功。\n- \`max(3, 4.5)\`：3 是 int 推 T=int，4.5 是 double 推 T=double，矛盾——编译器无法决定 T 到底是 int 还是 double，推导失败报错。模板推导不做隐式转换（不会自动把 int 转 double 或反之来统一 T）。\n\n修法（三选一）：\n1. 显式指定类型参数：\`max<double>(3, 4.5)\`，强制 T=double，3 隐式转 double。调用方多写一个 \`<double>\`。\n2. 提供两种类型参数的模板：\`template <typename T1, typename T2> auto max(T1 a, T2 b) { return a > b ? a : b; }\`，T1/T2 各自推导，返回类型用 auto（C++14）。但这改变了返回类型推导语义，且 \`a > b ? a : b\` 的结果类型是 T1/T2 的公共类型，需注意。\n3. 调用方显式转换：\`max(static_cast<double>(3), 4.5)\`，把 3 转成 double，两实参同类型。\n\n推荐：库代码用方案 2（更通用），应用代码用方案 1（显式清晰）。标准库的 \`std::max\` 要求两参数同类型，正是为了避免隐式转换带来的精度意外——这种「严格」是有意为之的安全设计。`,
    tags: ["模板推导", "类型不匹配", "排查"],
  },
  {
    id: "epp-templates-generics-4",
    chapter: "epp-templates-generics",
    level: 4,
    question: `综合分析：模板的定义通常必须放在头文件里（而非 .cpp），而普通函数可以声明在头文件、定义在 .cpp。这种差异的底层原因是什么？带来什么工程影响？`,
    answer:
      `底层原因——模板需要完整定义才能实例化：\n普通函数的调用，编译器只需看到声明（签名）就能生成调用代码（在调用处生成一条 call 指令），真正的函数体由链接器在链接阶段从定义所在的 .o 里绑定。所以声明放头文件、定义放 .cpp 即可。\n\n模板不同：模板本身不是代码，是「生成代码的蓝图」。编译器要实例化 \`max<int>\`，必须看到模板的完整定义（函数体），才能把 T 替换成 int 生成具体的 \`int max(int,int)\` 函数。如果模板定义在 .cpp 里，其他 .cpp include 头文件时只看到声明，无法实例化，链接时找不到实例化的定义，报 undefined reference。\n\n工程影响：\n1. 模板必须放头文件：导致头文件膨胀，编译时间增加（每个 include 该头文件的 .cpp 都要解析模板定义）。大型项目模板密集时编译变慢。\n2. 泄露实现细节：模板定义暴露在头文件，使用者能看到实现，可能形成隐式耦合（依赖实现细节）。\n3. 代码膨胀：每个使用 \`max<int>\` 的 .cpp 都可能生成一份 \`int max(int,int)\`，靠链接器 COMDAT 折叠去重，但折叠本身有开销。\n4. 显式实例化作为折中：把模板定义放 .cpp，在 .cpp 里 \`template int max(int,int);\` 显式实例化常用类型，头文件只放声明。这样头文件清爽、实例化集中，但只覆盖显式列出的类型，新增类型要改 .cpp 重新编译。\n5. C++20 模块缓解：modules 让模板定义不必放头文件也能跨翻译单元实例化，是解决这一痛点的现代方案，但工具链支持仍在普及。\n\n本质：模板是编译期代码生成机制，要求实例化点可见完整定义，这与「声明/定义分离」的传统模型冲突，是 C++ 编译模型的固有张力，也是模板工程化的核心痛点。`,
    tags: ["综合", "模板", "头文件", "编译模型"],
  },
];
