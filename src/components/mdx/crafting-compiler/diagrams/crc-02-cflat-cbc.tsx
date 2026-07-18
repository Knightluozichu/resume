import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const data = {
  title: "第2章 C♭和cbc",
  label: "总览 · C♭与cbc",
  color: "#047857",
  soft: "#d1fae5",
  chain: [
    "冻结C♭规格",
    "运行参考cbc",
    "观察编译阶段",
    "保存中间产物",
    "执行目标程序",
    "回归样例集",
  ],
  concepts: ["第2章 C♭和cbc", "2.1 C♭语言的概要", "2.2 C♭编译器cbc的构成"],
} as const;

export function Crc02CflatCbcMapLab() {
  return <OfficialCraftingCompilerLab {...data} view="map" />;
}

export function Crc02CflatCbcExperimentLab() {
  return <OfficialCraftingCompilerLab {...data} view="experiment" />;
}

export function Crc02CflatCbcEvidenceLab() {
  return <OfficialCraftingCompilerLab {...data} view="evidence" />;
}
