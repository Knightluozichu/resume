import { OfficialWindowsJourneyLab } from "./official-windows-journey-lab";

const data = {
  title: "附录A 进阶游戏编程书籍总结与推荐",
  label: "第五篇 · 引擎与进阶",
  color: "#1d4ed8",
  soft: "#eff6ff",
  chain: [
    "评估先修能力",
    "选择主题书目",
    "安排递进路线",
    "配套最小项目",
    "记录阅读证据",
    "回到工程问题验收",
  ],
  concepts: [
    "附录A 进阶游戏编程书籍总结与推荐",
    "A.1 零基础游戏编程学习大体阶段概括",
    "A.2 Windows游戏编程入门书籍推荐",
    "A.3 游戏编程进阶书籍推荐",
    "A.3.1 DirectX入门",
    "A.3.2 地形方面",
    "A.3.3 物理方面",
    "A.3.4 数学方面",
    "A.3.5 引擎设计方面",
    "A.3.6 实时渲染方面",
    "A.3.7 图形学方面",
    "A.3.8 AI方面",
    "A.3.9 网络方面",
    "A.3.10 系列书籍方面",
    "A.3.11 策划方面",
    "A.3.12 美工方面",
  ],
} as const;

export function WjAppendixAReadingGuideMapLab() {
  return <OfficialWindowsJourneyLab {...data} view="map" />;
}

export function WjAppendixAReadingGuideExperimentLab() {
  return <OfficialWindowsJourneyLab {...data} view="experiment" />;
}

export function WjAppendixAReadingGuideEvidenceLab() {
  return <OfficialWindowsJourneyLab {...data} view="evidence" />;
}
