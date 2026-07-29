"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "./application-pattern-lab";

const model = {
  title: "组合与定制模式：把简单积木拼成合适系统",
  focus:
    "按可测需求组合检索、路由、链式、并行、评价和自治环节，并保留透明回退路径",
  invariant: "每增加一个模式都对应独立失败假设、指标收益和可撤销边界",
  fault:
    "把所有模式堆进 mega-agent，无法定位质量提升来自哪一层，也无法单独回退",
  evidence: "架构版本、逐层消融指标、阶段轨迹、错误归属、成本增量与回退结果",
  stages: ["简单基线", "识别瓶颈", "增加一层", "消融评测", "保留或回退"],
  signals: ["基线", "增量", "归因", "回退"],
} satisfies AgentApplicationModel;

export function CombiningPatternsModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function CombiningPatternsTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function CombiningPatternsEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
