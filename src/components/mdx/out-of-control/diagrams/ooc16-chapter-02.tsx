import { OfficialOoc16Studio } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-02",
  title: "第2章 蜂群思维",
  concepts: [
    "第2章 蜂群思维",
    "2.1 蜜蜂之道：分布式管理",
    "2.2 群氓的集体智慧",
    "2.3 非匀质的看不见的手",
    "2.4 认知行为的分散记忆",
    "2.5 从量变到质变",
    "2.6 群集的利与弊",
    "2.7 网络是21世纪的图标",
  ],
  nodes: [
    "分散状态",
    "执行局部规则",
    "聚合差异信号",
    "观察整体模式",
    "抑制级联失效",
  ],
  focuses: ["分布治理", "集体智慧", "网络异质性", "群体记忆", "群集边界"],
  model: {
    studio: "蜂群信号聚合器",
    axisA: {
      label: "信号独立性",
      levels: ["共同来源", "部分独立", "异质独立"],
    },
    axisB: {
      label: "聚合门槛",
      levels: ["单点触发", "简单多数", "带置信度法定数"],
    },
    outcomes: {
      success: "群体判断质量",
      risk: "级联误判率",
      evidence: "证据可追溯度",
    },
    fault: "高连接度节点传播错误信号",
    task: "比较同质群体与异质群体在噪声任务中的首个分岔",
    practiceMode: "simulation",
    riskEffects: [-1, -1],
  },
} as const;

export function Ooc16Chapter02MapLab() {
  return <OfficialOoc16Studio {...props} mode="map" />;
}

export function Ooc16Chapter02ExperimentLab() {
  return <OfficialOoc16Studio {...props} mode="experiment" />;
}

export function Ooc16Chapter02EvidenceLab() {
  return <OfficialOoc16Studio {...props} mode="evidence" />;
}
