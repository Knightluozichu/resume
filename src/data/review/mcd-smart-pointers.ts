import type { ReviewQuestion } from "./types";

/** Modern C++ Design 智能指针设计复习题 */
export const mcdSmartPointersQuestions: ReviewQuestion[] = [
  {
    id: "mcd-smart-pointers-1",
    chapter: "mcd-smart-pointers",
    level: 1,
    question: `Loki SmartPtr 的四个策略维度分别是什么？各自管什么？`,
    answer:
      `SmartPtr 把智能指针的可变行为拆成四个正交 Policy 维度，作为模板参数：\n\`\`\`cpp\ntemplate\n<\n  typename T,\n  template <class> class OwnershipPolicy = RefCounted,\n  template <class> class ConversionPolicy = DisallowConversion,\n  template <class> class CheckingPolicy = AssertCheck,\n  template <class> class StoragePolicy = DefaultSPStorage\n>\nclass SmartPtr;\n\`\`\`\n\n1. OwnershipPolicy（所有权）：决定拷贝/析构时如何处理底层资源——DeepCopy（深拷贝）、RefCounted（引用计数）、RefLinked（引用链）、NoCopy（禁拷贝）。\n2. ConversionPolicy（转换）：是否允许隐式转换为 \`SmartPtr<U>\` 或裸指针——DisallowConversion / AllowConversion。\n3. CheckingPolicy（检查）：解引用前是否检查空——AssertCheck（断言）、RejectNullStatic（编译期禁止空）、NoCheck（不检查）。\n4. StoragePolicy（存储）：底层指针如何存放与访问——DefaultSPStorage（普通指针）、ArrayStorage（数组特化）、LockedStorage（带锁）。\n\n四个维度各取其一，编译期生成定制指针，一套模板顶多个手写指针类。`,
    tags: ["SmartPtr", "策略维度", "Ownership", "Storage"],
  },
  {
    id: "mcd-smart-pointers-2",
    chapter: "mcd-smart-pointers",
    level: 2,
    question: `OwnershipPolicy 的四个选项（DeepCopy、RefCounted、RefLinked、NoCopy）语义有何不同？分别适合什么场景？`,
    answer:
      `1. DeepCopy（深拷贝）：每次拷贝 SmartPtr 都 clone 出一份新对象，两个指针各自独占。适合值语义对象、不可共享且可克隆的资源（如配置快照）。代价是每次拷贝都要完整复制对象。\n\n2. RefCounted（引用计数）：多个 SmartPtr 共享同一对象，维护一个计数，拷贝增 1、析构减 1，归零才删除。适合共享只读资源、需要多所有者的场景。代价是计数开销（常需原子操作）与循环引用风险（需配合弱指针打破）。\n\n3. RefLinked（引用链）：多个 SmartPtr 共享对象，但不用计数，而是把所有指向同一对象的指针串成双向链表。拷贝时把自己插入链表，析构时摘出，链表空则删对象。适合不想付计数开销、指针数量不多的场景。代价是链表维护开销与内存局部性差。\n\n4. NoCopy（禁拷贝）：禁止拷贝 SmartPtr，指针独占且不可复制（类似 unique_ptr 的强独占）。适合「唯一所有权、明确不可共享」的资源（如文件句柄、锁）。代价是不能传递所有权除非显式 move。\n\n选择原则：默认值语义选 DeepCopy，共享选 RefCounted，独占不可拷贝选 NoCopy，RefLinked 作为计数替代在特定场景使用。`,
    tags: ["OwnershipPolicy", "DeepCopy", "RefCounted", "引用计数"],
  },
  {
    id: "mcd-smart-pointers-3",
    chapter: "mcd-smart-pointers",
    level: 3,
    question: `SmartPtr 如何在不引入虚函数开销的前提下实现多态行为？StoragePolicy 的 ArrayStorage 和 LockedStorage 分别解决什么问题？`,
    answer:
      `SmartPtr 的「多态」靠模板实例化而非虚函数：四个 Policy 都是模板参数，调用 \`ptr->foo()\` 时编译器看到的是具体 Policy 类型的内联调用，无虚表、无运行时分派。不同 Policy 组合生成不同具体类型，各自把策略行为「烙印」进编译产物，于是得到「定制行为 + 零虚函数开销」。\n\n- 拷贝/析构行为由 OwnershipPolicy 的内联函数决定，编译器可展开优化。\n- 解引用检查由 CheckingPolicy 的内联函数决定，Release 模式可彻底消除检查。\n- 这就是 Policy 设计相对虚函数策略模式的核心收益：行为在编译期定型，调用可内联。\n\nStoragePolicy 解决「指针怎么存、怎么访问」：\n1. DefaultSPStorage：存一个普通 \`T*\`，\`operator->\`/\`operator*\` 直接返回它。最常见默认。\n2. ArrayStorage：针对数组 \`T[]\`，析构时用 \`delete[]\` 而非 \`delete\`，并支持 \`operator[]\`。解决「数组指针用错 delete」的内存错误。\n3. LockedStorage：在存指针的同时附带一把锁，访问前加锁、访问后解锁。解决「跨线程访问同一资源需同步」的问题，把线程安全策略与所有权策略解耦——你可以要 RefCounted + LockedStorage 组合，而不必写一个「线程安全引用计数指针」子类。\n\n关键：StoragePolicy 把「存储与访问形式」也变成可定制维度，使 SmartPtr 能表达数组、加锁等非平凡存储，而无需派生新类。`,
    tags: ["SmartPtr", "零虚函数", "StoragePolicy", "ArrayStorage"],
  },
  {
    id: "mcd-smart-pointers-4",
    chapter: "mcd-smart-pointers",
    level: 4,
    question: `为什么说「智能指针设计是 Policy 设计的试金石」？Loki SmartPtr 与 std::shared_ptr/unique_ptr 相比有何取舍？`,
    answer:
      `称其为试金石的原因：智能指针同时牵涉所有权、转换、检查、存储四个正交维度，且每个维度都有多种合理实现，是检验 Policy 设计能否「干净拆分正交维度 + 编译期组合 + 零开销」的最佳用例。如果 Policy 框架不能优雅表达 SmartPtr，就说明它还不够通用。SmartPtr 成功用四个 Policy 参数表达了「N×M×K×L 种指针一套模板」，证明了 Policy 范式的力量，也反过来巩固了全书方法论。\n\n与 std::shared_ptr/unique_ptr 的取舍：\n1. 标准库走「少数固定语义」路线：unique_ptr 独占（对应 NoCopy/move）、shared_ptr 共享（对应 RefCounted）、weak_ptr 打破循环。所有权语义固定，不可换；删除器可定制（对应部分 StoragePolicy），但检查、转换策略不可换。\n2. Loki SmartPtr 走「全维度可定制」路线：四个维度都能换，能表达 DeepCopy、RefLinked 等标准库没有的语义，但用法复杂、模板签名吓人。\n3. 标准库优势：标准化、普及度高、移动语义完善、\`make_shared\` 优化计数与对象同块分配、与 STL 深度集成。\n4. Loki 优势：极致定制——需要 RefLinked、LockedStorage、自定义检查策略等非标语义时，SmartPtr 仍能表达，而标准库无能为力。\n\n取舍结论：日常用标准库足够；当需要标准库未提供的所有权/存储/检查组合，或想学习「编译时多态如何设计可定制组件」时，Loki SmartPtr 仍是范本。它启发了标准库的删除器策略与现代 C++ 的「策略参数化」思潮。`,
    tags: ["SmartPtr", "试金石", "shared_ptr", "unique_ptr", "取舍"],
  },
];
