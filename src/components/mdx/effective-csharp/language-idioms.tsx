"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "表示方式",
    mechanism: "先判断值应保持强类型，还是只在最终边界转成文本。",
    failure: "过早字符串化丢失单位、文化和取值约束。",
    evidence: "类型签名、往返测试与文化矩阵。",
  },
  {
    label: "调用方式",
    mechanism: "delegate、event 与 pattern 让允许的调用和分支可由编译器检查。",
    failure: "字符串命令和不安全 cast 把协议错误推迟到线上。",
    evidence: "编译期失败案例与事件生命周期测试。",
  },
  {
    label: "运行代价",
    mechanism: "只在剖析证明确有热区时消除 boxing，并审计 new/override 绑定。",
    failure: "凭直觉优化导致 API 退化，成员隐藏破坏替换预期。",
    evidence: "分配剖析、基类引用调用测试与基准。",
  },
];

export function LanguageIdiomsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="语言写法是否把真实契约交给编译器"
      prompt="在可读性、类型安全、文化格式和运行成本之间做选择，并指出可验证证据。"
      stages={STAGES}
      conclusion="语法糖只有在保留静态类型、边界责任和替换语义时才是改进；否则只是把风险藏得更深。"
    />
  );
}

export function LanguageIdiomsDecisionMechanismMap() {
  return (
    <ChapterMechanismMap
      title="语言写法是否把真实契约交给编译器"
      stages={STAGES}
    />
  );
}

export function LanguageIdiomsDecisionFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="语言写法是否把真实契约交给编译器"
      stages={STAGES}
    />
  );
}
