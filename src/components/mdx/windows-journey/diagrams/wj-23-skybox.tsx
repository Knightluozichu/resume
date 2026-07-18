import { OfficialWindowsJourneyLab } from "./official-windows-journey-lab";

const data = {
  title: "第23章 向碧蓝的苍穹致敬——三维天空的构建",
  label: "第四篇 · DirectX游戏编程应用",
  color: "#be185d",
  soft: "#fdf2f8",
  chain: [
    "准备天空纹理",
    "建立天空几何",
    "跟随摄像机",
    "调整深度状态",
    "绘制远景",
    "恢复场景状态",
  ],
  concepts: [
    "第23章 向碧蓝的苍穹致敬——三维天空的构建",
    "23.1 三维天空技术阐述",
    "23.2 天空盒的设计",
    "23.3 天空盒类的实现",
    "23.4 天空盒类的使用",
    "23.5 示例程序D3Ddemo18",
    "23.6 章节小憩",
  ],
} as const;

export function Wj23SkyboxMapLab() {
  return <OfficialWindowsJourneyLab {...data} view="map" />;
}

export function Wj23SkyboxExperimentLab() {
  return <OfficialWindowsJourneyLab {...data} view="experiment" />;
}

export function Wj23SkyboxEvidenceLab() {
  return <OfficialWindowsJourneyLab {...data} view="evidence" />;
}
