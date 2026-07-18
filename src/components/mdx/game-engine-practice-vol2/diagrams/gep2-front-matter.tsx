import {
  Gep2PipelineLab,
  Gep2BudgetLab,
  Gep2EvidenceLab,
} from "./official-gep2-lab";

const title = "书前资料：版本、范围、读者与资源";
const focus = "版本坐标 / 能力基线 / 资源校验 / 实验口径 / 证据记录";
const stages = [
  "固定版本坐标",
  "校准前置能力",
  "获取配套资源",
  "建立实验基线",
  "记录复核证据",
];

export function Gep2FrontMatterMapLab() {
  return <Gep2PipelineLab title={title} focus={focus} stages={stages} />;
}

export function Gep2FrontMatterExperimentLab() {
  return <Gep2BudgetLab title={title} focus={focus} stages={stages} />;
}

export function Gep2FrontMatterEvidenceLab() {
  return <Gep2EvidenceLab title={title} focus={focus} stages={stages} />;
}
