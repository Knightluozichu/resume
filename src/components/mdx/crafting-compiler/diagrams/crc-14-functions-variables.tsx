import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const data = {
  title: "第14章 函数和变量",
  label: "第3部分 · x86与调用约定",
  color: "#047857",
  soft: "#d1fae5",
  chain: [
    "确认IA-32模型",
    "选择寄存器",
    "遵守调用约定",
    "布局参数局部量",
    "生成序言尾声",
    "用反汇编核对",
  ],
  concepts: [
    "第14章 函数和变量",
    "14.1 程序调用约定",
    "14.2 Linux/x86下的函数调用",
    "14.3 Linux/x86下函数调用的细节",
  ],
} as const;

export function Crc14FunctionsVariablesMapLab() {
  return <OfficialCraftingCompilerLab {...data} view="map" />;
}

export function Crc14FunctionsVariablesExperimentLab() {
  return <OfficialCraftingCompilerLab {...data} view="experiment" />;
}

export function Crc14FunctionsVariablesEvidenceLab() {
  return <OfficialCraftingCompilerLab {...data} view="evidence" />;
}
