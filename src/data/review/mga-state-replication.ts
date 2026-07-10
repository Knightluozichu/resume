import type { ReviewQuestion } from "./types";

export const mgaStateReplicationQuestions: ReviewQuestion[] = [
  {
    id: "mga-state-replication-1",
    chapter: "mga-state-replication",
    level: 2,
    question: `客户端预测和服务器校正的完整流程是什么？`,
    answer:
      `① 客户端采集输入 → ② 本地预测模拟（立即移动）→ ③ 发送输入给服务器 → ④ 服务器权威计算 → ⑤ 服务器返回确认的位置 + 最后确认的输入序号 → ⑥ 客户端丢弃已确认输入 → ⑦ 从服务器位置重新模拟未确认输入 → ⑧ 比对预测位置和校正后位置，偏差小则忽略、偏差大则 snap。玩家看到的是预测位置（流畅），服务器返回的是权威位置（正确），两者通过校正机制收敛。`,
    tags: ["客户端预测", "服务器校正"],
  },
  {
    id: "mga-state-replication-2",
    chapter: "mga-state-replication",
    level: 2,
    question: `为什么远程玩家要用快照插值而不是预测？`,
    answer:
      `本地玩家的输入是已知的，可以准确预测；远程玩家的输入是未知的，无法预测其下一步行动。如果对远程玩家做预测，预测方向经常错误，角色会反复跳变，体验更差。插值的策略是「宁可延迟也不要跳变」——始终渲染 100ms 前的位置，在快照之间平滑过渡。虽然远程玩家看起来比实际位置延迟 100ms，但移动是平滑的，不会突然瞬移。`,
    tags: ["快照插值", "远程玩家"],
  },
  {
    id: "mga-state-replication-3",
    chapter: "mga-state-replication",
    level: 3,
    question: `客户端预测时如果网络延迟突然从 50ms 跳到 300ms，会发生什么？如何缓解？`,
    answer:
      `延迟飙升导致：① pendingInputs 队列堆积——300ms 内的输入都未确认，校正时重模拟的输入变多，CPU 开销增加；② 校正偏差变大——预测的 300ms 和服务器实际的 300ms 差异更大，snap 概率增加，玩家会看到角色瞬移。缓解策略：① 动态调整插值缓冲——延迟增加时增大延迟缓冲（从 100ms 增到 200ms），用更多延迟换取平滑度；② 限制 pendingInputs 长度——超过阈值时停止预测、只做插值；③ 告知玩家网络状况——UI 显示延迟警告。`,
    tags: ["延迟处理", "预测校正", "网络抖动"],
  },
  {
    id: "mga-state-replication-4",
    chapter: "mga-state-replication",
    level: 4,
    question: `状态同步和帧同步的本质区别是什么？各自适合什么游戏类型？`,
    answer:
      `状态同步：服务器计算最终状态（位置/血量）并广播给客户端，客户端只渲染。优点是反作弊强（客户端不知道逻辑）、带宽可控（只传结果）。适合 MMO/RPG——状态多、逻辑复杂、安全要求高。帧同步：服务器只转发客户端输入，所有客户端（包括服务器）各自模拟同一份逻辑，保证确定性。优点是带宽低（只传输入）、回放简单。适合 RTS/格斗——需要精确同步、状态相对简单、需要录像回放。本质区别是「传什么」：状态同步传结果，帧同步传输入。`,
    tags: ["状态同步", "帧同步", "架构对比"],
  },
];
