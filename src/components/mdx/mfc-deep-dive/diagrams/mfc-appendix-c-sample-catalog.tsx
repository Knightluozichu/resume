import { OfficialMfcLab } from "./official-mfc-lab";

const data = {
  title: "附录C Visual C++5.0MFC范例程序一览",
  label: "附录C · 范例索引",
  color: "#a16207",
  soft: "#fefce8",
  chain: [
    "按主题筛选范例",
    "冻结工具版本",
    "定位入口类",
    "追踪关键消息",
    "运行边界样本",
    "记录可迁移结论",
  ],
  concepts: ["附录C Visual C++5.0MFC范例程序一览"],
} as const;

export function MfcAppendixCSampleCatalogMapLab() {
  return <OfficialMfcLab {...data} view="map" />;
}

export function MfcAppendixCSampleCatalogExperimentLab() {
  return <OfficialMfcLab {...data} view="experiment" />;
}

export function MfcAppendixCSampleCatalogEvidenceLab() {
  return <OfficialMfcLab {...data} view="evidence" />;
}
