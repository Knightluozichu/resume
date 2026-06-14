/** 复习题库 · C++ 关联容器（cpp-associative-containers）。C++ Primer §11 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cppAssociativeContainersQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "cac-1",
    chapter: "cpp-associative-containers" as any,
    level: 1,
    question: "C++ 标准库提供了哪八种关联容器？它们分为哪两大阵营？",
    answer:
      "八大关联容器分为两大阵营：① **有序关联容器**（底层红黑树）——`map`（key→value，key不可重复）、`set`（只存key，不可重复）、`multimap`（key→value，key可重复）、`multiset`（只存key，可重复）。② **无序关联容器**（底层哈希表）——`unordered_map`（key→value，不可重复）、`unordered_set`（只存key，不可重复）、`unordered_multimap`（key→value，可重复）、`unordered_multiset`（只存key，可重复）。有序容器按key排序（O(log n)操作），无序容器使用哈希（均摊O(1)操作）。",
    tags: ["map", "set", "multimap", "multiset", "unordered_map", "unordered_set", "红黑树", "哈希表"],
  },
  {
    id: "cac-2",
    chapter: "cpp-associative-containers" as any,
    level: 1,
    question: "map 和 set 的核心区别是什么？什么时候用 set 而不是 map？",
    answer:
      "`map` 存储 key→value 键值对——每个 key 关联一个 value。`set` 只存储 key——没有关联值。用 set 的场景：你只关心「某个 key 是否存在」或「维护一个不重复的集合」——比如记录所有访问过的 IP 地址、维护白名单、去重。用 map 的场景：需要通过 key 快速查找对应的 value——比如按名字查电话号码、按 id 查学生成绩。一句话：set = 去重的集合；map = 字典/关联数组。",
    tags: ["map", "set", "键值对", "去重", "字典"],
  },
  {
    id: "cac-3",
    chapter: "cpp-associative-containers" as any,
    level: 1,
    question: "pair 类型是什么？如何创建和访问 pair？map 的 value_type 是什么？",
    answer:
      "`pair<T1, T2>` 是一个保存两个值（first 和 second）的简单结构，定义在 `<utility>` 头文件中。创建方法：① `pair<int, string> p(42, \"hello\");` ② `auto p = make_pair(42, \"hello\");` ③ C++11 列表初始化 `pair<int, string> p = {42, \"hello\"};`。访问——`p.first` 取第一个元素，`p.second` 取第二个元素。pair 支持比较——先比较 first，first 相等再比较 second。**map 的 value_type 是 `pair<const Key, T>`**——key 部分是 const 的，不能修改（因为修改 key 会破坏红黑树的排序）。",
    tags: ["pair", "make_pair", "first", "second", "value_type"],
  },
  {
    id: "cac-4",
    chapter: "cpp-associative-containers" as any,
    level: 1,
    question: "map 的 operator[] 和 at() 有什么区别？各自在 key 不存在时的行为是什么？",
    answer:
      "`m[k]`——若 k 存在，返回对应的 value 引用；若 k 不存在，**自动插入一个以 k 为 key、value 为默认值的新元素**，然后返回这个默认值的引用。这是 map 独有的「查找+插入」复合操作。`m.at(k)`——若 k 存在，返回 value 引用；若 k 不存在，**抛出 `std::out_of_range` 异常**。关键区别：`[]` 有副作用（可能意外插入元素），`at()` 严格只读。set 和 multimap 都没有 `[]`（set 没有 value，multimap 一个 key 对应多个 value 没有唯一答案）。查找时——只读操作优先用 `find()`，避免 `[]` 的隐式插入副作用。",
    tags: ["operator[]", "at", "插入副作用", "out_of_range", "find"],
  },
  {
    id: "cac-5",
    chapter: "cpp-associative-containers" as any,
    level: 1,
    question: "什么是关联容器？关联容器和顺序容器最核心的区别是什么？",
    answer:
      "关联容器——元素按 key（键）来存取和排序——你通过 key 而不是位置来查找元素。顺序容器——元素按你插入的顺序排列——第 i 个元素就是你第 i 个插入的。核心区别有三：① 访问方式——关联容器通过 key 访问（如 `m[\"name\"]`），顺序容器通过位置访问（如 `v[5]`）。② 元素顺序——有序关联容器自动按 key 排序，无序关联容器按哈希值分桶；顺序容器按插入顺序排列。③ 底层结构——有序关联容器底层是红黑树（O(log n)），无序关联容器底层是哈希表（均摊 O(1)）；顺序容器底层是数组或链表。",
    tags: ["关联容器", "顺序容器", "key", "红黑树", "哈希表"],
  },
  {
    id: "cac-6",
    chapter: "cpp-associative-containers" as any,
    level: 1,
    question: "multimap 和 map 的核心区别是什么？multimap 为什么没有 operator[]？",
    answer:
      "`map`——每个 key 唯一，一个 key 最多对应一个 value。`multimap`——允许同一个 key 出现多次，一个 key 可以对应多个 value。multimap 没有 `operator[]` 的原因：如果 `m[k]` 在 k 存在时有多个值——应该返回哪一个？没有唯一答案。同样，multimap 也没有 `at()`。在 multimap 中查找某个 key 的所有值——用 `equal_range(k)` 返回一对迭代器 `[first, second)` 涵盖该 key 的所有元素，或者用 `lower_bound(k)` + `upper_bound(k)` 手动构造范围。",
    tags: ["multimap", "operator[]", "equal_range", "lower_bound", "重复key"],
  },
  {
    id: "cac-7",
    chapter: "cpp-associative-containers" as any,
    level: 1,
    question: "insert 操作在关联容器中返回什么？如何判断插入是否成功？",
    answer:
      "对于 `map` / `set`（唯一 key 的容器），`insert` 返回一个 `pair<iterator, bool>`：① `iterator` 指向元素——如果插入成功则指向新插入的元素，如果 key 已存在则指向已有元素；② `bool` 指示插入是否成功——true 表示新插入了，false 表示 key 已存在（插入被忽略）。用法 `auto ret = m.insert({k, v}); if (ret.second) { /* 插入成功 */ }`。对于 `multimap` / `multiset`（允许重复 key），insert 只返回指向新插入元素的 iterator（总是成功插入）。",
    tags: ["insert", "pair<iterator,bool>", "插入成功", "重复key"],
  },
  {
    id: "cac-8",
    chapter: "cpp-associative-containers" as any,
    level: 1,
    question: "unordered_map 的 bucket_count、load_factor、max_load_factor 和 rehash 分别是什么？",
    answer:
      "`bucket_count()`——当前桶的数量（正在使用的桶）。`load_factor()`——负载因子 = `size() / bucket_count()`，衡量每个桶平均装了多少元素。`max_load_factor()`——最大负载因子阈值（默认约为 1.0），当实际负载因子超过它时自动触发 rehash。`rehash(n)`——手动指定新桶数 n（n > 当前 bucket_count）——重新分配桶数组，把所有元素重新散列到新桶中（O(n) 开销）。`reserve(n)`——预分配足够桶数以容纳 n 个元素而不用 rehash（相当于确保 bucket_count ≥ n / max_load_factor）。",
    tags: ["bucket_count", "load_factor", "rehash", "reserve", "哈希表"],
  },
  {
    id: "cac-9",
    chapter: "cpp-associative-containers" as any,
    level: 1,
    question: "关联容器支持哪些类型的 key？key 类型需要满足什么要求？",
    answer:
      "**有序关联容器**：key 类型必须定义 `<` 运算符（严格弱序），或者在构造时提供自定义比较函数。默认使用 `std::less<Key>`，即 `a < b`。自定义比较——`set<Key, MyCmp>` 或 `map<Key, T, MyCmp>`。用于排序的 key 部分在元素中是 const 的（不能通过迭代器修改 key）。**无序关联容器**：key 类型必须提供哈希函数（`hash<Key>`）和相等比较（`==`）。标准库已为内置类型、string、智能指针提供了默认哈希；自定义类型需要特化 `std::hash` 或在构造时提供自定义 hasher + equality。",
    tags: ["key类型", "比较函数", "严格弱序", "hash函数", "operator<"],
  },

  // ── L2 理解：为什么 / 机制 ──
  {
    id: "cac-10",
    chapter: "cpp-associative-containers" as any,
    level: 2,
    question: "为什么有序关联容器使用红黑树而不是普通的二叉搜索树？红黑树保证什么？",
    answer:
      "普通二叉搜索树（BST）的最坏情况——如果你按升序插入 1,2,3,4,5——就会退化成一条链（链表），查找时间从 O(log n) 变成 O(n)。红黑树是**自平衡二叉搜索树**——每次插入/删除后通过旋转和重新着色维持树的平衡，保证树的高度始终是 O(log n)。结果——所有操作（插入/删除/查找）的最坏情况都是 O(log n)。红黑树的代价：每个节点多存一个颜色位和旋转/重新着色的时间——但这个开销远小于退化成链表的代价。C++ 标准要求有序关联容器用红黑树（或等价的平衡树）实现。",
    tags: ["红黑树", "二叉搜索树", "自平衡", "O(log n)", "最坏情况"],
  },
  {
    id: "cac-11",
    chapter: "cpp-associative-containers" as any,
    level: 2,
    question: "有序关联容器（红黑树 O(log n)）vs 无序关联容器（哈希表均摊 O(1)）——真的总是哈希表更快吗？什么时候应该选有序容器？",
    answer:
      "不总是更快——尽管哈希表均摊 O(1)，但有代价：① **哈希函数开销**——计算 hash(key) 本身需要时间——对短 key（int/string）很快，但复杂 key 可能代价很高。② **最坏情况 O(n)**——如果哈希函数质量差或恶意构造输入——所有 key 落同一桶——退化成链表 O(n)。③ **内存开销**——哈希表的桶数组 + 节点内存比红黑树通常更多。④ **无序遍历**——遍历 unordered_map 得到的是乱序——如果你需要按键排序输出——必须额外 sort（O(n log n)）——总代价反超有序容器。**选有序容器的场景**：① 需要按键遍历输出、② key 的哈希函数很难写、③ 数据量不太大（O(log n) 和 O(1) 的实际差距很小）、④ 需要 lower_bound/upper_bound 范围查询。",
    tags: ["哈希表", "红黑树", "O(log n)", "O(1)", "选型", "最坏情况"],
  },
  {
    id: "cac-12",
    chapter: "cpp-associative-containers" as any,
    level: 2,
    question: "为什么 map 的 key 部分是 const 的？如果强行修改 key 会怎样？",
    answer:
      "`map<Key, T>` 的 value_type 是 `pair<const Key, T>`——key 部分是 const。原因：有序容器依赖 key 来维持红黑树的排序——如果你修改 key 但没有同时调整它在树中的位置——树结构被破坏——后续查找/插入行为未定义。尝试 `it->first = newKey` 编译报错（const 不可修改）。那如果确实需要改 key 怎么做？只有一条路——**erase 旧元素 + insert 新元素**：`auto node = m.extract(it); node.key() = newKey; m.insert(move(node));`（C++17 的 extract，避免拷贝 value）。或者手动 `auto v = m[k_old]; m.erase(k_old); m[k_new] = v;`。",
    tags: ["const key", "红黑树", "extract", "erase+insert", "修改key"],
  },
  {
    id: "cac-13",
    chapter: "cpp-associative-containers" as any,
    level: 2,
    question: "equal_range、lower_bound、upper_bound 的区别是什么？分别在 multimap 中如何使用？",
    answer:
      "`lower_bound(k)`——返回第一个 key ≥ k 的元素的迭代器。`upper_bound(k)`——返回第一个 key > k 的元素的迭代器。`equal_range(k)`——返回 `pair<iterator, iterator>` = `{lower_bound(k), upper_bound(k)}`，恰好涵盖所有 key == k 的元素范围。在 multimap 中遍历某个 key 的所有值——`auto [begin, end] = m.equal_range(k); for (auto it = begin; it != end; ++it) cout << it->second;`。等价于 `for (auto it = m.lower_bound(k); it != m.upper_bound(k); ++it) ...`。如果 key 不存在——三个函数都返回应该插入该 key 的位置（lower_bound == upper_bound 且 equal_range 返回空范围）。",
    tags: ["equal_range", "lower_bound", "upper_bound", "multimap", "范围查询"],
  },
  {
    id: "cac-14",
    chapter: "cpp-associative-containers" as any,
    level: 2,
    question: "什么是哈希冲突（hash collision）？C++ 的 unordered_map 如何解决哈希冲突？",
    answer:
      "哈希冲突——两个不同的 key，经过哈希函数计算后得到相同的桶号——它们落入同一个桶。C++ 无序容器使用**拉链法（chaining）**解决冲突：每个桶是一个链表（或类似结构）——同一个桶内的所有元素串在这个链表上。查找 key 时——先 hash(key) 得到桶号 → 在桶的链表上逐个遍历，用 `==` 比较 key 直到找到或走到 nullptr。在哈希函数均匀、负载因子适当的理想情况下，链表平均长度 ≈ 负载因子（默认 ~1.0）——平均只需 1-2 次比较——所以「均摊 O(1)」。当负载因子超过 max_load_factor() 时自动 rehash——增加桶数、重新散列所有元素，降低链表长度。",
    tags: ["哈希冲突", "拉链法", "chaining", "负载因子", "rehash"],
  },

  // ── L3 应用：读代码 / 排错 ──
  {
    id: "cac-15",
    chapter: "cpp-associative-containers" as any,
    level: 3,
    question: "这段代码在 map 中统计单词出现次数——找出潜在的 bug 或改进点：\n  `map<string, int> word_count;`\n  `string word;`\n  `while (cin >> word)`\n  `    word_count[word] = word_count[word] + 1;`",
    answer:
      "这段代码本身**功能正确**——但有一个效率小问题：`word_count[word]` 被调用了两次。第一次 `word_count[word]` 在赋值右侧——如果 word 不存在，`[]` 会插入 {word, 0}（int 默认值为 0）；第二次 `word_count[word]` 在赋值左侧——这时 word 一定存在了。两次 `[]` 意味着两次哈希/树查找。更高效的写法——`++word_count[word];`：一次 `[]` + 一次 `++`，且更简洁。如果想完全避免 `[]` 的副作用——用 insert：`auto ret = word_count.insert({word, 1}); if (!ret.second) ++ret.first->second;`——但通常 `++word_count[word]` 就足够好了。",
    tags: ["operator[]", "insert", "统计", "map", "优化"],
  },
  {
    id: "cac-16",
    chapter: "cpp-associative-containers" as any,
    level: 3,
    question: "这段代码用 unordered_map——它可能有什么潜在问题？\n  `unordered_map<string, int> m;`\n  `m.reserve(1024);`\n  `for (int i = 0; i < 1000000; i++) m[to_string(i)] = i;`",
    answer:
      "问题：`reserve(1024)` 分配了 1024 个桶——但循环插入了 100 万个元素。负载因子 = 1000000 / 1024 ≈ 976——远超默认 max_load_factor(1.0)。实际运行时 unordered_map 会在插入过程中自动多次 rehash（重新分配桶）——每次 rehash 把所有已有元素重新散列——累积开销巨大。改进：① `m.reserve(1000000)`——预分配至少容纳 100 万个元素的桶数；② 如果确切知道会插入多少——`m.rehash(ceil(1000000 / m.max_load_factor()))` 手动设桶数。结论——reserve/rehash 只在你知道大概元素数量时才有效——否则让容器自己管理扩容。",
    tags: ["reserve", "rehash", "负载因子", "性能", "哈希表"],
  },
  {
    id: "cac-17",
    chapter: "cpp-associative-containers" as any,
    level: 3,
    question: "下面的代码用 set 存储自定义类型——编译失败在哪里？\n  `struct Point { int x, y; };`\n  `set<Point> s;`\n  `s.insert({1, 2});`",
    answer:
      "编译失败——`Point` 没有定义 `operator<`。`set<Point>` 默认使用 `std::less<Point>` 来比较元素——它调用 `a < b`——但 `Point` 没有定义 `operator<`，所以编译报错。修正三种方法：① 为 Point 定义 `bool operator<(const Point &o) const { return x < o.x || (x == o.x && y < o.y); }`——必须满足**严格弱序**（严格弱序要求：非自反、非对称、传递、等价的传递性）；② 提供自定义比较函数——`set<Point, decltype([](const Point &a, const Point &b) { return tie(a.x, a.y) < tie(b.x, b.y); })> s;`；③ 如果不需要有序——用 `unordered_set<Point>`——但需要为 Point 定义 hash 函数。",
    tags: ["operator<", "严格弱序", "set", "自定义比较", "编译错误"],
  },
  {
    id: "cac-18",
    chapter: "cpp-associative-containers" as any,
    level: 3,
    question: "range-based for 遍历 map 时 `for (auto &p : m)` 得到的 pair 的 key 是 const 的——为什么？如果试图 `p.first = newKey` 会怎样？正确的遍历写法是什么？",
    answer:
      "`for (auto &p : m)` 得到 `pair<const Key, T>&`——key 是 const。因为有序关联容器用 key 排序——修改 key 但不调整树结构→破坏树。编译报错。正确遍历写法：① 只读——`for (const auto &p : m) cout << p.first << p.second;`；② C++17 结构化绑定——`for (const auto &[key, val] : m) cout << key << val;`（最推荐——清楚表达 key 是 const）。③ 需要修改 key — 不能就地改，必须 erase + insert（或用 C++17 extract）。map 不提供非 const 的 key 访问——这是设计保证，不是 bug。",
    tags: ["range-based for", "const key", "结构化绑定", "遍历", "修改key"],
  },
  {
    id: "cac-19",
    chapter: "cpp-associative-containers" as any,
    level: 3,
    question: "在 map 中边遍历边 erase——下面代码有什么问题？如何修正？\n  `map<int, int> m = {{1,10}, {2,20}, {3,30}};`\n  `for (auto it = m.begin(); it != m.end(); ++it)`\n  `    if (it->second > 15) m.erase(it);`",
    answer:
      "问题：`m.erase(it)` 使 `it` 失效——紧接着 `++it` 在失效迭代器上操作——**未定义行为**。这与 vector 不同——在 map 中 erase 只使被删元素的迭代器失效——但这也够了——for 循环仍然会在失效的 it 上执行 `++it`。修正：`for (auto it = m.begin(); it != m.end(); ) { if (it->second > 15) it = m.erase(it); else ++it; }`。C++11 起 `erase(it)` 返回被删除元素的下一个有效迭代器。另一个写法——就地组合：`m.erase(it++)`（先 ++ 返回旧 it 给 erase，但这是未定义行为因为编译器对参数的求值顺序不确定的——避免用这种取巧手法，用 erase 返回值或 erase(++it, original) 安全写法）。",
    tags: ["erase", "迭代器失效", "map", "遍历删除", "未定义行为"],
  },
  {
    id: "cac-20",
    chapter: "cpp-associative-containers" as any,
    level: 3,
    question: "下面用 unordered_set 想检查元素是否存在——有什么更高效的写法？\n  `unordered_set<int> s = {...};`\n  `if (s.count(x) > 0) { /* 存在 */ }`",
    answer:
      "功能正确——但 `count` 会遍历该桶的所有元素（即使找到第一个匹配后可能继续数）。对 set/unordered_set（唯一 key），`count` 返回值只能是 0 或 1——用 `count` 只是语义上没错，但现在 C++20 引入了更直观的 `contains`：`if (s.contains(x)) { /* 存在 */ }`。C++20 之前的替代——`if (s.find(x) != s.end()) { /* 存在 */ }`。`find` 和 `contains` 都只查找是否存在、不在找到后继续——效率一致。`count` 的优势在于 multimap/multiset——这时它确实能返回某个 key 的出现次数（>1 可能）。总结——检查存在：C++20 用 `contains`，C++17 及以前用 `find`。",
    tags: ["contains", "count", "find", "unordered_set", "C++20"],
  },

  // ── L4 综合：陷阱 / 全流程 ──
  {
    id: "cac-21",
    chapter: "cpp-associative-containers" as any,
    level: 4,
    question: "综合题：设计一个程序——统计一段文本中每个单词的出现次数，然后找出出现次数最多的那个单词。选择合适的容器并给出完整实现。",
    answer:
      "用 `unordered_map<string, int>` 统计（均摊 O(1) 插入），用 `map<string, int>` 也可以（O(log n)）。找最大——不需要有序，一个 max_element 扫一遍 O(n) 就行。完整实现：\n```cpp\n#include <iostream>\n#include <unordered_map>\n#include <string>\n#include <sstream>\n#include <algorithm>\nint main() {\n    std::unordered_map<std::string, int> cnt;\n    std::string word;\n    while (std::cin >> word)\n        ++cnt[word];\n    auto max_it = std::max_element(cnt.begin(), cnt.end(),\n        [](const auto &a, const auto &b) {\n            return a.second < b.second;\n        });\n    if (max_it != cnt.end())\n        std::cout << max_it->first << \": \" << max_it->second << '\\n';\n    return 0;\n}\n```\n选择 unordered_map 的原因——不需要有序输出单词，只需要最快插入速度。如果最后要按字母序输出所有单词及次数——改用 map（遍历自然有序）。",
    tags: ["综合", "unordered_map", "统计", "max_element", "单词计数"],
  },
  {
    id: "cac-22",
    chapter: "cpp-associative-containers" as any,
    level: 4,
    question: "综合题：实现一个「学生选课系统」——一个学生可以有多个课程，一个课程也有多个学生。给出合理的容器选择并实现。如果用 multimap 能否满足需求？",
    answer:
      "两个方向的查询——学生→课程 + 课程→学生。两个 multimap 可以做到：`multimap<string, string> stu_to_course;` 和 `multimap<string, string> course_to_stu;`。但 multimap 的 find 只能返回第一个匹配——一个学生有多个课程需要用 equal_range。\n```cpp\n#include <map>\n#include <iostream>\n#include <string>\nint main() {\n    std::multimap<std::string, std::string> stu_to_course;\n    // Alice 选了 Math 和 CS\n    stu_to_course.insert({\"Alice\", \"Math\"});\n    stu_to_course.insert({\"Alice\", \"CS\"});\n    stu_to_course.insert({\"Bob\", \"CS\"});\n    // 查询 Alice 的所有课程\n    auto [b, e] = stu_to_course.equal_range(\"Alice\");\n    for (auto it = b; it != e; ++it)\n        std::cout << it->second << ' ';\n    return 0;\n}\n```\n或者用 `map<string, set<string>>`（更常用）：key 是学生，value 是课程集合。两种方案各有利弊：multimap 每个元素是独立键值对（内存更灵活）、map+set 查询一个学生的课程更快（一次 find + 遍历 set）、且用 count 可以立刻得知学生有多少门课。",
    tags: ["综合", "multimap", "equal_range", "选课", "一对多"],
  },
  {
    id: "cac-23",
    chapter: "cpp-associative-containers" as any,
    level: 4,
    question: "综合题：你需要存储 1000 万个键值对（key=string，value=int），对每个操作做 100 万次查找。测试发现 unordered_map 首次运行慢得离谱——为什么？怎么优化？",
    answer:
      "可能原因：① **没有预分配桶**——`unordered_map` 默认初始桶数很少（通常 8-16 个）——插入 1000 万个元素时会触发多次 rehash——每次 rehash 拷贝所有已有元素——累积 O(n²) 级别开销。② **string 的哈希开销**——1 千万次 `hash(string)` 本身的时间不可忽略。③ **负载因子太保守或太高**——max_load_factor 默认 1.0——如果 key 分布不均导致某些桶很长——退化为 O(n)。优化方案：① `m.reserve(10000000)`（插入前预分配）或 `m.rehash(ceil(10000000 / m.max_load_factor()))`——一次分配到位，消除所有 rehash。② 如果 string key 已知长度范围——可以考虑用定长 char 数组或 `string_view`（减少内存分配）。③ 提供自定义哈希函数——如果 key 有特殊分布可以设计更均匀的哈希。④ 如果内存不是问题——调低 max_load_factor（如 0.5）——用更多桶换取更快的冲突解决。",
    tags: ["综合", "性能", "rehash", "reserve", "大容量"],
  },
  {
    id: "cac-24",
    chapter: "cpp-associative-containers" as any,
    level: 4,
    question: "综合题：一个程序同时需要「按插入顺序遍历」和「按 key 快速查找」——用一个 set/map 和 vector 分别维护能做到吗？给出方案。",
    answer:
      "一种经典方案——**双容器索引**：① `map<string, int> index`——负责 key→value 的 O(log n) 查找；② `vector<string> order`——只存 key，维护插入顺序便于遍历。插入时——同时在 map 和 vector 中操作。遍历时——遍历 vector，用 map[index] 取 value。代价：每个元素存了两次 key（内存多一份）、操作需要两次查找/插入。也可以用 `boost::multi_index_container` 实现——一个容器同时维护多个索引。对于简单场景——**用 unordered_map + vector 足够**。核心取舍——时间和空间的权衡——没有免费午餐。",
    tags: ["综合", "双容器索引", "插入顺序", "map", "vector"],
  },
  {
    id: "cac-25",
    chapter: "cpp-associative-containers" as any,
    level: 4,
    question: "综合题：用 set 存储降序排列的整数——默认 set 是升序的。你怎么让 set 变成降序？给出代码并解释比较器必须满足什么条件？",
    answer:
      "`set<int, greater<int>> s` 或 `set<int, decltype([](int a, int b) { return a > b; })> s;`。比较器必须满足**严格弱序**（strict weak ordering）：① 非自反——`comp(a, a)` 必须 false；② 非对称——如果 `comp(a, b)` 为 true，则 `comp(b, a)` 必须 false；③ 传递——如果 `comp(a, b)` 和 `comp(b, c)` 都为 true，则 `comp(a, c)` 也为 true；④ 等价的传递——如果 a 与 b 等价（即 `!comp(a,b) && !comp(b,a)`），b 与 c 等价，则 a 与 c 等价。代码：\n```cpp\n#include <set>\n#include <iostream>\nint main() {\n    std::set<int, std::greater<int>> s = {1, 5, 3, 2, 4};\n    for (int x : s) std::cout << x << ' ';  // 5 4 3 2 1\n    return 0;\n}\n```\n注意——用 `>` 而不是 `>=` ——如果用 `>=` 会破坏非对称性（`a>=b && b>=a` 为 true 但 a 与 b 不是同一个元素）——导致未定义行为。",
    tags: ["综合", "set", "比较器", "严格弱序", "greater", "降序"],
  },
];

export default cppAssociativeContainersQuestions;
