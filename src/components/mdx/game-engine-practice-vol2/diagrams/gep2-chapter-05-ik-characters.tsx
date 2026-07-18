import {
  Gep2PipelineLab,
  Gep2BudgetLab,
  Gep2EvidenceLab,
} from "./official-gep2-lab";

const title = "第5章 IK与角色";
const focus = "末端目标 / 关节约束 / 迭代收敛 / 姿态融合 / 角色合同";
const stages = [
  "定义末端目标",
  "选择关节链",
  "迭代求解约束",
  "融合原始姿态",
  "验证角色状态",
];

export function Gep2Chapter05IkCharactersMapLab() {
  return <Gep2PipelineLab title={title} focus={focus} stages={stages} />;
}

export function Gep2Chapter05IkCharactersExperimentLab() {
  return <Gep2BudgetLab title={title} focus={focus} stages={stages} />;
}

export function Gep2Chapter05IkCharactersEvidenceLab() {
  return <Gep2EvidenceLab title={title} focus={focus} stages={stages} />;
}
