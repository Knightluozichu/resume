import type { ReviewQuestion } from "./types";

/** 条款 24-30 完美转发与引用折叠复习题 */
export const emcPerfectForwardingQuestions: ReviewQuestion[] = [
  {
    id: "emc-perfect-forwarding-1",
    chapter: "emc-perfect-forwarding",
    level: 1,
    question: `什么是「通用引用」（universal reference）？它和右值引用有什么区别？`,
    answer:
      `通用引用（条款 24）是「在类型推导上下文中出现的 T&&」，它既能绑定左值也能绑定右值。形如 \`template<typename T> void f(T&& param)\` 或 \`auto&& x = expr;\`。\n\n与右值引用的区别：\n- 右值引用（\`Widget&&\`，无类型推导）只能绑定右值，是「只接右值」的引用。\n- 通用引用（\`T&&\`，有类型推导）由推导决定：实参是左值时 T 推为 T&，实参是右值时 T 推为 T。\n\n关键判定：必须有「类型推导」且形式是 \`T&&\`（T 是模板参数或 auto）才是通用引用。\`void f(Widget&& w)\` 没有 T 推导，是纯右值引用；\`template<typename T> void f(T&& w)\` 有推导，是通用引用。此外 \`std::vector<T>&&\` 这种 T 已确定的也不是通用引用。`,
    tags: ["条款 24", "通用引用", "右值引用", "类型推导"],
  },
  {
    id: "emc-perfect-forwarding-2",
    chapter: "emc-perfect-forwarding",
    level: 2,
    question: `引用折叠的四条规则是什么？口诀是什么？它在哪些场景会被触发？`,
    answer:
      `四条规则（条款 28）：\n1. T& & → T&\n2. T& && → T&\n3. T&& & → T&\n4. T&& && → T&&\n\n口诀：只要其中有一个是左值引用（&），结果就是左值引用；只有两个都是右值引用（&&）才是右值引用。简记「有左则左」。\n\n触发场景（引用折叠只在「无法直接写出」嵌套引用时由编译器解析）：\n1. 模板实例化：通用引用 \`T&&\` 绑左值时 T 推为 T&，代入 \`T& &&\` 折叠为 T&。\n2. auto 类型推导：\`auto&& x = lval;\` auto 推为 T&，折叠为 T&。\n3. typedef 与别名声明：\`typedef T&& R;\` 再 \`R&\` 会折叠。\n4. decltype：对嵌套引用类型求值时折叠。\n\n引用折叠是「通用引用能绑左值」的底层机制——正是它让 \`T&&\` 在左值实参下变成 \`T&\`，从而既能接左值也能接右值。`,
    tags: ["条款 28", "引用折叠", "有左则左", "模板实例化"],
  },
  {
    id: "emc-perfect-forwarding-3",
    chapter: "emc-perfect-forwarding",
    level: 3,
    question:
      `条款 26 为什么说「不要对通用引用重载」？举一个替代方案（条款 27）。`,
    answer:
      `对通用引用重载的问题（条款 26）：通用引用 \`T&&\` 是「最贪婪」的形参，能匹配几乎所有实参（左值、右值、任意类型）。一旦与其它重载并存，通用引用重载会抢走大量本该走其它重载的调用，导致非预期行为。\n\n典型翻车场景是「拷贝构造 vs 通用引用构造」：\n\`\`\`cpp\nclass Widget {\npublic:\n  Widget();\n  Widget(const Widget&);            // 拷贝构造\n  template<typename T>\n  Widget(T&& rhs) { ... }           // 通用引用构造，贪婪\n};\nWidget w;\nWidget w2(w);  // 期望调拷贝构造，实际调通用引用构造！\n\`\`\`\n因为 \`w\` 是非 const 左值，通用引用 \`T&&\` 推导为 \`Widget&\`，比 \`const Widget&\` 更匹配（非 const 优于 const），于是走了模板而非拷贝构造。更糟的是基类指针派生类对象时，通用引用构造会「截断」派生类部分而不调拷贝构造。\n\n替代方案（条款 27）：\n1. 标签分发（tag dispatch）：把通用引用函数转交给带标签的非重载函数，按值类别分流。\n2. enable_if 约束通用引用：用 SFINAE 限制通用引用只在「实参不是本类」时启用，\`std::enable_if_t<!std::is_same<decay_t<T>, Widget>::value>\`。\n3. C++14 的 \`std::enable_if_t\` + \`std::decay\` 组合，或直接弃用通用引用重载改用普通 const 左值 + 右值两个重载（条款 27 的最简单做法）。`,
    tags: ["条款 26", "条款 27", "通用引用重载", "贪婪匹配", "enable_if", "标签分发"],
  },
  {
    id: "emc-perfect-forwarding-4",
    chapter: "emc-perfect-forwarding",
    level: 4,
    question:
      `条款 30 列举了完美转发的失败案例。请解释「位域」和「花括号初始化」为何无法完美转发，并给出通用应对思路。`,
    answer:
      `完美转发失败的根因是：转发函数内部对实参的处理破坏了「原样传递」的前提。两类典型失败：\n\n1. 位域（bitfield）：位域不能取地址，而转发函数的形参是引用（需绑定到实参的地址）。\`void f(T&& x)\` 中 x 是引用，无法绑定到位域成员 \`obj.flags\`。于是 \`forwarder(obj.flags)\` 编译失败。\n\n应对：先复制位域到普通变量再转发。\`auto flagCopy = obj.flags; forwarder(flagCopy);\`。因为位域读取本身就会发生值拷贝，复制到普通变量后再转发不损失语义。\n\n2. 花括号初始化：\`forwarder({1, 2, 3})\` 中 \`{1,2,3}\` 没有类型，无法推导 T（推导失败）。通用引用 \`T&&\` 需要实参有确定类型才能推导，braced-init-list 是「无类型」的纯语法，推导不出来。\n\n应对：先用具名变量或 \`auto\` 接住花括号初始化，再转发。\`std::vector<int> v{1,2,3}; forwarder(v);\` 或 \`forwarder(std::vector<int>{1,2,3});\`。给实参一个明确类型即可。\n\n通用应对思路（条款 30 总结）：完美转发失败的共同模式是「实参无法被引用绑定 / 实参类型无法推导」。遇到转发失败时，先排查实参是否属于这些「不能被转发」的类别（位域、花括号、0/NULL、重载函数名/模板名等），再针对性地「中间落一落脚」（复制、具名、显式转型），即可绕过。`,
    tags: ["条款 30", "完美转发失败", "位域", "花括号初始化", "转发失败案例"],
  },
];
