import { OfficialOoc16Studio } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-10",
  title: "第10章 工业生态学",
  concepts: [
    "第10章 工业生态学",
    "10.1 全天候、全方位的接入",
    "10.2 看不见的智能",
    "10.3 咬人的房间与不咬人的房间",
    "10.4 规划一个共同体",
    "10.5 闭环制造",
    "10.6 适应的技术",
  ],
  nodes: [
    "感知资源流",
    "连接互补节点",
    "回收副产物",
    "局部适应调节",
    "审计系统外部性",
  ],
  focuses: ["普适连接", "环境智能", "人机冲突", "工业共同体", "闭环适应"],
  model: {
    studio: "工业生态流量网",
    axisA: {
      label: "副产物互补度",
      levels: ["各自排放", "两点交换", "多节点循环"],
    },
    axisB: {
      label: "环境感知粒度",
      levels: ["全局平均", "区域状态", "局部实时"],
    },
    outcomes: {
      success: "资源循环收益",
      risk: "外部性转移",
      evidence: "证据可追溯度",
    },
    fault: "厂内废物下降但系统边界外污染上升",
    task: "为三个工序匹配副产物并检查被转移到边界外的代价",
    practiceMode: "design",
    riskEffects: [-1, -1],
  },
} as const;

export function Ooc16Chapter10MapLab() {
  return <OfficialOoc16Studio {...props} mode="map" />;
}

export function Ooc16Chapter10ExperimentLab() {
  return <OfficialOoc16Studio {...props} mode="experiment" />;
}

export function Ooc16Chapter10EvidenceLab() {
  return <OfficialOoc16Studio {...props} mode="evidence" />;
}
