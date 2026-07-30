"use client";

import {
  KernelDesignEvidenceLab,
  type KernelDesignEvidenceModel,
} from "@/components/mdx/linux-kernel-design/v2/kernel-design-evidence-lab";

const model = {
  unitId: "lkd-unit-20",
  title: "第20章 补丁、开发和社区",
  question: "当前编码、MAINTAINERS、补丁、审阅与错误报告怎样形成可复核贡献链？",
  concepts: [
    "第20章 补丁、开发和社区",
    "20.1 社区",
    "20.2 Linux编码风格",
    "20.2.1 缩进",
    "20.2.2 switch 语句",
    "20.2.3 空格",
    "20.2.4 花括号",
    "20.2.5 每行代码的长度",
    "20.2.6 命名规范",
    "20.2.7 函数",
    "20.2.8 注释",
    "20.2.9 typedef",
    "20.2.10 多用现成的东西",
    "20.2.11 在源码中减少使用ifdef",
    "20.2.12 结构初始化",
    "20.2.13 代码的事后修正",
    "20.3 管理系统",
    "20.4 提交错误报告",
    "20.5 补丁",
    "20.5.1 创建补丁",
    "20.5.2 用Git创建补丁",
    "20.5.3 提交补丁",
    "20.6 小结",
  ],
  invariant: "每个补丁一个逻辑变化且历史、测试、接收者与审阅闭合",
  fault: "混入无关格式化、发送错误维护者、缺测试或提交无证据性能主张",
  artifact: "补丁系列、base commit、检查/测试、维护者与审阅回复",
  probe: "patch",
  stages: [
    {
      label: "冻结对象身份",
      object:
        "第20章 补丁、开发和社区涉及的社区、编码风格、管理系统、错误报告、补丁生成与提交",
      control: "记录提交、配置、架构、上下文与输入",
      signal: "对象地址/ID、初始状态和所有者",
      rollback: "恢复干净快照与参考构建",
    },
    {
      label: "执行参考路径",
      object: "第20章 补丁、开发和社区的参考对象链",
      control: "只运行预注册基线操作",
      signal:
        "状态转移、tracepoint、计数与“每个补丁一个逻辑变化且历史、测试、接收者与审阅闭合”",
      rollback: "停止负载并核对无残留对象",
    },
    {
      label: "注入唯一故障",
      object: "第20章 补丁、开发和社区的故障边界",
      control:
        "只注入“混入无关格式化、发送错误维护者、缺测试或提交无证据性能主张”",
      signal: "相对基线的首个状态、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并清理副作用",
    },
    {
      label: "同输入恢复",
      object: "第20章 补丁、开发和社区的恢复对象链",
      control: "以相同构建、机器和输入重放",
      signal:
        "重新满足“每个补丁一个逻辑变化且历史、测试、接收者与审阅闭合”且资源计数回基线",
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

export function Lkd20PatchesCommunityObjectVersionLab() {
  return <KernelDesignEvidenceLab model={model} view="object-version" />;
}

export function Lkd20PatchesCommunityExecutableProbeLab() {
  return <KernelDesignEvidenceLab model={model} view="executable-probe" />;
}

export function Lkd20PatchesCommunityTraceGateLab() {
  return <KernelDesignEvidenceLab model={model} view="trace-gate" />;
}
