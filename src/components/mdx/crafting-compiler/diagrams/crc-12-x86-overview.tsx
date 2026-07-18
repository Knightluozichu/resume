import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const data = {
  title: "第12章 x86架构的概要",
  label: "第3部分 · x86与调用约定",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: [
    "确认IA-32模型",
    "选择寄存器",
    "遵守调用约定",
    "布局参数局部量",
    "生成序言尾声",
    "用反汇编核对",
  ],
  concepts: [
    "第3部分 汇编代码",
    "第12章 x86架构的概要",
    "12.1 计算机的系统结构",
    "12.2 x86系列CPU的历史",
    "12.3 IA-32的概要",
    "12.4 数据的表现形式和格式",
  ],
} as const;

export function Crc12X86OverviewMapLab() {
  return <OfficialCraftingCompilerLab {...data} view="map" />;
}

export function Crc12X86OverviewExperimentLab() {
  return <OfficialCraftingCompilerLab {...data} view="experiment" />;
}

export function Crc12X86OverviewEvidenceLab() {
  return <OfficialCraftingCompilerLab {...data} view="evidence" />;
}
