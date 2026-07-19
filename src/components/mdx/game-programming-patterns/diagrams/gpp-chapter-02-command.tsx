import {
  GppFailureLab,
  GppMechanismLab,
  GppTradeoffLab,
  type GppCausalModel,
  type GppCoverageNode,
} from "./official-gpp-book-lab";

const title = "2. Command";
const focus = "把输入动作对象化后再决定目标、执行时刻、撤销和重放";
const stages = [
  "读取输入",
  "生成命令",
  "绑定目标",
  "执行记录",
  "撤销重放"
];
const nodes = [
  {
    "label": "2. Command",
    "mechanism": "2. Command 把本章机制落到一个具体设计坐标：命令保存动作意图及必要参数，调用者延后把它交给明确目标执行，并以“相同命令流和初始状态产生相同角色状态”作为通过条件。",
    "probe": "检查命令日志、目标ID、执行序号与撤销后状态"
  },
  {
    "label": "Configuring Input",
    "mechanism": "Configuring Input 把本章机制落到一个具体设计坐标：命令保存动作意图及必要参数，调用者延后把它交给明确目标执行，并以“相同命令流和初始状态产生相同角色状态”作为通过条件。",
    "probe": "检查命令日志、目标ID、执行序号与撤销后状态"
  },
  {
    "label": "Directions for Actors",
    "mechanism": "Directions for Actors 把本章机制落到一个具体设计坐标：命令保存动作意图及必要参数，调用者延后把它交给明确目标执行，并以“相同命令流和初始状态产生相同角色状态”作为通过条件。",
    "probe": "检查命令日志、目标ID、执行序号与撤销后状态"
  },
  {
    "label": "Undo and Redo",
    "mechanism": "Undo and Redo 把本章机制落到一个具体设计坐标：命令保存动作意图及必要参数，调用者延后把它交给明确目标执行，并以“相同命令流和初始状态产生相同角色状态”作为通过条件。",
    "probe": "检查命令日志、目标ID、执行序号与撤销后状态"
  },
  {
    "label": "Classy and Dysfunctional?",
    "mechanism": "Classy and Dysfunctional? 是设计分叉题；回答必须说明选择怎样改变命令保存动作意图及必要参数，调用者延后把它交给明确目标执行，以及哪条反例会推翻选择。",
    "probe": "检查命令日志、目标ID、执行序号与撤销后状态"
  },
  {
    "label": "See Also",
    "mechanism": "See Also 用相邻模式做替代和组合比较；只有解决不同变化轴时才允许叠加。",
    "probe": "检查命令日志、目标ID、执行序号与撤销后状态"
  }
] satisfies GppCoverageNode[];
const model = {
  "baselineLabel": "直接调用",
  "candidateLabel": "命令对象",
  "unit": "调用点",
  "baselineBase": 8,
  "baselineSlope": 4,
  "candidateBase": 5,
  "candidateSlope": 1.2,
  "faultPenalty": 7,
  "invariant": "相同命令流和初始状态产生相同角色状态",
  "fault": "撤销记录遗漏执行前位置或外部副作用",
  "evidence": "命令日志、目标ID、执行序号与撤销后状态"
} satisfies GppCausalModel;
const props = { title, focus, stages, nodes, model };

export function GppChapter02CommandMapLab() {
  return <GppMechanismLab {...props} />;
}

export function GppChapter02CommandExperimentLab() {
  return <GppTradeoffLab {...props} />;
}

export function GppChapter02CommandEvidenceLab() {
  return <GppFailureLab {...props} />;
}
