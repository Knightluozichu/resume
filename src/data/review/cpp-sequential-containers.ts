/** 复习题库 · C++ 顺序容器（cpp-sequential-containers）。C++ Primer §9 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cppSequentialContainersQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "csc-1",
    chapter: "cpp-sequential-containers",
    level: 1,
    question: "C++ 标准库提供了哪六种顺序容器？各自的核心特征是什么？",
    answer:
      "① `vector`——连续内存，尾部增删快，随机访问 O(1)，支持预留容量（capacity/reserve）。② `deque`——分段数组（双端队列），两端增删快 O(1)，随机访问 O(1)，但内部由多个固定大小块组成。③ `list`——双向链表，任意位置插入删除 O(1)，不支持随机访问 O(n)，每个节点占用额外指针内存。④ `forward_list`——单向链表，只支持单向遍历，任意位置插入删除 O(1)（只能在给定位置后插入），比 list 更省内存。⑤ `array`——固定大小数组，大小在编译期确定，不支持增删元素，栈上分配。⑥ `string`——字符的连续存储，类似 `vector<char>` 但有专属的字符串操作（substr/find/compare 等）和 C 风格字符串兼容接口。",
    tags: ["vector", "deque", "list", "forward_list", "array", "string", "容器分类"],
  },
  {
    id: "csc-2",
    chapter: "cpp-sequential-containers",
    level: 1,
    question: "顺序容器的「通用操作」有哪些？至少列出 6 个。",
    answer:
      "通用操作（所有容器都支持）：① 类型别名——`size_type`、`iterator`、`const_iterator`、`value_type`、`reference`。② 构造——默认构造、拷贝构造、`C c(b, e)` 用迭代器范围构造、`C c{a,b,c}` 列表初始化。③ 赋值——`c1 = c2`（赋值）、`c.assign(b, e)`（用迭代器范围替换内容）、`c.assign(n, t)`（替换为 n 个 t）、c.swap(c2) 或 swap(c, c2)（交换内容，O(1) 除了 array）。④ 大小——`c.size()`（元素数）、`c.max_size()`（最大容量）、`c.empty()`（是否为空）。⑤ 增删（不全是通用的！）——`c.insert(p, t)`、`c.emplace(p, args)`、`c.erase(p)`、`c.clear()`。⑥ 迭代器——`c.begin()`/`c.end()`、`c.cbegin()`/`c.cend()`、`crbegin()`/`crend()`（反向）。⑦ 关系运算符——`==` `!=` `<` `<=` `>` `>=`（按字典序逐元素比较）。",
    tags: ["通用操作", "size", "empty", "begin", "end", "insert", "erase"],
  },
  {
    id: "csc-3",
    chapter: "cpp-sequential-containers",
    level: 1,
    question: "vector 的 size()、capacity()、reserve() 和 shrink_to_fit() 分别是什么？",
    answer:
      "`size()`——当前已存储的元素数量。`capacity()`——当前已分配的内存能容纳的元素数量（≥ size）。`reserve(n)`——预分配至少能容纳 n 个元素的内存，如果 n≤capacity() 则什么都不做。用于预先知道需要多少元素时避免多次扩容重分配。`shrink_to_fit()`——请求释放多余的预留内存，使 capacity() ≈ size()。这只是请求——实现不一定真的释放内存。典型用法：先用 reserve 预分配避免 push_back 多次扩容，最后用 shrink_to_fit 回收多余空间。",
    tags: ["vector", "size", "capacity", "reserve", "shrink_to_fit"],
  },
  {
    id: "csc-4",
    chapter: "cpp-sequential-containers",
    level: 1,
    question: "vector 扩容时发生了什么？为什么推荐用 reserve() 预分配？",
    answer:
      "当 push_back 时 size==capacity：① 分配一块更大的新内存（通常是原来的 2 倍或 1.5 倍）；② 把旧内存中的所有元素拷贝/移动到新内存；③ 释放旧内存；④ 在新内存的末尾构造新元素。扩容的开销是 O(n) 的拷贝。如果在 push_back 前用 reserve(n) 预分配，就能保证在 n 个元素之前不再扩容——把 N 次 push_back 的均摊成本从 O(log N) 次扩容降低到接近 0 次扩容。典型场景：已知要读入 10000 个元素——`vec.reserve(10000)` 后循环 push_back 零扩容。",
    tags: ["vector", "扩容", "reserve", "重分配", "均摊"],
  },
  {
    id: "csc-5",
    chapter: "cpp-sequential-containers",
    level: 1,
    question: "什么是容器适配器（container adaptor）？C++ 提供了哪三种？各自的默认底层容器是什么？",
    answer:
      "容器适配器不是独立的数据结构——它拿一个底层顺序容器，只暴露一部分操作接口，从而让底层容器表现出不同的行为。三种适配器：① `stack`（栈）：默认底层容器 deque，只暴露 top()/push()/pop()，实现 LIFO（后进先出）。也可用 vector/list 作底层。② `queue`（队列）：默认底层容器 deque，只暴露 front()/back()/push()/pop()，实现 FIFO（先进先出）。也可用 list 作底层（不能用 vector——vector 没有 pop_front）。③ `priority_queue`（优先队列）：默认底层容器 vector，只暴露 top()/push()/pop()，内部用堆维护优先级——top 总是最大（默认）或最小元素。也可用 deque 作底层。",
    tags: ["容器适配器", "stack", "queue", "priority_queue", "deque", "vector"],
  },
  {
    id: "csc-6",
    chapter: "cpp-sequential-containers",
    level: 1,
    question: "stack 和 queue 都默认使用 deque 作为底层容器。它们暴露的接口有什么不同？",
    answer:
      "stack 只暴露「一端」操作——`top()`（查看栈顶）、`push()`（压入栈顶）、`pop()`（弹出栈顶）。本质是把 deque 的 push_back + back + pop_back 三个操作包装起来——后进先出。queue 暴露「两端」操作——`front()`（查看队首）、`back()`（查看队尾）、`push()`（入队尾）、`pop()`（出队首）。本质是把 deque 的 push_back + front + pop_front + back 包装起来——先进先出。关键区别：stack 只能看/操作「最近加入」的元素——queue 可以同时看「最早加入」（front）和「最近加入」（back）两个元素。",
    tags: ["stack", "queue", "LIFO", "FIFO", "top", "front", "back"],
  },
  {
    id: "csc-7",
    chapter: "cpp-sequential-containers",
    level: 1,
    question: "迭代器（iterator）是什么？所有容器都支持迭代器吗？迭代器失效是什么意思？",
    answer:
      "迭代器是访问容器中元素的通用机制——你可以把它理解为指向容器中某个元素的「智能指针」。通过 `*iter` 解引用得到元素，`iter++` 移到下一个元素，`iter->mem` 访问成员。常用操作：`begin()`（首元素）、`end()`（尾后——最后一个元素之后的位置，不能解引用）。所有顺序容器都支持迭代器。迭代器失效：在对容器进行某些操作（如 vector 的 push_back 导致扩容、insert/erase）后，之前获取的迭代器可能指向已被释放的内存——此时继续使用它是未定义行为。vector/deque 的插入/删除最容易导致迭代器失效；list/forward_list 除被删除元素外，其他迭代器仍有效。",
    tags: ["迭代器", "iterator", "begin", "end", "迭代器失效"],
  },
  {
    id: "csc-8",
    chapter: "cpp-sequential-containers",
    level: 1,
    question: "forward_list 和 list 的核心区别是什么？forward_list 为什么没有 push_back？",
    answer:
      "`list` 是双向链表——每个节点存储两个指针（prev + next）。支持双向遍历（++iter 和 --iter），有 push_back（在链表末尾插入）。`forward_list` 是单向链表——每个节点只存储一个指针（next）。只支持单向遍历（++iter），不能反向遍历。没有 push_back 的原因：单向链表没有指向最后一个节点的指针——要在末尾插入需要从 head 走到底（O(n)）。forward_list 的设计哲学是「只提供和手写单向链表同开销的操作」——它确实提供了 push_front（O(1)）和 insert_after（O(1)），但没有 push_back 和 before_begin 之前的 insert。",
    tags: ["forward_list", "list", "双向链表", "单向链表", "push_back"],
  },

  // ── L2 理解：为什么 / 机制 ──
  {
    id: "csc-9",
    chapter: "cpp-sequential-containers",
    level: 2,
    question: "为什么 vector 扩容时通常选择翻倍（2× 增长）而不是每次只加 1？",
    answer:
      "如果每次 push_back 只扩容 1 个元素的空间——从 N 个元素增长到 N+1 个元素需要拷贝 N 个旧元素——总拷贝次数是 0+1+2+...+N ≈ N²/2。如果每次翻倍扩容——分配时拷贝的总次数是 1+2+4+...+2^logN ≈ 2N——均摊到每个 push_back 上约等于常数次拷贝。这就是「均摊 O(1)」的含义：单次 push_back 可能是 O(n)（恰好触发扩容），但 N 次 push_back 的总开销是 O(N)，平均每次 O(1)。翻倍策略是空间换时间的经典体现——多用一点闲置内存（最多 50% 浪费），换来得多的 push_back 性能。",
    tags: ["vector", "扩容策略", "翻倍", "均摊分析", "O(1)"],
  },
  {
    id: "csc-10",
    chapter: "cpp-sequential-containers",
    level: 2,
    question: "为什么 deque 能在两端 O(1) 插入、随机访问也是 O(1)？它的内部结构是怎样的？",
    answer:
      "deque 由两层结构组成：① 一个「中控数组」（map），存储指向多个固定大小数据块（如每块 512 字节）的指针。② 多个独立的「数据块」（chunk），存储实际元素。两端插入时——如果当前首/尾块还有空间则直接在块内操作（O(1)）；块满了就分配新块、在中控数组首/尾增加一个指针。随机访问 `deque[i]` 时——先通过 i 算出它在第几个块（i / chunk_size），再算出块内偏移（i % chunk_size）——两次间接访问，仍是 O(1)（比 vector 多一次间接跳转）。这种结构让 deque 既能有 vector 的随机访问，又能有链表的两端插入速度——代价是内部结构更复杂，且元素不是严格连续的。",
    tags: ["deque", "分段数组", "中控数组", "chunk", "双端队列"],
  },
  {
    id: "csc-11",
    chapter: "cpp-sequential-containers",
    level: 2,
    question: "vector 的 insert 在中间位置插入一个元素的时间复杂度是 O(n)——为什么？过程中发生了什么？迭代器会怎样？",
    answer:
      "insert 在中间位置插入时：① 如果 capacity >= size + 1（有预留空间），则把插入位置及之后的所有元素向后移动一位（O(n)），然后把新元素放到空出的位置。② 如果 capacity < size + 1（空间不够），则先分配更大的新内存，把所有旧元素拷贝过去（插入位置前→拷贝、插入新元素、插入位置后→拷贝到偏移一位的位置），释放旧内存——同样是 O(n)。两种情况下都需要移动 O(n) 个元素——这就是「中间插入 O(n)」的含义。迭代器失效：insert 之后，插入位置及其之后的所有迭代器全部失效（元素被挪动了）。如果触发了扩容重分配，则所有迭代器、指针、引用全部失效。",
    tags: ["vector", "insert", "O(n)", "迭代器失效", "元素移动"],
  },
  {
    id: "csc-12",
    chapter: "cpp-sequential-containers",
    level: 2,
    question: "emplace_back 和 push_back 有什么区别？emplace 系列函数的设计动机是什么？",
    answer:
      "`push_back(val)`——先创建一个临时对象（拷贝/移动构造），再把它拷贝/移动到容器末尾。`emplace_back(args...)`——直接在容器的内存空间上**原地构造**对象。区别：push_back 需要一次构造 + 一次拷贝/移动；emplace_back 只有一次构造。以 `vector<pair<string, int>>` 为例——`v.push_back({\"foo\", 42})` 先构造临时 pair，再拷贝进 vector；`v.emplace_back(\"foo\", 42)` 直接在 vector 内存上用 \"foo\" 和 42 构造 pair——省掉一次临时对象的创建和销毁。设计动机：对于构造代价高或不可拷贝的对象（如 unique_ptr、thread），emplace 是唯一可行的添加方式。",
    tags: ["emplace_back", "push_back", "原地构造", "拷贝", "移动"],
  },
  {
    id: "csc-13",
    chapter: "cpp-sequential-containers",
    level: 2,
    question: "为什么 array 的大小必须在编译期确定？和内置数组相比，array 有什么优势？",
    answer:
      "array 的大小是模板参数的一部分——`array<int, 5>` 中 5 是编译期常量，编译器据此在栈上分配恰好 5 个 int 的空间。没有运行时大小信息（没有 size 成员变量存动态大小——size 是模板参数，编译期已知）。和内置数组 `int a[5]` 相比的优势：① 不会退化为指针——array 始终保持自己的类型，传给函数时不会丢失大小信息。② 支持容器接口——有 begin()/end()/size()/at()（带边界检查）/front()/back() 等。③ 支持赋值——`arr2 = arr1` 是逐元素拷贝（内置数组不行）。④ 可以作为值传递/返回（内置数组只能传指针）。总之 array = 内置数组的安全性 + 容器的易用性，零额外开销。",
    tags: ["array", "编译期", "栈分配", "不退化为指针", "at()"],
  },
  {
    id: "csc-14",
    chapter: "cpp-sequential-containers",
    level: 2,
    question: "为什么说 string 是「特殊的容器」？它和 vector<char> 有什么异同？",
    answer:
      "相同点：都是连续存储的字符序列，都支持 push_back、insert、erase、size、capacity 等容器操作，都是随机访问 O(1)。不同点：① string 提供专属字符串操作——substr（子串）、find/rfind（查找）、compare（比较）、append、replace 等——这些 vector<char> 都没有。② string 保证末尾有 '\\0'（C++11 起——c_str() 和 data() 都返回以 null 结尾的 C 字符串），兼容 C 接口。③ string 有 SSO（Small String Optimization）——短字符串（通常 ≤15 个字符）直接存在 string 对象内部、不分配堆内存。④ string 有 `+` 运算符（拼接）和 IO 流（>>/<<）内置支持。结论：如果处理的是「文本」用 string——如果是「动态数组」用 vector。",
    tags: ["string", "vector<char>", "c_str", "SSO", "字符串操作"],
  },

  // ── L3 应用：读代码 / 排错 ──
  {
    id: "csc-15",
    chapter: "cpp-sequential-containers",
    level: 3,
    question: "这段代码想在 vector 中删除所有偶数——它有什么问题？\n  `vector<int> v = {1,2,3,4,5,6};`\n  `for (auto it = v.begin(); it != v.end(); ++it)`\n  `    if (*it % 2 == 0) v.erase(it);`",
    answer:
      "问题：`erase(it)` 会使 it 以及之后的所有迭代器失效！调用 erase 后 it 指向了被删除位置之后的下一个有效元素——但紧接着 for 循环的 `++it` 又跳了一步——导致：① 跳过检查被删除元素之后的那个元素（偶数后面的元素被遗漏）。② 如果删除的是最后一个元素——erase 返回 v.end()——再 ++it 就越过了 end，未定义行为。正确的写法：`for (auto it = v.begin(); it != v.end(); ) { if (*it % 2 == 0) it = v.erase(it); else ++it; }`——erase 返回被删除元素后的下一个有效迭代器，只在没删除时才手动 ++it。",
    tags: ["erase", "迭代器失效", "vector", "排错", "for 循环"],
  },
  {
    id: "csc-16",
    chapter: "cpp-sequential-containers",
    level: 3,
    question: "下面代码想在 while 循环中不断 push_back——最终程序崩溃——为什么？\n  `vector<int> v;`\n  `auto it = v.begin();`\n  `for (int i = 0; i < 100; i++) v.push_back(i);`\n  `cout << *it << endl;`",
    answer:
      "`it` 在 v 为空时获取（指向 v.begin() == v.end()）。之后 v 经历多次 push_back——vector 会扩容重分配内存——it 指向的旧内存已经被释放了。最后解引用 `*it` 是「use-after-free」的未定义行为——访问已释放的内存。任何可能导致 reallocation 的操作（push_back、insert、resize 等让 size > capacity 的操作）都会使之前获取的所有迭代器、指针、引用失效。正确做法：在循环之后再获取迭代器——`auto it = v.begin()` 放在 push_back 全部完成之后。",
    tags: ["迭代器失效", "reallocation", "use-after-free", "排错"],
  },
  {
    id: "csc-17",
    chapter: "cpp-sequential-containers",
    level: 3,
    question: "使用 vector<bool> 有什么陷阱？为什么通常不推荐用 vector<bool>？",
    answer:
      "`vector<bool>` 是 C++ 标准中的一个特殊偏特化——它不是真正的 `vector<bool>`。标准要求 vector<bool> 做「位压缩」——每个 bool 只占 1 bit 内存（正常的 bool 占 1 byte）。这导致：① `v[0]` 返回的不是 `bool&`，而是一个代理对象（`vector<bool>::reference`）——不能拿 `auto &b = v[0]` 取引用，不能传 `&v[0]` 给期望 `bool*` 的函数。② 迭代器行为与普通 vector 不同——不能直接当连续 bool 数组用。③ 位操作比字节操作慢——以空间换时间，且打破了容器接口的语义一致性。推荐替代方案：① 用 `vector<char>` 或 `vector<uint8_t>` 作 bool 数组；② 用 `deque<bool>`（没有偏特化，行为正常）；③ 用 `std::bitset<N>`（编译期固定大小）。",
    tags: ["vector<bool>", "偏特化", "位压缩", "代理对象", "排错"],
  },
  {
    id: "csc-18",
    chapter: "cpp-sequential-containers",
    level: 3,
    question: "用 `v.reserve(100)` 之后，`v[50] = 42` 是正确的吗？用 `v.resize(100)` 呢？",
    answer:
      "`v.reserve(100)` 只是**预留内存**——分配了能容纳 100 个元素的空间，但没有构造任何元素。此时 `v.size()` 仍然是 0——`v[50]` 访问的是不存在的元素，属于**未定义行为**。`v.resize(100)` 不仅分配空间，还构造了 100 个元素（值初始化，int 为 0）。此时 `v.size() == 100`，`v[50] = 42` 是正确的——修改的是第 51 个已经存在的元素。记忆口诀：reserve 只改 capacity 不管 size——resize 改 size（可能同时改 capacity）。用 `v[50]` 前确认 size > 50——或者用 `v.at(50)` 让它抛异常告诉你越界了。",
    tags: ["reserve", "resize", "capacity", "size", "未定义行为"],
  },
  {
    id: "csc-19",
    chapter: "cpp-sequential-containers",
    level: 3,
    question: "在遍历 vector 的同时 push_back 元素——这段代码的行为是什么？安全吗？\n  `vector<int> v = {1,2,3};`\n  `for (int x : v) v.push_back(x * 2);`",
    answer:
      "不安全——`for (int x : v)` 的范围 for 循环在第一次迭代前就获取了 begin() 和 end() 迭代器。如果在循环中 push_back 触发扩容重分配——v 的内存被重新分配——begin()/end() 指向的旧内存被释放——循环继续使用的迭代器是悬空指针，导致未定义行为。即使没有触发扩容（capacity 足够），push_back 也会改变 end() 的位置——但范围 for 在循环开始时已经固定了 end()——所以只会遍历最初的 3 个元素（即使 v 已经变长了），不会变成无限循环。结论：**绝对不要在遍历容器的同时向同一个容器添加/删除元素**（除非你在特定位置操作并使用返回的新迭代器，如 erase 返回的迭代器）。",
    tags: ["范围for", "push_back", "迭代器失效", "未定义行为", "排错"],
  },
  {
    id: "csc-20",
    chapter: "cpp-sequential-containers",
    level: 3,
    question: "下面代码用 list 实现——为什么 list 的 insert 比 vector 的 insert 更适合这个场景？\n  在 iter 位置之前插入一个元素，且 iter 是有效的迭代器。",
    answer:
      "`list.insert(iter, val)` 只需做三件事：① 创建一个新节点，值为 val；② 修改新节点和前后节点的 prev/next 指针——把新节点「链」进链表；③ 返回指向新插入元素的迭代器。整个过程没有移动任何其他元素——时间 O(1)。`vector.insert(iter, val)` 在 iter 位置插入元素时——如果空间足够——需要把 iter 及其之后的所有元素向后移动一位，移动数量可能达到 N 个——时间 O(n)。更关键的区别是**迭代器是不会失效的**——list 插入后除了被插入位置的迭代器外，所以迭代器、指针、引用仍然有效；vector 插入后 iter 及其之后的所有迭代器全部失效。因此对于「频繁在中间插入删除」的场景——list/forward_list 是明确的正确选择。",
    tags: ["list", "vector", "insert", "迭代器失效", "O(1) vs O(n)"],
  },

  // ── L4 综合：陷阱 / 全流程 ──
  {
    id: "csc-21",
    chapter: "cpp-sequential-containers",
    level: 4,
    question: "综合题：设计一个程序——从标准输入逐行读取整数，每行一个文件（数字之间用空格分隔），把所有整数存入一个容器，然后去重并按升序输出。会选择哪种容器？给出完整实现。",
    answer:
      "选择 `vector`——后面需要排序（`list` 没有随机访问迭代器，不能直接用 `std::sort`），且一次性读入后不再增删。完整实现：\n```cpp\n#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <iterator>\nint main() {\n    std::vector<int> v;\n    int x;\n    while (std::cin >> x)\n        v.push_back(x);\n    std::sort(v.begin(), v.end());\n    auto last = std::unique(v.begin(), v.end());\n    v.erase(last, v.end());\n    for (int n : v)\n        std::cout << n << ' ';\n    std::cout << '\\n';\n    return 0;\n}\n```\n要点：① 用 vector 支持 sort（需要随机访问迭代器）② `unique` 把重复元素移到末尾并返回新的 end——配合 erase 真正删除 ③ 如果数据量已知可以 `reserve` 避免扩容。如果完全不知道数据量但极度需要中间插入/删除——选 list；如果只需要两端操作——选 deque。",
    tags: ["综合", "vector", "sort", "unique", "去重"],
  },
  {
    id: "csc-22",
    chapter: "cpp-sequential-containers",
    level: 4,
    question: "综合题：实现一个简单的「回文字符串检测器」——利用 stack 和 queue。为什么这题同时用到栈和队列？给出实现。",
    answer:
      "回文检测：一个字符串正着读和反着读一样——如 \"racecar\"。stack 是 LIFO（后进先出）——push 全部字符后再 pop 得到的是逆序。queue 是 FIFO（先进先出）——push 全部字符后再 pop 得到的是正序。把两个结果逐字符对比：每一步 stack.pop() == queue.pop() 则继续，否则不是回文。\n```cpp\n#include <stack>\n#include <queue>\n#include <string>\n#include <iostream>\nbool isPalindrome(const std::string &s) {\n    std::stack<char> st;\n    std::queue<char> q;\n    for (char c : s) {\n        st.push(c);\n        q.push(c);\n    }\n    while (!st.empty()) {\n        if (st.top() != q.front()) return false;\n        st.pop();\n        q.pop();\n    }\n    return true;\n}\nint main() {\n    std::cout << isPalindrome(\"racecar\") << '\\n';  // 1 (true)\n    std::cout << isPalindrome(\"hello\") << '\\n';    // 0 (false)\n    return 0;\n}\n```\n关键是利用 stack 的 LIFO 特性自然产生「逆序」、queue 的 FIFO 特性保留「正序」——适配器把底层 deque 包装成正好对立的访问模式。",
    tags: ["综合", "stack", "queue", "回文", "LIFO", "FIFO"],
  },
  {
    id: "csc-23",
    chapter: "cpp-sequential-containers",
    level: 4,
    question: "综合题：在 vector 中使用 emplace_back 构造 `pair<const string, unique_ptr<int>>` 是可能的吗？push_back 呢？解释为什么并给出代码。",
    answer:
      "push_back 不可行——它需要创建一个临时对象再拷贝/移动进 vector。临时对象的拷贝构造被禁止（`unique_ptr` 不可拷贝），移动操作也不是 push_back 会选择的路径（除非你用 `std::move`）。emplace_back 可行——它在 vector 内部直接原地构造 pair 和 unique_ptr——没有临时对象，没有拷贝，没有移动。\n```cpp\n#include <vector>\n#include <string>\n#include <memory>\n#include <utility>\nint main() {\n    std::vector<std::pair<const std::string, std::unique_ptr<int>>> v;\n    // emplace_back: 直接原地构造\n    v.emplace_back(\"key1\", std::make_unique<int>(42));\n    v.emplace_back(\"key2\", std::make_unique<int>(100));\n    // push_back: 下面这行编译失败 — unique_ptr 不可拷贝\n    // v.push_back({\"key3\", std::make_unique<int>(7)});\n    // 但可以显式 move：\n    auto p = std::make_unique<int>(7);\n    v.push_back({\"key3\", std::move(p)});  // OK — 移动构造\n    return 0;\n}\n```\n核心教训：对不可拷贝的类型（unique_ptr、thread、mutex 等）——emplace 系列函数是必需品，不是可选项。",
    tags: ["综合", "emplace_back", "unique_ptr", "不可拷贝", "原地构造"],
  },
  {
    id: "csc-24",
    chapter: "cpp-sequential-containers",
    level: 4,
    question: "综合题：一个程序用 vector 存储了 100000 个 string，不断在开头和中间随机位置插入新的 string。运行两周后变得极慢——为什么？怎么优化？",
    answer:
      "根因——vector 的插入：① 在开头 insert——所有 100000 个元素都要向后移一位（100000 次移动）。② 在中间 insert——大约半边元素要移动（50000 次移动）。③ 连续运行两周——push_back 触发的扩容累积拷贝次数已经巨大——每次扩容全量拷贝。每次 insert 都是 O(n)——N 次随机位置插入的总开销是 O(N²)——随数据增长呈平方级变慢。优化方案：① 立即换成 `list`——任意位置插入 O(1)，只改几个指针——两周的数据量下仍然实时快速。② 如果不能放弃随机访问——考虑「分块策略」——把 vector 分成多个小块（类似 deque 的实现），或者手动维护 vector<vector<string>>——小块内插入只移动小块内的元素。③ 使用 `deque`——如果主要在两端插入，deque 的两端 O(1) + 随机访问 O(1) 是更好的选择。教训：选容器前先分析「最频繁的操作是什么」。",
    tags: ["综合", "vector", "list", "O(n²)", "性能", "选型"],
  },
  {
    id: "csc-25",
    chapter: "cpp-sequential-containers",
    level: 4,
    question: "综合题：实现一个简单的「任务调度器」——使用 priority_queue。任务有优先级（int，数字越大优先级越高）和描述（string）。每次取出优先级最高的任务执行。给出完整实现并解释为什么选 priority_queue 而不是 list + 每次手动 sort。",
    answer:
      "priority_queue 内部用堆维护——push（入队）O(log n)，pop（出队）O(log n)，top（看最高优先级）O(1)。如果用 list + 每次 sort——每次 push 后 sort 是 O(n log n)，比 priority_queue 慢得多。\n```cpp\n#include <queue>\n#include <string>\n#include <iostream>\nstruct Task {\n    int priority;\n    std::string desc;\n    bool operator<(const Task &o) const {\n        return priority < o.priority;  // 数值大的优先级高\n    }\n};\nint main() {\n    std::priority_queue<Task> pq;\n    pq.push({1, \"写日志\"});\n    pq.push({5, \"紧急修复\"});\n    pq.push({3, \"代码审查\"});\n    pq.push({5, \"回滚部署\"});  // 同优先级——先进先出不保证\n    while (!pq.empty()) {\n        auto t = pq.top();\n        std::cout << \"[\" << t.priority << \"] \" << t.desc << '\\n';\n        pq.pop();\n    }\n    return 0;\n}\n```\n输出最高优先级 5 的先出来。要点：① priority_queue 默认大顶堆（`operator<` 大的在顶）——② `operator<` 的语义是「优先级低的 < 优先级高的」——③ 如果需要最小堆用 `std::greater` 或者反转 operator< 的返回值。",
    tags: ["综合", "priority_queue", "堆", "任务调度", "operator<"],
  },
];

export default cppSequentialContainersQuestions;
