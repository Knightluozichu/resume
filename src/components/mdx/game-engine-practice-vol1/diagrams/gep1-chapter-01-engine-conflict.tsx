import { OfficialGep1Lab } from "./official-gep1-lab";

const props = {
  unitId: "gep1-chapter-01-engine-conflict",
  title: "第1章 引擎的纷争",
  nodes: [
    "冻结项目约束",
    "识别通用能力",
    "比较引擎方案",
    "划分游戏边界",
    "验证复用收益",
  ],
  focuses: ["引擎定义", "历史演化", "自研成本", "玩法边界", "团队控制"],
};

export function Gep1Chapter01EngineConflictMapLab() {
  return <OfficialGep1Lab {...props} initialView="map" />;
}
export function Gep1Chapter01EngineConflictExperimentLab() {
  return <OfficialGep1Lab {...props} initialView="experiment" />;
}
export function Gep1Chapter01EngineConflictEvidenceLab() {
  return <OfficialGep1Lab {...props} initialView="evidence" />;
}
