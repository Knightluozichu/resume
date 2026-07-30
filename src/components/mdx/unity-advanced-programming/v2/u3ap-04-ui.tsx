"use client";

import {
  UnityAdvancedEvidenceLab,
  type UnityAdvancedEvidenceModel,
} from "@/components/mdx/unity-advanced-programming/v2/unity-advanced-evidence-lab";

const model = {
  unitId: "u3ap-unit-04",
  title: "第4章 UI",
  question:
    "NGUI和早期uGUI的历史问题怎样迁移到Unity 6.3的uGUI、UI Toolkit与可测生命周期？",
  concepts: [
    "第4章 UI",
    "NGUI 和 UGUI 比较",
    "UGUI 原理及组件使用",
    "UGUI 输入与事件模块",
    "UGUI 核心源码",
    "UI 框架架构",
    "UI 优化一",
    "UI 优化二",
    "UI 优化三",
  ],
  invariant:
    "输入只路由一次，页面状态可恢复，关闭后无回调和资源残留，目标Player预算满足",
  fault: "重复订阅事件、把所有元素放在同一重建边界或用Editor帧率签发优化",
  artifact: "UI系统选择记录、事件路径、页面状态机、重建捕获、订阅与释放清单",
  experiment: "ui",
  stages: [
    {
      label: "选择UI系统",
      input: "功能与团队约束",
      action: "按官方矩阵比较",
      signal: "选择记录",
      check: "适用边界完整",
    },
    {
      label: "重放输入",
      input: "固定点击与导航",
      action: "记录事件路由",
      signal: "回调序列",
      check: "每次输入一次提交",
    },
    {
      label: "捕获重建",
      input: "固定元素树",
      action: "改变一项脏状态",
      signal: "CPU/GPU/批次捕获",
      check: "首个成本可定位",
    },
    {
      label: "关闭页面",
      input: "已打开页面",
      action: "注销并释放",
      signal: "订阅和资源计数",
      check: "回到基线",
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

export function U3ap04UiVersionContractLab() {
  return <UnityAdvancedEvidenceLab model={model} view="version-contract" />;
}

export function U3ap04UiBudgetWorkbenchLab() {
  return <UnityAdvancedEvidenceLab model={model} view="budget-workbench" />;
}

export function U3ap04UiCaptureGateLab() {
  return <UnityAdvancedEvidenceLab model={model} view="capture-gate" />;
}
