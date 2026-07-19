import {
  GppFailureLab,
  GppMechanismLab,
  GppTradeoffLab,
  type GppCausalModel,
  type GppCoverageNode,
} from "./official-gpp-book-lab";

const title = "18. Dirty Flag";
const focus = "主数据变化时标脏，只有派生结果真正被读取前才重新计算";
const stages = [
  "修改主数据",
  "传播脏位",
  "延迟等待",
  "按需重算",
  "清除标记"
];
const nodes = [
  {
    "label": "18. Dirty Flag",
    "mechanism": "18. Dirty Flag 把本章机制落到一个具体设计坐标：写主数据只传播脏标记，读世界变换时从最近干净祖先更新并清除，并以“任何派生数据被读取时都与当前主数据一致”作为通过条件。",
    "probe": "检查主数据版本、脏位传播、重算次数与读取结果"
  },
  {
    "label": "Intent",
    "mechanism": "Intent 把“层级变换每次局部修改都立即重算，会重复计算未被观察的中间结果”压缩成可检验的问题合同，先界定目标而不预设类图。",
    "probe": "检查主数据版本、脏位传播、重算次数与读取结果"
  },
  {
    "label": "Motivation",
    "mechanism": "Motivation 用具体游戏场景暴露“层级变换每次局部修改都立即重算，会重复计算未被观察的中间结果”，并保存不用模式时的失败基线。",
    "probe": "检查主数据版本、脏位传播、重算次数与读取结果"
  },
  {
    "label": "Local and world transforms",
    "mechanism": "Local and world transforms 把本章机制落到一个具体设计坐标：写主数据只传播脏标记，读世界变换时从最近干净祖先更新并清除，并以“任何派生数据被读取时都与当前主数据一致”作为通过条件。",
    "probe": "检查主数据版本、脏位传播、重算次数与读取结果"
  },
  {
    "label": "Cached world transforms",
    "mechanism": "Cached world transforms 把本章机制落到一个具体设计坐标：写主数据只传播脏标记，读世界变换时从最近干净祖先更新并清除，并以“任何派生数据被读取时都与当前主数据一致”作为通过条件。",
    "probe": "检查主数据版本、脏位传播、重算次数与读取结果"
  },
  {
    "label": "Deferred recalculation",
    "mechanism": "Deferred recalculation 把本章机制落到一个具体设计坐标：写主数据只传播脏标记，读世界变换时从最近干净祖先更新并清除，并以“任何派生数据被读取时都与当前主数据一致”作为通过条件。",
    "probe": "检查主数据版本、脏位传播、重算次数与读取结果"
  },
  {
    "label": "The Pattern",
    "mechanism": "The Pattern 从例子抽离最小参与者与因果关系：写主数据只传播脏标记，读世界变换时从最近干净祖先更新并清除。",
    "probe": "检查主数据版本、脏位传播、重算次数与读取结果"
  },
  {
    "label": "When to Use It",
    "mechanism": "When to Use It 要求变化压力已经出现，并且候选机制能守住“任何派生数据被读取时都与当前主数据一致”。",
    "probe": "检查主数据版本、脏位传播、重算次数与读取结果"
  },
  {
    "label": "Keep in Mind",
    "mechanism": "Keep in Mind 把额外间接层、内存、时序和工具成本写入决定，尤其检查“一条修改路径漏设脏标记导致陈旧世界变换”。",
    "probe": "检查主数据版本、脏位传播、重算次数与读取结果"
  },
  {
    "label": "There is a cost to deferring for too long",
    "mechanism": "There is a cost to deferring for too long 聚焦运行代价，固定场景后用主数据版本、脏位传播、重算次数与读取结果定位首个超限点，不能以模式名称推断快慢。",
    "probe": "检查主数据版本、脏位传播、重算次数与读取结果"
  },
  {
    "label": "You have to make sure to set the flag every time the state changes",
    "mechanism": "You have to make sure to set the flag every time the state changes 聚焦所有权与时序；实现必须在“一条修改路径漏设脏标记导致陈旧世界变换”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查主数据版本、脏位传播、重算次数与读取结果"
  },
  {
    "label": "You have to keep the previous derived data in memory",
    "mechanism": "You have to keep the previous derived data in memory 聚焦运行代价，固定场景后用主数据版本、脏位传播、重算次数与读取结果定位首个超限点，不能以模式名称推断快慢。",
    "probe": "检查主数据版本、脏位传播、重算次数与读取结果"
  },
  {
    "label": "Sample Code",
    "mechanism": "Sample Code 只演示写主数据只传播脏标记，读世界变换时从最近干净祖先更新并清除的最小骨架；生产迁移还需补齐所有权、错误与测试合同。",
    "probe": "检查主数据版本、脏位传播、重算次数与读取结果"
  },
  {
    "label": "An unoptimized traversal",
    "mechanism": "An unoptimized traversal 把本章机制落到一个具体设计坐标：写主数据只传播脏标记，读世界变换时从最近干净祖先更新并清除，并以“任何派生数据被读取时都与当前主数据一致”作为通过条件。",
    "probe": "检查主数据版本、脏位传播、重算次数与读取结果"
  },
  {
    "label": "Let’s get dirty",
    "mechanism": "Let’s get dirty 把本章机制落到一个具体设计坐标：写主数据只传播脏标记，读世界变换时从最近干净祖先更新并清除，并以“任何派生数据被读取时都与当前主数据一致”作为通过条件。",
    "probe": "检查主数据版本、脏位传播、重算次数与读取结果"
  },
  {
    "label": "Design Decisions",
    "mechanism": "Design Decisions 围绕创建、所有权、通信、粒度和失败恢复比较方案，并以主数据版本、脏位传播、重算次数与读取结果复核。",
    "probe": "检查主数据版本、脏位传播、重算次数与读取结果"
  },
  {
    "label": "When is the dirty flag cleaned?",
    "mechanism": "When is the dirty flag cleaned? 是设计分叉题；回答必须说明选择怎样改变写主数据只传播脏标记，读世界变换时从最近干净祖先更新并清除，以及哪条反例会推翻选择。",
    "probe": "检查主数据版本、脏位传播、重算次数与读取结果"
  },
  {
    "label": "How fine-grained is your dirty tracking?",
    "mechanism": "How fine-grained is your dirty tracking? 是设计分叉题；回答必须说明选择怎样改变写主数据只传播脏标记，读世界变换时从最近干净祖先更新并清除，以及哪条反例会推翻选择。",
    "probe": "检查主数据版本、脏位传播、重算次数与读取结果"
  },
  {
    "label": "See Also",
    "mechanism": "See Also 用相邻模式做替代和组合比较；只有解决不同变化轴时才允许叠加。",
    "probe": "检查主数据版本、脏位传播、重算次数与读取结果"
  }
] satisfies GppCoverageNode[];
const model = {
  "baselineLabel": "立即重算",
  "candidateLabel": "脏位延迟",
  "unit": "重算次数",
  "baselineBase": 16,
  "baselineSlope": 7,
  "candidateBase": 9,
  "candidateSlope": 1.3,
  "faultPenalty": 14,
  "invariant": "任何派生数据被读取时都与当前主数据一致",
  "fault": "一条修改路径漏设脏标记导致陈旧世界变换",
  "evidence": "主数据版本、脏位传播、重算次数与读取结果"
} satisfies GppCausalModel;
const props = { title, focus, stages, nodes, model };

export function GppChapter18DirtyFlagMapLab() {
  return <GppMechanismLab {...props} />;
}

export function GppChapter18DirtyFlagExperimentLab() {
  return <GppTradeoffLab {...props} />;
}

export function GppChapter18DirtyFlagEvidenceLab() {
  return <GppFailureLab {...props} />;
}
