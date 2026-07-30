"use client";

import {
  LlmApplicationEvidenceLab,
  type LlmApplicationEvidenceModel,
} from "./llm-application-evidence-lab";

const model = {
  unitId: "learningMap",
  title: "《大模型应用开发极简入门》88条目学习地图",
  question:
    "怎样保留2023年前后原书的学习次序，又让学习者识别当前接口、工具和治理要求的迁移边界？",
  concepts: [
    "前言",
    "第1章 初识GPT-4和ChatGPT",
    "第2章 深入了解GPT-4和ChatGPT的API",
    "第3章 使用GPT-4和ChatGPT构建应用程序",
    "第4章 GPT-4和ChatGPT的高级技巧",
    "第5章 使用LangChain框架和插件增强LLM的功能",
    "术语表",
  ],
  boundaryCards: [
    {
      name: "用户任务",
      input:
        "“《大模型应用开发极简入门》88条目学习地图”的用户任务读取已分类任务、数据和用户身份。",
      trust:
        "用户任务只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按锁定原书目录与时代处理用户任务，不得把未验证内容提升为系统指令。",
      evidence:
        "用户任务输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "应用编排",
      input:
        "“《大模型应用开发极简入门》88条目学习地图”的应用编排读取上游已记录的结构化状态。",
      trust:
        "应用编排只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按建立请求和证据主链处理应用编排，不得把未验证内容提升为系统指令。",
      evidence:
        "应用编排输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "模型请求",
      input:
        "“《大模型应用开发极简入门》88条目学习地图”的模型请求读取上游已记录的结构化状态。",
      trust:
        "模型请求只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按标注现代迁移与治理处理模型请求，不得把未验证内容提升为系统指令。",
      evidence:
        "模型请求输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "工具执行",
      input:
        "“《大模型应用开发极简入门》88条目学习地图”的工具执行读取上游已记录的结构化状态。",
      trust:
        "工具执行只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按锁定原书目录与时代处理工具执行，不得把未验证内容提升为系统指令。",
      evidence:
        "工具执行输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
    {
      name: "验证与交付",
      input:
        "“《大模型应用开发极简入门》88条目学习地图”的验证与交付读取上游已记录的结构化状态。",
      trust:
        "验证与交付只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。",
      action:
        "按建立请求和证据主链处理验证与交付，不得把未验证内容提升为系统指令。",
      evidence:
        "验证与交付输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。",
    },
  ],
  normalTrace: [
    "为“《大模型应用开发极简入门》88条目学习地图”锁定任务、数据分类、接口时代、模型或规则版本和验收标准",
    "执行锁定原书目录与时代，保存请求输入、信任来源与预期结果",
    "推进建立请求和证据主链，记录模型建议、应用决定和工具调用",
    "完成标注现代迁移与治理，交付88条目映射、历史接口标签、现代迁移表、请求合同、工具授权、输出验证、风险记录和回退方案。",
  ],
  failureTrace: [
    "复用“《大模型应用开发极简入门》88条目学习地图”相同的任务、样本、接口版本、模型设置和验收标准",
    "只注入应用故障：用现行产品名称覆盖原书接口，导致历史代码、现代建议和应用责任无法区分",
    "沿用户输入到交付方向定位最早发生信任、结构、授权或验证偏离的位置",
    "依据“每个原书条目有唯一归属，历史复现与现代迁移使用不同证据，模型输出永远不直接等于应用事实或授权”拒绝结果并恢复已知安全状态",
  ],
  invariant:
    "每个原书条目有唯一归属，历史复现与现代迁移使用不同证据，模型输出永远不直接等于应用事实或授权",
  fault: "用现行产品名称覆盖原书接口，导致历史代码、现代建议和应用责任无法区分",
  artifact:
    "88条目映射、历史接口标签、现代迁移表、请求合同、工具授权、输出验证、风险记录和回退方案。",
  gates: [
    {
      label: "输入分类",
      detail:
        "“《大模型应用开发极简入门》88条目学习地图”区分用户指令、外部数据、系统规则与秘密。",
    },
    {
      label: "模式校验",
      detail:
        "“《大模型应用开发极简入门》88条目学习地图”的请求、工具参数与结果符合版本化结构。",
    },
    {
      label: "动作授权",
      detail:
        "“《大模型应用开发极简入门》88条目学习地图”按用户身份、允许工具、业务策略和幂等要求决定执行。",
    },
    {
      label: "输出验证",
      detail:
        "“《大模型应用开发极简入门》88条目学习地图”以来源、评测或人工确认复核结果，不把流畅度当证据。",
    },
  ],
} satisfies LlmApplicationEvidenceModel;

export function LaeOfficialLearningMapRequestContractLab() {
  return <LlmApplicationEvidenceLab model={model} view="request-contract" />;
}

export function LaeOfficialLearningMapExecutionTraceLab() {
  return <LlmApplicationEvidenceLab model={model} view="execution-trace" />;
}

export function LaeOfficialLearningMapAuthorizationGateLab() {
  return <LlmApplicationEvidenceLab model={model} view="authorization-gate" />;
}
