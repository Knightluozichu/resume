import type { ReviewQuestion } from "./types";

/** 高级图算法复习题 */
export const aaeGraphAlgorithmsQuestions: ReviewQuestion[] = [
  {
    id: "aae-graph-algorithms-1",
    chapter: "aae-graph-algorithms",
    level: 1,
    question:
      `A* 算法的核心思想是什么？它的估价函数 f(n) = g(n) + h(n) 各项含义是什么？什么样的启发函数 h(n) 才能保证 A* 找到最优解？`,
    answer:
      `A* 算法是一种启发式最短路径搜索算法，结合了 Dijkstra 的最优性保证和贪心最佳优先搜索的速度优势。\n\n估价函数：\nf(n) = g(n) + h(n)\n\n- g(n)：从起点到节点 n 的实际代价（已确定的部分）。\n- h(n)：从节点 n 到终点的估计代价（启发函数，预估的部分）。\n- f(n)：经过节点 n 的路径的估计总代价。A* 每次从开放列表中选择 f(n) 最小的节点扩展。\n\n启发函数的可采纳性（Admissibility）：\nA* 保证找到最优解的条件是 h(n) 是可采纳的——即 h(n) 永远不高估从 n 到终点的真实最短代价：\n  h(n) ≤ h*(n)，其中 h*(n) 是实际最短代价。\n\n可采纳的启发函数例子（网格地图路径规划）：\n- 曼哈顿距离：h(n) = |x_n − x_goal| + |y_n − y_goal|。适用于四方向移动（上下左右）的网格，因为四方向移动的最短路径就是曼哈顿距离，不会高估。\n- 欧几里得距离：h(n) = sqrt((x_n − x_goal)² + (y_n − y_goal)²)。适用于任意方向移动（无方向限制），是直线距离，不会高估。\n- 切比雪夫距离：适用于八方向移动（含对角线）。\n\n一致性（Consistency）：\n更强的条件：对任意边 (n, n')，h(n) ≤ cost(n, n') + h(n')。满足一致性的启发函数也一定可采纳。一致性的好处是：A* 不需要重新扩展已关闭的节点，效率更高。\n\nA* 与 Dijkstra 的关系：\n- 当 h(n) = 0 时，A* 退化为 Dijkstra（纯按 g(n) 扩展，无启发信息）。\n- h(n) 越接近 h*(n)，A* 扩展的节点越少，搜索越快。\n- h(n) = h*(n) 时，A* 只扩展最优路径上的节点，完美高效但 h* 通常是未知的。`,
    tags: ["A*", "启发函数", "估价函数", "可采纳性", "一致性"],
  },
  {
    id: "aae-graph-algorithms-2",
    chapter: "aae-graph-algorithms",
    level: 2,
    question:
      `用优先队列（最小堆）优化的 Dijkstra 算法的时间复杂度是 O((V+E) log V)。请解释这个复杂度是怎么来的，以及为什么用斐波那契堆可以优化到 O(E + V log V)。`,
    answer:
      `Dijkstra + 优先队列的复杂度分析：\n\n算法流程：\n1. 初始化所有节点距离为 ∞，起点距离为 0，全部入优先队列。\n2. 每次从优先队列取出距离最小的节点 u（EXTRACT-MIN）。\n3. 对 u 的每条出边 (u, v) 做松弛操作：若 dist[u] + w(u,v) < dist[v]，更新 dist[v] 并更新优先队列中 v 的键值（DECREASE-KEY）。\n4. 重复直到优先队列为空。\n\n用最小二叉堆的复杂度：\n- EXTRACT-MIN：每次 O(log V)，共 V 次 → O(V log V)\n- DECREASE-KEY：每次 O(log V)，共 E 次（每条边最多松弛一次）→ O(E log V)\n- 总计：O((V + E) log V)\n\n用斐波那契堆的优化：\n斐波那契堆的摊还复杂度：\n- EXTRACT-MIN：O(log V) 摊还（同二叉堆）\n- DECREASE-KEY：O(1) 摊还（比二叉堆的 O(log V) 更优）\n\n用斐波那契堆的总复杂度：\n- EXTRACT-MIN：V × O(log V) = O(V log V)\n- DECREASE-KEY：E × O(1) = O(E)\n- 总计：O(E + V log V)\n\n什么时候优化显著？\n- 当图是稠密图（E ≈ V²）时：\n  - 二叉堆：O(V² log V)\n  - 斐波那契堆：O(V² + V log V) = O(V²)\n  - 优化了 log V 因子，对大图显著。\n- 当图是稀疏图（E ≈ V）时：\n  - 二叉堆：O(V log V)\n  - 斐波那契堆：O(V log V)\n  - 两者相同，优化不明显。\n\n工程注意：\n- 斐波那契堆虽然理论更优，但常数因子大、实现复杂，实际中常用配对堆（Pairing Heap）或简单的二叉堆，在稀疏图上差异很小。\n- 对稀疏图，Dijkstra + 二叉堆 O(V log V) 已经接近最优。对稠密图，直接用邻接矩阵的 O(V²) Dijkstra 可能比堆版本更快（无堆操作开销）。`,
    tags: ["Dijkstra", "优先队列", "二叉堆", "斐波那契堆", "复杂度优化"],
  },
  {
    id: "aae-graph-algorithms-3",
    chapter: "aae-graph-algorithms",
    level: 3,
    question:
      `什么是最大流最小割定理？请用 Ford-Fulkerson 方法说明最大流的计算过程，并解释残余图（Residual Graph）的作用。`,
    answer:
      `最大流最小割定理：\n\n在一个流网络中，从源点 s 到汇点 t 的最大流量等于 s-t 最小割的容量。即：\n  max_flow(s, t) = min_cut(s, t)\n\n- 割（Cut）：把图分成两个集合 S 和 T = V − S，其中 s ∈ S，t ∈ T。割的容量 = 从 S 到 T 的所有边的容量之和。\n- 最小割：所有 s-t 割中容量最小的那个。\n- 定理含义：网络能通过的最大流量受限于最窄的「瓶颈」（最小割）。\n\nFord-Fulkerson 方法：\n\n核心思想：不断在残余图中寻找增广路径（augmenting path），沿路径增加流量，直到不存在增广路径为止。\n\n算法步骤：\n1. 初始化所有边的流量为 0。\n2. 构建残余图 G_f：\n   - 对每条边 (u, v) 容量 c(u,v)、当前流量 f(u,v)：\n     - 正向残余容量 r(u,v) = c(u,v) − f(u,v)（还能推多少流量）\n     - 反向残余容量 r(v,u) = f(u,v)（能退回多少流量）\n3. 在残余图中找一条从 s 到 t 的路径（增广路径）。\n4. 找到路径上的最小残余容量 Δ（瓶颈），沿路径增加流量 Δ：\n   - 正向边流量 +Δ，反向边流量 −Δ（即允许「撤销」之前的流量）。\n5. 更新残余图，重复步骤 3~4 直到没有增广路径。\n6. 此时从 s 流出的总流量即为最大流。\n\n残余图的作用：\n残余图是 Ford-Fulkerson 的核心机制。它允许算法「反悔」——如果之前沿某条路径推了流量，后来发现更优的路径，可以通过反向边把流量「退回」重新分配。\n\n例子：\n图：s → a (容量3), s → b (容量2), a → b (容量1), a → t (容量2), b → t (容量3)\n\n第一轮：找增广路径 s→a→t，瓶颈 Δ=2，推流 2。当前流：s→a=2, a→t=2。\n第二轮：找增广路径 s→b→t，瓶颈 Δ=2，推流 2。当前流：s→b=2, b→t=2。\n第三轮：找增广路径 s→a→b→t，瓶颈 Δ=1（s→a 残余 1, a→b 残余 1, b→t 残余 1），推流 1。当前流：s→a=3, a→b=1, b→t=3, a→t=2。\n第四轮：残余图中无 s→t 路径，算法终止。\n最大流 = 3 + 2 = 5。\n\n复杂度：\n- Ford-Fulkerson（BFS 找路径 = Edmonds-Karp）：O(V × E²)。BFS 找最短增广路径保证多项式复杂度。\n- Dinic 算法：O(V² × E)，用分层图 + 阻塞流进一步优化。\n- Dinic 对单位容量图：O(E × sqrt(V))。`,
    tags: ["最大流最小割", "Ford-Fulkerson", "残余图", "增广路径", "应用"],
  },
  {
    id: "aae-graph-algorithms-4",
    chapter: "aae-graph-algorithms",
    level: 4,
    question:
      `强连通分量（SCC）的 Tarjan 算法和 Kosaraju 算法各自的时间复杂度和核心思路是什么？为什么 Tarjan 只需一次 DFS 就能完成？`,
    answer:
      `强连通分量（SCC）是有向图中互相可达的极大节点集合。两种经典算法对比：\n\nKosaraju 算法（两次 DFS）：\n\n核心思路：\n1. 第一次 DFS：在原图 G 上按任意顺序 DFS，记录每个节点的完成时间（finishing time）——即后序遍历序列。\n2. 构建转置图 G^T（所有边反向）。\n3. 第二次 DFS：按第一次 DFS 的完成时间逆序（从最晚完成的开始），在 G^T 上 DFS。每次 DFS 访问的所有节点构成一个 SCC。\n\n复杂度：O(V + E)（两次 DFS + 一次转置）。\n\n直觉：完成时间逆序保证在 G^T 上 DFS 时，不会从一个 SCC「穿越」到另一个 SCC。因为原图中 SCC 之间的边在 G^T 中反向，按完成时间逆序处理时，先处理的 SCC 在原图中是「下游」的，不会指向未处理的「上游」SCC。\n\nTarjan 算法（一次 DFS）：\n\n核心思路：\n用一次 DFS + 栈 + 两个数组（dfn 和 low）实现。\n\n关键概念：\n- dfn[u]：节点 u 的 DFS 发现时间（时间戳）。\n- low[u]：节点 u 通过子树和最多一条回边能到达的最早（dfn 最小）的节点。\n- 栈：维护当前 DFS 路径上尚未确定 SCC 的节点。\n\n算法过程：\n1. DFS 访问节点 u，设 dfn[u] = low[u] = 当前时间戳，u 入栈。\n2. 对 u 的每条出边 (u, v)：\n   - 若 v 未访问：递归 DFS(v)，回溯后 low[u] = min(low[u], low[v])。\n   - 若 v 已访问且 v 在栈中：low[u] = min(low[u], dfn[v])（发现回边/横边）。\n3. 如果 low[u] == dfn[u]：u 是某个 SCC 的根。弹出栈中从 u 到栈顶的所有节点，它们构成一个 SCC。\n\n为什么 low[u] == dfn[u] 判定 SCC 根？\n- low[u] == dfn[u] 意味着 u 无法通过子树到达比 u 更早的节点——u 是它的 SCC 中最早被发现的节点（即 SCC 的「入口」）。\n- 如果 low[u] < dfn[u]，说明 u 能到达更早的节点，属于同一个 SCC，不弹栈。\n\n复杂度：O(V + E)（一次 DFS）。\n\n为什么 Tarjan 一次 DFS 就够？\n\nTarjan 的核心洞察：SCC 的结构在 DFS 树中表现为「子树中存在回边连回子树根」。通过 low 值追踪「能回溯到多早」，在回溯到 SCC 根时一次性弹出整个 SCC。\n\n- Kosaraju 需要两次 DFS 是因为：第一次确定访问顺序，第二次在转置图上按序切分 SCC。两步分离，逻辑清晰但需要转置图。\n- Tarjan 把两步合一：在 DFS 过程中同时完成「确定顺序」和「切分 SCC」。low 值和栈配合，在回溯时自动识别 SCC 边界。无需转置图，也无需显式排序。\n\n对比总结：\n- 复杂度：两者都是 O(V + E)，Tarjan 常数更小（一次 DFS vs 两次 DFS + 转置）。\n- 空间：Tarjan 需要栈 + dfn + low 数组；Kosaraju 需要转置图 + 完成序列。\n- 实现难度：Tarjan 的 low 值逻辑较巧妙；Kosaraju 逻辑更直观（两次标准 DFS）。\n- 递归深度：两者都依赖 DFS，大图可能栈溢出，需改为迭代版本。\n- 工程选择：竞赛中 Tarjan 更常用（常数小、代码短）；教学中 Kosaraju 更易理解。`,
    tags: ["综合", "强连通分量", "Tarjan", "Kosaraju", "DFS", "low值"],
  },
];
