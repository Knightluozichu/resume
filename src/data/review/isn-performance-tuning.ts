import type { ReviewQuestion } from "./types";

export const isnPerformanceTuningQuestions: ReviewQuestion[] = [
  {
    id: "isn-pt-1",
    chapter: "isn-performance-tuning",
    level: 1,
    question: `性能优化的三个原则是什么？`,
    answer: `性能优化三原则：①先测量再优化——用监控数据定位瓶颈，不要猜 ②优化瓶颈点——提升非瓶颈资源是浪费 ③一次只改一个变量——否则不知道哪个优化生效。性能优化是迭代过程：测量→定位→优化→验证→重复。`,
    tags: ["性能优化", "原则", "瓶颈定位"],
  },
  {
    id: "isn-pt-2",
    chapter: "isn-performance-tuning",
    level: 2,
    question: `零拷贝技术的原理是什么？sendfile和传统read+write的区别？`,
    answer: `零拷贝是减少数据传输中内存拷贝次数的技术。传统文件传输（read+write）需4次拷贝+4次上下文切换：磁盘→内核缓冲区→用户缓冲区→Socket缓冲区→网卡，数据从内核空间拷贝到用户空间再拷回内核空间，浪费且低效。sendfile零拷贝只需2次拷贝+2次上下文切换：磁盘→内核缓冲区→网卡（通过DMA直传），完全绕过用户空间。Nginx默认开启sendfile处理静态文件，是Nginx静态文件处理比Tomcat快的原因之一。`,
    tags: ["零拷贝", "sendfile", "DMA", "上下文切换"],
  },
  {
    id: "isn-pt-3",
    chapter: "isn-performance-tuning",
    level: 3,
    question: `连接池的工作原理是什么？核心参数有哪些？tcp_tw_reuse解决什么问题？`,
    answer: `连接池工作原理：预先创建TCP连接放入池中。请求时从池取连接使用，用完归还到池（不断开），避免每次请求都三次握手建连接。核心参数：最小空闲连接（按低谷QPS设）、最大连接数（按高峰QPS设）、空闲超时（5-10分钟回收）、连接超时（1-3秒等待获取）。tcp_tw_reuse解决TIME_WAIT堆积问题——允许复用出方向的TIME_WAIT连接，避免高并发短连接场景下端口耗尽。相比已废弃的tcp_tw_recycle（NAT环境下丢包），tcp_tw_reuse安全可靠。`,
    tags: ["连接池", "tcp_tw_reuse", "TIME_WAIT", "参数调优"],
  },
  {
    id: "isn-pt-4",
    chapter: "isn-performance-tuning",
    level: 4,
    question: `可观测性三支柱是什么？全链路追踪如何定位性能瓶颈？`,
    answer: `可观测性三支柱：①指标监控（Metrics）——QPS/延迟/错误率/资源使用率，工具Prometheus+Grafana，告诉你「有问题」②链路追踪（Tracing）——一个请求经过所有服务调用的完整链路和耗时，工具Jaeger/Zipkin，告诉你「在哪」③日志聚合（Logging）——请求日志/错误日志/审计日志，工具ELK/Loki，告诉你「为什么」。三者互补形成完整可观测性体系。全链路追踪定位瓶颈：通过TraceID关联请求经过的所有服务调用链，每个服务节点记录Span（耗时/状态/标签）。找出调用链中耗时最长的服务节点——例如用户请求经过网关(5ms)→用户服务(20ms)→订单服务(50ms)→数据库(30ms)，总耗时105ms，瓶颈在订单服务(50ms)，针对性优化订单服务即可。`,
    tags: ["可观测性", "全链路追踪", "Prometheus", "Jaeger"],
  },
];
