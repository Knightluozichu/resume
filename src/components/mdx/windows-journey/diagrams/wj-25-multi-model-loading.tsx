import { OfficialWindowsJourneyLab } from "./official-windows-journey-lab";

const data = {
  title: "第25章 造物主的降临——多游戏模型的载入",
  label: "第四篇 · DirectX游戏编程应用",
  color: "#b91c1c",
  soft: "#fef2f2",
  chain: [
    "解析模型文件",
    "创建网格对象",
    "载入材质纹理",
    "优化或克隆网格",
    "逐子集绘制",
    "回收资源与缓存",
  ],
  concepts: [
    "第25章 造物主的降临——多游戏模型的载入",
    "25.1 网格模型的优化",
    "25.2 网格模型的克隆",
    "25.3 文件模型载入类的设计",
    "25.4 文件模型载入类的实现",
    "25.5 文件模型载入类的使用",
    "25.6 示例程序D3Ddemo20",
    "25.7 章节小憩",
  ],
} as const;

export function Wj25MultiModelLoadingMapLab() {
  return <OfficialWindowsJourneyLab {...data} view="map" />;
}

export function Wj25MultiModelLoadingExperimentLab() {
  return <OfficialWindowsJourneyLab {...data} view="experiment" />;
}

export function Wj25MultiModelLoadingEvidenceLab() {
  return <OfficialWindowsJourneyLab {...data} view="evidence" />;
}
