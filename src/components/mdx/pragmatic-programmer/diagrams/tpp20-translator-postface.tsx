import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-translator-postface",
  title: "译者跋",
  nodes: ["原文概念", "译名选择", "中文语境", "当前解释", "术语复核"],
  focuses: ["译者责任", "术语映射", "语境差异", "版本信息", "读者复核"],
} as const;

export function Tpp20TranslatorPostfaceSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20TranslatorPostfaceFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20TranslatorPostfaceEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
