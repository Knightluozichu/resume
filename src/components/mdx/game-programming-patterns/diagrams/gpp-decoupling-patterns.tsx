import {
  GppFailureLab,
  GppMechanismLab,
  GppTradeoffLab,
  type GppCausalModel,
  type GppCoverageNode,
} from "./official-gpp-book-lab";

const title = "V. Decoupling Patterns";
const focus = "按领域、时间和服务发现三个轴比较组件、事件队列与定位器";
const stages = [
  "画依赖",
  "识别耦合轴",
  "选择机制",
  "声明合同",
  "注入失败"
];
const nodes = [
  {
    "label": "V. Decoupling Patterns",
    "mechanism": "V. Decoupling Patterns 把本章机制落到一个具体设计坐标：组件隔离领域，队列隔离时间，定位器延后服务绑定但保留显式代价，并以“被解耦的两侧仍有可观察、可替换和可终止的合同”作为通过条件。",
    "probe": "检查静态依赖图、消息时间线、服务替换测试与失败回传"
  },
  {
    "label": "The Patterns",
    "mechanism": "The Patterns 把本章机制落到一个具体设计坐标：组件隔离领域，队列隔离时间，定位器延后服务绑定但保留显式代价，并以“被解耦的两侧仍有可观察、可替换和可终止的合同”作为通过条件。",
    "probe": "检查静态依赖图、消息时间线、服务替换测试与失败回传"
  }
] satisfies GppCoverageNode[];
const model = {
  "baselineLabel": "系统互调",
  "candidateLabel": "显式解耦",
  "unit": "传播模块",
  "baselineBase": 15,
  "baselineSlope": 6,
  "candidateBase": 8,
  "candidateSlope": 1.6,
  "faultPenalty": 13,
  "invariant": "被解耦的两侧仍有可观察、可替换和可终止的合同",
  "fault": "中央总线或定位器把显式依赖变成不可追踪全局状态",
  "evidence": "静态依赖图、消息时间线、服务替换测试与失败回传"
} satisfies GppCausalModel;
const props = { title, focus, stages, nodes, model };

export function GppDecouplingPatternsMapLab() {
  return <GppMechanismLab {...props} />;
}

export function GppDecouplingPatternsExperimentLab() {
  return <GppTradeoffLab {...props} />;
}

export function GppDecouplingPatternsEvidenceLab() {
  return <GppFailureLab {...props} />;
}
