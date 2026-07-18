import {
  Gep2PipelineLab,
  Gep2BudgetLab,
  Gep2EvidenceLab,
} from "./official-gep2-lab";

const title = "第8章 材质";
const focus = "材质参数 / 着色器键 / 节点图 / 变体缓存 / 材质实例";
const stages = [
  "规范材质参数",
  "生成着色器键",
  "遍历节点图",
  "编译缓存变体",
  "绑定材质实例",
];

export function Gep2Chapter08MaterialsMapLab() {
  return <Gep2PipelineLab title={title} focus={focus} stages={stages} />;
}

export function Gep2Chapter08MaterialsExperimentLab() {
  return <Gep2BudgetLab title={title} focus={focus} stages={stages} />;
}

export function Gep2Chapter08MaterialsEvidenceLab() {
  return <Gep2EvidenceLab title={title} focus={focus} stages={stages} />;
}
