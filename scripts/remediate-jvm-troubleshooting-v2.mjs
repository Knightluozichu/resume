#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const ROOT = process.cwd();
const BOOK = "jvm-troubleshooting";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(ROOT, "src/components/mdx/jvm-troubleshooting/diagrams");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(ROOT, "quality/jvm-troubleshooting-v2-profiles.json");

const SOURCES = {
  book: "https://www.manning.com/books/troubleshooting-java-second-edition",
  preview: "https://www.manning.com/preview/troubleshooting-java-second-edition/chapter-2",
  livebook: "https://livebook.manning.com/book/troubleshooting-java-second-edition/",
  oracle: "https://docs.oracle.com/en/java/javase/25/troubleshoot/index.html",
  jcmd: "https://docs.oracle.com/en/java/javase/25/docs/specs/man/jcmd.html",
  jfr: "https://docs.oracle.com/en/java/javase/25/docs/specs/man/jfr.html",
  jmap: "https://docs.oracle.com/en/java/javase/25/docs/specs/man/jmap.html",
  jfapi: "https://docs.oracle.com/en/java/javase/25/jfapi/index.html",
  visualvm: "https://visualvm.github.io/documentation.html",
  otel: "https://opentelemetry.io/docs/languages/java/",
};

function investigation({
  studio,
  axisA,
  levelsA,
  axisB,
  levelsB,
  signal,
  risk,
  fault,
  task,
  invariant,
  command,
  practiceMode = "diagnosis",
  riskA = 1,
  riskB = -1,
}) {
  return {
    studio,
    axisA: { label: axisA, levels: levelsA },
    axisB: { label: axisB, levels: levelsB },
    outcomes: { signal, risk, evidence: "证据闭环度" },
    fault,
    task,
    invariant,
    command,
    practiceMode,
    riskEffects: [riskA, riskB],
  };
}

function spec({ duty, stages, focuses, docUrl, codeLang = "bash", code, ...model }) {
  return { duty, stages, focuses, docUrl, codeLang, code, model: investigation(model) };
}

