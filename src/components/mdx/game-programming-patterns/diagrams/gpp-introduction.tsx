import {
  GppFailureLab,
  GppMechanismLab,
  GppTradeoffLab,
  type GppCausalModel,
  type GppCoverageNode,
} from "./official-gpp-book-lab";

const title = "I. Introduction";
const focus = "按问题阅读独立模式，而不是把全书误当成一套必须照搬的引擎";
const stages = [
  "描述困境",
  "选择章节",
  "识别结构",
  "迁移思想",
  "验证边界"
];
const nodes = [
  {
    "label": "I. Introduction",
    "mechanism": "I. Introduction 把本章机制落到一个具体设计坐标：用意图、动机、模式、适用性、代价、实现和设计决策逐层筛选，并以“读者能说明为什么读某章以及在什么条件下不用它”作为通过条件。",
    "probe": "检查阅读路径、问题清单、反例与迁移说明"
  },
  {
    "label": "What’s in Store",
    "mechanism": "What’s in Store 把本章机制落到一个具体设计坐标：用意图、动机、模式、适用性、代价、实现和设计决策逐层筛选，并以“读者能说明为什么读某章以及在什么条件下不用它”作为通过条件。",
    "probe": "检查阅读路径、问题清单、反例与迁移说明"
  },
  {
    "label": "How it Relates to Design Patterns",
    "mechanism": "How it Relates to Design Patterns 是设计分叉题；回答必须说明选择怎样改变用意图、动机、模式、适用性、代价、实现和设计决策逐层筛选，以及哪条反例会推翻选择。",
    "probe": "检查阅读路径、问题清单、反例与迁移说明"
  },
  {
    "label": "How to Read the Book",
    "mechanism": "How to Read the Book 是设计分叉题；回答必须说明选择怎样改变用意图、动机、模式、适用性、代价、实现和设计决策逐层筛选，以及哪条反例会推翻选择。",
    "probe": "检查阅读路径、问题清单、反例与迁移说明"
  },
  {
    "label": "About the Sample Code",
    "mechanism": "About the Sample Code 把本章机制落到一个具体设计坐标：用意图、动机、模式、适用性、代价、实现和设计决策逐层筛选，并以“读者能说明为什么读某章以及在什么条件下不用它”作为通过条件。",
    "probe": "检查阅读路径、问题清单、反例与迁移说明"
  },
  {
    "label": "Where to Go From Here",
    "mechanism": "Where to Go From Here 把本章机制落到一个具体设计坐标：用意图、动机、模式、适用性、代价、实现和设计决策逐层筛选，并以“读者能说明为什么读某章以及在什么条件下不用它”作为通过条件。",
    "probe": "检查阅读路径、问题清单、反例与迁移说明"
  }
] satisfies GppCoverageNode[];
const model = {
  "baselineLabel": "从头照抄",
  "candidateLabel": "按问题索引",
  "unit": "无效步骤",
  "baselineBase": 9,
  "baselineSlope": 3.5,
  "candidateBase": 4.5,
  "candidateSlope": 1.1,
  "faultPenalty": 7,
  "invariant": "读者能说明为什么读某章以及在什么条件下不用它",
  "fault": "把简化C++示例当成现代生产编码规范",
  "evidence": "阅读路径、问题清单、反例与迁移说明"
} satisfies GppCausalModel;
const props = { title, focus, stages, nodes, model };

export function GppIntroductionMapLab() {
  return <GppMechanismLab {...props} />;
}

export function GppIntroductionExperimentLab() {
  return <GppTradeoffLab {...props} />;
}

export function GppIntroductionEvidenceLab() {
  return <GppFailureLab {...props} />;
}
