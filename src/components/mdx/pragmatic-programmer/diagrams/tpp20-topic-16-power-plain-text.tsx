import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-topic-16-power-plain-text",
  title: "16 纯文本的威力",
  nodes: ["知识", "文本表示", "版本化", "处理", "长期读取"],
  focuses: ["纯文本", "编码", "结构格式", "差异比较", "工具独立"],
} as const;

export function Tpp20Topic16PowerPlainTextSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20Topic16PowerPlainTextFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20Topic16PowerPlainTextEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
