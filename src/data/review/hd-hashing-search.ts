import type { ReviewQuestion } from "./types";

/** 哈希与搜索：完美哈希与 Bloom 过滤器 复习题 */
export const hdHashingSearchQuestions: ReviewQuestion[] = [
  {
    id: "hd-hashing-search-1",
    chapter: "hd-hashing-search",
    level: 1,
    question: `FNV 哈希的原理？`,
    answer: `hash=(hash^byte)*FNV_prime，逐字节处理。XOR 混入字节信息，乘 prime 扩散。简单快速（几行代码），非加密场景首选。`,
    tags: ["FNV哈希"],
  },
  {
    id: "hd-hashing-search-2",
    chapter: "hd-hashing-search",
    level: 2,
    question: `Bloom 过滤器的假阳率和假阴率？`,
    answer: `假阳率 p≈(1-e^(-kn/m))^k，不可消除但可控。假阴率为 0——查询返回\"不存在\"则一定不存在。增大 m 或优化 k 降低假阳率。`,
    tags: ["Bloom过滤器", "假阳率"],
  },
  {
    id: "hd-hashing-search-3",
    chapter: "hd-hashing-search",
    level: 3,
    question: `完美哈希适合什么场景？`,
    answer: `键集合固定不变的静态场景。如编译器关键字表、只读字典。两级哈希保证零冲突，查找最坏O(1)。不能动态插入删除。`,
    tags: ["完美哈希", "静态集合"],
  },
  {
    id: "hd-hashing-search-4",
    chapter: "hd-hashing-search",
    level: 4,
    question: `为什么非加密场景不用 SHA-256？`,
    answer: `加密哈希设计目标是抗碰撞和单向性，速度慢（比 FNV 慢 10-100 倍）。非加密场景不需要这些安全性质。用 FNV/MurmurHash 足够且快得多。`,
    tags: ["哈希选型", "性能"],
  },
];
