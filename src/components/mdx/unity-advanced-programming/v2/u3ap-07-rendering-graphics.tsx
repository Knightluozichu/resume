"use client";

import {
  UnityAdvancedEvidenceLab,
  type UnityAdvancedEvidenceModel,
} from "@/components/mdx/unity-advanced-programming/v2/unity-advanced-evidence-lab";

const model = {
  unitId: "u3ap-unit-07",
  title: "第7章 渲染管线与图形学",
  question:
    "图形学、渲染管线、采样、Shader变体与Projector迁移怎样由CPU/GPU捕获共同裁决？",
  concepts: [
    "第7章 渲染管线与图形学",
    "图形学基础",
    "渲染管线一",
    "渲染管线二",
    "渲染原理与知识一",
    "渲染原理与知识二",
    "渲染原理与知识三",
    "多重采样与着色器编译原理",
    "Projector 投影原理",
  ],
  invariant:
    "画面基准一致，管线和Shader兼容，CPU与GPU瓶颈可定位，目标设备帧预算满足",
  fault: "只看Draw Call、用Editor帧率、混用管线Shader或让变体与采样无界增长",
  artifact:
    "管线资产、画质基准、CPU/GPU捕获、批次与变体清单、Projector迁移差分",
  experiment: "rendering",
  stages: [
    {
      label: "冻结渲染身份",
      input: "管线和质量资产",
      action: "记录API与Shader变体",
      signal: "配置摘要",
      check: "可重建",
    },
    {
      label: "建立画面基准",
      input: "固定相机和场景",
      action: "保存参考帧",
      signal: "图像与容差",
      check: "画质一致",
    },
    {
      label: "捕获CPU/GPU",
      input: "目标Player",
      action: "记录主线程渲染线程GPU",
      signal: "帧捕获",
      check: "瓶颈明确",
    },
    {
      label: "改变单变量",
      input: "批次像素采样或变体",
      action: "只改一项并重放",
      signal: "差分捕获",
      check: "预算与画质均通过",
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

export function U3ap07RenderingGraphicsVersionContractLab() {
  return <UnityAdvancedEvidenceLab model={model} view="version-contract" />;
}

export function U3ap07RenderingGraphicsBudgetWorkbenchLab() {
  return <UnityAdvancedEvidenceLab model={model} view="budget-workbench" />;
}

export function U3ap07RenderingGraphicsCaptureGateLab() {
  return <UnityAdvancedEvidenceLab model={model} view="capture-gate" />;
}
