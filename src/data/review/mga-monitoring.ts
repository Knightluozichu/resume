import type { ReviewQuestion } from "./types";

export const mgaMonitoringQuestions: ReviewQuestion[] = [
  {
    id: "mga-monitoring-1",
    chapter: "mga-monitoring",
    level: 2,
    question: "Metrics、Logging、Tracing 三者各自解决什么问题？举例说明。",
    answer:
      "Metrics 解决「系统现在怎么样」——如在线人数从 5000 骤降到 2000，说明可能出问题。优势是实时聚合、适合告警。Logging 解决「发生了什么」——如查某玩家为什么掉线，按玩家 ID 检索日志发现是技能校验异常。优势是信息丰富、适合事后排查。Tracing 解决「慢在哪里」——如玩家反馈交易卡顿，Tracing 显示交易请求在经济服耗时 800ms（正常应 &lt; 50ms）。优势是跨服务端到端、适合定位瓶颈。三者互补：Metrics 发现问题、Logging 查细节、Tracing 定位瓶颈。",
    tags: ["可观测性", "Metrics", "Logging", "Tracing"],
  },
  {
    id: "mga-monitoring-2",
    chapter: "mga-monitoring",
    level: 2,
    question: "为什么帧时间是游戏服务端最重要的监控指标之一？",
    answer:
      "游戏服务端是实时循环（如 20Hz/50ms 每帧），帧时间超过帧预算（如 50ms）就意味着逻辑卡顿、玩家操作延迟、状态同步积压。帧时间飙升是服务器过载的最早信号——比 CPU 或内存告警更早、更准确。因为 CPU 使用率高可能是后台 GC，不一定影响玩家体验；而帧时间直接反映玩家感受到的卡顿程度。帧时间 P99 &gt; 帧预算就该告警扩容。",
    tags: ["帧时间", "监控指标", "性能"],
  },
  {
    id: "mga-monitoring-3",
    chapter: "mga-monitoring",
    level: 3,
    question: "如何设计游戏服务端的告警系统，避免告警风暴和告警疲劳？",
    answer:
      "① 分级告警——P0（全服宕机）打电话、P1（单服故障）发短信、P2（性能下降）发钉钉、P3（日志异常）只记录；② 告警聚合——同一问题在短时间内多次触发只告警一次，附带触发次数；③ 依赖感知——如果数据库挂了导致所有服务报错，只告警数据库而非每个服务各告一次；④ 动态阈值——用历史基线做异常检测而非固定阈值（如在线人数下降 20% 才告警，而非低于固定值）；⑤ 告警降噪——维护已知问题列表，正在处理中的问题不重复告警；⑥ On-call 轮值——确保告警有人响应，避免「狼来了」效应。",
    tags: ["告警系统", "运维", "降噪"],
  },
  {
    id: "mga-monitoring-4",
    chapter: "mga-monitoring",
    level: 4,
    question: "在微服务架构中，如何实现全链路追踪？Trace ID 如何在服务间传递？",
    answer:
      "① 入口生成——网关收到客户端请求时生成全局唯一的 Trace ID；② 上下文传递——通过 gRPC metadata（同步调用）或消息头（异步消息）将 Trace ID 传递到下游服务；③ Span 记录——每个服务处理请求时创建 Span（含开始/结束时间、服务名、操作名），Span 附属于同一个 Trace ID；④ 上下文注入——日志中打印 Trace ID，实现日志和链路关联；⑤ 收集上报——各服务将 Span 上报到 Jaeger/Zipkin，按 Trace ID 聚合为完整链路；⑥ 采样策略——全量追踪开销大，生产环境通常采样（如 1%），但对错误请求 100% 采样。关键设计：Trace ID 必须在协议层传递，不能依赖全局变量（跨进程无效）。",
    tags: ["全链路追踪", "Trace ID", "微服务"],
  },
];
