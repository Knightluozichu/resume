"use client";

import {
  DataStructureEvidenceLab,
  type DataStructureEvidenceModel,
} from "@/components/mdx/data-structures-visual/v2/data-structure-evidence-lab";

const model = {
  unitId: "dsvc-07",
  title: "第7章 图",
  question: "图表示、遍历、生成树、最短路与DAG调度怎样各自声明边与权重前提？",
  concepts: [
    "第7章 图",
    "7.1 开场白",
    "7.2 图的定义",
    "7.2.1 各种图的定义",
    "7.2.2 图的顶点与边间的关系",
    "7.2.3 连通图的相关术语",
    "7.2.4 图的定义与术语总结",
    "7.3 图的抽象数据类型",
    "7.4 图的存储结构",
    "7.4.1 邻接矩阵",
    "7.4.2 邻接表",
    "7.4.3 十字链表",
    "7.4.4 邻接多重表",
    "7.4.5 边集数组",
    "7.5 图的遍历",
    "7.5.1 深度优先遍历",
    "7.5.2 广度优先遍历",
    "7.6 最小生成树",
    "7.6.1 普里姆（Prim）算法",
    "7.6.2 克鲁斯卡尔（Kruskal）算法",
    "7.7 最短路径",
    "7.7.1 迪杰斯特拉（Dijkstra）算法",
    "7.7.2 弗洛伊德（Floyd）算法",
    "7.8 拓扑排序",
    "7.8.1 拓扑排序介绍",
    "7.8.2 拓扑排序算法",
    "7.9 关键路径",
    "7.9.1 关键路径算法的原理",
    "7.9.2 关键路径算法",
    "7.10 总结回顾",
    "7.11 结尾语",
  ],
  invariant:
    "抽象边集与表示一致；已确定最短距离有非负权前提；遍历不重不漏可达顶点",
  fault: "向Dijkstra输入负权边，或把有向边当成邻接矩阵中的对称记录",
  artifact: "顶点边表、表示对照、访问队列、松弛记录、前驱树与负权反例",
  experiment: "graph",
  operations: [
    {
      label: "冻结图合同",
      precondition: "方向、权重、重边和自环策略已声明",
      action: "建立顶点边表",
      invariant: "表示与抽象边集合一一对应",
    },
    {
      label: "选择暂定最小点",
      precondition: "所有未确定路径经非负边延伸",
      action: "取最小暂定距离顶点",
      invariant: "该距离可永久确定",
    },
    {
      label: "松弛出边",
      precondition: "源距离有限且边存在",
      action: "比较旧距离与经当前点的新距离",
      invariant: "距离单调不增且保留前驱",
    },
    {
      label: "验收路径",
      precondition: "目标可达",
      action: "沿前驱回溯到源",
      invariant: "路径权重和等于记录距离",
    },
  ],
  gates: [
    {
      label: "来源、样章与坐标门",
      detail: "第7章 图分开出版社291坐标、第2章样章、当前参考和本站独立实验。",
    },
    {
      label: "ADT与表示门",
      detail: "第7章 图记录对象、操作、逻辑关系、物理表示、容量和边界约定。",
    },
    {
      label: "前后置条件门",
      detail:
        "第7章 图每次操作先验证输入，再提交状态，并核对“抽象边集与表示一致；已确定最短距离有非负权前提；遍历不重不漏可达顶点”。",
    },
    {
      label: "真实计数门",
      detail:
        "第7章 图从轨迹统计读取、比较、写入、搬移、改链或松弛，不生成综合效率分。",
    },
    {
      label: "单故障与首错门",
      detail:
        "第7章 图只注入“向Dijkstra输入负权边，或把有向边当成邻接矩阵中的对称记录”，定位首个越界、错误状态或错误输出。",
    },
    {
      label: "恢复、工件与未知门",
      detail:
        "第7章 图交付顶点边表、表示对照、访问队列、松弛记录、前驱树与负权反例，同输入恢复结构、输出与计数并报告未测范围。",
    },
  ],
} as const satisfies DataStructureEvidenceModel;

export function GraphsRepresentationContractLab() {
  return (
    <DataStructureEvidenceLab model={model} view="representation-contract" />
  );
}

export function GraphsOperationCounterLab() {
  return <DataStructureEvidenceLab model={model} view="operation-counter" />;
}

export function GraphsTraceGateLab() {
  return <DataStructureEvidenceLab model={model} view="trace-gate" />;
}
