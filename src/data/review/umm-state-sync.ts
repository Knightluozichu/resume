import type { ReviewQuestion } from "./types";

export const ummStateSyncQuestions: ReviewQuestion[] = [
  {
    id: "umm-state-sync-1",
    chapter: "umm-state-sync",
    level: 2,
    question: `状态同步和帧同步的核心区别是什么？`,
    answer:
      `状态同步传「结果」：服务器计算所有逻辑，把最终状态（位置、HP、Buff）广播给客户端，客户端直接渲染。帧同步传「输入」：客户端上传操作指令，服务器收集后广播给所有人，每个客户端各自模拟演算。状态同步省客户端算力但费服务器算力和带宽；帧同步省服务器算力和带宽但要求客户端有确定性模拟能力。`,
    tags: ["状态同步", "帧同步", "同步策略"],
  },
  {
    id: "umm-state-sync-2",
    chapter: "umm-state-sync",
    level: 3,
    question: `为什么帧同步要求浮点确定性？Unity 中如何解决？`,
    answer:
      `帧同步要求所有客户端对相同输入产生完全相同的输出。但浮点运算在不同 CPU 架构上可能产生微小差异，这些差异会累积放大导致不同步。Unity 中解决方案：用定点数替代 float（如 Fixed64）；禁用 Physics 引擎改用自写碰撞；确保随机数用同一种子和算法；避免使用 Time.deltaTime 做逻辑帧。逻辑帧固定步长（如 66ms），渲染插值平滑。`,
    tags: ["帧同步", "浮点确定性", "定点数"],
  },
  {
    id: "umm-state-sync-3",
    chapter: "umm-state-sync",
    level: 2,
    question: `状态同步中「增量同步」是什么？为什么比全量同步更高效？`,
    answer:
      `全量同步每帧发送实体的所有属性（位置、旋转、HP、MP...），即使大部分属性没变。增量同步只发送变化的字段：比如角色移动时只发 position 变化，HP 不变就不发。通过 Protobuf 的 optional 字段或 bitmask 标记哪些字段有效，接收端只更新有变化的属性。带宽节省可达 60-80%，尤其适用于属性多但变化少的 MMO 场景。`,
    tags: ["状态同步", "增量同步", "带宽优化"],
  },
  {
    id: "umm-state-sync-4",
    chapter: "umm-state-sync",
    level: 1,
    question: `一个 MOBA 游戏应该选状态同步还是帧同步？为什么？`,
    answer:
      `MOBA 通常选状态同步（如王者荣耀）。原因：① MOBA 角色属性复杂（装备、符文、等级），帧同步的确定性模拟成本高；② MOBA 需要频繁断线重连，状态同步恢复快（服务器直接下发当前状态），帧同步需要追帧回放；③ MOBA 反作弊要求高，状态同步的服务器权威天然防作弊。帧同步更适合 RTS（如星际争霸）——单位多、操作频繁但逻辑相对简单。`,
    tags: ["状态同步", "帧同步", "MOBA", "架构选型"],
  },
];
