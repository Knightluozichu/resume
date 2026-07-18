import { OfficialWindowsJourneyLab } from "./official-windows-journey-lab";

const data = {
  title: "第26章 站在巨人肩膀上——游戏引擎技术导论",
  label: "第五篇 · 引擎与进阶",
  color: "#047857",
  soft: "#ecfdf5",
  chain: [
    "划分引擎子系统",
    "定义资源生命周期",
    "组织场景更新",
    "抽象渲染接口",
    "接入工具与内容",
    "评估边界与权衡",
  ],
  concepts: [
    "第26章 站在巨人肩膀上——游戏引擎技术导论",
    "26.1 游戏引擎的起源、意义和概念",
    "26.1.1 游戏引擎的起源和意义",
    "26.1.2 游戏引擎的概念理解",
    "26.1.3 一款完善的游戏引擎的构成",
    "26.1.4 DirectX与游戏引擎的区别",
    "26.2 人气开源游戏引擎介绍",
    "26.3 游戏引擎排名的权威榜单一瞥",
    "26.4 优秀的免费/开源第一人称射击游戏介绍",
    "26.5 关于游戏引擎的一些思考",
    "26.6 市面上各类游戏引擎完全列举",
  ],
} as const;

export function Wj26GameEnginesMapLab() {
  return <OfficialWindowsJourneyLab {...data} view="map" />;
}

export function Wj26GameEnginesExperimentLab() {
  return <OfficialWindowsJourneyLab {...data} view="experiment" />;
}

export function Wj26GameEnginesEvidenceLab() {
  return <OfficialWindowsJourneyLab {...data} view="evidence" />;
}
