import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const data = {
  title: "第19章 链接和库",
  label: "第4部分 · 链接和加载",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "收集输入对象",
    "解析全局符号",
    "选择库成员",
    "应用重定位",
    "生成可执行文件",
    "验证静态动态依赖",
  ],
  concepts: [
    "第19章 链接和库",
    "19.1 链接的概要",
    "19.2 什么是链接",
    "19.3 动态链接和静态链接",
    "19.4 生成库",
  ],
} as const;

export function Crc19LinkingLibrariesMapLab() {
  return <OfficialCraftingCompilerLab {...data} view="map" />;
}

export function Crc19LinkingLibrariesExperimentLab() {
  return <OfficialCraftingCompilerLab {...data} view="experiment" />;
}

export function Crc19LinkingLibrariesEvidenceLab() {
  return <OfficialCraftingCompilerLab {...data} view="evidence" />;
}
