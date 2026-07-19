import { OfficialOoc16Studio } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-03",
  title: "第3章 有心智的机器",
  concepts: [
    "第3章 有心智的机器",
    "3.1 取悦有身体的机器",
    "3.2 快速、廉价、失控",
    "3.3 众愚成智",
    "3.4 嵌套层级的优点",
    "3.5 利用现实世界的反馈实现交流",
    "3.6 无躯体则无意识",
    "3.7 心智/躯体的黑盲性精神错乱",
  ],
  nodes: [
    "感知局部状态",
    "触发低层行为",
    "层级竞争抑制",
    "作用真实环境",
    "用后果再校准",
  ],
  focuses: ["具身性", "包容架构", "简单代理", "环境反馈", "模型盲区"],
  model: {
    studio: "具身行为栈",
    axisA: {
      label: "传感回路延迟",
      levels: ["长延迟", "周期采样", "动作即反馈"],
    },
    axisB: {
      label: "行为层互补度",
      levels: ["同一策略", "两层抑制", "多层可退化"],
    },
    outcomes: {
      success: "任务完成率",
      risk: "内部模型漂移",
      evidence: "证据可追溯度",
    },
    fault: "高层规划覆盖了避障反射",
    task: "注入传感延迟并定位具身机器的第一个错误动作",
    practiceMode: "diagnosis",
    riskEffects: [-1, -1],
  },
} as const;

export function Ooc16Chapter03MapLab() {
  return <OfficialOoc16Studio {...props} mode="map" />;
}

export function Ooc16Chapter03ExperimentLab() {
  return <OfficialOoc16Studio {...props} mode="experiment" />;
}

export function Ooc16Chapter03EvidenceLab() {
  return <OfficialOoc16Studio {...props} mode="evidence" />;
}
