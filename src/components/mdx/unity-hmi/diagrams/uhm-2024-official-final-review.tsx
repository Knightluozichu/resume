import {
  Uhm24PlatformLab,
  Uhm24BudgetLab,
  Uhm24EvidenceLab,
} from "./official-unity-hmi-lab";

const title = "《Unity for HMI》2024官方演讲综合验收";
const focus =
  "用车型场景、SoC与OS组合、URAS多View故障和量产预算完成全材料闭卷复核。";
const stages = [
  "抽取车型需求",
  "选择平台组合",
  "实现多应用视图",
  "注入资源与故障压力",
  "形成量产判定",
];

export function Uhm24OfficialFinalReviewMapLab() {
  return <Uhm24PlatformLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24OfficialFinalReviewExperimentLab() {
  return <Uhm24BudgetLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24OfficialFinalReviewEvidenceLab() {
  return <Uhm24EvidenceLab title={title} focus={focus} stages={stages} />;
}
