import {
  Gep2PipelineLab,
  Gep2BudgetLab,
  Gep2EvidenceLab,
} from "./official-gep2-lab";

const title = "第10章 光照与材质";
const focus = "光源分类 / 材质通道 / 直接光 / 间接光 / 投射函数";
const stages = [
  "分类场景光源",
  "选择材质通道",
  "累积直接光",
  "组合间接光",
  "验证投射函数",
];

export function Gep2Chapter10LightingMaterialsMapLab() {
  return <Gep2PipelineLab title={title} focus={focus} stages={stages} />;
}

export function Gep2Chapter10LightingMaterialsExperimentLab() {
  return <Gep2BudgetLab title={title} focus={focus} stages={stages} />;
}

export function Gep2Chapter10LightingMaterialsEvidenceLab() {
  return <Gep2EvidenceLab title={title} focus={focus} stages={stages} />;
}
