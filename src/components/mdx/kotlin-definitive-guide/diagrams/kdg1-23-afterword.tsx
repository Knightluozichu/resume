import {
  KdgContractLab,
  KdgCoverageLab,
  KdgRecoveryLab,
  type KdgCausalModel,
  type KdgCoverageNode,
} from "./official-kdg1-book-lab";

const title = "23. Afterword";
const focus =
  "把语言、对象模型、互操作、Android与协程能力转成后续项目和持续学习计划";
const stages = ["界定责任", "比较方案", "声明不变量", "验证替换", "记录决策"];
const nodes = [
  {
    label: "23. Afterword",
    stage: "界定责任",
    mechanism:
      "23. Afterword服务于把语言、对象模型、互操作、Android与协程能力转成后续项目和持续学习计划。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以能力矩阵、薄弱点、下一项目、验收标准和版本迁移清单完成独立复核。",
    probe:
      "23. Afterword使用能力矩阵、薄弱点、下一项目、验收标准和版本迁移清单完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Where to Go from Here",
    stage: "比较方案",
    mechanism:
      "Where to Go from Here服务于把语言、对象模型、互操作、Android与协程能力转成后续项目和持续学习计划。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以能力矩阵、薄弱点、下一项目、验收标准和版本迁移清单完成独立复核。",
    probe:
      "Where to Go from Here使用能力矩阵、薄弱点、下一项目、验收标准和版本迁移清单完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Shameless Plugs",
    stage: "声明不变量",
    mechanism:
      "Shameless Plugs服务于把语言、对象模型、互操作、Android与协程能力转成后续项目和持续学习计划。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以能力矩阵、薄弱点、下一项目、验收标准和版本迁移清单完成独立复核。",
    probe:
      "Shameless Plugs使用能力矩阵、薄弱点、下一项目、验收标准和版本迁移清单完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Thank You",
    stage: "验证替换",
    mechanism:
      "Thank You服务于把语言、对象模型、互操作、Android与协程能力转成后续项目和持续学习计划。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以能力矩阵、薄弱点、下一项目、验收标准和版本迁移清单完成独立复核。",
    probe:
      "Thank You使用能力矩阵、薄弱点、下一项目、验收标准和版本迁移清单完成出现、解释、实验和练习四级核对",
  },
] satisfies KdgCoverageNode[];
const model = {
  historicalLabel: "Kotlin 1.2 / JVM 时代基线",
  currentLabel: "当前 Kotlin 迁移对照",
  invariant:
    "把语言、对象模型、互操作、Android与协程能力转成后续项目和持续学习计划的输入、类型边界、求值结果和失败路径都能由独立读者重放",
  fault: "收藏更多资料代替完成可验证项目",
  evidence: "能力矩阵、薄弱点、下一项目、验收标准和版本迁移清单",
  boundary:
    "把语言、对象模型、互操作、Android与协程能力转成后续项目和持续学习计划的最小合法输入与第一个非法输入",
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
