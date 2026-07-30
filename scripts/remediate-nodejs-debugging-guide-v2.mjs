#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = process.cwd();
const BOOK = "nodejs-debugging-guide";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(ROOT, "src/components/mdx", BOOK, "v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const VISUAL_RESULTS_PATH = path.join(ROOT, "quality/visual-results.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/nodejs-debugging-guide-v2-profiles.json",
);

const AUTHOR_REPO = "https://github.com/nswbmw/node-in-debugging";
const AUTHOR_SNAPSHOT =
  "https://github.com/nswbmw/node-in-debugging/tree/403f5c6431c97459c4bf263d0e96974da05dc4e2";
const CATALOG = "https://www.tenlong.com.tw/products/9787121341465";

const SOURCES = {
  authorRepo: AUTHOR_REPO,
  authorSnapshot: AUTHOR_SNAPSHOT,
  catalog: CATALOG,
  nodeCli: "https://nodejs.org/api/cli.html",
  nodeInspector: "https://nodejs.org/api/inspector.html",
  nodeV8: "https://nodejs.org/api/v8.html",
  nodeReport: "https://nodejs.org/api/report.html",
  nodeErrors: "https://nodejs.org/api/errors.html",
  nodeProcess: "https://nodejs.org/api/process.html",
  nodeAsyncContext: "https://nodejs.org/api/async_context.html",
  nodeAsyncHooks: "https://nodejs.org/api/async_hooks.html",
  nodePerf: "https://nodejs.org/api/perf_hooks.html",
  nodeApi: "https://nodejs.org/api/n-api.html",
  nodeDebugging: "https://nodejs.org/en/learn/getting-started/debugging",
  nodeFlameGraphs: "https://nodejs.org/en/learn/diagnostics/flame-graphs",
  promisesAPlus: "https://promisesaplus.com/",
  ecma262: "https://tc39.es/ecma262/",
  libuv: "https://docs.libuv.org/en/v1.x/design.html",
  vscode: "https://code.visualstudio.com/docs/nodejs/nodejs-debugging",
  openTelemetry: "https://opentelemetry.io/docs/languages/js/",
  jaeger: "https://www.jaegertracing.io/docs/",
  elasticApm: "https://www.elastic.co/docs/reference/apm/agents/nodejs",
  newRelic:
    "https://docs.newrelic.com/docs/apm/agents/nodejs-agent/getting-started/introduction-new-relic-nodejs/",
  sentry: "https://docs.sentry.io/platforms/javascript/guides/node/",
  grafana: "https://grafana.com/docs/grafana/latest/",
  telegraf: "https://docs.influxdata.com/telegraf/",
  influxdb: "https://docs.influxdata.com/influxdb/",
  clinic: "https://github.com/clinicjs/node-clinic",
  alinode: "https://help.aliyun.com/zh/nodejs/",
};

const SOURCE_META = {
  authorRepo: [
    "赵坤《Node.js 调试指南》作者仓库",
    "author-maintained-full-text-primary",
    "核对30篇作者公开章节、示例、图像索引与原作工具身份",
  ],
  authorSnapshot: [
    "作者仓库固定提交403f5c6",
    "author-maintained-reproducible-snapshot",
    "把原作比较固定到2019年5月23日最后提交，避免分支漂移",
  ],
  catalog: [
    "电子工业出版社版本书商记录",
    "bookseller-publisher-metadata-and-description",
    "核对赵坤、2018年5月、248页、ISBN和八章内容概述",
  ],
  nodeCli: [
    "Node.js 当前命令行文档",
    "runtime-primary-documentation",
    "核对CPU/堆剖析、source map、诊断目录和崩溃触发参数",
  ],
  nodeInspector: [
    "Node.js Inspector 文档",
    "runtime-primary-documentation",
    "核对CPU/Heap Profiler、协议会话、断点与快照接口",
  ],
  nodeV8: [
    "Node.js V8 文档",
    "runtime-primary-documentation",
    "核对heap snapshot阻塞、额外内存、isolate和格式边界",
  ],
  nodeReport: [
    "Node.js Diagnostic Report 文档",
    "runtime-primary-documentation",
    "核对稳定诊断报告、触发方式、版本身份和敏感字段",
  ],
  nodeErrors: [
    "Node.js Errors 文档",
    "runtime-primary-documentation",
    "核对Error栈、错误传播和系统错误身份",
  ],
  nodeProcess: [
    "Node.js Process 文档",
    "runtime-primary-documentation",
    "核对未捕获异常、警告、退出与进程诊断边界",
  ],
  nodeAsyncContext: [
    "Node.js 异步上下文文档",
    "runtime-primary-documentation",
    "核对稳定AsyncLocalStorage/AsyncResource传播语义",
  ],
  nodeAsyncHooks: [
    "Node.js async_hooks 文档",
    "runtime-primary-documentation",
    "核对低层异步资源生命周期钩子与安全限制",
  ],
  nodePerf: [
    "Node.js performance hooks 文档",
    "runtime-primary-documentation",
    "核对event-loop utilization/delay、直方图与用户计时",
  ],
  nodeApi: [
    "Node.js Node-API 文档",
    "runtime-primary-documentation",
    "核对ABI稳定范围、版本矩阵与外部库边界",
  ],
  nodeDebugging: [
    "Node.js 官方调试指南",
    "runtime-primary-documentation",
    "核对Inspector绑定、附加方式与远程调试安全",
  ],
  nodeFlameGraphs: [
    "Node.js 官方火焰图指南",
    "runtime-primary-documentation",
    "核对采样栈、符号、过滤、频率和解释限制",
  ],
  promisesAPlus: [
    "Promises/A+ 规范",
    "primary-standard",
    "核对then行为、解决过程和值穿透的历史规范身份",
  ],
  ecma262: [
    "ECMAScript 当前语言规范",
    "primary-standard",
    "核对Promise、async函数、Error和语言语义",
  ],
  libuv: [
    "libuv 设计文档",
    "maintainer-primary-documentation",
    "核对事件循环、线程池、句柄与请求的运行模型",
  ],
  vscode: [
    "VS Code Node.js 调试文档",
    "vendor-primary-documentation",
    "核对launch/attach、source map、skipFiles和多目标配置",
  ],
  openTelemetry: [
    "OpenTelemetry JavaScript 文档",
    "standard-maintainer-primary-documentation",
    "核对当前Node遥测API/SDK、上下文、传播、采样和信号状态",
  ],
  jaeger: [
    "Jaeger 当前文档",
    "maintainer-primary-documentation",
    "核对接收、存储、查询与OpenTelemetry迁移边界",
  ],
  elasticApm: [
    "Elastic APM Node.js Agent 文档",
    "vendor-primary-documentation",
    "核对探针初始化、事务、span、错误和版本支持",
  ],
  newRelic: [
    "New Relic Node.js Agent 文档",
    "vendor-primary-documentation",
    "核对探针加载顺序、事务与数据发送边界",
  ],
  sentry: [
    "Sentry Node.js 文档",
    "vendor-primary-documentation",
    "核对错误事件、上下文、采样、敏感数据和发布身份",
  ],
  grafana: [
    "Grafana 当前文档",
    "vendor-primary-documentation",
    "核对数据源、查询、看板、报警和配置供应",
  ],
  telegraf: [
    "Telegraf 当前文档",
    "vendor-primary-documentation",
    "核对输入、处理、聚合与输出插件管道",
  ],
  influxdb: [
    "InfluxDB 当前文档",
    "vendor-primary-documentation",
    "核对时序数据模型、写入、查询、保留与版本差异",
  ],
  clinic: [
    "Clinic.js 维护方仓库",
    "maintainer-primary-status-and-documentation",
    "核对工具明确不再积极维护、结果可能不准和Node版本边界",
  ],
  alinode: [
    "阿里云Node.js性能平台文档",
    "vendor-primary-documentation",
    "核对当前产品入口、采集、凭据与平台版本边界",
  ],
};

