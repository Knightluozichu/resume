import type { ReviewQuestion } from "./types";

/** C++ 编程测试秘籍 · 总复习复习题 */
export const ctrFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "ctr-final-review-1",
    chapter: "ctr-final-review",
    level: 1,
    question: "用一张思维导图复述《C++ 编程测试秘籍》三大板块及各自的关键考点。",
    answer:
      "思维导图中心「C++ 编程测试秘籍」，三大分支辐射：\n\n1. 基础测试（accent 紫）：\n   - 基础语法：未定义行为（有符号溢出、未初始化、空指针解引用）、const 正确性（const 成员函数、mutable）、四种类型转换（static/const/reinterpret/dynamic_cast）。\n   - 内存管理：智能指针四件套（unique/shared/weak/auto_ptr）、new/delete 与 new[]/delete[] 配对、循环引用与 weak_ptr 修复、Rule of Five、make_shared 取舍。\n\n2. 进阶测试（success 绿）：\n   - STL：容器分类（顺序/关联/无序/适配器）与底层、迭代器失效（vector 扩容/erase、list 局部失效）、容器选择（deque 头部 O(1)、map 有序、unordered_map 哈希）、复杂度分析。\n   - 模板：函数/类模板与实例化、类型推导三情形与万能引用、SFINAE 与 enable_if、模板元编程与现代 constexpr 替代。\n   - 并发：线程安全与 const、死锁四条件与 scoped_lock、原子与内存序（relaxed/release-acquire/seq_cst）、DCLP 与 Meyers/call_once。\n\n3. 面试实战（warning 暖）：\n   - 设计模式：GoF 三类、单例（Meyers/call_once）、工厂方法 vs 抽象工厂、观察者（weak_ptr 防悬空）。\n   - 算法：排序复杂度与稳定性、二分查找（溢出修正、lower/upper_bound）、BFS/DFS、Top-K 与滑动窗口。\n   - 调试优化：GDB、Valgrind/ASan/UBSan/TSan、采样 vs 插桩、先测后优、Release 偶发崩溃排查。\n\n记忆线索：基础筑底（语法+内存）→ 进阶强骨（STL+模板+并发）→ 面试冲刺（模式+算法+调试）。",
    tags: ["总复习", "思维导图", "三大板块", "全书结构"],
  },
  {
    id: "ctr-final-review-2",
    chapter: "ctr-final-review",
    level: 2,
    question: "全书哪些章节存在跨章节联系？请说明「内存管理」如何贯穿 STL、模板、并发三章，「未定义行为」如何贯穿全书。",
    answer:
      "全书跨章节联系紧密，核心知识在多章复现并深化：\n\n内存管理贯穿 STL/模板/并发三章：\n1. 与 STL：STL 容器本身管理动态内存，理解 vector 扩容（搬家、迭代器失效）、容器存智能指针（vector<shared_ptr<T>>）都依赖内存管理章的智能指针与对象生命周期知识。容器元素的移动/拷贝语义（push_back 触发移动还是拷贝）直接关系到 Rule of Five 与 noexcept 移动。\n2. 与模板：模板常用于实现通用容器与智能指针（unique_ptr 是模板），模板的实例化与对象生命周期（如函数返回临时对象的移动）依赖内存语义。make_shared 的控制块与对象同块分配是模板+内存的结合。\n3. 与并发：shared_ptr 的引用计数是原子的（控制块用原子操作），理解并发章的原子操作能看懂 shared_ptr 为何线程安全的引用计数却「指向对象」的读写需额外同步。call_once 与 Meyers 单例的线程安全初始化也是内存模型的应用。\n\n未定义行为贯穿全书：\n1. 基础章：UB 是核心考点本身（有符号溢出、未初始化、空指针解引用、修改 const 对象）。\n2. STL 章：使用失效迭代器是 UB；new[] 配 delete 是 UB；范围 for 里 push_back 扩容后用失效迭代器是 UB。\n3. 模板章：违反严格别名、模板实例化中的 UB 被优化放大。\n4. 并发章：数据竞争（无同步的并发读写）是 UB；DCLP 在 C++11 前的 bug 本质是 UB。\n5. 调试章：Release 偶发崩溃的根因大半是「被优化放大的 UB」，ASan/UBSan 就是抓 UB 的工具。\n\n启示：UB 与内存是两条贯穿全书的主线，前者是「标准放弃描述」的陷阱，后者是「资源正确释放」的底线，两者在每章以不同面目出现，复习时要把它们串成网而非孤立记忆。",
    tags: ["跨章节联系", "内存管理", "未定义行为", "主线"],
  },
  {
    id: "ctr-final-review-3",
    chapter: "ctr-final-review",
    level: 3,
    question: "综合题：设计一个线程安全的 LRU 缓存（C++），要求用到 STL、智能指针、并发、并说明如何用 sanitizer 与单元测试验证正确性。涉及全书哪些章节？",
    answer:
      "线程安全 LRU 缓存的 C++ 设计要点：\n\n数据结构（STL 章 + 内存章）：\n- 用 `std::list<std::pair<K,V>>` 维护访问顺序（链表头最近使用、尾最久未用），list 的 splice 操作 O(1) 把节点移到头部，不失效其他迭代器。\n- 用 `std::unordered_map<K, list::iterator>` 做 O(1) 查找，键映射到链表节点迭代器。\n- 组合实现 get/put 均 O(1)。\n\n智能指针（内存章）：\n- 若 value 是大对象或需共享，存 `std::shared_ptr<V>`；缓存本身用 unique_ptr 或直接成员管理 list 与 map。\n- 注意 unordered_map 存 list 迭代器，list 节点在 splice 时不失效，保证 map 指向有效。\n\n并发（并发章）：\n- 用 `std::shared_mutex` 读写锁：get 用 shared_lock（多读并发），put 用 unique_lock（独占写）。\n- 或简单用 std::mutex 统一加锁，读写都互斥，性能稍差但简单。\n- 锁粒度：整个缓存一把锁（简单），或分片锁（高并发优化）。注意 put 时若触发淘汰（erase 链表尾 + map 项），整个操作要在同一把写锁内，保证原子。\n- 若用 shared_ptr 存 value，注意 shared_ptr 引用计数的原子性只保证计数安全，不保证「指向对象的并发读写」安全——value 自身的线程安全要 value 自己保证。\n\n关键代码骨架：\n```cpp\ntemplate<typename K, typename V>\nclass LRUCache {\n  size_t cap;\n  std::list<std::pair<K,V>> order;            // 头=最近\n  std::unordered_map<K, typename std::list<std::pair<K,V>>::iterator> pos;\n  mutable std::shared_mutex m;\npublic:\n  std::optional<V> get(const K& key) {\n    std::shared_lock lk(m);\n    auto it = pos.find(key);\n    if (it == pos.end()) return std::nullopt;\n    // 注意：shared_lock 下移动链表节点需升级为写锁，这里简化为 get 不改顺序或用写锁\n    return it->second->second;\n  }\n  void put(const K& key, V val) {\n    std::unique_lock lk(m);\n    auto it = pos.find(key);\n    if (it != pos.end()) { order.erase(it->second); }\n    order.push_front({key, std::move(val)});\n    pos[key] = order.begin();\n    if (pos.size() > cap) {\n      auto& last = order.back();\n      pos.erase(last.first);\n      order.pop_back();\n    }\n  }\n};\n```\n（生产实现 get 也应把命中项移到头部，需写锁或细粒度处理。）\n\n用 sanitizer 与单测验证（调试章）：\n- ASan：跑并发 get/put 压测，抓 use-after-free（如淘汰后仍访问）、越界、泄漏（节点未释放）。\n- TSan：多线程并发 get/put，抓数据竞争（如锁覆盖不全、shared_ptr 指向对象的读写竞争）。\n- 单元测试：覆盖「命中/未命中」「淘汰最久未用」「容量边界」「并发交替执行不丢数据不重复淘汰」。用确定性种子构造并发场景。\n- 压力测试：多线程高并发跑，验证不死锁（超时即报）、不崩溃、最终一致。\n\n涉及章节：STL（list/unordered_map/迭代器）、内存（智能指针、对象生命周期）、并发（shared_mutex、原子引用计数）、调试（ASan/TSan/单测）、基础（const 正确性、若加 const 成员函数的线程安全）。这道题几乎串起全书，是综合检验的好题。",
    tags: ["LRU 缓存", "线程安全", "综合应用", "STL", "智能指针", "并发", "sanitizer", "跨章节"],
  },
  {
    id: "ctr-final-review-4",
    chapter: "ctr-final-review",
    level: 4,
    question: "作为面试候选人，你会如何用本书的方法论规划 C++ 面试复习？请给出「陷阱清单法」与「测试驱动复盘」的具体执行步骤，并说明如何把工程能力（调试/优化）包装成面试加分项。",
    answer:
      "用本书方法论规划 C++ 面试复习，核心是把「被动看」变「主动测」，把「会背」变「会写会调」。\n\n陷阱清单法的执行步骤：\n1. 建清单：每章复习时，把「典型陷阱」单独抄进一份清单。如基础章列「有符号溢出是 UB、未初始化读取是 UB、const_cast 改真 const 是 UB、new[]配 delete 是 UB」；STL 章列「vector 扩容全失效、erase 后用 it++ 失效、范围 for 里 push_back」；并发章列「DCLP 旧 bug、const 成员函数非线程安全、shared_ptr 引用计数安全不等于对象读写安全」。每条配一句话根因。\n2. 自测：盖住答案，看着清单条目默写「根因 + 修正」。写不出的回头补。每周把清单过一遍，错的标记，下次重点。\n3. 迁移：面试前把清单浓缩成一页「高频陷阱速查」，临场编码时心里默念清单逐条避雷——如写 vector 循环删除先想「迭代器失效」，写单例先想「Meyers」。\n4. 转检查项：把清单转成 code review checklist，面试写完代码主动按清单自检（「我这里 erase 后更新迭代器了吗」「我这里锁顺序一致吗」），展现工程素养。\n\n测试驱动复盘的执行步骤：\n1. 题后复盘：每刷一题（手写或在线），不只看对错，要问「这题踩了哪个陷阱」「哪个知识点没掌握」，归类进陷阱清单。\n2. 手写验证：关键算法/模式（单例、工厂、二分、BFS、LRU）在纸上或本地手写完整可编译版，用 ASan/Valgrind 跑，确认无内存错误。能跑通 sanitizer 才算真会。\n3. 限时复现：面试题限定时间（如 30 分钟），训练反应速度。复盘时记录「哪步卡了、为什么」，针对性补。\n4. 变式拓展：把一题变式（如单例 → 线程安全单例 → 析构依赖单例），逼自己覆盖陷阱清单的相邻条目，把点连成网。\n\n把调试/优化包装成面试加分项：\n1. 主动展示工具意识：写完代码主动说「我会用 ASan 跑一遍抓越界和 use-after-free，用 TSan 验证并发安全」。面试官听到工具链立刻加分——多数候选人只写代码不验证。\n2. 讲优化有据：被问优化时，先说「我会先 profiling 定位热点再优化」，举 Amdahl 定律，强调「先测后优」。再讲具体优化（算法复杂度、缓存友好、移动语义减少拷贝），显得有体系而非瞎猜。\n3. 讲调试有法：被问「程序偶发崩溃怎么查」时，按本书步骤答——先怀疑 UB/内存，用 ASan/UBSan/TSan 在保留优化的配置下复现，GDB backtrace 定位，git bisect 二分。这套流程比「加 printf」高几个段位。\n4. 用工程视角收尾：总结时说「我把面试当 TDD——先想测试用例和陷阱，再写实现，最后用 sanitizer 验证」。把应试能力升格成工程能力，正是高级岗位看重的。\n\n核心心法：本书的「测试驱动 + 陷阱导向」既是复习方法也是面试人设——一个会主动避雷、会工具验证、会先测后优的候选人，远胜只会背概念的。",
    tags: ["面试复习", "陷阱清单法", "测试驱动复盘", "调试优化", "加分项", "综合方法论"],
  },
];
