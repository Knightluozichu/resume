"use client";

import {
  KernelDesignEvidenceLab,
  type KernelDesignEvidenceModel,
} from "@/components/mdx/linux-kernel-design/v2/kernel-design-evidence-lab";

const model = {
  unitId: "lkd-unit-07",
  title: "第7章 中断和中断处理",
  question: "中断注册、共享、上下文、上半部与控制怎样由事件轨迹验收？",
  concepts: [
    "第7章 中断和中断处理",
    "7.1 中断",
    "7.2 中断处理程序",
    "7.3 上半部与下半部的对比",
    "7.4 注册中断处理程序",
    "7.4.1 中断处理程序标志",
    "7.4.2 一个中断例子",
    "7.4.3 释放中断处理程序",
    "7.5 编写中断处理程序",
    "7.5.1 共享的中断处理程序",
    "7.5.2 中断处理程序实例",
    "7.6 中断上下文",
    "7.7 中断处理机制的实现",
    "7.8 /proc/interrupts",
    "7.9 中断控制",
    "7.9.1 禁止和激活中断",
    "7.9.2 禁止指定中断线",
    "7.9.3 中断系统的状态",
    "7.10 小结",
  ],
  invariant: "确认来源后快速完成必要工作并把可推后部分安全移交",
  fault: "在硬中断上下文睡眠、错误共享dev_id或释放仍在使用的处理器",
  artifact: "IRQ身份、处理时长、上下文、推后事件与释放同步记录",
  probe: "interrupt",
  stages: [
    {
      label: "冻结对象身份",
      object:
        "第7章 中断和中断处理涉及的中断、处理程序、上下半部、注册、共享、上下文与中断控制",
      control: "记录提交、配置、架构、上下文与输入",
      signal: "对象地址/ID、初始状态和所有者",
      rollback: "恢复干净快照与参考构建",
    },
    {
      label: "执行参考路径",
      object: "第7章 中断和中断处理的参考对象链",
      control: "只运行预注册基线操作",
      signal:
        "状态转移、tracepoint、计数与“确认来源后快速完成必要工作并把可推后部分安全移交”",
      rollback: "停止负载并核对无残留对象",
    },
    {
      label: "注入唯一故障",
      object: "第7章 中断和中断处理的故障边界",
      control:
        "只注入“在硬中断上下文睡眠、错误共享dev_id或释放仍在使用的处理器”",
      signal: "相对基线的首个状态、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并清理副作用",
    },
    {
      label: "同输入恢复",
      object: "第7章 中断和中断处理的恢复对象链",
      control: "以相同构建、机器和输入重放",
      signal:
        "重新满足“确认来源后快速完成必要工作并把可推后部分安全移交”且资源计数回基线",
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

export function Lkd07InterruptsObjectVersionLab() {
  return <KernelDesignEvidenceLab model={model} view="object-version" />;
}

export function Lkd07InterruptsExecutableProbeLab() {
  return <KernelDesignEvidenceLab model={model} view="executable-probe" />;
}

export function Lkd07InterruptsTraceGateLab() {
  return <KernelDesignEvidenceLab model={model} view="trace-gate" />;
}