const PATHS = {
  "ndbg-unit-01": "01-performance/ndbg-01-cpu",
  "ndbg-unit-02": "01-performance/ndbg-02-memory",
  "ndbg-unit-03": "02-code-tools/ndbg-03-code",
  "ndbg-unit-04": "02-code-tools/ndbg-04-tools",
  "ndbg-unit-05": "03-observability/ndbg-05-apm",
  "ndbg-unit-06": "03-observability/ndbg-06-logging",
  "ndbg-unit-07": "04-operations/ndbg-07-monitoring",
  "ndbg-unit-08": "04-operations/ndbg-08-applications",
};

const SPECS = {
  "ndbg-unit-01": {
    question: "CPU高究竟来自业务JavaScript、运行时、原生栈还是采样偏差？",
    scenario:
      "固定请求集与并发，在预热后同时采集吞吐/延迟、CPU profile和带符号采样栈",
    symptom: "同一输入下CPU饱和且尾延迟上升",
    fault: "采样窗口覆盖了不同负载阶段或栈符号缺失",
    invariant:
      "热点结论必须同时对齐负载、墙钟时间、采样权重、完整栈和运行时身份",
    artifact: "负载清单、CPU profile、折叠栈、普通/差分火焰图和热点反证记录",
    focus: "perf、普通/红蓝差分火焰图、v8-profiler与Tick Processor",
    sourceIds: [
      "authorRepo",
      "authorSnapshot",
      "catalog",
      "nodeCli",
      "nodeInspector",
      "nodeFlameGraphs",
      "nodePerf",
    ],
  },
  "ndbg-unit-02": {
    question: "内存增长来自可达对象、外部内存、分配峰值还是转储本身？",
    scenario:
      "固定流量和生命周期节点，分离RSS、heapUsed、external、GC与两份同条件堆快照",
    symptom: "进程RSS或V8堆在稳态流量下持续增长",
    fault: "比较了不同预热、GC、流量或isolate条件下的快照",
    invariant:
      "泄漏结论必须证明同类对象净保留增长，并排除缓存、外部内存和采集扰动",
    artifact:
      "内存时间线、诊断报告、堆快照身份、retainer路径、core/vmcore边界和恢复记录",
    focus: "gcore/llnode、heapdump、memwatch-next、Heap Diff与自动CPU/内存监视",
    sourceIds: [
      "authorRepo",
      "authorSnapshot",
      "catalog",
      "nodeV8",
      "nodeInspector",
      "nodeReport",
      "nodeProcess",
    ],
  },
  "ndbg-unit-03": {
    question: "异步错误、事件循环停顿和原生边界怎样保留首个因果链？",
    scenario:
      "用一个含Promise拒绝、定时器、I/O、nextTick与原生边界的固定用例重放错误和时序",
    symptom: "错误栈断裂、请求挂起或吞吐在代码变更后下降",
    fault: "把最终uncaughtException监听器当成可继续运行的恢复机制",
    invariant:
      "代码诊断必须保留原始错误、异步上下文、队列阶段、Node/V8身份和安全退出",
    artifact:
      "最小复现、结构化错误链、async上下文轨迹、event-loop信号、addon ABI矩阵和退出日志",
    focus:
      "Promise、Async/Await、Error Stack、Node 8、Rust Addons、Event Loop与uncaughtException",
    sourceIds: [
      "authorRepo",
      "authorSnapshot",
      "catalog",
      "promisesAPlus",
      "ecma262",
      "nodeErrors",
      "nodeProcess",
      "nodeAsyncContext",
      "nodePerf",
      "nodeApi",
      "libuv",
    ],
  },
  "ndbg-unit-04": {
    question: "源码、运行代码、调试协议与进程身份怎样保持一一对应？",
    scenario:
      "从同一构建产物启动与附加调试，验证source map、断点、跳过文件和重启后的身份",
    symptom: "断点漂移、栈行号错误或附加到了错误进程",
    fault: "公开绑定Inspector端口或继续使用私有process._debugProcess",
    invariant:
      "调试会话必须核对源码映射、构建哈希、PID/UUID、协议端点、权限和关闭状态",
    artifact:
      "构建与map哈希、Inspector端点、断点命中轨迹、launch配置、安全隧道和清理记录",
    focus:
      "Source Map、Chrome DevTools、VS Code、debug/repl2/power-assert与热重载",
    sourceIds: [
      "authorRepo",
      "authorSnapshot",
      "catalog",
      "nodeCli",
      "nodeInspector",
      "nodeDebugging",
      "vscode",
    ],
  },
  "ndbg-unit-05": {
    question: "APM探针的事务和span能否代表真实请求，又付出了多少开销？",
    scenario:
      "在无探针与有探针两组相同流量中对齐事务、span、错误、采样和资源开销",
    symptom: "APM显示慢事务或错误率上升",
    fault: "探针加载过晚、事务边界错误或采样漏掉关键请求",
    invariant:
      "APM结论必须对齐原始请求、探针版本、采样决策、服务身份和无探针基线",
    artifact:
      "探针配置、事务/span映射、错误样本、采样账本、开销差分和数据发送边界",
    focus: "New Relic与Elastic APM的探针、事务、span、错误和采样",
    sourceIds: [
      "authorRepo",
      "authorSnapshot",
      "catalog",
      "newRelic",
      "elasticApm",
      "nodeAsyncContext",
      "nodePerf",
    ],
  },
  "ndbg-unit-06": {
    question: "日志、异步上下文、trace和错误事件怎样用同一身份串联？",
    scenario:
      "让一个请求跨Promise、定时器、数据库模拟和下游HTTP，检查关联身份的生成、传播与删除",
    symptom: "同一请求的日志、span和错误无法关联或发生串线",
    fault: "异步上下文丢失或把高基数/敏感字段无界写入遥测",
    invariant:
      "可观测链必须保留trace/request身份、父子关系、时间、服务版本、采样与隐私边界",
    artifact:
      "上下文传播轨迹、结构化日志、span树、错误事件、采样决定、脱敏与丢失统计",
    focus: "koa-await-breakpoint、async_hooks、ELK、OpenTracing/Jaeger与Sentry",
    sourceIds: [
      "authorRepo",
      "authorSnapshot",
      "catalog",
      "nodeAsyncContext",
      "nodeAsyncHooks",
      "openTelemetry",
      "jaeger",
      "sentry",
    ],
  },
  "ndbg-unit-07": {
    question: "指标管道怎样避免标签爆炸、时间错位和只看平均值的盲区？",
    scenario:
      "用固定服务流量生成counter、gauge与延迟直方图，穿过采集、存储、查询、看板和报警",
    symptom: "看板出现尖峰、断点或报警，但用户症状不一致",
    fault: "标签基数无界、聚合窗口错位或报警没有缺失数据策略",
    invariant:
      "监控结论必须记录指标语义、单位、标签集合、时间窗口、缺失处理和报警状态机",
    artifact:
      "指标合同、Telegraf管道、Influx查询、Grafana面板、报警/恢复事件和容量预算",
    focus: "Telegraf、StatsD、InfluxDB、Grafana、ELK联查与报警自动化",
    sourceIds: [
      "authorRepo",
      "authorSnapshot",
      "catalog",
      "telegraf",
      "influxdb",
      "grafana",
      "nodePerf",
    ],
  },
  "ndbg-unit-08": {
    question: "一站式诊断平台的结论怎样回查到原始工件和可重复负载？",
    scenario:
      "对一个CPU瓶颈和一个对象保留泄漏运行统一负载，比较平台结论与原始剖析工件",
    symptom: "工具给出CPU或内存瓶颈建议",
    fault: "把平台红色标记或自动评分当成根因证明",
    invariant:
      "平台建议必须回查运行时身份、采集参数、原始profile/快照和最小修复回归",
    artifact:
      "业务症状、平台配置、原始CPU/堆工件、竞争假设、最小修复和容量回归报告",
    focus: "node-clinic与alinode的CPU、内存、事件循环和业务诊断案例",
    sourceIds: [
      "authorRepo",
      "authorSnapshot",
      "catalog",
      "clinic",
      "alinode",
      "nodeCli",
      "nodeInspector",
      "nodeV8",
      "nodePerf",
    ],
  },
};

