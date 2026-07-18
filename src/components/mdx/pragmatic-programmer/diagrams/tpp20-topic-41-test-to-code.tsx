import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-41-test-to-code",
  title: "41 为编码测试",
  nodes: ["行为目标", "测试接口", "最小实现", "反馈", "扩展"],
  focuses: ["测试视角", "端到端", "可测试性", "接口反馈", "状态覆盖"],
} as const;

export function Tpp20Topic41TestToCodeSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic41TestToCodeFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic41TestToCodeEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
