import { OfficialOoc16Studio } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-11",
  title: "第11章 网络经济学",
  concepts: [
    "第11章 网络经济学",
    "11.1 脱离实体",
    "11.2 以联结取代计算",
    "11.3 信息工厂",
    "11.4 与错误打交道",
    "11.5 联通所有的一切",
  ],
  nodes: [
    "数字化可复制",
    "建立互操作连接",
    "触发网络效应",
    "管理噪声错误",
    "分配共同价值",
  ],
  focuses: ["非实体价值", "连接效应", "信息生产", "错误治理", "系统性风险"],
  model: {
    studio: "网络收益与错误预算",
    axisA: {
      label: "有效连接数",
      levels: ["孤立", "小群互通", "广域互联"],
    },
    axisB: {
      label: "错误隔离能力",
      levels: ["全网传播", "分区降级", "局部熔断"],
    },
    outcomes: {
      success: "网络共同价值",
      risk: "系统级联半径",
      evidence: "证据可追溯度",
    },
    fault: "连接增长快于错误治理能力",
    task: "比较增加一个节点带来的边际价值与新增攻击面",
    practiceMode: "calculation",
    riskEffects: [1, -1],
  },
} as const;

export function Ooc16Chapter11MapLab() {
  return <OfficialOoc16Studio {...props} mode="map" />;
}

export function Ooc16Chapter11ExperimentLab() {
  return <OfficialOoc16Studio {...props} mode="experiment" />;
}

export function Ooc16Chapter11EvidenceLab() {
  return <OfficialOoc16Studio {...props} mode="evidence" />;
}
