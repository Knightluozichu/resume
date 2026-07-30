"use client";

import {
  LlmApplicationEvidenceLab,
  type LlmApplicationEvidenceModel,
} from "./llm-application-evidence-lab";

const model = {
  unitId: "lae-preface",
  title: "前言",
  question:
    "怎样把一本快速变化领域的入门书变成可复现课程，而不是复制当年的模型名和SDK调用？",
  concepts: ["前言"],
  boundaryCards: [
    {
      name: "学习目标",
      input: "“前言”的学习目标读取已分类任务、数据和用户身份。",
      trust:
        "学习目标只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按声明学习范围与版本处理学习目标，不得把未验证内容提升为系统指令。",
      evidence:
        "学习目标输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "版本快照",
      input: "“前言”的版本快照读取上游已记录的结构化状态。",
      trust:
        "版本快照只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按设计可重放实验记录处理版本快照，不得把未验证内容提升为系统指令。",
      evidence:
        "版本快照输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "实验输入",
      input: "“前言”的实验输入读取上游已记录的结构化状态。",
      trust:
        "实验输入只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按建立风险与迁移日志处理实验输入，不得把未验证内容提升为系统指令。",
      evidence:
        "实验输入输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "输出评估",
      input: "“前言”的输出评估读取上游已记录的结构化状态。",
      trust:
        "输出评估只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按声明学习范围与版本处理输出评估，不得把未验证内容提升为系统指令。",
      evidence:
        "输出评估输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "迁移日志",
      input: "“前言”的迁移日志读取上游已记录的结构化状态。",
      trust:
        "迁移日志只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按设计可重放实验记录处理迁移日志，不得把未验证内容提升为系统指令。",
      evidence:
        "迁移日志输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
  ],
  normalTrace: [
    "为“前言”锁定任务、数据分类、接口时代、模型或规则版本和验收标准",
    "执行声明学习范围与版本，保存请求输入、信任来源与预期结果",
    "推进设计可重放实验记录，记录模型建议、应用决定和工具调用",
    "完成建立风险与迁移日志，交付学习者画像、先备知识、章节地图、版本快照、实验记录模板、费用上限、风险清单和迁移日志。",
  ],
  failureTrace: [
    "复用“前言”相同的任务、样本、接口版本、模型设置和验收标准",
    "只注入应用故障：把一次成功响应当成稳定能力证明，且没有保存版本、输入或验收标准",
    "沿用户输入到交付方向定位最早发生信任、结构、授权或验证偏离的位置",
    "依据“每次练习记录原书坐标、接口时代、依赖版本、输入、预期、实际输出和人工判断”拒绝结果并恢复已知安全状态",
  ],
  invariant:
    "每次练习记录原书坐标、接口时代、依赖版本、输入、预期、实际输出和人工判断",
  fault: "把一次成功响应当成稳定能力证明，且没有保存版本、输入或验收标准",
  artifact:
    "学习者画像、先备知识、章节地图、版本快照、实验记录模板、费用上限、风险清单和迁移日志。",
  gates: [
    {
      label: "输入分类",
      detail: "“前言”区分用户指令、外部数据、系统规则与秘密。",
    },
    {
      label: "模式校验",
      detail: "“前言”的请求、工具参数与结果符合版本化结构。",
    },
    {
      label: "动作授权",
      detail: "“前言”按用户身份、允许工具、业务策略和幂等要求决定执行。",
    },
    {
      label: "输出验证",
      detail: "“前言”以来源、评测或人工确认复核结果，不把流畅度当证据。",
    },
  ],
} satisfies LlmApplicationEvidenceModel;

export function LaePrefaceRequestContractLab() {
  return <LlmApplicationEvidenceLab model={model} view="request-contract" />;
}

export function LaePrefaceExecutionTraceLab() {
  return <LlmApplicationEvidenceLab model={model} view="execution-trace" />;
}

export function LaePrefaceAuthorizationGateLab() {
  return <LlmApplicationEvidenceLab model={model} view="authorization-gate" />;
}