const SPECS = {
  "jvt-2e-official-learning-map": spec({
    duty: "把代码理解、调试、日志、剖析、线程、内存、分布式失败与一致性串成由低扰动证据逐步升级的调查路径。",
    stages: ["冻结事件", "提出假设", "低扰动采证", "定向深挖", "修复重放"],
    focuses: ["事件窗口", "版本基线", "假设树", "原始信号", "反例", "交接包"],
    docUrl: SOURCES.oracle,
    code: "java --version\njcmd -l\njfr configure",
    studio: "全书调查路径编排台",
    axisA: "故障可复现度",
    levelsA: ["只见一次", "可控回放", "最小稳定复现"],
    axisB: "证据侵入度",
    levelsB: ["直接暂停", "低频采样", "持续事件流"],
    signal: "路径定位率",
    risk: "观测扰动风险",
    fault: "一开始就用最高侵入工具，改变时序后把观测结果误当原始故障",
    task: "为未知Java故障选择第一项低扰动证据、升级条件和停止条件",
    invariant: "任何根因都能由冻结基线、原始信号、反例与修复重放共同支持",
    command: "jcmd -l",
    practiceMode: "design",
    riskA: -1,
    riskB: 1,
  }),
  "jvt-2e-part-1-foundation": spec({
    duty: "先理解应用代码和正常行为，再决定调试器与日志的使用方式，避免从工具输出直接跳到根因。",
    stages: ["建立地图", "读代码", "动态调试", "日志审计", "互证结论"],
    focuses: ["入口", "依赖", "调用栈", "控制流", "日志字段", "正常基线"],
    docUrl: SOURCES.oracle,
    code: "git rev-parse HEAD\njava --version\nprintenv | sort > environment.txt",
    studio: "基础调查证据梯",
    axisA: "代码熟悉度",
    levelsA: ["黑箱", "入口已知", "依赖与状态已知"],
    axisB: "动态证据",
    levelsB: ["无轨迹", "单次调试", "调试与日志互证"],
    signal: "行为解释度",
    risk: "工具先行偏差",
    fault: "没有正常基线就把第一个异常日志或断点值定义为根因",
    task: "为陌生应用提交入口、关键依赖、正常请求与失败请求四张证据卡",
    invariant: "调查结论必须同时解释正常路径与故障路径的首个分叉",
    command: "git rev-parse HEAD && java --version",
    practiceMode: "design",
  }),
  "jvt-2e-01-starting-to-know-apps": spec({
    duty: "从入口、依赖、外部库、慢路径和崩溃现场建立应用地图，并限制AI只能生成可验证假设。",
    stages: ["识别入口", "绘制依赖", "定义正常", "采集异常", "验证假设"],
    focuses: ["意外输出", "外部库", "慢调用", "崩溃", "AI假设", "学习范围"],
    docUrl: SOURCES.oracle,
    code: "jcmd -l\njcmd <pid> VM.command_line\njcmd <pid> VM.system_properties",
    studio: "陌生应用侦察台",
    axisA: "应用地图深度",
    levelsA: ["只有进程", "入口与依赖", "请求到资源"],
    axisB: "假设证据",
    levelsB: ["AI猜测", "单条信号", "反例互证"],
    signal: "首错定位率",
    risk: "臆测扩散率",
    fault: "把AI摘要、第三方库名称或最后一行异常直接当成根因",
    task: "对一条意外输出建立三种竞争假设，并用一项证据排除其中两项",
    invariant: "AI不接收秘密且不产生最终结论，所有主张回到源码或运行证据",
    command: "jcmd <pid> VM.command_line",
  }),
  "jvt-2e-02-debugging-techniques": spec({
    duty: "利用断点、执行栈、单步与变量观察回答控制流问题，同时衡量暂停对并发和超时的扰动。",
    stages: ["复现输入", "设置断点", "读取调用栈", "单步分叉", "退出验证"],
    focuses: ["断点", "stack frame", "step over", "step into", "变量快照", "暂停扰动"],
    docUrl: SOURCES.preview,
    codeLang: "java",
    code: "int total = order.lines().stream()\n    .mapToInt(Line::price)\n    .sum();\nassert total >= 0;",
    studio: "调试器控制流回放台",
    axisA: "断点位置",
    levelsA: ["入口", "分支前", "首错后"],
    axisB: "暂停范围",
    levelsB: ["暂停全部", "暂停线程", "日志断点"],
    signal: "控制流还原度",
    risk: "暂停时序扰动",
    fault: "全局暂停让锁竞争或外部超时消失，产生无法在线上复现的调试结论",
    task: "沿执行栈找到值第一次偏离不变量的位置，并证明断点没有制造该偏离",
    invariant: "相同输入在无调试器运行时仍出现同一首错",
    command: "debug-breakpoint-at-first-divergence",
    practiceMode: "simulation",
  }),
  "jvt-2e-03-advanced-debugging": spec({
    duty: "使用条件断点、非暂停断点、运行时求值和回退场景缩短调查时间，但不污染被调查状态。",
    stages: ["缩小条件", "采集不暂停", "改变场景", "回退重放", "核对副作用"],
    focuses: ["条件断点", "tracepoint", "求值表达式", "字段修改", "drop frame", "副作用"],
    docUrl: SOURCES.preview,
    codeLang: "java",
    code: "if (request.id().equals(targetId)) {\n  System.err.println(state.snapshot());\n}",
    studio: "高级断点扰动台",
    axisA: "命中筛选",
    levelsA: ["每次命中", "条件命中", "采样命中"],
    axisB: "场景修改",
    levelsB: ["只观察", "临时求值", "修改字段或回退"],
    signal: "有效样本率",
    risk: "状态污染率",
    fault: "在调试器中修改字段后继续运行，却把新路径当成原始程序行为",
    task: "用条件断点捕获唯一目标请求，再以未修改进程重放同一发现",
    invariant: "最终根因证据来自未被调试器改写的独立运行",
    command: "conditional-breakpoint request.id == target",
    practiceMode: "simulation",
  }),
  "jvt-2e-04-logs-auditing": spec({
    duty: "让日志用时间、级别、线程、追踪标识与异常因果链重建行为，同时控制成本、隐私和失败回退。",
    stages: ["定义事件", "记录上下文", "持久传输", "关联时间线", "验证成本"],
    focuses: ["异常cause", "调用栈", "耗时", "线程标识", "日志级别", "敏感字段"],
    docUrl: SOURCES.oracle,
    codeLang: "java",
    code: "long started = System.nanoTime();\ntry { handle(request); }\ncatch (Exception ex) { logger.error(\"request failed id={}\", request.id(), ex); }",
    studio: "结构化日志时间线台",
    axisA: "事件粒度",
    levelsA: ["自由文本", "结构字段", "trace关联字段"],
    axisB: "记录密度",
    levelsB: ["全量DEBUG", "分级采样", "错误加动态窗口"],
    signal: "事件可关联度",
    risk: "成本与泄密风险",
    fault: "吞掉异常cause、记录口令或在热点循环同步刷盘导致故障被日志放大",
    task: "用同一trace id重建失败请求，并证明日志未包含秘密且不会阻塞主路径",
    invariant: "每条关键日志能回答何时、何地、谁、发生什么和因为什么",
    command: "rg 'trace_id=.*ERROR' app.log",
  }),
  "jvt-2e-part-2-deep-diagnosing": spec({
    duty: "在普通调试不足时升级到采样、剖析、锁监测和线程转储，并始终保留工具开销与时间窗口。",
    stages: ["确认症状", "选择采样", "定位热点", "抓取线程", "交叉验证"],
    focuses: ["CPU样本", "分配样本", "SQL调用", "锁等待", "线程转储", "探针成本"],
    docUrl: SOURCES.jfr,
    code: "jcmd <pid> JFR.start name=incident settings=profile duration=60s filename=incident.jfr",
    studio: "深度诊断升级门",
    axisA: "工具深度",
    levelsA: ["运行指标", "采样剖析", "事件与转储"],
    axisB: "窗口代表性",
    levelsB: ["故障外", "覆盖故障", "基线故障对照"],
    signal: "热点解释度",
    risk: "误采样风险",
    fault: "采集窗口没有覆盖故障，却根据最热方法给出优化结论",
    task: "规定从指标升级到JFR或线程转储的触发条件，并保存前后窗口",
    invariant: "深度证据必须覆盖症状窗口并可与稳定基线比较",
    command: "jcmd <pid> JFR.start duration=60s filename=incident.jfr",
    practiceMode: "design",
  }),
  "jvt-2e-05-resource-profiling": spec({
    duty: "用 VisualVM 或 JFR 同时观察 CPU、堆、线程和分配趋势，区分高消耗、慢调用与真正泄漏。",
    stages: ["固定负载", "采集基线", "观察资源", "定位增长", "修复复测"],
    focuses: ["VisualVM", "CPU", "heap", "allocation", "memory leak", "AI脱敏"],
    docUrl: SOURCES.visualvm,
    code: "jcmd <pid> GC.heap_info\njcmd <pid> VM.native_memory summary\njcmd <pid> JFR.start duration=60s filename=profile.jfr",
    studio: "资源曲线与泄漏判别台",
    axisA: "资源压力",
    levelsA: ["稳定负载", "阶梯负载", "负载撤除"],
    axisB: "观测信号",
    levelsB: ["总量", "分配热点", "存活对象路径"],
    signal: "资源归因率",
    risk: "泄漏误判率",
    fault: "只看到堆峰值就宣称泄漏，没有在负载撤除和GC后检查存活趋势",
    task: "执行升载与撤载，比较堆占用、分配速率和GC后基线是否恢复",
    invariant: "泄漏结论必须由持续存活增长及持有路径支持",
    command: "jcmd <pid> GC.class_histogram",
    practiceMode: "calculation",
  }),
  "jvt-2e-06-hidden-profiling": spec({
    duty: "利用采样、调用计数与SQL探针揭示没有明显异常的执行热点，并把框架生成和程序拼接查询还原到请求。",
    stages: ["选择样本", "统计调用", "关联请求", "还原SQL", "验证优化"],
    focuses: ["sampling", "method count", "SQL text", "ORM", "动态SQL", "调用归因"],
    docUrl: SOURCES.jfr,
    code: "jfr view hot-methods recording.jfr\njfr view allocation-by-site recording.jfr",
    studio: "隐藏热点与SQL关联台",
    axisA: "观测对象",
    levelsA: ["CPU样本", "方法计数", "SQL事件"],
    axisB: "关联粒度",
    levelsB: ["进程总量", "线程请求", "trace到查询"],
    signal: "隐藏成本可见度",
    risk: "热点错配率",
    fault: "把高调用次数等同于高总成本，或只优化SQL文本却忽略调用放大",
    task: "把一个高频方法和一条SQL关联到同一请求，分别计算单次与累计成本",
    invariant: "热点结论同时包含频率、单次成本、累计成本与调用来源",
    command: "jfr view hot-methods recording.jfr",
    practiceMode: "calculation",
  }),
  "jvt-2e-07-thread-locks": spec({
    duty: "从线程状态、锁所有者、等待集合与持有时间识别竞争瓶颈，并区分锁等待、条件等待和外部阻塞。",
    stages: ["抓取线程", "识别状态", "定位所有者", "构建等待图", "缩短临界区"],
    focuses: ["BLOCKED", "WAITING", "monitor", "ownable synchronizer", "lock owner", "持有时间"],
    docUrl: SOURCES.jcmd,
    code: "jcmd <pid> Thread.print -l > threads-1.txt\nsleep 5\njcmd <pid> Thread.print -l > threads-2.txt",
    studio: "锁所有权与等待图台",
    axisA: "抓取次数",
    levelsA: ["单次", "相隔5秒两次", "覆盖峰值多次"],
    axisB: "等待分类",
    levelsB: ["只看状态", "锁所有者", "资源与业务动作"],
    signal: "竞争定位率",
    risk: "瞬时快照误判",
    fault: "从一次WAITING状态断言死锁，忽略条件等待、I/O或快照瞬时性",
    task: "比较连续线程快照，找出持续等待链与真正持锁者",
    invariant: "锁瓶颈必须在多次快照中保持同一所有权或等待模式",
    command: "jcmd <pid> Thread.print -l",
    practiceMode: "simulation",
  }),
  "jvt-2e-08-deadlocks-thread-dumps": spec({
    duty: "正确生成、阅读并用工具交叉检查线程转储，依据锁循环而不是线程数量诊断死锁。",
    stages: ["选择时刻", "生成转储", "解析栈帧", "构建锁环", "验证修复"],
    focuses: ["jcmd Thread.print", "plain text", "locked", "waiting to lock", "deadlock cycle", "连续转储"],
    docUrl: SOURCES.jcmd,
    code: "jcmd <pid> Thread.print -l > deadlock.txt\nrg 'Found one Java-level deadlock|waiting to lock|locked' deadlock.txt",
    studio: "线程转储锁环重建台",
    axisA: "转储来源",
    levelsA: ["IDE/剖析器", "jcmd", "容器信号"],
    axisB: "分析方法",
    levelsB: ["搜索状态", "手工锁图", "工具与手工互证"],
    signal: "锁环还原度",
    risk: "死锁误报率",
    fault: "只凭大量BLOCKED线程宣称死锁，没有形成线程—锁—线程的闭合等待环",
    task: "从纯文本转储画出锁环，并用第二次转储确认环未自行解除",
    invariant: "死锁结论包含至少一个闭合等待环及各线程持有/请求关系",
    command: "jcmd <pid> Thread.print -l",
    practiceMode: "simulation",
  }),
  "jvt-2e-part-3-memory": spec({
    duty: "按分配趋势、存活增长、堆转储和GC事件逐级调查内存问题，避免把高内存、泄漏与容量不足混为一类。",
    stages: ["确认症状", "观察分配", "检查存活", "读取堆图", "核对GC"],
    focuses: ["allocation", "live set", "GC roots", "heap dump", "pause", "capacity"],
    docUrl: SOURCES.jmap,
    code: "jcmd <pid> GC.heap_info\njcmd <pid> GC.class_histogram\njcmd <pid> GC.heap_dump filename=heap.hprof",
    studio: "内存证据升级门",
    axisA: "内存现象",
    levelsA: ["高水位", "持续存活增长", "分配失败"],
    axisB: "证据深度",
    levelsB: ["总量", "类直方图", "堆图与GC日志"],
    signal: "内存归因率",
    risk: "转储冲击风险",
    fault: "在线上高峰贸然抓取完整堆转储，造成额外停顿或磁盘耗尽",
    task: "为内存告警选择最低成本证据，并定义升级到heap dump的资源门槛",
    invariant: "调查动作不能让磁盘、停顿或内存压力超过预设安全预算",
    command: "jcmd <pid> GC.heap_info",
    practiceMode: "design",
  }),
  "jvt-2e-09-memory-profiling": spec({
    duty: "用分配采样和对象存活剖析定位增长来源，区分高分配短命对象与被错误持有的长期对象。",
    stages: ["固定负载", "记录分配", "触发稳态", "比较存活", "定位代码"],
    focuses: ["allocation rate", "TLAB", "live object", "class histogram", "call tree", "retention"],
    docUrl: SOURCES.jfr,
    code: "jcmd <pid> JFR.start settings=profile duration=120s filename=memory.jfr\njfr view allocation-by-site memory.jfr",
    studio: "分配与存活对照台",
    axisA: "对象寿命",
    levelsA: ["短命", "跨请求", "持续存活"],
    axisB: "负载阶段",
    levelsB: ["预热", "稳定压力", "撤载恢复"],
    signal: "增长来源命中率",
    risk: "短命对象误报",
    fault: "把分配最多的类型直接当泄漏者，忽略对象已快速回收",
    task: "对比分配热点与GC后存活热点，找出真正持续增长的类型",
    invariant: "泄漏候选在撤载与GC后仍保持增长或异常持有",
    command: "jfr view allocation-by-site memory.jfr",
    practiceMode: "calculation",
  }),
  "jvt-2e-10-heap-dumps": spec({
    duty: "安全获取堆转储，按支配树、保留大小、GC Roots 路径和 OQL 查询识别真正的持有者。",
    stages: ["检查容量", "生成转储", "载入分析", "追踪GC Root", "验证释放"],
    focuses: ["HeapDumpOnOutOfMemoryError", "jcmd", "dominator tree", "retained size", "GC Roots", "OQL"],
    docUrl: SOURCES.jmap,
    code: "df -h /dumps\njcmd <pid> GC.heap_dump filename=/dumps/incident.hprof\nsha256sum /dumps/incident.hprof",
    studio: "堆图持有路径分析台",
    axisA: "转储触发",
    levelsA: ["OOM自动", "维护窗口", "故障现场"],
    axisB: "分析视角",
    levelsB: ["浅大小", "保留大小", "GC Root路径"],
    signal: "持有者定位率",
    risk: "敏感数据暴露",
    fault: "只按shallow size排序，或把含口令和个人数据的hprof上传到非授权服务",
    task: "从大对象集合追到GC Root，说明谁负责释放并验证修复后基线",
    invariant: "堆转储的采集、传输、存储和销毁均受容量与访问控制保护",
    command: "jcmd <pid> GC.heap_dump filename=incident.hprof",
  }),
  "jvt-2e-11-gc-logs": spec({
    duty: "启用、轮转并分析统一GC日志，用暂停分布、回收前后占用和Full GC频率判断延迟、泄漏与容量。",
    stages: ["启用事件", "保存轮转", "解析暂停", "比较占用", "验证调优"],
    focuses: ["Xlog:gc", "rotation", "pause time", "heap after GC", "Full GC", "parallelism"],
    docUrl: SOURCES.oracle,
    code: "java -Xlog:gc*,safepoint:file=gc.log:time,uptime,level,tags:filecount=5,filesize=20m -jar app.jar",
    studio: "GC事件与暂停分布台",
    axisA: "分析指标",
    levelsA: ["平均暂停", "分位数", "占用与事件序列"],
    axisB: "负载坐标",
    levelsB: ["未知", "请求率固定", "请求率与堆固定"],
    signal: "GC症状解释度",
    risk: "参数过调风险",
    fault: "只看到一次Full GC就改收集器或堆大小，没有对照负载、分配率与GC后占用",
    task: "从GC日志计算暂停P95、Full GC频率和GC后live set趋势，再选择是否调优",
    invariant: "任何GC调优都以相同工作量的吞吐、暂停和内存三项回归验证",
    command: "java -Xlog:gc*,safepoint:file=gc.log -jar app.jar",
    practiceMode: "calculation",
  }),
  "jvt-2e-part-4-large-systems": spec({
    duty: "把单JVM调查扩展为跨服务追踪、版本化消息、系统级失败和一致性对账，保持局部证据可关联。",
    stages: ["传播标识", "串联跨度", "核对协议", "识别级联", "对账恢复"],
    focuses: ["trace id", "span", "schema version", "retry", "timeout", "reconciliation"],
    docUrl: SOURCES.otel,
    code: "curl -H 'traceparent: 00-<trace-id>-<span-id>-01' https://service.example/health",
    studio: "跨服务故障关联门",
    axisA: "关联范围",
    levelsA: ["单日志", "单服务trace", "跨服务与数据"],
    axisB: "故障传播",
    levelsB: ["单点", "重试放大", "级联与恢复"],
    signal: "端到端还原度",
    risk: "局部归因风险",
    fault: "只优化最慢服务，却忽略上游超时和重试造成的系统放大",
    task: "为一次跨服务失败画出时间线、重试次数、状态变更和补偿动作",
    invariant: "同一业务动作可从入口追踪到每个副作用及最终对账结果",
    command: "trace-id -> spans -> audit-event -> reconciliation",
    practiceMode: "design",
  }),
  "jvt-2e-12-system-failures": spec({
    duty: "用 trace/span、OpenTelemetry 和协议版本重建 RPC/消息路径，诊断级联失败、重试风暴与超时错配。",
    stages: ["接收请求", "传播上下文", "调用下游", "处理超时", "限制重试"],
    focuses: ["RPC", "messaging", "trace id", "span", "schema mismatch", "retry storm"],
    docUrl: SOURCES.otel,
    codeLang: "java",
    code: "var span = tracer.spanBuilder(\"checkout\").startSpan();\ntry (var scope = span.makeCurrent()) { callInventory(); }\ncatch (Throwable t) { span.recordException(t); throw t; }\nfinally { span.end(); }",
    studio: "级联失败与超时预算台",
    axisA: "下游故障",
    levelsA: ["稳定", "慢响应", "持续拒绝"],
    axisB: "客户端策略",
    levelsB: ["无超时", "截止时间", "截止时间加退避预算"],
    signal: "传播可见度",
    risk: "请求放大率",
    fault: "每一层独立重试且下游超时大于上游截止时间，形成重试风暴",
    task: "计算三层调用的最坏请求放大，并重新分配端到端超时与重试预算",
    invariant: "下游工作不超过入口截止时间，重试总数受单一预算约束",
    command: "trace-id with span status and retry.count",
    practiceMode: "calculation",
    riskA: 1,
    riskB: -1,
  }),
  "jvt-2e-13-consistency-transactions": spec({
    duty: "用领域不变量、审计日志、事件重放、校验和与对账任务定位跨服务数据不一致和多步事务缺口。",
    stages: ["声明不变量", "关联事务", "重放事件", "比较状态", "执行补偿"],
    focuses: ["time anomaly", "domain invariant", "audit log", "missing event", "checksum", "reconciliation"],
    docUrl: SOURCES.otel,
    codeLang: "sql",
    code: "select business_id, sum(amount) as actual\nfrom ledger_entry\ngroup by business_id\nhaving sum(amount) <> 0;",
    studio: "分布式一致性对账台",
    axisA: "状态来源",
    levelsA: ["服务当前值", "审计事件", "事件加权威账本"],
    axisB: "核对方式",
    levelsB: ["抽样", "校验和", "逐业务键对账"],
    signal: "差异发现率",
    risk: "错误补偿风险",
    fault: "按到达时间重放乱序事件，或重复执行无幂等保护的补偿",
    task: "为缺失、重复和乱序事件各造一例，验证不变量、检测和补偿幂等性",
    invariant: "每个业务键的期望状态可由版本化事件和权威来源重新计算",
    command: "reconcile expected_state_hash against actual_state_hash",
    practiceMode: "calculation",
  }),
  "jvt-2e-appendices": spec({
    duty: "把工具、项目启动、延伸阅读、线程、内存和参考资料组织成正式调查前置检查，而不是附录跳读清单。",
    stages: ["准备工具", "打开项目", "补齐知识", "核对线程", "核对内存"],
    focuses: ["工具版本", "构建命令", "阅读来源", "线程模型", "内存区域", "参考身份"],
    docUrl: SOURCES.oracle,
    code: "java --version\njcmd -l\ngit status --short",
    studio: "附录就绪度检查台",
    axisA: "环境就绪度",
    levelsA: ["只有源码", "可构建", "可复现故障"],
    axisB: "基础知识",
    levelsB: ["名词", "状态图", "可运行反例"],
    signal: "调查就绪率",
    risk: "基础缺口率",
    fault: "没有项目版本和运行命令就直接比较不同人的剖析结果",
    task: "提交一份新调查者可在30分钟内复现的工具与项目清单",
    invariant: "未参与准备的人能从空环境重建同一基线",
    command: "java --version && git rev-parse HEAD",
    practiceMode: "design",
  }),
  "jvt-2e-appendix-a-tools": spec({
    duty: "确认JDK、IDE、VisualVM、JFR与命令行工具的版本、权限和数据出口，使采集工具本身可审计。",
    stages: ["列出工具", "锁定版本", "验证权限", "测试采集", "清理数据"],
    focuses: ["JDK", "IDE debugger", "VisualVM", "jcmd", "JFR", "访问权限"],
    docUrl: SOURCES.visualvm,
    code: "java --version\njcmd -l\njfr --version",
    studio: "诊断工具就绪台",
    axisA: "工具来源",
    levelsA: ["未知下载", "官方发行", "校验和锁定"],
    axisB: "采集权限",
    levelsB: ["管理员常开", "按需授权", "最小权限加审计"],
    signal: "工具可信度",
    risk: "权限暴露风险",
    fault: "为方便长期开放attach或管理员权限，并把转储留在共享目录",
    task: "验证工具版本、最小权限、输出位置和清理动作",
    invariant: "工具身份和采集数据生命周期均可追踪",
    command: "java --version && jcmd -l && jfr --version",
    practiceMode: "diagnosis",
  }),
  "jvt-2e-appendix-b-opening-project": spec({
    duty: "从仓库修订、JDK与依赖锁开始打开项目，先用命令行测试建立IDE之外的可移植构建基线。",
    stages: ["取得修订", "核对JDK", "恢复依赖", "运行测试", "导入IDE"],
    focuses: ["commit", "wrapper", "dependency lock", "test", "run config", "working tree"],
    docUrl: SOURCES.oracle,
    code: "git rev-parse HEAD\n./mvnw -q test\n# 或 ./gradlew test",
    studio: "项目复现启动台",
    axisA: "构建入口",
    levelsA: ["IDE按钮", "系统Maven/Gradle", "项目wrapper"],
    axisB: "版本冻结",
    levelsB: ["分支名", "commit", "commit加依赖锁"],
    signal: "构建复现率",
    risk: "环境漂移风险",
    fault: "IDE可以运行但命令行无法构建，调查者实际使用了不同JDK或依赖",
    task: "从干净目录运行测试与故障样例，并保存版本、命令和输出哈希",
    invariant: "IDE与命令行消费同一修订、JDK和依赖图",
    command: "git rev-parse HEAD && ./mvnw test",
    practiceMode: "diagnosis",
  }),
  "jvt-2e-appendix-c-reading": spec({
    duty: "按问题类型选择规范、厂商指南和工具文档，记录版本、访问日期与可推翻当前假设的关键条款。",
    stages: ["定义问题", "选择一手源", "锁定版本", "提取合同", "运行验证"],
    focuses: ["JLS/JVMS", "Oracle guide", "tool manual", "版本日期", "适用边界", "引用证据"],
    docUrl: SOURCES.oracle,
    code: "curl -I https://docs.oracle.com/en/java/javase/25/troubleshoot/index.html",
    studio: "一手资料路由台",
    axisA: "资料层级",
    levelsA: ["二手文章", "厂商指南", "规范与实现文档"],
    axisB: "验证动作",
    levelsB: ["只摘录", "核对版本", "最小实验"],
    signal: "主张可追溯度",
    risk: "过时资料风险",
    fault: "用旧版本博客解释当前JDK行为，却没有核对命令和事件名称",
    task: "为一条JVM主张找到一手来源并设计最小反例",
    invariant: "每条外部主张都绑定版本、原始链接和本地验证",
    command: "record URL, JDK version, claim, counterexample",
    practiceMode: "design",
  }),
  "jvt-2e-appendix-d-threads": spec({
    duty: "用线程生命周期、synchronized、wait/notify、join与并发故障基础支撑锁和转储调查。",
    stages: ["创建线程", "进入运行", "等待或阻塞", "协调唤醒", "终止回收"],
    focuses: ["Thread.State", "synchronized", "wait/notify", "join", "blocking object", "race/deadlock"],
    docUrl: SOURCES.jcmd,
    codeLang: "java",
    code: "var worker = Thread.startVirtualThread(task);\nworker.join();\nSystem.out.println(worker.getState());",
    studio: "线程状态与协调台",
    axisA: "协调方式",
    levelsA: ["忙等", "wait/notify", "并发工具"],
    axisB: "故障类型",
    levelsB: ["竞态", "死锁", "活锁或饥饿"],
    signal: "状态解释度",
    risk: "同步错误率",
    fault: "在错误监视器上调用wait/notify，或用sleep期待建立可见性和顺序",
    task: "分别构造竞态与死锁，使用连续线程转储区分两者",
    invariant: "共享状态访问具有明确happens-before关系且任务最终可终止",
    command: "jcmd <pid> Thread.print -l",
    practiceMode: "simulation",
  }),
  "jvt-2e-appendix-e-memory": spec({
    duty: "区分线程栈、堆、元空间与其他本地内存，使OOM文字、容量指标和对象持有证据指向正确区域。",
    stages: ["识别区域", "观察分配", "找到所有者", "触发边界", "验证恢复"],
    focuses: ["thread stack", "heap", "metaspace", "native memory", "GC root", "OOM type"],
    docUrl: SOURCES.oracle,
    code: "jcmd <pid> GC.heap_info\njcmd <pid> VM.native_memory summary\njcmd <pid> GC.class_histogram",
    studio: "JVM内存区域归因台",
    axisA: "异常区域",
    levelsA: ["栈", "堆", "元空间或本地"],
    axisB: "证据类型",
    levelsB: ["错误文字", "区域指标", "分配与持有路径"],
    signal: "区域命中率",
    risk: "盲目扩容风险",
    fault: "看到进程RSS上涨就只增大-Xmx，实际增长来自线程栈、类元数据或直接内存",
    task: "根据三组指标判断增长区域，并选择只针对该区域的下一项证据",
    invariant: "容量调整必须与实际耗尽区域和持有原因一致",
    command: "jcmd <pid> VM.native_memory summary",
    practiceMode: "calculation",
  }),
  "jvt-2e-appendix-f-references": spec({
    duty: "把书目、规范、工具手册和调查工件登记为可追溯引用，区分事实来源、案例输入与本地推断。",
    stages: ["登记来源", "核对身份", "绑定主张", "保存版本", "审计引用"],
    focuses: ["ISBN", "URL", "文档版本", "命令版本", "事实主张", "本地推断"],
    docUrl: SOURCES.oracle,
    codeLang: "yaml",
    code: "claim: thread-dump-command\nsource: Oracle JDK 25 jcmd manual\nverified_with: jcmd <pid> Thread.print -l",
    studio: "调查引用审计台",
    axisA: "来源身份",
    levelsA: ["无出处", "稳定链接", "版本化一手源"],
    axisB: "本地验证",
    levelsB: ["未验证", "单次命令", "反例与输出"],
    signal: "引用可追溯度",
    risk: "权威误借风险",
    fault: "把目录或工具页面的存在误报为对本地根因的直接证明",
    task: "为三个调查主张分别登记一手来源、最小命令与实际输出",
    invariant: "引用只支持其直接陈述的事实，本地因果结论仍由运行证据承担",
    command: "claim -> source -> version -> local evidence",
    practiceMode: "design",
  }),
  "jvt-2e-official-final-review": spec({
    duty: "在一次综合事件中完成假设树、日志、JFR、线程/堆证据、跨服务追踪、修复与恢复交接。",
    stages: ["冻结事件", "建立时间线", "定位首错", "修复反证", "恢复交接"],
    focuses: ["baseline", "logs", "JFR", "dump", "trace", "reconciliation"],
    docUrl: SOURCES.oracle,
    code: "jcmd -l\njcmd <pid> JFR.start duration=60s filename=incident.jfr\njcmd <pid> Thread.print -l > threads.txt",
    studio: "Java故障综合答辩台",
    axisA: "证据层级",
    levelsA: ["单JVM", "资源与转储", "跨服务与数据"],
    axisB: "闭环程度",
    levelsB: ["定位", "修复", "同输入重放与恢复"],
    signal: "根因复现率",
    risk: "证据缺口率",
    fault: "修复后只看告警消失，没有重放原负载、反例和数据对账",
    task: "向未参与者交付可独立推翻或复现根因的完整事件包",
    invariant: "原始症状由最小修复消失且正常基线、资源和数据状态全部恢复",
    command: "incident bundle: versions + timeline + raw evidence + replay",
    practiceMode: "diagnosis",
    riskA: 1,
    riskB: -1,
  }),
};

