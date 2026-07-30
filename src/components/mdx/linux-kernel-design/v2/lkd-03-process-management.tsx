"use client";

import {
  KernelDesignEvidenceLab,
  type KernelDesignEvidenceModel,
} from "@/components/mdx/linux-kernel-design/v2/kernel-design-evidence-lab";

const model = {
  unitId: "lkd-unit-03",
  title: "第3章 进程管理",
  question: "task、线程、mm、fork/COW与退出回收怎样组成可追踪生命周期？",
  concepts: [
    "第3章 进程管理",
    "3.1 进程",
    "3.2 进程描述符及任务结构",
    "3.2.1 分配进程描述符",
    "3.2.2 进程描述符的存放",
    "3.2.3 进程状态",
    "3.2.4 设置当前进程状态",
    "3.2.5 进程上下文",
    "3.2.6 进程家族树",
    "3.3 进程创建",
    "3.3.1 写时拷贝",
    "3.3.2 fork()",
    "3.3.3 vfork()",
    "3.4 线程在Linux中的实现",
    "3.4.1 创建线程",
    "3.4.2 内核线程",
    "3.5 进程终结",
    "3.5.1 删除进程描述符",
    "3.5.2 孤儿进程造成的进退维谷",
    "3.6 小结",
  ],
  invariant: "创建、共享、分离、退出与回收保持引用和父子关系",
  fault: "把线程当独立进程实现、忽略COW首次写入或提前释放任务对象",
  artifact: "task/mm/VMA/页表轨迹、COW缺页与退出回收记录",
  probe: "process",
  stages: [
    {
      label: "冻结对象身份",
      object:
        "第3章 进程管理涉及的进程状态、task结构、fork/vfork、线程、内核线程与终结",
      control: "记录提交、配置、架构、上下文与输入",
      signal: "对象地址/ID、初始状态和所有者",
      rollback: "恢复干净快照与参考构建",
    },
    {
      label: "执行参考路径",
      object: "第3章 进程管理的参考对象链",
      control: "只运行预注册基线操作",
      signal:
        "状态转移、tracepoint、计数与“创建、共享、分离、退出与回收保持引用和父子关系”",
      rollback: "停止负载并核对无残留对象",
    },
    {
      label: "注入唯一故障",
      object: "第3章 进程管理的故障边界",
      control:
        "只注入“把线程当独立进程实现、忽略COW首次写入或提前释放任务对象”",
      signal: "相对基线的首个状态、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并清理副作用",
    },
    {
      label: "同输入恢复",
      object: "第3章 进程管理的恢复对象链",
      control: "以相同构建、机器和输入重放",
      signal:
        "重新满足“创建、共享、分离、退出与回收保持引用和父子关系”且资源计数回基线",
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

export function Lkd03ProcessManagementObjectVersionLab() {
  return <KernelDesignEvidenceLab model={model} view="object-version" />;
}

export function Lkd03ProcessManagementExecutableProbeLab() {
  return <KernelDesignEvidenceLab model={model} view="executable-probe" />;
}

export function Lkd03ProcessManagementTraceGateLab() {
  return <KernelDesignEvidenceLab model={model} view="trace-gate" />;
}
