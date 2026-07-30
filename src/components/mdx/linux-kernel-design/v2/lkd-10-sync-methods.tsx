"use client";

import {
  KernelDesignEvidenceLab,
  type KernelDesignEvidenceModel,
} from "@/components/mdx/linux-kernel-design/v2/kernel-design-evidence-lab";

const model = {
  unitId: "lkd-unit-10",
  title: "第10章 内核同步方法",
  question:
    "原子、自旋锁、信号量、互斥体、完成量、顺序锁与屏障怎样按上下文选择？",
  concepts: [
    "第10章 内核同步方法",
    "10.1 原子操作",
    "10.1.1 原子整数操作",
    "10.1.2 64位原子操作",
    "10.1.3 原子位操作",
    "10.2 自旋锁",
    "10.2.1 自旋锁方法",
    "10.2.2 其他针对自旋锁的操作",
    "10.2.3 自旋锁和下半部",
    "10.3 读-写自旋锁",
    "10.4 信号量",
    "10.4.1 计数信号量和二值信号量",
    "10.4.2 创建和初始化信号量",
    "10.4.3 使用信号量",
    "10.5 读-写信号量",
    "10.6 互斥体",
    "10.6.1 信号量和互斥体",
    "10.6.2 自旋锁和互斥体",
    "10.7 完成变量",
    "10.8 BLK：大内核锁",
    "10.9 顺序锁",
    "10.10 禁止抢占",
    "10.11 顺序和屏障",
    "10.12 小结",
  ],
  invariant: "原语的睡眠性、所有权、IRQ、抢占和内存序与上下文匹配",
  fault: "原子上下文使用可睡眠锁、错误IRQ状态或把锁当完整内存序证明",
  artifact: "原语选择表、锁序、lockdep、竞争轨迹与内存序litmus",
  probe: "locking",
  stages: [
    {
      label: "冻结对象身份",
      object:
        "第10章 内核同步方法涉及的原子、各类锁、信号量、互斥体、完成量、顺序锁、抢占与屏障",
      control: "记录提交、配置、架构、上下文与输入",
      signal: "对象地址/ID、初始状态和所有者",
      rollback: "恢复干净快照与参考构建",
    },
    {
      label: "执行参考路径",
      object: "第10章 内核同步方法的参考对象链",
      control: "只运行预注册基线操作",
      signal:
        "状态转移、tracepoint、计数与“原语的睡眠性、所有权、IRQ、抢占和内存序与上下文匹配”",
      rollback: "停止负载并核对无残留对象",
    },
    {
      label: "注入唯一故障",
      object: "第10章 内核同步方法的故障边界",
      control:
        "只注入“原子上下文使用可睡眠锁、错误IRQ状态或把锁当完整内存序证明”",
      signal: "相对基线的首个状态、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并清理副作用",
    },
    {
      label: "同输入恢复",
      object: "第10章 内核同步方法的恢复对象链",
      control: "以相同构建、机器和输入重放",
      signal:
        "重新满足“原语的睡眠性、所有权、IRQ、抢占和内存序与上下文匹配”且资源计数回基线",
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

export function Lkd10SyncMethodsObjectVersionLab() {
  return <KernelDesignEvidenceLab model={model} view="object-version" />;
}

export function Lkd10SyncMethodsExecutableProbeLab() {
  return <KernelDesignEvidenceLab model={model} view="executable-probe" />;
}

export function Lkd10SyncMethodsTraceGateLab() {
  return <KernelDesignEvidenceLab model={model} view="trace-gate" />;
}
