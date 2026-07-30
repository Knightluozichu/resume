"use client";

import {
  UnityAdvancedEvidenceLab,
  type UnityAdvancedEvidenceModel,
} from "@/components/mdx/unity-advanced-programming/v2/unity-advanced-evidence-lab";

const model = {
  unitId: "u3ap-unit-03",
  title: "第3章 数据表",
  question:
    "数据表与多语言怎样从编辑输入经过schema、生成、校验和版本迁移成为运行时合同？",
  concepts: [
    "第3章 数据表",
    "数据表的种类",
    "数据表的制作方式",
    "多语言的实现",
  ],
  invariant: "相同输入产生相同产物，主键唯一、引用可达、schema兼容且回退链显式",
  fault: "允许重复主键、字段漂移、占位符不一致或缺失语言静默覆盖",
  artifact: "schema、生成摘要、主外键报告、本地化覆盖矩阵、迁移与回退记录",
  experiment: "data",
  stages: [
    {
      label: "冻结schema",
      input: "字段与类型",
      action: "生成版本化定义",
      signal: "schema摘要",
      check: "版本唯一",
    },
    {
      label: "规范化输入",
      input: "策划表与语言表",
      action: "排序并标准化",
      signal: "输入摘要",
      check: "同输入同摘要",
    },
    {
      label: "执行校验",
      input: "主外键与占位符",
      action: "遍历全部记录",
      signal: "错误清单",
      check: "错误阻断构建",
    },
    {
      label: "加载Player",
      input: "确定性产物",
      action: "解析并查询",
      signal: "运行时引用",
      check: "结果与构建报告一致",
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

export function U3ap03DataTablesVersionContractLab() {
  return <UnityAdvancedEvidenceLab model={model} view="version-contract" />;
}

export function U3ap03DataTablesBudgetWorkbenchLab() {
  return <UnityAdvancedEvidenceLab model={model} view="budget-workbench" />;
}

export function U3ap03DataTablesCaptureGateLab() {
  return <UnityAdvancedEvidenceLab model={model} view="capture-gate" />;
}
