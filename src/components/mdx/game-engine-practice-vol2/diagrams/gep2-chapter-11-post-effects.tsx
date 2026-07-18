import {
  Gep2PipelineLab,
  Gep2BudgetLab,
  Gep2EvidenceLab,
} from "./official-gep2-lab";

const title = "第11章 后期效果";
const focus = "场景输出 / 效果依赖 / 临时目标 / 后期材质 / 画质验证";
const stages = [
  "读取场景输出",
  "声明效果依赖",
  "分配临时目标",
  "执行后期材质",
  "合成最终画面",
];

export function Gep2Chapter11PostEffectsMapLab() {
  return <Gep2PipelineLab title={title} focus={focus} stages={stages} />;
}

export function Gep2Chapter11PostEffectsExperimentLab() {
  return <Gep2BudgetLab title={title} focus={focus} stages={stages} />;
}

export function Gep2Chapter11PostEffectsEvidenceLab() {
  return <Gep2EvidenceLab title={title} focus={focus} stages={stages} />;
}