const MAP_SPEC = {
  question: "怎样把152个正式目录坐标组织成从症状到原始工件的诊断路线？",
  scenario:
    "从CPU、内存、代码、工具、APM、日志、监控和应用八类入口选择症状，逐步缩小证据层",
  symptom: "有异常指标或用户故障，但尚无可证伪根因",
  fault: "先选熟悉工具再定义问题，或把Node 8工具直接当成当前方案",
  invariant: "152个坐标都必须绑定症状、假设、原始工件、反证、恢复和版本边界",
  artifact: "152坐标覆盖矩阵、八条诊断链、Node 8/当前迁移表和工件安全分级",
  focus: "8个章标题、30个编号主题与114个下级目录的全书学习地图",
  sourceIds: Object.keys(SOURCES),
};

const REVIEW_SPEC = {
  question: "能否从一个生产症状反查最小假设、正确工具、原始工件和回归条件？",
  scenario:
    "用相同请求集贯通CPU、内存、异步错误、调试会话、遥测、报警和平台案例",
  symptom: "多个图表同时异常且存在相互竞争的根因解释",
  fault: "一次改变负载、版本、探针和代码，导致工件无法对齐",
  invariant:
    "全书裁决必须由稳定基线、单变量故障、至少两类独立工件与同输入恢复支持",
  artifact: "全书故障树、152坐标答辩、历史工具迁移矩阵、原始工件索引和发布门",
  focus: "全书八类诊断入口的假设、三角校验、迁移和恢复",
  sourceIds: Object.keys(SOURCES),
};

function conceptStrings(unit) {
  return unit.concepts.map((alternatives) => alternatives[0]);
}

function renumberConcepts(concepts, from, to, chapterTitle) {
  return concepts.map((alternatives, index) =>
    alternatives.map((value) =>
      index === 0
        ? chapterTitle
        : value.replace(new RegExp(`^${from}\\.`), `${to}.`),
    ),
  );
}

