"use client";

import {
  KernelDesignEvidenceLab,
  type KernelDesignEvidenceModel,
} from "@/components/mdx/linux-kernel-design/v2/kernel-design-evidence-lab";

const model = {
  unitId: "lkd-unit-02",
  title: "第2章 从内核出发",
  question: "源码获取、配置、构建与安装怎样成为可恢复且可复现的工件链？",
  concepts: [
    "第2章 从内核出发",
    "2.1 获取内核源码",
    "2.1.1 使用Git",
    "2.1.2 安装内核源代码",
    "2.1.3 使用补丁",
    "2.2 内核源码树",
    "2.3 编译内核",
    "2.3.1 配置内核",
    "2.3.2 减少编译的垃圾信息",
    "2.3.3 衍生多个编译作业",
    "2.3.4 安装新内核",
    "2.4 内核开发的特点",
    "2.4.1 无libc库抑或无标准头文件",
    "2.4.2 GNU C",
    "2.4.3 没有内存保护机制",
    "2.4.4 不要轻易在内核中使用浮点数",
    "2.4.5 容积小而固定的栈",
    "2.4.6 同步和并发",
    "2.4.7 可移植性的重要性",
    "2.5 小结",
  ],
  invariant: "同提交配置工具链产生可核对工件且旧内核可回退",
  fault: "复用未知.config、在生产机直接安装或只保留启动成功截图",
  artifact: "源码提交、配置差分、构建摘要、启动日志与回退项",
  probe: "build",
  stages: [
    {
      label: "冻结对象身份",
      object:
        "第2章 从内核出发涉及的Git、补丁、源码树、配置、并行构建、安装与内核开发约束",
      control: "记录提交、配置、架构、上下文与输入",
      signal: "对象地址/ID、初始状态和所有者",
      rollback: "恢复干净快照与参考构建",
    },
    {
      label: "执行参考路径",
      object: "第2章 从内核出发的参考对象链",
      control: "只运行预注册基线操作",
      signal:
        "状态转移、tracepoint、计数与“同提交配置工具链产生可核对工件且旧内核可回退”",
      rollback: "停止负载并核对无残留对象",
    },
    {
      label: "注入唯一故障",
      object: "第2章 从内核出发的故障边界",
      control: "只注入“复用未知.config、在生产机直接安装或只保留启动成功截图”",
      signal: "相对基线的首个状态、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并清理副作用",
    },
    {
      label: "同输入恢复",
      object: "第2章 从内核出发的恢复对象链",
      control: "以相同构建、机器和输入重放",
      signal:
        "重新满足“同提交配置工具链产生可核对工件且旧内核可回退”且资源计数回基线",
      rollback: "保存报告并恢复实验快照",
    },
  ],
  gates: [
    {
      label: "源码与构建身份",
      detail:
        "记录uname -r、源码提交、.config、架构、编译器、启动参数和工件摘要。",
    },
    {
      label: "安全实验环境",
      detail:
        "只在可丢弃虚拟机或专用测试机执行，具备快照、串口/带外控制台、超时和旧内核回退。",
    },
    {
      label: "基线与单故障",
      detail:
        "同一负载先建立稳定基线，每次只改变一个对象并保存首个分岔与竞争性解释。",
    },
    {
      label: "撤销与同输入恢复",
      detail:
        "撤销控制、清理模块/任务/缓存/队列后以同输入恢复；否则标记失败或未知。",
    },
  ],
} as const satisfies KernelDesignEvidenceModel;

export function Lkd02GettingStartedObjectVersionLab() {
  return <KernelDesignEvidenceLab model={model} view="object-version" />;
}

export function Lkd02GettingStartedExecutableProbeLab() {
  return <KernelDesignEvidenceLab model={model} view="executable-probe" />;
}

export function Lkd02GettingStartedTraceGateLab() {
  return <KernelDesignEvidenceLab model={model} view="trace-gate" />;
}
