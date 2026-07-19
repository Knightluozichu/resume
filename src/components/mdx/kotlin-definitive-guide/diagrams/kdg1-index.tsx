import {
  KdgContractLab,
  KdgCoverageLab,
  KdgRecoveryLab,
  type KdgCausalModel,
  type KdgCoverageNode,
} from "./official-kdg1-book-lab";

const title = "索引";
const focus =
  "用问题、符号、概念关系和章节定位来检索全书，而不是线性翻找关键词";
const stages = ["界定责任", "比较方案", "声明不变量", "验证替换", "记录决策"];
const nodes = [
  {
    label: "Index",
    stage: "界定责任",
    mechanism:
      "Index服务于用问题、符号、概念关系和章节定位来检索全书，而不是线性翻找关键词。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以问题索引、符号索引、关系图、章节反向链接和检索测试完成独立复核。",
    probe:
      "Index使用问题索引、符号索引、关系图、章节反向链接和检索测试完成出现、解释、实验和练习四级核对",
  },
] satisfies KdgCoverageNode[];
const model = {
  historicalLabel: "Kotlin 1.2 / JVM 时代基线",
  currentLabel: "当前 Kotlin 迁移对照",
  invariant:
    "用问题、符号、概念关系和章节定位来检索全书，而不是线性翻找关键词的输入、类型边界、求值结果和失败路径都能由独立读者重放",
  fault: "把同名API命中当成语义答案，忽略版本和上下文",
  evidence: "问题索引、符号索引、关系图、章节反向链接和检索测试",
  boundary:
    "用问题、符号、概念关系和章节定位来检索全书，而不是线性翻找关键词的最小合法输入与第一个非法输入",
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
