import type { ReviewQuestion } from "./types";

/** C++ 性能优化指南 · 算法选择复习题 */
export const opcAlgorithmSelectionQuestions: ReviewQuestion[] = [
  {
    id: "opc-algorithm-selection-1",
    chapter: "opc-algorithm-selection",
    level: 1,
    question: "为什么说「数据规模决定最优算法」？请举例说明。",
    answer:
      "大 O 复杂度只描述渐进行为，忽略了常数因子。小数据量时，常数因子主导：\n\n例如：插入排序 O(n²) vs 快速排序 O(n log n)。\n- n=10 时，插入排序约 100 次操作（常数小），快速排序约 33 次操作但常数大（分区、递归开销），实际可能插入排序更快。\n- n=10000 时，插入排序约 1 亿次操作，快速排序约 13 万次操作，快速排序快上千倍。\n\n所以很多标准库的 `sort` 在分区小到一定阈值（如 16）时切回插入排序——这就是「数据规模决定最优算法」的工程体现。",
    tags: ["复杂度", "数据规模", "交叉点"],
  },
  {
    id: "opc-algorithm-selection-2",
    chapter: "opc-algorithm-selection",
    level: 2,
    question: "什么是「缓存友好算法」？为什么相同大 O 复杂度的两个算法，实际性能可能差 10 倍？",
    answer:
      "缓存友好算法是指访问模式有利于 CPU 缓存的算法——连续访问、可预测的访问模式、数据紧凑。\n\n相同大 O 但性能差 10 倍的原因：\n1. 连续 vs 指针跳转：`std::vector` 顺序遍历利用缓存行预取，一个 cache miss 后连续命中。`std::list` 每个节点都是指针跳转，每次都 cache miss。同样是 O(n)，vector 可能快 10-50 倍。\n2. 顺序 vs 随机访问：顺序遍历数组触发硬件预取器；随机访问让预取失效。\n3. 数据紧凑度：结构体有空洞时，一个缓存行装的数据少，需要更多 cache line。`struct{char a; double b;}` 可能浪费 7 字节。\n\n所以算法选择不只看大 O，还要看缓存命中率——纸面复杂度相同，缓存友好的实现可能快一个数量级。",
    tags: ["缓存友好", "cache miss", "大 O"],
  },
  {
    id: "opc-algorithm-selection-3",
    chapter: "opc-algorithm-selection",
    level: 3,
    question: "你需要在一个频繁插入+查找的场景中选择数据结构。`std::map`、`std::unordered_map`、排序后的 `std::vector` + 二分查找，你会选哪个？为什么？",
    answer:
      "取决于数据规模和访问模式：\n\n1. 数据量大、频繁查找：`std::unordered_map`（O(1) 平均查找）。但注意哈希冲突和缓存不友好（桶是链表/指针）。\n\n2. 数据量小（<1000）、批量构建后频繁查找：排序后的 `std::vector` + 二分查找。vector 连续内存缓存友好，小数据量时二分查找的 O(log n) 因缓存命中反而比 `unordered_map` 的 O(1) 快（哈希计算 + 指针跳转的常数更大）。\n\n3. 需要有序遍历：`std::map`（O(log n) 查找，红黑树缓存不友好）或排序 vector。\n\n选择流程：\n- 先测数据规模：小 → vector + 二分；大 → unordered_map。\n- 需要有序 → map 或排序 vector。\n- 插入频繁且无序 → unordered_map。\n- 批量构建后只查 → 排序 vector。\n\n关键：不要只看大 O，要 benchmark 实际数据量下的表现。",
    tags: ["数据结构选择", "vector", "unordered_map", "应用"],
  },
  {
    id: "opc-algorithm-selection-4",
    chapter: "opc-algorithm-selection",
    level: 4,
    question: "综合分析：一个图像处理管线中，对每个像素做 3x3 卷积。当前用 `std::vector<std::vector<int>>` 存图像，性能不达标。请从算法选择与缓存角度分析并优化。",
    answer:
      "问题分析：\n`vector<vector<int>>` 是「行的数组」，每行是一个独立分配的 `vector`。访问 `img[y][x]` 时：第一层 `img[y]` 是连续的（存指针），但第二层每行数据的地址不连续——跨行访问时 cache miss 严重。3x3 卷积需要访问相邻 3 行，每行跳转都是 cache miss。\n\n优化方案（从低风险到高风险）：\n\n1. 一维扁平化（立竿见影）：\n用 `std::vector<int>` 一维存储，`img[y*width+x]` 访问。所有像素连续，相邻行在同一缓存行附近，cache miss 大幅减少。无需改算法，只改存储布局。\n\n2. 循环顺序优化：\n确保外循环遍历 y、内循环遍历 x（行优先顺序访问），匹配内存布局。如果当前是列优先访问，交换循环顺序。\n\n3. 分块处理（tiling）：\n对大图像，按 64x64 的块处理，让工作集落入 L1/L2 缓存。块内所有像素的卷积完成后才移到下一块。\n\n4. 算法层面：\n如果卷积核可分离（如高斯核 = 水平 1D * 垂直 1D），把 O(k²) 降为 O(2k)。\n\n5. SIMD 向量化：\n扁平化后内循环连续访问，编译器更容易自动向量化（或手动 intrinsics）。\n\n核心原则：先改数据布局（扁平化），再优化访问顺序（行优先），再考虑算法（可分离核），最后上 SIMD。每步都先 benchmark 验证。",
    tags: ["综合", "AoS", "缓存", "卷积", "分块"],
  },
];
