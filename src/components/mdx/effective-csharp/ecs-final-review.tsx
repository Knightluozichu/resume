"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "类型与替换",
    mechanism: "审计强类型边界、泛型约束和基类替换行为。",
    failure: "API 表面可编译，但字符串协议和成员隐藏绕过真实契约。",
    evidence: "编译矩阵、contract tests 与 API diff。",
  },
  {
    label: "生命周期与执行",
    mechanism: "追踪 owner、Dispose、延迟枚举和 provider 边界。",
    failure: "查询在资源释放后执行，或回调意外保留昂贵对象。",
    evidence: "heap path、枚举次数与连接日志。",
  },
  {
    label: "失败与发布",
    mechanism: "注入异常后验证状态、清理、可观测性和回滚策略。",
    failure: "只测成功路径，发布后才发现部分更新和证据缺口。",
    evidence: "故障测试、状态快照与发布门禁记录。",
  },
];

export function EffectiveCSharpFinalReviewLab() {
  return (
    <ChapterDecisionLab
      title="用一个真实系统验收五十条建议"
      prompt="选择审计面，检查建议是否在代码、运行时和失败路径留下可重复证据。"
      stages={STAGES}
      conclusion="总复习的终点不是记住五十个标题，而是能对一个变更说明它改变了哪条契约、风险在哪里、证据是否足够。"
    />
  );
}

export function EffectiveCSharpFinalReviewMechanismMap() {
  return (
    <ChapterMechanismMap title="用一个真实系统验收五十条建议" stages={STAGES} />
  );
}

export function EffectiveCSharpFinalReviewFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="用一个真实系统验收五十条建议"
      stages={STAGES}
    />
  );
}
