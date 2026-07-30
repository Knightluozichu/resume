"use client";

import {
  KernelDesignEvidenceLab,
  type KernelDesignEvidenceModel,
} from "@/components/mdx/linux-kernel-design/v2/kernel-design-evidence-lab";

const model = {
  unitId: "lkd-unit-01",
  title: "第1章 Linux内核简介",
  question: "2.6.34的内核身份怎样与当前目标构建分轨，避免把版本号当机制？",
  concepts: [
    "第1章 Linux内核简介",
    "1.1 UNIX的历史",
    "1.2 追寻Linus足迹：Linux简介",
    "1.3 操作系统和内核简介",
    "1.4 Linux内核和传统UNIX内核的比较",
    "1.5 Linux内核版本",
    "1.6 Linux内核开发者社区",
    "1.7 小结",
  ],
  invariant: "每条陈述绑定源码提交、配置、架构与时间轨",
  fault: "把书中版本命名或传统UNIX比较直接推广到当前发行版",
  artifact: "版本身份表、历史/当前差分与社区来源图",
  probe: "identity",
  stages: [
    {
      label: "冻结对象身份",
      object:
        "第1章 Linux内核简介涉及的UNIX历史、Linux版本、内核职责与开发者社区",
      control: "记录提交、配置、架构、上下文与输入",
      signal: "对象地址/ID、初始状态和所有者",
      rollback: "恢复干净快照与参考构建",
    },
    {
      label: "执行参考路径",
      object: "第1章 Linux内核简介的参考对象链",
      control: "只运行预注册基线操作",
      signal:
        "状态转移、tracepoint、计数与“每条陈述绑定源码提交、配置、架构与时间轨”",
      rollback: "停止负载并核对无残留对象",
    },
    {
      label: "注入唯一故障",
      object: "第1章 Linux内核简介的故障边界",
      control: "只注入“把书中版本命名或传统UNIX比较直接推广到当前发行版”",
      signal: "相对基线的首个状态、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并清理副作用",
    },
    {
      label: "同输入恢复",
      object: "第1章 Linux内核简介的恢复对象链",
      control: "以相同构建、机器和输入重放",
      signal:
        "重新满足“每条陈述绑定源码提交、配置、架构与时间轨”且资源计数回基线",
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

export function Lkd01LinuxKernelIntroObjectVersionLab() {
  return <KernelDesignEvidenceLab model={model} view="object-version" />;
}

export function Lkd01LinuxKernelIntroExecutableProbeLab() {
  return <KernelDesignEvidenceLab model={model} view="executable-probe" />;
}

export function Lkd01LinuxKernelIntroTraceGateLab() {
  return <KernelDesignEvidenceLab model={model} view="trace-gate" />;
}
