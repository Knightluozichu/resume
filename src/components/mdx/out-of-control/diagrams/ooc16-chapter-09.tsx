import { OfficialOoc16Studio } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-09",
  title: "第9章 “冒出”的生态圈",
  concepts: [
    "第9章 “冒出”的生态圈",
    "9.1 一亿美元玻璃方舟的副驾驶",
    "9.2 城市野草",
    "9.3 有意的季节调配",
    "9.4 生命科学的回旋加速器",
    "9.5 终极技术",
  ],
  nodes: [
    "设定人工边界",
    "投入多样生命",
    "运行代谢循环",
    "捕捉意外角色",
    "调整而不抹平",
  ],
  focuses: ["共同驾驶", "边缘物种", "季节控制", "尺度实验", "生命技术"],
  model: {
    studio: "生物圈共同驾驶舱",
    axisA: {
      label: "生命角色多样性",
      levels: ["少数计划物种", "保留边缘种", "允许角色迁移"],
    },
    axisB: {
      label: "人工干预频率",
      levels: ["持续接管", "阈值干预", "只守安全边界"],
    },
    outcomes: {
      success: "生态角色生成度",
      risk: "管理依赖度",
      evidence: "证据可追溯度",
    },
    fault: "每次意外都被管理者立即抹平",
    task: "判断一次季节调整是在救援系统还是阻断系统学习",
    practiceMode: "diagnosis",
    riskEffects: [-1, 1],
  },
} as const;

export function Ooc16Chapter09MapLab() {
  return <OfficialOoc16Studio {...props} mode="map" />;
}

export function Ooc16Chapter09ExperimentLab() {
  return <OfficialOoc16Studio {...props} mode="experiment" />;
}

export function Ooc16Chapter09EvidenceLab() {
  return <OfficialOoc16Studio {...props} mode="evidence" />;
}
