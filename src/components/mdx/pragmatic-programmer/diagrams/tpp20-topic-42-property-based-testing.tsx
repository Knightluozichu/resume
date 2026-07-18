import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-42-property-based-testing",
  title: "42 基于特性测试",
  nodes: ["生成器", "前置约束", "不变量", "随机运行", "缩减"],
  focuses: ["特性测试", "生成器", "不变量", "种子", "最小反例"],
} as const;

export function Tpp20Topic42PropertyBasedTestingSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic42PropertyBasedTestingFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic42PropertyBasedTestingEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
