import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-14-domain-languages",
  title: "14 领域语言",
  nodes: ["领域词汇", "语义", "表达", "执行", "反馈"],
  focuses: ["领域语言", "语义边界", "内部DSL", "外部DSL", "错误定位"],
} as const;

export function Tpp20Topic14DomainLanguagesSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic14DomainLanguagesFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic14DomainLanguagesEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
