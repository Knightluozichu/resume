import { OfficialOoc16Studio } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-14",
  title: "第14章 在形式的图书馆中",
  concepts: [
    "第14章 在形式的图书馆中",
    "14.1 “大千”图书馆之旅",
    "14.2 一切可能图像之空间",
    "14.3 倘佯在生物形态王国",
    "14.4 御变异体而行",
    "14.5 形式库中也有性",
    "14.6 三步轻松繁育艺术杰作",
    "14.7 穿越随机性",
  ],
  nodes: [
    "编码生成规则",
    "产生候选变异",
    "按目标评价",
    "保留重组片段",
    "迭代探索空间",
  ],
  focuses: ["可能空间", "生成形态", "变异选择", "重组", "进化艺术"],
  model: {
    studio: "形式空间育种器",
    axisA: {
      label: "候选变异跨度",
      levels: ["微调", "重组", "跨区域跳变"],
    },
    axisB: {
      label: "选择反馈信息量",
      levels: ["只给输赢", "排序", "多目标解释"],
    },
    outcomes: {
      success: "新颖可用形态",
      risk: "过早收敛率",
      evidence: "证据可追溯度",
    },
    fault: "选择压力过强导致形式库迅速坍缩",
    task: "用变异、重组和选择找到一个未被直接画出的形态",
    practiceMode: "simulation",
    riskEffects: [1, -1],
  },
} as const;

export function Ooc16Chapter14MapLab() {
  return <OfficialOoc16Studio {...props} mode="map" />;
}

export function Ooc16Chapter14ExperimentLab() {
  return <OfficialOoc16Studio {...props} mode="experiment" />;
}

export function Ooc16Chapter14EvidenceLab() {
  return <OfficialOoc16Studio {...props} mode="evidence" />;
}
