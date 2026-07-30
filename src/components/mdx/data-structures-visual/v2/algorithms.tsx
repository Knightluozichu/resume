"use client";

import {
  DataStructureEvidenceLab,
  type DataStructureEvidenceModel,
} from "@/components/mdx/data-structures-visual/v2/data-structure-evidence-lab";

const model = {
  unitId: "dsvc-02",
  title: "第2章 算法",
  question: "正确性、实际操作计数与渐近阶怎样分层，避免用大O替代具体算法证据？",
  concepts: [
    "第2章 算法",
    "2.1 开场白",
    "2.2 数据结构与算法的关系",
    "2.3 两种算法的比较",
    "2.4 算法定义",
    "2.5 算法的特性",
    "2.5.1 输入输出",
    "2.5.2 有穷性",
    "2.5.3 确定性",
    "2.5.4 可行性",
    "2.6 算法设计的要求",
    "2.6.1 正确性",
    "2.6.2 可读性",
    "2.6.3 健壮性",
    "2.6.4 时间效率高和存储量低",
    "2.7 算法效率的度量方法",
    "2.7.1 事后统计方法",
    "2.7.2 事前分析估算方法",
    "2.8 函数的渐近增长",
    "2.9 算法时间复杂度",
    "2.9.1 算法时间复杂度定义",
    "2.9.2 推导大O阶方法",
    "2.9.3 常数阶",
    "2.9.4 线性阶",
    "2.9.5 对数阶",
    "2.9.6 平方阶",
    "2.10 常见的时间复杂度",
    "2.11 最坏情况与平均情况",
    "2.12 算法空间复杂度",
    "2.13 总结回顾",
    "2.14 结尾语",
  ],
  invariant: "两算法返回同一结果，比较次数来自轨迹，渐近结论另带成本模型与量词",
  fault: "只给大O阶却不固定输入模型、基本操作、最坏或平均分布",
  artifact: "前置条件、后置条件、比较轨迹、成本模型、最坏输入与空间账本",
  experiment: "complexity",
  operations: [
    {
      label: "冻结问题",
      precondition: "输入域与目标结果已定义",
      action: "写前置条件和后置条件",
      invariant: "正确性结论不含未声明输入",
    },
    {
      label: "建立参考输出",
      precondition: "小输入可穷举",
      action: "执行直接算法",
      invariant: "参考输出与定义一致",
    },
    {
      label: "记录基本操作",
      precondition: "成本单位已选择",
      action: "逐步计比较、读取与写入",
      invariant: "计数可由轨迹复算",
    },
    {
      label: "推广渐近界",
      precondition: "输入规模变量和量词已声明",
      action: "给上界、下界或紧界",
      invariant: "常数与低阶项不改变所声明阶",
    },
  ],
  gates: [
    {
      label: "来源、样章与坐标门",
      detail:
        "第2章 算法分开出版社291坐标、第2章样章、当前参考和本站独立实验。",
    },
    {
      label: "ADT与表示门",
      detail: "第2章 算法记录对象、操作、逻辑关系、物理表示、容量和边界约定。",
    },
    {
      label: "前后置条件门",
      detail:
        "第2章 算法每次操作先验证输入，再提交状态，并核对“两算法返回同一结果，比较次数来自轨迹，渐近结论另带成本模型与量词”。",
    },
    {
      label: "真实计数门",
      detail:
        "第2章 算法从轨迹统计读取、比较、写入、搬移、改链或松弛，不生成综合效率分。",
    },
    {
      label: "单故障与首错门",
      detail:
        "第2章 算法只注入“只给大O阶却不固定输入模型、基本操作、最坏或平均分布”，定位首个越界、错误状态或错误输出。",
    },
    {
      label: "恢复、工件与未知门",
      detail:
        "第2章 算法交付前置条件、后置条件、比较轨迹、成本模型、最坏输入与空间账本，同输入恢复结构、输出与计数并报告未测范围。",
    },
  ],
} as const satisfies DataStructureEvidenceModel;

export function AlgorithmsRepresentationContractLab() {
  return (
    <DataStructureEvidenceLab model={model} view="representation-contract" />
  );
}

export function AlgorithmsOperationCounterLab() {
  return <DataStructureEvidenceLab model={model} view="operation-counter" />;
}

export function AlgorithmsTraceGateLab() {
  return <DataStructureEvidenceLab model={model} view="trace-gate" />;
}
