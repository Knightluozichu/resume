import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-17-shell-games",
  title: "17 Shell游戏",
  nodes: ["输入", "过滤", "变换", "组合", "输出"],
  focuses: ["命令行", "管道", "退出码", "幂等性", "脚本证据"],
} as const;

export function Tpp20Topic17ShellGamesSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic17ShellGamesFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic17ShellGamesEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
