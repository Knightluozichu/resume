import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-24-dead-programs-tell-no-lies",
  title: "24 死掉的程序不会说谎",
  nodes: ["异常", "上下文", "停止", "隔离", "恢复"],
  focuses: ["快速失败", "不可信状态", "错误传播", "故障边界", "恢复策略"],
} as const;

export function Tpp20Topic24DeadProgramsTellNoLiesSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic24DeadProgramsTellNoLiesFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic24DeadProgramsTellNoLiesEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
