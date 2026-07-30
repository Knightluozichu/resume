"use client";

import {
  KernelDesignEvidenceLab,
  type KernelDesignEvidenceModel,
} from "@/components/mdx/linux-kernel-design/v2/kernel-design-evidence-lab";

const model = {
  unitId: "lkd-unit-04",
  title: "第4章 进程调度",
  question:
    "调度策略、可运行状态、优先级、抢占与切换怎样由trace而不是份额口号解释？",
  concepts: [
    "第4章 进程调度",
    "4.1 多任务",
    "4.2 Linux的进程调度",
    "4.3 策略",
    "4.3.1 I/O消耗型和处理器消耗型的进程",
    "4.3.2 进程优先级",
    "4.3.3 时间片",
    "4.3.4 调度策略的活动",
    "4.4 Linux调度算法",
    "4.4.1 调度器类",
    "4.4.2 UNIX 系统中的进程调度",
    "4.4.3 公平调度",
    "4.5 Linux调度的实现",
    "4.5.1 时间记账",
    "4.5.2 进程选择",
    "4.5.3 调度器入口",
    "4.5.4 睡眠和唤醒",
    "4.6 抢占和上下文切换",
    "4.6.1 用户抢占",
    "4.6.2 内核抢占",
    "4.7 实时调度策略",
    "4.8 与调度相关的系统调用",
    "4.8.1 与调度策略和优先级相关的系统调用",
    "4.8.2 与处理器绑定有关的系统调用",
    "4.8.3 放弃处理器时间",
    "4.9 小结",
  ],
  invariant: "enqueue、pick、switch与wakeup能解释每次运行选择",
  fault: "把理想权重份额冒充实测、忽略睡眠唤醒或混淆调度类",
  artifact: "调度类与策略身份、sched轨迹、CPU拓扑和延迟分布",
  probe: "scheduler",
  stages: [
    {
      label: "冻结对象身份",
      object:
        "第4章 进程调度涉及的多任务、策略、公平调度、实现、抢占、实时与调度系统调用",
      control: "记录提交、配置、架构、上下文与输入",
      signal: "对象地址/ID、初始状态和所有者",
      rollback: "恢复干净快照与参考构建",
    },
    {
      label: "执行参考路径",
      object: "第4章 进程调度的参考对象链",
      control: "只运行预注册基线操作",
      signal:
        "状态转移、tracepoint、计数与“enqueue、pick、switch与wakeup能解释每次运行选择”",
      rollback: "停止负载并核对无残留对象",
    },
    {
      label: "注入唯一故障",
      object: "第4章 进程调度的故障边界",
      control: "只注入“把理想权重份额冒充实测、忽略睡眠唤醒或混淆调度类”",
      signal: "相对基线的首个状态、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并清理副作用",
    },
    {
      label: "同输入恢复",
      object: "第4章 进程调度的恢复对象链",
      control: "以相同构建、机器和输入重放",
      signal:
        "重新满足“enqueue、pick、switch与wakeup能解释每次运行选择”且资源计数回基线",
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

export function Lkd04ProcessSchedulingObjectVersionLab() {
  return <KernelDesignEvidenceLab model={model} view="object-version" />;
}

export function Lkd04ProcessSchedulingExecutableProbeLab() {
  return <KernelDesignEvidenceLab model={model} view="executable-probe" />;
}

export function Lkd04ProcessSchedulingTraceGateLab() {
  return <KernelDesignEvidenceLab model={model} view="trace-gate" />;
}