const FACT_RULES = [
  [/more easily understand|Starting to know|apps$/i, "先确定入口、关键请求、状态所有者与外部依赖，再把一次正常执行保存为后续差分基线"],
  [/Typical scenarios/i, "意外输出、陌生依赖、慢执行和崩溃需要不同第一证据，调查流程不能统一从高成本转储开始"],
  [/unexpected output/i, "意外输出要沿数据来源和控制分支寻找第一次偏离，最后一处打印通常只是结果暴露点"],
  [/external libraries/i, "外部库调查要固定精确版本、调用边界与配置，并以公开合同和最小调用探针核对"],
  [/slowness/i, "慢是相对于固定工作量和延迟分布的变化；要把CPU、等待、锁、I/O和下游耗时拆开"],
  [/app crashes/i, "崩溃证据包含退出码、异常因果链、致命错误文件、资源状态和崩溃前事件窗口"],
  [/AI as/i, "AI可以压缩日志和生成竞争假设，但输入必须脱敏，结论必须由源码、命令或原始信号确认"],
  [/what you will learn/i, "学习范围横跨调试、日志、剖析、转储和分布式一致性，工具名称不能代替调查能力"],
  [/analyzing code is not enough/i, "静态阅读无法确定真实输入、动态分派与时序时，应选择能最小改变运行的动态观察"],
  [/code with a debugger/i, "调试器能暂停线程并读取栈帧和变量，但暂停范围本身会改变并发、超时和外部交互"],
  [/execution stack trace/i, "执行栈由当前线程的嵌套栈帧组成，需从业务入口、参数与异常位置共同解释调用路径"],
  [/Navigating code/i, "step into、over和out分别改变观察粒度；第一分叉比一直单步到最终错误更有价值"],
  [/debugger might not be enough/i, "不可复现、生产时序或长时间趋势更适合日志、采样、JFR和转储，而非持续暂停"],
  [/conditional breakpoints/i, "条件断点减少无关命中，但条件求值仍有成本和潜在副作用，必须先测试表达式"],
  [/breakpoints that don.t pause/i, "日志断点或tracepoint保存现场而不暂停，适合时序敏感路径但仍要限制输出量"],
  [/altering the investigation/i, "调试期改值只用于探索竞争假设，最终结论必须在未改写状态的独立运行中重现"],
  [/Rewinding/i, "drop frame或回退重执行可能重复I/O和外部副作用，不能被理解成系统级时间倒流"],
  [/issues with logs/i, "日志调查先核对时间同步、格式、采样与缺失区间，再按关联标识构造事件时间线"],
  [/identify exceptions/i, "异常日志必须保留类型、message、cause与完整栈，单独打印message会切断因果链"],
  [/stack traces to identify/i, "异常栈显示调用链和传播位置，不自动证明最顶或最底帧就是根因"],
  [/Measuring time/i, "耗时应使用单调时钟并定义起止边界，单次值不能替代预热后分布和下游分解"],
  [/multithreaded architectures/i, "多线程日志要带线程或任务身份及关联标识，否则交错行无法还原happens-before"],
  [/Implementing logging/i, "实现日志先定义事件合同和字段，再选择框架、编码、异步策略与失败降级"],
  [/Persisting logs/i, "持久化需要轮转、保留、容量与访问策略，磁盘写满不能反向拖垮业务"],
  [/logging levels/i, "级别表达运营严重性和响应动作，运行时动态调整仍需期限与自动恢复"],
  [/Problems caused by logging/i, "同步I/O、巨量序列化、锁竞争和敏感数据泄露都会让日志成为新故障源"],
  [/profiler be useful/i, "剖析器适合回答CPU、分配和调用路径问题，必须先有稳定工作量与明确症状"],
  [/abnormal usage/i, "资源异常是相对基线、负载和容量的偏离，单个绝对值不足以归因"],
  [/what code executes/i, "采样栈近似执行时间分布，采样频率、窗口和未采到并不构成绝对证明"],
  [/Identifying slowness/i, "慢路径需要同时查看自耗时、总耗时、调用次数和等待来源"],
  [/Using a profiler$/i, "启用剖析前要记录附加方式、事件配置、持续时间、输出位置和性能预算"],
  [/VisualVM/i, "VisualVM可观察本地或远程JVM的CPU、堆、线程和转储；远程访问必须最小授权"],
  [/CPU and memory/i, "CPU利用率与堆占用要和吞吐、暂停及负载时间线对齐，平均值会遮住短峰"],
  [/memory leaks/i, "Java泄漏是可达但不再需要的对象持续被持有，要以撤载后的存活趋势和GC Root路径证明"],
  [/AI assistance/i, "转储与日志常含业务数据，AI辅助前要脱敏、最小化并保留人工复核链"],
  [/Sampling to observe/i, "采样周期性抓取栈，低侵入但可能漏掉短方法；热点可信度依赖样本数和代表窗口"],
  [/how many times/i, "调用计数衡量频率而非单次成本，累计影响需要频率与耗时相乘"],
  [/SQL queries an app executes/i, "SQL剖析要把查询文本、绑定参数形状、次数、耗时与请求身份关联"],
  [/not generated by a framework/i, "手写SQL仍可能由字符串拼接和分支改变，必须捕获最终发送给驱动的语句"],
  [/generated by a framework/i, "ORM生成SQL要同时保存实体操作、抓取计划和最终查询，避免只优化表面代码"],
  [/programmatically generated SQL/i, "动态SQL需固定生成输入并规范化查询指纹，防止每个字面量被误算为不同问题"],
  [/Monitoring threads for locks/i, "锁调查要连续抓取线程状态、锁身份和所有者，单次快照只表示一个瞬时切片"],
  [/Analyzing thread locks/i, "BLOCKED表示等待监视器进入，需沿持有者栈找到临界区和外部调用"],
  [/waiting threads/i, "WAITING或TIMED_WAITING可能是正常协调、park、join或I/O，必须结合栈和持续时间分类"],
  [/Getting a thread dump$/i, "线程转储是全进程线程栈和锁状态快照，文件名应包含主机、PID和时间"],
  [/using a profiler/i, "剖析器图形化线程转储便于导航，但原始文本仍应保存以便工具独立复核"],
  [/from the command line/i, "jcmd PID Thread.print -l 可生成带锁信息的转储，命令身份和退出状态要记录"],
  [/Reading thread dumps/i, "阅读从线程名、状态、栈顶阻塞点、锁拥有与等待关系开始，而不是按文件长度判断"],
  [/plain-text thread dumps/i, "纯文本中的locked与waiting to lock能重建等待图，连续快照可区分暂态与持续环"],
  [/tools to better grasp/i, "分析工具可以聚类相同栈和标出死锁，但结论要回查原始锁标识和栈帧"],
  [/Sampling to identify memory/i, "分配采样定位产生对象的代码，不能直接说明对象长期存活或被谁持有"],
  [/Profiling to find the culprit/i, "将分配栈、存活趋势与业务负载对齐，才能从类型热点回到责任代码"],
  [/Obtaining a heap dump$/i, "堆转储通常体积接近堆规模并可能造成停顿，采集前要检查磁盘、权限和业务窗口"],
  [/generate a heap dump when/i, "HeapDumpOnOutOfMemoryError保存OOM现场，HeapDumpPath和磁盘告警必须提前配置"],
  [/heap dump using a profiler/i, "剖析器触发转储前要确认附加权限、目标进程和输出路径，避免抓错实例"],
  [/heap dump with the command/i, "jcmd GC.heap_dump是优先命令之一，完成后要记录大小、哈希和访问控制"],
  [/Reading a heap dump/i, "支配树和retained size用于寻找释放一个对象可连带释放的内存，再沿GC Roots解释持有"],
  [/OQL console/i, "OQL以查询缩小对象集合，查询结果仍需与支配关系和业务生命周期交叉验证"],
  [/Enabling GC logs/i, "统一日志Xlog可选择gc和safepoint标签，时间、uptime与级别让事件可关联"],
  [/Storing GC logs/i, "GC日志要写入容量受控目录并监测写入失败，日志磁盘不能与关键数据争抢"],
  [/configurations for storing/i, "轮转文件数、单文件大小和装饰字段决定保留窗口与解析能力"],
  [/Analyzing GC logs/i, "GC分析把事件原因、前后占用、停顿阶段和并发阶段与同一负载时间线对齐"],
  [/GC pause times/i, "延迟问题看暂停分位数和safepoint原因，不用平均暂停掩盖尾部事件"],
  [/heap usage logs/i, "GC后占用持续上升可提示live set增长，但泄漏仍需对象持有证据"],
  [/full GC events/i, "频繁Full GC可能来自容量、分配、显式GC或元数据压力，必须按事件cause区分"],
  [/parallelism in GC/i, "GC线程并行度会与应用CPU竞争，调优要用固定负载比较吞吐和暂停"],
  [/RPC and messaging/i, "RPC以同步请求响应为主，消息系统以异步交付为主；重试、顺序和幂等合同不同"],
  [/trace IDs and spans/i, "trace id关联整条请求，span表示一个操作及父子关系，二者需要跨进程上下文传播"],
  [/OpenTelemetry/i, "OpenTelemetry定义可移植遥测API、SDK和语义约定，后端工具不改变原始上下文责任"],
  [/Serialization mismatches/i, "消息schema要版本化并测试向前向后兼容，生产者与消费者不能假定同时升级"],
  [/systemic failure modes/i, "系统故障由局部策略相互作用放大，必须从端到端流量和资源反馈解释"],
  [/Cascading failures/i, "级联发生在下游变慢占住上游资源并继续传播，隔离、限流和截止时间可截断"],
  [/Retry storms/i, "多层即时重试使请求数乘法放大，需要单一预算、退避、抖动和幂等"],
  [/Timeout mismatches/i, "上游截止时间应覆盖必要下游步骤且比下游总预算更明确，超时后还要取消无用工作"],
  [/inconsistencies across services/i, "跨服务不一致先声明权威来源和领域不变量，再比较同一业务键的版本"],
  [/time-based anomalies/i, "事件发生时间、处理时间和到达顺序可能不同，水位与版本比墙钟先后更可靠"],
  [/domain invariants/i, "领域不变量把非法状态写成可执行检查，是从海量差异中筛选真实错误的门禁"],
  [/multistep transactions/i, "多步事务要有业务关联标识、每步幂等键与状态转换，不能只看最终一条日志"],
  [/audit logs/i, "审计日志记录不可抵赖的业务变更和主体，不等同于可自由采样的调试日志"],
  [/Replaying events/i, "事件重放需尊重版本、顺序、幂等和副作用隔离，缺失消息要与源端确认"],
  [/consistency guarantees/i, "强一致、读己之写或最终一致等保证要转为可测时间窗和读写条件"],
  [/checksums or hashes/i, "校验和快速比较集合完整性，必须规范化序列化和分区边界以避免假差异"],
  [/reconciliation jobs/i, "对账按业务键比较期望与实际状态，补偿要可重入、限速并保存决议"],
  [/What is a thread/i, "线程是进程内执行序列并共享堆等资源，每个线程拥有自己的栈和调度状态"],
  [/thread.s life cycle/i, "Java线程在NEW、RUNNABLE、等待/阻塞与TERMINATED间迁移，快照不代表持续状态"],
  [/Synchronizing threads/i, "同步既管理互斥也建立内存可见性，最终依据happens-before而非偶然顺序"],
  [/Synchronized blocks/i, "synchronized块以对象监视器为锁，锁对象身份和临界区范围必须稳定"],
  [/wait\(\)|notify/i, "wait释放当前监视器并等待条件，必须在循环中重新检查谓词以应对虚假唤醒"],
  [/Joining threads/i, "join等待目标线程终止并建立可见性，调用方仍需处理超时和中断"],
  [/defined time/i, "sleep或定时等待只影响调度，不自动建立共享状态同步关系"],
  [/blocking objects/i, "锁、条件、信号量和队列把协调意图显式化，选择取决于所有权与容量合同"],
  [/Race conditions/i, "竞态让结果依赖未约束交错，要以重复压力和明确不变量暴露"],
  [/Deadlocks/i, "死锁由闭合等待环使参与者永久无法推进，线程转储可重建锁环"],
  [/Livelocks/i, "活锁中的线程持续行动却互相让步而无进展，需要观察状态变化与完成率"],
  [/Starvation/i, "饥饿是某任务长期得不到CPU、锁或队列机会，整体吞吐正常也可能存在"],
  [/JVM organizes/i, "JVM内存包含堆、线程栈、元空间、代码缓存和直接/本地区域，进程RSS不等于Java堆"],
  [/stack used by threads/i, "每个线程栈保存帧和局部状态，递归深度、帧大小与线程数共同影响内存"],
  [/heap the app uses/i, "堆保存可达对象并受垃圾收集器管理，高占用与泄漏需要通过存活集合区分"],
  [/metaspace/i, "元空间主要保存类元数据并使用本地内存，动态类加载器泄漏可造成持续增长"],
  [/Tools you.ll need/i, "工具清单必须包含来源、版本、权限、采集成本和输出数据生命周期"],
  [/Opening a project/i, "项目打开从精确修订、JDK与构建wrapper开始，IDE只是同一基线的一个入口"],
  [/Recommended further reading/i, "延伸阅读按问题路由到规范、厂商指南和工具手册，并记录目标版本"],
  [/references/i, "引用登记来源身份和直接支持的主张，不能用权威链接替代本地因果证据"],
  [/^Summary$/i, "小结应回到本章的不变量、首错信号、反例与恢复条件，而不是重复工具名称"],
  [/^Part /i, "分部页负责声明相邻章节共用的升级条件、证据接口和不可跨越的前置门禁"],
  [/^Appendices$/i, "附录总览把环境、工具、线程与内存基础变成调查就绪检查，而非可忽略尾页"],
];

