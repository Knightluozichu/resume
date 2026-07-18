import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-08-essence-good-design",
  title: "8 优秀设计的精髓",
  nodes: ["变化假设", "影响图", "最小修改", "验证", "恢复"],
  focuses: ["ETC", "触达范围", "耦合", "反馈延迟", "回退成本"],
} as const;

export function Tpp20Topic08EssenceGoodDesignSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic08EssenceGoodDesignFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic08EssenceGoodDesignEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
