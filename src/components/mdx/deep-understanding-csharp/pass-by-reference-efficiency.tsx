"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么Pass by Reference首先是正确性与Li…",
    mechanism:
      "“避免复制大struct”只是ref features的一种用途。 ref 改变的是expression是否代表一个value还是一个storage location的alias；一旦alias可写，修改会穿透到original storage，一旦alias逃逸，referent lifetime…",
    failure:
      "若解释「为什么Pass by Reference首先是正确性与Li…」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「为什么Pass by Reference首先是正确性与Li…」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "Recap: What do you know about…",
    mechanism:
      "C 早期的 ref / out parameters就允许callee访问caller variable storage。",
    failure:
      "若解释「Recap: What do you know about…」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「Recap: What do you know about…」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "Ref locals and ref returns",
    mechanism:
      "Ref local保存alias，ref return把callee选中的storage alias交给caller。Return expression必须有足够escape scope，例如array element或对象field可能安全，普通stack local不安全。Caller可选择按v…",
    failure:
      "若解释「Ref locals and ref returns」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「Ref locals and ref returns」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
];

export function PassByReferenceEfficiencyDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 13. Improving efficiency with more pass by reference：机制与证据"
      prompt="切换《Chapter 13. Improving efficiency with more pass by reference》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 13. Improving efficiency with more pass by reference》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function PassByReferenceEfficiencyMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 13. Improving efficiency with more pass by reference：机制路径"
      stages={STAGES}
    />
  );
}

export function PassByReferenceEfficiencyFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 13. Improving efficiency with more pass by reference：失效与核验"
      stages={STAGES}
    />
  );
}
