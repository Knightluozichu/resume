import { OfficialWindowsJourneyLab } from "./official-windows-journey-lab";

const data = {
  title: "第1章 高瞻远瞩——游戏开发面面观",
  label: "序篇 · 梦想与行业",
  color: "#b91c1c",
  soft: "#fef2f2",
  chain: [
    "定义目标",
    "识别平台",
    "比较图形接口",
    "选择技术路线",
    "建立练习证据",
    "复盘学习路径",
  ],
  concepts: [
    "第1章 高瞻远瞩——游戏开发面面观",
    "1.1 逐梦——梦想让我们不孤单",
    "1.1.1 现在的努力，就是为了证明小时候吹过的牛",
    "1.1.2 为梦想，为国产游戏的未来，请把这本书读下去",
    "1.2 游戏产业的黎明",
    "1.3 游戏产业的分类——六大游戏市场",
    "1.3.1 3A级游戏开发领域",
    "1.3.2 社交和休闲游戏开发领域",
    "1.3.3 移动游戏开发领域",
    "1.3.4 功能型游戏开发领域",
    "1.3.5 学术型游戏开发领域",
    "1.3.6 独立型游戏开发领域",
    "1.4 游戏平台与游戏开发编程语言的认知",
    "1.5 对游戏类型的认知",
    "1.6 游戏开发中图形API的概念",
    "1.7 游戏编程学习路线总结",
    "1.8 章节小憩",
  ],
} as const;

export function Wj01GameDevelopmentLandscapeMapLab() {
  return <OfficialWindowsJourneyLab {...data} view="map" />;
}

export function Wj01GameDevelopmentLandscapeExperimentLab() {
  return <OfficialWindowsJourneyLab {...data} view="experiment" />;
}

export function Wj01GameDevelopmentLandscapeEvidenceLab() {
  return <OfficialWindowsJourneyLab {...data} view="evidence" />;
}
