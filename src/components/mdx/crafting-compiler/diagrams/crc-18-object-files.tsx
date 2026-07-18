import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const data = {
  title: "第18章 生成目标文件",
  label: "第4部分 · 链接和加载",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: [
    "列出ELF节",
    "布局全局符号",
    "生成重定位",
    "写入目标文件",
    "反汇编节内容",
    "核对符号表",
  ],
  concepts: [
    "第4部分 链接和加载",
    "第18章 生成目标文件",
    "18.1 ELF文件的结构",
    "18.2 全局变量及其在ELF文件中的表示",
    "18.3 编译全局变量",
    "18.4 生成目标文件",
  ],
} as const;

export function Crc18ObjectFilesMapLab() {
  return <OfficialCraftingCompilerLab {...data} view="map" />;
}

export function Crc18ObjectFilesExperimentLab() {
  return <OfficialCraftingCompilerLab {...data} view="experiment" />;
}

export function Crc18ObjectFilesEvidenceLab() {
  return <OfficialCraftingCompilerLab {...data} view="evidence" />;
}
