import type { ReviewQuestion } from "./types";

export const ummFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "umm-final-review-1",
    chapter: "umm-final-review",
    level: "B",
    question: "从网络到运维，完整描述一条「玩家释放技能」的消息旅程。",
    answer:
      "① 客户端点击技能按钮，构造 CastSkillReq(skillId, targetId) 消息；② Protobuf 序列化 + 长度前缀封包，通过 TCP 发送；③ 服务器 IO 线程接收、解包、反序列化；④ 逻辑线程校验（CD/蓝量/射程/状态）；⑤ 通过后执行技能逻辑，范围检测找目标，计算伤害；⑥ AOI 系统确定广播范围；⑦ 广播 DamageNotify 给视野内所有客户端；⑧ 客户端播放技能动画、受击特效、扣血数字；⑨ 服务器持久化 HP 变更到数据库。",
    tags: ["全书串联", "消息旅程", "技能"],
  },
  {
    id: "umm-final-review-2",
    chapter: "umm-final-review",
    level: "C",
    question: "如果 MMO 出现卡顿，你会从哪几个维度排查？请按优先级排序。",
    answer:
      "① 先用 Profiler 量化瓶颈——CPU Usage 看 GC.Alloc/Render/Scripts/Physics 各占比；② 如果是 GC Spike，查对象池覆盖率和字符串拼接；③ 如果是渲染瓶颈，查 Draw Call 数量（SRP Batcher 是否生效）、Overdraw、LOD 是否生效；④ 如果是网络延迟，查消息频率（是否需要增量同步/消息合并）、带宽是否超限；⑤ 如果是逻辑瓶颈，查 AOI 范围是否过大、是否有 O(n^2) 遍历；⑥ 如果是内存问题，查 AssetBundle 引用计数和纹理大小。原则：测量优先于猜测。",
    tags: ["全书串联", "性能排查", "Profiler"],
  },
  {
    id: "umm-final-review-3",
    chapter: "umm-final-review",
    level: "B",
    question: "状态同步 MMO 中，客户端预测和服务器校正如何配合？",
    answer:
      "客户端预测：玩家按键后不等服务器回包，立即在本地移动角色（预测），让操作感觉无延迟。服务器校正：服务器收到移动请求后校验位置合法性，广播权威位置。客户端收到后如果偏差小（&lt;0.5 米）平滑插值校正；偏差大（&gt;2 米）直接瞬移到服务器位置（可能是作弊或卡墙）。关键是在预测移动时做本地碰撞检测，避免穿墙，但最终以服务器位置为准。这种「预测-校正」模式在保证服务器权威的同时最大程度减少操作延迟感。",
    tags: ["全书串联", "预测校正", "状态同步"],
  },
  {
    id: "umm-final-review-4",
    chapter: "umm-final-review",
    level: "A",
    question: "如果要从零设计一个支持 5000 人同服的 Unity MMO，你会如何做架构分层？",
    answer:
      "分五层：① 网络层——TCP 长连接 + Protobuf + 长度前缀封包，收发双线程 + 消息队列解耦；② 同步层——状态同步 + 增量同步 + 客户端预测校正，移动用位置量化压缩；③ 逻辑层——角色/战斗/经济系统，服务器权威，所有计算在逻辑线程串行执行（避免锁）；④ 世界层——九宫格 AOI 控制广播范围，场景流式加载（Additive + Addressables）支撑大世界，SubScene 隔离物理；⑤ 运维层——分服部署 + 网关负载均衡 + Lua/HybridCLR 热更 + 灰度发布 + 数据库读写分离。每层之间用消息队列解耦，方便独立扩缩容。",
    tags: ["全书串联", "架构设计", "万人同服"],
  },
];
