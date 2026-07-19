import { OfficialOoc16Studio } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-06",
  title: "第6章 自然之流变",
  concepts: [
    "第6章 自然之流变",
    "6.1 均衡即死亡",
    "6.2 谁先出现，稳定性还是多样性？",
    "6.3 生态系统：超有机体，抑或是身份作坊？",
    "6.4 变化的起源",
    "6.5 生生不息的生命",
    "6.6 负熵",
    "6.7 第四个间断：生成之环",
  ],
  nodes: [
    "输入自由能",
    "生成局部差异",
    "多样路径竞争",
    "输出熵与废物",
    "反馈重写身份",
  ],
  focuses: ["非均衡", "稳定多样性", "生态身份", "变异来源", "生成循环"],
  model: {
    studio: "开放系统通量台",
    axisA: {
      label: "自由能输入",
      levels: ["接近停流", "维持通量", "高通量"],
    },
    axisB: {
      label: "变化来源",
      levels: ["抑制差异", "保留扰动", "持续生成变异"],
    },
    outcomes: {
      success: "非均衡持续度",
      risk: "熵债务",
      evidence: "证据可追溯度",
    },
    fault: "只量系统内部而忽略能量与废物边界",
    task: "画出一个活系统的能量输入、废物输出和身份更新环",
    practiceMode: "calculation",
    riskEffects: [1, 1],
  },
} as const;

export function Ooc16Chapter06MapLab() {
  return <OfficialOoc16Studio {...props} mode="map" />;
}

export function Ooc16Chapter06ExperimentLab() {
  return <OfficialOoc16Studio {...props} mode="experiment" />;
}

export function Ooc16Chapter06EvidenceLab() {
  return <OfficialOoc16Studio {...props} mode="evidence" />;
}
