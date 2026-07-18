import {
  Gep2PipelineLab,
  Gep2BudgetLab,
  Gep2EvidenceLab,
} from "./official-gep2-lab";

const title = "第12章 阴影";
const focus = "投影模型 / 遮挡表示 / 阴影预算 / 偏差控制 / 级联稳定";
const stages = [
  "选择投影模型",
  "构建遮挡表示",
  "分配阴影预算",
  "采样并过滤",
  "验证漏光与抖动",
];

export function Gep2Chapter12ShadowsMapLab() {
  return <Gep2PipelineLab title={title} focus={focus} stages={stages} />;
}

export function Gep2Chapter12ShadowsExperimentLab() {
  return <Gep2BudgetLab title={title} focus={focus} stages={stages} />;
}

export function Gep2Chapter12ShadowsEvidenceLab() {
  return <Gep2EvidenceLab title={title} focus={focus} stages={stages} />;
}
