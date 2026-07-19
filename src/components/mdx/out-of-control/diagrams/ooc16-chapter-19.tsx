import { OfficialOoc16Studio } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-19",
  title: "第19章 后达尔文主义",
  concepts: [
    "第19章 后达尔文主义",
    "19.1 达尔文进化论不完备之处",
    "19.2 只有自然选择还不够",
    "19.3 生命之树上的连理枝",
    "19.4 非随机突变的前提",
    "19.5 怪亦有道",
    "19.6 化抽象为具象",
    "19.7 物以类聚",
    "19.8 DNA并不能给所有东西编码",
    "19.9 不确定的生物搜索空间密度",
    "19.10 自然选择之数学原理",
  ],
  nodes: [
    "产生受约束变异",
    "经发育具象化",
    "形成可行聚类",
    "接受多层筛选",
    "修正谱系模型",
  ],
  focuses: ["理论边界", "变异供给", "生命网络", "发育约束", "可达空间"],
  model: {
    studio: "后达尔文机制拼图",
    axisA: {
      label: "变异生成约束",
      levels: ["假设均匀随机", "发育偏置", "结构化可达集"],
    },
    axisB: {
      label: "筛选层级",
      levels: ["单层个体", "个体与群体", "网络与环境共同筛选"],
    },
    outcomes: {
      success: "现象解释覆盖",
      risk: "万能叙事风险",
      evidence: "证据可追溯度",
    },
    fault: "选择被用来事后解释任何观察结果",
    task: "为一个形态分别列出变异供给、发育约束和选择证据",
    practiceMode: "diagnosis",
    riskEffects: [-1, 1],
  },
} as const;

export function Ooc16Chapter19MapLab() {
  return <OfficialOoc16Studio {...props} mode="map" />;
}

export function Ooc16Chapter19ExperimentLab() {
  return <OfficialOoc16Studio {...props} mode="experiment" />;
}

export function Ooc16Chapter19EvidenceLab() {
  return <OfficialOoc16Studio {...props} mode="evidence" />;
}
