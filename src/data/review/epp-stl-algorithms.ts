import type { ReviewQuestion } from "./types";

/** C++ Primer Plus · STL 与算法复习题 */
export const eppStlAlgorithmsQuestions: ReviewQuestion[] = [
  {
    id: "epp-stl-algorithms-1",
    chapter: "epp-stl-algorithms",
    level: 1,
    question: "STL 由哪三部分组成？它们之间是什么关系？迭代器扮演什么角色？",
    answer:
      "STL 三部分：容器、算法、迭代器。\n\n- 容器：管理数据存储，如 `vector`（动态数组）、`list`（双向链表）、`map`（红黑树键值对）、`set`（有序集合）、`deque`（双端队列）。\n- 算法：处理数据的通用函数，如 `sort`、`find`、`copy`、`for_each`、`accumulate`，定义在 `<algorithm>`。\n- 迭代器：容器与算法的桥梁，是「泛型指针」，提供遍历容器元素的统一接口（`begin()`/`end()`/`it++`/`*it`）。\n\n关系：算法不直接操作容器，而是通过迭代器访问元素。算法接收迭代器区间 `[begin, end)`，对区间内的元素做处理。这样算法与容器解耦——同一个 `sort` 算法能作用于 vector、deque、array 任意提供随机访问迭代器的容器，只要它们提供符合要求的迭代器。\n\n迭代器的角色：它是容器与算法之间的「接口协议」。容器负责「怎么存」，算法负责「怎么算」，迭代器定义「怎么遍历」。算法按迭代器类别（输入/输出/前向/双向/随机访问）要求不同能力，容器按自身结构提供对应类别的迭代器。这种分类让算法能安全地声明「我需要随机访问迭代器」，编译期拒绝不满足的容器。",
    tags: ["STL", "容器", "算法", "迭代器"],
  },
  {
    id: "epp-stl-algorithms-2",
    chapter: "epp-stl-algorithms",
    level: 2,
    question: "vector 和 list 各适合什么场景？为什么说「默认用 vector」是好建议？",
    answer:
      "vector（动态数组）：内存连续，支持 O(1) 随机访问、O(1) 尾部增删、O(n) 中间插入删除。适合：需要随机访问（按下标）、元素个数已知或增长主要在尾部、遍历密集（连续内存缓存友好）的场景。\n\nlist（双向链表）：内存不连续，每个节点单独分配，支持 O(1) 任意位置插入删除（已知迭代器）、O(n) 随机访问（必须从头遍历）。适合：频繁在中间插入删除、不需要随机访问、元素体积大拷贝昂贵（list 只改指针不搬数据）的场景。\n\n「默认用 vector」的原因：\n1. 缓存友好：vector 内存连续，遍历时 CPU 预取命中率高，实际性能远超理论复杂度。list 节点分散，每次跳转都可能缓存缺失，常数因子大。对小对象，vector 的 O(n) 插入往往比 list 的 O(1) 插入还快（因为 list 的指针操作与缓存缺失开销超过 vector 的搬移）。\n2. 内存开销小：list 每个节点额外两个指针（前后），小对象时开销占比高；vector 无额外开销。\n3. 随机访问：vector 支持 []，list 不支持，vector 更通用。\n4. 多数场景增删在尾部：vector 尾部增删是 O(1)，覆盖了大多数需求。\n\n只有当你明确需要「频繁中间插入删除且元素大或拷贝昂贵」时才换 list。即便需要中间插入，也可先考虑 `std::deque` 或「vector + 标记删除 + 定期整理」等替代方案。这是现代 C++ 性能文化的经验总结。",
    tags: ["vector", "list", "容器选择", "缓存友好"],
  },
  {
    id: "epp-stl-algorithms-3",
    chapter: "epp-stl-algorithms",
    level: 3,
    question: "你用 `sort(v.begin(), v.end())` 排序 vector 没问题，但 `sort(l.begin(), l.end())` 排序 list 却编译报错，为什么？怎么给 list 排序？",
    answer:
      "原因：`std::sort` 要求迭代器是「随机访问迭代器」（RandomAccessIterator），list 提供的是「双向迭代器」（BidirectionalIterator），不满足要求，编译报错。\n\n迭代器类别与能力：\n- 随机访问迭代器：支持 `it + n`、`it - n`、`it[n]`、`it1 - it2`，可在 O(1) 跳跃任意距离。vector、deque、array、原生指针提供此类。\n- 双向迭代器：支持 `++it`、`--it`，可前后移动一步，但不能随机跳跃。list、set、map 提供此类（因为它们的内存结构是链式/树式，无法 O(1) 跳到第 n 个）。\n\n`std::sort` 的实现（通常内省排序 introsort）需要随机访问来选 pivot、分区、跳跃，双向迭代器做不到，所以拒绝 list。\n\n怎么给 list 排序：用 list 自己的成员函数 `l.sort()`。list 提供成员版 sort（基于归并排序，适合链表结构，O(n log n) 且稳定）。它还可接收自定义比较谓词：`l.sort([](int a, int b){ return a > b; })`。\n\n启示：\n1. 算法对迭代器类别有要求，不满足的容器不能用该算法——这是编译期类型检查，保护你免受运行期错误。\n2. 某些容器有同名成员函数（list::sort、map::find 等），它们针对容器结构优化，优先用成员版而非通用算法。\n3. 需要随机访问的算法（sort、nth_element、binary_search）只能用于连续内存容器；链表类容器用对应的成员函数或换数据结构。",
    tags: ["迭代器类别", "sort", "list", "排查"],
  },
  {
    id: "epp-stl-algorithms-4",
    chapter: "epp-stl-algorithms",
    level: 4,
    question: "综合分析：STL 用「迭代器」解耦容器与算法，而非让每个容器自带 sort/find 方法。这种「泛型算法 + 迭代器协议」的设计有什么得失？",
    answer:
      "得：\n1. 算法复用最大化：一份 sort 实现适用于所有提供随机访问迭代器的容器（vector/deque/array/原生数组），无需每个容器重写。N 个容器 × M 个算法只需 N+M 份代码，而非 N×M。\n2. 扩展性：用户自定义容器只要实现迭代器接口，就能用全部 STL 算法；自定义算法只要按迭代器类别写，就能作用于全部容器。生态正交扩展。\n3. 类型安全：迭代器类别在编译期检查，sort 拒绝非随机访问容器，错误早暴露。\n4. 性能：模板在编译期实例化，算法针对具体容器类型生成优化代码，可内联，零运行期分派开销。\n\n失：\n1. 接口间接：算法操作的是迭代器区间而非容器，新手需理解 `[begin, end)` 半开区间语义，不如「container.sort()」直观。\n2. 容器特定优化受限：通用算法不能利用容器的内部结构（如 set 的排序特性），导致 set 上用 std::find 是 O(n) 而 set::find 是 O(log n)。故部分容器提供成员版算法补足。\n3. 迭代器失效陷阱：算法操作迭代器，若期间容器结构改变（如遍历中 erase），迭代器失效，行为未定义。这是 STL 经典 bug 源。\n4. 错误信息难读：模板实例化失败时，编译器报错冗长（深嵌的类型名链），新手难定位。C++20 concepts 改善了这点。\n5. 抽象层次扁平：迭代器把所有容器拉到「线性遍历」模型，树/图等非线性结构难以纳入（这也是为什么 STL 没有内置 tree 容器）。\n\n本质：STL 的设计是「用最小公约接口（迭代器）换取最大复用」，牺牲了一点直观性与容器特定优化，换来算法与容器的正交扩展。这是泛型编程的典范，也是 C++ 「编译期多态 + 零成本抽象」哲学的最佳实践。后续语言（Rust 的 trait、C# 的 LINQ）都受此影响。",
    tags: ["综合", "STL", "迭代器", "泛型设计"],
  },
];
