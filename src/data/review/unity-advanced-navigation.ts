/** 复习题库 · 地图与寻路（unity-advanced-navigation）。《Unity3D高级编程：主程手记》第8章。 */

import type { ReviewQuestion } from "./types";

export const unityAdvancedNavigationQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "ua-nav-1",
    chapter: "unity-advanced-navigation",
    level: 1,
    question: "A* 算法的核心公式 f(n) = g(n) + h(n) 中，g、h、f 分别代表什么？",
    answer:
      "A* 是一种启发式搜索算法，用于在图/网格中寻找最短路径。公式：**f(n) = g(n) + h(n)**。① **g(n)**——从起点到当前节点 n 的**实际代价**（已确认的最短距离，如已走的格子数 × 单格代价）；② **h(n)**——从当前节点 n 到终点的**启发式估计代价**（heuristic，是预测值而非真实值），常用曼哈顿距离、欧几里得距离、对角距离（Octile/Chebyshev）；③ **f(n)**——当前节点 n 的**总优先级分数**，f 值越小越优先探索。算法流程：维护 Open 列表（待探索节点，按 f 值排序的优先队列）和 Closed 列表（已探索节点）；每次从 Open 取 f 最小的节点扩展，把邻居加入 Open；直到取出终点。h(n) 的选择很关键：① h(n) = 0 → A* 退化为 Dijkstra（保证最短路径但搜索范围大）；② h(n) ≤ 实际最短距离 → A* 保证找到最优解（admissible）；③ h(n) = 实际最短距离 → A* 直接走最优路径，搜索最快；④ h(n) > 实际距离 → 不一定找到最优解，但搜索更快（加权 A* 牺牲最优性换速度）。",
    tags: ["A*", "启发式搜索", "f=g+h", "g值", "h值", "启发函数", "最短路径"],
  },
  {
    id: "ua-nav-2",
    chapter: "unity-advanced-navigation",
    level: 1,
    question: "什么是 NavMesh（导航网格）？相比基于网格的 A*，它有什么优势？",
    answer:
      "**NavMesh（Navigation Mesh，导航网格）** 是用**凸多边形（通常是三角形）**来描述场景中可行走区域的数据结构——不可行走的区域（墙壁、障碍物、悬崖外）不生成多边形，可走区域被分割成相互连接的凸多边形。相比网格 A*（把场景分成方格，每格可走/不可走）：① **表达效率高**——一个大的平坦地面可以用少数几个大三角形表示，而网格需要 N×N 个格子，NavMesh 节点数通常是方格的 1/10~1/100，内存和搜索速度大幅提升；② **路径更自然**——在凸多边形内可以直线行走，路径点少且平滑，不需要像网格那样走直角折线；③ **支持真实几何**——可以表达斜坡、台阶、桥梁（多层高度），自动处理不同高度差的可行走面，网格 A* 需要额外的高度层处理；④ **原生支持跳跃/下落链接**——Off-Mesh Link 可以标记跳跃点、爬梯点、传送门等非行走连接。Unity 的 NavMesh 系统会在编辑器里 Bake 场景，自动生成 NavMesh 数据，运行时 NavMeshAgent 在上面寻路。缺点：NavMesh 需要预烘焙，动态修改场景后需要支持 NavMeshObstacle 或运行时动态烘焙（NavMeshSurface 组件）。",
    tags: ["NavMesh", "导航网格", "凸多边形", "Bake", "可行走区域", "网格寻路", "导航"],
  },

  // ── L2 理解：为什么 / 区别 ──
  {
    id: "ua-nav-3",
    chapter: "unity-advanced-navigation",
    level: 2,
    question: "NavMeshAgent 的常用参数有哪些？它们如何影响寻路和避障行为？",
    answer:
      "**NavMeshAgent** 是 Unity 挂载在 NPC 上执行寻路和移动的组件，核心参数：① **Speed**——移动速度，单位 m/s；② **Angular Speed**——转身角速度（度/s），过小转弯慢会「绕圈」，过大转向生硬；③ **Acceleration**——加速度，控制从静止到最大速度的快慢；④ **Stopping Distance**——距离目标多远停止，设为 0 会穿过目标点再回来震荡，追击敌人时设为攻击范围；⑤ **Radius/Height**——代理的胶囊体半径和高度，影响与障碍物的距离（过小会穿墙，过大无法过门）；⑥ **Obstacle Avoidance Type/Quality**——避障质量（None/LowQuality/Med/High），High 质量避障好但 CPU 开销大，大量 NPC 时要降级；⑦ **Priority**——避障优先级（0~99），低优先级的会绕开高优先级的（如主角优先级最高）；⑧ **Auto Braking**——到达目标是否自动减速停止；⑨ **Auto Traverse Off-Mesh Link**——是否自动跨越 Off-Mesh Link（跳跃/爬梯）。调试时用 `Debug.DrawRay`/Scene 视图的 NavMesh 可视化观察路径，注意 `agent.isPathStale`（路径过期，被障碍挡住需要重新寻路）和 `agent.pathStatus`（PathComplete/PathPartial/PathInvalid）来处理异常情况。",
    tags: ["NavMeshAgent", "Speed", "StoppingDistance", "Radius", "避障", "寻路参数", "代理"],
  },
  {
    id: "ua-nav-4",
    chapter: "unity-advanced-navigation",
    level: 2,
    question: "NavMeshObstacle 的作用是什么？它和 NavMeshAgent 有什么区别？Carve 选项意味着什么？",
    answer:
      "**NavMeshObstacle** 是标记**动态障碍物**的组件——场景中会移动/出现消失的障碍物（如可推动的箱子、玩家放置的路障、关闭的门、Boss 召唤的墙体）。它和 NavMeshAgent 的区别：① NavMeshAgent 是**会主动寻路的行走者**（NPC、玩家），NavMeshObstacle 是**被绕行的障碍物**；② 一个 GameObject 通常不能同时启用两者（Unity 会报错或行为异常），需要动态切换（如玩家操控的角色是 Agent，死亡后变成 Obstacle 让别人绕开）。**Carve（雕刻）** 参数：不勾选时，Obstacle 只影响 Agent 的局部避障（RVO 绕行），NavMesh 本身不变，Agent 寻路时仍认为那里可走——适合小的、短暂的障碍物（如其他 NPC）；勾选 Carve 后，Obstacle 会在 NavMesh 上**「挖一个洞」**（即从可行走区域排除），导致寻路路径会绕开它——适合大的、持续时间长的障碍物（如墙体、关门）。Carve 有 `Move Threshold`（移动超过多远才重新雕刻）和 `Time To Stationary`（静止多久才雕刻）参数，避免移动中的障碍物频繁重烘焙 NavMesh 导致性能抖动。注意：大量 Carve 会导致 NavMesh 重建开销，必须谨慎使用；动态开放世界更推荐使用 NavMeshSurface 的运行时烘焙分区。",
    tags: ["NavMeshObstacle", "动态障碍物", "Carve", "雕刻", "避障", "RVO", "NavMesh动态修改"],
  },
  {
    id: "ua-nav-5",
    chapter: "unity-advanced-navigation",
    level: 2,
    question: "什么是 Off-Mesh Link？它用来解决什么问题？",
    answer:
      "**Off-Mesh Link** 是 NavMesh 中两个不相连可行走区域之间的「**跳跃点链接**」——标记 AI 可以从一个点「非行走地」到达另一个点，用来连接 NavMesh 中不连通但逻辑上可通过的位置。典型场景：① **跳跃跨越**——跳过一个沟、从一个平台跳到相邻平台；② **下落**——从高处跳下来到地面（NavMesh 自动生成 Drop Links）；③ **爬梯/爬墙**——从地面爬上梯子到上层；④ **门/传送点**——传送门、开门才能通过的通道；⑤ **窗户/栏杆翻越**——从窗户翻出去。使用方法：在两个端点放置 Off-Mesh Link 组件的 Start/End（或用 NavMeshLink 组件），Bake 时勾选「Generate Off-Mesh Links」并设置 Jump Distance/Drop Height 参数。运行时 NavMeshAgent 寻路遇到 Off-Mesh Link 时，`agent.isOnOffMeshLink` 变为 true，默认会自动沿连线移动过去（`autoTraverseOffMeshLink = true`），但通常需要自己接管播放跳跃/爬梯动画——在 `OnOffMeshLink` 状态中禁用 Agent 的速度控制，用动画/根运动或自定义位移移动，到达后调用 `agent.CompleteOffMeshLink()` 恢复正常寻路。如果没有 Off-Mesh Link，AI 就无法跨越断开的 NavMesh 区域，会卡在边缘。",
    tags: ["OffMeshLink", "NavMeshLink", "跳跃", "爬梯", "导航链接", "断开连接", "非行走移动"],
  },

  // ── L3 应用：工程实践 ──
  {
    id: "ua-nav-6",
    chapter: "unity-advanced-navigation",
    level: 3,
    question: "A* 的启发函数 h(n) 有哪些选择？在四方向网格、八方向网格、任意角度移动中分别用什么距离？",
    answer:
      "启发函数 h(n) 必须根据**移动规则**选择，满足 admissible（不高估）才能保证最优路径：① **曼哈顿距离（Manhattan Distance）**：`|dx| + |dy|`——只允许上下左右四方向移动时的真实最短步数，是四方向网格的最优 h；② **对角距离（Octile/Chebyshev Distance）**：允许八方向（含斜向）移动时，斜向一步代价是直线的 `√2 ≈ 1.414` 倍，Octile 公式：`max(|dx|,|dy|) + (√2-1) * min(|dx|,|dy|)`，Chebyshev 简化为 `max(|dx|,|dy|)`（斜向代价按1算，有微小高估但简单）；③ **欧几里得距离（Euclidean Distance）**：`√(dx²+dy²)`——允许任意角度/任意方向移动（如 NavMesh 上的直线行走）时的直线距离，是连续空间的最优 h；④ **0 启发**：h=0，退化为 Dijkstra，搜索无方向性但保证最优。**实践技巧**：h 可以适当加权（Weighted A*，`f = g + w*h`，w>1），牺牲一点最优性（路径可能长 1%~5%）但搜索节点数大幅减少，适合对路径质量不极端敏感的游戏寻路；另外注意**整数优化**——为避免浮点运算，把所有距离乘以 10（或 1000）用整数运算，如直移代价 10、斜移代价 14（≈10√2），既快又避免浮点误差。如果 h 计算量太大，也可以用「粗网格预计算」（如 HPA*）查表。",
    tags: ["启发函数", "曼哈顿距离", "欧几里得距离", "对角距离", "Octile", "Chebyshev", "WeightedA*", "h(n)选择"],
  },
  {
    id: "ua-nav-7",
    chapter: "unity-advanced-navigation",
    level: 3,
    question: "JPS（Jump Point Search）跳点搜索为什么比标准 A* 快？它适用于什么场景？",
    answer:
      "**JPS（Jump Point Search）** 是对网格 A* 的重大优化，核心观察是：在网格寻路中，从一个节点向某个方向扩展时，很多邻居节点是「**对称的/必然次优的**」——例如向右直走时，上方和下方的节点如果也是空地，走到它们一定不比从父节点直接走到它们更优，这些节点可以跳过不加入 Open 列表。JPS 只在「**跳点（Jump Point）**」——即必须改变方向才能到达的关键点（如强制邻居 forced neighbor、转折点、跳越障碍后的节点、终点）处停下来加入 Open 列表，中间节点被「跳跃」过。效果：在空旷网格中 JPS 可以把搜索节点数减少一个数量级，速度比标准 A* 快 5~30 倍，且路径最优性不损失（JPS 是最优的）。**约束**：JPS 只适用于**均匀代价网格**（每格移动代价相同），不适用于地形代价不同的网格（如草地慢、沼泽更慢），也不适用于 NavMesh（非网格结构）。**适用场景**：① RTS/SLG 的方格地图；② 俯视/2D 游戏的 Tile 地图；③ MMO 中粗网格的长距离路径规划。Unity 中要自己实现 JPS（或用第三方库），NavMesh 系统不使用 JPS。此外 JPS 在障碍密集的迷宫场景加速比不明显（几乎每个障碍附近都是跳点），但在开阔地形效果极好。",
    tags: ["JPS", "JumpPointSearch", "跳点搜索", "A*优化", "网格寻路", "对称剪枝", "ForcedNeighbor"],
  },

  // ── L4 主程视角：技术决策 ──
  {
    id: "ua-nav-8",
    chapter: "unity-advanced-navigation",
    level: 4,
    question: "当场景中有上百个 NPC 同时寻路时会出现什么性能问题？作为主程你会设计哪些寻路优化策略？",
    answer:
      "大量 NPC 同时寻路会导致：① **CPU 尖峰**——A*/NavMesh 寻路是 CPU 密集计算，上百个 Agent 同帧调用 `SetDestination` 会导致单帧几百毫秒卡顿；② **内存压力**——每个寻路请求分配路径数组，频繁 GC；③ **移动抖动/互相卡死**——大量 Agent 互相避障时出现群聚死锁（RVO 抖动）；④ **主线程阻塞**——Unity 默认 NavMesh 寻路跑在主线程（虽然部分操作可异步）。**优化策略**：① **寻路请求队列 + 分帧/时间片**——不允许同帧发起所有寻路，用队列限制每帧最多处理 N 个请求（如每帧 5~10 个），其余排队延迟几帧执行，玩家完全感知不到但 CPU 峰值被削平；② **路径缓存/复用**——多个 NPC 去同一目标（如追击主角）时共享同一条路径，后面的 NPC 复用前一个的路径（或走 leader 的路径加偏移）；③ **分层寻路（HPA*/Hierarchical Pathfinding）**——先在粗粒度网格/分区（如把大地图分成若干 Tile/Region）上找到高层路径（经过哪些 Region），再在每个 Region 内做细粒度寻路，大幅减少单次搜索节点数；④ **LOD 分级**——远距离 NPC 不走精细寻路，只朝目标方向直线移动或用非常粗的网格，靠近玩家/战斗时再切精细寻路；⑤ **流场/导航场（Flow Field）**——RTS 中大量单位去同一目标时，预先从目标做一次 Dijkstra 扩散生成方向场，每个单位只需查表即可，复杂度 O(N_单位) 而不是 O(N_单位 × 寻路)；⑥ **NavMesh 分区 + 动态加载**——大地图分块烘焙 NavMesh，只在玩家附近加载；⑦ **避免频繁 SetDestination**——目标未变时不要重复调用，目标移动时设置重新规划间隔（如每 0.5s 重算一次而非每帧）；⑧ **异步寻路**——Unity NavMesh 提供 `NavMesh.CalculatePath` 可在 Job System 中运行（需配合 NavMeshWorld），把寻路计算放到子线程/Job 中；⑨ **避障降级**——大量 NPC 时把 Obstacle Avoidance Quality 降为 Low 或 None，用简单的分离力（boids）做群体移动；⑩ **避免反馈循环**——NPC 互相阻挡时不要一直重新寻路，加入随机延迟或备用行为（等待/绕路）。主程决策的关键是**削峰填谷**和**分级处理**，用 Profiler 定位瓶颈是在寻路计算还是避障模拟，再对症下药。",
    tags: ["寻路优化", "请求队列", "分帧", "HPA*", "FlowField", "路径缓存", "异步寻路", "LOD", "大量NPC", "主程决策"],
  },
];
