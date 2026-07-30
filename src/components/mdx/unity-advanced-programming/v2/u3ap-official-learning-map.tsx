"use client";

import {
  UnityAdvancedEvidenceLab,
  type UnityAdvancedEvidenceModel,
} from "@/components/mdx/unity-advanced-programming/v2/unity-advanced-evidence-lab";

const model = {
  unitId: "learningMap",
  title: "《Unity3D高级编程之进阶主程》57坐标证据学习地图",
  question:
    "怎样在不复制原文的前提下，用57个正式坐标、双时间轨和目标Player证据重建整套主程能力？",
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
    "57个坐标恰好覆盖一次，历史和当前陈述分轨，所有性能结论绑定目标Player与设备",
  fault:
    "把重复链接算成新主题、补造第9章、把旧API当当前推荐或用Editor结果签发性能",
  artifact: "57坐标矩阵、索引异常表、版本包清单、章节实验路由与全书证据门",
  experiment: "cross",
  stages: [
    {
      label: "核对索引",
      input: "保存页面与链接",
      action: "去重并标异常",
      signal: "48主题清单",
      check: "不补造第9章",
    },
    {
      label: "建立双轨",
      input: "历史标题和当前需求",
      action: "分开来源身份",
      signal: "迁移差分",
      check: "不时代错置",
    },
    {
      label: "路由证据",
      input: "九章责任",
      action: "分配实验与捕获",
      signal: "证据矩阵",
      check: "57坐标全命中",
    },
    {
      label: "执行总门",
      input: "各章工件",
      action: "核对版本故障恢复",
      signal: "全书报告",
      check: "未知项显式",
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

export function U3apOfficialLearningMapVersionContractLab() {
  return <UnityAdvancedEvidenceLab model={model} view="version-contract" />;
}

export function U3apOfficialLearningMapBudgetWorkbenchLab() {
  return <UnityAdvancedEvidenceLab model={model} view="budget-workbench" />;
}

export function U3apOfficialLearningMapCaptureGateLab() {
  return <UnityAdvancedEvidenceLab model={model} view="capture-gate" />;
}
