"use client";

import {
  UnityAdvancedEvidenceLab,
  type UnityAdvancedEvidenceModel,
} from "@/components/mdx/unity-advanced-programming/v2/unity-advanced-evidence-lab";

const model = {
  unitId: "u3ap-unit-09",
  title: "第10章 地图与寻路",
  question:
    "A*、NavMesh、地图编辑器与制作优化怎样把算法、生成数据、动态障碍和运行预算分开验收？",
  concepts: [
    "第10章 地图与寻路",
    "A* 算法及优化",
    "寻路网格的构建",
    "地图编辑器",
    "地图的制作与优化",
  ],
  invariant:
    "路径只经过可通行区域，起终点与地图版本一致，不可达显式返回，重规划有确定条件",
  fault: "启发式高估、地图版本不一致、路径提交后障碍变化或不可达结果被当空路径",
  artifact:
    "地图schema、A*开闭集轨迹、NavMesh构建记录、编辑器校验、设备预算捕获",
  experiment: "navigation",
  stages: [
    {
      label: "冻结地图版本",
      input: "格点多边形与障碍",
      action: "生成摘要",
      signal: "地图身份",
      check: "客户端一致",
    },
    {
      label: "执行A*",
      input: "起点终点与启发式",
      action: "记录开闭集",
      signal: "扩展轨迹",
      check: "路径成本可复算",
    },
    {
      label: "构建NavMesh",
      input: "目标Agent参数",
      action: "编辑器或运行时构建",
      signal: "构建报告",
      check: "区域和链接正确",
    },
    {
      label: "注入动态障碍",
      input: "已提交路径",
      action: "改变一个阻挡",
      signal: "重规划事件",
      check: "不可达显式",
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

export function U3ap10MapPathfindingVersionContractLab() {
  return <UnityAdvancedEvidenceLab model={model} view="version-contract" />;
}

export function U3ap10MapPathfindingBudgetWorkbenchLab() {
  return <UnityAdvancedEvidenceLab model={model} view="budget-workbench" />;
}

export function U3ap10MapPathfindingCaptureGateLab() {
  return <UnityAdvancedEvidenceLab model={model} view="capture-gate" />;
}
