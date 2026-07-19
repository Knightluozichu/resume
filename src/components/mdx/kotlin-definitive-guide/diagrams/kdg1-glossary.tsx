import {
  KdgContractLab,
  KdgCoverageLab,
  KdgRecoveryLab,
  type KdgCausalModel,
  type KdgCoverageNode,
} from "./official-kdg1-book-lab";

const title = "术语表";
const focus = "建立Kotlin 1.2术语到定义、反例、代码位置和相关章节的双向索引";
const stages = ["界定责任", "比较方案", "声明不变量", "验证替换", "记录决策"];
const nodes = [
  {
    label: "Glossary",
    stage: "界定责任",
    mechanism:
      "Glossary服务于建立Kotlin 1.2术语到定义、反例、代码位置和相关章节的双向索引。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以术语卡、定义来源、反例、章节链接和歧义清单完成独立复核。",
    probe:
      "Glossary使用术语卡、定义来源、反例、章节链接和歧义清单完成出现、解释、实验和练习四级核对",
  },
] satisfies KdgCoverageNode[];
const model = {
  historicalLabel: "Kotlin 1.2 / JVM 时代基线",
  currentLabel: "当前 Kotlin 迁移对照",
  invariant:
    "建立Kotlin 1.2术语到定义、反例、代码位置和相关章节的双向索引的输入、类型边界、求值结果和失败路径都能由独立读者重放",
  fault: "背诵名词却不能用代码区分相邻概念",
  evidence: "术语卡、定义来源、反例、章节链接和歧义清单",
  boundary:
    "建立Kotlin 1.2术语到定义、反例、代码位置和相关章节的双向索引的最小合法输入与第一个非法输入",
} satisfies KdgCausalModel;
const props = { title, focus, stages, nodes, model };

export function KdgModelLab() {
  return <KdgCoverageLab {...props} />;
}

export function KdgFailureLab() {
  return <KdgContractLab {...props} />;
}

export function KdgEvidenceLab() {
  return <KdgRecoveryLab {...props} />;
}
