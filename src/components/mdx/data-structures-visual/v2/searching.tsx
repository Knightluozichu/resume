"use client";

import {
  DataStructureEvidenceLab,
  type DataStructureEvidenceModel,
} from "@/components/mdx/data-structures-visual/v2/data-structure-evidence-lab";

const model = {
  unitId: "dsvc-08",
  title: "第8章 查找",
  question:
    "静态查找、搜索树、B树与哈希怎样用各自前置条件解释查找轨迹和失败结果？",
  concepts: [
    "第8章 查找",
    "8.1 开场白",
    "8.2 查找概论",
    "8.3 顺序表查找",
    "8.3.1 顺序表查找算法",
    "8.3.2 顺序表查找优化",
    "8.4 有序表查找",
    "8.4.1 折半查找",
    "8.4.2 插值查找",
    "8.4.3 斐波那契查找",
    "8.5 线性索引查找",
    "8.5.1 稠密索引",
    "8.5.2 分块索引",
    "8.5.3 倒排索引",
    "8.6 二叉排序树",
    "8.6.1 二叉排序树的查找操作",
    "8.6.2 二叉排序树的插入操作",
    "8.6.3 二叉排序树的删除操作",
    "8.6.4 二叉排序树总结",
    "8.7 平衡二叉树（AVL树）",
    "8.7.1 平衡二叉树的实现原理",
    "8.7.2 平衡二叉树的实现算法",
    "8.8 多路查找树（B树）",
    "8.8.1 2-3树",
    "8.8.2 2-3-4树",
    "8.8.3 B树",
    "8.8.4 B+树",
    "8.9 散列表查找（哈希表）概述",
    "8.9.1 散列表查找定义",
    "8.9.2 散列表查找步骤",
    "8.10 散列函数的构造方法",
    "8.10.1 直接定址法",
    "8.10.2 数字分析法",
    "8.10.3 平方取中法",
    "8.10.4 折叠法",
    "8.10.5 除留余数法",
    "8.10.6 随机数法",
    "8.11 处理散列冲突的方法",
    "8.11.1 开放定址法",
    "8.11.2 再散列函数法",
    "8.11.3 链地址法",
    "8.11.4 公共溢出区法",
    "8.12 散列表查找的实现",
    "8.12.1 散列表查找的算法实现",
    "8.12.2 散列表查找的性能分析",
    "8.13 总结回顾",
    "8.14 结尾语",
  ],
  invariant: "成功返回的键确实存在，失败证明合法搜索空间已为空或完整探测终止",
  fault: "对未排序输入运行折半查找，或忽略哈希负载因子与冲突策略",
  artifact: "键集合、顺序条件、探测轨迹、树路径、冲突链和负载因子",
  experiment: "search",
  operations: [
    {
      label: "验证输入结构",
      precondition: "查找结构已构建",
      action: "检查排序、BST序或哈希容量",
      invariant: "算法前提与表示真实一致",
    },
    {
      label: "产生探测",
      precondition: "候选区间或桶非空",
      action: "读取中点、树结点或哈希槽",
      invariant: "探测身份在合法范围",
    },
    {
      label: "缩小候选",
      precondition: "比较结果可决定方向",
      action: "删除不可能包含目标的区域",
      invariant: "若目标存在仍留在候选集合",
    },
    {
      label: "提交结果",
      precondition: "命中或候选为空",
      action: "返回位置或未找到",
      invariant: "结果可由原键集合直接复查",
    },
  ],
  gates: [
    {
      label: "来源、样章与坐标门",
      detail:
        "第8章 查找分开出版社291坐标、第2章样章、当前参考和本站独立实验。",
    },
    {
      label: "ADT与表示门",
      detail: "第8章 查找记录对象、操作、逻辑关系、物理表示、容量和边界约定。",
    },
    {
      label: "前后置条件门",
      detail:
        "第8章 查找每次操作先验证输入，再提交状态，并核对“成功返回的键确实存在，失败证明合法搜索空间已为空或完整探测终止”。",
    },
    {
      label: "真实计数门",
      detail:
        "第8章 查找从轨迹统计读取、比较、写入、搬移、改链或松弛，不生成综合效率分。",
    },
    {
      label: "单故障与首错门",
      detail:
        "第8章 查找只注入“对未排序输入运行折半查找，或忽略哈希负载因子与冲突策略”，定位首个越界、错误状态或错误输出。",
    },
    {
      label: "恢复、工件与未知门",
      detail:
        "第8章 查找交付键集合、顺序条件、探测轨迹、树路径、冲突链和负载因子，同输入恢复结构、输出与计数并报告未测范围。",
    },
  ],
} as const satisfies DataStructureEvidenceModel;

export function SearchingRepresentationContractLab() {
  return (
    <DataStructureEvidenceLab model={model} view="representation-contract" />
  );
}

export function SearchingOperationCounterLab() {
  return <DataStructureEvidenceLab model={model} view="operation-counter" />;
}

export function SearchingTraceGateLab() {
  return <DataStructureEvidenceLab model={model} view="trace-gate" />;
}