function listPages() {
  return fs.readdirSync(CONTENT_ROOT)
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
    .map((sectionSlug) => {
      const dir = path.join(CONTENT_ROOT, sectionSlug);
      const file = fs.readdirSync(dir).find((name) => name.endsWith(".mdx"));
      if (!file) throw new Error(`缺少MDX：${sectionSlug}`);
      return { sectionSlug, chapterSlug: file.replace(/\.mdx$/, ""), filePath: path.join(dir, file) };
    });
}

function pascal(value) {
  return value.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("");
}

function explanation(concept, profile, index) {
  const clean = concept.replace(/^\d+(?:\.\d+)*\s*/, "");
  const rule = FACT_RULES.find(([pattern]) => pattern.test(clean));
  const fact = rule ? rule[1] : `${clean}要进入${profile.stages.join("—")}的调查链，并说明可观察信号与推翻条件`;
  return `${concept}：${fact}。本节点以“${profile.focuses[index % profile.focuses.length]}”为焦点，运行\`${profile.model.command}\`或等价探针，保存原始输出、时间窗、扰动预算和适用边界。`;
}

function sourceBasis(chapterSlug) {
  return chapterSlug === "jvt-2e-02-debugging-techniques" ? "authorized-sample" : "outline-only";
}

function termEntries(profile) {
  return profile.focuses.slice(0, 6).map((term, index) => ({
    term,
    definition: [
      `${term}是${profile.title}调查前需要冻结的症状、环境或时间坐标。`,
      `${term}连接${profile.stages[0]}与${profile.stages[1]}，改变时必须重新建立基线。`,
      `${term}是${profile.title}中的原始信号，不等同于已经证明的根因。`,
      `${term}用于定位${profile.model.outcomes.signal}，同时要报告${profile.model.outcomes.risk}。`,
      `${term}限制${profile.model.axisA.label}和${profile.model.axisB.label}的解释范围。`,
      `${term}进入修复回归与交接包，使未参与者可以独立重放。`,
    ][index],
  }));
}

