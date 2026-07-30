"use client";

import {
  KernelDesignEvidenceLab,
  type KernelDesignEvidenceModel,
} from "@/components/mdx/linux-kernel-design/v2/kernel-design-evidence-lab";

const model = {
  unitId: "lkd-unit-05",
  title: "第5章 系统调用",
  question: "系统调用怎样从ABI入口经过参数验证到上下文与返回值形成闭环？",
  concepts: [
    "第5章 系统调用",
    "5.1 与内核通信",
    "5.2 API、POSIX和C库",
    "5.3 系统调用",
    "5.3.1 系统调用号",
    "5.3.2 系统调用的性能",
    "5.4 系统调用处理程序",
    "5.4.1 指定恰当的系统调用",
    "5.4.2 参数传递",
    "5.5 系统调用的实现",
    "5.5.1 实现系统调用",
    "5.5.2 参数验证",
    "5.6 系统调用上下文",
    "5.6.1 绑定一个系统调用的最后步骤",
    "5.6.2 从用户空间访问系统调用",
    "5.6.3 为什么不通过系统调用的方式实现",
    "5.7 小结",
  ],
  invariant: "每条路径验证号、参数、权限、复制结果、副作用与错误码",
  fault: "把用户指针当内核指针、假定一次复制完整或用性能替代语义",
  artifact: "ABI表、入口/退出trace、用户复制与错误注入记录",
  probe: "syscall",
  stages: [
    {
      label: "冻结对象身份",
      object:
        "第5章 系统调用涉及的API/POSIX/C库、调用号、处理程序、参数传递、实现与上下文",
      control: "记录提交、配置、架构、上下文与输入",
      signal: "对象地址/ID、初始状态和所有者",
      rollback: "恢复干净快照与参考构建",
    },
    {
      label: "执行参考路径",
      object: "第5章 系统调用的参考对象链",
      control: "只运行预注册基线操作",
      signal:
        "状态转移、tracepoint、计数与“每条路径验证号、参数、权限、复制结果、副作用与错误码”",
      rollback: "停止负载并核对无残留对象",
    },
    {
      label: "注入唯一故障",
      object: "第5章 系统调用的故障边界",
      control: "只注入“把用户指针当内核指针、假定一次复制完整或用性能替代语义”",
      signal: "相对基线的首个状态、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并清理副作用",
    },
    {
      label: "同输入恢复",
      object: "第5章 系统调用的恢复对象链",
      control: "以相同构建、机器和输入重放",
      signal:
        "重新满足“每条路径验证号、参数、权限、复制结果、副作用与错误码”且资源计数回基线",
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

export function Lkd05SystemCallsObjectVersionLab() {
  return <KernelDesignEvidenceLab model={model} view="object-version" />;
}

export function Lkd05SystemCallsExecutableProbeLab() {
  return <KernelDesignEvidenceLab model={model} view="executable-probe" />;
}

export function Lkd05SystemCallsTraceGateLab() {
  return <KernelDesignEvidenceLab model={model} view="trace-gate" />;
}
