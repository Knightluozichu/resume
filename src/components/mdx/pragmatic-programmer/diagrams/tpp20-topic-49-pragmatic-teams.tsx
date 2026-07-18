import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-49-pragmatic-teams",
  title: "49 务实的团队",
  nodes: ["稳定团队", "共同目标", "全功能", "工作节奏", "改进"],
  focuses: ["团队稳定性", "全功能", "信任", "日程", "端到端能力"],
} as const;

export function Tpp20Topic49PragmaticTeamsSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic49PragmaticTeamsFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic49PragmaticTeamsEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
