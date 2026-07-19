import { OfficialOoc16Studio } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-04",
  title: "第4章 组装复杂性",
  concepts: [
    "第4章 组装复杂性",
    "4.1 生物——机器的未来",
    "4.2 用火和软体种子恢复草",
    "4.3 通往稳定生态系统的随机路线",
    "4.4 如何同时做好一切",
    "4.5 艰巨的“拼蛋壳”任务",
  ],
  nodes: [
    "保留可活模块",
    "安排局部互动",
    "并行小步试验",
    "筛选稳定组合",
    "逐层扩大边界",
  ],
  focuses: ["生长式设计", "生态恢复", "路径依赖", "并行装配", "不可逆关系"],
  model: {
    studio: "生态装配序列器",
    axisA: {
      label: "增量步长",
      levels: ["整套投入", "分批装配", "小步培育"],
    },
    axisB: {
      label: "路径试验数",
      levels: ["单一路径", "三个复本", "多路径留档"],
    },
    outcomes: {
      success: "稳定关系形成度",
      risk: "路径锁定风险",
      evidence: "证据可追溯度",
    },
    fault: "部件齐全但关键关系未形成",
    task: "安排一条从可活简单系统到复杂整体的装配顺序",
    practiceMode: "simulation",
    riskEffects: [-1, -1],
  },
} as const;

export function Ooc16Chapter04MapLab() {
  return <OfficialOoc16Studio {...props} mode="map" />;
}

export function Ooc16Chapter04ExperimentLab() {
  return <OfficialOoc16Studio {...props} mode="experiment" />;
}

export function Ooc16Chapter04EvidenceLab() {
  return <OfficialOoc16Studio {...props} mode="evidence" />;
}
