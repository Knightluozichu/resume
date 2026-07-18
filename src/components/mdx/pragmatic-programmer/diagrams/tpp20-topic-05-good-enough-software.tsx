import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-05-good-enough-software",
  title: "5 够好即可的软件",
  nodes: ["用户目标", "质量属性", "阈值", "取舍", "验收"],
  focuses: ["质量需求", "适用场景", "最低阈值", "延期代价", "用户裁决"],
} as const;

export function Tpp20Topic05GoodEnoughSoftwareSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic05GoodEnoughSoftwareFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic05GoodEnoughSoftwareEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
