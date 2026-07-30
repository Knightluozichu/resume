"use client";

import {
  UnityAdvancedEvidenceLab,
  type UnityAdvancedEvidenceModel,
} from "@/components/mdx/unity-advanced-programming/v2/unity-advanced-evidence-lab";

const model = {
  unitId: "u3ap-unit-01",
  title: "第1章 C# 要点技术",
  question:
    "集合、浮点、委托事件、装箱与算法成本怎样从运行时状态而不是源码印象得到证据？",
  concepts: [
    "第1章 C# 要点技术",
    "List 底层源码剖析",
    "Dictionary 底层源码剖析",
    "浮点数的精度问题",
    "委托、事件、装箱、拆箱",
    "排序算法",
    "搜索算法",
  ],
  invariant:
    "结果语义不变，容量、比较、调用列表与分配都能由固定输入和运行时身份复算",
  fault:
    "把Capacity当Count、改变键的相等语义、用精确相等比较浮点或在热路径隐式装箱",
  artifact:
    "集合容量轨迹、键比较器、浮点误差样本、订阅表、分配捕获与算法操作计数",
  experiment: "language",
  stages: [
    {
      label: "冻结运行时",
      input: "Unity与脚本后端",
      action: "记录版本和构建",
      signal: "运行时身份",
      check: "身份完整",
    },
    {
      label: "建立语义基线",
      input: "固定集合和数值",
      action: "执行参考实现",
      signal: "输出与操作轨迹",
      check: "结果正确",
    },
    {
      label: "采集成本",
      input: "同一输入规模",
      action: "记录容量、分配和比较",
      signal: "Profiler与计数",
      check: "成本可复算",
    },
    {
      label: "注入边界",
      input: "容量阈值与舍入值",
      action: "只改变一个前提",
      signal: "首个错误状态",
      check: "故障被拒绝",
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

export function U3ap01CsharpKeyTechniquesVersionContractLab() {
  return <UnityAdvancedEvidenceLab model={model} view="version-contract" />;
}

export function U3ap01CsharpKeyTechniquesBudgetWorkbenchLab() {
  return <UnityAdvancedEvidenceLab model={model} view="budget-workbench" />;
}

export function U3ap01CsharpKeyTechniquesCaptureGateLab() {
  return <UnityAdvancedEvidenceLab model={model} view="capture-gate" />;
}
