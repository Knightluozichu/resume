import { OfficialOpt23Lab } from "./official-opt23-lab";

const props = {
  unitId: "opt-23-chapter-03",
  title: "第3章 中级套装：助你开会轻松又有条理的16个工具",
  nodes: [
    "建立共同在场",
    "让多方平等输入",
    "结构化拆解问题",
    "重构关系与视角",
    "筛选并承诺下一步",
  ],
  focuses: ["参与平衡", "逻辑结构", "权力安全", "视角反馈", "收敛承诺"],
} as const;

export function Opt23Chapter03MapLab() {
  return <OfficialOpt23Lab {...props} mode="map" />;
}
export function Opt23Chapter03ExperimentLab() {
  return <OfficialOpt23Lab {...props} mode="experiment" />;
}
export function Opt23Chapter03EvidenceLab() {
  return <OfficialOpt23Lab {...props} mode="evidence" />;
}
