import type { ReviewQuestion } from "./types";

/** Effective C++ 资源管理复习题 */
export const efcResourceManagementQuestions: ReviewQuestion[] = [
  {
    id: "efc-resource-management-1",
    chapter: "efc-resource-management",
    level: 1,
    question: `什么是 RAII？它的核心思想是什么？`,
    answer:
      `RAII（Resource Acquisition Is Initialization，资源获取即初始化）的核心思想是：把资源的生命周期绑定到对象的生命周期上。\n\n具体做法：\n- 构造函数中获取资源（分配内存、打开文件、获取锁等）\n- 析构函数中释放资源\n- 利用栈展开（stack unwinding）机制，无论正常返回还是异常抛出，析构函数都会被调用，从而保证资源被释放\n\nRAII 的价值在于把「手动管理资源释放时机」这个容易出错的问题，交给类型系统和栈展开机制来保证——只要对象被销毁，资源就被释放，确定性由编译器而非程序员记忆来保证。`,
    tags: ["RAII", "资源管理", "核心概念"],
  },
  {
    id: "efc-resource-management-2",
    chapter: "efc-resource-management",
    level: 2,
    question:
      `\`auto_ptr\` 为什么被废弃？\`unique_ptr\` 和 \`shared_ptr\` 分别在什么场景下使用？`,
    answer:
      `\`auto_ptr\` 被废弃的原因：它的拷贝操作是「转移所有权」而非「共享所有权」，导致拷贝后原对象变为空指针。这种语义违反直觉——拷贝操作竟然修改了源对象，容易引发悬空指针。C++11 起用 \`unique_ptr\` 替代。\n\n\`unique_ptr\`：独占所有权场景\n- 同一时刻只有一个 \`unique_ptr\` 持有资源\n- 不可拷贝，但可以 move（\`std::move\`）\n- 零开销抽象，几乎和裸指针一样高效\n- 适合：工厂函数返回值、Pimpl 惯用法、容器内独占持有\n\n\`shared_ptr\`：共享所有权场景\n- 多个 \`shared_ptr\` 可以指向同一资源，通过引用计数管理\n- 引用计数降为 0 时释放资源\n- 有引用计数的原子操作开销\n- 适合：多个对象需要共享同一资源、图的节点互相引用（配合 \`weak_ptr\`）\n\n选型原则：默认用 \`unique_ptr\`，只有在需要共享所有权时才用 \`shared_ptr\`。`,
    tags: ["auto_ptr", "unique_ptr", "shared_ptr", "所有权"],
  },
  {
    id: "efc-resource-management-3",
    chapter: "efc-resource-management",
    level: 3,
    question:
      `条款 14 说「在资源管理类中小心 copying 行为」，请说明 RAII 对象被拷贝时有哪些选择？`,
    answer:
      `RAII 对象被拷贝时，需要同时处理资源本身的拷贝和所有权的语义。常见做法有五种：\n\n1. 禁止拷贝（条款 6）：如果拷贝没有合理语义，就把拷贝构造和拷贝赋值设为 \`= delete\` 或 private。例如 \`unique_ptr\` 就是禁止拷贝的。\n\n2. 引用计数（共享所有权）：拷贝时增加引用计数，最后一个对象销毁时释放资源。\`shared_ptr\` 就是这种做法。\n\n3. 拷贝底部资源（深拷贝）：每个 RAII 对象拥有自己的一份资源副本。例如标准 \`string\` 拷贝时会复制底层字符数组。\n\n4. 转移所有权（move 语义）：拷贝时把资源从源对象转移到目标对象，源对象变为空。\`unique_ptr\` 的 move 操作、\`auto_ptr\` 的拷贝都是这种（但 \`auto_ptr\` 用拷贝语法做 move 语义是错误的）。\n\n5. 转移底部资源：对于锁这类资源，拷贝的合理语义可能是「释放当前锁，获取新锁」，或干脆禁止拷贝。\n\n核心原则：RAII 对象的拷贝行为应由资源的性质决定——资源能共享吗？能复制吗？能转移吗？每种答案对应不同的拷贝策略。`,
    tags: ["条款14", "RAII", "拷贝行为", "所有权语义"],
  },
  {
    id: "efc-resource-management-4",
    chapter: "efc-resource-management",
    level: 4,
    question:
      `条款 16 说「成对使用 new 和 delete 时要采取相同形式」，条款 17 说「以独立语句将 newed 对象置入智能指针」。请综合分析这两条条款如何共同保证资源安全？`,
    answer:
      `这两条条款从「释放形式正确」和「异常安全」两个维度共同保障资源安全：\n\n条款 16：释放形式必须匹配分配形式\n- \`new\` 配 \`delete\`，\`new[]\` 配 \`delete[]\`\n- 如果用 \`new[]\` 分配但用 \`delete\` 释放，行为未定义——可能只调用第一个元素的析构函数，内存只部分释放\n- 在 \`typedef\` 中尤其危险：如果 typedef 用了数组形式，调用者看不到数组语法，容易用错 delete\n- 最佳实践：尽量用 \`vector\` / \`string\` 替代动态数组，避免 \`new[]\`/\`delete[]\`\n\n条款 17：独立语句置入智能指针\n- 问题场景：\`processWidget(shared_ptr<Widget>(new Widget), priority())\`\n- 编译器可能按以下顺序执行：① \`new Widget\` ② \`priority()\` ③ \`shared_ptr\` 构造\n- 如果 ② 抛异常，① 分配的 Widget 指针还没进 \`shared_ptr\`，资源泄漏\n- 修法：把 \`new\` 和 \`shared_ptr\` 构造放在独立语句中\n  \`\`\`cpp\n  shared_ptr<Widget> pw(new Widget);\n  processWidget(pw, priority());\n  \`\`\`\n- 这样 \`priority()\` 抛异常时，\`pw\` 已经构造完成，析构函数会自动释放资源\n\n两条条款的协同：\n- 条款 16 保证「正常路径下释放形式正确」\n- 条款 17 保证「异常路径下资源不泄漏」\n- 两者缺一不可：只满足 16 但不满足 17，异常时泄漏；只满足 17 但不满足 16，正常析构时 UB\n\n本质：条款 16 关注「delete 语义正确性」，条款 17 关注「RAII 构造的原子性」。前者是释放端的安全，后者是获取端的安全，合在一起才构成完整的资源安全闭环。`,
    tags: ["综合", "条款16", "条款17", "new/delete", "异常安全", "智能指针"],
  },
];
