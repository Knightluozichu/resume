import type { ReviewChapterSlug, ReviewLevel, ReviewQuestion } from "./types";

function question(
  chapter: ReviewChapterSlug,
  suffix: number,
  level: ReviewLevel,
  prompt: string,
  answer: string,
  tags: string[],
): ReviewQuestion {
  return {
    id: `${chapter}-${suffix}`,
    chapter,
    level,
    question: prompt,
    answer,
    tags,
  };
}

export const chpBriefIntroductionQuestions: ReviewQuestion[] = [
  question(
    "chp-brief-introduction-to-cpp",
    1,
    2,
    "零成本抽象、value semantics 与 ownership 如何共同构成高性能 C++ 接口？",
    "零成本抽象要求高层接口在优化后不引入不必要运行时成本；value semantics 让复制、移动和局部推理明确；ownership 决定谁释放资源。三者结合后，编译器能看到具体类型和生命周期，调用者也能判断 copy、borrow 或 transfer。高性能不是省略契约，而是让契约足够明确以便优化。",
    ["第1章", "零成本抽象", "ownership"],
  ),
  question(
    "chp-brief-introduction-to-cpp",
    2,
    3,
    "设计一个返回大型结果的接口时，怎样比较按值返回、const 引用和 owning pointer？",
    "先按 lifetime 决策：独立结果优先按值返回并依赖消除/移动；只读借用可返回 const reference，但 owner 必须覆盖调用者；动态唯一所有权用 unique_ptr。再测 allocation、copy/move 和调用链。不能因担心复制就返回悬空引用，也不能用 shared_ptr 掩盖本来唯一的 ownership。",
    ["第1章", "接口设计", "lifetime"],
  ),
];

export const chpModernConceptsQuestions: ReviewQuestion[] = [
  question(
    "chp-modern-cpp-concepts",
    1,
    2,
    "plain auto、auto& 与 auto&& 在 identity 和 copy 上有什么区别？",
    "plain auto 按值推导并通常丢掉 top-level cv/ref，可能产生 copy；auto& 保留被引用对象 identity 与 cv；auto&& 在 deduction context 是 forwarding reference，按 initializer value category 折叠。判断时先写出 initializer type/value category，再决定是 value、borrow 还是 forward。",
    ["第2章", "auto", "类型推导"],
  ),
  question(
    "chp-modern-cpp-concepts",
    2,
    3,
    "何时选择 concrete lambda、std::function、optional、variant 或 any？",
    "compile-time 已知 callable 优先 concrete lambda；需要统一可替换的 owning callable 才用 std::function。只有 T/absence 用 optional，封闭类型集合用 variant，开放 runtime 类型集合才用 any。选择后审计 capture lifetime、object size、indirect call、allocation 和 failure path。",
    ["第2章", "lambda", "类型擦除"],
  ),
];

export const chpMeasuringPerformanceQuestions: ReviewQuestion[] = [
  question(
    "chp-measuring-performance",
    1,
    2,
    "为什么渐近复杂度和 benchmark 缺一不可？",
    "渐近复杂度描述输入增大时的增长类别，可排除不可扩展方案，但隐藏常数、布局和硬件；benchmark 测目标规模与机器的真实交叉点，却不能证明更大规模仍成立。先用复杂度定候选，再以代表性 workload、分布和环境测量。",
    ["第3章", "复杂度", "benchmark"],
  ),
  question(
    "chp-measuring-performance",
    2,
    3,
    "一次优化平均快 12%，怎样证明它不是噪声？",
    "保持 build、input、hardware 与 timed boundary 一致，交错运行 A/B，确认工作未被编译器删除；报告 effect size、uncertainty、median/p95/p99、throughput、allocation 与 memory。再用 sampling profile 证明目标 hotspot 下降。若差值落在 noise 内或换来 tail/memory 回归，就不能称为成功。",
    ["第3章", "实验设计", "profiling"],
  ),
];

