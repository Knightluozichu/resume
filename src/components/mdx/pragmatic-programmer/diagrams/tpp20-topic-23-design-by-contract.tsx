import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-23-design-by-contract",
  title: "23 契约式设计",
  nodes: ["调用者义务", "前置条件", "实现", "后置条件", "不变量"],
  focuses: ["契约", "前置条件", "后置条件", "不变量", "责任归属"],
} as const;

export function Tpp20Topic23DesignByContractSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic23DesignByContractFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic23DesignByContractEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
