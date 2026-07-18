import { OfficialTmm40BookLab } from "./official-tmm40-book-lab";

const props = {
  unitId: "tmm40-18-propositions",
  title: "第18章：《人月神话》的观点：是与非",
  nodes: ["章节命题", "支持证据", "反例条件", "当前判定", "行动规则"],
  focuses: ["观点账本", "是非状态", "证据等级", "适用范围", "修订责任"],
} as const;

export function Tmm4018PropositionsDependencyLab() {
  return <OfficialTmm40BookLab {...props} mode="dependency" />;
}

export function Tmm4018PropositionsScheduleLab() {
  return <OfficialTmm40BookLab {...props} mode="schedule" />;
}

export function Tmm4018PropositionsEvidenceLab() {
  return <OfficialTmm40BookLab {...props} mode="evidence" />;
}
