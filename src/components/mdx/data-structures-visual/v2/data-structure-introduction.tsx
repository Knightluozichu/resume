"use client";

import {
  DataStructureEvidenceLab,
  type DataStructureEvidenceModel,
} from "@/components/mdx/data-structures-visual/v2/data-structure-evidence-lab";

const model = {
  unitId: "dsvc-01",
  title: "第1章 数据结构绪论",
  question:
    "抽象数据类型、逻辑关系与物理存储怎样形成不依赖某段代码的结构合同？",
  concepts: [
    "第1章 数据结构绪论",
    "1.1 开场白",
    "1.2 你数据结构怎么学的",
    "1.3 数据结构起源",
    "1.4 基本概念和术语",
    "1.4.1 数据",
    "1.4.2 数据元素",
    "1.4.3 数据项",
    "1.4.4 数据对象",
    "1.4.5 数据结构",
    "1.5 逻辑结构与物理结构",
    "1.5.1 逻辑结构",
    "1.5.2 物理结构",
    "1.6 数据类型",
    "1.6.1 数据类型定义",
    "1.6.2 抽象数据类型",
    "1.7 总结回顾",
    "1.8 结尾语",
  ],
  invariant: "抽象元素集合、逻辑次序与操作语义不随合法物理表示改变",
  fault: "把容量当逻辑长度，或把指针地址邻近误说成抽象元素相邻",
  artifact: "ADT签名、逻辑关系、两种表示映射、边界输入与不变量检查",
  experiment: "contract",
  operations: [
    {
      label: "定义对象",
      precondition: "元素域和相等关系已冻结",
      action: "声明值集合与逻辑次序",
      invariant: "表示中无额外可观察语义",
    },
    {
      label: "选择表示",
      precondition: "操作合同不变",
      action: "映射到数组或链式结点",
      invariant: "每个抽象元素恰有一个表示",
    },
    {
      label: "执行插入",
      precondition: "位置在0到length之间",
      action: "建立新元素并保持次序",
      invariant: "length增加1且旧元素相对次序不变",
    },
    {
      label: "执行删除",
      precondition: "目标位置有效",
      action: "移除目标并闭合表示",
      invariant: "length减少1且无悬空可达关系",
    },
  ],
  gates: [
    {
      label: "来源、样章与坐标门",
      detail:
        "第1章 数据结构绪论分开出版社291坐标、第2章样章、当前参考和本站独立实验。",
    },
    {
      label: "ADT与表示门",
      detail:
        "第1章 数据结构绪论记录对象、操作、逻辑关系、物理表示、容量和边界约定。",
    },
    {
      label: "前后置条件门",
      detail:
        "第1章 数据结构绪论每次操作先验证输入，再提交状态，并核对“抽象元素集合、逻辑次序与操作语义不随合法物理表示改变”。",
    },
    {
      label: "真实计数门",
      detail:
        "第1章 数据结构绪论从轨迹统计读取、比较、写入、搬移、改链或松弛，不生成综合效率分。",
    },
    {
      label: "单故障与首错门",
      detail:
        "第1章 数据结构绪论只注入“把容量当逻辑长度，或把指针地址邻近误说成抽象元素相邻”，定位首个越界、错误状态或错误输出。",
    },
    {
      label: "恢复、工件与未知门",
      detail:
        "第1章 数据结构绪论交付ADT签名、逻辑关系、两种表示映射、边界输入与不变量检查，同输入恢复结构、输出与计数并报告未测范围。",
    },
  ],
} as const satisfies DataStructureEvidenceModel;

export function DataStructureIntroductionRepresentationContractLab() {
  return (
    <DataStructureEvidenceLab model={model} view="representation-contract" />
  );
}

export function DataStructureIntroductionOperationCounterLab() {
  return <DataStructureEvidenceLab model={model} view="operation-counter" />;
}

export function DataStructureIntroductionTraceGateLab() {
  return <DataStructureEvidenceLab model={model} view="trace-gate" />;
}