export const chpDataStructuresQuestions: ReviewQuestion[] = [
  question(
    "chp-data-structures",
    1,
    2,
    "为什么 vector 的线性移动可能胜过 list 的常数时间插入？",
    "list 的常数插入假设位置已知，节点仍有 allocation、metadata 与 pointer chasing；vector 虽移动后缀，但连续数据可预取并高效复制。应使用完整的查找+修改 workload，测元素大小、读写比例、cache miss、allocation 和稳定地址要求。",
    ["第4章", "vector", "locality"],
  ),
  question(
    "chp-data-structures",
    2,
    3,
    "unordered_map 的 p99 抖动应如何从 hash policy 排查？",
    "记录 load factor、bucket-size distribution、rehash、hit/miss 与 key 来源；检查 equal/hash 一致性和 collision-heavy input。reserve 可移出 rehash，调整 max_load_factor 会交换 memory 与 collision。若需要 range query 或最坏界，应同时比较 ordered map。",
    ["第4章", "hash", "p99"],
  ),
];

export const chpIteratorQuestions: ReviewQuestion[] = [
  question(
    "chp-deeper-look-at-iterators",
    1,
    2,
    "iterator category 为什么是复杂度契约，而不只是运算符列表？",
    "random access 不仅要求 operator+ 可编译，还要求 jump/difference/index 为常数时间；forward 要求 multi-pass；input 可 single-pass。虚报 category 会让算法选择不成立的快速路径并产生隐藏复杂度。",
    ["第5章", "iterator", "category"],
  ),
  question(
    "chp-deeper-look-at-iterators",
    2,
    3,
    "make_linear_range 如何处理负 step、不可整除边界和 --end()？",
    "factory 拒绝 zero step并验证方向；结束由 crossed-bound 或 count 决定，不要求 current 精确等于 bound。若承诺 bidirectional，end state 还要保留 last position/step，使 --end() 可逆。再覆盖 overflow、empty 与正负 step tests。",
    ["第5章", "linear range", "边界"],
  ),
];

export const chpStlAlgorithmsQuestions: ReviewQuestion[] = [
  question(
    "chp-stl-algorithms-and-beyond",
    1,
    2,
    "custom comparator 必须满足什么契约？",
    "排序 comparator 必须形成 strict weak ordering：irreflexive、asymmetric、transitive，并让 equivalence 一致。使用 <= 会违反 comp(x,x)==false。排序和后续 lower_bound 必须使用同一关系，并以随机三元组和相等 key 做 property tests。",
    ["第6章", "comparator", "标准算法"],
  ),
  question(
    "chp-stl-algorithms-and-beyond",
    2,
    3,
    "从百万条记录取 top-100，怎样避免完整 sort？",
    "需要有序 top-k 可用 partial_sort；只需分界可 nth_element 后排序前缀；streaming 用 bounded heap。大型 payload 应排序 key/index 减少移动。用真实 n/k、record size 与 comparator 测 comparisons、moves、memory 和时间。",
    ["第6章", "top-k", "partial sort"],
  ),
];

export const chpMemoryManagementQuestions: ReviewQuestion[] = [
  question(
    "chp-memory-management",
    1,
    2,
    "operator new、placement new、destructor 与 operator delete 分别负责什么？",
    "operator new 取得满足大小/对齐的 raw storage；placement new 在该 storage 开始 object lifetime；destructor 结束 lifetime；operator delete 归还原 provider 的 storage。构造抛出时 lifetime 未开始，不能调用 destructor。RAII 应封装这条顺序。",
    ["第7章", "object lifetime", "placement new"],
  ),
  question(
    "chp-memory-management",
    2,
    3,
    "arena 与 small size optimization 分别适合什么分布？",
    "SSO 用更大的固定 object representation 换常见小值不分配，适合短值占主导；arena 适合许多对象共享 phase lifetime 并批量 reset。比较长度/size 分布、allocation、peak RSS、destructor/reset 与跨 phase 逃逸，不能只看单次 allocate。",
    ["第7章", "arena", "SSO"],
  ),
];

