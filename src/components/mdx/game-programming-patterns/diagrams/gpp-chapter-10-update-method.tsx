import {
  GppFailureLab,
  GppMechanismLab,
  GppTradeoffLab,
  type GppCausalModel,
  type GppCoverageNode,
} from "./official-gpp-book-lab";

const title = "10. Update Method";
const focus = "让每个活跃对象把长行为切成逐帧可恢复的更新片段";
const stages = [
  "遍历快照",
  "调用更新",
  "推进状态",
  "记录变更",
  "提交增删"
];
const nodes = [
  {
    "label": "10. Update Method",
    "mechanism": "10. Update Method 把本章机制落到一个具体设计坐标：游戏循环逐帧调用对象更新，对象显式保存下帧继续所需状态，并以“每个对象一次更新都在预算内结束并保留可继续状态”作为通过条件。",
    "probe": "检查对象ID、更新序号、内部状态、列表快照与单次耗时"
  },
  {
    "label": "Intent",
    "mechanism": "Intent 把“对象行为若阻塞到完成，一个角色会冻结整条主循环”压缩成可检验的问题合同，先界定目标而不预设类图。",
    "probe": "检查对象ID、更新序号、内部状态、列表快照与单次耗时"
  },
  {
    "label": "Motivation",
    "mechanism": "Motivation 用具体游戏场景暴露“对象行为若阻塞到完成，一个角色会冻结整条主循环”，并保存不用模式时的失败基线。",
    "probe": "检查对象ID、更新序号、内部状态、列表快照与单次耗时"
  },
  {
    "label": "The Pattern",
    "mechanism": "The Pattern 从例子抽离最小参与者与因果关系：游戏循环逐帧调用对象更新，对象显式保存下帧继续所需状态。",
    "probe": "检查对象ID、更新序号、内部状态、列表快照与单次耗时"
  },
  {
    "label": "When to Use It",
    "mechanism": "When to Use It 要求变化压力已经出现，并且候选机制能守住“每个对象一次更新都在预算内结束并保留可继续状态”。",
    "probe": "检查对象ID、更新序号、内部状态、列表快照与单次耗时"
  },
  {
    "label": "Keep in Mind",
    "mechanism": "Keep in Mind 把额外间接层、内存、时序和工具成本写入决定，尤其检查“更新过程中删除当前列表元素导致后继对象跳过”。",
    "probe": "检查对象ID、更新序号、内部状态、列表快照与单次耗时"
  },
  {
    "label": "Splitting code into single frame slices makes it more complex",
    "mechanism": "Splitting code into single frame slices makes it more complex 把本章机制落到一个具体设计坐标：游戏循环逐帧调用对象更新，对象显式保存下帧继续所需状态，并以“每个对象一次更新都在预算内结束并保留可继续状态”作为通过条件。",
    "probe": "检查对象ID、更新序号、内部状态、列表快照与单次耗时"
  },
  {
    "label": "You have to store state to resume where you left off each frame",
    "mechanism": "You have to store state to resume where you left off each frame 聚焦所有权与时序；实现必须在“更新过程中删除当前列表元素导致后继对象跳过”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查对象ID、更新序号、内部状态、列表快照与单次耗时"
  },
  {
    "label": "Objects all simulate each frame but are not truly concurrent",
    "mechanism": "Objects all simulate each frame but are not truly concurrent 把本章机制落到一个具体设计坐标：游戏循环逐帧调用对象更新，对象显式保存下帧继续所需状态，并以“每个对象一次更新都在预算内结束并保留可继续状态”作为通过条件。",
    "probe": "检查对象ID、更新序号、内部状态、列表快照与单次耗时"
  },
  {
    "label": "Be careful modifying the object list while updating",
    "mechanism": "Be careful modifying the object list while updating 聚焦所有权与时序；实现必须在“更新过程中删除当前列表元素导致后继对象跳过”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查对象ID、更新序号、内部状态、列表快照与单次耗时"
  },
  {
    "label": "Sample Code",
    "mechanism": "Sample Code 只演示游戏循环逐帧调用对象更新，对象显式保存下帧继续所需状态的最小骨架；生产迁移还需补齐所有权、错误与测试合同。",
    "probe": "检查对象ID、更新序号、内部状态、列表快照与单次耗时"
  },
  {
    "label": "Subclassing entities?!",
    "mechanism": "Subclassing entities?! 把本章机制落到一个具体设计坐标：游戏循环逐帧调用对象更新，对象显式保存下帧继续所需状态，并以“每个对象一次更新都在预算内结束并保留可继续状态”作为通过条件。",
    "probe": "检查对象ID、更新序号、内部状态、列表快照与单次耗时"
  },
  {
    "label": "Defining entities",
    "mechanism": "Defining entities 把本章机制落到一个具体设计坐标：游戏循环逐帧调用对象更新，对象显式保存下帧继续所需状态，并以“每个对象一次更新都在预算内结束并保留可继续状态”作为通过条件。",
    "probe": "检查对象ID、更新序号、内部状态、列表快照与单次耗时"
  },
  {
    "label": "Passing time",
    "mechanism": "Passing time 把本章机制落到一个具体设计坐标：游戏循环逐帧调用对象更新，对象显式保存下帧继续所需状态，并以“每个对象一次更新都在预算内结束并保留可继续状态”作为通过条件。",
    "probe": "检查对象ID、更新序号、内部状态、列表快照与单次耗时"
  },
  {
    "label": "Design Decisions",
    "mechanism": "Design Decisions 围绕创建、所有权、通信、粒度和失败恢复比较方案，并以对象ID、更新序号、内部状态、列表快照与单次耗时复核。",
    "probe": "检查对象ID、更新序号、内部状态、列表快照与单次耗时"
  },
  {
    "label": "What class does the update method live on?",
    "mechanism": "What class does the update method live on? 是设计分叉题；回答必须说明选择怎样改变游戏循环逐帧调用对象更新，对象显式保存下帧继续所需状态，以及哪条反例会推翻选择。",
    "probe": "检查对象ID、更新序号、内部状态、列表快照与单次耗时"
  },
  {
    "label": "How are dormant objects handled?",
    "mechanism": "How are dormant objects handled? 是设计分叉题；回答必须说明选择怎样改变游戏循环逐帧调用对象更新，对象显式保存下帧继续所需状态，以及哪条反例会推翻选择。",
    "probe": "检查对象ID、更新序号、内部状态、列表快照与单次耗时"
  },
  {
    "label": "See Also",
    "mechanism": "See Also 用相邻模式做替代和组合比较；只有解决不同变化轴时才允许叠加。",
    "probe": "检查对象ID、更新序号、内部状态、列表快照与单次耗时"
  }
] satisfies GppCoverageNode[];
const model = {
  "baselineLabel": "阻塞行为",
  "candidateLabel": "逐帧更新",
  "unit": "超时对象",
  "baselineBase": 13,
  "baselineSlope": 5.5,
  "candidateBase": 7,
  "candidateSlope": 1.3,
  "faultPenalty": 12,
  "invariant": "每个对象一次更新都在预算内结束并保留可继续状态",
  "fault": "更新过程中删除当前列表元素导致后继对象跳过",
  "evidence": "对象ID、更新序号、内部状态、列表快照与单次耗时"
} satisfies GppCausalModel;
const props = { title, focus, stages, nodes, model };

export function GppChapter10UpdateMethodMapLab() {
  return <GppMechanismLab {...props} />;
}

export function GppChapter10UpdateMethodExperimentLab() {
  return <GppTradeoffLab {...props} />;
}

export function GppChapter10UpdateMethodEvidenceLab() {
  return <GppFailureLab {...props} />;
}
