import { OfficialOpt23Lab } from "./official-opt23-lab";

const props = {
  unitId: "opt-23-chapter-04",
  title: "第4章 高级套装：提高执行力的12个工具",
  nodes: [
    "识别变化动力",
    "纳入关键主体",
    "绘制系统与风险",
    "形成共同愿景战略",
    "落实责任并跟踪",
  ],
  focuses: ["动力阻力", "利益主体", "系统回路", "风险选择", "战略执行"],
} as const;

export function Opt23Chapter04MapLab() {
  return <OfficialOpt23Lab {...props} mode="map" />;
}
export function Opt23Chapter04ExperimentLab() {
  return <OfficialOpt23Lab {...props} mode="experiment" />;
}
export function Opt23Chapter04EvidenceLab() {
  return <OfficialOpt23Lab {...props} mode="evidence" />;
}
