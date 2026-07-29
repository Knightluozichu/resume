"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "./application-pattern-lab";

const model = {
  title: "设计好用的工具",
  focus: "把工具设计成模型容易选、难以误用、结果紧凑且错误可恢复的操作界面",
  invariant:
    "工具名称、边界、参数和返回语义共同指向一个清晰动作，危险操作默认不可达",
  fault: "提供多个功能重叠的万能工具，参数含糊，错误只返回 internal error",
  evidence:
    "工具选择混淆矩阵、参数错误率、恢复率、token 成本、权限拒绝与任务成功率",
  stages: ["任务轨迹", "边界切分", "参数防错", "结果压缩", "评测迭代"],
  signals: ["误选率", "参数错误", "恢复率", "任务成功"],
} satisfies AgentApplicationModel;

export function ToolDesignModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function ToolDesignTraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function ToolDesignEvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
