import type { ReviewQuestion } from "./types";

/** C++ 编程测试秘籍 · STL 测试复习题 */
export const ctrStlTestQuestions: ReviewQuestion[] = [
  {
    id: "ctr-stl-test-1",
    chapter: "ctr-stl-test",
    level: 1,
    question: "STL 容器按存储方式分为哪几类？`vector` / `list` / `map` / `unordered_map` 各属哪类、底层结构是什么？",
    answer:
      "STL 容器按存储与访问方式分三大类：\n1. 顺序容器（sequence）：按线性顺序存元素，位置由插入顺序决定。包括 vector（动态数组）、deque（双端队列分块）、list（双向链表）、forward_list（单向链表）、array（定长数组）、string。\n2. 关联容器（associative）：按键有序存储，靠键查找。包括 set/map/multiset/multimap，底层是红黑树。\n3. 无序关联容器（unordered）：哈希存储，按键哈希分桶。包括 unordered_set/map/multiset/multimap，底层是哈希表（链地址法）。\n4. 容器适配器（adapter）：基于顺序容器封装。stack、queue、priority_queue。\n\n四个容器的归属与底层：\n- `vector`：顺序容器，底层是连续动态数组，扩容时搬移。\n- `list`：顺序容器，底层是双向链表，节点分散分配。\n- `map`：有序关联容器，底层红黑树，按键有序、查找/插入/删除 O(log n)。\n- `unordered_map`：无序关联容器，底层哈希表，平均 O(1) 查找/插入/删除，最坏 O(n)。",
    tags: ["容器分类", "顺序容器", "关联容器", "无序容器", "底层结构"],
  },
  {
    id: "ctr-stl-test-2",
    chapter: "ctr-stl-test",
    level: 2,
    question: "什么是迭代器失效？`vector` 的 `push_back` 和 `erase` 分别会使哪些迭代器失效？`list` 的 `erase` 又如何？",
    answer:
      "迭代器失效：容器在增删元素后，内部存储可能重排或节点被释放，导致原先持有的迭代器、指针、引用指向无效位置或错误元素，继续使用是 UB。不同容器、不同操作的失效规则不同，是 STL 最常见的 bug 源。\n\nvector 的失效规则：\n- `push_back`：若引发扩容（size 超过旧 capacity），所有迭代器、指针、引用全部失效（因为整块内存搬家）。若未扩容，仅 end() 失效（逻辑上结束位置变了），原有迭代器仍有效。所以循环 push_back 时持有旧迭代器很危险——无法预知是否扩容。\n- `erase`：被删元素及其后所有元素的迭代器失效（连续存储，后面的元素前移）。erase 返回指向下一个有效元素的新迭代器，应据此更新。\n\nlist 的失效规则：\n- `erase`：仅被删节点的迭代器失效，其他迭代器仍有效（链表节点独立，删除不影响其他节点位置）。这是链表相对 vector 的一大优势——增删不波及其他迭代器。\n\n安全删除模式：循环删除时用 `it = v.erase(it);`（vector/list 通用），erase 返回下一个有效迭代器，避免用已失效的 it++。",
    tags: ["迭代器失效", "vector", "list", "push_back", "erase"],
  },
  {
    id: "ctr-stl-test-3",
    chapter: "ctr-stl-test",
    level: 3,
    question: "给定「频繁在头部插入删除」和「按键查找且需保持有序遍历」两种需求，各应选哪个容器？为什么 `unordered_map` 最坏查找是 O(n)？",
    answer:
      "两种需求的容器选择：\n1. 频繁在头部插入删除：选 `deque` 或 `list`。vector 头部插入是 O(n)（要搬移所有元素），不可取。deque 是分块连续数组，头尾插入都是 O(1) 摊还，且支持随机访问，多数情况优于 list。list 头部插入删除 O(1) 但无随机访问、缓存不友好，仅在需要中间频繁增删或避免元素搬移时选。综合：要随机访问选 deque，不要随机访问且增删频繁选 list。\n2. 按键查找且需保持有序遍历：选 `map`（红黑树）。它按键有序存储，查找/插入/删除 O(log n)，且中序遍历得到有序序列。若不需要有序，unordered_map 平均 O(1) 更快，但遍历顺序无序。\n\nunordered_map 最坏 O(n) 的原因：哈希表用链地址法时，若所有键哈希冲突（哈希函数差或恶意输入），全落进同一个桶，退化成单链表，查找变成链表遍历 O(n)。标准未规定哈希函数，实现通常用除留余数，最坏退化是真实的。缓解：用好的哈希函数、设合适桶数、C++ 标准要求平均 O(1) 但不保证最坏。对延迟敏感或防 DoS 的场景，有序 map 的稳定 O(log n) 更可控。",
    tags: ["容器选择", "deque", "map", "unordered_map", "哈希冲突", "复杂度"],
  },
  {
    id: "ctr-stl-test-4",
    chapter: "ctr-stl-test",
    level: 4,
    question: "为什么「在范围 for 循环里对 vector 调用 push_back」是 bug？若必须边遍历边增删，正确写法是什么？请结合迭代器失效与扩容机制说明。",
    answer:
      "范围 for 里对 vector push_back 是 bug 的原因：\n范围 for `for (auto& x : v)` 本质是 `for (auto it = v.begin(); it != v.end(); ++it) { auto& x = *it; ... }`，它在循环开始时缓存了 end()。在循环体内 push_back 有两个致命问题：\n1. 扩容导致全部失效：push_back 一旦触发扩容，整个内存块搬家，缓存的所有迭代器（begin、it、end）全部失效，下一次 `*it` 或 `++it` 是 UB——可能崩溃、可能读到错误数据、可能死循环。\n2. 即使不扩容也逻辑错误：push_back 改变了 size，缓存的 end() 是旧值，新元素不会被遍历到，行为不符合预期；更糟的是若 push_back 使 size 超过旧 capacity 必然扩容。\n\n根因：vector 的连续存储 + 扩容搬家，使得「遍历中修改容器结构」与「迭代器稳定性」冲突。范围 for 隐藏了迭代器细节，让人误以为安全，实则更危险。\n\n正确写法（边遍历边增删）：\n- 删除：用索引或迭代器配 erase 返回值。`for (auto it = v.begin(); it != v.end(); ) { if (条件) it = v.erase(it); else ++it; }`。erase 返回下一个有效迭代器，避免失效的 it++。但 vector erase 是 O(n) 搬移，批量删应用「remove-erase 惯用法」：`v.erase(std::remove_if(v.begin(), v.end(), pred), v.end());`，O(n) 一次搬移。\n- 增加：先把要加的元素存到临时容器，遍历完原容器再批量插入，避免边遍历边改结构。\n- 若增删频繁到 erase O(n) 不可接受，应换 list 或先收集操作再统一执行。\n\n通用原则：遍历容器时不要改变其结构（增删元素），必要时用返回新迭代器或先收集后修改的方式。",
    tags: ["范围 for", "迭代器失效", "扩容", "remove-erase", "综合分析"],
  },
];