function correctChapterOrder(manifest) {
  const unit5 = manifest.units.find((unit) => unit.id === "ndbg-unit-05");
  const unit6 = manifest.units.find((unit) => unit.id === "ndbg-unit-06");
  if (!unit5 || !unit6) throw new Error("缺少第5章或第6章");
  if (/日志/.test(unit5.title) && /APM/.test(unit6.title)) {
    const loggingConcepts = unit5.concepts;
    const apmConcepts = unit6.concepts;
    unit5.title = "第 5 章 APM";
    unit5.concepts = renumberConcepts(apmConcepts, 6, 5, "第5章 APM");
    unit6.title = "第 6 章 日志";
    unit6.concepts = renumberConcepts(loggingConcepts, 5, 6, "第6章 日志");
  }
  if (!/APM/.test(unit5.title) || !/日志/.test(unit6.title))
    throw new Error("第5章/第6章顺序未按作者仓库修正");
}

function pascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
}

function alphabeticIndex(index) {
  let value = index + 1;
  let result = "";
  while (value > 0) {
    value -= 1;
    result = String.fromCharCode(65 + (value % 26)) + result;
    value = Math.floor(value / 26);
  }
  return result;
}

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function evidenceKey(index, profile) {
  const scope =
    profile.role === "learning-map"
      ? "MAP"
      : profile.role === "final-review"
        ? "REVIEW"
        : profile.id.replace("ndbg-unit-", "UNIT");
  return `NDBG-${scope}-${alphabeticIndex(index)}`;
}

function mechanismFor(concept, profile) {
  const value = concept.toLocaleLowerCase();
  const label = concept.replaceAll(".", "·");
  const lead = `${profile.title}把${label}`;
  if (/第\d章/.test(value))
    return `${lead}设为诊断入口而非工具清单：先固定用户症状、请求集、运行时身份和安全预算，再选择章内工件。`;
  if (/perf|flamegraph|火焰图|tick processor|web ui|v8-profiler/.test(value))
    return `${lead}绑定采样窗口、频率、完整栈、符号、优化状态和权重；历史v8-profiler保留原作身份，当前优先核对内置CPU profile与Inspector。`;
  if (/core|gcore|llnode|abort-on-uncaught/.test(value))
    return `${lead}绑定PID、可执行文件、Node/V8构建、平台、core限制与符号；转储可能含密钥和用户数据，只能在隔离、加密、限权流程中处理。`;
  if (/heapdump|heapsnapshot|heap diff|memwatch|cpu-memory-monitor/.test(value))
    return `${lead}绑定同条件快照、isolate、堆/RSS/external分量、GC阶段和retainer路径；当前内置V8/Inspector能力与停更原生模块分轨。`;
  if (/promise|safelyresolvethen|doresolve|doreject|值穿透/.test(value))
    return `${lead}回到解决过程、thenable同化、状态不可逆、处理器缺省和值/错误传播；示例实现只用于观察语义，不替代当前ECMAScript规范。`;
  if (/async await|co |yield|bluebird/.test(value))
    return `${lead}映射为Promise链、生成器委托、微任务与错误传播；原作co/Bluebird性能案例固定在Node 8，不外推到当前V8。`;
  if (/error|stack|capturestacktrace|long stack/.test(value))
    return `${lead}保存原始Error、cause/上下文、同步栈、异步传播身份和source map；格式化后的长栈不能取代首错与结构化错误字段。`;
  if (
    /node@8|ignition|turbofan|try\/catch|delete|arguments|async性能|不会优化/.test(
      value,
    )
  )
    return `${lead}限定为Node 8.9.4与当时V8优化管线的实验结论；当前轨道重新基准，不把历史“优化禁忌”写成永久语言规则。`;
  if (/rust|ffi|neon|napi|node-api/.test(value))
    return `${lead}分开Rust语言边界、FFI封装、Neon版本和Node-API ABI保证；外部库、libuv与V8直接接口不自动获得ABI稳定性。`;
  if (/event loop|poll阶段|nexttick/.test(value))
    return `${lead}绑定libuv阶段、微任务/nextTick队列、活跃句柄、event-loop utilization与delay；单次回调顺序不能代表稳态负载。`;
  if (/uncaughtexception|redos/.test(value))
    return `${lead}将未捕获异常视为进程状态可能不可信的终止边界，并为ReDoS记录输入规模、同步阻塞与超时；监听器主要用于同步清理和退出。`;
  if (/source map|uglify|typescript|source-map-support/.test(value))
    return `${lead}绑定生成代码、源代码、map文件、sourceRoot、构建哈希和运行时启用方式；映射错误必须能回退到原始生成栈。`;
  if (
    /chrome devtools|nim|inspect-process|_debugprocess|visual studio|launch\.json|断点|skipfiles|自动重启|多配置/.test(
      value,
    )
  )
    return `${lead}绑定Inspector的PID、UUID、端口、源码身份和客户端配置；私有process._debugProcess只保留历史说明，当前使用受控Inspector/信号并禁止公网暴露。`;
  if (/debug repl2 power-assert|power-assert|repl2|^debug$/.test(value))
    return `${lead}限定为辅助记录、交互检查或断言展开；它们不能替代可重复输入、原始错误、测试隔离和进程状态证据。`;
  if (/hot reload|proxy|supervisor/.test(value))
    return `${lead}记录模块身份、引用图、旧监听器/定时器和清理协议；代码替换成功不代表旧闭包、句柄和状态已释放。`;
  if (/newrelic|elastic apm|apm server|错误日志/.test(value))
    return `${lead}绑定探针加载顺序、服务版本、事务/span边界、采样、错误与无探针基线；仪表盘建议必须回查原始请求。`;
  if (/koa-await-breakpoint|async_hooks|自定义日志/.test(value))
    return `${lead}绑定请求身份、异步资源父子关系、AsyncLocalStorage传播和上下文退出；低层async_hooks示例保留历史机制，当前优先用稳定抽象。`;
  if (/elk|opentracing|jaeger|sentry/.test(value))
    return `${lead}绑定日志/trace/error信号、服务与发布身份、传播头、采样、脱敏和丢失统计；OpenTracing作为历史规范，当前迁移到OpenTelemetry。`;
  if (/telegraf|statsd|influxdb|grafana|监控报警|生成图表|模拟真实/.test(value))
    return `${lead}绑定指标类型、单位、标签基数、采集间隔、保留策略、查询窗口和报警状态机；看板形状不能替代原始序列与用户症状。`;
  if (/node-clinic|alinode|诊断内存|诊断cpu/.test(value))
    return `${lead}视为采集与可视化平台入口，强制保存原始profile/快照和工具版本；Clinic.js已声明不再积极维护且结果可能不准。`;
  return `${lead}映射成症状、竞争假设、版本化原始工件、推翻条件和同输入恢复；目录名与工具输出都不直接等于根因。`;
}

