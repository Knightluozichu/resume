import { OfficialEex19Lab } from "./official-eex19-lab";

const props = {
  unitId: "eex19-official-learning-map",
  title: "《卓有成效的管理者》权威学习地图",
  nodes: [
    "核定版本目录",
    "建立五项习惯",
    "绑定工作样本",
    "运行周度复盘",
    "验收外部成果",
  ],
  focuses: ["完整目录", "时间记录", "贡献成果", "长处优先", "决策兑现"],
} as const;

export function Eex19OfficialLearningMapMapLab() {
  return <OfficialEex19Lab {...props} mode="map" />;
}
export function Eex19OfficialLearningMapExperimentLab() {
  return <OfficialEex19Lab {...props} mode="experiment" />;
}
export function Eex19OfficialLearningMapEvidenceLab() {
  return <OfficialEex19Lab {...props} mode="evidence" />;
}
