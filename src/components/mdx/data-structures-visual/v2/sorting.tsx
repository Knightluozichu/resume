"use client";

import {
  DataStructureEvidenceLab,
  type DataStructureEvidenceModel,
} from "@/components/mdx/data-structures-visual/v2/data-structure-evidence-lab";

const model = {
  unitId: "dsvc-09",
  title: "第9章 排序",
  question:
    "排序正确性、稳定性、比较次数、写入次数与输入分布怎样形成完整选择依据？",
  concepts: [
    "第9章 排序",
    "9.1 开场白",
    "9.2 排序的基本概念与分类",
    "9.2.1 排序的稳定性",
    "9.2.2 内排序与外排序",
    "9.2.3 排序用到的结构与函数",
    "9.3 冒泡排序",
    "9.3.1 最简单排序的实现",
    "9.3.2 冒泡排序算法",
    "9.3.3 冒泡排序优化",
    "9.3.4 冒泡排序复杂度分析",
    "9.4 简单选择排序",
    "9.4.1 简单选择排序算法",
    "9.4.2 简单选择排序复杂度分析",
    "9.5 直接插入排序",
    "9.5.1 直接插入排序算法",
    "9.5.2 直接插入排序复杂度分析",
    "9.6 希尔排序",
    "9.6.1 希尔排序原理",
    "9.6.2 希尔排序算法",
    "9.6.3 希尔排序复杂度分析",
    "9.7 堆排序",
    "9.7.1 堆排序算法",
    "9.7.2 堆排序复杂度分析",
    "9.8 归并排序",
    "9.8.1 归并排序算法",
    "9.8.2 归并排序复杂度分析",
    "9.8.3 非递归实现归并排序",
    "9.9 快速排序",
    "9.9.1 快速排序算法",
    "9.9.2 快速排序复杂度分析",
    "9.9.3 快速排序优化",
    "9.10 总结回顾",
    "9.11 结尾语",
  ],
  invariant: "输出非降且与输入拥有相同元素多重集；稳定算法保持相等键原相对次序",
  fault: "只按大O表格选算法，忽略稳定性、额外空间、写入成本和输入已有序程度",
  artifact: "带身份输入、比较写入轨迹、有序输出、稳定性反例与空间账本",
  experiment: "sort",
  operations: [
    {
      label: "冻结输入身份",
      precondition: "每个键携带原位置",
      action: "复制输入多重集",
      invariant: "后续可检查丢失、重复与稳定性",
    },
    {
      label: "执行比较",
      precondition: "比较器满足一致次序",
      action: "按算法选择键对",
      invariant: "每次分支来自真实比较结果",
    },
    {
      label: "提交写入",
      precondition: "目标槽位有效",
      action: "交换或搬移元素",
      invariant: "当前区间保持算法循环不变量",
    },
    {
      label: "验收输出",
      precondition: "算法终止",
      action: "检查相邻非降与身份多重集",
      invariant: "有序、守恒且稳定性结论可复查",
    },
  ],
  gates: [
    {
      label: "来源、样章与坐标门",
      detail:
        "第9章 排序分开出版社291坐标、第2章样章、当前参考和本站独立实验。",
    },
    {
      label: "ADT与表示门",
      detail: "第9章 排序记录对象、操作、逻辑关系、物理表示、容量和边界约定。",
    },
    {
      label: "前后置条件门",
      detail:
        "第9章 排序每次操作先验证输入，再提交状态，并核对“输出非降且与输入拥有相同元素多重集；稳定算法保持相等键原相对次序”。",
    },
    {
      label: "真实计数门",
      detail:
        "第9章 排序从轨迹统计读取、比较、写入、搬移、改链或松弛，不生成综合效率分。",
    },
    {
      label: "单故障与首错门",
      detail:
        "第9章 排序只注入“只按大O表格选算法，忽略稳定性、额外空间、写入成本和输入已有序程度”，定位首个越界、错误状态或错误输出。",
    },
    {
      label: "恢复、工件与未知门",
      detail:
        "第9章 排序交付带身份输入、比较写入轨迹、有序输出、稳定性反例与空间账本，同输入恢复结构、输出与计数并报告未测范围。",
    },
  ],
} as const satisfies DataStructureEvidenceModel;

export function SortingRepresentationContractLab() {
  return (
    <DataStructureEvidenceLab model={model} view="representation-contract" />
  );
}

export function SortingOperationCounterLab() {
  return <DataStructureEvidenceLab model={model} view="operation-counter" />;
}

export function SortingTraceGateLab() {
  return <DataStructureEvidenceLab model={model} view="trace-gate" />;
}