function enrich(id, title, target, concepts, spec, role, officialUnitId) {
  const chapterSlug = target.split("/").at(-1);
  const stages = [
    {
      label: "冻结症状与输入",
      hypothesis: `${title}先把“${spec.symptom}”写成可重复条件，不预设工具结论`,
      capture: "用户时间线、固定请求集、并发、数据、启动/预热与成功判据",
      identity: "Node 8.9.4、V8、Ubuntu 16.04、依赖锁与作者仓库固定提交",
      falsifier: "同输入不能稳定重现症状，或基线自身漂移超过故障差分",
    },
    {
      label: "采集低扰动基线",
      hypothesis: `${title}先用指标和运行时身份判断异常属于CPU、内存、队列、错误或依赖`,
      capture: `${spec.artifact}中的低开销指标、日志和诊断报告`,
      identity: "PID、进程启动时间、构建哈希、主机/容器、时钟和采集配置",
      falsifier: "工件来自不同进程、版本、时间窗口或请求集",
    },
    {
      label: "缩小到原始工件",
      hypothesis: `${title}用剖析、快照、trace或错误事件区分至少两个竞争性解释`,
      capture: "带参数和时间窗口的CPU/堆/事件/trace原始文件，不只保存截图",
      identity: "文件哈希、工具版本、采样率、过滤、符号、isolate与丢失计数",
      falsifier: "独立工件不支持同一首个分岔，或采集扰动足以解释差异",
    },
    {
      label: "单故障与同输入恢复",
      hypothesis: `${title}只注入“${spec.fault}”并用最小修复推翻根因假设`,
      capture: "参考、故障、恢复三条时间对齐轨迹与残留资源检查",
      identity: "相同Node/依赖/主机/流量，唯一变量和回滚提交明确",
      falsifier: `撤销后仍不满足“${spec.invariant}”，或其他变量同步变化`,
    },
  ];
  const cases = [
    {
      name: `${title}作者原仓库复现`,
      input: "Node 8.9.4、Ubuntu 16.04、固定提交403f5c6",
      historical: `保留${spec.focus}在作者原公开章节中的工具身份、示例目的和时代限制。`,
      current: "当前轨道只建立迁移差分，不修改或假装更新作者原文。",
      boundary:
        "作者仓库没有LICENSE文件；公开可读不等于允许复制，本站只做独立表达和短引核对。",
    },
    {
      name: `${title}当前内置能力迁移`,
      input: "目标Node构建、官方API文档、同一请求集与原始工件",
      historical:
        "记录v8-profiler、memwatch-next、私有接口、OpenTracing等当时为何被使用。",
      current:
        "优先评估内置CPU/heap profile、Inspector、diagnostic report、AsyncLocalStorage、Node-API与OpenTelemetry。",
      boundary:
        "新工具更受支持不等于历史实验错误；所有性能结论仍需在目标运行时重测。",
    },
    {
      name: `${title}生产安全采集`,
      input: "数据分级、磁盘/内存预算、访问控制、停止条件和脱敏策略",
      historical: "原作案例用于理解机制和工件，不直接复制命令到当前生产。",
      current:
        "先用低扰动信号缩小范围，快照、core、Inspector与高开销trace在副本或受控窗口执行。",
      boundary:
        "堆/core/report可能含密钥和用户数据；Inspector可执行任意代码，禁止公网暴露。",
    },
  ];
  const baselineTrace = stages.map(
    (stage, index) =>
      `${title}基线${index + 1}：${stage.label}，保存${stage.capture}。`,
  );
  const faultTrace = stages.map(
    (stage, index) =>
      `${title}故障${index + 1}：${stage.label}只改变“${spec.fault}”，检查${stage.falsifier}。`,
  );
  const recoveryTrace = stages.map(
    (stage, index) =>
      `${title}恢复${index + 1}：${stage.label}以同一输入重放，核对${stage.identity}。`,
  );
  const gates = [
    {
      label: "原作身份与许可门",
      detail: `${title}固定作者仓库提交、Node 8.9.4和Ubuntu 16.04；无LICENSE意味着只核对和独立重构，不复制原文、代码或图像。`,
    },
    {
      label: "工件身份与三角校验门",
      detail: `${title}保存PID、构建、时间、工具参数与文件哈希，并让指标、剖析/快照和事件至少两类工件互证。`,
    },
    {
      label: "采集扰动与数据安全门",
      detail: `${title}评估CPU、阻塞、额外内存、磁盘、隐私和远程执行风险；超出预算就降级或停止。`,
    },
    {
      label: "单变量与回归门",
      detail: `${title}只注入“${spec.fault}”，撤销后同一输入满足“${spec.invariant}”并交付${spec.artifact}。`,
    },
  ];
  return {
    id,
    title,
    target,
    chapterSlug,
    componentBase: pascal(chapterSlug),
    concepts,
    role,
    officialUnitId,
    ...spec,
    stages,
    cases,
    baselineTrace,
    faultTrace,
    recoveryTrace,
    gates,
  };
}

function objectives(profile) {
  return `<Objectives>

- 把${profile.focus}放进“症状—假设—原始工件—反证—恢复”诊断链
- 只注入“${profile.fault}”，定位${profile.title}相对稳定基线的首个分岔
- 交付${profile.artifact}，严格分开Node 8.9.4原作与当前Node迁移轨道

</Objectives>`;
}

