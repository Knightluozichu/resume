import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const data = {
  title: "第22章 扩展阅读",
  label: "第4部分 · 链接和加载",
  color: "#be123c",
  soft: "#ffe4e6",
  chain: [
    "定位主题",
    "核对版本",
    "取得源码",
    "复现最小样本",
    "保存原始证据",
    "回链正文",
  ],
  concepts: [
    "第22章 扩展阅读",
    "22.1 参考书推荐",
    "22.2 链接、加载相关",
    "22.3 各种编程语言的功能",
  ],
} as const;

export function Crc22FurtherReadingMapLab() {
  return <OfficialCraftingCompilerLab {...data} view="map" />;
}

export function Crc22FurtherReadingExperimentLab() {
  return <OfficialCraftingCompilerLab {...data} view="experiment" />;
}

export function Crc22FurtherReadingEvidenceLab() {
  return <OfficialCraftingCompilerLab {...data} view="evidence" />;
}
