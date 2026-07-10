import type { ReviewQuestion } from "./types";

/** 字符串算法复习题 */
export const aaeStringAlgorithmsQuestions: ReviewQuestion[] = [
  {
    id: "aae-string-algorithms-1",
    chapter: "aae-string-algorithms",
    level: 1,
    question:
      `KMP 算法的 next 数组（失败指针）的含义是什么？它如何将字符串匹配从暴力算法的 O(nm) 优化到 O(n+m)？`,
    answer:
      `next 数组的含义：\n\nnext[j] 表示模式串 P[0..j-1]（前 j 个字符）的最长「真前缀 = 真后缀」的长度。即：\n  next[j] = max{ k | 0 < k < j 且 P[0..k-1] == P[j-k..j-1] }\n\n通俗理解：当匹配到 P[j] 时失败，next[j] 告诉你模式串可以前移多少位而不漏过可能的匹配——因为 P[0..next[j]-1] 已经和当前文本位置的前 next[j] 个字符匹配了（它们是 P[j-next[j]..j-1] 的重复）。\n\n例子：模式串「ABABC」\n- next[0] = -1（约定，无真前缀）\n- next[1] = 0（A，无相同前后缀）\n- next[2] = 0（AB，无）\n- next[3] = 1（ABA，前缀 A = 后缀 A）\n- next[4] = 2（ABAB，前缀 AB = 后缀 AB）\n\nKMP 如何优化到 O(n+m)：\n\n暴力算法的问题：每次失配后，文本指针回退、模式指针归零，最坏 O(nm)（如文本「AAAAA...B」、模式「AAAAAC」）。\n\nKMP 的优化：\n1. 文本指针永不回退——这是 O(n) 的关键。\n2. 模式指针利用 next 数组「智能跳转」——失配时不归零，而是跳到 next[j]。\n\n匹配过程：\n- i 为文本指针，j 为模式指针。\n- 若 T[i] == P[j]：i++, j++。\n- 若 T[i] != P[j]：j = next[j]（不回退 i）。若 j == -1 则 i++, j++（跳过当前文本字符）。\n- 若 j == m：匹配成功。\n\n复杂度分析：\n- 构建 next 数组：O(m)，本质是模式串自身的 KMP 匹配。\n- 匹配过程：O(n)，文本指针 i 只增不减，最多 n 次。模式指针 j 的减少总量不超过增加总量，均摊 O(n)。\n- 总计：O(n + m)。\n\n核心思想：KMP 利用了「已匹配的前缀信息」避免重复比较。next 数组本质上是模式串的自相似性预处理——把「失配后该跳到哪」提前算好。`,
    tags: ["KMP", "next数组", "字符串匹配", "复杂度优化"],
  },
  {
    id: "aae-string-algorithms-2",
    chapter: "aae-string-algorithms",
    level: 2,
    question:
      `Trie 树（前缀树）的结构和复杂度是什么？相比哈希表，Trie 在哪些场景下更有优势？`,
    answer:
      `Trie 树结构：\n\nTrie 是一棵多叉树，每条边代表一个字符。从根到某节点的路径拼接成一个字符串。共享前缀的字符串在树中共享路径。\n\n基本操作复杂度（设字符串平均长度为 L，字符集大小为 Σ）：\n- 插入：O(L)——沿字符路径走，不存在则创建节点。\n- 查找：O(L)——沿字符路径走到底。\n- 前缀查询：O(L + 结果数)——找到前缀对应节点，遍历子树。\n- 删除：O(L)——找到末尾节点，删除无分叉的路径。\n\n空间复杂度：最坏 O(N × L × Σ)，N 为字符串数。共享前缀时实际更小。可用压缩 Trie（Patricia Trie / Radix Tree）减少节点数。\n\nTrie 相比哈希表的优势：\n\n1. 前缀查询：\n   哈希表无法做前缀查询（除非遍历所有 key）。Trie 天然支持——找所有以「app」开头的词只需定位到「app」节点再遍历子树。这是自动补全、输入法联想的核心需求。\n\n2. 词频统计与排序：\n   Trie 的中序/先序遍历天然产生字典序排列。哈希表需要额外排序 O(N log N)。\n\n3. 无哈希冲突：\n   哈希表有冲突风险，最坏 O(N)。Trie 的查找时间只依赖字符串长度，与数据量无关。\n\n4. 最长前缀匹配：\n   路由表（如 IP 路由的最长前缀匹配）、DNS 解析等场景需要找匹配最长前缀的规则，Trie（特别是 Radix Tree）天然高效。\n\n哈希表的优势（Trie 的劣势）：\n- 随机查找：哈希表 O(1) vs Trie O(L)。对于长字符串哈希表更快。\n- 内存：哈希表只存 key 和 value；Trie 每个字符一个节点，指针开销大，缓存不友好。\n- 实现简单：哈希表一行代码，Trie 需要定义节点结构。\n\n典型应用场景：\n- 搜索引擎自动补全（前缀查询）\n- 输入法词库（前缀 + 词频排序）\n- IP 路由表（最长前缀匹配，用 Radix Tree）\n- DNS 解析\n- 拼写检查（前缀查询 + 编辑距离）`,
    tags: ["Trie", "前缀树", "前缀查询", "哈希表对比", "复杂度"],
  },
  {
    id: "aae-string-algorithms-3",
    chapter: "aae-string-algorithms",
    level: 3,
    question:
      `后缀数组（Suffix Array）是什么？如何用它求字符串的最长重复子串？后缀数组相比后缀树有什么工程优势？`,
    answer:
      `后缀数组定义：\n\n后缀数组 SA 是字符串 S 的所有后缀按字典序排序后的起始位置数组。\n\n以 S = \"banana\" 为例：\n后缀列表：\n  0: banana\n  1: anana\n  2: nana\n  3: ana\n  4: na\n  5: a\n\n按字典序排序后：\n  5: a\n  3: ana\n  1: anana\n  0: banana\n  4: na\n  2: nana\n\nSA = [5, 3, 1, 0, 4, 2]\n\n高度数组（LCP Array）：\nLCP[i] = SA[i] 和 SA[i-1] 对应两个后缀的最长公共前缀长度。\n  LCP[1] = lcp(\"a\", \"ana\") = 1\n  LCP[2] = lcp(\"ana\", \"anana\") = 3\n  LCP[3] = lcp(\"anana\", \"banana\") = 0\n  LCP[4] = lcp(\"banana\", \"na\") = 0\n  LCP[5] = lcp(\"na\", \"nana\") = 2\n\n用后缀数组求最长重复子串：\n\n原理：最长重复子串 = 排序后相邻后缀的最长公共前缀的最大值。\n- 因为排序后，最相似的后缀（共享最长前缀的）一定相邻。\n- LCP 数组的最大值即为最长重复子串的长度，对应的后缀起始位置即为子串位置。\n\n对 \"banana\"：\n  LCP = [_, 1, 3, 0, 0, 2]\n  最大 LCP = 3，在 SA[2]=1 处，即后缀 \"anana\" 和 SA[1]=3 的 \"ana\"。\n  最长重复子串 = \"ana\"（长度 3）。\n\n算法步骤：\n1. 构建后缀数组 SA：O(n log n) 或 O(n)（DC3/SA-IS 算法）。\n2. 构建 LCP 数组：用 Kasai 算法 O(n)。\n3. 遍历 LCP 找最大值：O(n)。\n总计：O(n log n) 或 O(n)。\n\n后缀数组 vs 后缀树：\n\n后缀树：把所有后缀插入一棵压缩 Trie。空间 O(n)，构建 O(n)（Ukkonen 算法）。\n\n后缀数组的工程优势：\n1. 内存占用小：后缀树每个节点有多个指针和边标签，常数大（通常 10~20n 字节）。后缀数组只是一个整数数组（4n 字节），内存友好。\n2. 缓存友好：后缀数组是连续内存，访问局部性好。后缀树是指针密集的树结构，缓存不友好。\n3. 实现简单：后缀树（尤其 Ukkonen 算法）实现极其复杂。后缀数组可用简单的排序 + 倍增法构建。\n4. 功能等价：后缀数组 + LCP 数组能完成后缀树的几乎所有操作（最长重复子串、最长公共子串、模式匹配等），只是通过不同的查询方式。\n\n后缀树的优势：\n- 某些操作（如「判断模式串是否出现」）在后缀树上更快（O(m) 直接走树），后缀数组需要二分搜索 O(m log n)。\n\n工程选择：现代系统（如 bwa 基因比对、搜索引擎）普遍用后缀数组而非后缀树，因为内存和缓存优势在实际中远超理论复杂度的微小差异。`,
    tags: ["后缀数组", "LCP数组", "最长重复子串", "后缀树对比", "Kasai算法"],
  },
  {
    id: "aae-string-algorithms-4",
    chapter: "aae-string-algorithms",
    level: 4,
    question:
      `AC 自动机（Aho-Corasick）的 fail 指针与 KMP 的 next 数组、Trie 树是什么关系？请描述 AC 自动机的构建过程和匹配过程。`,
    answer:
      `AC 自动机 = Trie 树 + fail 指针，是多模式串匹配算法。它把 KMP 的单模式串匹配思想扩展到多模式串场景。\n\n三者关系：\n\n1. Trie 树是基础结构：\n把所有模式串插入 Trie 树，构建多模式串的「联合字典树」。\n\n2. fail 指针是 KMP next 数组的「多模式版本」：\n- KMP 的 next[j]：单模式串中，P[0..j-1] 的最长真前后缀。\n- AC 的 fail[u]：Trie 中节点 u 对应的字符串 S_u，在 Trie 中存在的最长真后缀对应的节点。\n- fail 指针让失配时不回退文本指针，而是跳到 fail 节点继续匹配——正如 KMP 的 next 跳转。\n\n3. 本质统一：\nKMP 是 AC 自动机在「只有一个模式串」时的特例。Trie 退化为链表，fail 指针退化为 next 数组。\n\n构建过程：\n\n第一步：构建 Trie 树\n- 把所有模式串逐字符插入 Trie，末尾节点标记为「模式结束」。\n\n第二步：构建 fail 指针（BFS）\n- 根节点的所有直接子节点的 fail 指向根。\n- BFS 遍历：对节点 u 的每个子节点 v（通过字符 c）：\n  1. 设 p = fail[u]。\n  2. 沿 fail 链向上：while p != root 且 p 没有字符 c 的子节点：p = fail[p]。\n  3. 如果 p 有字符 c 的子节点 q：fail[v] = q。\n  4. 否则：fail[v] = root。\n- 同时构建 goto/transition 表（优化）：把 fail 链的跳转预处理成直接转移，匹配时 O(1) 转移。\n\n第三步：匹配过程\n- 文本指针 i 从 0 开始，当前 Trie 节点 cur = root。\n- 对每个文本字符 T[i]：\n  1. 沿 goto 表转移：cur = goto[cur][T[i]]（或沿 fail 链找到能转移的节点）。\n  2. 检查 cur 及其 fail 链上是否有「模式结束」节点——如果有，报告匹配。\n  3. （优化：预处理 output 集合，每个节点的 output 包含自身和 fail 链上所有结束节点，匹配时直接查 output。）\n\n复杂度：\n- 构建 Trie：O(Σ |P_i|)，所有模式串长度之和。\n- 构建 fail 指针：O(Σ |P_i| × Σ)（BFS + fail 链跳转，用 goto 表优化后线性）。\n- 匹配：O(|T| + 匹配数)，T 为文本长度。文本指针不回退。\n\n与分别用 KMP 匹配每个模式串的对比：\n- 分别 KMP：O(k × (|T| + |P|))，k 为模式串数。文本被扫描 k 次。\n- AC 自动机：O(Σ |P_i| + |T| + 匹配数)。文本只扫描一次，所有模式串同时匹配。\n\n典型应用：\n- 敏感词过滤：多个敏感词同时在文本中匹配。\n- 入侵检测系统（IDS）：多个攻击特征同时匹配网络流量。\n- 基因序列分析：多个 DNA 序列同时匹配。`,
    tags: ["综合", "AC自动机", "fail指针", "KMP", "Trie", "多模式匹配"],
  },
];
