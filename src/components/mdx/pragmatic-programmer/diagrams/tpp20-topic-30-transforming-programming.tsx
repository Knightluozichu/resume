import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-30-transforming-programming",
  title: "30 变换式编程",
  nodes: ["输入", "变换", "组合", "输出", "错误"],
  focuses: ["变换式编程", "数据流", "纯函数", "中间值", "错误通道"],
} as const;

export function Tpp20Topic30TransformingProgrammingSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic30TransformingProgrammingFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic30TransformingProgrammingEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
