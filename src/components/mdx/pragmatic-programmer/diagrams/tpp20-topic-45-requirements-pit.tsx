import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-45-requirements-pit",
  title: "45 需求之坑",
  nodes: ["用户目标", "观察", "试验", "反馈", "需求更新"],
  focuses: ["需求发现", "用户协作", "策略元数据", "术语表", "反馈循环"],
} as const;

export function Tpp20Topic45RequirementsPitSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic45RequirementsPitFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic45RequirementsPitEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
