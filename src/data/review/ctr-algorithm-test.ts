import type { ReviewQuestion } from "./types";

/** C++ 编程测试秘籍 · 算法测试复习题 */
export const ctrAlgorithmTestQuestions: ReviewQuestion[] = [
  {
    id: "ctr-algorithm-test-1",
    chapter: "ctr-algorithm-test",
    level: 1,
    question: `常见排序算法（冒泡、选择、插入、归并、快排、堆排）的平均与最坏时间复杂度、空间复杂度、稳定性分别是什么？`,
    answer:
      `六种排序算法的复杂度与稳定性：\n\n| 算法 | 平均时间 | 最坏时间 | 空间 | 稳定 |\n|---|---|---|---|---|\n| 冒泡 | O(n²) | O(n²) | O(1) | 是 |\n| 选择 | O(n²) | O(n²) | O(1) | 否 |\n| 插入 | O(n²) | O(n²) | O(1) | 是 |\n| 归并 | O(n log n) | O(n log n) | O(n) | 是 |\n| 快排 | O(n log n) | O(n²) | O(log n) | 否 |\n| 堆排 | O(n log n) | O(n log n) | O(1) | 否 |\n\n要点：\n- O(n²) 的三种（冒泡/选择/插入）仅适合小规模或近乎有序（插入在近乎有序时接近 O(n)）。\n- 归并稳定且最坏也是 O(n log n)，但需 O(n) 额外空间，适合外部排序、链表排序、需稳定的场景。\n- 快排平均最快（常数小），但最坏 O(n²)（已排序输入 + 固定取首元素做 pivot），空间是递归栈 O(log n)，不稳定。工程上用随机化 pivot 或三数取中避免最坏。\n- 堆排原地 O(1) 空间且最坏 O(n log n)，但常数大、缓存不友好（跳跃式访问），实际比快排慢，常用于实现优先队列而非通排。\n\n稳定性：相等元素排序后相对顺序不变。稳定排序在「多关键字排序」（先按次要关键字稳定排，再按主关键字）时必需。C++ std::sort 不保证稳定（多为内省排序 introsort），需要稳定用 std::stable_sort（归并）。`,
    tags: ["排序算法", "时间复杂度", "空间复杂度", "稳定性"],
  },
  {
    id: "ctr-algorithm-test-2",
    chapter: "ctr-algorithm-test",
    level: 2,
    question: `二分查找的前提条件是什么？为什么 \`mid = (left + right) / 2\` 在 C++ 中有 bug？正确写法是什么？查找「第一个 >= target」与「第一个 > target」的边界有何不同？`,
    answer:
      `二分查找的前提：序列已按升序（或降序，对应调整）排列，且支持随机访问（O(1) 取中）。无序序列不能用二分。\n\n\`mid = (left + right) / 2\` 的 bug：当 left、right 都是大整数时，\`left + right\` 可能溢出（超过 INT_MAX），结果是 UB 或负数，导致 mid 错误甚至越界崩溃。在元素数量接近 INT_MAX 的大数组上这是真实 bug。\n\n正确写法：\`mid = left + (right - left) / 2;\`，用减法避免溢出。等价地 C++20 起可用 \`std::midpoint(left, right)\` 更清晰且安全。位运算 \`mid = (left & right) + ((left ^ right) >> 1)\` 也行但可读性差。\n\n「第一个 >= target」与「第一个 > target」边界：\n- 第一个 >= target（lower_bound）：找满足 \`a[mid] >= target\` 的最左位置。判断时若 \`a[mid] >= target\`，答案在 mid 或左侧，收缩 right = mid；否则 left = mid + 1。返回 left。这是 std::lower_bound 的语义。\n- 第一个 > target（upper_bound）：找满足 \`a[mid] > target\` 的最左位置。判断时若 \`a[mid] > target\`，right = mid；否则 left = mid + 1。返回 left。这是 std::upper_bound 的语义。\n\n两者差一个等号：lower_bound 是「不小于」，upper_bound 是「大于」。在含重复元素的序列里，\`[lower_bound, upper_bound)\` 正好是等于 target 的区间。直接用 std::lower_bound / std::upper_bound 比手写更不易错。\n\n常见错误：循环条件 \`left <= right\` 还是 \`left < right\`、right 初始是 \`n-1\` 还是 \`n\`（开闭区间）、收缩用 \`right = mid\` 还是 \`mid - 1\`。统一用「左闭右开」区间 [left, right)（right 初始 n，循环 left < right，收缩 right = mid）最不易越界。`,
    tags: ["二分查找", "整数溢出", "lower_bound", "upper_bound", "边界"],
  },
  {
    id: "ctr-algorithm-test-3",
    chapter: "ctr-algorithm-test",
    level: 3,
    question: `BFS 与 DFS 各用什么数据结构？分别适合解决什么问题？用 C++ 写出图的邻接表 BFS 求无权图最短跳数的骨架。`,
    answer:
      `BFS 与 DFS 的数据结构与适用问题：\n- BFS（广度优先）：用队列（FIFO）。逐层扩展，先访问距起点近的节点。适合「无权图最短路径/最少步数」「层序遍历」「求连通分量」「判断二分图」等需要「按距离分层」的问题。能保证第一次到达即最短（无权）。\n- DFS（深度优先）：用栈（或递归调用栈，LIFO）。一条路走到底再回溯。适合「连通性判断」「拓扑排序」「找环」「求强连通分量」「回溯搜索全解（如全排列、迷宫所有路径）」「树的先序遍历」等。递归实现简洁但深图可能栈溢出，可改显式栈迭代。\n\nC++ 邻接表 BFS 求无权图最短跳数骨架：\n\`\`\`cpp\n// g: 邻接表, g[u] 是 u 的邻居列表; start: 起点; n: 节点数\nstd::vector<int> bfs_shortest(const std::vector<std::vector<int>>& g,\n                              int start, int n) {\n  const int INF = -1;\n  std::vector<int> dist(n, INF);   // dist[i] = start 到 i 的最少边数\n  std::queue<int> q;\n  dist[start] = 0;\n  q.push(start);\n  while (!q.empty()) {\n    int u = q.front(); q.pop();\n    for (int v : g[u]) {\n      if (dist[v] == INF) {        // 未访问\n        dist[v] = dist[u] + 1;     // 上一层 +1\n        q.push(v);\n      }\n    }\n  }\n  return dist;  // 不可达的为 INF\n}\n\`\`\`\n关键点：用 dist 同时充当访问标记（-1 表未访问）；入队时即设 dist，避免重复入队；队列保证按距离递增处理，所以第一次到达即最短。时间 O(V+E)，空间 O(V)。`,
    tags: ["BFS", "DFS", "队列", "栈", "无权最短路径", "邻接表"],
  },
  {
    id: "ctr-algorithm-test-4",
    chapter: "ctr-algorithm-test",
    level: 4,
    question: `面试中遇到「在 10 亿个 int 中找最大的 100 个」与「判断一个字符串的所有排列是否都是另一字符串的子串」分别用什么算法？说明时间复杂度，并指出用 STL 如何简洁实现前者。`,
    answer:
      `题一「10 亿 int 找最大 100 个」：\n算法：用大小为 100 的最小堆（priority_queue）。遍历每个数：堆未满直接入；堆满后若当前数大于堆顶（堆顶是当前 100 个里最小的），弹出堆顶、入当前数。遍历完堆里就是最大的 100 个。\n时间复杂度：O(n log k)，n=10 亿，k=100。每个元素一次堆操作 O(log k)，远优于排序的 O(n log n)（10 亿 log 10 亿 ≈ 300 亿次 vs 10 亿 log 100 ≈ 67 亿次）且空间只需 O(k)。也可用快速选择（nth_element）找第 100 大再 partition，平均 O(n)，但会改变原数组、且把 100 个都搬到内存。海量数据（放不下内存）必须用最小堆 + 流式处理。\nSTL 简洁实现：\n\`\`\`cpp\nstd::priority_queue<int, std::vector<int>, std::greater<int>> pq;  // 最小堆\nfor (int x : data) {\n  if ((int)pq.size() < 100) pq.push(x);\n  else if (x > pq.top()) { pq.pop(); pq.push(x); }\n}\n// pq 中即最大 100 个\n\`\`\`\n\`greater<int>\` 让 priority_queue 成为最小堆（堆顶最小），便于「淘汰当前最小的」。这是 Top-K 问题的标准套路。\n\n题二「判断一个字符串 s 的所有排列是否都是另一字符串 t 的子串」：\n关键观察：s 的所有排列都是 t 子串，等价于「t 中存在一个长度为 |s| 的窗口，它是 s 的某排列」对「所有 s 的排列」成立——但这其实等价于「s 的字符的某种排列出现在 t 里」。再想：s 的「所有排列」都要是 t 的子串，意味着 t 必须包含 s 每一种排列作为子串，这极强。更合理的面试原意通常是「判断 s 的某排列是否是 t 的子串」（排列匹配问题）。\n若是「s 的某排列是 t 子串」：滑动窗口 + 计数。维护 t 中长度 |s| 的窗口，用字符频次数组比较窗口与 s 的频次是否一致（窗口是 s 的排列当且仅当频次相同）。滑动时 O(1) 更新频次，整体 O(|t|)。这即「找异位词」LeetCode 567。\n若是字面「所有排列都是子串」：s 的不同排列数达 |s|!，t 不可能全包含（除非 |s| 极小）。应向面试官澄清题意——这本身是面试考查点（先确认需求再动手）。\n时间复杂度：排列匹配（滑动窗口）O(|t|) 时间 O(字符集) 空间。\n\n综合启示：Top-K 用最小堆（STL priority_queue），排列/子串匹配用滑动窗口+频次，且面试先澄清题意再编码。`,
    tags: ["Top-K", "最小堆", "priority_queue", "滑动窗口", "排列匹配", "面试", "综合分析"],
  },
];
