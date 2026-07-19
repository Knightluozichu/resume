import { OfficialOoc16Studio } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-08",
  title: "第8章 封闭系统",
  concepts: [
    "第8章 封闭系统",
    "8.1 密封的瓶装生命",
    "8.2 邮购盖亚",
    "8.3 人与绿藻息息相关",
    "8.4 巨大的生态技术玻璃球",
    "8.5 在持久的混沌中进行的实验",
    "8.6 另外一种合成生态系统",
  ],
  nodes: [
    "声明系统边界",
    "盘点输入输出",
    "闭合物质循环",
    "监测慢变量",
    "保留外部救援",
  ],
  focuses: ["生态边界", "物质循环", "互补代谢", "慢性级联", "合成自然"],
  model: {
    studio: "封闭生态收支表",
    axisA: {
      label: "物质循环闭合度",
      levels: ["大量外排", "部分回收", "主要闭合"],
    },
    axisB: {
      label: "慢变量监测",
      levels: ["不监测", "抽样", "连续趋势"],
    },
    outcomes: {
      success: "自持时长",
      risk: "隐性耗竭",
      evidence: "证据可追溯度",
    },
    fault: "短期氧气正常掩盖土壤或微量元素下降",
    task: "为瓶装生态系统做一张输入输出与救援阈值清单",
    practiceMode: "diagnosis",
    riskEffects: [-1, -1],
  },
} as const;

export function Ooc16Chapter08MapLab() {
  return <OfficialOoc16Studio {...props} mode="map" />;
}

export function Ooc16Chapter08ExperimentLab() {
  return <OfficialOoc16Studio {...props} mode="experiment" />;
}

export function Ooc16Chapter08EvidenceLab() {
  return <OfficialOoc16Studio {...props} mode="evidence" />;
}