function sourceSection(profile) {
  const links = profile.sourceIds
    .map((id) => {
      const meta = SOURCE_META[id];
      if (!meta) throw new Error(`缺少来源元数据：${id}`);
      return `- [${meta[0]}](${SOURCES[id]})：${profile.title}用它${meta[2]}。`;
    })
    .join("\n");
  return `## 原版、版本与转载边界

${profile.title}以[赵坤作者仓库](${AUTHOR_REPO})为原版一手基线：仓库公开30篇完整章节与配图索引，README明确开发环境为MacOS/Linux（Ubuntu 16.04 64位）和Node.js 8.9.4。本站将原版比较固定到[提交403f5c6](${AUTHOR_SNAPSHOT})，该提交时间为2019年5月23日。

${profile.title}同时用[版本记录](${CATALOG})核对赵坤著、电子工业出版社、2018年5月、248页、ISBN 9787121341465及八章内容概述。作者仓库与版本描述共同证明原作先后是CPU、内存、代码、工具、APM、日志、监控、应用；本站旧清单曾把第5章日志与第6章APM对调，本次已按作者原版修正。

${profile.title}的来源访问级别是 full-text-primary，但作者仓库没有LICENSE文件。公开可读不等于转载授权：本站不复制原文段落、示例代码、截图或图像，只用其核对原作问题、工具身份和历史语境，再以独立中文教学结构重写。

${profile.title}把两个时代分轨：历史轨道保留Node 8.9.4、Ubuntu 16.04、v8-profiler、memwatch-next、process._debugProcess、OpenTracing和当时APM/平台；当前轨道以Node官方文档和维护方资料核对内置CPU/heap profile、Inspector、diagnostic report、AsyncLocalStorage、Node-API、OpenTelemetry以及各工具当前维护状态。当前能力不能倒灌成原作者观点。

${profile.title}的heap snapshot可能阻塞事件循环并需要约两倍堆内存，core/heap/report可能含敏感数据，Inspector端点可执行任意代码。生产采集必须先做数据分级、磁盘/内存预算、访问控制、脱敏、停止条件和副本复现；页面是实验协议，不是盲目执行清单。

### 本页独立事实来源

${links}`;
}

function conceptsSection(profile) {
  return `## 原版正式坐标逐项解释

${profile.concepts
  .map((concept, index) => {
    const key = evidenceKey(index, profile);
    const label = concept.replaceAll(".", "·");
    return `### ${concept}

**坐标 ${index + 1}/${profile.concepts.length}：${label}。稳定证据键 ${key}。** ${mechanismFor(concept, profile)} ${profile.title}在该坐标必须记录症状输入、竞争假设、进程/构建身份、采集参数、原始工件、首个分岔、推翻条件和恢复结果；工具截图、自动建议或综合分数都不能单独证明根因。`;
  })
  .join("\n\n")}`;
}

function experimentSection(profile) {
  return `## 三个可操作证据视图

${profile.title}先预测：只注入“${profile.fault}”时，指标、CPU/堆工件、异步事件、trace或报警中哪一类最先偏离？先选正式坐标和时代轨道，再重放参考、故障、恢复并打开迁移安全门。

<Stepper>
  <Step title="假设阶梯：从症状缩小到可推翻结论">
    <${profile.componentBase}HypothesisLadderLab />
  </Step>
  <Step title="工件三角校验：对齐基线、故障与恢复">
    <${profile.componentBase}ArtifactTriangulationLab />
  </Step>
  <Step title="迁移门：保留原作身份并评估当前能力">
    <${profile.componentBase}MigrationGateLab />
  </Step>
</Stepper>`;
}

function protocolSection(profile) {
  return `## 最小可重复诊断协议

1. ${profile.title}冻结请求集、数据、并发、预热、成功率/延迟、Node/V8、依赖锁、构建哈希、主机/容器、时钟和采集预算。
2. ${profile.title}先保存低扰动基线，再逐层升级到profile、heap/core、trace或调试会话；每份工件记录PID、起始/结束、参数、哈希和访问级别。
3. ${profile.title}保持其余条件不变，只注入“${profile.fault}”，用至少两类独立工件寻找首个分岔并保留竞争性解释。
4. ${profile.title}撤销变量或最小修复后以同一输入重放；无法满足“${profile.invariant}”时，结论必须标为失败或未知。

<Callout type="trap" title="${profile.title}误区一：作者原文等于当前操作手册">
${profile.title}的Node 8.9.4工具链是重要历史证据，但原生扩展、私有接口、探针协议和平台版本会漂移；当前执行必须重读目标版本官方文档。
</Callout>

<Callout type="trap" title="${profile.title}误区二：工具红色区域就是根因">
${profile.title}把火焰图、heap diff、APM建议、报警和平台评分都视为假设生成器；只有对齐输入、工件身份、单变量反证和恢复才可裁决。
</Callout>

<Callout type="trap" title="${profile.title}误区三：采集没有副作用">
${profile.title}明确测量采样CPU、事件循环阻塞、heap额外内存、core磁盘、trace基数和Inspector权限；风险超过预算时必须降级、转移到副本或停止。
</Callout>`;
}

function exercises(profile) {
  const coordinateQuestions = profile.concepts
    .map((concept, index) => {
      const key = evidenceKey(index, profile);
      const label = concept.replaceAll(".", "·");
      return `**问题 ${index + 1}：${concept}**

为${profile.title}的稳定证据键 ${key} 设计一个固定症状、两个竞争假设、两类独立工件、一个单变量故障和一个恢复断言，并说明${label}在Node 8.9.4与当前Node之间的迁移边界。

<Answer>
先为${profile.title}冻结${profile.scenario}所需的请求、数据、版本、构建、进程和采集参数；把 ${key} 映射到低扰动指标与CPU/堆/事件/trace中的第二类原始工件，只注入“${profile.fault}”。两类证据必须指向同一首个分岔，竞争假设有明确推翻条件，撤销后同输入重新满足“${profile.invariant}”；未覆盖的平台、运行时和生产数据风险保留为未知。
</Answer>`;
    })
    .join("\n\n");
  const start = profile.concepts.length + 1;
  return `## 练习与答案

<Exercises>

${coordinateQuestions}

**问题 ${start}：为什么完整作者仓库仍不能直接复制**

${profile.title}已经能访问作者公开全文，为什么仍采用独立重构？

<Answer>
${profile.title}把作者仓库视为full-text-primary，可准确核对原作问题、示例和工具身份；但仓库没有LICENSE文件，公开读取不产生转载或衍生授权。本站只保留必要来源标注与事实核对，正文、实验、图形、问题和答案均重新组织和表达。
</Answer>

**问题 ${start + 1}：为什么要三角校验**

${profile.title}为什么不能只靠一个火焰图、heap snapshot、APM页面或报警裁决？

<Answer>
${profile.title}中的单一工件可能受采样、过滤、预热、isolate、聚合、时钟、探针和采集开销影响。至少对齐低扰动指标与一份原始剖析/快照/事件工件，再用单变量反证和同输入恢复，才能把相关性收窄为可接受的局部因果结论。
</Answer>

</Exercises>`;
}

