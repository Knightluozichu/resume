import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-second-edition-preface",
  title: "新版前言",
  nodes: ["1999基线", "行业变化", "主题重写", "新版结构", "迁移验证"],
  focuses: ["20周年版", "重写范围", "技术更替", "不变原则", "版本边界"],
} as const;

export function Tpp20SecondEditionPrefaceSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20SecondEditionPrefaceFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20SecondEditionPrefaceEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
