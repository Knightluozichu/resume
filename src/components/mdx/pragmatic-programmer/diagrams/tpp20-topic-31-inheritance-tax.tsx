import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-31-inheritance-tax",
  title: "31 继承税",
  nodes: ["需求", "接口", "委托", "组合", "替换"],
  focuses: ["继承税", "多态", "接口", "委托", "mixin"],
} as const;

export function Tpp20Topic31InheritanceTaxSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic31InheritanceTaxFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic31InheritanceTaxEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
