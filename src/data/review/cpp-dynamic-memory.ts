/** 复习题库 · C++ 动态内存（cpp-dynamic-memory）。C++ Primer §12 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cppDynamicMemoryQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "cdm-1",
    chapter: "cpp-dynamic-memory" as any,
    level: 1,
    question: "C++ 标准库提供了哪三种智能指针？它们各自的所有权模型是什么？",
    answer:
      "① **shared_ptr**：共享所有权——多个 shared_ptr 可以指向同一个堆对象，引用计数降到 0 时自动 delete。② **unique_ptr**：独占所有权——同一时刻只能有一个 unique_ptr 拥有堆对象，不能拷贝只能移动。③ **weak_ptr**：弱引用——不拥有对象、不增加引用计数，主要用于观察和破除循环引用。",
    tags: ["智能指针", "shared_ptr", "unique_ptr", "weak_ptr"],
  },
  {
    id: "cdm-2",
    chapter: "cpp-dynamic-memory" as any,
    level: 1,
    question: "shared_ptr 的引用计数（use_count）是如何变化的？什么时候堆对象会被删除？",
    answer:
      "每多一个 shared_ptr 指向同一堆对象（拷贝构造/赋值），`use_count` 加 1；每少一个（离开作用域/被 reset/被赋新值），`use_count` 减 1。当 `use_count` 降到 0 时——即最后一个持有该对象的 shared_ptr 离开——堆对象被自动 `delete`。",
    tags: ["引用计数", "use_count", "shared_ptr"],
  },
  {
    id: "cdm-3",
    chapter: "cpp-dynamic-memory" as any,
    level: 1,
    question: "unique_ptr 和 shared_ptr 在拷贝语义上的核心区别是什么？",
    answer:
      "unique_ptr 的拷贝构造函数和拷贝赋值运算符被标记为 `= delete`——任何拷贝尝试在编译期直接报错。shared_ptr 允许拷贝，拷贝后两个指针指向同一堆对象、引用计数加 1。unique_ptr 只能通过 `std::move` 转移所有权——转移后源指针变空（nullptr）。",
    tags: ["unique_ptr", "拷贝", "移动", "shared_ptr"],
  },
  {
    id: "cdm-4",
    chapter: "cpp-dynamic-memory" as any,
    level: 1,
    question: "为什么要用 make_shared 而不是 new + shared_ptr 构造？",
    answer:
      "① **一次分配 > 两次**：`make_shared<T>(args)` 把控制块和堆对象在一次堆分配中连续安排；`shared_ptr<T>(new T(args))` 分两次分配，更慢。② **异常安全**：在函数调用传参时 `f(shared_ptr<int>(new int(42)), g())` 如果 `g()` 抛异常而 `new` 还未被 shared_ptr 接管，会泄漏——`make_shared` 没这个问题。缺点：`make_shared` 分配的内存要到 weak_ptr 也全部离开时才真正释放。",
    tags: ["make_shared", "shared_ptr", "异常安全"],
  },
  {
    id: "cdm-5",
    chapter: "cpp-dynamic-memory" as any,
    level: 1,
    question: "什么是循环引用？它会导致什么问题？怎么解决？",
    answer:
      "两个对象各自持有对方的 shared_ptr：A 有 B 的 shared_ptr、B 也有 A 的 shared_ptr。各自的引用计数永远 ≥1，谁都无法被 delete——两块内存在堆上永远挂着（内存泄漏）。解法：把其中一边的 shared_ptr 改成 weak_ptr——weak_ptr 不增加引用计数，打破循环链。典型场景：树结构中，父→子用 shared_ptr，子→父用 weak_ptr。",
    tags: ["循环引用", "内存泄漏", "weak_ptr"],
  },
  {
    id: "cdm-6",
    chapter: "cpp-dynamic-memory" as any,
    level: 1,
    question: "new 操作符的两步操作分别是什么？delete 的两步又是什么？",
    answer:
      "`new`：① 调用 `operator new` 在堆上分配足够放一个 T 的内存；② 在这块内存上调用 T 的构造函数。`delete`：① 调用 T 的析构函数；② 调用 `operator delete` 把内存归还给堆。把分配和构造拆开是理解 placement new 和 allocator 的关键。",
    tags: ["new", "delete", "内存分配"],
  },

  // ── L2 理解：用法与区别 ──
  {
    id: "cdm-7",
    chapter: "cpp-dynamic-memory" as any,
    level: 2,
    question: "unique_ptr 的 reset() 和 release() 有什么区别？什么时候用 release？",
    answer:
      "`reset(p)`：释放当前所有对象（如果有），接管新的裸指针 p。`reset()` 无参数时等价于设为 nullptr——释放当前对象。`release()`：放弃当前对象的所有权，返回裸指针，但**不 delete**——调用方从此负责手动 delete。`release` 主要用于把所有权交给某个接受裸指针且承诺负责释放的 C API。日常代码中几乎永远用 `reset` 就够了。",
    tags: ["unique_ptr", "reset", "release"],
  },
  {
    id: "cdm-8",
    chapter: "cpp-dynamic-memory" as any,
    level: 2,
    question: "weak_ptr 的 lock() 返回什么？什么时候返回空的 shared_ptr？",
    answer:
      "`lock()` 返回一个临时的 `shared_ptr`。如果关联的堆对象仍然存活（至少有一个 shared_ptr 持有它），`lock()` 返回一个指向该对象的、有效的 shared_ptr——你可以在它的生命周期内安全使用。如果对象已被销毁（最后一个 shared_ptr 已离开），`lock()` 返回一个空的 shared_ptr（相当于 nullptr）。正确用法是 `if (auto locked = wp.lock()) { /* 安全使用 *locked */ }`。",
    tags: ["weak_ptr", "lock", "expired"],
  },
  {
    id: "cdm-9",
    chapter: "cpp-dynamic-memory" as any,
    level: 2,
    question: "new[] 分配的数组和 delete[] 对应——如果写成 delete 而不是 delete[]，会发生什么？",
    answer:
      "**未定义行为**。`delete` 只对数组的第一个元素调用析构函数，后面 N-1 个元素全漏（如果是非平凡析构的类型）。而且在某些实现中，`new[]` 在数组前面额外存了元素个数，`delete` 不会跳过去读这个信息，可能从错误的地址开始释放——直接崩溃。C++ 规定必须是 `new[]` 配 `delete[]`，不允许混用。推荐用 `vector` 代替 `new[]` 来彻底避开这个问题。",
    tags: ["new[]", "delete[]", "动态数组"],
  },

  // ── L3 应用：代码级判断与用法 ──
  {
    id: "cdm-10",
    chapter: "cpp-dynamic-memory" as any,
    level: 3,
    question:
      "下面这段代码有什么问题？怎么修？\n```cpp\nint* raw = new int(42);\nauto sp1 = std::shared_ptr<int>(raw);\nauto sp2 = std::shared_ptr<int>(raw);\n```",
    answer:
      "**Double free / use-after-free**。sp1 和 sp2 各自有独立的控制块，都以为自己是 raw 的唯一管理者。sp2 析构时 `use_count→0` 并 `delete raw`；之后 sp1 析构时又要 `delete raw` 一次——double free。即使 sp1 先析构也一样。修复：改成 `auto sp1 = std::make_shared<int>(42); auto sp2 = sp1;`——两个 shared_ptr 共享同一个控制块。口诀：**同一个裸指针最多只给一个 shared_ptr**。",
    tags: ["shared_ptr", "double free", "裸指针"],
  },
  {
    id: "cdm-11",
    chapter: "cpp-dynamic-memory" as any,
    level: 3,
    question:
      "在二叉树中，为什么父→子用 shared_ptr，子→父用 weak_ptr？如果子→父也用了 shared_ptr 会发生什么？",
    answer:
      "父→子用 shared_ptr 是因为父「拥有」子——父离开作用域时，子应该被删除（正常所有权方向）。子→父如果用 shared_ptr，就形成了循环引用：父持有子→子持有父→两者的引用计数永远 ≥1→谁都无法释放。子→父用 weak_ptr 后：子不增加父的引用计数，父离开作用域时引用计数降到 0→父被释放→父被释放时释放它持有的子→子也被释放——正常链式析构。",
    tags: ["循环引用", "weak_ptr", "二叉树"],
  },
  {
    id: "cdm-12",
    chapter: "cpp-dynamic-memory" as any,
    level: 3,
    question: "把 unique_ptr 转成 shared_ptr 和反过来，各自的正确姿势是什么？",
    answer:
      "**unique_ptr → shared_ptr**：`shared_ptr<T> sp = std::move(up);`——把所有权从 unique_ptr 转移到 shared_ptr。之后 unique_ptr 变空。**shared_ptr → unique_ptr**：不能直接转——shared_ptr 可能被多个指针共享，无法保证独占。如果你确定 `use_count() == 1`，可以 `unique_ptr<T> up(shared_ptr<T>.get())` 然后 `sp.release()`？不——这样会 double free。标准做法是不要转：要么保持 unique_ptr，要么一开始就用 shared_ptr。",
    tags: ["unique_ptr", "shared_ptr", "所有权转移"],
  },
  {
    id: "cdm-13",
    chapter: "cpp-dynamic-memory" as any,
    level: 3,
    question:
      "在没有 make_unique 的 C++11 环境下，怎么安全地创建 unique_ptr？",
    answer:
      "① 手动实现一个 make_unique（7 行模板）：\n```cpp\ntemplate<typename T, typename... Args>\nstd::unique_ptr<T> make_unique(Args&&... args) {\n    return std::unique_ptr<T>(new T(std::forward<Args>(args)...));\n}\n```\n② 直接构造：`std::unique_ptr<int> up(new int(42));`——注意不要让这个 `new` 出现在可能抛异常的参数列表里。如果有多参数函数调用，先 `new` 再传 unique_ptr 构造是安全的（只要 `new` 成功、unique_ptr 构造不会失败）。",
    tags: ["make_unique", "C++11", "unique_ptr"],
  },
  {
    id: "cdm-14",
    chapter: "cpp-dynamic-memory" as any,
    level: 3,
    question:
      "shared_ptr 的删除器怎么设置？给一个管理 FILE* 的 shared_ptr 的完整声明。",
    answer:
      "删除器作为 shared_ptr 构造函数的第二个参数：\n```cpp\nauto closer = [](FILE* f) { if (f) fclose(f); };\nstd::shared_ptr<FILE> fp(fopen(\"data.txt\", \"r\"), closer);\n```\n删除器可以是函数指针、lambda、函数对象——shared_ptr 在运行时把删除器存在控制块里，析构时调用。与 unique_ptr 不同的是，shared_ptr 的删除器不影响类型（不需要写在模板参数里），所以不同的 shared_ptr 即使删除器不同也可以放进同一个容器。",
    tags: ["删除器", "shared_ptr", "deleter"],
  },

  // ── L4 综合：场景选型与完整设计 ──
  {
    id: "cdm-15",
    chapter: "cpp-dynamic-memory" as any,
    level: 4,
    question:
      "设计一个 Widget 工厂类，要求：(1) 用工厂方法 create() 创建 Widget 并返回所有权；(2) Widget 持有创建它的工厂的引用用于日志记录；(3) 工厂可能离开作用域时 Widget 还在用——确保不悬垂。写出 Widget 和 Factory 的骨架代码，并解释为什么选择这种智能指针组合。",
    answer:
      "```cpp\nstruct Factory;\n\nstruct Widget {\n    std::string name;\n    std::weak_ptr<Factory> factory;  // 不拥有工厂，工厂可能先挂\n    Widget(const std::string& n, std::shared_ptr<Factory> f)\n        : name(n), factory(f) {}\n    void log();\n};\n\nstruct Factory {\n    std::vector<std::shared_ptr<Widget>> widgets;\n\n    std::shared_ptr<Widget> create(const std::string& name) {\n        auto w = std::make_shared<Widget>(name, shared_from_this());\n        widgets.push_back(w);\n        return w;\n    }\n};\n```\n选择原因：① Factory::create 返回 shared_ptr——调用方可能需要共享所有权；② Factory 持有 widgets 列表也用的是 shared_ptr——多个地方可能持有同一个 Widget；③ Widget 对 Factory 用 weak_ptr——工厂可能先于 Widget 销毁（Widget 被别的持有者保留），weak_ptr 保证不会形成循环引用也不会造成悬垂（lock() 判空）。",
    tags: ["智能指针", "工厂模式", "生命周期"],
  },
  {
    id: "cdm-16",
    chapter: "cpp-dynamic-memory" as any,
    level: 4,
    question:
      "下面这个场景——一个容器存一批 shared_ptr<Node>，Node 之间用 weak_ptr 互相引用避免循环——当容器 clear() 时所有 Node 是否都能正常释放？如果有一个 Node 没有被放进容器但被容器中的某个 Node 通过 shared_ptr 持有，会怎样？",
    answer:
      "**容器内用 shared_ptr + 节点间用 weak_ptr = 安全**：容器 `clear()` 时释放所有 shared_ptr ⇒ 每个节点引用计数降（减去被容器持有的一份）⇒ 节点间 weak_ptr 不增加引用计数 ⇒ 如果不再有外部 holding，引用计数归零 ⇒ 全部正常析构。**但如果有一个外部 Node 被容器中的节点用 shared_ptr 持有**就不一定了：那个外部 Node 的引用计数永远 ≥1（被容器内节点持有一份），容器内节点析构后外部 Node 就可能变成「没有外部持有者但引用计数不为零」——取决于设计。规则：**节点间如果不构成所有权关系（只是引用），用 weak_ptr；如果构成附属关系，确保父/拥有者用 shared_ptr，且只有一边持有。**",
    tags: ["shared_ptr", "weak_ptr", "容器", "生命周期"],
  },
  {
    id: "cdm-17",
    chapter: "cpp-dynamic-memory" as any,
    level: 4,
    question:
      "给定一个用 raw pointer 实现的简单链表（struct Node { int data; Node* next; };），请完整改写为用智能指针实现，确保没有内存泄漏，并支持打印链表和销毁。要求：销毁时不要递归（防止栈溢出）。",
    answer:
      "```cpp\nstruct Node {\n    int data;\n    std::unique_ptr<Node> next;  // 独占所有权，链表一路向下\n    Node(int d) : data(d) {}\n};\n\n// 打印\nvoid print(const std::unique_ptr<Node>& head) {\n    for (auto* p = head.get(); p != nullptr; p = p->next.get())\n        std::cout << p->data << ' ';\n}\n\n// 销毁：不用递归！unique_ptr 的链式析构本身就是非递归的——\n// 当一个 unique_ptr 析构时，它 delete 对象，然后对象的 next 成员\n// 是另一个 unique_ptr，它析构时又会 delete 下一个……\n// 但这可能造成深度递归析构导致栈溢出。安全做法：迭代释放\nvoid destroy(std::unique_ptr<Node> head) {\n    while (head) {\n        head = std::move(head->next);  // 转移到当前 head，旧的被 delete\n    }\n}\n```\n选择 unique_ptr 的原因：链表是单向、线性的所有权模型——每个节点只属于前一个节点。不需要 shared_ptr 的共享语义。用迭代销毁的原因：如果链表很长（>1000），unique_ptr 的嵌套析构可能触发递归调用析构函数直到爆栈。",
    tags: ["unique_ptr", "链表", "析构", "栈溢出"],
  },
  {
    id: "cdm-18",
    chapter: "cpp-dynamic-memory" as any,
    level: 4,
    question:
      "你有一个函数需要返回一个「有时共享、有时独占」的堆对象。你会声明的返回类型是 unique_ptr 还是 shared_ptr？为什么？",
    answer:
      "**返回 unique_ptr**。unique_ptr 可以隐式地「升级」为 shared_ptr：`shared_ptr<T> sp = std::move(up);`——调用方如果不想共享就留在 unique_ptr 里用，想共享就 `move` 进 shared_ptr。反过来，shared_ptr 不能降级为 unique_ptr（因为可能有多个共享者）。所以返回 unique_ptr 给调用方最大的灵活性——独占方零开销，共享方可以主动升级。这是 C++ Core Guidelines F.26 的建议：`return a unique_ptr by default`。",
    tags: ["unique_ptr", "shared_ptr", "接口设计", "所有权"],
  },
];
