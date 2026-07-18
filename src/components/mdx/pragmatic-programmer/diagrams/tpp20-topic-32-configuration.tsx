import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-32-configuration",
  title: "32 配置",
  nodes: ["策略", "配置模式", "加载", "校验", "动态变更"],
  focuses: ["外部配置", "模式", "默认值", "版本", "审计"],
} as const;

export function Tpp20Topic32ConfigurationSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic32ConfigurationFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic32ConfigurationEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
