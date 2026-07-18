import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-06-knowledge-portfolio",
  title: "6 知识组合",
  nodes: ["盘点", "分散投资", "实践", "批判验证", "再平衡"],
  focuses: ["知识资产", "折旧率", "练习证据", "来源偏差", "再平衡周期"],
} as const;

export function Tpp20Topic06KnowledgePortfolioSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic06KnowledgePortfolioFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic06KnowledgePortfolioEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
