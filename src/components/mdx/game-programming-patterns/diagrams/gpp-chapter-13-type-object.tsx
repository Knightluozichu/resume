import {
  GppPipelineLab,
  GppBudgetLab,
  GppEvidenceLab,
} from "./official-gpp-lab";

const title = "13. Type Object";
const focus = "运行时类型 / 类型数据 / 实例构造 / 数据继承 / 类型变更";
const stages = [
  "定义运行时类型",
  "加载类型数据",
  "创建带类型实例",
  "解析类型继承",
  "验证热变更",
];

export function GppChapter13TypeObjectMapLab() {
  return <GppPipelineLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter13TypeObjectExperimentLab() {
  return <GppBudgetLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter13TypeObjectEvidenceLab() {
  return <GppEvidenceLab title={title} focus={focus} stages={stages} />;
}
