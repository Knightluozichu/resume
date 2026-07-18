import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const data = {
  title: "第20章 加载程序",
  label: "第4部分 · 链接和加载",
  color: "#047857",
  soft: "#d1fae5",
  chain: [
    "读取程序头",
    "映射ELF段",
    "建立初始栈",
    "运行动态链接器",
    "跳转入口",
    "观测按需加载",
  ],
  concepts: [
    "第20章 加载程序",
    "20.1 加载ELF段",
    "20.2 动态链接过程",
    "20.3 动态加载",
    "20.4 GNU ld的链接",
  ],
} as const;

export function Crc20ProgramLoadingMapLab() {
  return <OfficialCraftingCompilerLab {...data} view="map" />;
}

export function Crc20ProgramLoadingExperimentLab() {
  return <OfficialCraftingCompilerLab {...data} view="experiment" />;
}

export function Crc20ProgramLoadingEvidenceLab() {
  return <OfficialCraftingCompilerLab {...data} view="evidence" />;
}
