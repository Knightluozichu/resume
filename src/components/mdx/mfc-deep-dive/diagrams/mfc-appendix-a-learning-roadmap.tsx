import { OfficialMfcLab } from "./official-mfc-lab";

const data = {
  title: "附录A 无责任书评：从摇篮到坟墓Windows的完全学习",
  label: "附录A · 学习路线",
  color: "#7c2d12",
  soft: "#fff7ed",
  chain: [
    "盘点前置知识",
    "补齐Win32 SDK",
    "掌握C++对象模型",
    "深入MFC框架",
    "进入系统专题",
    "用项目验证资料",
  ],
  concepts: [
    "附录A 无责任书评：从摇篮到坟墓Windows的完全学习",
    "无责任书评：MFC四大天王",
  ],
} as const;

export function MfcAppendixALearningRoadmapMapLab() {
  return <OfficialMfcLab {...data} view="map" />;
}

export function MfcAppendixALearningRoadmapExperimentLab() {
  return <OfficialMfcLab {...data} view="experiment" />;
}

export function MfcAppendixALearningRoadmapEvidenceLab() {
  return <OfficialMfcLab {...data} view="evidence" />;
}
