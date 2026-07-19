import {
  GppFailureLab,
  GppMechanismLab,
  GppTradeoffLab,
  type GppCausalModel,
  type GppCoverageNode,
} from "./official-gpp-book-lab";

const title = "7. State";
const focus = "把输入与行为随状态变化的规则建成可检查状态机";
const stages = [
  "接收输入",
  "检查状态",
  "执行退出",
  "切换状态",
  "执行进入"
];
const nodes = [
  {
    "label": "7. State",
    "mechanism": "7. State 聚焦所有权与时序；实现必须在“进入动作再次触发转换形成重入环”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查状态图、事件序列、进入退出日志与非法组合计数"
  },
  {
    "label": "We’ve All Been There",
    "mechanism": "We’ve All Been There 把本章机制落到一个具体设计坐标：有限状态机只允许显式转换，状态对象封装行为和进入退出动作，并以“每个输入在当前状态下只有一个定义清楚的转换结果”作为通过条件。",
    "probe": "检查状态图、事件序列、进入退出日志与非法组合计数"
  },
  {
    "label": "Finite State Machines to the Rescue",
    "mechanism": "Finite State Machines to the Rescue 聚焦所有权与时序；实现必须在“进入动作再次触发转换形成重入环”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查状态图、事件序列、进入退出日志与非法组合计数"
  },
  {
    "label": "Enums and Switches",
    "mechanism": "Enums and Switches 把本章机制落到一个具体设计坐标：有限状态机只允许显式转换，状态对象封装行为和进入退出动作，并以“每个输入在当前状态下只有一个定义清楚的转换结果”作为通过条件。",
    "probe": "检查状态图、事件序列、进入退出日志与非法组合计数"
  },
  {
    "label": "The State Pattern",
    "mechanism": "The State Pattern 聚焦所有权与时序；实现必须在“进入动作再次触发转换形成重入环”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查状态图、事件序列、进入退出日志与非法组合计数"
  },
  {
    "label": "A state interface",
    "mechanism": "A state interface 聚焦所有权与时序；实现必须在“进入动作再次触发转换形成重入环”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查状态图、事件序列、进入退出日志与非法组合计数"
  },
  {
    "label": "Classes for each state",
    "mechanism": "Classes for each state 聚焦所有权与时序；实现必须在“进入动作再次触发转换形成重入环”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查状态图、事件序列、进入退出日志与非法组合计数"
  },
  {
    "label": "Delegate to the state",
    "mechanism": "Delegate to the state 聚焦所有权与时序；实现必须在“进入动作再次触发转换形成重入环”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查状态图、事件序列、进入退出日志与非法组合计数"
  },
  {
    "label": "Where Are the State Objects?",
    "mechanism": "Where Are the State Objects? 是设计分叉题；回答必须说明选择怎样改变有限状态机只允许显式转换，状态对象封装行为和进入退出动作，以及哪条反例会推翻选择。",
    "probe": "检查状态图、事件序列、进入退出日志与非法组合计数"
  },
  {
    "label": "Static states",
    "mechanism": "Static states 聚焦所有权与时序；实现必须在“进入动作再次触发转换形成重入环”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查状态图、事件序列、进入退出日志与非法组合计数"
  },
  {
    "label": "Instantiated states",
    "mechanism": "Instantiated states 聚焦所有权与时序；实现必须在“进入动作再次触发转换形成重入环”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查状态图、事件序列、进入退出日志与非法组合计数"
  },
  {
    "label": "Enter and Exit Actions",
    "mechanism": "Enter and Exit Actions 把本章机制落到一个具体设计坐标：有限状态机只允许显式转换，状态对象封装行为和进入退出动作，并以“每个输入在当前状态下只有一个定义清楚的转换结果”作为通过条件。",
    "probe": "检查状态图、事件序列、进入退出日志与非法组合计数"
  },
  {
    "label": "What’s the Catch?",
    "mechanism": "What’s the Catch? 是设计分叉题；回答必须说明选择怎样改变有限状态机只允许显式转换，状态对象封装行为和进入退出动作，以及哪条反例会推翻选择。",
    "probe": "检查状态图、事件序列、进入退出日志与非法组合计数"
  },
  {
    "label": "Concurrent State Machines",
    "mechanism": "Concurrent State Machines 聚焦所有权与时序；实现必须在“进入动作再次触发转换形成重入环”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查状态图、事件序列、进入退出日志与非法组合计数"
  },
  {
    "label": "Hierarchical State Machines",
    "mechanism": "Hierarchical State Machines 聚焦所有权与时序；实现必须在“进入动作再次触发转换形成重入环”发生时仍能解释对象寿命和最终状态。",
    "probe": "检查状态图、事件序列、进入退出日志与非法组合计数"
  },
  {
    "label": "Pushdown Automata",
    "mechanism": "Pushdown Automata 把本章机制落到一个具体设计坐标：有限状态机只允许显式转换，状态对象封装行为和进入退出动作，并以“每个输入在当前状态下只有一个定义清楚的转换结果”作为通过条件。",
    "probe": "检查状态图、事件序列、进入退出日志与非法组合计数"
  },
  {
    "label": "So How Useful Are They?",
    "mechanism": "So How Useful Are They? 是设计分叉题；回答必须说明选择怎样改变有限状态机只允许显式转换，状态对象封装行为和进入退出动作，以及哪条反例会推翻选择。",
    "probe": "检查状态图、事件序列、进入退出日志与非法组合计数"
  }
] satisfies GppCoverageNode[];
const model = {
  "baselineLabel": "布尔分支",
  "candidateLabel": "显式状态机",
  "unit": "非法组合",
  "baselineBase": 15,
  "baselineSlope": 6,
  "candidateBase": 7,
  "candidateSlope": 1.2,
  "faultPenalty": 13,
  "invariant": "每个输入在当前状态下只有一个定义清楚的转换结果",
  "fault": "进入动作再次触发转换形成重入环",
  "evidence": "状态图、事件序列、进入退出日志与非法组合计数"
} satisfies GppCausalModel;
const props = { title, focus, stages, nodes, model };

export function GppChapter07StateMapLab() {
  return <GppMechanismLab {...props} />;
}

export function GppChapter07StateExperimentLab() {
  return <GppTradeoffLab {...props} />;
}

export function GppChapter07StateEvidenceLab() {
  return <GppFailureLab {...props} />;
}
