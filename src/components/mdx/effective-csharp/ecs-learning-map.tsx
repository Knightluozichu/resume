"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "类型契约",
    mechanism: "语言习惯和泛型共同限定调用方能表达什么。",
    failure: "字符串协议或过宽约束让错误推迟到运行时。",
    evidence: "编译错误、API 签名与替换测试。",
  },
  {
    label: "生命周期契约",
    mechanism: "资源章节确定对象从创建到释放的唯一责任人。",
    failure: "GC 被误当成外部资源释放协议。",
    evidence: "Dispose 路径、owner graph 与泄漏剖析。",
  },
  {
    label: "执行与失败契约",
    mechanism: "LINQ 决定何时执行，异常章节决定失败后保留什么状态。",
    failure: "延迟执行跨出资源边界，异常留下部分更新。",
    evidence: "枚举次数、查询日志与失败后的状态断言。",
  },
];

export function EffectiveCSharpLearningMapLab() {
  return (
    <ChapterDecisionLab
      title="五章五十条建议如何汇成四条契约链"
      prompt="不要逐条背 Item；选择一条契约链，检查建议如何跨章节约束同一个系统。"
      stages={STAGES}
      conclusion="有效的学习地图不是目录复述，而是能把一个代码决策沿类型、生命周期、执行与失败边界追到底。"
    />
  );
}

export function EffectiveCSharpLearningMapMechanismMap() {
  return (
    <ChapterMechanismMap
      title="五章五十条建议如何汇成四条契约链"
      stages={STAGES}
    />
  );
}

export function EffectiveCSharpLearningMapFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="五章五十条建议如何汇成四条契约链"
      stages={STAGES}
    />
  );
}
