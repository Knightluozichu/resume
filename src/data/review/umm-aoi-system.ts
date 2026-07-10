import type { ReviewQuestion } from "./types";

export const ummAoiSystemQuestions: ReviewQuestion[] = [
  {
    id: "umm-aoi-system-1",
    chapter: "umm-aoi-system",
    level: 2,
    question: `AOI（Area of Interest）解决什么问题？为什么 MMO 必须要它？`,
    answer:
      `AOI 解决「谁需要知道谁的存在」的问题。万人同服时，如果每个玩家的移动都广播给所有人，服务器每秒要处理 10000*10000 = 1 亿次消息发送，带宽和 CPU 瞬间崩溃。AOI 确保每个玩家只收到视野范围内（如周围 50 米）实体的消息，把消息量从 O(n^2) 降到 O(n*k)（k 为视野内平均实体数），是万人同服的核心技术。`,
    tags: ["AOI", "广播优化", "万人同服"],
  },
  {
    id: "umm-aoi-system-2",
    chapter: "umm-aoi-system",
    level: 3,
    question: `九宫格 AOI 算法的工作原理是什么？有什么优缺点？`,
    answer:
      `原理：把世界划分为固定大小的方格，玩家所在格及周围 8 格（九宫格）内的实体即为「可见实体」。玩家移动时，计算新旧网格差，加载新进入的格子、卸载离开的格子。查询视野只需遍历 9 个格子内的实体列表，O(1) 复杂度。优点：实现简单、查询快。缺点：格子大小固定，不能适应不同视野需求（如望远镜技能）；玩家在格子边界来回走动会导致频繁进出抖动。`,
    tags: ["AOI", "九宫格", "空间索引"],
  },
  {
    id: "umm-aoi-system-3",
    chapter: "umm-aoi-system",
    level: 3,
    question: `十字链表 AOI 算法如何工作？它比九宫格好在哪里？`,
    answer:
      `每个实体同时挂在 X 轴排序链表和 Y 轴排序链表上。查询视野时，在 X 链表上找到 [player.x - range, player.x + range] 区间内的节点，在 Y 链表上找到 [player.y - range, player.y + range] 区间内的节点，取交集即为视野内实体。优点：视野范围可动态变化（range 任意设），不依赖固定格子大小。缺点：实体移动时要更新两条链表的节点位置，维护开销比九宫格大。`,
    tags: ["AOI", "十字链表", "空间索引"],
  },
  {
    id: "umm-aoi-system-4",
    chapter: "umm-aoi-system",
    level: 1,
    question: `玩家在九宫格边界来回走动导致频繁进出（边界抖动）如何解决？`,
    answer:
      `常用「迟滞区间」（hysteresis）解决：加载用较小阈值，卸载用较大阈值。比如玩家在格子 A 中，进入格子 B 距离 5 米内就加载 B 的邻居；但离开 B 距离不到 15 米不卸载。这样玩家在边界 ±5 米范围内来回走动不会触发反复加载/卸载。代价是多保留一些格子在内存中（多占一点内存换稳定性），但避免了抖动导致的性能 spike。`,
    tags: ["AOI", "边界抖动", "迟滞区间"],
  },
];
