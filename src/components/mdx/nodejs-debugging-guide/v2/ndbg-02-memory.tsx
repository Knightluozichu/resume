"use client";

import {
  NodeDiagnosticsEvidenceLab,
  type NodeDiagnosticsEvidenceModel,
} from "@/components/mdx/nodejs-debugging-guide/v2/node-diagnostics-evidence-lab";

const model = {
  unitId: "ndbg-unit-02",
  title: "第 2 章 内存",
  question: "内存增长来自可达对象、外部内存、分配峰值还是转储本身？",
  concepts: [
    "第2章 内存",
    "2.1 gcore与llnode",
    "2.1.1 Core和Core Dump",
    "2.1.2 gcore",
    "2.1.3 llnode",
    "2.1.4 测试Core Dump",
    "2.1.5 分析Core文件",
    "2.1.6 --abort-on-uncaught-exception",
    "2.1.7 小结",
    "2.2 heapdump",
    "2.2.1 使用heapdump",
    "2.2.2 Chrome DevTools",
    "2.2.3 对比快照",
    "2.3 memwatch-next",
    "2.3.1 使用memwatch-next",
    "2.3.2 使用Heap Diff",
    "2.3.3 结合heapdump使用",
    "2.4 cpu-memory-monitor",
    "2.4.1 使用cpu-memory-monitor",
    "2.4.2 cpu-memory-monitor源码解读",
  ],
  symptom: "进程RSS或V8堆在稳态流量下持续增长",
  invariant:
    "泄漏结论必须证明同类对象净保留增长，并排除缓存、外部内存和采集扰动",
  fault: "比较了不同预热、GC、流量或isolate条件下的快照",
  artifact:
    "内存时间线、诊断报告、堆快照身份、retainer路径、core/vmcore边界和恢复记录",
  stages: [
    {
      label: "冻结症状与输入",
      hypothesis:
        "第 2 章 内存先把“进程RSS或V8堆在稳态流量下持续增长”写成可重复条件，不预设工具结论",
      capture: "用户时间线、固定请求集、并发、数据、启动/预热与成功判据",
      identity: "Node 8.9.4、V8、Ubuntu 16.04、依赖锁与作者仓库固定提交",
      falsifier: "同输入不能稳定重现症状，或基线自身漂移超过故障差分",
    },
    {
      label: "采集低扰动基线",
      hypothesis:
        "第 2 章 内存先用指标和运行时身份判断异常属于CPU、内存、队列、错误或依赖",
      capture:
        "内存时间线、诊断报告、堆快照身份、retainer路径、core/vmcore边界和恢复记录中的低开销指标、日志和诊断报告",
      identity: "PID、进程启动时间、构建哈希、主机/容器、时钟和采集配置",
      falsifier: "工件来自不同进程、版本、时间窗口或请求集",
    },
    {
      label: "缩小到原始工件",
      hypothesis:
        "第 2 章 内存用剖析、快照、trace或错误事件区分至少两个竞争性解释",
      capture: "带参数和时间窗口的CPU/堆/事件/trace原始文件，不只保存截图",
      identity: "文件哈希、工具版本、采样率、过滤、符号、isolate与丢失计数",
      falsifier: "独立工件不支持同一首个分岔，或采集扰动足以解释差异",
    },
    {
      label: "单故障与同输入恢复",
      hypothesis:
        "第 2 章 内存只注入“比较了不同预热、GC、流量或isolate条件下的快照”并用最小修复推翻根因假设",
      capture: "参考、故障、恢复三条时间对齐轨迹与残留资源检查",
      identity: "相同Node/依赖/主机/流量，唯一变量和回滚提交明确",
      falsifier:
        "撤销后仍不满足“泄漏结论必须证明同类对象净保留增长，并排除缓存、外部内存和采集扰动”，或其他变量同步变化",
    },
  ],
  cases: [
    {
      name: "第 2 章 内存作者原仓库复现",
      input: "Node 8.9.4、Ubuntu 16.04、固定提交403f5c6",
      historical:
        "保留gcore/llnode、heapdump、memwatch-next、Heap Diff与自动CPU/内存监视在作者原公开章节中的工具身份、示例目的和时代限制。",
      current: "当前轨道只建立迁移差分，不修改或假装更新作者原文。",
      boundary:
        "作者仓库没有LICENSE文件；公开可读不等于允许复制，本站只做独立表达和短引核对。",
    },
    {
      name: "第 2 章 内存当前内置能力迁移",
      input: "目标Node构建、官方API文档、同一请求集与原始工件",
      historical:
        "记录v8-profiler、memwatch-next、私有接口、OpenTracing等当时为何被使用。",
      current:
        "优先评估内置CPU/heap profile、Inspector、diagnostic report、AsyncLocalStorage、Node-API与OpenTelemetry。",
      boundary:
        "新工具更受支持不等于历史实验错误；所有性能结论仍需在目标运行时重测。",
    },
    {
      name: "第 2 章 内存生产安全采集",
      input: "数据分级、磁盘/内存预算、访问控制、停止条件和脱敏策略",
      historical: "原作案例用于理解机制和工件，不直接复制命令到当前生产。",
      current:
        "先用低扰动信号缩小范围，快照、core、Inspector与高开销trace在副本或受控窗口执行。",
      boundary:
        "堆/core/report可能含密钥和用户数据；Inspector可执行任意代码，禁止公网暴露。",
    },
  ],
  baselineTrace: [
    "第 2 章 内存基线1：冻结症状与输入，保存用户时间线、固定请求集、并发、数据、启动/预热与成功判据。",
    "第 2 章 内存基线2：采集低扰动基线，保存内存时间线、诊断报告、堆快照身份、retainer路径、core/vmcore边界和恢复记录中的低开销指标、日志和诊断报告。",
    "第 2 章 内存基线3：缩小到原始工件，保存带参数和时间窗口的CPU/堆/事件/trace原始文件，不只保存截图。",
    "第 2 章 内存基线4：单故障与同输入恢复，保存参考、故障、恢复三条时间对齐轨迹与残留资源检查。",
  ],
  faultTrace: [
    "第 2 章 内存故障1：冻结症状与输入只改变“比较了不同预热、GC、流量或isolate条件下的快照”，检查同输入不能稳定重现症状，或基线自身漂移超过故障差分。",
    "第 2 章 内存故障2：采集低扰动基线只改变“比较了不同预热、GC、流量或isolate条件下的快照”，检查工件来自不同进程、版本、时间窗口或请求集。",
    "第 2 章 内存故障3：缩小到原始工件只改变“比较了不同预热、GC、流量或isolate条件下的快照”，检查独立工件不支持同一首个分岔，或采集扰动足以解释差异。",
    "第 2 章 内存故障4：单故障与同输入恢复只改变“比较了不同预热、GC、流量或isolate条件下的快照”，检查撤销后仍不满足“泄漏结论必须证明同类对象净保留增长，并排除缓存、外部内存和采集扰动”，或其他变量同步变化。",
  ],
  recoveryTrace: [
    "第 2 章 内存恢复1：冻结症状与输入以同一输入重放，核对Node 8.9.4、V8、Ubuntu 16.04、依赖锁与作者仓库固定提交。",
    "第 2 章 内存恢复2：采集低扰动基线以同一输入重放，核对PID、进程启动时间、构建哈希、主机/容器、时钟和采集配置。",
    "第 2 章 内存恢复3：缩小到原始工件以同一输入重放，核对文件哈希、工具版本、采样率、过滤、符号、isolate与丢失计数。",
    "第 2 章 内存恢复4：单故障与同输入恢复以同一输入重放，核对相同Node/依赖/主机/流量，唯一变量和回滚提交明确。",
  ],
  gates: [
    {
      label: "原作身份与许可门",
      detail:
        "第 2 章 内存固定作者仓库提交、Node 8.9.4和Ubuntu 16.04；无LICENSE意味着只核对和独立重构，不复制原文、代码或图像。",
    },
    {
      label: "工件身份与三角校验门",
      detail:
        "第 2 章 内存保存PID、构建、时间、工具参数与文件哈希，并让指标、剖析/快照和事件至少两类工件互证。",
    },
    {
      label: "采集扰动与数据安全门",
      detail:
        "第 2 章 内存评估CPU、阻塞、额外内存、磁盘、隐私和远程执行风险；超出预算就降级或停止。",
    },
    {
      label: "单变量与回归门",
      detail:
        "第 2 章 内存只注入“比较了不同预热、GC、流量或isolate条件下的快照”，撤销后同一输入满足“泄漏结论必须证明同类对象净保留增长，并排除缓存、外部内存和采集扰动”并交付内存时间线、诊断报告、堆快照身份、retainer路径、core/vmcore边界和恢复记录。",
    },
  ],
} as const satisfies NodeDiagnosticsEvidenceModel;

export function Ndbg02MemoryHypothesisLadderLab() {
  return <NodeDiagnosticsEvidenceLab model={model} view="hypothesis-ladder" />;
}

export function Ndbg02MemoryArtifactTriangulationLab() {
  return (
    <NodeDiagnosticsEvidenceLab model={model} view="artifact-triangulation" />
  );
}

export function Ndbg02MemoryMigrationGateLab() {
  return <NodeDiagnosticsEvidenceLab model={model} view="migration-gate" />;
}
