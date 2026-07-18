import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-50-coconuts-dont-cut-it",
  title: "50 椰子派不上用场",
  nodes: ["本地问题", "外部做法", "机制假设", "试验", "保留淘汰"],
  focuses: ["货物崇拜", "组织语境", "机制", "试点", "适用证据"],
} as const;

export function Tpp20Topic50CoconutsDontCutItSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic50CoconutsDontCutItFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic50CoconutsDontCutItEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
