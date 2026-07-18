import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-bibliography",
  title: "参考文献",
  nodes: ["目录主张", "引用定位", "原始证据", "适用边界", "当前复核"],
  focuses: ["来源类型", "引用坐标", "证据等级", "时间边界", "交叉核对"],
} as const;

export function Tpp20BibliographySystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20BibliographyFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20BibliographyEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
