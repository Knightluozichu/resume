import { OfficialWindowsJourneyLab } from "./official-windows-journey-lab";

const data = {
  title: "第22章 钟灵毓秀的世界——三维地形的构建",
  label: "第四篇 · DirectX游戏编程应用",
  color: "#a16207",
  soft: "#fefce8",
  chain: [
    "读取高度图",
    "生成地形顶点",
    "计算三角索引",
    "绑定地形纹理",
    "绘制地形块",
    "检查边界与采样",
  ],
  concepts: [
    "第22章 钟灵毓秀的世界——三维地形的构建",
    "22.1 三维地形绘制思路分析",
    "22.2 关于高度图",
    "22.2.1 高度图的概念",
    "22.2.2 高度图的制作",
    "22.2.3 用Photoshop制作高度图",
    "22.2.4 在程序中读取高度图",
    "22.3 地形类轮廓的书写",
    "22.4 地形顶点的计算",
    "22.5 地形索引的计算",
    "22.6 渲染出地形",
    "22.7 完成地形类的设计",
    "22.8 示例程序D3Ddemo17",
    "22.9 章节小憩",
  ],
} as const;

export function Wj22TerrainMapLab() {
  return <OfficialWindowsJourneyLab {...data} view="map" />;
}

export function Wj22TerrainExperimentLab() {
  return <OfficialWindowsJourneyLab {...data} view="experiment" />;
}

export function Wj22TerrainEvidenceLab() {
  return <OfficialWindowsJourneyLab {...data} view="evidence" />;
}
