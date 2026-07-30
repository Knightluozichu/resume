"use client";

import {
  UnityAdvancedEvidenceLab,
  type UnityAdvancedEvidenceModel,
} from "@/components/mdx/unity-advanced-programming/v2/unity-advanced-evidence-lab";

const model = {
  unitId: "finalReview",
  title: "《Unity3D高级编程之进阶主程》57坐标全书证据总复习",
  question:
    "整套主程链怎样证明配置、UI、资源、网络、渲染、AI与寻路在同一版本身份下可恢复？",
  concepts: [
    "第1章 C# 要点技术",
    "List 底层源码剖析",
    "Dictionary 底层源码剖析",
    "浮点数的精度问题",
    "委托、事件、装箱、拆箱",
    "排序算法",
    "搜索算法",
    "第2章 架构",
    "架构的意义",
    "软件系统架构思维方式",
    "架构的误区、如何做前端架构以及如何架构Unity3D项目",
    "第3章 数据表",
    "数据表的种类",
    "数据表的制作方式",
    "多语言的实现",
    "第4章 UI",
    "NGUI 和 UGUI 比较",
    "UGUI 原理及组件使用",
    "UGUI 输入与事件模块",
    "UGUI 核心源码",
    "UI 框架架构",
    "UI 优化一",
    "UI 优化二",
    "UI 优化三",
    "第5章 资源、3D 模型与动画",
    "资源的加载与释放",
    "美术资源的规范",
    "合并 3D 模型",
    "3D 模型的变与换一",
    "3D 模型的变与换二",
    "3D 模型的变与换三",
    "3D 模型的变与换四",
    "第6章 网络层",
    "TCP 还是 UDP",
    "实现 TCP",
    "实现 UDP",
    "封装 HTTP",
    "数据协议原理",
    "网络同步解决方案",
    "第7章 渲染管线与图形学",
    "图形学基础",
    "渲染管线一",
    "渲染管线二",
    "渲染原理与知识一",
    "渲染原理与知识二",
    "渲染原理与知识三",
    "多重采样与着色器编译原理",
    "Projector 投影原理",
    "第8章 AI",
    "状态机构架机器人行为",
    "行为树构建 AI",
    "非典型性 AI",
    "第10章 地图与寻路",
    "A* 算法及优化",
    "寻路网格的构建",
    "地图编辑器",
    "地图的制作与优化",
  ],
  invariant:
    "每次只注入一个故障，跨章相关ID一致，撤销后同一场景恢复状态、资源与设备预算",
  fault: "跨章同时改变资源、网络和渲染配置，使首个分岔无法归因",
  artifact: "全链运行清单、跨章ID、逐故障捕获、资源网络状态摘要与发布回归报告",
  experiment: "cross",
  stages: [
    {
      label: "冻结构建",
      input: "Unity包平台配置",
      action: "生成身份摘要",
      signal: "构建清单",
      check: "全链同版本",
    },
    {
      label: "运行基线",
      input: "确定性场景输入",
      action: "执行完整玩法链",
      signal: "跨章轨迹",
      check: "状态与预算稳定",
    },
    {
      label: "逐章注错",
      input: "九类故障计划",
      action: "每次只启用一个",
      signal: "首个分岔",
      check: "归因唯一",
    },
    {
      label: "清理并回归",
      input: "基线输入",
      action: "释放重连重建",
      signal: "回归摘要",
      check: "恢复且无残留",
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

export function U3apOfficialFinalReviewVersionContractLab() {
  return <UnityAdvancedEvidenceLab model={model} view="version-contract" />;
}

export function U3apOfficialFinalReviewBudgetWorkbenchLab() {
  return <UnityAdvancedEvidenceLab model={model} view="budget-workbench" />;
}

export function U3apOfficialFinalReviewCaptureGateLab() {
  return <UnityAdvancedEvidenceLab model={model} view="capture-gate" />;
}
