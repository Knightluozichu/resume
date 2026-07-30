"use client";

import {
  KernelDesignEvidenceLab,
  type KernelDesignEvidenceModel,
} from "@/components/mdx/linux-kernel-design/v2/kernel-design-evidence-lab";

const model = {
  unitId: "lkd-unit-09",
  title: "第9章 内核同步介绍",
  question: "临界区、竞争、死锁与扩展性怎样从共享对象和冲突边推导？",
  concepts: [
    "第9章 内核同步介绍",
    "9.1 临界区和竞争条件",
    "9.1.1 为什么我们需要保护",
    "9.1.2 单个变量",
    "9.2 加锁",
    "9.2.1 造成并发执行的原因",
    "9.2.2 了解要保护些什么",
    "9.3 死锁",
    "9.4 争用和扩展性",
    "9.5 小结",
  ],
  invariant: "所有共享对象有所有者和同步协议且锁图无环",
  fault: "按代码块加锁而不声明数据、形成锁序环或用单CPU结果证明安全",
  artifact: "共享对象表、并发上下文、锁图、KCSAN/lockdep与反例",
  probe: "race",
  stages: [
    {
      label: "冻结对象身份",
      object:
        "第9章 内核同步介绍涉及的临界区、竞争条件、并发来源、保护对象、死锁与争用",
      control: "记录提交、配置、架构、上下文与输入",
      signal: "对象地址/ID、初始状态和所有者",
      rollback: "恢复干净快照与参考构建",
    },
    {
      label: "执行参考路径",
      object: "第9章 内核同步介绍的参考对象链",
      control: "只运行预注册基线操作",
      signal:
        "状态转移、tracepoint、计数与“所有共享对象有所有者和同步协议且锁图无环”",
      rollback: "停止负载并核对无残留对象",
    },
    {
      label: "注入唯一故障",
      object: "第9章 内核同步介绍的故障边界",
      control:
        "只注入“按代码块加锁而不声明数据、形成锁序环或用单CPU结果证明安全”",
      signal: "相对基线的首个状态、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并清理副作用",
    },
    {
      label: "同输入恢复",
      object: "第9章 内核同步介绍的恢复对象链",
      control: "以相同构建、机器和输入重放",
      signal:
        "重新满足“所有共享对象有所有者和同步协议且锁图无环”且资源计数回基线",
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

export function Lkd09SyncIntroObjectVersionLab() {
  return <KernelDesignEvidenceLab model={model} view="object-version" />;
}

export function Lkd09SyncIntroExecutableProbeLab() {
  return <KernelDesignEvidenceLab model={model} view="executable-probe" />;
}

export function Lkd09SyncIntroTraceGateLab() {
  return <KernelDesignEvidenceLab model={model} view="trace-gate" />;
}
