import type { ReviewQuestion } from "./types";

export const gmpDataStructuresQuestions: ReviewQuestion[] = [
  {
    id: "gmp-data-structures-1",
    chapter: "gmp-data-structures",
    level: 1,
    question: `数组和链表的核心区别是什么？`,
    answer: `数组：连续内存，O(1) 随机访问，O(n) 中间插入删除，缓存友好。链表：非连续内存（指针连接），O(1) 插入删除，O(n) 随机访问，缓存不友好。游戏引擎大量用数组因为：渲染对象每帧全量遍历（缓存友好重要），不需要频繁中间插入删除。`,
    tags: ["数组", "链表", "缓存友好"],
  },
  {
    id: "gmp-data-structures-2",
    chapter: "gmp-data-structures",
    level: 2,
    question: `为什么游戏引擎大量使用数组而非链表？`,
    answer: `两个原因：1. 缓存友好——数组连续存储，CPU 缓存命中率高，预取生效。链表节点散落内存各处，每次访问可能缓存 miss，实际遍历慢 5-10 倍。2. 访问模式——游戏对象每帧全量遍历（渲染/更新），不需要频繁中间插入删除。数组随机访问 O(1) 和连续遍历效率完美匹配。链表 O(1) 插入优势在遍历场景用不上。`,
    tags: ["数组", "游戏引擎", "缓存友好"],
  },
  {
    id: "gmp-data-structures-3",
    chapter: "gmp-data-structures",
    level: 3,
    question: `哈希表在游戏中有什么典型应用？有什么局限？`,
    answer: `典型应用：资源管理（按名字找纹理/网格）、实体组件映射（按类型找组件）、配置表查找（按 ID 读配置）。局限：1. 无序不能按序遍历。2. 哈希冲突最坏 O(n)。3. 内存开销（桶数组）。4. 不缓存友好（桶和节点散落内存）。小数据量（<100）时线性查找数组可能更快。`,
    tags: ["哈希表", "资源管理", "局限"],
  },
  {
    id: "gmp-data-structures-4",
    chapter: "gmp-data-structures",
    level: 4,
    question: `为什么理论 O(1) 的链表插入实际可能比 O(n) 的数组插入慢？`,
    answer: `因为缓存 miss 的代价远大于移动几个元素。CPU 缓存行 64 字节，数组连续内存一次加载多个元素（8 个 int），遍历几乎全命中缓存。链表节点散落内存各处，每次访问下一个节点都可能缓存 miss（从内存读取约 100 纳秒，缓存命中约 1 纳秒，差 100 倍）。即使链表插入只需改指针（理论 O(1)），但定位插入位置时遍历的缓存 miss 代价远超数组移动元素。因此小数据量（<1000 元素）时数组几乎总是更快。现代 CPU 性能瓶颈是内存访问而非计算，缓存友好性比理论复杂度更重要。`,
    tags: ["缓存友好", "CPU缓存", "实际性能", "综合"],
  },
];
