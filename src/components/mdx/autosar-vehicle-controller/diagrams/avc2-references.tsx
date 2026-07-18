import { OfficialAvc2BookLab } from "./official-avc2-book-lab";

const props = {
  unitId: "avc2-references",
  title: "参考文献：规范、工具与证据边界",
  nodes: ["原书坐标", "规范版本", "工具版本", "芯片资料", "复现实证"],
  focuses: ["参考文献", "版本冻结", "来源优先级", "差异记录", "证据归档"],
} as const;

export function Avc2ReferencesArchitectureLab() {
  return <OfficialAvc2BookLab {...props} mode="architecture" />;
}

export function Avc2ReferencesConfigurationLab() {
  return <OfficialAvc2BookLab {...props} mode="configuration" />;
}

export function Avc2ReferencesEvidenceLab() {
  return <OfficialAvc2BookLab {...props} mode="evidence" />;
}
