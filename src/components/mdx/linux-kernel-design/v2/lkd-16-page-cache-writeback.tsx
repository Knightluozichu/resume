"use client";

import {
  KernelDesignEvidenceLab,
  type KernelDesignEvidenceModel,
} from "@/components/mdx/linux-kernel-design/v2/kernel-design-evidence-lab";

const model = {
  unitId: "lkd-unit-16",
  title: "第16章 页高速缓存和页回写",
  question:
    "页缓存、address_space、历史基树/页哈希与写回怎样迁移到当前folio/xarray路径？",
  concepts: [
    "第16章 页高速缓存和页回写",
    "16.1 缓存手段",
    "16.1.1 写缓存",
    "16.1.2 缓存回收",
    "16.2 Linux页高速缓存",
    "16.2.1 address_space对象",
    "16.2.2 address_space操作",
    "16.2.3 基树",
    "16.2.4 以前的页散列表",
    "16.3 缓冲区高速缓存",
    "16.4 flusher线程",
    "16.4.1 膝上型计算机模式",
    "16.4.2 历史上的bdflush、kupdated和pdflush",
    "16.4.3 避免拥塞的方法：使用多线程",
    "16.5 小结",
  ],
  invariant: "脏化、节流、提交、完成与回收可按mapping和设备闭环",
  fault: "用旧flusher名字解释当前实现、持续脏化超过写回或忽略节流",
  artifact: "folio/mapping状态、writeback/block事件、节流和排空记录",
  probe: "writeback",
  stages: [
    {
      label: "冻结对象身份",
      object:
        "第16章 页高速缓存和页回写涉及的缓存、回收、页缓存、address_space、历史索引与flusher线程",
      control: "记录提交、配置、架构、上下文与输入",
      signal: "对象地址/ID、初始状态和所有者",
      rollback: "恢复干净快照与参考构建",
    },
    {
      label: "执行参考路径",
      object: "第16章 页高速缓存和页回写的参考对象链",
      control: "只运行预注册基线操作",
      signal:
        "状态转移、tracepoint、计数与“脏化、节流、提交、完成与回收可按mapping和设备闭环”",
      rollback: "停止负载并核对无残留对象",
    },
    {
      label: "注入唯一故障",
      object: "第16章 页高速缓存和页回写的故障边界",
      control:
        "只注入“用旧flusher名字解释当前实现、持续脏化超过写回或忽略节流”",
      signal: "相对基线的首个状态、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并清理副作用",
    },
    {
      label: "同输入恢复",
      object: "第16章 页高速缓存和页回写的恢复对象链",
      control: "以相同构建、机器和输入重放",
      signal:
        "重新满足“脏化、节流、提交、完成与回收可按mapping和设备闭环”且资源计数回基线",
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

export function Lkd16PageCacheWritebackObjectVersionLab() {
  return <KernelDesignEvidenceLab model={model} view="object-version" />;
}

export function Lkd16PageCacheWritebackExecutableProbeLab() {
  return <KernelDesignEvidenceLab model={model} view="executable-probe" />;
}

export function Lkd16PageCacheWritebackTraceGateLab() {
  return <KernelDesignEvidenceLab model={model} view="trace-gate" />;
}
