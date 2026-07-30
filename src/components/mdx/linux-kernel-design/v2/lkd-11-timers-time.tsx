"use client";

import {
  KernelDesignEvidenceLab,
  type KernelDesignEvidenceModel,
} from "@/components/mdx/linux-kernel-design/v2/kernel-design-evidence-lab";

const model = {
  unitId: "lkd-unit-11",
  title: "第11章 定时器和时间管理",
  question: "HZ、jiffies、时钟源、定时器与延迟怎样跨回绕和NO_HZ正确计时？",
  concepts: [
    "第11章 定时器和时间管理",
    "11.1 内核中的时间概念",
    "11.2 节拍率：Hz",
    "11.2.1 理想的Hz值",
    "11.2.2 高Hz的优势",
    "11.2.3 高Hz的劣势",
    "11.3 jiffies",
    "11.3.1 jiffies的内部表示",
    "11.3.2 jiffies的回绕",
    "11.3.3 用户空间和Hz",
    "11.4 硬时钟和定时器",
    "11.4.1 实时时钟",
    "11.4.2 系统定时器",
    "11.5 时钟中断处理程序",
    "11.6 实际时间",
    "11.7 定时器",
    "11.7.1 使用定时器",
    "11.7.2 定时器竞争条件",
    "11.7.3 实现定时器",
    "11.8 延迟执行",
    "11.8.1 忙等待",
    "11.8.2 短延迟",
    "11.8.3 schedule_timeout()",
    "11.9 小结",
  ],
  invariant: "截止时间与回调在声明时钟域和容差内成立",
  fault: "直接比较回绕计数、用忙等执行长延迟或忽略时钟源变化",
  artifact: "时钟/clockevent身份、定时器事件、延迟分布与取消记录",
  probe: "time",
  stages: [
    {
      label: "冻结对象身份",
      object:
        "第11章 定时器和时间管理涉及的时间概念、HZ、jiffies、硬时钟、定时器和延迟执行",
      control: "记录提交、配置、架构、上下文与输入",
      signal: "对象地址/ID、初始状态和所有者",
      rollback: "恢复干净快照与参考构建",
    },
    {
      label: "执行参考路径",
      object: "第11章 定时器和时间管理的参考对象链",
      control: "只运行预注册基线操作",
      signal:
        "状态转移、tracepoint、计数与“截止时间与回调在声明时钟域和容差内成立”",
      rollback: "停止负载并核对无残留对象",
    },
    {
      label: "注入唯一故障",
      object: "第11章 定时器和时间管理的故障边界",
      control: "只注入“直接比较回绕计数、用忙等执行长延迟或忽略时钟源变化”",
      signal: "相对基线的首个状态、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并清理副作用",
    },
    {
      label: "同输入恢复",
      object: "第11章 定时器和时间管理的恢复对象链",
      control: "以相同构建、机器和输入重放",
      signal:
        "重新满足“截止时间与回调在声明时钟域和容差内成立”且资源计数回基线",
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

export function Lkd11TimersTimeObjectVersionLab() {
  return <KernelDesignEvidenceLab model={model} view="object-version" />;
}

export function Lkd11TimersTimeExecutableProbeLab() {
  return <KernelDesignEvidenceLab model={model} view="executable-probe" />;
}

export function Lkd11TimersTimeTraceGateLab() {
  return <KernelDesignEvidenceLab model={model} view="trace-gate" />;
}
