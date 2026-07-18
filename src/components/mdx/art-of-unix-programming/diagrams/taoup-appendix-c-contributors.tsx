import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-appendix-c-contributors",
  title: "附录C 贡献者",
  nodes: ["贡献者", "贡献类型", "影响位置", "责任边界", "致谢记录"],
  focuses: ["作者责任", "评审输入", "案例来源", "归属", "可追溯"],
} as const;

export function TaoupAppendixCContributorsCompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupAppendixCContributorsRepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupAppendixCContributorsEvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
