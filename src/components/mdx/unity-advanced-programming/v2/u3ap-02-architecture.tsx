"use client";

import {
  UnityAdvancedEvidenceLab,
  type UnityAdvancedEvidenceModel,
} from "@/components/mdx/unity-advanced-programming/v2/unity-advanced-evidence-lab";

const model = {
  unitId: "u3ap-unit-02",
  title: "第2章 架构",
  question:
    "Unity项目架构怎样把依赖方向、生命周期、异步资源和团队所有权变成可检查合同？",
  concepts: [
    "第2章 架构",
    "架构的意义",
    "软件系统架构思维方式",
    "架构的误区、如何做前端架构以及如何架构Unity3D项目",
  ],
  invariant:
    "高层策略不依赖具体场景与传输实现，创建、取消、释放和销毁由同一边界负责",
  fault: "让领域模块直接持有场景对象、静态单例或未取消的异步句柄",
  artifact: "模块所有权表、依赖图、生命周期时序、端口适配器与替换回归记录",
  experiment: "architecture",
  stages: [
    {
      label: "枚举责任",
      input: "运行用例",
      action: "标注状态与所有者",
      signal: "责任表",
      check: "无孤儿状态",
    },
    {
      label: "抽取依赖",
      input: "代码和场景引用",
      action: "画有向边",
      signal: "依赖图",
      check: "方向可解释",
    },
    {
      label: "冻结生命周期",
      input: "加载至销毁",
      action: "标记创建取消释放",
      signal: "时序图",
      check: "所有权闭合",
    },
    {
      label: "替换适配器",
      input: "测试实现",
      action: "只换基础设施",
      signal: "回归差分",
      check: "高层策略不变",
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

export function U3ap02ArchitectureVersionContractLab() {
  return <UnityAdvancedEvidenceLab model={model} view="version-contract" />;
}

export function U3ap02ArchitectureBudgetWorkbenchLab() {
  return <UnityAdvancedEvidenceLab model={model} view="budget-workbench" />;
}

export function U3ap02ArchitectureCaptureGateLab() {
  return <UnityAdvancedEvidenceLab model={model} view="capture-gate" />;
}
