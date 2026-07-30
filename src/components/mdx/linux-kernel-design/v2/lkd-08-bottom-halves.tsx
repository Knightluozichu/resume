"use client";

import {
  KernelDesignEvidenceLab,
  type KernelDesignEvidenceModel,
} from "@/components/mdx/linux-kernel-design/v2/kernel-design-evidence-lab";

const model = {
  unitId: "lkd-unit-08",
  title: "第8章 下半部和推后执行的工作",
  question: "softirq、tasklet历史与当前workqueue怎样按上下文和并发需求迁移？",
  concepts: [
    "第8章 下半部和推后执行的工作",
    "8.1 下半部",
    "8.1.1 为什么要用下半部",
    "8.1.2 下半部的环境",
    "8.2 软中断",
    "8.2.1 软中断的实现",
    "8.2.2 使用软中断",
    "8.3 tasklet",
    "8.3.1 tasklet的实现",
    "8.3.2 使用tasklet",
    "8.3.3 老的BH机制",
    "8.4 工作队列",
    "8.4.1 工作队列的实现",
    "8.4.2 使用工作队列",
    "8.4.3 老的任务队列机制",
    "8.5 下半部机制的选择",
    "8.6 在下半部之间加锁",
    "8.7 禁止下半部",
    "8.8 小结",
  ],
  invariant: "推后工作不丢不重，刷新/取消/销毁后无残留执行",
  fault: "把tasklet当当前通用建议、在回收路径使用无救援worker队列",
  artifact: "排队、开始、结束、取消、积压与worker pool轨迹",
  probe: "deferred",
  stages: [
    {
      label: "冻结对象身份",
      object:
        "第8章 下半部和推后执行的工作涉及的下半部、softirq、tasklet、工作队列、机制选择与锁",
      control: "记录提交、配置、架构、上下文与输入",
      signal: "对象地址/ID、初始状态和所有者",
      rollback: "恢复干净快照与参考构建",
    },
    {
      label: "执行参考路径",
      object: "第8章 下半部和推后执行的工作的参考对象链",
      control: "只运行预注册基线操作",
      signal:
        "状态转移、tracepoint、计数与“推后工作不丢不重，刷新/取消/销毁后无残留执行”",
      rollback: "停止负载并核对无残留对象",
    },
    {
      label: "注入唯一故障",
      object: "第8章 下半部和推后执行的工作的故障边界",
      control:
        "只注入“把tasklet当当前通用建议、在回收路径使用无救援worker队列”",
      signal: "相对基线的首个状态、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并清理副作用",
    },
    {
      label: "同输入恢复",
      object: "第8章 下半部和推后执行的工作的恢复对象链",
      control: "以相同构建、机器和输入重放",
      signal:
        "重新满足“推后工作不丢不重，刷新/取消/销毁后无残留执行”且资源计数回基线",
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

export function Lkd08BottomHalvesObjectVersionLab() {
  return <KernelDesignEvidenceLab model={model} view="object-version" />;
}

export function Lkd08BottomHalvesExecutableProbeLab() {
  return <KernelDesignEvidenceLab model={model} view="executable-probe" />;
}

export function Lkd08BottomHalvesTraceGateLab() {
  return <KernelDesignEvidenceLab model={model} view="trace-gate" />;
}
