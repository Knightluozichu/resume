import type { ReviewQuestion } from "./types";

/** 编写高质量代码 · 集合选择复习题 */
export const cqcCollectionChoiceQuestions: ReviewQuestion[] = [
  {
    id: "cqc-collection-choice-1",
    chapter: "cqc-collection-choice",
    level: 1,
    question: "键值查找应该用 `Dictionary` 还是 `List<T>`？为什么？",
    answer:
      "应该用 `Dictionary`。\n\n`Dictionary` 基于哈希表，查找、插入、删除均为 O(1)。`List<T>` 的 `Contains` 和 `FirstOrDefault` 是 O(n) 线性扫描。\n\n1 万条数据中查找一个键：Dictionary 平均 1 次哈希计算即可定位；List 平均要扫描 5000 次比较。数据量越大差距越明显。\n\n只有需要顺序访问或索引访问（如 `list[i]`）时才用 `List<T>`。需要按键查找时必须用 `Dictionary`。",
    tags: ["Dictionary", "List", "O(1)", "键值查找"],
  },
  {
    id: "cqc-collection-choice-2",
    chapter: "cqc-collection-choice",
    level: 2,
    question: "`List<T>` 和 `LinkedList<T>` 各自适合什么场景？它们的性能差异是什么？",
    answer:
      "List<T> 适合：顺序访问、索引访问（`list[i]` O(1)）、尾部追加（O(1)）。基于动态数组，缓存友好，常数因子小。\n\nLinkedList<T> 适合：频繁在头部或中间插入删除（持有节点引用时 O(1)）。基于双向链表。\n\n性能差异：\n- 索引访问：List O(1)，LinkedList O(n)（不支持索引，要遍历）\n- 中间插入：List O(n)（要移动元素），LinkedList O(1)（持有节点时）\n- 头部插入：List O(n)，LinkedList O(1)\n- 尾部追加：List O(1)，LinkedList O(1)\n- 内存：List 连续数组缓存友好，LinkedList 每个节点有前后指针额外开销\n\n大多数场景 List 更优。LinkedList 仅在频繁头部/中间增删且不需要索引访问时才有优势。",
    tags: ["List", "LinkedList", "性能对比", "场景选择"],
  },
  {
    id: "cqc-collection-choice-3",
    chapter: "cqc-collection-choice",
    level: 3,
    question: "多线程场景下为什么不能用 `Dictionary` 而要用 `ConcurrentDictionary`？`ConcurrentDictionary` 是如何实现线程安全的？",
    answer:
      "`Dictionary` 不是线程安全的：\n1. 多线程同时写会导致哈希桶链表损坏，可能出现死循环、数据丢失或 NullReferenceException。\n2. 一个线程写一个线程读也不安全——写操作可能触发 rehash（扩容），此时读线程可能访问到正在移动的桶。\n3. `dict[key] = dict.GetValueOrDefault(key) + 1` 这种读-改-写复合操作即使加了锁也不够，因为其他线程可能在两步之间插入。\n\n`ConcurrentDictionary` 的实现：\n- 读操作无锁：直接读取桶数据，安全因为桶的更新是原子的（用 volatile 读）。\n- 写操作用细粒度锁（分桶锁）：不同桶的写操作可以并行，不是一把全局锁。\n- `AddOrUpdate` 等复合方法在锁内执行整个 lambda，保证原子性。\n\n因此 ConcurrentDictionary 比自己写 `lock + Dictionary` 性能更好。",
    tags: ["ConcurrentDictionary", "线程安全", "细粒度锁", "并发"],
  },
  {
    id: "cqc-collection-choice-4",
    chapter: "cqc-collection-choice",
    level: 4,
    question: "综合分析：一个系统需要缓存用户数据，读多写少（每秒上万次读，偶尔更新），且有多线程并发访问。你会选择什么集合方案？为什么？",
    answer:
      "推荐方案取决于更新频率和一致性要求：\n\n方案1：`ConcurrentDictionary`（如果更新频率尚可接受细粒度锁开销）\n- 优点：读无锁 O(1)，写用分桶锁。简单可靠。\n- 缺点：写时仍有锁开销，极高写频率下有竞争。\n- 适用：更新频率不极端（如每秒几十次）。\n\n方案2：`ImmutableDictionary` + `volatile` 引用替换（读远多于写）\n- 优点：读完全无锁（不可变集合天然线程安全）。更新时创建新副本替换引用。\n- 缺点：每次更新分配新字典，GC 压力。更新频繁时不合适。\n- 适用：更新极少（如几分钟一次配置刷新）。\n\n方案3：`ReaderWriterLockSlim` + 普通 `Dictionary`（读多写少的经典方案）\n- 优点：多个读线程并发，写线程独占。\n- 缺点：需要手动管理锁，不如并发集合简洁。\n\n对于「每秒上万次读、偶尔更新」的场景，方案2（ImmutableDictionary + volatile 替换）最优：读完全无锁无等待，更新时用 `Interlocked.Exchange` 原子替换引用。读多写少且更新不频繁时，不可变集合的 GC 开销可以接受。",
    tags: ["综合", "ConcurrentDictionary", "ImmutableDictionary", "ReaderWriterLockSlim", "缓存"],
  },
];
