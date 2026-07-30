"use client";

import {
  KernelEvidenceLab,
  type KernelEvidenceModel,
} from "@/components/mdx/linux-kernel-essence/v2/kernel-evidence-lab";

const model = {
  unitId: "lke-unit-02",
  title: "第2章 资源管理",
  question: "资源控制写入怎样改变进程可见的CPU、内存和块I/O结果？",
  concepts: [
    "第2章 资源管理",
    "HACK #7 Cgroup、Namespace、Linux容器",
    "HACK #8 调度策略",
    "HACK #9 RT Group Scheduling与RT Throttling",
    "HACK #10 Fair Group Scheduling",
    "HACK #11 cpuset",
    "HACK #12 使用Memory Cgroup限制内存使用量",
    "HACK #13 使用Block I/O控制器设置I/O优先级",
    "HACK #14 虚拟存储子系统的调整",
    "HACK #15 ramzswap",
    "HACK #16 OOM Killer的运行与结构",
  ],
  invariant: "资源结论必须同时记录层级、控制器、任务归属、负载和内核可见计量",
  fault: "任务附着在错误的cgroup层级或错误控制器未启用",
  artifact: "cgroup树、任务归属、调度/内存/I/O计量、OOM事件和恢复记录",
  stages: [
    {
      label: "冻结对象与版本",
      object: "第2章 资源管理涉及的内核、配置、设备和工作负载身份",
      control: "只读采集版本、配置、拓扑和初始状态，不改变生产对象",
      signal: "第2章 资源管理的基线身份表与缺失能力清单",
      rollback: "此阶段无写入；发现身份不一致即停止实验",
    },
    {
      label: "建立参考基线",
      object: "第2章 资源管理的主要对象与可观察接口",
      control:
        "执行预注册的最小参考路径：在隔离层级中运行一组CPU、内存和I/O竞争负载，保存控制文件、归属与压力信号",
      signal: "第2章 资源管理的正常轨迹、计数、日志和完成条件",
      rollback: "保存证据后回到干净快照，确认无残留控制",
    },
    {
      label: "注入单一故障",
      object:
        "第2章 资源管理中与“任务附着在错误的cgroup层级或错误控制器未启用”直接相连的对象",
      control:
        "保持输入与其他设置不变，只注入“任务附着在错误的cgroup层级或错误控制器未启用”",
      signal: "第2章 资源管理相对基线的首个分岔与传播路径",
      rollback: "立即撤销单一写入；若失去控制则从快照或带外控制台恢复",
    },
    {
      label: "同输入恢复",
      object: "第2章 资源管理的控制面、数据面和证据文件",
      control: "从干净快照以相同输入重放，并核对撤销后状态",
      signal:
        "第2章 资源管理重新满足“资源结论必须同时记录层级、控制器、任务归属、负载和内核可见计量”且无残留对象",
      rollback: "销毁一次性实验环境，归档版本化证据而非复用污染状态",
    },
  ],
  experiments: [
    {
      name: "第2章 资源管理历史接口复现",
      setup: "只在匹配旧内核/发行版的可丢弃虚拟机中复现",
      prediction:
        "原书时期对象可解释机制，但具体路径和默认值受旧版本限制；预期交付cgroup树、任务归属、调度/内存/I/O计量、OOM事件和恢复记录。",
      boundary:
        "不能把旧命令直接发布为当前生产操作，也不能用当前输出改写原书。",
    },
    {
      name: "第2章 资源管理当前接口迁移",
      setup: "先读当前上游文档，再在匹配版本的隔离环境中建立新基线",
      prediction:
        "当前接口可能更名、合并或删除，但仍应守住“资源结论必须同时记录层级、控制器、任务归属、负载和内核可见计量”。",
      boundary: "当前迁移是本站独立教学结论，不是2013年中文版正文。",
    },
    {
      name: "第2章 资源管理单故障恢复",
      setup: "预先准备快照、串口/带外控制台、超时和停止条件",
      prediction:
        "只注入“任务附着在错误的cgroup层级或错误控制器未启用”后，首个分岔可定位且撤销可恢复。",
      boundary: "无快照、无控制台、无数据备份或不可承受中断时禁止执行。",
    },
  ],
  baselineTrace: [
    "第2章 资源管理基线1：冻结对象与版本，观察第2章 资源管理的基线身份表与缺失能力清单。",
    "第2章 资源管理基线2：建立参考基线，观察第2章 资源管理的正常轨迹、计数、日志和完成条件。",
    "第2章 资源管理基线3：注入单一故障，观察第2章 资源管理相对基线的首个分岔与传播路径。",
    "第2章 资源管理基线4：同输入恢复，观察第2章 资源管理重新满足“资源结论必须同时记录层级、控制器、任务归属、负载和内核可见计量”且无残留对象。",
  ],
  faultTrace: [
    "第2章 资源管理故障1：冻结对象与版本只追踪“任务附着在错误的cgroup层级或错误控制器未启用”，核对第2章 资源管理涉及的内核、配置、设备和工作负载身份。",
    "第2章 资源管理故障2：建立参考基线只追踪“任务附着在错误的cgroup层级或错误控制器未启用”，核对第2章 资源管理的主要对象与可观察接口。",
    "第2章 资源管理故障3：注入单一故障只追踪“任务附着在错误的cgroup层级或错误控制器未启用”，核对第2章 资源管理中与“任务附着在错误的cgroup层级或错误控制器未启用”直接相连的对象。",
    "第2章 资源管理故障4：同输入恢复只追踪“任务附着在错误的cgroup层级或错误控制器未启用”，核对第2章 资源管理的控制面、数据面和证据文件。",
  ],
  recoveryTrace: [
    "第2章 资源管理恢复1：此阶段无写入；发现身份不一致即停止实验，重新验证第2章 资源管理的基线身份表与缺失能力清单。",
    "第2章 资源管理恢复2：保存证据后回到干净快照，确认无残留控制，重新验证第2章 资源管理的正常轨迹、计数、日志和完成条件。",
    "第2章 资源管理恢复3：立即撤销单一写入；若失去控制则从快照或带外控制台恢复，重新验证第2章 资源管理相对基线的首个分岔与传播路径。",
    "第2章 资源管理恢复4：销毁一次性实验环境，归档版本化证据而非复用污染状态，重新验证第2章 资源管理重新满足“资源结论必须同时记录层级、控制器、任务归属、负载和内核可见计量”且无残留对象。",
  ],
  gates: [
    {
      label: "版本与来源门",
      detail:
        "第2章 资源管理已分开2013年前后历史语境、当前上游文档和本站独立解释；目录来源不承担技术事实。",
    },
    {
      label: "隔离与控制门",
      detail:
        "第2章 资源管理的破坏性步骤只在可丢弃虚拟机或专用测试机运行，并具备快照、控制台和停止条件。",
    },
    {
      label: "单变量证伪门",
      detail:
        "第2章 资源管理只改变“任务附着在错误的cgroup层级或错误控制器未启用”，保存首个分岔、传播路径与竞争性解释。",
    },
    {
      label: "恢复与证据门",
      detail:
        "第2章 资源管理撤销后用同一输入恢复基线，交付cgroup树、任务归属、调度/内存/I/O计量、OOM事件和恢复记录并报告失败与未知项。",
    },
  ],
} as const satisfies KernelEvidenceModel;

export function Lke02ResourceManagementObjectContractLab() {
  return <KernelEvidenceLab model={model} view="object-contract" />;
}

export function Lke02ResourceManagementSignalTraceLab() {
  return <KernelEvidenceLab model={model} view="signal-trace" />;
}

export function Lke02ResourceManagementSafetyGateLab() {
  return <KernelEvidenceLab model={model} view="safety-gate" />;
}
