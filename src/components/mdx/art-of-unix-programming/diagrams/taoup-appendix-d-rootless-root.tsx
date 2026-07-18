import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-appendix-d-rootless-root",
  title: "附录D 无根的根：无名师的Unix心传",
  nodes: ["公案情境", "固有假设", "反转问题", "Unix判断", "实践回看"],
  focuses: ["九则公案", "规模", "脚本", "界面", "最终用户"],
} as const;

export function TaoupAppendixDRootlessRootCompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupAppendixDRootlessRootRepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupAppendixDRootlessRootEvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
