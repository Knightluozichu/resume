import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-38-programming-by-coincidence",
  title: "38 巧合式编程",
  nodes: ["观察", "隐藏假设", "因果验证", "显式设计", "回归"],
  focuses: ["巧合式编程", "隐含假设", "默认行为", "因果链", "回归"],
} as const;

export function Tpp20Topic38ProgrammingByCoincidenceSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic38ProgrammingByCoincidenceFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic38ProgrammingByCoincidenceEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
