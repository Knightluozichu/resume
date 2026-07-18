import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-34-shared-state",
  title: "34 共享状态是不正确的状态",
  nodes: ["共享状态", "竞争窗口", "所有权", "同步", "不变量"],
  focuses: ["共享状态", "竞态", "原子性", "锁", "事务"],
} as const;

export function Tpp20Topic34SharedStateSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic34SharedStateFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic34SharedStateEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
