import {
  GppPipelineLab,
  GppBudgetLab,
  GppEvidenceLab,
} from "./official-gpp-lab";

const title = "6. Singleton";
const focus = "唯一实例 / 全局访问 / 初始化顺序 / 显式依赖 / 测试隔离";
const stages = [
  "拆分唯一性需求",
  "识别全局访问",
  "声明初始化顺序",
  "注入显式依赖",
  "验证替换与测试",
];

export function GppChapter06SingletonMapLab() {
  return <GppPipelineLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter06SingletonExperimentLab() {
  return <GppBudgetLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter06SingletonEvidenceLab() {
  return <GppEvidenceLab title={title} focus={focus} stages={stages} />;
}
