import {
  Uhm24PlatformLab,
  Uhm24BudgetLab,
  Uhm24EvidenceLab,
} from "./official-unity-hmi-lab";

const title = "第4页 量产采用证据";
const focus =
  "演讲用三组2024时点数据说明Unity HMI在智能电动车企、合作车厂和量产车型中的采用规模。";
const stages = [
  "读取统计口径",
  "区分比例与数量",
  "绑定演讲时点",
  "登记证据限制",
  "避免当作现值",
];

export function Uhm24Slide04ProductionEvidenceMapLab() {
  return <Uhm24PlatformLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide04ProductionEvidenceExperimentLab() {
  return <Uhm24BudgetLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide04ProductionEvidenceEvidenceLab() {
  return <Uhm24EvidenceLab title={title} focus={focus} stages={stages} />;
}
