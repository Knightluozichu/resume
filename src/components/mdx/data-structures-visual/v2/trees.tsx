"use client";

import {
  DataStructureEvidenceLab,
  type DataStructureEvidenceModel,
} from "@/components/mdx/data-structures-visual/v2/data-structure-evidence-lab";

const model = {
  unitId: "dsvc-06",
  title: "第6章 树",
  question: "树的表示、遍历、转换与编码怎样用连通无环和一次访问不变量统一？",
  concepts: [
    "第6章 树",
    "6.1 开场白",
    "6.2 树的定义",
    "6.2.1 结点的分类",
    "6.2.2 结点间的关系",
    "6.2.3 树的其他相关概念",
    "6.3 树的抽象数据类型",
    "6.4 树的存储结构",
    "6.4.1 双亲表示法",
    "6.4.2 孩子表示法",
    "6.4.3 孩子兄弟表示法",
    "6.5 二叉树的定义",
    "6.5.1 二叉树的特点",
    "6.5.2 特殊二叉树",
    "6.6 二叉树的性质",
    "6.6.1 二叉树的性质1",
    "6.6.2 二叉树的性质2",
    "6.6.3 二叉树的性质3",
    "6.6.4 二叉树的性质4",
    "6.6.5 二叉树的性质5",
    "6.7 二叉树的存储结构",
    "6.7.1 二叉树的顺序存储结构",
    "6.7.2 二叉链表",
    "6.8 遍历二叉树",
    "6.8.1 二叉树的遍历原理",
    "6.8.2 二叉树的遍历方法",
    "6.8.3 前序遍历算法",
    "6.8.4 中序遍历算法",
    "6.8.5 后序遍历算法",
    "6.8.6 推导遍历结果",
    "6.9 二叉树的建立",
    "6.10 线索二叉树",
    "6.10.1 线索二叉树的原理",
    "6.10.2 线索二叉树结构的实现",
    "6.11 树、森林与二叉树的转换",
    "6.11.1 树转换为二叉树",
    "6.11.2 森林转换为二叉树",
    "6.11.3 二叉树转换为树",
    "6.11.4 二叉树转换为森林",
    "6.11.5 树与森林的遍历",
    "6.12 哈夫曼树及其应用",
    "6.12.1 哈夫曼树",
    "6.12.2 哈夫曼树的定义与原理",
    "6.12.3 哈夫曼编码",
    "6.13 总结回顾",
    "6.14 结尾语",
  ],
  invariant: "从根可达全部结点、除根外父结点唯一、遍历恰访问每个结点一次",
  fault: "递归或显式栈遗漏空孩子基例，导致重复访问、漏结点或无法终止",
  artifact: "树结点表、父子边、三种遍历轨迹、栈状态、Huffman前缀码检查",
  experiment: "tree",
  operations: [
    {
      label: "验证树形",
      precondition: "结点与父子边已给定",
      action: "从根执行一次标记遍历",
      invariant: "连通、无环且边数为结点数减一",
    },
    {
      label: "前序遍历",
      precondition: "当前结点可达",
      action: "先访问根再遍历孩子",
      invariant: "根先于其全部后代出现",
    },
    {
      label: "中序遍历",
      precondition: "对象是有左右孩子的二叉树",
      action: "左子树、根、右子树",
      invariant: "每结点恰出现一次",
    },
    {
      label: "后序遍历",
      precondition: "孩子关系稳定",
      action: "先孩子后根",
      invariant: "根晚于其全部后代出现",
    },
  ],
  gates: [
    {
      label: "来源、样章与坐标门",
      detail: "第6章 树分开出版社291坐标、第2章样章、当前参考和本站独立实验。",
    },
    {
      label: "ADT与表示门",
      detail: "第6章 树记录对象、操作、逻辑关系、物理表示、容量和边界约定。",
    },
    {
      label: "前后置条件门",
      detail:
        "第6章 树每次操作先验证输入，再提交状态，并核对“从根可达全部结点、除根外父结点唯一、遍历恰访问每个结点一次”。",
    },
    {
      label: "真实计数门",
      detail:
        "第6章 树从轨迹统计读取、比较、写入、搬移、改链或松弛，不生成综合效率分。",
    },
    {
      label: "单故障与首错门",
      detail:
        "第6章 树只注入“递归或显式栈遗漏空孩子基例，导致重复访问、漏结点或无法终止”，定位首个越界、错误状态或错误输出。",
    },
    {
      label: "恢复、工件与未知门",
      detail:
        "第6章 树交付树结点表、父子边、三种遍历轨迹、栈状态、Huffman前缀码检查，同输入恢复结构、输出与计数并报告未测范围。",
    },
  ],
} as const satisfies DataStructureEvidenceModel;

export function TreesRepresentationContractLab() {
  return (
    <DataStructureEvidenceLab model={model} view="representation-contract" />
  );
}

export function TreesOperationCounterLab() {
  return <DataStructureEvidenceLab model={model} view="operation-counter" />;
}

export function TreesTraceGateLab() {
  return <DataStructureEvidenceLab model={model} view="trace-gate" />;
}
