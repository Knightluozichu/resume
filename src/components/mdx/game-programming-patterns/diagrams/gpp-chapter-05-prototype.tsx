import {
  GppPipelineLab,
  GppBudgetLab,
  GppEvidenceLab,
} from "./official-gpp-lab";

const title = "5. Prototype";
const focus = "克隆语义 / 生成函数 / 第一类类型 / 原型继承 / 数据模板";
const stages = [
  "选择原型来源",
  "克隆结构状态",
  "覆盖实例差异",
  "修复身份引用",
  "验证数据继承",
];

export function GppChapter05PrototypeMapLab() {
  return <GppPipelineLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter05PrototypeExperimentLab() {
  return <GppBudgetLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter05PrototypeEvidenceLab() {
  return <GppEvidenceLab title={title} focus={focus} stages={stages} />;
}
