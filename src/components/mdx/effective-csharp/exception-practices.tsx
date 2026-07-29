"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "报告失败",
    mechanism:
      "只有无法满足方法承诺的情况才抛异常，并选择能表达恢复策略的类型。",
    failure: "用返回值吞掉严重失败，或把普通分支全部异常化。",
    evidence: "异常类型矩阵、调用方处理策略与边界测试。",
  },
  {
    label: "清理资源",
    mechanism: "using 或 finally 必须在传播异常前完成确定清理。",
    failure: "清理代码只在成功路径执行，原始异常又被二次异常覆盖。",
    evidence: "故障注入、Dispose 次数与异常链。",
  },
  {
    label: "保持状态",
    mechanism: "优先强异常保证：失败后对象保持调用前可用状态。",
    failure: "先修改共享状态再执行可能失败的步骤，留下半提交。",
    evidence: "前后快照、不变量断言与补偿日志。",
  },
];

export function ExceptionContractLab() {
  return (
    <ChapterDecisionLab
      title="异常传播与状态保证实验"
      prompt="沿失败路径检查报告方式、资源清理、状态恢复和诊断上下文。"
      stages={STAGES}
      conclusion="异常是方法契约的一部分：调用方需要知道什么算失败、失败后对象仍满足什么不变量，以及哪里能取得证据。"
    />
  );
}

export function ExceptionContractMechanismMap() {
  return <ChapterMechanismMap title="异常传播与状态保证实验" stages={STAGES} />;
}

export function ExceptionContractFailureDiagram() {
  return (
    <ChapterFailureMatrix title="异常传播与状态保证实验" stages={STAGES} />
  );
}
