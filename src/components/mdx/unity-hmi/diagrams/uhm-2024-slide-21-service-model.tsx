import {
  Uhm24PlatformLab,
  Uhm24BudgetLab,
  Uhm24EvidenceLab,
} from "./official-unity-hmi-lab";

const title = "第21页 创新、实施与迭代服务模式";
const focus =
  "服务模型把项目分为创新咨询、项目合作和ISS持续服务，课程据此定义PoC、量产、性能与团队交接门。";
const stages = [
  "创新可行性评估",
  "PoC证明",
  "量产实施",
  "性能与部署验收",
  "ISS持续迭代",
];

export function Uhm24Slide21ServiceModelMapLab() {
  return <Uhm24PlatformLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide21ServiceModelExperimentLab() {
  return <Uhm24BudgetLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide21ServiceModelEvidenceLab() {
  return <Uhm24EvidenceLab title={title} focus={focus} stages={stages} />;
}
