import type { ReviewQuestion } from "./types";

export const ummDeploymentQuestions: ReviewQuestion[] = [
  {
    id: "umm-deployment-1",
    chapter: "umm-deployment",
    level: "B",
    question: "MMO 的「分服」架构是什么？为什么不能所有玩家放一个服务器？",
    answer:
      "分服是把玩家按区服分配到独立的服务器进程，每个区服有独立的逻辑线程、数据库实例和网络端口。不能全放一个服务器的原因：① 单机 CPU 和内存有上限，万人在线的逻辑计算和内存占用超出单机能力；② 单点故障会导致全部玩家掉线，风险过高；③ 不同地区玩家网络延迟差异大，分服可以就近部署。分服的代价是跨服交互（如跨服战场）需要额外的跨服中心。",
    tags: ["分服", "架构", "部署"],
  },
  {
    id: "umm-deployment-2",
    chapter: "umm-deployment",
    level: "C",
    question: "合服时如何处理角色 ID 冲突和重名问题？",
    answer:
      "合服流程：① 角色唯一 ID 用全局 UUID 或「原服ID+角色ID」组合，天然避免冲突；② 角色名冲突时用规则处理：先比较充值金额/等级/注册时间，保留优势方的原名，劣势方自动加后缀（如 player_server2），并给予改名卡补偿；③ 公会名冲突类似处理；④ 数据迁移在停服维护窗口内完成，先导出源服数据、ID 映射转换、导入目标服、一致性校验，最后开服。",
    tags: ["合服", "ID冲突", "数据迁移"],
  },
  {
    id: "umm-deployment-3",
    chapter: "umm-deployment",
    level: "B",
    question: "Unity 客户端热更通常有哪些方案？各自的优缺点是什么？",
    answer:
      "常见方案：① Lua 热更（xLua/tolua/SLua）——用 Lua 写逻辑层，C# 写底层，热更 Lua 脚本即可。优点：成熟、社区大；缺点：Lua 性能不如 C#，跨语言调用开销。② ILRuntime——在 C# 中跑一个 IL 解释器，热更 DLL。优点：用 C# 写逻辑、性能接近原生；缺点：部分反射/Emit 不支持、调试困难。③ HybridCLR——Unity 原生 AOT+Interpreter 混合方案。优点：全 C#、性能好、兼容性高；缺点：需要额外编译流程。④ AssetBundle 热更——只热更资源（预制体、贴图），不热更代码。",
    tags: ["热更", "Lua", "ILRuntime", "HybridCLR"],
  },
  {
    id: "umm-deployment-4",
    chapter: "umm-deployment",
    level: "A",
    question: "什么是「灰度发布」？MMO 服务器如何做灰度更新？",
    answer:
      "灰度发布是逐步将新版本推给部分用户，确认无问题后再全量发布。MMO 灰度策略：① 按区服灰度——先更新 1-2 个测试服，观察 24-48 小时无异常后再全服更新；② 按比例灰度——网关层按用户 ID 哈希分流，10% 流量到新版本服务器，90% 在旧版本；③ 回滚机制——新版本出问题时网关一键切回旧版本，数据库做好向前兼容（新版本不删旧字段、不改字段类型）。灰度发布的核心是「小范围试错、快速回滚」，把风险控制在最小范围。",
    tags: ["灰度发布", "回滚", "运维"],
  },
];
