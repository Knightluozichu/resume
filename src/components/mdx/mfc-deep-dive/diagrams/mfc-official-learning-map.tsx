import { OfficialMfcLab } from "./official-mfc-lab";

const data = {
  title: "《深入浅出MFC（第二版）》权威学习地图",
  label: "全书 · 证据地图",
  color: "#155e75",
  soft: "#ecfeff",
  chain: [
    "核对版本",
    "补齐目录",
    "建立Win32底座",
    "追踪框架生命线",
    "推进Scribble",
    "综合附录证据",
  ],
  concepts: [
    "第0章与学习入口",
    "第一篇基础",
    "第二篇工具",
    "第三篇框架",
    "第四篇深入MFC",
    "附录A-D",
  ],
} as const;

export function MfcOfficialLearningMapMapLab() {
  return <OfficialMfcLab {...data} view="map" />;
}

export function MfcOfficialLearningMapExperimentLab() {
  return <OfficialMfcLab {...data} view="experiment" />;
}

export function MfcOfficialLearningMapEvidenceLab() {
  return <OfficialMfcLab {...data} view="evidence" />;
}
