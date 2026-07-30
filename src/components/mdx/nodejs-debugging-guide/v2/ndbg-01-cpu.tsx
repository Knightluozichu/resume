"use client";

import {
  NodeDiagnosticsEvidenceLab,
  type NodeDiagnosticsEvidenceModel,
} from "@/components/mdx/nodejs-debugging-guide/v2/node-diagnostics-evidence-lab";

const model = {
  unitId: "ndbg-unit-01",
  title: "第 1 章 CPU",
  question: "CPU高究竟来自业务JavaScript、运行时、原生栈还是采样偏差？",
  concepts: [
    "第1章 CPU",
    "1.1 理解perf与火焰图（FlameGraph）",
    "1.1.1 perf",
    "1.1.2 火焰图",
    "1.1.3 红蓝差分火焰图",
    "1.2 使用v8-profiler分析CPU的使用情况",
    "1.3 Tick Processor及Web UI",
    "1.3.1 Tick Processor",
    "1.3.2 Web UI",
  ],
  symptom: "同一输入下CPU饱和且尾延迟上升",
  invariant: "热点结论必须同时对齐负载、墙钟时间、采样权重、完整栈和运行时身份",
  fault: "采样窗口覆盖了不同负载阶段或栈符号缺失",
  artifact: "负载清单、CPU profile、折叠栈、普通/差分火焰图和热点反证记录",
  stages: [
    {
      label: "冻结症状与输入",
      hypothesis:
        "第 1 章 CPU先把“同一输入下CPU饱和且尾延迟上升”写成可重复条件，不预设工具结论",
      capture: "用户时间线、固定请求集、并发、数据、启动/预热与成功判据",
      identity: "Node 8.9.4、V8、Ubuntu 16.04、依赖锁与作者仓库固定提交",
      falsifier: "同输入不能稳定重现症状，或基线自身漂移超过故障差分",
    },
    {
      label: "采集低扰动基线",
      hypothesis:
        "第 1 章 CPU先用指标和运行时身份判断异常属于CPU、内存、队列、错误或依赖",
      capture:
        "负载清单、CPU profile、折叠栈、普通/差分火焰图和热点反证记录中的低开销指标、日志和诊断报告",
      identity: "PID、进程启动时间、构建哈希、主机/容器、时钟和采集配置",
      falsifier: "工件来自不同进程、版本、时间窗口或请求集",
    },
    {
      label: "缩小到原始工件",
      hypothesis:
        "第 1 章 CPU用剖析、快照、trace或错误事件区分至少两个竞争性解释",
      capture: "带参数和时间窗口的CPU/堆/事件/trace原始文件，不只保存截图",
      identity: "文件哈希、工具版本、采样率、过滤、符号、isolate与丢失计数",
      falsifier: "独立工件不支持同一首个分岔，或采集扰动足以解释差异",
    },
    {
      label: "单故障与同输入恢复",
      hypothesis:
        "第 1 章 CPU只注入“采样窗口覆盖了不同负载阶段或栈符号缺失”并用最小修复推翻根因假设",
      capture: "参考、故障、恢复三条时间对齐轨迹与残留资源检查",
      identity: "相同Node/依赖/主机/流量，唯一变量和回滚提交明确",
      falsifier:
        "撤销后仍不满足“热点结论必须同时对齐负载、墙钟时间、采样权重、完整栈和运行时身份”，或其他变量同步变化",
    },
  ],
  cases: [
    {
      name: "第 1 章 CPU作者原仓库复现",
      input: "Node 8.9.4、Ubuntu 16.04、固定提交403f5c6",
      historical:
        "保留perf、普通/红蓝差分火焰图、v8-profiler与Tick Processor在作者原公开章节中的工具身份、示例目的和时代限制。",
      current: "当前轨道只建立迁移差分，不修改或假装更新作者原文。",
      boundary:
        "作者仓库没有LICENSE文件；公开可读不等于允许复制，本站只做独立表达和短引核对。",
    },
    {
      name: "第 1 章 CPU当前内置能力迁移",
      input: "目标Node构建、官方API文档、同一请求集与原始工件",
      historical:
        "记录v8-profiler、memwatch-next、私有接口、OpenTracing等当时为何被使用。",
      current:
        "优先评估内置CPU/heap profile、Inspector、diagnostic report、AsyncLocalStorage、Node-API与OpenTelemetry。",
      boundary:
        "新工具更受支持不等于历史实验错误；所有性能结论仍需在目标运行时重测。",
    },
    {
      name: "第 1 章 CPU生产安全采集",
      input: "数据分级、磁盘/内存预算、访问控制、停止条件和脱敏策略",
      historical: "原作案例用于理解机制和工件，不直接复制命令到当前生产。",
      current:
        "先用低扰动信号缩小范围，快照、core、Inspector与高开销trace在副本或受控窗口执行。",
      boundary:
        "堆/core/report可能含密钥和用户数据；Inspector可执行任意代码，禁止公网暴露。",
    },
  ],
  baselineTrace: [
    "第 1 章 CPU基线1：冻结症状与输入，保存用户时间线、固定请求集、并发、数据、启动/预热与成功判据。",
    "第 1 章 CPU基线2：采集低扰动基线，保存负载清单、CPU profile、折叠栈、普通/差分火焰图和热点反证记录中的低开销指标、日志和诊断报告。",
    "第 1 章 CPU基线3：缩小到原始工件，保存带参数和时间窗口的CPU/堆/事件/trace原始文件，不只保存截图。",
    "第 1 章 CPU基线4：单故障与同输入恢复，保存参考、故障、恢复三条时间对齐轨迹与残留资源检查。",
  ],
  faultTrace: [
    "第 1 章 CPU故障1：冻结症状与输入只改变“采样窗口覆盖了不同负载阶段或栈符号缺失”，检查同输入不能稳定重现症状，或基线自身漂移超过故障差分。",
    "第 1 章 CPU故障2：采集低扰动基线只改变“采样窗口覆盖了不同负载阶段或栈符号缺失”，检查工件来自不同进程、版本、时间窗口或请求集。",
    "第 1 章 CPU故障3：缩小到原始工件只改变“采样窗口覆盖了不同负载阶段或栈符号缺失”，检查独立工件不支持同一首个分岔，或采集扰动足以解释差异。",
    "第 1 章 CPU故障4：单故障与同输入恢复只改变“采样窗口覆盖了不同负载阶段或栈符号缺失”，检查撤销后仍不满足“热点结论必须同时对齐负载、墙钟时间、采样权重、完整栈和运行时身份”，或其他变量同步变化。",
  ],
  recoveryTrace: [
    "第 1 章 CPU恢复1：冻结症状与输入以同一输入重放，核对Node 8.9.4、V8、Ubuntu 16.04、依赖锁与作者仓库固定提交。",
    "第 1 章 CPU恢复2：采集低扰动基线以同一输入重放，核对PID、进程启动时间、构建哈希、主机/容器、时钟和采集配置。",
    "第 1 章 CPU恢复3：缩小到原始工件以同一输入重放，核对文件哈希、工具版本、采样率、过滤、符号、isolate与丢失计数。",
    "第 1 章 CPU恢复4：单故障与同输入恢复以同一输入重放，核对相同Node/依赖/主机/流量，唯一变量和回滚提交明确。",
  ],
  gates: [
    {
      label: "原作身份与许可门",
      detail:
        "第 1 章 CPU固定作者仓库提交、Node 8.9.4和Ubuntu 16.04；无LICENSE意味着只核对和独立重构，不复制原文、代码或图像。",
    },
    {
      label: "工件身份与三角校验门",
      detail:
        "第 1 章 CPU保存PID、构建、时间、工具参数与文件哈希，并让指标、剖析/快照和事件至少两类工件互证。",
    },
    {
      label: "采集扰动与数据安全门",
      detail:
        "第 1 章 CPU评估CPU、阻塞、额外内存、磁盘、隐私和远程执行风险；超出预算就降级或停止。",
    },
    {
      label: "单变量与回归门",
      detail:
        "第 1 章 CPU只注入“采样窗口覆盖了不同负载阶段或栈符号缺失”，撤销后同一输入满足“热点结论必须同时对齐负载、墙钟时间、采样权重、完整栈和运行时身份”并交付负载清单、CPU profile、折叠栈、普通/差分火焰图和热点反证记录。",
    },
  ],
} as const satisfies NodeDiagnosticsEvidenceModel;

export function Ndbg01CpuHypothesisLadderLab() {
  return <NodeDiagnosticsEvidenceLab model={model} view="hypothesis-ladder" />;
}

export function Ndbg01CpuArtifactTriangulationLab() {
  return (
    <NodeDiagnosticsEvidenceLab model={model} view="artifact-triangulation" />
  );
}

export function Ndbg01CpuMigrationGateLab() {
  return <NodeDiagnosticsEvidenceLab model={model} view="migration-gate" />;
}
