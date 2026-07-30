"use client";

import {
  KernelDesignEvidenceLab,
  type KernelDesignEvidenceModel,
} from "@/components/mdx/linux-kernel-design/v2/kernel-design-evidence-lab";

const model = {
  unitId: "lkd-unit-13",
  title: "第13章 虚拟文件系统",
  question:
    "VFS的superblock、inode、dentry、file与进程文件表怎样连接路径语义？",
  concepts: [
    "第13章 虚拟文件系统",
    "13.1 通用文件系统接口",
    "13.2 文件系统抽象层",
    "13.3 UNIX文件系统",
    "13.4 VFS对象及其数据结构",
    "13.5 超级块对象",
    "13.6 超级块操作",
    "13.7 索引节点对象",
    "13.8 索引节点操作",
    "13.9 目录项对象",
    "13.9.1 目录项状态",
    "13.9.2 目录项缓存",
    "13.10 目录项操作",
    "13.11 文件对象",
    "13.12 文件操作",
    "13.13 和文件系统相关的数据结构",
    "13.14 和进程相关的数据结构",
    "13.15 小结",
  ],
  invariant: "路径解析返回正确对象且引用、锁和权限检查闭合",
  fault: "把dentry当磁盘目录项、忽略负dentry/挂载边界或并发重命名",
  artifact: "对象关系图、路径/挂载trace、dentry缓存与引用记录",
  probe: "vfs",
  stages: [
    {
      label: "冻结对象身份",
      object:
        "第13章 虚拟文件系统涉及的通用接口、抽象层、VFS四类对象、操作、缓存和进程关系",
      control: "记录提交、配置、架构、上下文与输入",
      signal: "对象地址/ID、初始状态和所有者",
      rollback: "恢复干净快照与参考构建",
    },
    {
      label: "执行参考路径",
      object: "第13章 虚拟文件系统的参考对象链",
      control: "只运行预注册基线操作",
      signal:
        "状态转移、tracepoint、计数与“路径解析返回正确对象且引用、锁和权限检查闭合”",
      rollback: "停止负载并核对无残留对象",
    },
    {
      label: "注入唯一故障",
      object: "第13章 虚拟文件系统的故障边界",
      control:
        "只注入“把dentry当磁盘目录项、忽略负dentry/挂载边界或并发重命名”",
      signal: "相对基线的首个状态、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并清理副作用",
    },
    {
      label: "同输入恢复",
      object: "第13章 虚拟文件系统的恢复对象链",
      control: "以相同构建、机器和输入重放",
      signal:
        "重新满足“路径解析返回正确对象且引用、锁和权限检查闭合”且资源计数回基线",
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

export function Lkd13VfsObjectVersionLab() {
  return <KernelDesignEvidenceLab model={model} view="object-version" />;
}

export function Lkd13VfsExecutableProbeLab() {
  return <KernelDesignEvidenceLab model={model} view="executable-probe" />;
}

export function Lkd13VfsTraceGateLab() {
  return <KernelDesignEvidenceLab model={model} view="trace-gate" />;
}
