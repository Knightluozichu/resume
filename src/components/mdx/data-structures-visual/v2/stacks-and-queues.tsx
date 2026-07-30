"use client";

import {
  DataStructureEvidenceLab,
  type DataStructureEvidenceModel,
} from "@/components/mdx/data-structures-visual/v2/data-structure-evidence-lab";

const model = {
  unitId: "dsvc-04",
  title: "第4章 栈与队列",
  question: "栈、队列与循环缓冲怎样用端点状态证明LIFO、FIFO和空满边界？",
  concepts: [
    "第4章 栈与队列",
    "4.1 开场白",
    "4.2 栈的定义",
    "4.2.1 栈的定义",
    "4.2.2 进栈出栈变化形式",
    "4.3 栈的抽象数据类型",
    "4.4 栈的顺序存储结构及实现",
    "4.4.1 栈的顺序存储结构",
    "4.4.2 栈的顺序存储结构——进栈操作",
    "4.4.3 栈的顺序存储结构——出栈操作",
    "4.5 两栈共享空间",
    "4.6 栈的链式存储结构及实现",
    "4.6.1 栈的链式存储结构",
    "4.6.2 栈的链式存储结构——进栈操作",
    "4.6.3 栈的链式存储结构——出栈操作",
    "4.7 栈的作用",
    "4.8 栈的应用——递归",
    "4.8.1 斐波那契数列的实现",
    "4.8.2 递归的定义",
    "4.9 栈的应用——四则运算表达式求值",
    "4.9.1 后缀（逆波兰）表示法的定义",
    "4.9.2 后缀表达式的计算结果",
    "4.9.3 中缀表达式转后缀表达式",
    "4.10 队列的定义",
    "4.11 队列的抽象数据类型",
    "4.12 循环队列",
    "4.12.1 队列顺序存储的不足",
    "4.12.2 循环队列的定义",
    "4.13 队列的链式存储结构及实现",
    "4.13.1 队列的链式存储结构——入队",
    "4.13.2 队列的链式存储结构——出队",
    "4.14 总结回顾",
    "4.15 结尾语",
  ],
  invariant: "栈只从同一端提交，队列按入队顺序出队，模回绕不改变逻辑次序",
  fault: "把head等于tail同时解释为空和满，却没有长度字段或保留槽约定",
  artifact: "操作序列、栈顶轨迹、循环队列槽位、表达式栈和空满反例",
  experiment: "stack-queue",
  operations: [
    {
      label: "压栈",
      precondition: "栈未满或结点可分配",
      action: "在top端提交新值",
      invariant: "新值成为唯一栈顶",
    },
    {
      label: "出栈",
      precondition: "栈非空",
      action: "读取并移除top",
      invariant: "返回最近一次未匹配压栈的值",
    },
    {
      label: "入队",
      precondition: "循环队列未满",
      action: "在tail写值并模容量前进",
      invariant: "旧队列次序不变且新值位于末尾",
    },
    {
      label: "出队",
      precondition: "队列非空",
      action: "读取head并模容量前进",
      invariant: "返回最早尚未出队的值",
    },
  ],
  gates: [
    {
      label: "来源、样章与坐标门",
      detail:
        "第4章 栈与队列分开出版社291坐标、第2章样章、当前参考和本站独立实验。",
    },
    {
      label: "ADT与表示门",
      detail:
        "第4章 栈与队列记录对象、操作、逻辑关系、物理表示、容量和边界约定。",
    },
    {
      label: "前后置条件门",
      detail:
        "第4章 栈与队列每次操作先验证输入，再提交状态，并核对“栈只从同一端提交，队列按入队顺序出队，模回绕不改变逻辑次序”。",
    },
    {
      label: "真实计数门",
      detail:
        "第4章 栈与队列从轨迹统计读取、比较、写入、搬移、改链或松弛，不生成综合效率分。",
    },
    {
      label: "单故障与首错门",
      detail:
        "第4章 栈与队列只注入“把head等于tail同时解释为空和满，却没有长度字段或保留槽约定”，定位首个越界、错误状态或错误输出。",
    },
    {
      label: "恢复、工件与未知门",
      detail:
        "第4章 栈与队列交付操作序列、栈顶轨迹、循环队列槽位、表达式栈和空满反例，同输入恢复结构、输出与计数并报告未测范围。",
    },
  ],
} as const satisfies DataStructureEvidenceModel;

export function StacksAndQueuesRepresentationContractLab() {
  return (
    <DataStructureEvidenceLab model={model} view="representation-contract" />
  );
}

export function StacksAndQueuesOperationCounterLab() {
  return <DataStructureEvidenceLab model={model} view="operation-counter" />;
}

export function StacksAndQueuesTraceGateLab() {
  return <DataStructureEvidenceLab model={model} view="trace-gate" />;
}