function profilesFor(pages, manifest) {
  const units = new Map(manifest.units.map((unit) => [unit.id, unit]));
  const formalTitles = manifest.units.map((unit) => unit.title);
  const reviewConcepts = [
    "Freeze the incident baseline",
    "Build competing root-cause hypotheses",
    "Capture low-overhead runtime evidence",
    "Escalate to thread or heap artifacts safely",
    "Correlate services and data side effects",
    "Replay the original failure",
  ];
  return pages.map((page, order) => {
    const parsed = matter(fs.readFileSync(page.filePath, "utf8"));
    const own = SPECS[page.chapterSlug];
    if (!own) throw new Error(`缺少章专属画像：${page.chapterSlug}`);
    const unit = units.get(page.chapterSlug);
    const concepts = unit
      ? unit.concepts.map((alternatives) => alternatives[0])
      : page.chapterSlug.includes("learning-map") ? formalTitles : reviewConcepts;
    const profile = {
      ...page,
      order,
      title: String(parsed.data.title),
      type: String(parsed.data.type ?? "D"),
      concepts,
      componentBase: pascal(page.chapterSlug),
      sourceBasis: sourceBasis(page.chapterSlug),
      ...own,
    };
    return {
      ...profile,
      notes: Object.fromEntries(concepts.map((concept, index) => [concept, explanation(concept, profile, index)])),
    };
  });
}

