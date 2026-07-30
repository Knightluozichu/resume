"use client";

import {
  NodeDiagnosticsEvidenceLab,
  type NodeDiagnosticsEvidenceModel,
} from "@/components/mdx/nodejs-debugging-guide/v2/node-diagnostics-evidence-lab";

const model = {
  unitId: "ndbg-unit-06",
  title: "第 6 章 日志",
  question: "日志、异步上下文、trace和错误事件怎样用同一身份串联？",
  concepts: [
    "第6章 日志",
    "6.1 koa-await-breakpoint",
    "6.1.1 koa-await-breakpoint的实现原理",
    "6.1.2 使用koa-await-breakpoint",
    "6.1.3 自定义日志存储",
    "6.2 使用async_hooks",
    "6.3 ELK",
    "6.3.1 安装ELK",
    "6.3.2 使用ELK",
    "6.4 OpenTracing Jaeger",
    "6.4.1 什么是OpenTracing",
    "6.4.2 什么是Jaeger",
    "6.4.3 启动Jaeger及Jaeger UI",
    "6.4.4 使用OpenTracing及Jaeger",
    "6.4.5 koa-await-breakpoint-jaeger",
    "6.5 使用Sentry",
  ],
  symptom: "同一请求的日志、span和错误无法关联或发生串线",
  invariant:
    "可观测链必须保留trace/request身份、父子关系、时间、服务版本、采样与隐私边界",
  fault: "异步上下文丢失或把高基数/敏感字段无界写入遥测",
  artifact:
    "上下文传播轨迹、结构化日志、span树、错误事件、采样决定、脱敏与丢失统计",
  stages: [
    {
      label: "冻结症状与输入",
      hypothesis:
        "第 6 章 日志先把“同一请求的日志、span和错误无法关联或发生串线”写成可重复条件，不预设工具结论",
      capture: "用户时间线、固定请求集、并发、数据、启动/预热与成功判据",
      identity: "Node 8.9.4、V8、Ubuntu 16.04、依赖锁与作者仓库固定提交",
      falsifier: "同输入不能稳定重现症状，或基线自身漂移超过故障差分",
    },
    {
      label: "采集低扰动基线",
      hypothesis:
        "第 6 章 日志先用指标和运行时身份判断异常属于CPU、内存、队列、错误或依赖",
      capture:
        "上下文传播轨迹、结构化日志、span树、错误事件、采样决定、脱敏与丢失统计中的低开销指标、日志和诊断报告",
      identity: "PID、进程启动时间、构建哈希、主机/容器、时钟和采集配置",
      falsifier: "工件来自不同进程、版本、时间窗口或请求集",
    },
    {
      label: "缩小到原始工件",
      hypothesis:
        "第 6 章 日志用剖析、快照、trace或错误事件区分至少两个竞争性解释",
      capture: "带参数和时间窗口的CPU/堆/事件/trace原始文件，不只保存截图",
      identity: "文件哈希、工具版本、采样率、过滤、符号、isolate与丢失计数",
      falsifier: "独立工件不支持同一首个分岔，或采集扰动足以解释差异",
    },
    {
      label: "单故障与同输入恢复",
      hypothesis:
        "第 6 章 日志只注入“异步上下文丢失或把高基数/敏感字段无界写入遥测”并用最小修复推翻根因假设",
      capture: "参考、故障、恢复三条时间对齐轨迹与残留资源检查",
      identity: "相同Node/依赖/主机/流量，唯一变量和回滚提交明确",
      falsifier:
        "撤销后仍不满足“可观测链必须保留trace/request身份、父子关系、时间、服务版本、采样与隐私边界”，或其他变量同步变化",
    },
  ],
  cases: [
    {
      name: "第 6 章 日志作者原仓库复现",
      input: "Node 8.9.4、Ubuntu 16.04、固定提交403f5c6",
      historical:
        "保留koa-await-breakpoint、async_hooks、ELK、OpenTracing/Jaeger与Sentry在作者原公开章节中的工具身份、示例目的和时代限制。",
      current: "当前轨道只建立迁移差分，不修改或假装更新作者原文。",
      boundary:
        "作者仓库没有LICENSE文件；公开可读不等于允许复制，本站只做独立表达和短引核对。",
    },
    {
      name: "第 6 章 日志当前内置能力迁移",
      input: "目标Node构建、官方API文档、同一请求集与原始工件",
      historical:
        "记录v8-profiler、memwatch-next、私有接口、OpenTracing等当时为何被使用。",
      current:
        "优先评估内置CPU/heap profile、Inspector、diagnostic report、AsyncLocalStorage、Node-API与OpenTelemetry。",
      boundary:
        "新工具更受支持不等于历史实验错误；所有性能结论仍需在目标运行时重测。",
    },
    {
      name: "第 6 章 日志生产安全采集",
      input: "数据分级、磁盘/内存预算、访问控制、停止条件和脱敏策略",
      historical: "原作案例用于理解机制和工件，不直接复制命令到当前生产。",
      current:
        "先用低扰动信号缩小范围，快照、core、Inspector与高开销trace在副本或受控窗口执行。",
      boundary:
        "堆/core/report可能含密钥和用户数据；Inspector可执行任意代码，禁止公网暴露。",
    },
  ],
  baselineTrace: [
    "第 6 章 日志基线1：冻结症状与输入，保存用户时间线、固定请求集、并发、数据、启动/预热与成功判据。",
    "第 6 章 日志基线2：采集低扰动基线，保存上下文传播轨迹、结构化日志、span树、错误事件、采样决定、脱敏与丢失统计中的低开销指标、日志和诊断报告。",
    "第 6 章 日志基线3：缩小到原始工件，保存带参数和时间窗口的CPU/堆/事件/trace原始文件，不只保存截图。",
    "第 6 章 日志基线4：单故障与同输入恢复，保存参考、故障、恢复三条时间对齐轨迹与残留资源检查。",
  ],
  faultTrace: [
    "第 6 章 日志故障1：冻结症状与输入只改变“异步上下文丢失或把高基数/敏感字段无界写入遥测”，检查同输入不能稳定重现症状，或基线自身漂移超过故障差分。",
    "第 6 章 日志故障2：采集低扰动基线只改变“异步上下文丢失或把高基数/敏感字段无界写入遥测”，检查工件来自不同进程、版本、时间窗口或请求集。",
    "第 6 章 日志故障3：缩小到原始工件只改变“异步上下文丢失或把高基数/敏感字段无界写入遥测”，检查独立工件不支持同一首个分岔，或采集扰动足以解释差异。",
    "第 6 章 日志故障4：单故障与同输入恢复只改变“异步上下文丢失或把高基数/敏感字段无界写入遥测”，检查撤销后仍不满足“可观测链必须保留trace/request身份、父子关系、时间、服务版本、采样与隐私边界”，或其他变量同步变化。",
  ],
  recoveryTrace: [
    "第 6 章 日志恢复1：冻结症状与输入以同一输入重放，核对Node 8.9.4、V8、Ubuntu 16.04、依赖锁与作者仓库固定提交。",
    "第 6 章 日志恢复2：采集低扰动基线以同一输入重放，核对PID、进程启动时间、构建哈希、主机/容器、时钟和采集配置。",
    "第 6 章 日志恢复3：缩小到原始工件以同一输入重放，核对文件哈希、工具版本、采样率、过滤、符号、isolate与丢失计数。",
    "第 6 章 日志恢复4：单故障与同输入恢复以同一输入重放，核对相同Node/依赖/主机/流量，唯一变量和回滚提交明确。",
  ],
  gates: [
    {
      label: "原作身份与许可门",
      detail:
        "第 6 章 日志固定作者仓库提交、Node 8.9.4和Ubuntu 16.04；无LICENSE意味着只核对和独立重构，不复制原文、代码或图像。",
    },
    {
      label: "工件身份与三角校验门",
      detail:
        "第 6 章 日志保存PID、构建、时间、工具参数与文件哈希，并让指标、剖析/快照和事件至少两类工件互证。",
    },
    {
      label: "采集扰动与数据安全门",
      detail:
        "第 6 章 日志评估CPU、阻塞、额外内存、磁盘、隐私和远程执行风险；超出预算就降级或停止。",
    },
    {
      label: "单变量与回归门",
      detail:
        "第 6 章 日志只注入“异步上下文丢失或把高基数/敏感字段无界写入遥测”，撤销后同一输入满足“可观测链必须保留trace/request身份、父子关系、时间、服务版本、采样与隐私边界”并交付上下文传播轨迹、结构化日志、span树、错误事件、采样决定、脱敏与丢失统计。",
    },
  ],
} as const satisfies NodeDiagnosticsEvidenceModel;

export function Ndbg06LoggingHypothesisLadderLab() {
  return <NodeDiagnosticsEvidenceLab model={model} view="hypothesis-ladder" />;
}

export function Ndbg06LoggingArtifactTriangulationLab() {
  return (
    <NodeDiagnosticsEvidenceLab model={model} view="artifact-triangulation" />
  );
}

export function Ndbg06LoggingMigrationGateLab() {
  return <NodeDiagnosticsEvidenceLab model={model} view="migration-gate" />;
}
