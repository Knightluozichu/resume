"use client";

import {
  UnityAdvancedEvidenceLab,
  type UnityAdvancedEvidenceModel,
} from "@/components/mdx/unity-advanced-programming/v2/unity-advanced-evidence-lab";

const model = {
  unitId: "u3ap-unit-05",
  title: "第5章 资源、3D 模型与动画",
  question:
    "资源、模型、动画与空间变换怎样用句柄、导入身份、矩阵和目标Player内存形成闭环？",
  concepts: [
    "第5章 资源、3D 模型与动画",
    "资源的加载与释放",
    "美术资源的规范",
    "合并 3D 模型",
    "3D 模型的变与换一",
    "3D 模型的变与换二",
    "3D 模型的变与换三",
    "3D 模型的变与换四",
  ],
  invariant:
    "加载与释放配对，资产身份稳定，矩阵结果可复算，卸载后引用与内存回到允许区间",
  fault: "丢失加载句柄、重复驻留依赖、改变骨骼根或混用局部与世界变换",
  artifact: "资源依赖图、句柄账本、导入设置、骨骼与矩阵快照、Player内存捕获",
  experiment: "assets",
  stages: [
    {
      label: "冻结资产身份",
      input: "GUID与导入设置",
      action: "记录依赖和平台覆盖",
      signal: "资产清单",
      check: "输入可重建",
    },
    {
      label: "加载资源",
      input: "Addressables键",
      action: "保存操作句柄",
      signal: "引用和依赖计数",
      check: "加载成功可追踪",
    },
    {
      label: "验证模型",
      input: "骨骼与变换样本",
      action: "计算局部到世界",
      signal: "矩阵和边界盒",
      check: "数值在容差内",
    },
    {
      label: "反向释放",
      input: "句柄和实例",
      action: "销毁实例并Release",
      signal: "内存与引用捕获",
      check: "无未知驻留",
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

export function U3ap05ModelsAnimationVersionContractLab() {
  return <UnityAdvancedEvidenceLab model={model} view="version-contract" />;
}

export function U3ap05ModelsAnimationBudgetWorkbenchLab() {
  return <UnityAdvancedEvidenceLab model={model} view="budget-workbench" />;
}

export function U3ap05ModelsAnimationCaptureGateLab() {
  return <UnityAdvancedEvidenceLab model={model} view="capture-gate" />;
}