function glossary(profile) {
  const terms = [
    [
      "症状合同",
      `${profile.title}中固定用户现象、请求、数据、时序和成功判据的复现声明`,
    ],
    [
      "竞争假设",
      `${profile.title}中至少两个能解释同一症状且可分别推翻的根因候选`,
    ],
    [
      "原始工件",
      `${profile.title}中带版本、参数、时间、进程身份和哈希的profile、snapshot、core、trace或事件文件`,
    ],
    [
      "采集扰动",
      `${profile.title}中诊断工具对CPU、事件循环、内存、磁盘、网络与行为的改变`,
    ],
    ["首个分岔", `${profile.title}的故障轨迹最早偏离同输入参考轨迹的位置`],
    [
      "迁移差分",
      `${profile.title}把Node 8.9.4工具身份映射到当前受支持能力的显式变化表`,
    ],
  ];
  return `## 六个诊断裁决术语

${profile.title}使用${terms
    .map(
      ([term, definition]) =>
        `<Term def="${escapeAttribute(definition)}">${term}</Term>`,
    )
    .join(
      "、",
    )}构成最小证据语言；每个术语都绑定真实输入、状态和工件，不制造置信度、根因分或装饰性排名。

<Glossary>
${terms
  .map(
    ([term, definition]) =>
      `<GlossaryItem term="${term}">${definition}。</GlossaryItem>`,
  )
  .join("\n")}
</Glossary>`;
}

function synthesis(profile) {
  return `## 小结与上架门

${profile.title}的核心不是记住更多调试工具，而是把${profile.focus}纳入同一条可证伪链：作者仓库准确限定原作，运行时/维护方文档限定当前能力，症状合同约束输入，原始工件与三角校验定位首错，迁移门、数据安全和同输入恢复决定结论能否发布。最终交付${profile.artifact}并报告失败、未知项与采集扰动。

${exercises(profile)}

${glossary(profile)}

<Attribution
  mode="independent-rewrite"
  sourceBasis="full-text-primary"
  workTitle="赵坤《Node.js调试指南（全彩）》"
  adaptedUrl="${AUTHOR_REPO}"
/>`;
}

function wrapper(profile) {
  const model = {
    unitId: profile.id,
    title: profile.title,
    question: profile.question,
    concepts: profile.concepts,
    symptom: profile.symptom,
    invariant: profile.invariant,
    fault: profile.fault,
    artifact: profile.artifact,
    stages: profile.stages,
    cases: profile.cases,
    baselineTrace: profile.baselineTrace,
    faultTrace: profile.faultTrace,
    recoveryTrace: profile.recoveryTrace,
    gates: profile.gates,
  };
  return `"use client";

import {
  NodeDiagnosticsEvidenceLab,
  type NodeDiagnosticsEvidenceModel,
} from "@/components/mdx/nodejs-debugging-guide/v2/node-diagnostics-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} as const satisfies NodeDiagnosticsEvidenceModel;

export function ${profile.componentBase}HypothesisLadderLab() {
  return <NodeDiagnosticsEvidenceLab model={model} view="hypothesis-ladder" />;
}

export function ${profile.componentBase}ArtifactTriangulationLab() {
  return <NodeDiagnosticsEvidenceLab model={model} view="artifact-triangulation" />;
}

export function ${profile.componentBase}MigrationGateLab() {
  return <NodeDiagnosticsEvidenceLab model={model} view="migration-gate" />;
}
`;
}

async function writeFormatted(filePath, source, parser) {
  const output = await format(source, { parser });
  const current = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : "";
  if (current !== output) fs.writeFileSync(filePath, output);
}

async function transformPage(profile) {
  const filePath = path.join(CONTENT_ROOT, `${profile.target}.mdx`);
  if (!fs.existsSync(filePath)) throw new Error(`缺少页面：${filePath}`);
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const body = `import {
  Objectives,
  Term,
  Callout,
  Stepper,
  Step,
  Exercises,
  Answer,
  Glossary,
  GlossaryItem,
  Attribution,
} from "@/components/mdx/mdx-components";
import {
  ${profile.componentBase}HypothesisLadderLab,
  ${profile.componentBase}ArtifactTriangulationLab,
  ${profile.componentBase}MigrationGateLab,
} from "@/components/mdx/${BOOK}/v2/${profile.chapterSlug}";

${objectives(profile)}

## 为什么从这个症状开始

${profile.title}围绕“${profile.question}”建立贯穿任务：${profile.scenario}。先把“${profile.symptom}”写成可重复症状，再对齐参考、单故障和恢复工件；只有守住“${profile.invariant}”并交付${profile.artifact}，工具输出才可能升级为根因证据。

${sourceSection(profile)}

${conceptsSection(profile)}

${experimentSection(profile)}

${protocolSection(profile)}

${synthesis(profile)}
`;
  const data = {
    ...parsed.data,
    title: profile.title,
    section: profile.title,
    description: `${profile.title}覆盖${profile.concepts.length}个正式坐标，用假设阶梯、工件三角校验与迁移门交付${profile.artifact}`,
    demo: true,
    math: false,
    sourceUrl: AUTHOR_REPO,
    qualityVersion: 2,
    practiceMode: "simulation",
    sourceMode: "independent-rewrite",
  };
  if (profile.officialUnitId) data.officialUnitId = profile.officialUnitId;
  else delete data.officialUnitId;
  await writeFormatted(
    filePath,
    matter.stringify(body.trimStart(), data),
    "mdx",
  );
  await writeFormatted(
    path.join(COMPONENT_ROOT, `${profile.chapterSlug}.tsx`),
    wrapper(profile),
    "typescript",
  );
}

const document = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const manifest = document.books[BOOK];
if (!manifest) throw new Error(`缺少 fidelity manifest：${BOOK}`);
if (manifest.units.length !== 8)
  throw new Error(`正式章数应为8，实际${manifest.units.length}`);