function wrapper(profile) {
  const props = {
    unitId: profile.chapterSlug,
    unitTitle: profile.title,
    concepts: profile.concepts,
    stages: profile.stages,
    focuses: profile.focuses,
    model: profile.model,
  };
  return `import { OfficialJvt2Studio } from "./official-jvt2-lab";\n\nconst props = ${JSON.stringify(props, null, 2)} as const;\n\nexport function ${profile.componentBase}InvestigationLab() {\n  return <OfficialJvt2Studio {...props} mode="investigation" />;\n}\n\nexport function ${profile.componentBase}TimelineLab() {\n  return <OfficialJvt2Studio {...props} mode="timeline" />;\n}\n\nexport function ${profile.componentBase}EvidenceLab() {\n  return <OfficialJvt2Studio {...props} mode="evidence" />;\n}\n`;
}

function render(profile) {
  const terms = termEntries(profile);
  const deep = profile.concepts.map((concept, index) => `### ${concept}\n\n**四级证据 ${index + 1}/${profile.concepts.length}。** ${profile.notes[concept]}\n\n验证 ${concept} 时，先预测它在 ${profile.stages[index % profile.stages.length]} 阶段怎样改变${profile.model.outcomes.signal}；随后只调整${profile.model.axisA.label}或${profile.model.axisB.label}。若“${profile.model.fault}”没有制造预期首错，就撤回当前假设并检查替代解释。`).join("\n\n");
  const practices = profile.concepts.map((concept, index) => `${index + 1}. ${concept}：用${profile.focuses[index % profile.focuses.length]}定位观察点，运行\`${profile.model.command}\`或同义探针，补齐基线、故障、恢复和复位证据。`).join("\n");
  const glossary = terms.map(({ term, definition }) => `  <GlossaryItem term=${JSON.stringify(term)}>${definition}</GlossaryItem>`).join("\n");
  const sourceText = profile.sourceBasis === "authorized-sample"
    ? `Manning还提供[第2章合法试读](${SOURCES.preview})；试读用于核对该章公开范围与工具语境，不向其他章节外推。`
    : "本页未取得原书正文，完整目录只用于限定单元和小节范围，不宣称正文忠实。";
  return `import {\n  ${profile.componentBase}InvestigationLab,\n  ${profile.componentBase}TimelineLab,\n  ${profile.componentBase}EvidenceLab,\n} from "@/components/mdx/jvm-troubleshooting/diagrams/${profile.chapterSlug}";\nimport { Objectives, Callout, Glossary, GlossaryItem, Term, Exercises, Answer, Stepper, Step, Attribution } from "@/components/mdx/mdx-components";\n\n<Objectives>\n\n- 能解释${profile.duty}\n- 能沿${profile.stages.join("、")}建立本章可证伪的调查链\n- 能操作${profile.model.studio}，只改变${profile.model.axisA.label}或${profile.model.axisB.label}中的一项\n- 能注入“${profile.model.fault}”，用${profile.model.invariant}判断修复、恢复和交接是否通过\n\n</Objectives>\n\n{/* JVT_QUALITY_V2 */}\n\n## 为什么从“${profile.model.studio}”开始\n\n${profile.title}要解决的是${profile.duty} 直觉上，最后出现的异常、最热的方法和最大的对象都只是信号；根因必须解释正常与故障时间线的第一个分叉，并能让原反例在最小修复后稳定转为通过。\n\n先预测：把${profile.model.axisA.label}从“${profile.model.axisA.levels[1]}”切换到“${profile.model.axisA.levels[2]}”，${profile.model.outcomes.signal}和${profile.model.outcomes.risk}将怎样变化？运行前写下能推翻假设的观察，结果不符时修改假设而不是删除失败样本。\n\n## 来源、版次与独立重写边界\n\nManning[官方产品页](${SOURCES.book})确认 Laurențiu Spilcă《Troubleshooting Java》第2版于2025年10月出版、360页、ISBN 9781633435575，并公开4个Part、13章、附录A–F的完整目录；课程映射24个正式单元、138个目录节点，另设学习地图与总复习。${sourceText}\n\n本页机制以[Oracle JDK 25故障排查指南](${SOURCES.oracle})、[jcmd手册](${SOURCES.jcmd})、[JFR手册](${SOURCES.jfr})、[VisualVM官方文档](${SOURCES.visualvm})和[OpenTelemetry Java文档](${SOURCES.otel})中的适用部分独立核验。中文解释、命令组织、交互模型、练习与答案均为独立教学重写；工具文档许可证不被误报为原书授权。\n\n## 本章术语与调查合同\n\n${terms.map(({ term, definition }) => `<Term def=${JSON.stringify(definition)}>${term}</Term>`).join("、")}。\n\n${profile.title}必须守住“${profile.model.invariant}”。${profile.model.axisA.label}与${profile.model.axisB.label}是离散调查坐标，${profile.model.outcomes.signal}和${profile.model.outcomes.risk}分开报告；交互中的数值只表达透明因果方向，不是假装采集了真实生产指标。\n\n## 先预测，再操作三层章专属实验\n\n<Stepper>\n  <Step title="1. 目录节点与可证伪假设">\n    选择正式节点，指出它位于${profile.stages.join("、")}的哪一步，以及哪项原始信号能推翻当前假设。\n\n    <${profile.componentBase}InvestigationLab />\n  </Step>\n  <Step title="2. 单变量时间线对照">\n    一次只切换${profile.model.axisA.label}或${profile.model.axisB.label}，运行本章命令并比较基线与故障窗口。\n\n    <${profile.componentBase}TimelineLab />\n  </Step>\n  <Step title="3. 故障、恢复与复位">\n    注入“${profile.model.fault}”，保存首个分叉；修复后使用同一负载重放，最后点击重置核对初值。\n\n    <${profile.componentBase}EvidenceLab />\n  </Step>\n</Stepper>\n\n## 官方目录逐项深读\n\n${deep}\n\n## 最小调查切片\n\n\u0060\u0060\u0060${profile.codeLang}\n${profile.code}\n\u0060\u0060\u0060\n\n${profile.title}运行该切片时要固定主机、容器、进程、JDK、应用commit、配置、负载与时间窗；所有日志、JFR、线程转储和堆转储都写入受控目录并登记大小、哈希、权限和删除期限。命令失败或超出扰动预算时立即停止，不把半份工件包装成完整证据。\n\n\u0060\u0060\u0060yaml\nunit: ${profile.chapterSlug}\ncommand: ${JSON.stringify(profile.model.command)}\nbaseline: frozen\nfault: ${JSON.stringify(profile.model.fault)}\ninvariant: ${JSON.stringify(profile.model.invariant)}\nreplay: same_input_same_window\n\u0060\u0060\u0060\n\n## 三个必须主动触发的误区\n\n<Callout type="trap" title="信号不等于根因">\n  ${profile.title}中的${profile.model.outcomes.signal}只能缩小假设；必须用源码、竞争假设和反例解释为什么该信号出现。\n</Callout>\n\n<Callout type="trap" title="调查动作改变现场">\n  ${profile.model.fault}。保存工具配置和扰动预算，必要时退回低侵入采样，并在未附加工具的运行中确认首错。\n</Callout>\n\n<Callout type="trap" title="修复后只看告警消失">\n  ${profile.title}的修复要重放原负载、原故障和正常基线；资源、线程、数据与外部副作用都恢复，才满足${profile.model.invariant}。\n</Callout>\n\n## 练习、答案与节点验证\n\n<Exercises>\n\n**问题 1：假设与单变量。** 怎样验证${profile.model.axisA.label}而不让${profile.model.axisB.label}混入因果结论？\n\n<Answer>\n  固定应用commit、JDK、负载、时间窗和${profile.model.axisB.label}，只把${profile.model.axisA.label}从“${profile.model.axisA.levels[1]}”切到“${profile.model.axisA.levels[2]}”；保存${profile.model.outcomes.signal}、${profile.model.outcomes.risk}和首个分叉。\n</Answer>\n\n**问题 2：逐节点四级证据。** 正式目录节点怎样从出现升级为解释、交互和练习验证？\n\n<Answer>\n${practices}\n</Answer>\n\n**问题 3：恢复闭环。** 注入“${profile.model.fault}”后如何证明根因和修复？\n\n<Answer>\n  沿${profile.stages.join("、")}定位首错，只改变最小因果前提；随后用相同输入重放正常、故障、恢复和复位四条轨迹。只有${profile.model.invariant}再次成立，调查才通过。\n</Answer>\n\n</Exercises>\n\n## 术语复核与本章回顾\n\n<Glossary>\n${glossary}\n</Glossary>\n\n完成${profile.title}意味着能说明${profile.duty}，能运行本章调查切片，能主动制造“${profile.model.fault}”，还能用原始信号和反例证明修复而非只展示工具截图。\n\n<Attribution\n  mode="independent-rewrite"\n  sourceBasis="${profile.sourceBasis}"\n  workTitle="Laurențiu Spilcă, Troubleshooting Java, Second Edition"\n  adaptedUrl="${SOURCES.book}"\n/>\n`;
}

