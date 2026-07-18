import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-chapter-05-bend-or-break",
  title: "第5章 宁弯不折",
  nodes: ["边界解耦", "事件协调", "数据变换", "组合复用", "策略外置"],
  focuses: ["耦合", "事件流", "变换式编程", "委托", "配置"],
} as const;

export function Tpp20Chapter05BendOrBreakSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Chapter05BendOrBreakFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Chapter05BendOrBreakEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
