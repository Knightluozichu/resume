import {
  GppFailureLab,
  GppMechanismLab,
  GppTradeoffLab,
  type GppCausalModel,
  type GppCoverageNode,
} from "./official-gpp-book-lab";

const title = "3. Flyweight";
const focus = "把大量实例的共享固有状态与逐实例外在状态分开";
const stages = [
  "拆分状态",
  "建立享元",
  "创建实例",
  "批量渲染",
  "检查污染"
];
const nodes = [
  {
    "label": "3. Flyweight",
    "mechanism": "3. Flyweight 把本章机制落到一个具体设计坐标：享元对象持有共享重资源，实例只保留位置、颜色和共享引用，并以“修改一个实例的外在状态不会污染其他实例或共享资源”作为通过条件。",
    "probe": "检查唯一资源数、实例字节数、引用身份与渲染结果"
  },
  {
    "label": "Forest for the Trees",
    "mechanism": "Forest for the Trees 把本章机制落到一个具体设计坐标：享元对象持有共享重资源，实例只保留位置、颜色和共享引用，并以“修改一个实例的外在状态不会污染其他实例或共享资源”作为通过条件。",
    "probe": "检查唯一资源数、实例字节数、引用身份与渲染结果"
  },
  {
    "label": "A Thousand Instances",
    "mechanism": "A Thousand Instances 把本章机制落到一个具体设计坐标：享元对象持有共享重资源，实例只保留位置、颜色和共享引用，并以“修改一个实例的外在状态不会污染其他实例或共享资源”作为通过条件。",
    "probe": "检查唯一资源数、实例字节数、引用身份与渲染结果"
  },
  {
    "label": "The Flyweight Pattern",
    "mechanism": "The Flyweight Pattern 把本章机制落到一个具体设计坐标：享元对象持有共享重资源，实例只保留位置、颜色和共享引用，并以“修改一个实例的外在状态不会污染其他实例或共享资源”作为通过条件。",
    "probe": "检查唯一资源数、实例字节数、引用身份与渲染结果"
  },
  {
    "label": "A Place To Put Down Roots",
    "mechanism": "A Place To Put Down Roots 把本章机制落到一个具体设计坐标：享元对象持有共享重资源，实例只保留位置、颜色和共享引用，并以“修改一个实例的外在状态不会污染其他实例或共享资源”作为通过条件。",
    "probe": "检查唯一资源数、实例字节数、引用身份与渲染结果"
  },
  {
    "label": "What About Performance?",
    "mechanism": "What About Performance? 是设计分叉题；回答必须说明选择怎样改变享元对象持有共享重资源，实例只保留位置、颜色和共享引用，以及哪条反例会推翻选择。",
    "probe": "检查唯一资源数、实例字节数、引用身份与渲染结果"
  },
  {
    "label": "See Also",
    "mechanism": "See Also 用相邻模式做替代和组合比较；只有解决不同变化轴时才允许叠加。",
    "probe": "检查唯一资源数、实例字节数、引用身份与渲染结果"
  }
] satisfies GppCoverageNode[];
const model = {
  "baselineLabel": "逐实例复制",
  "candidateLabel": "享元共享",
  "unit": "MiB",
  "baselineBase": 14,
  "baselineSlope": 7,
  "candidateBase": 8,
  "candidateSlope": 1.3,
  "faultPenalty": 12,
  "invariant": "修改一个实例的外在状态不会污染其他实例或共享资源",
  "fault": "可变颜色被错误放入共享享元",
  "evidence": "唯一资源数、实例字节数、引用身份与渲染结果"
} satisfies GppCausalModel;
const props = { title, focus, stages, nodes, model };

export function GppChapter03FlyweightMapLab() {
  return <GppMechanismLab {...props} />;
}

export function GppChapter03FlyweightExperimentLab() {
  return <GppTradeoffLab {...props} />;
}

export function GppChapter03FlyweightEvidenceLab() {
  return <GppFailureLab {...props} />;
}
