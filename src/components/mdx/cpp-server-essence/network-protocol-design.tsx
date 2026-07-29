"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "编码 frame",
    mechanism: "固定头明确 magic、version、type、length 和必要校验。",
    failure: "依赖分隔符却没有转义，或 length 未定义字节序。",
    evidence: "golden bytes、跨语言编码测试与 schema。",
  },
  {
    label: "增量解码",
    mechanism: "decoder 先等完整头，再按受限长度等待 body，可保留半包。",
    failure: "一次 recv 被当成完整消息，恶意长度导致无限分配。",
    evidence: "随机分片测试、长度上限与模糊测试。",
  },
  {
    label: "版本演进",
    mechanism: "未知可选字段可跳过，破坏性变更通过显式版本协商。",
    failure: "复用旧字段改变语义，新旧节点静默误解。",
    evidence: "兼容矩阵、回放旧流量与灰度指标。",
  },
];

export function ProtocolFramingLab() {
  return (
    <ChapterDecisionLab
      title="协议 framing、版本与校验边界"
      prompt="沿一条消息从编码到解码，验证长度、版本、错误处理和兼容策略。"
      stages={STAGES}
      conclusion="协议设计的目标不是字段最少，而是在任意分片、异常输入和版本组合下仍能确定边界并安全失败。"
    />
  );
}

export function ProtocolFramingMechanismMap() {
  return (
    <ChapterMechanismMap title="协议 framing、版本与校验边界" stages={STAGES} />
  );
}

export function ProtocolFramingFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="协议 framing、版本与校验边界"
      stages={STAGES}
    />
  );
}