correctChapterOrder(manifest);
const allCoordinates = manifest.units.flatMap(conceptStrings);
const chapterHeadings = allCoordinates.filter((value) =>
  /^第\d章/.test(value),
).length;
const numberedThemes = allCoordinates.filter((value) =>
  /^\d+\.\d+ /.test(value),
).length;
const numberedSubnodes = allCoordinates.filter((value) =>
  /^\d+\.\d+\.\d+ /.test(value),
).length;
if (
  chapterHeadings !== 8 ||
  numberedThemes !== 30 ||
  numberedSubnodes !== 114 ||
  allCoordinates.length !== 152
)
  throw new Error(
    `目录计数异常：章标题${chapterHeadings}、编号主题${numberedThemes}、下级目录${numberedSubnodes}、总计${allCoordinates.length}`,
  );

const profiles = [
  enrich(
    "learningMap",
    "《Node.js调试指南》152坐标证据学习地图",
    "00-guide/ndbg-official-learning-map",
    allCoordinates,
    MAP_SPEC,
    "learning-map",
  ),
  ...manifest.units.map((unit) => {
    const spec = SPECS[unit.id];
    const target = PATHS[unit.id];
    if (!spec || !target) throw new Error(`缺少单元配置：${unit.id}`);
    return enrich(
      unit.id,
      unit.title,
      target,
      conceptStrings(unit),
      spec,
      "chapter",
      unit.id,
    );
  }),
  enrich(
    "finalReview",
    "《Node.js调试指南》152坐标全书证据总复习",
    "05-review/ndbg-official-final-review",
    allCoordinates,
    REVIEW_SPEC,
    "final-review",
  ),
];
if (profiles.length !== 10)
  throw new Error(`页面数量应为10，实际${profiles.length}`);

fs.mkdirSync(COMPONENT_ROOT, { recursive: true });
for (const profile of profiles) await transformPage(profile);

for (const unit of manifest.units) {
  unit.chapterPath = PATHS[unit.id];
  unit.sourceMode = "independent-rewrite";
  unit.sourceAccess = "full-text-primary";
  unit.factSourceIds = SPECS[unit.id].sourceIds;
}
manifest.edition =
  "赵坤著《Node.js调试指南（全彩）》，电子工业出版社，2018-05-01，248页，ISBN 9787121341465";
manifest.sourceKind =
  "author-maintained-full-text-repository-fixed-snapshot-plus-publisher-edition-metadata-and-current-primary-documentation";
manifest.sourceUrl = AUTHOR_REPO;
manifest.secondarySourceUrls = Object.values(SOURCES).filter(
  (url) => url !== AUTHOR_REPO,
);
manifest.status =
  "verified-author-full-text-independent-rewrite-current-runtime-cross-check";
manifest.verifiedAt = "2026-07-30";
manifest.sourceAccess = "full-text-primary";
manifest.defaultSourceMode = "independent-rewrite";
manifest.disclosureNote =
  "正式分母为8个章标题、30个编号主题和114个下级目录，共152个正式坐标。作者公开仓库含30篇完整章节，README明确Node.js 8.9.4与Ubuntu 16.04；比较固定到2019-05-23提交403f5c6。作者仓库无LICENSE，公开可读不等于转载授权，课程不复制原文、代码或图像。作者原版顺序为第5章APM、第6章日志，本站旧清单曾对调，本次已纠正。历史v8-profiler、memwatch-next、process._debugProcess、OpenTracing、Clinic.js和alinode等保留时代身份；当前Node内置诊断、Inspector、AsyncLocalStorage、Node-API、OpenTelemetry及工具维护状态作为独立迁移轨道。";
manifest.unitMappingEvidence =
  "quality/nodejs-debugging-guide-v2-profiles.json";
manifest.factSourcePolicy =
  "作者仓库固定提交核对原作问题、工具和历史示例，书商/出版社信息核对版本身份；Node.js、标准组织和工具维护方当前文档只支持独立机制核验与迁移。无LICENSE内容不得复制，历史与当前结论不得互相覆盖。";
manifest.factSources = Object.fromEntries(
  Object.entries(SOURCE_META).map(([id, [label, kind]]) => [
    id,
    { kind, label, url: SOURCES[id] },
  ]),
);
manifest.coverageMetrics = {
  targetFormalNodes: 152,
  coveredFormalNodes: 152,
  coveragePercent: 100,
};
manifest.metrics = {
  formalChapterHeadings: 8,
  formalNumberedThemes: 30,
  formalNumberedSubnodes: 114,
  formalNodes: 152,
  officialUnits: 8,
  learningMapPages: 1,
  chapterPages: 8,
  finalReviewPages: 1,
  totalPages: 10,
  interactiveViews: 30,
  authorFullTextChapters: 30,
};

await writeFormatted(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      bookSlug: BOOK,
      generatedAt: "2026-07-30",
      sourceAccess: "full-text-primary",
      authorSnapshot: "403f5c6431c97459c4bf263d0e96974da05dc4e2",
      formalNodes: 152,
      profiles: profiles.map((profile) => ({
        ...profile,
        filePath: `content/${BOOK}/${profile.target}.mdx`,
        componentPath: `src/components/mdx/${BOOK}/v2/${profile.chapterSlug}.tsx`,
      })),
    },
    null,
    2,
  )}\n`,
  "json",
);
await writeFormatted(
  MANIFEST_PATH,
  `${JSON.stringify(document, null, 2)}\n`,
  "json",
);
if (fs.existsSync(VISUAL_RESULTS_PATH)) {
  const visualResults = JSON.parse(
    fs.readFileSync(VISUAL_RESULTS_PATH, "utf8"),
  );
  delete visualResults.chapters?.[
    "nodejs-debugging-guide/03-observability/ndbg-05-logging"
  ];
  delete visualResults.chapters?.[
    "nodejs-debugging-guide/03-observability/ndbg-06-apm"
  ];
  await writeFormatted(
    VISUAL_RESULTS_PATH,
    `${JSON.stringify(visualResults, null, 2)}\n`,
    "json",
  );
}

console.log(
  "已重构10页、8章、30个编号主题、114个下级目录、152个正式坐标与30个交互视图。",
);
