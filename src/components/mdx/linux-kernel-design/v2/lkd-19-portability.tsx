"use client";

import {
  KernelDesignEvidenceLab,
  type KernelDesignEvidenceModel,
} from "@/components/mdx/linux-kernel-design/v2/kernel-design-evidence-lab";

const model = {
  unitId: "lkd-unit-19",
  title: "第19章 可移植性",
  question: "字长、类型、对齐、字节序、时间、页长与内存序怎样用架构矩阵验收？",
  concepts: [
    "第19章 可移植性",
    "19.1 可移植操作系统",
    "19.2 Linux移植史",
    "19.3 字长和数据类型",
    "19.3.1 不透明类型",
    "19.3.2 指定数据类型",
    "19.3.3 长度明确的数据类型",
    "19.3.4 char型的符号问题",
    "19.4 数据对齐",
    "19.4.1 避免对齐引发的问题",
    "19.4.2 非标准类型的对齐",
    "19.4.3 结构体填补",
    "19.5 字节顺序",
    "19.6 时间",
    "19.7 页长度",
    "19.8 处理器排序",
    "19.9 SMP、内核抢占、高端内存",
    "19.10 小结",
  ],
  invariant: "显式宽度、布局、转换和内存序在目标架构矩阵成立",
  fault: "假定long和指针宽度、直接序列化结构体或依赖char符号性",
  artifact: "多架构构建、布局断言、字节夹具、页大小与litmus结果",
  probe: "portability",
  stages: [
    {
      label: "冻结对象身份",
      object:
        "第19章 可移植性涉及的移植史、字长类型、对齐填充、字节序、时间、页长和处理器排序",
      control: "记录提交、配置、架构、上下文与输入",
      signal: "对象地址/ID、初始状态和所有者",
      rollback: "恢复干净快照与参考构建",
    },
    {
      label: "执行参考路径",
      object: "第19章 可移植性的参考对象链",
      control: "只运行预注册基线操作",
      signal:
        "状态转移、tracepoint、计数与“显式宽度、布局、转换和内存序在目标架构矩阵成立”",
      rollback: "停止负载并核对无残留对象",
    },
    {
      label: "注入唯一故障",
      object: "第19章 可移植性的故障边界",
      control: "只注入“假定long和指针宽度、直接序列化结构体或依赖char符号性”",
      signal: "相对基线的首个状态、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并清理副作用",
    },
    {
      label: "同输入恢复",
      object: "第19章 可移植性的恢复对象链",
      control: "以相同构建、机器和输入重放",
      signal:
        "重新满足“显式宽度、布局、转换和内存序在目标架构矩阵成立”且资源计数回基线",
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

export function Lkd19PortabilityObjectVersionLab() {
  return <KernelDesignEvidenceLab model={model} view="object-version" />;
}

export function Lkd19PortabilityExecutableProbeLab() {
  return <KernelDesignEvidenceLab model={model} view="executable-probe" />;
}

export function Lkd19PortabilityTraceGateLab() {
  return <KernelDesignEvidenceLab model={model} view="trace-gate" />;
}
