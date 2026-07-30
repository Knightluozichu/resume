"use client";

import {
  AiSystemEvidenceLab,
  type AiSystemEvidenceModel,
} from "./ai-system-evidence-lab";

const model = {
  unitId: "iai-02",
  title: "第2章 规则系统及其变体",
  question:
    "怎样让事实、规则、冲突消解和解释轨迹可追踪，并区分推荐分数与专家结论？",
  concepts: [
    "第2章 规则系统及其变体",
    "01 规则系统",
    "02 知识库",
    "03 专家系统",
    "04 推荐引擎",
  ],
  nodes: [
    {
      name: "事实输入",
      state: "第2章 规则系统及其变体：版本化观测或输入",
      rule: "验证来源、身份和边界，并保持“事实来源、规则版本、触发条件、优先级、结论与解释链明确”",
      transition: "可信输入状态",
      evidence:
        "数据卡、身份与时间；出现“循环规则或冲突优先级未定义，系统在相同事实下给出不同结论”时暂停",
    },
    {
      name: "知识库",
      state: "第2章 规则系统及其变体：上游输入与已有事实",
      rule: "构造“第2章 规则系统及其变体”的知识、表示或系统状态，并保持“事实来源、规则版本、触发条件、优先级、结论与解释链明确”",
      transition: "可查询中间状态",
      evidence:
        "规则、图、模型或参数；出现“循环规则或冲突优先级未定义，系统在相同事实下给出不同结论”时暂停",
    },
    {
      name: "规则匹配",
      state: "第2章 规则系统及其变体：当前状态与候选变换",
      rule: "执行推理、学习、搜索或协调，并保持“事实来源、规则版本、触发条件、优先级、结论与解释链明确”",
      transition: "候选结论或动作",
      evidence:
        "轨迹、概率、梯度或消息；出现“循环规则或冲突优先级未定义，系统在相同事实下给出不同结论”时暂停",
    },
    {
      name: "冲突消解",
      state: "第2章 规则系统及其变体：已验证结论/动作",
      rule: "按权限和容量提交服务或执行，并保持“事实来源、规则版本、触发条件、优先级、结论与解释链明确”",
      transition: "可追踪外部结果",
      evidence:
        "输出、授权与副作用；出现“循环规则或冲突优先级未定义，系统在相同事实下给出不同结论”时暂停",
    },
    {
      name: "结论与解释",
      state: "第2章 规则系统及其变体：结果、日志和反馈",
      rule: "监测偏离并恢复已知状态，并保持“事实来源、规则版本、触发条件、优先级、结论与解释链明确”",
      transition: "验收或拒绝",
      evidence:
        "指标、反例、检查点和回滚；出现“循环规则或冲突优先级未定义，系统在相同事实下给出不同结论”时暂停",
    },
  ],
  cases: [
    {
      name: "正常案例",
      observation:
        "用一组诊断事实运行前向规则，再把推荐评分作为独立模块接入并保留理由。 使用冻结版本、输入、初态和种子。",
      expectedAction:
        "沿“事实输入 → 知识库 → 规则匹配 → 冲突消解 → 结论与解释”完成可解释动作。",
      boundary:
        "必须满足“事实来源、规则版本、触发条件、优先级、结论与解释链明确”。",
    },
    {
      name: "边界反例",
      observation:
        "用一组诊断事实运行前向规则，再把推荐评分作为独立模块接入并保留理由。 其余不变，只注入“循环规则或冲突优先级未定义，系统在相同事实下给出不同结论”。",
      expectedAction: "定位第一处状态或信任偏离并拒绝下游动作。",
      boundary: "失败运行必须保留，撤销故障后用同一输入重放。",
    },
  ],
  normalTrace: [
    "为“第2章 规则系统及其变体”冻结系统版本、输入、身份、初态、权限、容量与随机种子",
    "执行事实输入、知识库，保存观测、知识或模型状态",
    "推进规则匹配、冲突消解，记录推理、学习、通信和动作",
    "在结论与解释交付事实、出处、规则ID与版本、工作记忆、议程、优先级、触发轨迹、结论、推荐分数和反例。",
  ],
  failureTrace: [
    "“第2章 规则系统及其变体”复用相同系统、输入、身份、初态、权限、容量和种子",
    "只注入单一故障：循环规则或冲突优先级未定义，系统在相同事实下给出不同结论",
    "沿“事实输入 → 知识库 → 规则匹配 → 冲突消解 → 结论与解释”定位第一处状态、证据或信任偏离",
    "撤销故障并重放；仅当“事实来源、规则版本、触发条件、优先级、结论与解释链明确”恢复才接受修正",
  ],
  invariant: "事实来源、规则版本、触发条件、优先级、结论与解释链明确",
  fault: "循环规则或冲突优先级未定义，系统在相同事实下给出不同结论",
  artifact:
    "事实、出处、规则ID与版本、工作记忆、议程、优先级、触发轨迹、结论、推荐分数和反例。",
  gates: [
    {
      label: "输入与身份",
      detail: "“第2章 规则系统及其变体”的来源、实体、单位、时间和边界可追溯。",
    },
    {
      label: "状态与模型",
      detail:
        "“第2章 规则系统及其变体”的知识、规则、参数、版本和中间状态可复核。",
    },
    {
      label: "权限与副作用",
      detail:
        "“第2章 规则系统及其变体”的通信、动作、资源和外部副作用有权限与容量界限。",
    },
    {
      label: "复现与时间",
      detail:
        "“第2章 规则系统及其变体”归档环境、种子、失败、恢复和2016/当前标签。",
    },
  ],
} as const satisfies AiSystemEvidenceModel;

export function Iai02RuleSystemsVariantsKnowledgeStateLab() {
  return <AiSystemEvidenceLab model={model} view="knowledge-state" />;
}

export function Iai02RuleSystemsVariantsExecutionTraceLab() {
  return <AiSystemEvidenceLab model={model} view="execution-trace" />;
}

export function Iai02RuleSystemsVariantsSystemGateLab() {
  return <AiSystemEvidenceLab model={model} view="system-gate" />;
}
