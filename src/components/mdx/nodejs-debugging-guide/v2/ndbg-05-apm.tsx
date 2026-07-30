"use client";

import {
  NodeDiagnosticsEvidenceLab,
  type NodeDiagnosticsEvidenceModel,
} from "@/components/mdx/nodejs-debugging-guide/v2/node-diagnostics-evidence-lab";

const model = {
  unitId: "ndbg-unit-05",
  title: "第 5 章 APM",
  question: "APM探针的事务和span能否代表真实请求，又付出了多少开销？",
  concepts: [
    "第5章 APM",
    "5.1 使用NewRelic",
    "5.2 Elastic APM",
    "5.2.1 什么是Elastic APM",
    "5.2.2 启动ELK",
    "5.2.3 启动APM Server",
    "5.2.4 使用Elastic APM",
    "5.2.5 错误日志",
  ],
  symptom: "APM显示慢事务或错误率上升",
  invariant:
    "APM结论必须对齐原始请求、探针版本、采样决策、服务身份和无探针基线",
  fault: "探针加载过晚、事务边界错误或采样漏掉关键请求",
  artifact:
    "探针配置、事务/span映射、错误样本、采样账本、开销差分和数据发送边界",
  stages: [
    {
      label: "冻结症状与输入",
      hypothesis:
        "第 5 章 APM先把“APM显示慢事务或错误率上升”写成可重复条件，不预设工具结论",
      capture: "用户时间线、固定请求集、并发、数据、启动/预热与成功判据",
      identity: "Node 8.9.4、V8、Ubuntu 16.04、依赖锁与作者仓库固定提交",
      falsifier: "同输入不能稳定重现症状，或基线自身漂移超过故障差分",
    },
    {
      label: "采集低扰动基线",
      hypothesis:
        "第 5 章 APM先用指标和运行时身份判断异常属于CPU、内存、队列、错误或依赖",
      capture:
        "探针配置、事务/span映射、错误样本、采样账本、开销差分和数据发送边界中的低开销指标、日志和诊断报告",
      identity: "PID、进程启动时间、构建哈希、主机/容器、时钟和采集配置",
      falsifier: "工件来自不同进程、版本、时间窗口或请求集",
    },
    {
      label: "缩小到原始工件",
      hypothesis:
        "第 5 章 APM用剖析、快照、trace或错误事件区分至少两个竞争性解释",
      capture: "带参数和时间窗口的CPU/堆/事件/trace原始文件，不只保存截图",
      identity: "文件哈希、工具版本、采样率、过滤、符号、isolate与丢失计数",
      falsifier: "独立工件不支持同一首个分岔，或采集扰动足以解释差异",
    },
    {
      label: "单故障与同输入恢复",
      hypothesis:
        "第 5 章 APM只注入“探针加载过晚、事务边界错误或采样漏掉关键请求”并用最小修复推翻根因假设",
      capture: "参考、故障、恢复三条时间对齐轨迹与残留资源检查",
      identity: "相同Node/依赖/主机/流量，唯一变量和回滚提交明确",
      falsifier:
        "撤销后仍不满足“APM结论必须对齐原始请求、探针版本、采样决策、服务身份和无探针基线”，或其他变量同步变化",
    },
  ],
  cases: [
    {
      name: "第 5 章 APM作者原仓库复现",
      input: "Node 8.9.4、Ubuntu 16.04、固定提交403f5c6",
      historical:
        "保留New Relic与Elastic APM的探针、事务、span、错误和采样在作者原公开章节中的工具身份、示例目的和时代限制。",
      current: "当前轨道只建立迁移差分，不修改或假装更新作者原文。",
      boundary:
        "作者仓库没有LICENSE文件；公开可读不等于允许复制，本站只做独立表达和短引核对。",
    },
    {
      name: "第 5 章 APM当前内置能力迁移",
      input: "目标Node构建、官方API文档、同一请求集与原始工件",
      historical:
        "记录v8-profiler、memwatch-next、私有接口、OpenTracing等当时为何被使用。",
      current:
        "优先评估内置CPU/heap profile、Inspector、diagnostic report、AsyncLocalStorage、Node-API与OpenTelemetry。",
      boundary:
        "新工具更受支持不等于历史实验错误；所有性能结论仍需在目标运行时重测。",
    },
    {
      name: "第 5 章 APM生产安全采集",
      input: "数据分级、磁盘/内存预算、访问控制、停止条件和脱敏策略",
      historical: "原作案例用于理解机制和工件，不直接复制命令到当前生产。",
      current:
        "先用低扰动信号缩小范围，快照、core、Inspector与高开销trace在副本或受控窗口执行。",
      boundary:
        "堆/core/report可能含密钥和用户数据；Inspector可执行任意代码，禁止公网暴露。",
    },
  ],
  baselineTrace: [
    "第 5 章 APM基线1：冻结症状与输入，保存用户时间线、固定请求集、并发、数据、启动/预热与成功判据。",
    "第 5 章 APM基线2：采集低扰动基线，保存探针配置、事务/span映射、错误样本、采样账本、开销差分和数据发送边界中的低开销指标、日志和诊断报告。",
    "第 5 章 APM基线3：缩小到原始工件，保存带参数和时间窗口的CPU/堆/事件/trace原始文件，不只保存截图。",
    "第 5 章 APM基线4：单故障与同输入恢复，保存参考、故障、恢复三条时间对齐轨迹与残留资源检查。",
  ],
  faultTrace: [
    "第 5 章 APM故障1：冻结症状与输入只改变“探针加载过晚、事务边界错误或采样漏掉关键请求”，检查同输入不能稳定重现症状，或基线自身漂移超过故障差分。",
    "第 5 章 APM故障2：采集低扰动基线只改变“探针加载过晚、事务边界错误或采样漏掉关键请求”，检查工件来自不同进程、版本、时间窗口或请求集。",
    "第 5 章 APM故障3：缩小到原始工件只改变“探针加载过晚、事务边界错误或采样漏掉关键请求”，检查独立工件不支持同一首个分岔，或采集扰动足以解释差异。",
    "第 5 章 APM故障4：单故障与同输入恢复只改变“探针加载过晚、事务边界错误或采样漏掉关键请求”，检查撤销后仍不满足“APM结论必须对齐原始请求、探针版本、采样决策、服务身份和无探针基线”，或其他变量同步变化。",
  ],
  recoveryTrace: [
    "第 5 章 APM恢复1：冻结症状与输入以同一输入重放，核对Node 8.9.4、V8、Ubuntu 16.04、依赖锁与作者仓库固定提交。",
    "第 5 章 APM恢复2：采集低扰动基线以同一输入重放，核对PID、进程启动时间、构建哈希、主机/容器、时钟和采集配置。",
    "第 5 章 APM恢复3：缩小到原始工件以同一输入重放，核对文件哈希、工具版本、采样率、过滤、符号、isolate与丢失计数。",
    "第 5 章 APM恢复4：单故障与同输入恢复以同一输入重放，核对相同Node/依赖/主机/流量，唯一变量和回滚提交明确。",
  ],
  gates: [
    {
      label: "原作身份与许可门",
      detail:
        "第 5 章 APM固定作者仓库提交、Node 8.9.4和Ubuntu 16.04；无LICENSE意味着只核对和独立重构，不复制原文、代码或图像。",
    },
    {
      label: "工件身份与三角校验门",
      detail:
        "第 5 章 APM保存PID、构建、时间、工具参数与文件哈希，并让指标、剖析/快照和事件至少两类工件互证。",
    },
    {
      label: "采集扰动与数据安全门",
      detail:
        "第 5 章 APM评估CPU、阻塞、额外内存、磁盘、隐私和远程执行风险；超出预算就降级或停止。",
    },
    {
      label: "单变量与回归门",
      detail:
        "第 5 章 APM只注入“探针加载过晚、事务边界错误或采样漏掉关键请求”，撤销后同一输入满足“APM结论必须对齐原始请求、探针版本、采样决策、服务身份和无探针基线”并交付探针配置、事务/span映射、错误样本、采样账本、开销差分和数据发送边界。",
    },
  ],
} as const satisfies NodeDiagnosticsEvidenceModel;

export function Ndbg05ApmHypothesisLadderLab() {
  return <NodeDiagnosticsEvidenceLab model={model} view="hypothesis-ladder" />;
}

export function Ndbg05ApmArtifactTriangulationLab() {
  return (
    <NodeDiagnosticsEvidenceLab model={model} view="artifact-triangulation" />
  );
}

export function Ndbg05ApmMigrationGateLab() {
  return <NodeDiagnosticsEvidenceLab model={model} view="migration-gate" />;
}
