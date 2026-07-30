"use client";

import {
  KernelDesignEvidenceLab,
  type KernelDesignEvidenceModel,
} from "@/components/mdx/linux-kernel-design/v2/kernel-design-evidence-lab";

const model = {
  unitId: "lkd-unit-15",
  title: "第15章 进程地址空间",
  question: "mm、VMA、mmap/munmap、页表与当前maple tree锁层怎样迁移？",
  concepts: [
    "第15章 进程地址空间",
    "15.1 地址空间",
    "15.2 内存描述符",
    "15.2.1 分配内存描述符",
    "15.2.2 撤销内存描述符",
    "15.2.3 mm_struct与内核线程",
    "15.3 虚拟内存区域",
    "15.3.1 VMA标志",
    "15.3.2 VMA操作",
    "15.3.3 内存区域的树型结构和内存区域的链表结构",
    "15.3.4 实际使用中的内存区域",
    "15.4 操作内存区域",
    "15.4.1 find_vma()",
    "15.4.2 find_vma_prev()",
    "15.4.3 find_vma_intersection()",
    "15.5 mmap()和do_mmap()：创建地址 区间",
    "15.6 munmap()和do_munmap()：删除 地址区间",
    "15.7 页表",
    "15.8 小结",
  ],
  invariant: "地址区间不重叠且权限、索引、页表与锁保护一致",
  fault: "继续假定VMA只在链表/红黑树、违反mmap/VMA/rmap锁序",
  artifact: "mm/VMA图、maple tree查询、锁状态、页表与缺页轨迹",
  probe: "vma",
  stages: [
    {
      label: "冻结对象身份",
      object:
        "第15章 进程地址空间涉及的地址空间、mm、VMA、区域操作、mmap/munmap与页表",
      control: "记录提交、配置、架构、上下文与输入",
      signal: "对象地址/ID、初始状态和所有者",
      rollback: "恢复干净快照与参考构建",
    },
    {
      label: "执行参考路径",
      object: "第15章 进程地址空间的参考对象链",
      control: "只运行预注册基线操作",
      signal:
        "状态转移、tracepoint、计数与“地址区间不重叠且权限、索引、页表与锁保护一致”",
      rollback: "停止负载并核对无残留对象",
    },
    {
      label: "注入唯一故障",
      object: "第15章 进程地址空间的故障边界",
      control: "只注入“继续假定VMA只在链表/红黑树、违反mmap/VMA/rmap锁序”",
      signal: "相对基线的首个状态、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并清理副作用",
    },
    {
      label: "同输入恢复",
      object: "第15章 进程地址空间的恢复对象链",
      control: "以相同构建、机器和输入重放",
      signal:
        "重新满足“地址区间不重叠且权限、索引、页表与锁保护一致”且资源计数回基线",
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

export function Lkd15ProcessAddressSpaceObjectVersionLab() {
  return <KernelDesignEvidenceLab model={model} view="object-version" />;
}

export function Lkd15ProcessAddressSpaceExecutableProbeLab() {
  return <KernelDesignEvidenceLab model={model} view="executable-probe" />;
}

export function Lkd15ProcessAddressSpaceTraceGateLab() {
  return <KernelDesignEvidenceLab model={model} view="trace-gate" />;
}
