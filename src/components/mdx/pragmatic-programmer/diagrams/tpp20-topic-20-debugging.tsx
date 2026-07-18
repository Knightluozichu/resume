import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-20-debugging",
  title: "20 调试",
  nodes: ["复现", "数据", "假设", "实验", "回归"],
  focuses: ["失败样本", "错误信息", "最小复现", "首差", "回归测试"],
} as const;

export function Tpp20Topic20DebuggingSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic20DebuggingFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic20DebuggingEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
