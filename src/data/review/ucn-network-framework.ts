import type { ReviewQuestion } from "./types";

export const ucnNetworkFrameworkQuestions: ReviewQuestion[] = [
  {
    id: "ucn-network-framework-1",
    chapter: "ucn-network-framework",
    level: "B",
    question: "心跳机制的作用是什么？心跳间隔和超时阈值如何设定？",
    answer:
      "心跳的两个作用：① 检测连接存活——客户端定期发 HeartbeatReq，服务器回 HeartbeatAck，连续 N 次未收到 Ack 则判定断线；② 时钟同步——Ack 中携带服务器时间戳，客户端据此计算 RTT（往返延迟）和时钟偏移，用于同步插值。参数设定：客户端心跳间隔通常 5 秒（太频繁浪费带宽，太慢检测延迟）；连续 3 次未收到 Ack（15 秒）判定断线；服务器侧 15 秒未收到客户端心跳则主动踢连接。竞技游戏可缩短到 2 秒间隔 + 2 次超时（4 秒断线），休闲游戏可放宽到 10 秒间隔 + 5 次超时。",
    tags: ["心跳", "连接管理", "RTT"],
  },
  {
    id: "ucn-network-framework-2",
    chapter: "ucn-network-framework",
    level: "B",
    question: "什么是指数退避重连？为什么不用固定间隔重连？",
    answer:
      "指数退避：重连失败后，等待时间按 2 的幂次增长——第 1 次等 1 秒，第 2 次等 2 秒，第 3 次等 4 秒，第 N 次等 min(2^(N-1), 30) 秒，封顶 30 秒。不用固定间隔的原因：① 雪崩效应——服务器重启时大量客户端同时以固定间隔重连，形成请求洪峰，可能导致服务器刚启动又被压垮；② 指数退避让重连请求在时间上分散，给服务器恢复时间；③ 用户体验——前几次快速重连（1-4 秒），如果网络确实断了，后续慢速重连（30 秒）不会频繁打扰用户；④ 超过最大次数（如 10 次）后停止重连，提示用户检查网络。",
    tags: ["重连", "指数退避", "连接管理"],
  },
  {
    id: "ucn-network-framework-3",
    chapter: "ucn-network-framework",
    level: "C",
    question: "断线重连后如何恢复游戏状态？需要服务器和客户端各做什么？",
    answer:
      "断线重连的核心是「状态恢复」而非「重新开始」。服务器侧：① 连接断开时不立即销毁玩家数据，标记为「离线挂起」状态，保留角色信息 N 分钟（如 5 分钟）；② 玩家重连后用 Session ID 或 Token 关联旧连接，恢复角色；③ 发送完整的场景快照（当前 HP/位置/Buff/周围实体）让客户端同步到最新。客户端侧：① 重连前缓存未确认的发送消息（带 seq 号），重连后重发；② 收到场景快照后全量更新本地状态——重置所有远程玩家位置、刷新 UI；③ 清理预测缓冲区，以服务器权威状态为准重新开始预测；④ 如果断线超过阈值（如 5 分钟），服务器已清理数据，则视为重新登录。",
    tags: ["重连", "状态恢复", "断线"],
  },
  {
    id: "ucn-network-framework-4",
    chapter: "ucn-network-framework",
    level: "A",
    question: "设计一个连接池管理多服务器连接（大厅+战斗服+聊天服）。连接池需要解决什么问题？",
    answer:
      "连接池解决的问题：① 复用连接——避免频繁创建/销毁 TCP 连接（三次握手开销）；② 统一管理——所有连接共享心跳、重连、状态机逻辑，减少重复代码；③ 负载感知——根据服务器负载动态分配连接。设计：① ConnectionPool 管理多个 Connection 对象，每个 Connection 有目标服务器地址、状态（IDLE/CONNECTED/RECONNECTING）、心跳定时器；② 按服务器类型分池——LobbyPool（1 连接）、BattlePool（1-N 连接，对应不同房间服）、ChatPool（1 连接）；③ 连接断开时自动重连（指数退避），重连成功后恢复订阅；④ 提供统一接口：Send(serverType, msgId, data)，池内部路由到对应连接；⑤ 连接超时无响应时切换备用服务器（如有）。关键：不同服务器类型的心跳间隔和超时阈值不同（战斗服更严格）。",
    tags: ["连接池", "多服务器", "架构", "连接管理"],
  },
];
