"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "./application-pattern-lab";

const model = {
  title: "工具提示工程：让 agent 会用工具而不是猜工具",
  focus: "把工具定义当作可评测提示，迭代名称、描述、参数、返回与错误恢复",
  invariant: "工具改动必须在代表轨迹上同时验证选对、填对、读懂和恢复四个环节",
  fault: "只看工具函数单元测试通过，却从不测模型是否会选择和正确填写它",
  evidence:
    "工具定义版本、任务集、选择率、参数通过率、结果理解率、恢复率与失败轨迹",
  stages: ["收集轨迹", "定位误用", "改写接口", "批量评测", "发布或回退"],
  signals: ["选择率", "参数通过", "结果理解", "恢复率"],
} satisfies AgentApplicationModel;

export function ToolPromptEngineeringModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function ToolPromptEngineeringTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function ToolPromptEngineeringEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
