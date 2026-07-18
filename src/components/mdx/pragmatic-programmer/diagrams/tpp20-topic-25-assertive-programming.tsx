import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-25-assertive-programming",
  title: "25 断言式编程",
  nodes: ["假设", "断言", "触发", "诊断", "修复"],
  focuses: ["断言", "不可能状态", "输入校验", "生产行为", "诊断上下文"],
} as const;

export function Tpp20Topic25AssertiveProgrammingSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic25AssertiveProgrammingFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic25AssertiveProgrammingEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
