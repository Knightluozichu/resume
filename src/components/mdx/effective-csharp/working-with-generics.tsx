"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "最小约束",
    mechanism: "只声明算法实际调用的成员和构造能力。",
    failure: "过强约束排除合法类型，过弱约束迫使运行时分支。",
    evidence: "可接受/应拒绝类型的编译矩阵。",
  },
  {
    label: "替换方向",
    mechanism: "协变只安全地产出 T，逆变只安全地消费 T。",
    failure: "把读写能力混在同一接口会阻断 variance 或产生不安全假设。",
    evidence: "赋值兼容测试与输入输出位置审计。",
  },
  {
    label: "扩展策略",
    mechanism: "优先泛型方法和最小接口，再用扩展方法补充便利操作。",
    failure: "为每个构造类型建特化层，造成重复和二义性。",
    evidence: "API surface diff、重载解析测试与版本兼容测试。",
  },
];

export function GenericsContractLab() {
  return (
    <ChapterDecisionLab
      title="泛型约束与可替换性设计实验"
      prompt="从调用方真正需要的能力出发，逐层检查约束、variance 与扩展点。"
      stages={STAGES}
      conclusion="好的泛型 API 承诺的是最小能力集合；每增加一个约束、特化或接口，都必须换来可验证的语义。"
    />
  );
}

export function GenericsContractMechanismMap() {
  return (
    <ChapterMechanismMap title="泛型约束与可替换性设计实验" stages={STAGES} />
  );
}

export function GenericsContractFailureDiagram() {
  return (
    <ChapterFailureMatrix title="泛型约束与可替换性设计实验" stages={STAGES} />
  );
}
