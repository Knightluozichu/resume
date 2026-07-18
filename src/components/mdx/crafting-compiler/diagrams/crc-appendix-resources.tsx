import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const data = {
  title: "附录",
  label: "附录 · 资料与源码",
  color: "#7c3aed",
  soft: "#ede9fe",
  chain: [
    "定位主题",
    "核对版本",
    "取得源码",
    "复现最小样本",
    "保存原始证据",
    "回链正文",
  ],
  concepts: ["附录", "A.1 参考文献", "A.2 在线资料", "A.3 源代码"],
} as const;

export function CrcAppendixResourcesMapLab() {
  return <OfficialCraftingCompilerLab {...data} view="map" />;
}

export function CrcAppendixResourcesExperimentLab() {
  return <OfficialCraftingCompilerLab {...data} view="experiment" />;
}

export function CrcAppendixResourcesEvidenceLab() {
  return <OfficialCraftingCompilerLab {...data} view="evidence" />;
}
