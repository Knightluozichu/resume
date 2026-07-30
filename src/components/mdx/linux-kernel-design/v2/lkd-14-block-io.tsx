"use client";

import {
  KernelDesignEvidenceLab,
  type KernelDesignEvidenceModel,
} from "@/components/mdx/linux-kernel-design/v2/kernel-design-evidence-lab";

const model = {
  unitId: "lkd-unit-14",
  title: "第14章 块I/O层",
  question: "bio、request、队列与I/O调度怎样从提交到完成连接当前blk-mq？",
  concepts: [
    "第14章 块I/O层",
    "14.1 剖析一个块设备",
    "14.2 缓冲区和缓冲区头",
    "14.3 bio结构体",
    "14.3.1 I/O向量",
    "14.3.2 新老方法对比",
    "14.4 请求队列",
    "14.5 I/O调度程序",
    "14.5.1 I/O调度程序的工作",
    "14.5.2 Linus电梯",
    "14.5.3 最终期限I/O调度程序",
    "14.5.4 预测I/O调度程序",
    "14.5.5 完全公正的排队I/O调度程序",
    "14.5.6 空操作的I/O调度程序",
    "14.5.7 I/O调度程序的选择",
    "14.6 小结",
  ],
  invariant: "每个I/O可从发起对象追到队列、设备、完成状态与错误",
  fault: "把书中旧调度器当当前列表、混淆bio与request或忽略部分完成",
  artifact: "bio/request关系、block trace、队列配置、延迟与错误记录",
  probe: "block",
  stages: [
    {
      label: "冻结对象身份",
      object:
        "第14章 块I/O层涉及的块设备、buffer head、bio、请求队列和历史I/O调度器",
      control: "记录提交、配置、架构、上下文与输入",
      signal: "对象地址/ID、初始状态和所有者",
      rollback: "恢复干净快照与参考构建",
    },
    {
      label: "执行参考路径",
      object: "第14章 块I/O层的参考对象链",
      control: "只运行预注册基线操作",
      signal:
        "状态转移、tracepoint、计数与“每个I/O可从发起对象追到队列、设备、完成状态与错误”",
      rollback: "停止负载并核对无残留对象",
    },
    {
      label: "注入唯一故障",
      object: "第14章 块I/O层的故障边界",
      control:
        "只注入“把书中旧调度器当当前列表、混淆bio与request或忽略部分完成”",
      signal: "相对基线的首个状态、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并清理副作用",
    },
    {
      label: "同输入恢复",
      object: "第14章 块I/O层的恢复对象链",
      control: "以相同构建、机器和输入重放",
      signal:
        "重新满足“每个I/O可从发起对象追到队列、设备、完成状态与错误”且资源计数回基线",
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

export function Lkd14BlockIoObjectVersionLab() {
  return <KernelDesignEvidenceLab model={model} view="object-version" />;
}

export function Lkd14BlockIoExecutableProbeLab() {
  return <KernelDesignEvidenceLab model={model} view="executable-probe" />;
}

export function Lkd14BlockIoTraceGateLab() {
  return <KernelDesignEvidenceLab model={model} view="trace-gate" />;
}
