"use client";

import {
  UnityAdvancedEvidenceLab,
  type UnityAdvancedEvidenceModel,
} from "@/components/mdx/unity-advanced-programming/v2/unity-advanced-evidence-lab";

const model = {
  unitId: "u3ap-unit-08",
  title: "第8章 AI",
  question:
    "FSM、行为树与非典型AI怎样让感知、决策、中断和动作可回放而不生成智能分数？",
  concepts: [
    "第8章 AI",
    "状态机构架机器人行为",
    "行为树构建 AI",
    "非典型性 AI",
  ],
  invariant: "同输入和种子产生同决策轨迹，每次转换有原因，中断释放动作所有权",
  fault: "条件永真、状态无法退出、并行分支争用动作或随机种子未记录",
  artifact: "黑板快照、状态/节点轨迹、动作所有权、随机种子、故障与恢复回放",
  experiment: "ai",
  stages: [
    {
      label: "冻结感知",
      input: "事件序列与种子",
      action: "记录输入时钟",
      signal: "输入日志",
      check: "可重复",
    },
    {
      label: "执行决策",
      input: "旧状态和黑板",
      action: "求值状态或节点",
      signal: "选择轨迹",
      check: "原因完整",
    },
    {
      label: "提交动作",
      input: "动作所有权",
      action: "执行或中断",
      signal: "动作事件",
      check: "无双重所有者",
    },
    {
      label: "回放故障",
      input: "同一输入",
      action: "注入一个错误条件",
      signal: "首个错误分支",
      check: "撤销后恢复",
    },
  ],
  gates: [
    {
      label: "来源与版本身份",
      detail:
        "保存索引只限定结构；当前结论记录Unity、包、脚本后端、渲染管线和API文档版本。",
    },
    {
      label: "目标Player与设备",
      detail:
        "记录构建类型、平台、设备、系统、图形API、质量级别、分辨率和热/电源状态。",
    },
    {
      label: "基线与单变量",
      detail:
        "同一输入先建立稳定基线，每次只改变一个参数或注入一种故障并保存首个分岔。",
    },
    {
      label: "撤销与同输入恢复",
      detail:
        "清理资源、订阅、缓存和网络状态后，用同一输入恢复基线；无法恢复则拒绝发布。",
    },
  ],
} as const satisfies UnityAdvancedEvidenceModel;

export function U3ap08AiVersionContractLab() {
  return <UnityAdvancedEvidenceLab model={model} view="version-contract" />;
}

export function U3ap08AiBudgetWorkbenchLab() {
  return <UnityAdvancedEvidenceLab model={model} view="budget-workbench" />;
}

export function U3ap08AiCaptureGateLab() {
  return <UnityAdvancedEvidenceLab model={model} view="capture-gate" />;
}
