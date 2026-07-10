import type { ReviewQuestion } from "./types";

export const mgaInterestManagementQuestions: ReviewQuestion[] = [
  {
    id: "mga-interest-management-1",
    chapter: "mga-interest-management",
    level: 2,
    question: `九宫格 AOI 和十字链表 AOI 各自适合什么场景？`,
    answer:
      `九宫格适合实体分布均匀、密度适中的场景（如野外地图、副本）——网格预分配、查询 O(1) 定位 + O(K) 遍历，实现简单、性能稳定。十字链表适合实体分布稀疏且不均匀的场景（如大世界空旷区域多）——不需要预分配网格、稀疏区域查询效率高，但实现复杂、移动时链表调整开销大。实际项目常混合使用：主城等密集区用九宫格，野外稀疏区用十字链表。`,
    tags: ["九宫格", "十字链表", "AOI 选型"],
  },
  {
    id: "mga-interest-management-2",
    chapter: "mga-interest-management",
    level: 2,
    question: `为什么 AOI 能把网络流量从 O(N²) 降到 O(N×K)？`,
    answer:
      `没有 AOI 时，每个玩家的状态变更要广播给所有 N 个玩家，N 个玩家总共产生 O(N²) 次消息。有 AOI 后，每个玩家只广播给视野内的 K 个玩家（K 远小于 N），N 个玩家总共产生 O(N×K) 次消息。例如万人同服时 N=10000，每人视野内平均 50 人（K=50），流量从 1 亿次/帧降到 50 万次/帧——降低了 200 倍。K 取决于视野半径和实体密度。`,
    tags: ["AOI", "网络流量", "复杂度"],
  },
  {
    id: "mga-interest-management-3",
    chapter: "mga-interest-management",
    level: 3,
    question: `主城广场聚集了 2000 人，九宫格 AOI 单格内仍有大量实体，如何优化？`,
    answer:
      `① 动态网格细分——主城区域用更小的格子（如从 10m 降到 2m），减少单格实体数；② 视觉分层——远处的玩家只同步位置不同步动作/装备，减少单实体的同步数据量；③ LOD 策略——视野内实体超过阈值时只同步最近的 N 个、远处只显示剪影；④ 分频道——主城分多个频道实例，每频道限制人数；⑤ 预渲染——静态站街玩家降频同步（从 20Hz 降到 5Hz）。核心思路：在视觉可接受的范围内降低同步频率和数据量。`,
    tags: ["AOI 优化", "主城", "LOD"],
  },
  {
    id: "mga-interest-management-4",
    chapter: "mga-interest-management",
    level: 4,
    question: `设计一个支持动态密度的 AOI 系统，需要考虑哪些因素？`,
    answer:
      `① 格子大小自适应——根据区域内实体数量动态调整格子粒度，密集区自动细分、稀疏区自动合并；② 迁移开销控制——格子调整时需要重新分配实体，频繁调整本身有开销，需要设置调整阈值（如实体数超过 100 才细分）；③ 边界抖动——玩家在格子边界来回移动会反复触发进入/离开事件，需要加滞回区间（hysteresis）；④ 跨格交互一致性——格子调整过程中正在进行的跨格技能/交易不能中断；⑤ 兴趣列表平滑过渡——格子调整后客户端不应看到实体闪烁，需要做平滑过渡。这是一个在空间效率和计算效率间找平衡的系统设计问题。`,
    tags: ["AOI 设计", "动态密度", "系统设计"],
  },
];