function updateManifest(manifest, profiles) {
  manifest.sourceKind = "publisher-official-complete-outline-authorized-chapter-2-preview-and-primary-jdk-tool-docs";
  manifest.status = "verified-outline-sample-independent-rewrite";
  manifest.verifiedAt = "2026-07-20";
  manifest.sourceAccess = "outline-only";
  manifest.defaultSourceMode = "independent-rewrite";
  manifest.coverage = { formalUnits: 24, outlineNodes: 138, pages: 26 };
  manifest.disclosureNote = "Manning官方产品页与liveBook预览核定第2版、出版信息、4个Part、13章、附录A-F及138个正式节点；第2章提供合法试读，其余单元仅以完整目录界定范围。课程解释、命令、图示、交互与练习均为独立教学重写，技术事实由Oracle JDK 25、VisualVM与OpenTelemetry一手文档复核；AI仅作脱敏假设助手。";
  manifest.factSourcePolicy = "目录节点必须具备出现、独立解释、章专属调查实验和练习验证四级证据；工具输出只是信号，根因必须由基线、竞争假设、反例和同输入修复重放共同证明。";
  manifest.factSourcesVerifiedAt = "2026-07-20";
  manifest.factSources = {
    publisher: { kind: "publisher-official-complete-outline", label: "Manning第2版产品页与完整目录", url: SOURCES.book },
    chapter2Preview: { kind: "publisher-authorized-sample", label: "Manning第2章合法试读", url: SOURCES.preview },
    oracleTroubleshooting: { kind: "vendor-official-troubleshooting-guide", label: "Oracle JDK 25故障排查指南", url: SOURCES.oracle },
    oracleJcmd: { kind: "vendor-official-tool-manual", label: "Oracle JDK 25 jcmd手册", url: SOURCES.jcmd },
    oracleJfr: { kind: "vendor-official-tool-manual", label: "Oracle JDK 25 JFR手册", url: SOURCES.jfr },
    oracleJmap: { kind: "vendor-official-tool-manual", label: "Oracle JDK 25 jmap手册", url: SOURCES.jmap },
    visualvm: { kind: "tool-official-documentation", label: "VisualVM官方文档", url: SOURCES.visualvm },
    opentelemetry: { kind: "standard-project-official-documentation", label: "OpenTelemetry Java官方文档", url: SOURCES.otel },
  };
  const bySlug = new Map(profiles.map((profile) => [profile.chapterSlug, profile]));
  for (const unit of manifest.units) {
    const profile = bySlug.get(unit.id);
    if (!profile) throw new Error(`manifest单元缺少页面：${unit.id}`);
    unit.sourceUnitId = unit.id;
    unit.chapterPath = `${profile.sectionSlug}/${profile.chapterSlug}`;
    unit.sourceMode = "independent-rewrite";
    unit.sourceAccess = profile.sourceBasis;
    unit.factSourceIds = ["publisher", ...(profile.sourceBasis === "authorized-sample" ? ["chapter2Preview"] : []), "oracleTroubleshooting", "oracleJcmd", "oracleJfr", "oracleJmap", "visualvm", "opentelemetry"];
  }
}

