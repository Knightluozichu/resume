import type { ReviewQuestion } from "./types";

export const rdiDataStructuresQuestions: ReviewQuestion[] = [
  {
    id: "rdi-ds-1",
    chapter: "rdi-data-structures",
    level: 1,
    question: `SDS与C字符串的核心区别是什么？SDS的空间预分配策略如何工作？`,
    answer: `核心区别：①取长度——C字符串O(N)遍历，SDS O(1)读len字段；②缓冲区安全——C字符串可能溢出，SDS自动扩容；③二进制安全——C字符串用'\\0'判断结束，SDS用len判断（可存二进制）；④内存分配——C字符串每次修改realloc，SDS用预分配+惰性释放减少realloc。空间预分配：增长时若len<1MB分配等量free，若len>=1MB固定分配1MB free，减少连续增长的realloc次数。惰性空间释放：缩短时不立即释放多余空间，留给未来增长复用。`,
    tags: ["SDS", "字符串", "空间分配"],
  },
  {
    id: "rdi-ds-2",
    chapter: "rdi-data-structures",
    level: 2,
    question: `字典的渐进式rehash是如何工作的？为什么Redis要采用渐进式rehash？`,
    answer: `渐进式rehash过程：①分配新哈希表ht[1]（约ht[0].used*2的2幂）；②设rehashidx=0标记开始；③每次增删改查操作时迁移ht[0][rehashidx]整个链表到ht[1]，rehashidx++；④直到全部迁移完毕，释放ht[0]，ht[1]变ht[0]，rehashidx=-1。rehash期间：读操作先查ht[0]再查ht[1]；写操作新节点直接写ht[1]。采用渐进式的原因：Redis单线程事件驱动，一次性rehash所有节点会阻塞服务器导致所有客户端等待。分摊到每次操作中，每次只迁移一个桶的链表，将rehash开销均匀分散，不影响响应延迟。`,
    tags: ["字典", "渐进式rehash", "哈希表"],
  },
  {
    id: "rdi-ds-3",
    chapter: "rdi-data-structures",
    level: 2,
    question: `跳跃表是如何实现O(logN)查找的？为什么Redis选择跳跃表而非红黑树？`,
    answer: `跳跃表通过多层链表实现O(logN)查找：每个节点有1到32层，层数服从幂次定律（P=0.25），约75%节点只有1层。查找时从最高层开始沿前进指针跳过小于目标的节点，当下一节点大于目标时下降一层，最终在第1层找到目标。每层约排除一半节点类似二分查找故O(logN)。选择跳跃表而非红黑树的原因：①实现更简单无需旋转调整；②范围查询更高效——ZRANGE只需沿第1层遍历；③内存可控——通过调整P值平衡内存和性能；④代码更易维护。`,
    tags: ["跳跃表", "O(logN)", "红黑树对比"],
  },
  {
    id: "rdi-ds-4",
    chapter: "rdi-data-structures",
    level: 3,
    question: `intset的升级机制是什么？ziplist的级联更新问题如何产生？`,
    answer: `intset升级机制：intset用有序数组存储整数，encoding标识当前编码（int16/int32/int64）。插入更大类型元素时触发升级：①重新分配内存（全体按新编码扩大）；②现有元素逆序迁移（从后往前避免覆盖）；③设置新encoding；④插入新元素保持有序。升级不可逆。ziplist级联更新：每个entry的previous_entry_length记录前一entry长度（<254用1字节，>=254用5字节）。前一个entry长度变化跨越254边界时，previous_entry_length从1字节变5字节，自身长度变化又影响下一个entry，引发连锁反应。最坏O(N^2)，但触发概率极低。`,
    tags: ["intset", "ziplist", "级联更新", "内存优化"],
  },
];
