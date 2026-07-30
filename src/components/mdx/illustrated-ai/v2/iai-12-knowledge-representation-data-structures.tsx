"use client";

import {
  AiSystemEvidenceLab,
  type AiSystemEvidenceModel,
} from "./ai-system-evidence-lab";

const model = {
  unitId: "iai-12",
  title: "第12章 知识表示和数据结构",
  question: "怎样让记录、索引、RDF三元组、查询和推理结论共享身份与语义？",
  concepts: [
    "第12章 知识表示和数据结构",
    "01 数据库",
    "02 检索",
    "03 语义网络和语义网",
  ],
  nodes: [
    {
      name: "实体与记录",
      state: "第12章 知识表示和数据结构：版本化观测或输入",
      rule: "验证来源、身份和边界，并保持“实体ID、模式、索引、词汇表、图、查询、版本与推理规则明确”",
      transition: "可信输入状态",
      evidence:
        "数据卡、身份与时间；出现“同名实体被错误合并，查询结果完整但语义指向错误对象”时暂停",
    },
    {
      name: "模式/词汇",
      state: "第12章 知识表示和数据结构：上游输入与已有事实",
      rule: "构造“第12章 知识表示和数据结构”的知识、表示或系统状态，并保持“实体ID、模式、索引、词汇表、图、查询、版本与推理规则明确”",
      transition: "可查询中间状态",
      evidence:
        "规则、图、模型或参数；出现“同名实体被错误合并，查询结果完整但语义指向错误对象”时暂停",
    },
    {
      name: "索引与检索",
      state: "第12章 知识表示和数据结构：当前状态与候选变换",
      rule: "执行推理、学习、搜索或协调，并保持“实体ID、模式、索引、词汇表、图、查询、版本与推理规则明确”",
      transition: "候选结论或动作",
      evidence:
        "轨迹、概率、梯度或消息；出现“同名实体被错误合并，查询结果完整但语义指向错误对象”时暂停",
    },
    {
      name: "RDF图与查询",
      state: "第12章 知识表示和数据结构：已验证结论/动作",
      rule: "按权限和容量提交服务或执行，并保持“实体ID、模式、索引、词汇表、图、查询、版本与推理规则明确”",
      transition: "可追踪外部结果",
      evidence:
        "输出、授权与副作用；出现“同名实体被错误合并，查询结果完整但语义指向错误对象”时暂停",
    },
    {
      name: "推理与出处",
      state: "第12章 知识表示和数据结构：结果、日志和反馈",
      rule: "监测偏离并恢复已知状态，并保持“实体ID、模式、索引、词汇表、图、查询、版本与推理规则明确”",
      transition: "验收或拒绝",
      evidence:
        "指标、反例、检查点和回滚；出现“同名实体被错误合并，查询结果完整但语义指向错误对象”时暂停",
    },
  ],
  cases: [
    {
      name: "正常案例",
      observation:
        "把结构化记录转为RDF图，建立检索索引并用SPARQL查询来源和关系。 使用冻结版本、输入、初态和种子。",
      expectedAction:
        "沿“实体与记录 → 模式/词汇 → 索引与检索 → RDF图与查询 → 推理与出处”完成可解释动作。",
      boundary:
        "必须满足“实体ID、模式、索引、词汇表、图、查询、版本与推理规则明确”。",
    },
    {
      name: "边界反例",
      observation:
        "把结构化记录转为RDF图，建立检索索引并用SPARQL查询来源和关系。 其余不变，只注入“同名实体被错误合并，查询结果完整但语义指向错误对象”。",
      expectedAction: "定位第一处状态或信任偏离并拒绝下游动作。",
      boundary: "失败运行必须保留，撤销故障后用同一输入重放。",
    },
  ],
  normalTrace: [
    "为“第12章 知识表示和数据结构”冻结系统版本、输入、身份、初态、权限、容量与随机种子",
    "执行实体与记录、模式/词汇，保存观测、知识或模型状态",
    "推进索引与检索、RDF图与查询，记录推理、学习、通信和动作",
    "在推理与出处交付实体ID、数据库模式、索引版本、RDF三元组、命名图、词汇IRI、SPARQL查询、结果、出处和冲突。",
  ],
  failureTrace: [
    "“第12章 知识表示和数据结构”复用相同系统、输入、身份、初态、权限、容量和种子",
    "只注入单一故障：同名实体被错误合并，查询结果完整但语义指向错误对象",
    "沿“实体与记录 → 模式/词汇 → 索引与检索 → RDF图与查询 → 推理与出处”定位第一处状态、证据或信任偏离",
    "撤销故障并重放；仅当“实体ID、模式、索引、词汇表、图、查询、版本与推理规则明确”恢复才接受修正",
  ],
  invariant: "实体ID、模式、索引、词汇表、图、查询、版本与推理规则明确",
  fault: "同名实体被错误合并，查询结果完整但语义指向错误对象",
  artifact:
    "实体ID、数据库模式、索引版本、RDF三元组、命名图、词汇IRI、SPARQL查询、结果、出处和冲突。",
  gates: [
    {
      label: "输入与身份",
      detail:
        "“第12章 知识表示和数据结构”的来源、实体、单位、时间和边界可追溯。",
    },
    {
      label: "状态与模型",
      detail:
        "“第12章 知识表示和数据结构”的知识、规则、参数、版本和中间状态可复核。",
    },
    {
      label: "权限与副作用",
      detail:
        "“第12章 知识表示和数据结构”的通信、动作、资源和外部副作用有权限与容量界限。",
    },
    {
      label: "复现与时间",
      detail:
        "“第12章 知识表示和数据结构”归档环境、种子、失败、恢复和2016/当前标签。",
    },
  ],
} as const satisfies AiSystemEvidenceModel;

export function Iai12KnowledgeRepresentationDataStructuresKnowledgeStateLab() {
  return <AiSystemEvidenceLab model={model} view="knowledge-state" />;
}

export function Iai12KnowledgeRepresentationDataStructuresExecutionTraceLab() {
  return <AiSystemEvidenceLab model={model} view="execution-trace" />;
}

export function Iai12KnowledgeRepresentationDataStructuresSystemGateLab() {
  return <AiSystemEvidenceLab model={model} view="system-gate" />;
}
