import { OfficialMfcLab } from "./official-mfc-lab";

const data = {
  title: "第11章 View功能的加强与重绘效率的提高",
  label: "第四篇 · View与重绘",
  color: "#1d4ed8",
  soft: "#eff6ff",
  chain: [
    "修改Document",
    "生成hint",
    "广播View更新",
    "计算失效区域",
    "滚动坐标变换",
    "创建切分窗格",
  ],
  concepts: [
    "第11章 View功能的加强与重绘效率的提高",
    "同时修改多个Views：UpdateAllViews和OnUpdate",
    "在View中定义一个hint",
    "把hint传给OnUpdate",
    "利用hint增加重绘效率",
    "可卷动的窗口：CScrollView",
    "大窗口中的小窗口：Splitter",
    "切分窗口的功能",
    "切分窗口的程序概念",
    "切分窗口的实现",
    "本章回顾",
  ],
} as const;

export function Mfc11ViewAndRedrawMapLab() {
  return <OfficialMfcLab {...data} view="map" />;
}

export function Mfc11ViewAndRedrawExperimentLab() {
  return <OfficialMfcLab {...data} view="experiment" />;
}

export function Mfc11ViewAndRedrawEvidenceLab() {
  return <OfficialMfcLab {...data} view="evidence" />;
}
