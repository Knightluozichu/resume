"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "./application-pattern-lab";

const model = {
  title: "生产化收官：简单、透明与 ACI 上线检查清单",
  focus:
    "用简单性、透明轨迹、ACI、安全、评测、回滚和人工接管门禁决定 Agent 能否上线",
  invariant: "没有可重复评测、最小权限、停止恢复和回滚证据的系统不得进入生产",
  fault: "演示样本成功后直接开放生产写权限，没有回归集、监控、停机或回滚路径",
  evidence:
    "版本、评测集、通过阈值、权限矩阵、轨迹日志、告警、停机演练、回滚与审批记录",
  stages: ["简单性审查", "离线评测", "沙箱试运行", "灰度监控", "回滚演练"],
  signals: ["评测", "权限", "监控", "回滚"],
} satisfies AgentApplicationModel;

export function ProductionReadinessChecklistModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function ProductionReadinessChecklistTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function ProductionReadinessChecklistEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
