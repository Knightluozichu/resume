import {
  GppPipelineLab,
  GppBudgetLab,
  GppEvidenceLab,
} from "./official-gpp-lab";

const title = "11. Bytecode";
const focus = "行为语言 / 指令集 / 栈机器 / 虚拟机 / 工具链";
const stages = [
  "定义行为语言",
  "编译指令流",
  "验证字节码",
  "在虚拟机执行",
  "记录预算与错误",
];

export function GppChapter11BytecodeMapLab() {
  return <GppPipelineLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter11BytecodeExperimentLab() {
  return <GppBudgetLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter11BytecodeEvidenceLab() {
  return <GppEvidenceLab title={title} focus={focus} stages={stages} />;
}