export const chpMetaprogrammingQuestions: ReviewQuestion[] = [
  question(
    "chp-metaprogramming-compile-time",
    1,
    2,
    "is_detected 或 void_t 检测成功能证明哪些事实？",
    "它只证明依赖表达式在 substitution context 中 well-formed，并可取得类型；不证明 postcondition、complexity、lifetime 或 exception。generic API仍需语义 contract 和目标类型 tests。",
    ["第8章", "detection idiom", "traits"],
  ),
  question(
    "chp-metaprogramming-compile-time",
    2,
    3,
    "compile-time hash 为什么仍不能直接作为唯一类型 ID？",
    "固定宽度 hash 必然存在碰撞。封闭 literal 集合可在 build 时检查已知碰撞，但 runtime 外部 key仍要比较原字符串或使用 bucket collision handling；还要固定算法、encoding 与 version。",
    ["第8章", "compile-time hash", "collision"],
  ),
];

export const chpProxyLazyQuestions: ReviewQuestion[] = [
  question(
    "chp-proxy-objects-lazy-evaluation",
    1,
    2,
    "lazy evaluation、proxy 与 memoization 有什么区别？",
    "lazy 把计算推迟到观察边界；proxy 保存 operation/operands 并表现得像值；memoization 额外缓存首次结果。普通 proxy 每次 conversion 可能重算，缓存则引入 state、memory、同步和 invalidation。",
    ["第9章", "lazy", "proxy"],
  ),
  question(
    "chp-proxy-objects-lazy-evaluation",
    2,
    3,
    "StringProxy 如何安全同时接受 lvalue 与 temporary string？",
    "lvalue 可按 view/reference 借用，但 owner 必须覆盖 expression；rvalue 应按值 move 进入 expression node，不能只保存 string_view。测试 source reallocation、跨 scope、copy/move proxy 与重复 materialization，并以 ASan 验证。",
    ["第9章", "string proxy", "lifetime"],
  ),
];

export const chpConcurrencyQuestions: ReviewQuestion[] = [
  question(
    "chp-concurrency",
    1,
    2,
    "release/acquire flag 怎样安全发布普通 payload？",
    "payload writes sequenced-before release store；acquire load若读到该 release value，则 store synchronizes-with load，传递后 payload writes happens-before reads。relaxed flag只保证flag自身原子，不能发布普通data。",
    ["第10章", "memory model", "happens-before"],
  ),
  question(
    "chp-concurrency",
    2,
    3,
    "为什么 SPSC queue 不能只加一个 producer 就变成 MPMC？",
    "SPSC证明依赖producer独占write index/slot、consumer独占read index。多个producer会同时reserve和写同一slot；即便index CAS成功，还需per-slot publish sequence、lifetime和reclamation。应使用成熟MPMC算法、shard queues或给producer侧加锁。",
    ["第10章", "lock-free queue", "SPSC"],
  ),
];

export const chpParallelStlQuestions: ReviewQuestion[] = [
  question(
    "chp-parallel-stl",
    1,
    2,
    "stable parallel copy_if 为什么需要 count、prefix sum 和 scatter？",
    "每chunk先生成flags/count；exclusive prefix给出按输入顺序排列且不重叠的output区间；各chunk再按本地顺序scatter。这样既无per-item global atomic contention，又保持stable order。",
    ["第11章", "copy_if", "prefix sum"],
  ),
  question(
    "chp-parallel-stl",
    2,
    3,
    "GPU kernel 快 10 倍但端到端更慢，应如何决策？",
    "分解host准备、H2D、allocation、queue、kernel、D2H并改变n与算术强度。若数据可驻留GPU完成多stage pipeline，传输可摊薄；若每次少量往返，CPU SIMD/par更合适。还要验证precision、fallback与设备可用性。",
    ["第11章", "GPU", "end-to-end"],
  ),
];