const root = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const manifest = root.books[BOOK];
if (!manifest) throw new Error(`缺少fidelity manifest：${BOOK}`);
const profiles = profilesFor(listPages(), manifest);
if (profiles.length !== 26) throw new Error(`应有26页，实际${profiles.length}`);
fs.writeFileSync(PROFILE_PATH, `${JSON.stringify({ version: 2, bookSlug: BOOK, profiles: profiles.map((profile) => ({ ...profile, filePath: path.relative(ROOT, profile.filePath) })) }, null, 2)}\n`);

for (const profile of profiles) {
  const parsed = matter(fs.readFileSync(profile.filePath, "utf8"));
  const data = {
    ...parsed.data,
    description: `${profile.duty} 覆盖${profile.concepts.length}个正式节点，并用基线、故障、恢复和复位证据验收。`,
    qualityVersion: 2,
    practiceMode: profile.model.practiceMode,
    sourceMode: "independent-rewrite",
    sourceUrl: SOURCES.book,
  };
  fs.writeFileSync(profile.filePath, matter.stringify(render(profile), data));
  fs.writeFileSync(path.join(COMPONENT_ROOT, `${profile.chapterSlug}.tsx`), wrapper(profile));
}
updateManifest(manifest, profiles);
fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(root, null, 2)}\n`);
console.log(`已重构${profiles.length}页、${manifest.units.length}个正式单元。`);
