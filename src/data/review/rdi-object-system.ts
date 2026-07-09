import type { ReviewQuestion } from "./types";

export const rdiObjectSystemQuestions: ReviewQuestion[] = [
  {
    id: "rdi-os-1",
    chapter: "rdi-object-system",
    level: 1,
    question: "Redis的五种对象类型各自支持哪些编码？编码转换的触发条件是什么？",
    answer: "五种类型与编码：①string——int/embstr(<=44B)/raw(>44B)；②list——ziplist/linkedlist；③hash——ziplist/hashtable；④set——intset(全整数)/hashtable；⑤zset——ziplist/skiplist+dict。编码转换由配置阈值触发：hash-max-ziplist-entries(512)/value(64)、list-max-ziplist-entries(512)/value(64)、zset-max-ziplist-entries(128)/value(64)、set-max-intset-entries(512)。转换单向不可逆——小→大，一旦升级即使删除元素也不降级。对用户完全透明。",
    tags: ["对象类型", "编码", "编码转换"],
  },
  {
    id: "rdi-os-2",
    chapter: "rdi-object-system",
    level: 2,
    question: "embstr和raw编码的区别是什么？为什么embstr是只读的？44字节是怎么来的？",
    answer: "embstr：redisObject和SDS在一块连续内存分配（1次malloc），缓存友好。raw：redisObject和SDS分别分配（2次malloc），可修改。embstr只读的原因：连续内存中修改需realloc可能移动整块内存并更新ptr指针，为简化实现Redis规定embstr只读——任何修改操作先转raw再修改。44字节由来：jemalloc的64字节分配块减去redisObject(16B)+SDS header(3B)+'\\0'(1B) = 44B恰好放下，最优利用64字节块。",
    tags: ["embstr", "raw", "字符串编码"],
  },
  {
    id: "rdi-os-3",
    chapter: "rdi-object-system",
    level: 2,
    question: "zset为什么同时使用跳跃表和字典？只用一种行不行？",
    answer: "zset需支持两类操作：①范围查询（ZRANGE/ZRANGEBYSCORE）需按分值排序；②单点查找（ZSCORE/ZRANK）需按成员查分值。只用跳跃表：ZSCORE需O(logN)遍历，高频单点查询太慢。只用字典：字典无序，范围查询需O(NlogN)排序太慢。两者结合：跳跃表支持O(logN)范围查询，字典支持O(1)单点查找。两结构各存一份指针但成员对象共享（不重复存储），以少量额外空间换取两类操作都高效。",
    tags: ["zset", "跳跃表", "字典", "双结构"],
  },
  {
    id: "rdi-os-4",
    chapter: "rdi-object-system",
    level: 3,
    question: "Redis的对象共享机制是什么？为什么只共享整数对象？LRU和LFU淘汰如何实现？",
    answer: "对象共享：Redis启动时预创建0-9999整数字符串对象放入共享池，多个键引用同一整数时共享redisObject（refcount>1），节约内存和分配开销。只共享整数的原因：共享前需验证对象相等，整数O(1)比较，字符串O(N)比较，验证成本可能超过节约的内存。LRU：redisObject.lru(24位)记录最后访问时间戳，淘汰最久未访问的键。LFU(4.0+)：lru高16位=最后访问时间(分钟)，低8位=访问频率(对数计数器)，淘汰频率最低的键。OBJECT IDLETIME查LRU空转时间，OBJECT FREQ查LFU频率。",
    tags: ["对象共享", "LRU", "LFU", "淘汰策略"],
  },
];
