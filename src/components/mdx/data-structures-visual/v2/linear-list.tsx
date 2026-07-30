"use client";

import {
  DataStructureEvidenceLab,
  type DataStructureEvidenceModel,
} from "@/components/mdx/data-structures-visual/v2/data-structure-evidence-lab";

const model = {
  unitId: "dsvc-03",
  title: "第3章 线性表",
  question:
    "顺序表与链表在插入、删除和查找中的真实差异怎样由已知信息和操作计数决定？",
  concepts: [
    "第3章 线性表",
    "3.1 开场白",
    "3.2 线性表的定义",
    "3.3 线性表的抽象数据类型",
    "3.4 线性表的顺序存储结构",
    "3.4.1 顺序存储定义",
    "3.4.2 顺序存储方式",
    "3.4.3 数据长度与线性表长度的区别",
    "3.4.4 地址计算方法",
    "3.5 顺序存储结构的插入与删除",
    "3.5.1 获得元素操作",
    "3.5.2 插入操作",
    "3.5.3 删除操作",
    "3.5.4 线性表顺序存储结构的优缺点",
    "3.6 线性表的链式存储结构",
    "3.6.1 顺序存储结构不足的解决办法",
    "3.6.2 线性表链式存储结构定义",
    "3.6.3 头指针与头结点的异同",
    "3.6.4 线性表链式存储结构代码描述",
    "3.7 单链表的读取",
    "3.8 单链表的插入与删除",
    "3.8.1 单链表的插入",
    "3.8.2 单链表的删除",
    "3.9 单链表的整表创建",
    "3.10 单链表的整表删除",
    "3.11 单链表结构与顺序存储结构的优缺点",
    "3.12 静态链表",
    "3.12.1 静态链表的插入操作",
    "3.12.2 静态链表的删除操作",
    "3.12.3 静态链表的优缺点",
    "3.13 循环链表",
    "3.14 双向链表",
    "3.15 总结回顾",
    "3.16 结尾语",
  ],
  invariant: "插入后元素多重集正确、逻辑次序保持、长度加一且无越界或悬空边",
  fault: "比较数组和链表时，一边假定已知下标，另一边却包含查找前驱的成本",
  artifact: "数组槽位轨迹、链表可达图、搬移与改链计数、头尾边界反例",
  experiment: "list",
  operations: [
    {
      label: "定位位置",
      precondition: "0≤index≤length",
      action: "按下标或沿next找前驱",
      invariant: "定位结果对应同一逻辑缝隙",
    },
    {
      label: "准备容量或结点",
      precondition: "数组有空槽或结点分配成功",
      action: "保留旧结构直到新资源可用",
      invariant: "失败不改变原表",
    },
    {
      label: "提交插入",
      precondition: "前驱与后继身份有效",
      action: "搬移后写值或按先后顺序改链",
      invariant: "新表可达且无丢结点",
    },
    {
      label: "验收删除",
      precondition: "目标位置存在",
      action: "保存被删值并闭合空隙",
      invariant: "其余元素相对次序不变",
    },
  ],
  gates: [
    {
      label: "来源、样章与坐标门",
      detail:
        "第3章 线性表分开出版社291坐标、第2章样章、当前参考和本站独立实验。",
    },
    {
      label: "ADT与表示门",
      detail:
        "第3章 线性表记录对象、操作、逻辑关系、物理表示、容量和边界约定。",
    },
    {
      label: "前后置条件门",
      detail:
        "第3章 线性表每次操作先验证输入，再提交状态，并核对“插入后元素多重集正确、逻辑次序保持、长度加一且无越界或悬空边”。",
    },
    {
      label: "真实计数门",
      detail:
        "第3章 线性表从轨迹统计读取、比较、写入、搬移、改链或松弛，不生成综合效率分。",
    },
    {
      label: "单故障与首错门",
      detail:
        "第3章 线性表只注入“比较数组和链表时，一边假定已知下标，另一边却包含查找前驱的成本”，定位首个越界、错误状态或错误输出。",
    },
    {
      label: "恢复、工件与未知门",
      detail:
        "第3章 线性表交付数组槽位轨迹、链表可达图、搬移与改链计数、头尾边界反例，同输入恢复结构、输出与计数并报告未测范围。",
    },
  ],
} as const satisfies DataStructureEvidenceModel;

export function LinearListRepresentationContractLab() {
  return (
    <DataStructureEvidenceLab model={model} view="representation-contract" />
  );
}

export function LinearListOperationCounterLab() {
  return <DataStructureEvidenceLab model={model} view="operation-counter" />;
}

export function LinearListTraceGateLab() {
  return <DataStructureEvidenceLab model={model} view="trace-gate" />;
}
