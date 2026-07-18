import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const data = {
  title: "第1章 开始制作编译器",
  label: "总览 · C♭与cbc",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "冻结C♭规格",
    "运行参考cbc",
    "观察编译阶段",
    "保存中间产物",
    "执行目标程序",
    "回归样例集",
  ],
  concepts: [
    "第1章 开始制作编译器",
    "1.1 本书的概要",
    "1.2 编译过程",
    "1.3 使用C♭编译器进行编译",
  ],
} as const;

export function Crc01StartCompilerMapLab() {
  return <OfficialCraftingCompilerLab {...data} view="map" />;
}

export function Crc01StartCompilerExperimentLab() {
  return <OfficialCraftingCompilerLab {...data} view="experiment" />;
}

export function Crc01StartCompilerEvidenceLab() {
  return <OfficialCraftingCompilerLab {...data} view="evidence" />;
}
