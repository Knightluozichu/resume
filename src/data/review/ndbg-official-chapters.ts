import type { ReviewQuestion } from "./types";

export const ndbgOfficialQuestions: ReviewQuestion[] = [
  {
    id: "ndbg-official-learning-map-1",
    chapter: "ndbg-official-learning-map",
    level: 1,
    question: "《Node.js 调试指南》权威学习地图的核心主张是什么？",
    answer:
      "把调试从临时观察升级为可重放的实验：先固定症状和输入，再依次检查 CPU、内存、代码、工具、日志、APM、监控和应用层证据。",
    tags: ["《Node.js 调试指南》权威学习地图", "核心机制"],
  },
  {
    id: "ndbg-official-learning-map-2",
    chapter: "ndbg-official-learning-map",
    level: 2,
    question: "《Node.js 调试指南》权威学习地图覆盖哪些权威目录条目？",
    answer:
      "第1章 CPU、第2章 内存、第3章 代码、第4章 工具、第5章 日志、第6章 APM、第7章 监控、第8章 应用",
    tags: ["《Node.js 调试指南》权威学习地图", "目录覆盖"],
  },
  {
    id: "ndbg-official-learning-map-3",
    chapter: "ndbg-official-learning-map",
    level: 2,
    question: "《Node.js 调试指南》权威学习地图的六阶段诊断链是什么？",
    answer:
      "核验2018版身份 → 定义故障症状 → 固定可重放样本 → 采集性能证据 → 关联代码与遥测 → 恢复并签发",
    tags: ["《Node.js 调试指南》权威学习地图", "诊断链"],
  },
  {
    id: "ndbg-official-learning-map-4",
    chapter: "ndbg-official-learning-map",
    level: 3,
    question: "《Node.js 调试指南》权威学习地图怎样避免把相关图形误判为根因？",
    answer:
      "固定版本、入口、负载与采样窗口，每次只改变一个条件，在首个偏离点让业务、CPU、内存、日志或指标证据交叉验证。",
    tags: ["《Node.js 调试指南》权威学习地图", "证据交叉验证"],
  },
  {
    id: "ndbg-official-learning-map-5",
    chapter: "ndbg-official-learning-map",
    level: 3,
    question: "《Node.js 调试指南》权威学习地图签发时保持什么不变量？",
    answer:
      "8 章 152 个公开目录条目都有明确归属；历史工具、稳定原理与现代替代分层说明，任何结论都能由可重放样本和关闭证据支持。",
    tags: ["《Node.js 调试指南》权威学习地图", "工程验收"],
  },
  {
    id: "ndbg-official-learning-map-6",
    chapter: "ndbg-official-learning-map",
    level: 3,
    question: "《Node.js 调试指南》权威学习地图怎样完成可重放恢复实验？",
    answer:
      "撤销故障后重放同一输入，等待错误率、尾延迟、CPU、堆斜率、活动句柄、日志刷新与报警恢复全部回到预算。",
    tags: ["《Node.js 调试指南》权威学习地图", "恢复实验"],
  },
  {
    id: "ndbg-01-cpu-1",
    chapter: "ndbg-01-cpu",
    level: 1,
    question: "第 1 章 CPU的核心主张是什么？",
    answer:
      "CPU 调试不是寻找最宽的一块颜色，而是在稳定负载下用调用栈样本回答时间花在哪里，再用差分与复测证明修改确实改变了成本。",
    tags: ["第 1 章 CPU", "核心机制"],
  },
  {
    id: "ndbg-01-cpu-2",
    chapter: "ndbg-01-cpu",
    level: 2,
    question: "第 1 章 CPU覆盖哪些权威目录条目？",
    answer:
      "第1章 CPU、1.1 理解perf与火焰图（FlameGraph）、1.1.1 perf、1.1.2 火焰图、1.1.3 红蓝差分火焰图、1.2 使用v8-profiler分析CPU的使用情况、1.3 Tick Processor及Web UI、1.3.1 Tick Processor、1.3.2 Web UI",
    tags: ["第 1 章 CPU", "目录覆盖"],
  },
  {
    id: "ndbg-01-cpu-3",
    chapter: "ndbg-01-cpu",
    level: 2,
    question: "第 1 章 CPU的六阶段诊断链是什么？",
    answer: "固定负载 → 启动采样 → 生成折叠栈 → 识别热点 → 对比分支 → 复测签发",
    tags: ["第 1 章 CPU", "诊断链"],
  },
  {
    id: "ndbg-01-cpu-4",
    chapter: "ndbg-01-cpu",
    level: 3,
    question: "第 1 章 CPU怎样避免把相关图形误判为根因？",
    answer:
      "固定版本、入口、负载与采样窗口，每次只改变一个条件，在首个偏离点让业务、CPU、内存、日志或指标证据交叉验证。",
    tags: ["第 1 章 CPU", "证据交叉验证"],
  },
  {
    id: "ndbg-01-cpu-5",
    chapter: "ndbg-01-cpu",
    level: 3,
    question: "第 1 章 CPU签发时保持什么不变量？",
    answer:
      "同一负载、时长、Node 版本和采样参数下，热点函数与样本占比可以复现；优化后吞吐或延迟改善且错误率不升高。",
    tags: ["第 1 章 CPU", "工程验收"],
  },
  {
    id: "ndbg-01-cpu-6",
    chapter: "ndbg-01-cpu",
    level: 3,
    question: "第 1 章 CPU怎样完成可重放恢复实验？",
    answer:
      "撤销故障后重放同一输入，等待错误率、尾延迟、CPU、堆斜率、活动句柄、日志刷新与报警恢复全部回到预算。",
    tags: ["第 1 章 CPU", "恢复实验"],
  },
  {
    id: "ndbg-02-memory-1",
    chapter: "ndbg-02-memory",
    level: 1,
    question: "第 2 章 内存的核心主张是什么？",
    answer:
      "内存问题要区分堆内对象、外部内存、原生分配和进程常驻集；快照负责回答谁保留对象，Core Dump 负责保留崩溃时的完整进程状态。",
    tags: ["第 2 章 内存", "核心机制"],
  },
  {
    id: "ndbg-02-memory-2",
    chapter: "ndbg-02-memory",
    level: 2,
    question: "第 2 章 内存覆盖哪些权威目录条目？",
    answer:
      "第2章 内存、2.1 gcore与llnode、2.1.1 Core和Core Dump、2.1.2 gcore、2.1.3 llnode、2.1.4 测试Core Dump、2.1.5 分析Core文件、2.1.6 --abort-on-uncaught-exception、2.1.7 小结、2.2 heapdump、2.2.1 使用heapdump、2.2.2 Chrome DevTools、2.2.3 对比快照、2.3 memwatch-next、2.3.1 使用memwatch-next、2.3.2 使用Heap Diff、2.3.3 结合heapdump使用、2.4 cpu-memory-monitor、2.4.1 使用cpu-memory-monitor、2.4.2 cpu-memory-monitor源码解读",
    tags: ["第 2 章 内存", "目录覆盖"],
  },
  {
    id: "ndbg-02-memory-3",
    chapter: "ndbg-02-memory",
    level: 2,
    question: "第 2 章 内存的六阶段诊断链是什么？",
    answer:
      "稳定基线 → 触发增长 → 保存转储 → 追踪保留链 → 修复所有权 → 同负载回放",
    tags: ["第 2 章 内存", "诊断链"],
  },
  {
    id: "ndbg-02-memory-4",
    chapter: "ndbg-02-memory",
    level: 3,
    question: "第 2 章 内存怎样避免把相关图形误判为根因？",
    answer:
      "固定版本、入口、负载与采样窗口，每次只改变一个条件，在首个偏离点让业务、CPU、内存、日志或指标证据交叉验证。",
    tags: ["第 2 章 内存", "证据交叉验证"],
  },
  {
    id: "ndbg-02-memory-5",
    chapter: "ndbg-02-memory",
    level: 3,
    question: "第 2 章 内存签发时保持什么不变量？",
    answer:
      "重复同一负载后，堆占用在可解释区间内回落，快照中的增长对象能追到持有者，进程退出与转储采集不依赖侥幸时序。",
    tags: ["第 2 章 内存", "工程验收"],
  },
  {
    id: "ndbg-02-memory-6",
    chapter: "ndbg-02-memory",
    level: 3,
    question: "第 2 章 内存怎样完成可重放恢复实验？",
    answer:
      "撤销故障后重放同一输入，等待错误率、尾延迟、CPU、堆斜率、活动句柄、日志刷新与报警恢复全部回到预算。",
    tags: ["第 2 章 内存", "恢复实验"],
  },
  {
    id: "ndbg-03-code-1",
    chapter: "ndbg-03-code",
    level: 1,
    question: "第 3 章 代码的核心主张是什么？",
    answer:
      "代码调试把语言语义、运行时优化和异步调度连接起来：Promise 决议错误会伪装成时序问题，栈被截断会隐藏因果，原生扩展错误可能直接破坏进程。",
    tags: ["第 3 章 代码", "核心机制"],
  },
  {
    id: "ndbg-03-code-2",
    chapter: "ndbg-03-code",
    level: 2,
    question: "第 3 章 代码覆盖哪些权威目录条目？",
    answer:
      "第3章 代码、3.1 Promise、3.1.1 Promise/A规范、3.1.2 从零开始实现Promise、3.1.3 Promise的实现原理、3.1.4 safelyResolveThen、3.1.5 doResolve和doReject、3.1.6 Promise.prototype.then和Promise.prototype.catch、3.1.7 值穿透、3.1.8 Promise.resolve和Promise.reject、3.1.9 Promise.all、3.1.10 Promise.race、3.1.11 代码解析、3.2 Async Await、3.2.1 例1：async await、3.2.2 例2：co yield、3.2.3 例3：co yield*、3.2.4 例4：co bluebird、3.2.5 从yield转为yield*遇到的坑、3.2.6 async bluebird、3.3 Error Stack、3.3.1 Stack Trace、3.3.2 Error.captureStackTrace、3.3.3 captureStackTrace在Mongolass中的应用、3.3.4 Error.prepareStackTrace、3.3.5 Error.prepareStackTrace的其他用法、3.3.6 Error.stackTraceLimit、3.3.7 Long Stack Trace、3.4 node@8、3.4.1 Ignition TurboFan、3.4.2 版本的对应关系、3.4.3 try/catch、3.4.4 delete、3.4.5 arguments、3.4.6 async性能提升、3.4.7 不会优化的特性、3.5 Rust Addons、3.5.1 Rust、3.5.2 FFI、3.5.3 Neon、3.5.4 NAPI、3.6 Event Loop、3.6.1 什么是Event Loop、3.6.2 poll阶段、3.6.3 process.nextTick()、3.6.4 代码解析、3.7 处理uncaughtException、3.7.1 uncaughtException、3.7.2 使用llnode、3.7.3 ReDoS",
    tags: ["第 3 章 代码", "目录覆盖"],
  },
  {
    id: "ndbg-03-code-3",
    chapter: "ndbg-03-code",
    level: 2,
    question: "第 3 章 代码的六阶段诊断链是什么？",
    answer:
      "复现异常 → 捕获完整栈 → 展开异步链 → 检查优化状态 → 隔离原生边界 → 验证循环退出",
    tags: ["第 3 章 代码", "诊断链"],
  },
  {
    id: "ndbg-03-code-4",
    chapter: "ndbg-03-code",
    level: 3,
    question: "第 3 章 代码怎样避免把相关图形误判为根因？",
    answer:
      "固定版本、入口、负载与采样窗口，每次只改变一个条件，在首个偏离点让业务、CPU、内存、日志或指标证据交叉验证。",
    tags: ["第 3 章 代码", "证据交叉验证"],
  },
  {
    id: "ndbg-03-code-5",
    chapter: "ndbg-03-code",
    level: 3,
    question: "第 3 章 代码签发时保持什么不变量？",
    answer:
      "每条异步操作只决议一次，错误保留因果链，原生扩展不越过所有权边界，事件循环中每个活动句柄都有创建者与关闭路径。",
    tags: ["第 3 章 代码", "工程验收"],
  },
  {
    id: "ndbg-03-code-6",
    chapter: "ndbg-03-code",
    level: 3,
    question: "第 3 章 代码怎样完成可重放恢复实验？",
    answer:
      "撤销故障后重放同一输入，等待错误率、尾延迟、CPU、堆斜率、活动句柄、日志刷新与报警恢复全部回到预算。",
    tags: ["第 3 章 代码", "恢复实验"],
  },
  {
    id: "ndbg-04-tools-1",
    chapter: "ndbg-04-tools",
    level: 1,
    question: "第 4 章 工具的核心主张是什么？",
    answer:
      "工具只放大证据，不替代实验设计。源码映射错位、断点副作用、调试端口暴露和热重载残留都可能制造新故障，因此会话本身也要被验收。",
    tags: ["第 4 章 工具", "核心机制"],
  },
  {
    id: "ndbg-04-tools-2",
    chapter: "ndbg-04-tools",
    level: 2,
    question: "第 4 章 工具覆盖哪些权威目录条目？",
    answer:
      "第4章 工具、4.1 Source Map、4.1.1 uglify-es、4.1.2 TypeScript、4.1.3 source-map-support的高级用法、4.2 Chrome DevTools、4.2.1 使用Chrome DevTools、4.2.2 NIM、4.2.3 inspect-process、4.2.4 process._debugProcess、4.3 Visual Studio Code、4.3.1 基本调试、4.3.2 launch.json、4.3.3 技巧1：条件断点、4.3.4 技巧2：skipFiles、4.3.5 技巧3：自动重启、4.3.6 技巧4：对特定操作系统的设置、4.3.7 技巧5：多配置、4.3.8 总结、4.4 debug repl2 power-assert、4.4.1 debug、4.4.2 repl2、4.4.3 power-assert、4.5 supervisor-hot-reload、4.5.1 Proxy、4.5.2 用Proxy实现Hot Reload、4.5.3 supervisor-hot-reload、4.5.4 内存泄漏问题",
    tags: ["第 4 章 工具", "目录覆盖"],
  },
  {
    id: "ndbg-04-tools-3",
    chapter: "ndbg-04-tools",
    level: 2,
    question: "第 4 章 工具的六阶段诊断链是什么？",
    answer:
      "保留源码映射 → 启动调试会话 → 配置断点 → 缩小状态空间 → 验证热替换 → 关闭监听资源",
    tags: ["第 4 章 工具", "诊断链"],
  },
  {
    id: "ndbg-04-tools-4",
    chapter: "ndbg-04-tools",
    level: 3,
    question: "第 4 章 工具怎样避免把相关图形误判为根因？",
    answer:
      "固定版本、入口、负载与采样窗口，每次只改变一个条件，在首个偏离点让业务、CPU、内存、日志或指标证据交叉验证。",
    tags: ["第 4 章 工具", "证据交叉验证"],
  },
  {
    id: "ndbg-04-tools-5",
    chapter: "ndbg-04-tools",
    level: 3,
    question: "第 4 章 工具签发时保持什么不变量？",
    answer:
      "编译产物能映射回确定源码，断点不改变业务语义，热重载不会累积监听器或闭包，调试端口不会暴露给不可信网络。",
    tags: ["第 4 章 工具", "工程验收"],
  },
  {
    id: "ndbg-04-tools-6",
    chapter: "ndbg-04-tools",
    level: 3,
    question: "第 4 章 工具怎样完成可重放恢复实验？",
    answer:
      "撤销故障后重放同一输入，等待错误率、尾延迟、CPU、堆斜率、活动句柄、日志刷新与报警恢复全部回到预算。",
    tags: ["第 4 章 工具", "恢复实验"],
  },
  {
    id: "ndbg-05-logging-1",
    chapter: "ndbg-05-logging",
    level: 1,
    question: "第 5 章 日志的核心主张是什么？",
    answer:
      "日志章节解决的不是多打印文本，而是异步调用穿越后如何保持因果。关联标识、时间、错误、阶段和资源标识需要结构化，才能在 ELK、Jaeger 与 Sentry 中交叉验证。",
    tags: ["第 5 章 日志", "核心机制"],
  },
  {
    id: "ndbg-05-logging-2",
    chapter: "ndbg-05-logging",
    level: 2,
    question: "第 5 章 日志覆盖哪些权威目录条目？",
    answer:
      "第5章 日志、5.1 koa-await-breakpoint、5.1.1 koa-await-breakpoint的实现原理、5.1.2 使用koa-await-breakpoint、5.1.3 自定义日志存储、5.2 使用async_hooks、5.3 ELK、5.3.1 安装ELK、5.3.2 使用ELK、5.4 OpenTracing Jaeger、5.4.1 什么是OpenTracing、5.4.2 什么是Jaeger、5.4.3 启动Jaeger及Jaeger UI、5.4.4 使用OpenTracing及Jaeger、5.4.5 koa-await-breakpoint-jaeger、5.5 使用Sentry",
    tags: ["第 5 章 日志", "目录覆盖"],
  },
  {
    id: "ndbg-05-logging-3",
    chapter: "ndbg-05-logging",
    level: 2,
    question: "第 5 章 日志的六阶段诊断链是什么？",
    answer:
      "生成关联标识 → 传播异步上下文 → 结构化记录 → 汇聚与检索 → 连接链路错误 → 复盘采样缺口",
    tags: ["第 5 章 日志", "诊断链"],
  },
  {
    id: "ndbg-05-logging-4",
    chapter: "ndbg-05-logging",
    level: 3,
    question: "第 5 章 日志怎样避免把相关图形误判为根因？",
    answer:
      "固定版本、入口、负载与采样窗口，每次只改变一个条件，在首个偏离点让业务、CPU、内存、日志或指标证据交叉验证。",
    tags: ["第 5 章 日志", "证据交叉验证"],
  },
  {
    id: "ndbg-05-logging-5",
    chapter: "ndbg-05-logging",
    level: 3,
    question: "第 5 章 日志签发时保持什么不变量？",
    answer:
      "同一请求的日志、Span 与错误事件能通过稳定标识关联；敏感字段被清理，采样策略可解释，日志失败不会阻塞或递归破坏业务路径。",
    tags: ["第 5 章 日志", "工程验收"],
  },
  {
    id: "ndbg-05-logging-6",
    chapter: "ndbg-05-logging",
    level: 3,
    question: "第 5 章 日志怎样完成可重放恢复实验？",
    answer:
      "撤销故障后重放同一输入，等待错误率、尾延迟、CPU、堆斜率、活动句柄、日志刷新与报警恢复全部回到预算。",
    tags: ["第 5 章 日志", "恢复实验"],
  },
  {
    id: "ndbg-06-apm-1",
    chapter: "ndbg-06-apm",
    level: 1,
    question: "第 6 章 APM的核心主张是什么？",
    answer:
      "APM 把应用内事务、外部依赖、错误和时延串成拓扑，但自动探针并不自动正确。事务边界、高基数标签、采样偏差与探针成本决定图表能否代表真实系统。",
    tags: ["第 6 章 APM", "核心机制"],
  },
  {
    id: "ndbg-06-apm-2",
    chapter: "ndbg-06-apm",
    level: 2,
    question: "第 6 章 APM覆盖哪些权威目录条目？",
    answer:
      "第6章 APM、6.1 使用NewRelic、6.2 Elastic APM、6.2.1 什么是Elastic APM、6.2.2 启动ELK、6.2.3 启动APM Server、6.2.4 使用Elastic APM、6.2.5 错误日志",
    tags: ["第 6 章 APM", "目录覆盖"],
  },
  {
    id: "ndbg-06-apm-3",
    chapter: "ndbg-06-apm",
    level: 2,
    question: "第 6 章 APM的六阶段诊断链是什么？",
    answer:
      "建立无探针基线 → 接入探针 → 定义事务边界 → 关联错误与Span → 测量观测开销 → 验证采样代表性",
    tags: ["第 6 章 APM", "诊断链"],
  },
  {
    id: "ndbg-06-apm-4",
    chapter: "ndbg-06-apm",
    level: 3,
    question: "第 6 章 APM怎样避免把相关图形误判为根因？",
    answer:
      "固定版本、入口、负载与采样窗口，每次只改变一个条件，在首个偏离点让业务、CPU、内存、日志或指标证据交叉验证。",
    tags: ["第 6 章 APM", "证据交叉验证"],
  },
  {
    id: "ndbg-06-apm-5",
    chapter: "ndbg-06-apm",
    level: 3,
    question: "第 6 章 APM签发时保持什么不变量？",
    answer:
      "APM 接入前后基线可比较，事务命名不会造成高基数，错误与慢 Span 可回到具体请求，探针开销和数据缺口被量化。",
    tags: ["第 6 章 APM", "工程验收"],
  },
  {
    id: "ndbg-06-apm-6",
    chapter: "ndbg-06-apm",
    level: 3,
    question: "第 6 章 APM怎样完成可重放恢复实验？",
    answer:
      "撤销故障后重放同一输入，等待错误率、尾延迟、CPU、堆斜率、活动句柄、日志刷新与报警恢复全部回到预算。",
    tags: ["第 6 章 APM", "恢复实验"],
  },
  {
    id: "ndbg-07-monitoring-1",
    chapter: "ndbg-07-monitoring",
    level: 1,
    question: "第 7 章 监控的核心主张是什么？",
    answer:
      "监控把单次调试证据变成持续信号。指标必须有单位、类型、窗口和标签预算；看板负责解释，报警负责行动，二者都要用故障演练验证。",
    tags: ["第 7 章 监控", "核心机制"],
  },
  {
    id: "ndbg-07-monitoring-2",
    chapter: "ndbg-07-monitoring",
    level: 2,
    question: "第 7 章 监控覆盖哪些权威目录条目？",
    answer:
      "第7章 监控、7.1 Telegraf InfluxDB Grafana（上）、7.1.1 Telegraf（StatsD）InfluxDB Grafana简介、7.1.2 启动docker-statsd-influxdb-grafana、7.1.3 熟悉InfluxDB、7.1.4 配置Grafana、7.1.5 node-statsd、7.1.6 创建Grafana图表、7.1.7 模拟真实环境、7.2 Telegraf InfluxDB Grafana（下）、7.2.1 Grafana ELK、7.2.2 监控报警、7.2.3 脚本一键生成图表",
    tags: ["第 7 章 监控", "目录覆盖"],
  },
  {
    id: "ndbg-07-monitoring-3",
    chapter: "ndbg-07-monitoring",
    level: 2,
    question: "第 7 章 监控的六阶段诊断链是什么？",
    answer:
      "定义服务指标 → 发送StatsD → 写入时序库 → 配置Grafana → 设置报警条件 → 演练恢复通知",
    tags: ["第 7 章 监控", "诊断链"],
  },
  {
    id: "ndbg-07-monitoring-4",
    chapter: "ndbg-07-monitoring",
    level: 3,
    question: "第 7 章 监控怎样避免把相关图形误判为根因？",
    answer:
      "固定版本、入口、负载与采样窗口，每次只改变一个条件，在首个偏离点让业务、CPU、内存、日志或指标证据交叉验证。",
    tags: ["第 7 章 监控", "证据交叉验证"],
  },
  {
    id: "ndbg-07-monitoring-5",
    chapter: "ndbg-07-monitoring",
    level: 3,
    question: "第 7 章 监控签发时保持什么不变量？",
    answer:
      "指标名称、单位、聚合窗口和标签边界稳定；报警能在真实故障前后触发与恢复，不因高基数、缺数或重复通知耗尽监控系统。",
    tags: ["第 7 章 监控", "工程验收"],
  },
  {
    id: "ndbg-07-monitoring-6",
    chapter: "ndbg-07-monitoring",
    level: 3,
    question: "第 7 章 监控怎样完成可重放恢复实验？",
    answer:
      "撤销故障后重放同一输入，等待错误率、尾延迟、CPU、堆斜率、活动句柄、日志刷新与报警恢复全部回到预算。",
    tags: ["第 7 章 监控", "恢复实验"],
  },
  {
    id: "ndbg-08-applications-1",
    chapter: "ndbg-08-applications",
    level: 1,
    question: "第 8 章 应用的核心主张是什么？",
    answer:
      "应用章把前七章合并成现场流程：先用 Clinic 或 AliNode 获得概览，再回到 CPU、堆、日志和指标定位，最终必须用相同业务负载证明恢复。",
    tags: ["第 8 章 应用", "核心机制"],
  },
  {
    id: "ndbg-08-applications-2",
    chapter: "ndbg-08-applications",
    level: 2,
    question: "第 8 章 应用覆盖哪些权威目录条目？",
    answer:
      "第8章 应用、8.1 使用node-clinic、8.2 alinode、8.2.1 什么是alinode、8.2.2 创建alinode应用、8.2.3 安装alinode、8.2.4 使用alinode诊断内存泄漏、8.2.5 使用alinode诊断CPU性能瓶颈",
    tags: ["第 8 章 应用", "目录覆盖"],
  },
  {
    id: "ndbg-08-applications-3",
    chapter: "ndbg-08-applications",
    level: 2,
    question: "第 8 章 应用的六阶段诊断链是什么？",
    answer:
      "复现业务症状 → 运行Clinic → 采集AliNode → 交叉验证证据 → 实施最小修复 → 回归与容量验收",
    tags: ["第 8 章 应用", "诊断链"],
  },
  {
    id: "ndbg-08-applications-4",
    chapter: "ndbg-08-applications",
    level: 3,
    question: "第 8 章 应用怎样避免把相关图形误判为根因？",
    answer:
      "固定版本、入口、负载与采样窗口，每次只改变一个条件，在首个偏离点让业务、CPU、内存、日志或指标证据交叉验证。",
    tags: ["第 8 章 应用", "证据交叉验证"],
  },
  {
    id: "ndbg-08-applications-5",
    chapter: "ndbg-08-applications",
    level: 3,
    question: "第 8 章 应用签发时保持什么不变量？",
    answer:
      "诊断从业务症状出发，至少两类证据指向同一根因；修复后使用原负载回归，并验证 CPU、内存、事件循环与错误率没有转移性退化。",
    tags: ["第 8 章 应用", "工程验收"],
  },
  {
    id: "ndbg-08-applications-6",
    chapter: "ndbg-08-applications",
    level: 3,
    question: "第 8 章 应用怎样完成可重放恢复实验？",
    answer:
      "撤销故障后重放同一输入，等待错误率、尾延迟、CPU、堆斜率、活动句柄、日志刷新与报警恢复全部回到预算。",
    tags: ["第 8 章 应用", "恢复实验"],
  },
  {
    id: "ndbg-official-final-review-1",
    chapter: "ndbg-official-final-review",
    level: 1,
    question: "《Node.js 调试指南》全书总复习的核心主张是什么？",
    answer:
      "总复习不是工具清单，而是一条可审计的故障闭环：业务症状定义优先级，监控确定时间窗，APM 和日志缩小请求，CPU 与内存证据定位机制，回归证明恢复。",
    tags: ["《Node.js 调试指南》全书总复习", "核心机制"],
  },
  {
    id: "ndbg-official-final-review-2",
    chapter: "ndbg-official-final-review",
    level: 2,
    question: "《Node.js 调试指南》全书总复习覆盖哪些权威目录条目？",
    answer:
      "第1章 CPU、第2章 内存、第3章 代码、第4章 工具、第5章 日志、第6章 APM、第7章 监控、第8章 应用",
    tags: ["《Node.js 调试指南》全书总复习", "目录覆盖"],
  },
  {
    id: "ndbg-official-final-review-3",
    chapter: "ndbg-official-final-review",
    level: 2,
    question: "《Node.js 调试指南》全书总复习的六阶段诊断链是什么？",
    answer:
      "报警分诊 → 固定故障样本 → 分层采集证据 → 定位首个根因 → 实施最小修复 → 恢复签发",
    tags: ["《Node.js 调试指南》全书总复习", "诊断链"],
  },
  {
    id: "ndbg-official-final-review-4",
    chapter: "ndbg-official-final-review",
    level: 3,
    question: "《Node.js 调试指南》全书总复习怎样避免把相关图形误判为根因？",
    answer:
      "固定版本、入口、负载与采样窗口，每次只改变一个条件，在首个偏离点让业务、CPU、内存、日志或指标证据交叉验证。",
    tags: ["《Node.js 调试指南》全书总复习", "证据交叉验证"],
  },
  {
    id: "ndbg-official-final-review-5",
    chapter: "ndbg-official-final-review",
    level: 3,
    question: "《Node.js 调试指南》全书总复习签发时保持什么不变量？",
    answer:
      "从报警到根因的时间线可重放，修改只针对首个偏离点；同一负载下症状消失、资源回落、报警恢复且新版本可以回滚。",
    tags: ["《Node.js 调试指南》全书总复习", "工程验收"],
  },
  {
    id: "ndbg-official-final-review-6",
    chapter: "ndbg-official-final-review",
    level: 3,
    question: "《Node.js 调试指南》全书总复习怎样完成可重放恢复实验？",
    answer:
      "撤销故障后重放同一输入，等待错误率、尾延迟、CPU、堆斜率、活动句柄、日志刷新与报警恢复全部回到预算。",
    tags: ["《Node.js 调试指南》全书总复习", "恢复实验"],
  },
];
