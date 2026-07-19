import {
  GppFailureLab,
  GppMechanismLab,
  GppTradeoffLab,
  type GppCausalModel,
  type GppCoverageNode,
} from "./official-gpp-book-lab";

const title = "20. Spatial Partition";
const focus = "按空间位置把对象分区，只查询可能相邻的候选集合";
const stages = [
  "计算单元",
  "插入分区",
  "范围查询",
  "移动迁移",
  "对照真值"
];
const nodes = [
  {
    "label": "20. Spatial Partition",
    "mechanism": "20. Spatial Partition 把本章机制落到一个具体设计坐标：对象进入网格或层级分区，移动时更新归属，查询只遍历相交单元，并以“分区查询不漏掉范围内对象，也不重复返回同一身份”作为通过条件。",
    "probe": "检查单元坐标、对象链、候选数、命中集合与全量真值"
  },
  {
    "label": "Intent",
    "mechanism": "Intent 把“全体两两距离检查随单位数平方增长”压缩成可检验的问题合同，先界定目标而不预设类图。",
    "probe": "检查单元坐标、对象链、候选数、命中集合与全量真值"
  },
  {
    "label": "Motivation",
    "mechanism": "Motivation 用具体游戏场景暴露“全体两两距离检查随单位数平方增长”，并保存不用模式时的失败基线。",
    "probe": "检查单元坐标、对象链、候选数、命中集合与全量真值"
  },
  {
    "label": "Units on the field of battle",
    "mechanism": "Units on the field of battle 把本章机制落到一个具体设计坐标：对象进入网格或层级分区，移动时更新归属，查询只遍历相交单元，并以“分区查询不漏掉范围内对象，也不重复返回同一身份”作为通过条件。",
    "probe": "检查单元坐标、对象链、候选数、命中集合与全量真值"
  },
  {
    "label": "Drawing battle lines",
    "mechanism": "Drawing battle lines 把本章机制落到一个具体设计坐标：对象进入网格或层级分区，移动时更新归属，查询只遍历相交单元，并以“分区查询不漏掉范围内对象，也不重复返回同一身份”作为通过条件。",
    "probe": "检查单元坐标、对象链、候选数、命中集合与全量真值"
  },
  {
    "label": "The Pattern",
    "mechanism": "The Pattern 从例子抽离最小参与者与因果关系：对象进入网格或层级分区，移动时更新归属，查询只遍历相交单元。",
    "probe": "检查单元坐标、对象链、候选数、命中集合与全量真值"
  },
  {
    "label": "When to Use It",
    "mechanism": "When to Use It 要求变化压力已经出现，并且候选机制能守住“分区查询不漏掉范围内对象，也不重复返回同一身份”。",
    "probe": "检查单元坐标、对象链、候选数、命中集合与全量真值"
  },
  {
    "label": "Keep in Mind",
    "mechanism": "Keep in Mind 把额外间接层、内存、时序和工具成本写入决定，尤其检查“单位跨格移动后旧链表节点未移除”。",
    "probe": "检查单元坐标、对象链、候选数、命中集合与全量真值"
  },
  {
    "label": "Sample Code",
    "mechanism": "Sample Code 只演示对象进入网格或层级分区，移动时更新归属，查询只遍历相交单元的最小骨架；生产迁移还需补齐所有权、错误与测试合同。",
    "probe": "检查单元坐标、对象链、候选数、命中集合与全量真值"
  },
  {
    "label": "A sheet of graph paper",
    "mechanism": "A sheet of graph paper 把本章机制落到一个具体设计坐标：对象进入网格或层级分区，移动时更新归属，查询只遍历相交单元，并以“分区查询不漏掉范围内对象，也不重复返回同一身份”作为通过条件。",
    "probe": "检查单元坐标、对象链、候选数、命中集合与全量真值"
  },
  {
    "label": "A grid of linked units",
    "mechanism": "A grid of linked units 聚焦所有权与时序；实现必须在“单位跨格移动后旧链表节点未移除”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查单元坐标、对象链、候选数、命中集合与全量真值"
  },
  {
    "label": "Entering the field of battle",
    "mechanism": "Entering the field of battle 把本章机制落到一个具体设计坐标：对象进入网格或层级分区，移动时更新归属，查询只遍历相交单元，并以“分区查询不漏掉范围内对象，也不重复返回同一身份”作为通过条件。",
    "probe": "检查单元坐标、对象链、候选数、命中集合与全量真值"
  },
  {
    "label": "A clash of swords",
    "mechanism": "A clash of swords 把本章机制落到一个具体设计坐标：对象进入网格或层级分区，移动时更新归属，查询只遍历相交单元，并以“分区查询不漏掉范围内对象，也不重复返回同一身份”作为通过条件。",
    "probe": "检查单元坐标、对象链、候选数、命中集合与全量真值"
  },
  {
    "label": "Charging forward",
    "mechanism": "Charging forward 把本章机制落到一个具体设计坐标：对象进入网格或层级分区，移动时更新归属，查询只遍历相交单元，并以“分区查询不漏掉范围内对象，也不重复返回同一身份”作为通过条件。",
    "probe": "检查单元坐标、对象链、候选数、命中集合与全量真值"
  },
  {
    "label": "At arm’s length",
    "mechanism": "At arm’s length 把本章机制落到一个具体设计坐标：对象进入网格或层级分区，移动时更新归属，查询只遍历相交单元，并以“分区查询不漏掉范围内对象，也不重复返回同一身份”作为通过条件。",
    "probe": "检查单元坐标、对象链、候选数、命中集合与全量真值"
  },
  {
    "label": "Design Decisions",
    "mechanism": "Design Decisions 围绕创建、所有权、通信、粒度和失败恢复比较方案，并以单元坐标、对象链、候选数、命中集合与全量真值复核。",
    "probe": "检查单元坐标、对象链、候选数、命中集合与全量真值"
  },
  {
    "label": "Is the partition hierarchical or flat?",
    "mechanism": "Is the partition hierarchical or flat? 是设计分叉题；回答必须说明选择怎样改变对象进入网格或层级分区，移动时更新归属，查询只遍历相交单元，以及哪条反例会推翻选择。",
    "probe": "检查单元坐标、对象链、候选数、命中集合与全量真值"
  },
  {
    "label": "Does the partitioning depend on the set of objects?",
    "mechanism": "Does the partitioning depend on the set of objects? 是设计分叉题；回答必须说明选择怎样改变对象进入网格或层级分区，移动时更新归属，查询只遍历相交单元，以及哪条反例会推翻选择。",
    "probe": "检查单元坐标、对象链、候选数、命中集合与全量真值"
  },
  {
    "label": "Are objects only stored in the partition?",
    "mechanism": "Are objects only stored in the partition? 是设计分叉题；回答必须说明选择怎样改变对象进入网格或层级分区，移动时更新归属，查询只遍历相交单元，以及哪条反例会推翻选择。",
    "probe": "检查单元坐标、对象链、候选数、命中集合与全量真值"
  },
  {
    "label": "See Also",
    "mechanism": "See Also 用相邻模式做替代和组合比较；只有解决不同变化轴时才允许叠加。",
    "probe": "检查单元坐标、对象链、候选数、命中集合与全量真值"
  }
] satisfies GppCoverageNode[];
const model = {
  "baselineLabel": "全体两两检查",
  "candidateLabel": "网格分区",
  "unit": "距离测试",
  "baselineBase": 20,
  "baselineSlope": 9,
  "candidateBase": 11,
  "candidateSlope": 1.4,
  "faultPenalty": 17,
  "invariant": "分区查询不漏掉范围内对象，也不重复返回同一身份",
  "fault": "单位跨格移动后旧链表节点未移除",
  "evidence": "单元坐标、对象链、候选数、命中集合与全量真值"
} satisfies GppCausalModel;
const props = { title, focus, stages, nodes, model };

export function GppChapter20SpatialPartitionMapLab() {
  return <GppMechanismLab {...props} />;
}

export function GppChapter20SpatialPartitionExperimentLab() {
  return <GppTradeoffLab {...props} />;
}

export function GppChapter20SpatialPartitionEvidenceLab() {
  return <GppFailureLab {...props} />;
}
