import type { ReviewQuestion } from "./types";

/** 条款 21-23 移动语义与右值引用复习题 */
export const emcMoveSemanticsQuestions: ReviewQuestion[] = [
  {
    id: "emc-move-semantics-1",
    chapter: "emc-move-semantics",
    level: 1,
    question: "std::move 到底做了什么？它真的「移动」了对象吗？",
    answer:
      "std::move 实际上不移动任何东西。它是一个无条件的强制转型：把传入的实参 cast 成右值引用（准确说是 `static_cast<T&&>`），仅此而已。真正的「移动」发生在被移动对象的移动构造函数或移动赋值运算符里——是这些函数的实现去窃取资源。\n\n所以 std::move 只是「告诉编译器：这个对象可以被移动」，相当于亮出右值引用的信号，让重载决议选择移动重载而非拷贝重载。如果目标类型没有移动构造函数，或者移动构造函数没有真正窃取资源（比如 `return *this;` 的默认实现），那么即使写了 std::move 也照样发生拷贝。\n\n结论：std::move 是个 cast，不保证移动发生；移动是否发生、是否廉价，取决于类型的移动操作实现。",
    tags: ["条款 23", "std::move", "强制转型", "移动构造"],
  },
  {
    id: "emc-move-semantics-2",
    chapter: "emc-move-semantics",
    level: 2,
    question:
      "移动构造函数和移动赋值运算符的典型实现步骤是什么？为什么移动后源对象必须处于「有效但未指定」状态？",
    answer:
      "典型实现（以管理动态数组的类为例）：\n\n移动构造：\n1. 把源对象的资源指针（data、size、capacity）拷给新对象。\n2. 把源对象的指针置为 nullptr、size/capacity 置 0。\n3. 不分配新内存、不复制元素。\n\n移动赋值：\n1. 处理自赋值（`if (this == &other) return *this;`）。\n2. 释放当前对象的资源（delete[] data）。\n3. 同移动构造：窃取源指针，源置空。\n4. `return *this;`。\n\n源对象必须处于「有效但未指定（valid but unspecified）」状态的原因：\n- 移动后源对象仍会被析构，析构函数必须能正常调用（如 `delete[] nullptr` 合法），所以源不能是「损坏」状态。\n- 但移动语义允许源的内容未指定（你不知道它现在是什么值），调用者只能对其做「不依赖具体值」的操作：赋新值、析构，不能读其值。\n\n这个约束既保证析构安全，又给实现留了优化空间（不必把源完全清零，只要不泄漏、不崩溃即可）。",
    tags: ["条款 23", "移动构造", "移动赋值", "有效但未指定", "自赋值"],
  },
  {
    id: "emc-move-semantics-3",
    chapter: "emc-move-semantics",
    level: 3,
    question:
      "条款 25 说「对右值引用用 std::move，对通用引用用 std::forward」。如果把这条反过来会怎样？",
    answer:
      "反过来会出两类错误：\n\n场景 A：对右值引用（`void f(Widget&& w)`）用 std::forward 而非 std::move。\n- 这通常不会错（std::forward<Widget&&>(w) 也转成右值），但 std::forward 需要显式写模板参数 `std::forward<Widget>(w)`，写法啰嗦且容易写错类型。std::move 无需模板参数、语义清晰，对确定是右值引用的场合更直接。\n\n场景 B（更严重）：对通用引用（`template<typename T> void f(T&& w)`）用 std::move 而非 std::forward。\n- 这是真正的 bug。通用引用既能绑左值也能绑右值。若实参是左值，正确行为是保持左值转发；但 std::move 无条件转右值，于是把左值实参强行 move 了，可能移动掉本不该移动的对象，导致悬空或意外修改。\n```cpp\ntemplate<typename T>\nvoid f(T&& w) { target(std::move(w)); }  // 错！左值实参也被移动\n```\n若调用 `f(x)`（x 是左值），target 收到的是右值，可能窃取 x 的资源。\n\n正确做法：\n- 通用引用用 `std::forward<T>(w)`，按 T 推导结果有条件地转右值（左值保持左值）。\n- 右值引用用 `std::move(w)`，因为右值引用确定是右值，无需条件判断。\n\n核心：std::move 是无条件右值 cast（用于确定右值），std::forward 是有条件右值 cast（用于保持通用引用的值类别）。",
    tags: ["条款 25", "std::move", "std::forward", "通用引用", "值类别"],
  },
  {
    id: "emc-move-semantics-4",
    chapter: "emc-move-semantics",
    level: 4,
    question:
      "条款 29 为什么提醒「不要假设移动操作存在、廉价、且被使用」？请各举一个反例。",
    answer:
      "条款 29 的三个假设都不能轻信：\n\n1. 移动操作不一定存在：若类没有声明移动构造/移动赋值，编译器在某些情况下（如声明了拷贝操作或析构）不会生成默认移动操作，于是「移动」回退为拷贝。例如旧 C++98 类没有移动语义，`std::vector<OldClass>` 重新分配时只能拷贝。\n\n2. 移动操作不一定廉价：移动「通常」廉价（指针交接），但不保证。例如 `std::array<int, 1000>` 的移动要逐元素移动 1000 个 int（本质是拷贝），开销不比拷贝小。`std::string` 在 SSO（小字符串优化）下短字符串移动也是逐字节拷贝。\n\n3. 移动不一定被使用：即使类型有廉价移动操作，移动也可能不发生。\n- 按值返回时，若返回的是局部对象的右值引用成员，可能不会移动（见下）。\n- 容器元素类型若移动 noexcept 不成立，vector 扩容为保证强异常安全会回退用拷贝而非移动（条款 14 的 noexcept 关联）。\n- 在 `return std::move(local);` 这种写法反而可能阻止 RVO（返回值优化），让编译器不得不真的移动，而原本 RVO 能零拷贝。\n\n结论：性能关键路径上，不要凭「这里写了 std::move 应该就快了」做判断，要确认移动操作存在且 noexcept、且没被 RVO 等优化取代。优化前先 profile。",
    tags: ["条款 29", "移动不一定存在", "移动不一定廉价", "noexcept", "RVO"],
  },
];
