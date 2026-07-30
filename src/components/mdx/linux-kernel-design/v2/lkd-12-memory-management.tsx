"use client";

import {
  KernelDesignEvidenceLab,
  type KernelDesignEvidenceModel,
} from "@/components/mdx/linux-kernel-design/v2/kernel-design-evidence-lab";

const model = {
  unitId: "lkd-unit-12",
  title: "第12章 内存管理",
  question:
    "页、区、kmalloc/vmalloc、slab、栈、高端内存与per-CPU分配怎样按约束选择？",
  concepts: [
    "第12章 内存管理",
    "12.1 页",
    "12.2 区",
    "12.3 获得页",
    "12.3.1 获得填充为0的页",
    "12.3.2 释放页",
    "12.4 kmalloc()",
    "12.4.1 gfp_mask标志",
    "12.4.2 kfree()",
    "12.5 vmalloc()",
    "12.6 slab层",
    "12.6.1 slab层的设计",
    "12.6.2 slab分配器的接口",
    "12.7 在栈上的静态分配",
    "12.7.1 单页内核栈",
    "12.7.2 在栈上光明正大地工作",
    "12.8 高端内存的映射",
    "12.8.1 永久映射",
    "12.8.2 临时映射",
    "12.9 每个CPU的分配",
    "12.10 新的每个CPU接口",
    "12.10.1 编译时的每个CPU数据",
    "12.10.2 运行时的每个CPU数据",
    "12.11 使用每个CPU数据的原因",
    "12.12 分配函数的选择",
    "12.13 小结",
  ],
  invariant: "连续性、上下文、NUMA、生命周期和释放协议均满足",
  fault: "原子上下文睡眠分配、请求不必要高order块或释放身份不匹配",
  artifact: "分配标志、页/folio、slab、失败注入、内存与释放轨迹",
  probe: "allocator",
  stages: [
    {
      label: "冻结对象身份",
      object:
        "第12章 内存管理涉及的页、区、分配器、slab、栈、高端映射、per-CPU数据与选择",
      control: "记录提交、配置、架构、上下文与输入",
      signal: "对象地址/ID、初始状态和所有者",
      rollback: "恢复干净快照与参考构建",
    },
    {
      label: "执行参考路径",
      object: "第12章 内存管理的参考对象链",
      control: "只运行预注册基线操作",
      signal:
        "状态转移、tracepoint、计数与“连续性、上下文、NUMA、生命周期和释放协议均满足”",
      rollback: "停止负载并核对无残留对象",
    },
    {
      label: "注入唯一故障",
      object: "第12章 内存管理的故障边界",
      control:
        "只注入“原子上下文睡眠分配、请求不必要高order块或释放身份不匹配”",
      signal: "相对基线的首个状态、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并清理副作用",
    },
    {
      label: "同输入恢复",
      object: "第12章 内存管理的恢复对象链",
      control: "以相同构建、机器和输入重放",
      signal:
        "重新满足“连续性、上下文、NUMA、生命周期和释放协议均满足”且资源计数回基线",
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

export function Lkd12MemoryManagementObjectVersionLab() {
  return <KernelDesignEvidenceLab model={model} view="object-version" />;
}

export function Lkd12MemoryManagementExecutableProbeLab() {
  return <KernelDesignEvidenceLab model={model} view="executable-probe" />;
}

export function Lkd12MemoryManagementTraceGateLab() {
  return <KernelDesignEvidenceLab model={model} view="trace-gate" />;
}
