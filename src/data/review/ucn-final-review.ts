import type { ReviewQuestion } from "./types";

export const ucnFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "ucn-final-review-1",
    chapter: "ucn-final-review",
    level: "B",
    question: "从 C++ 服务器到 Unity 客户端，完整描述一条「玩家释放技能」的消息旅程。",
    answer:
      "① 玩家点击技能按钮 → Unity C# NetworkManager 构造 CastSkillReq(skillId, targetId)；② P/Invoke 调用 C++ 网络层 net_send → Protobuf 序列化 + 填 MsgId(2001) + 长度前缀封包 → TCP 发送；③ C++ 服务器 IO 线程 epoll_wait 收到就绪事件 → recv 读入环形缓冲区 → 长度前缀法拆包；④ 提取 MsgId=2001 → 推入消息队列；⑤ 逻辑线程从队列取消息 → 查路由表找到 CombatHandler::OnCastSkill → Protobuf 反序列化；⑥ 校验 CD/蓝量/射程/状态 → 通过后执行技能逻辑 → 范围检测 → 计算伤害；⑦ 广播 DamageNotify(2005) 给视野内所有玩家 → 持久化 HP 变更到数据库；⑧ 各客户端 net_poll 收到消息 → 播放技能动画 + 受击特效 + 扣血数字。",
    tags: ["全书串联", "消息旅程", "技能"],
  },
  {
    id: "ucn-final-review-2",
    chapter: "ucn-final-review",
    level: "C",
    question: "如果玩家反馈「游戏卡顿」，你会从哪几个维度排查？按优先级排序。",
    answer:
      "① 先确认是网络卡顿还是帧率卡顿——问玩家是「操作延迟」（网络）还是「画面卡」（渲染）；② 网络卡顿排查：检查 RTT（心跳 Ack 计算的往返延迟）是否飙升 → 检查丢包率 → 检查服务器 CPU 是否打满导致逻辑线程处理慢 → 检查消息队列是否堆积（IO 线程收得快但逻辑线程处理不过来）；③ 帧率卡顿排查：Unity Profiler 看 CPU 占比——GC.Alloc（对象池不够）/ Render（DrawCall 过多）/ Scripts（逻辑过重）；④ 如果是特定场景卡：查 AOI 范围是否过大导致广播量爆炸 → 查同屏实体数；⑤ 如果是偶发卡顿：查 GC Spike（大对象分配）/ 网络抖动（丢包导致预测校正瞬移）。原则：用数据定位，不靠猜。",
    tags: ["全书串联", "性能排查", "卡顿", "Profiler"],
  },
  {
    id: "ucn-final-review-3",
    chapter: "ucn-final-review",
    level: "B",
    question: "客户端预测和服务器校正如何配合？校正时如何避免穿墙？",
    answer:
      "客户端预测：玩家按键后立即在本地移动角色（不等服务器），同时发送 MoveReq(pos, dir, seq)。服务器校正：服务器收到后校验位置合法性，广播权威位置。客户端收到后比较偏差——偏差 &lt; 0.5m 平滑插值（lerp），偏差 &gt; 2m 直接瞬移，0.5-2m 快速修正。避免穿墙的关键：① 客户端预测时必须做本地碰撞检测——移动前检测目标位置是否被墙阻挡，被阻挡则不移动；② 服务器校正时如果权威位置和预测位置之间有墙，以服务器位置为准但做碰撞滑动（沿墙滑动而非穿墙）；③ 服务器必须做速度上限校验——如果客户端预测移动速度超过最大值，判定为作弊或 bug，强制拉回。这种「预测-校正」模式在保证服务器权威的同时最大程度减少操作延迟感。",
    tags: ["全书串联", "预测校正", "碰撞", "状态同步"],
  },
  {
    id: "ucn-final-review-4",
    chapter: "ucn-final-review",
    level: "A",
    question: "如果要从零设计一个支持 1000 人同服的 Unity + C++ 网络对战游戏，你会如何做架构分层？",
    answer:
      "分四层：① 服务器 I/O 层——Linux epoll ET + 非阻塞 Socket + 环形缓冲区，IO 线程池收发字节，消息队列解耦到逻辑层；② 协议路由层——Protobuf proto3 定义所有消息 + 长度前缀封包 + MsgId 路由表 + Handler 注册宏，逻辑线程单线程串行处理（无锁）；③ Unity 客户端层——C++ Native Plugin（P/Invoke）跑独立网络线程 + 无锁队列推消息到主线程 + 连接状态机（心跳 5 秒 + 指数退避重连）+ 断线重连状态恢复；④ 玩法同步层——状态同步 + 客户端预测校正（本地玩家）+ 插值渲染 100ms 缓冲（远程玩家）+ 增量同步（只发变化字段 + 量化压缩）+ AOI 九宫格过滤广播范围 + 房间管理（大厅-房间服分离 + MMR 匹配 + 房间状态机 + 崩溃快照恢复）。关键设计：单线程逻辑避免锁、IO 与逻辑分离、客户端预测消除延迟、增量同步省带宽。",
    tags: ["全书串联", "架构设计", "万人同服", "分层"],
  },
];
