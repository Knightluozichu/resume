import { OfficialWindowsJourneyLab } from "./official-windows-journey-lab";

const data = {
  title: "《逐梦旅程》权威学习地图",
  label: "学习地图",
  color: "#9f1239",
  soft: "#fff1f2",
  chain: [
    "核对版本目录",
    "建立Windows根基",
    "完成GDI原型",
    "掌握Direct3D基础",
    "构造三维场景",
    "抽象引擎边界",
  ],
  concepts: [
    "序篇与五篇",
    "26章",
    "附录A",
    "407个核心层级",
    "2013年技术语境",
    "完整项目证据",
  ],
} as const;

export function WjOfficialLearningMapMapLab() {
  return <OfficialWindowsJourneyLab {...data} view="map" />;
}

export function WjOfficialLearningMapExperimentLab() {
  return <OfficialWindowsJourneyLab {...data} view="experiment" />;
}

export function WjOfficialLearningMapEvidenceLab() {
  return <OfficialWindowsJourneyLab {...data} view="evidence" />;
}
