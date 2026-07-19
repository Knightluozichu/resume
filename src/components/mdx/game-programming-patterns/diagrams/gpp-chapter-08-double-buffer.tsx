import {
  GppFailureLab,
  GppMechanismLab,
  GppTradeoffLab,
  type GppCausalModel,
  type GppCoverageNode,
} from "./official-gpp-book-lab";

const title = "8. Double Buffer";
const focus = "在后台缓冲完成整批写入后一次交换，使读者只见完整状态";
const stages = [
  "读取当前",
  "写入下一",
  "等待完成",
  "交换引用",
  "发布代际"
];
const nodes = [
  {
    "label": "8. Double Buffer",
    "mechanism": "8. Double Buffer 聚焦所有权与时序；实现必须在“交换发生在后台缓冲尚未写完时”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查缓冲代际、交换时刻、写入完成位与输出快照"
  },
  {
    "label": "Intent",
    "mechanism": "Intent 把“读写同一缓冲会暴露半绘制画面或依赖对象遍历顺序”压缩成可检验的问题合同，先界定目标而不预设类图。",
    "probe": "检查缓冲代际、交换时刻、写入完成位与输出快照"
  },
  {
    "label": "Motivation",
    "mechanism": "Motivation 用具体游戏场景暴露“读写同一缓冲会暴露半绘制画面或依赖对象遍历顺序”，并保存不用模式时的失败基线。",
    "probe": "检查缓冲代际、交换时刻、写入完成位与输出快照"
  },
  {
    "label": "How computer graphics work (briefly)",
    "mechanism": "How computer graphics work (briefly) 是设计分叉题；回答必须说明选择怎样改变当前缓冲只读、下一缓冲只写，完成后以明确交换发布新代际，以及哪条反例会推翻选择。",
    "probe": "检查缓冲代际、交换时刻、写入完成位与输出快照"
  },
  {
    "label": "Act 1, Scene 1",
    "mechanism": "Act 1, Scene 1 把本章机制落到一个具体设计坐标：当前缓冲只读、下一缓冲只写，完成后以明确交换发布新代际，并以“消费者在任何时刻只读取完整的同一代状态”作为通过条件。",
    "probe": "检查缓冲代际、交换时刻、写入完成位与输出快照"
  },
  {
    "label": "Back to the graphics",
    "mechanism": "Back to the graphics 把本章机制落到一个具体设计坐标：当前缓冲只读、下一缓冲只写，完成后以明确交换发布新代际，并以“消费者在任何时刻只读取完整的同一代状态”作为通过条件。",
    "probe": "检查缓冲代际、交换时刻、写入完成位与输出快照"
  },
  {
    "label": "The Pattern",
    "mechanism": "The Pattern 从例子抽离最小参与者与因果关系：当前缓冲只读、下一缓冲只写，完成后以明确交换发布新代际。",
    "probe": "检查缓冲代际、交换时刻、写入完成位与输出快照"
  },
  {
    "label": "When to Use It",
    "mechanism": "When to Use It 要求变化压力已经出现，并且候选机制能守住“消费者在任何时刻只读取完整的同一代状态”。",
    "probe": "检查缓冲代际、交换时刻、写入完成位与输出快照"
  },
  {
    "label": "Keep in Mind",
    "mechanism": "Keep in Mind 把额外间接层、内存、时序和工具成本写入决定，尤其检查“交换发生在后台缓冲尚未写完时”。",
    "probe": "检查缓冲代际、交换时刻、写入完成位与输出快照"
  },
  {
    "label": "The swap itself takes time",
    "mechanism": "The swap itself takes time 把本章机制落到一个具体设计坐标：当前缓冲只读、下一缓冲只写，完成后以明确交换发布新代际，并以“消费者在任何时刻只读取完整的同一代状态”作为通过条件。",
    "probe": "检查缓冲代际、交换时刻、写入完成位与输出快照"
  },
  {
    "label": "We have to have two buffers",
    "mechanism": "We have to have two buffers 聚焦所有权与时序；实现必须在“交换发生在后台缓冲尚未写完时”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查缓冲代际、交换时刻、写入完成位与输出快照"
  },
  {
    "label": "Sample Code",
    "mechanism": "Sample Code 只演示当前缓冲只读、下一缓冲只写，完成后以明确交换发布新代际的最小骨架；生产迁移还需补齐所有权、错误与测试合同。",
    "probe": "检查缓冲代际、交换时刻、写入完成位与输出快照"
  },
  {
    "label": "Not just for graphics",
    "mechanism": "Not just for graphics 把本章机制落到一个具体设计坐标：当前缓冲只读、下一缓冲只写，完成后以明确交换发布新代际，并以“消费者在任何时刻只读取完整的同一代状态”作为通过条件。",
    "probe": "检查缓冲代际、交换时刻、写入完成位与输出快照"
  },
  {
    "label": "Artificial unintelligence",
    "mechanism": "Artificial unintelligence 把本章机制落到一个具体设计坐标：当前缓冲只读、下一缓冲只写，完成后以明确交换发布新代际，并以“消费者在任何时刻只读取完整的同一代状态”作为通过条件。",
    "probe": "检查缓冲代际、交换时刻、写入完成位与输出快照"
  },
  {
    "label": "Buffered slaps",
    "mechanism": "Buffered slaps 聚焦所有权与时序；实现必须在“交换发生在后台缓冲尚未写完时”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查缓冲代际、交换时刻、写入完成位与输出快照"
  },
  {
    "label": "Design Decisions",
    "mechanism": "Design Decisions 围绕创建、所有权、通信、粒度和失败恢复比较方案，并以缓冲代际、交换时刻、写入完成位与输出快照复核。",
    "probe": "检查缓冲代际、交换时刻、写入完成位与输出快照"
  },
  {
    "label": "How are the buffers swapped?",
    "mechanism": "How are the buffers swapped? 是设计分叉题；回答必须说明选择怎样改变当前缓冲只读、下一缓冲只写，完成后以明确交换发布新代际，以及哪条反例会推翻选择。",
    "probe": "检查缓冲代际、交换时刻、写入完成位与输出快照"
  },
  {
    "label": "What is the granularity of the buffer?",
    "mechanism": "What is the granularity of the buffer? 是设计分叉题；回答必须说明选择怎样改变当前缓冲只读、下一缓冲只写，完成后以明确交换发布新代际，以及哪条反例会推翻选择。",
    "probe": "检查缓冲代际、交换时刻、写入完成位与输出快照"
  },
  {
    "label": "See Also",
    "mechanism": "See Also 用相邻模式做替代和组合比较；只有解决不同变化轴时才允许叠加。",
    "probe": "检查缓冲代际、交换时刻、写入完成位与输出快照"
  }
] satisfies GppCoverageNode[];
const model = {
  "baselineLabel": "原地更新",
  "candidateLabel": "双缓冲",
  "unit": "撕裂项",
  "baselineBase": 14,
  "baselineSlope": 6.5,
  "candidateBase": 8,
  "candidateSlope": 1.4,
  "faultPenalty": 13,
  "invariant": "消费者在任何时刻只读取完整的同一代状态",
  "fault": "交换发生在后台缓冲尚未写完时",
  "evidence": "缓冲代际、交换时刻、写入完成位与输出快照"
} satisfies GppCausalModel;
const props = { title, focus, stages, nodes, model };

export function GppChapter08DoubleBufferMapLab() {
  return <GppMechanismLab {...props} />;
}

export function GppChapter08DoubleBufferExperimentLab() {
  return <GppTradeoffLab {...props} />;
}

export function GppChapter08DoubleBufferEvidenceLab() {
  return <GppFailureLab {...props} />;
}
