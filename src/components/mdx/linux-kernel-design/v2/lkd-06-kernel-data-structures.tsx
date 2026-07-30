"use client";

import {
  KernelDesignEvidenceLab,
  type KernelDesignEvidenceModel,
} from "@/components/mdx/linux-kernel-design/v2/kernel-design-evidence-lab";

const model = {
  unitId: "lkd-unit-06",
  title: "第6章 内核数据结构",
  question: "链表、kfifo、ID映射与树怎样按操作、并发和生命周期选择？",
  concepts: [
    "第6章 内核数据结构",
    "6.1 链表",
    "6.1.1 单向链表和双向链表",
    "6.1.2 环形链表",
    "6.1.3 沿链表移动",
    "6.1.4 Linux 内核中的实现",
    "6.1.5 操作链表",
    "6.1.6 遍历链表",
    "6.2 队列",
    "6.2.1 kfifo",
    "6.2.2 创建队列",
    "6.2.3 推入队列数据",
    "6.2.4 摘取队列数据",
    "6.2.5 获取队列长度",
    "6.2.6 重置和撤销队列",
    "6.2.7 队列使用举例",
    "6.3 映射",
    "6.3.1 初始化一个idr",
    "6.3.2 分配一个新的UID",
    "6.3.3 查找UID",
    "6.3.4 删除UID",
    "6.3.5 撤销idr",
    "6.4 二叉树",
    "6.4.1 二叉搜索树",
    "6.4.2 自平衡二叉搜索树",
    "6.5 数据结构以及选择",
    "6.6 算法复杂度",
    "6.6.1 算法",
    "6.6.2 大O符号",
    "6.6.3 大Θ符号",
    "6.6.4 时间复杂度",
    "6.7 小结",
  ],
  invariant: "成员集合、次序、引用和锁在每次操作前后成立",
  fault: "照搬旧idr或红黑树字段、遍历时并发删除或破坏容器不变量",
  artifact: "容器状态图、操作计数、并发保护与当前接口迁移表",
  probe: "structure",
  stages: [
    {
      label: "冻结对象身份",
      object: "第6章 内核数据结构涉及的链表、队列、映射、二叉树、选择与复杂度",
      control: "记录提交、配置、架构、上下文与输入",
      signal: "对象地址/ID、初始状态和所有者",
      rollback: "恢复干净快照与参考构建",
    },
    {
      label: "执行参考路径",
      object: "第6章 内核数据结构的参考对象链",
      control: "只运行预注册基线操作",
      signal:
        "状态转移、tracepoint、计数与“成员集合、次序、引用和锁在每次操作前后成立”",
      rollback: "停止负载并核对无残留对象",
    },
    {
      label: "注入唯一故障",
      object: "第6章 内核数据结构的故障边界",
      control: "只注入“照搬旧idr或红黑树字段、遍历时并发删除或破坏容器不变量”",
      signal: "相对基线的首个状态、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并清理副作用",
    },
    {
      label: "同输入恢复",
      object: "第6章 内核数据结构的恢复对象链",
      control: "以相同构建、机器和输入重放",
      signal:
        "重新满足“成员集合、次序、引用和锁在每次操作前后成立”且资源计数回基线",
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

export function Lkd06KernelDataStructuresObjectVersionLab() {
  return <KernelDesignEvidenceLab model={model} view="object-version" />;
}

export function Lkd06KernelDataStructuresExecutableProbeLab() {
  return <KernelDesignEvidenceLab model={model} view="executable-probe" />;
}

export function Lkd06KernelDataStructuresTraceGateLab() {
  return <KernelDesignEvidenceLab model={model} view="trace-gate" />;
}
