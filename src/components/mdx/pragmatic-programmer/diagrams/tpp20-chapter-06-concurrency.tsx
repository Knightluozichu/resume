import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-chapter-06-concurrency",
  title: "第6章 并发",
  nodes: ["依赖分析", "并行切分", "状态隔离", "消息协作", "事实协调"],
  focuses: ["时域耦合", "共享状态", "角色模型", "黑板", "并发证据"],
} as const;

export function Tpp20Chapter06ConcurrencySystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Chapter06ConcurrencyFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Chapter06ConcurrencyEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
